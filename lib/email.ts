import { Resend } from 'resend'
import { formatSlot } from '@/lib/booking'
import { liveReading } from '@/lib/data'
import type { Email } from '@/lib/form-emails'

// Server-only: used by the API routes to deliver form submissions to Isa and
// a confirmation to the person who sent them. The emails themselves are built
// in lib/form-emails.ts.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Public inbox that clients' replies to a confirmation go to (keeps Isa's own inbox private). */
const DEFAULT_REPLY_TO = 'screenseiji@proton.me'

export function str(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

/**
 * True when the hidden anti-spam field (`website`) was filled in. Such
 * submissions still reach Isa, marked as possible spam, because a password
 * manager can fill it for a real person. They just get no confirmation email.
 */
export function isFlagged(body: Record<string, unknown>) {
  return str(body.website) !== ''
}

/** "Now" in Isa's timezone, for the Submitted row. */
export function submittedNow() {
  return formatSlot(Date.now(), liveReading.availability.timeZone)
}

// Set in .env.local locally, and in Vercel → Settings → Environment Variables
// for the live site (see .env.example).
function resendConfig() {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || 'Screen Sage <onboarding@resend.dev>'
  const replyTo = process.env.CONTACT_REPLY_TO || DEFAULT_REPLY_TO
  return apiKey && to ? { resend: new Resend(apiKey), to, from, replyTo } : null
}

type SendResult = Awaited<ReturnType<Resend['emails']['send']>>

/** Resend's free plan allows 2 requests a second; a form can make 3. Retry a 429 once. */
async function sendWithRetry(send: () => Promise<SendResult>): Promise<SendResult> {
  const first = await send()
  if (first.error?.name !== 'rate_limit_exceeded') return first
  await new Promise(resolve => setTimeout(resolve, 1100))
  return send()
}

interface Message extends Email {
  replyTo: string
  attachments?: { filename: string; content: string | Buffer; contentType?: string }[]
}

/**
 * Sends a message to the inbox in CONTACT_TO_EMAIL via Resend.
 * Returns a ready-to-send error Response on failure, or null on success.
 */
export async function sendToIsa(message: Message): Promise<Response | null> {
  const config = resendConfig()
  if (!config) {
    console.error('Email delivery missing RESEND_API_KEY or CONTACT_TO_EMAIL')
    return Response.json({ error: 'This form is not configured yet.' }, { status: 500 })
  }

  const { error } = await sendWithRetry(() =>
    config.resend.emails.send({ from: config.from, to: config.to, ...message }),
  )

  if (error) {
    // Log the provider's reason server-side; never surface it to the browser.
    console.error('Resend rejected the email:', error)
    return Response.json(
      { error: 'Something went wrong sending that. Please email screenseiji@proton.me directly.' },
      { status: 502 },
    )
  }

  return null
}

/**
 * Emails the person who filled in a form a confirmation. Best effort: a
 * failure is logged and never fails the form, since Isa already has it.
 *
 * Resend's test sender (onboarding@resend.dev) can only deliver to the
 * account's own address, so until a domain is verified and CONTACT_FROM_EMAIL
 * uses it, confirmations to anyone else are skipped.
 */
export async function sendToClient(to: string, message: Email): Promise<void> {
  const config = resendConfig()
  if (!config) return

  const testSender = /@resend\.dev>?\s*$/i.test(config.from)
  if (testSender && to.toLowerCase() !== config.to.toLowerCase()) {
    console.warn('Skipped a confirmation email: verify a domain in Resend and set CONTACT_FROM_EMAIL on it (see .env.example).')
    return
  }

  const { error } = await sendWithRetry(() =>
    config.resend.emails.send({ from: config.from, to, replyTo: config.replyTo, ...message }),
  )
  if (error) console.error('Resend could not send the confirmation email:', error)
}

/** Adds someone to Isa's Resend Contacts list. Resolves true if they're on it. */
export async function saveContact(contact: { email: string; firstName?: string }): Promise<boolean> {
  const config = resendConfig()
  if (!config) return false

  const { error } = await config.resend.contacts.create({ ...contact, unsubscribed: false })
  if (!error) return true

  console.error('Resend could not save the contact:', error)
  return false
}
