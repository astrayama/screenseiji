import { Resend } from 'resend'

// Server-only: used by the API routes to deliver form submissions to Isa.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function str(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

// Set in .env.local locally, and in Vercel → Settings → Environment Variables
// for the live site (see .env.example).
function resendConfig() {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || 'Screen Sage <onboarding@resend.dev>'
  return apiKey && to ? { resend: new Resend(apiKey), to, from } : null
}

interface Message {
  subject: string
  text: string
  html: string
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

  const { error } = await config.resend.emails.send({ from: config.from, to: config.to, ...message })

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

/** Adds someone to Isa's Resend Contacts list. Resolves true if they're on it. */
export async function saveContact(contact: { email: string; firstName?: string }): Promise<boolean> {
  const config = resendConfig()
  if (!config) return false

  const { error } = await config.resend.contacts.create({ ...contact, unsubscribed: false })
  if (!error) return true

  console.error('Resend could not save the contact:', error)
  return false
}
