import { apps } from '@/lib/data'
import { EMAIL_RE, isFlagged, saveContact, sendToClient, sendToIsa, str, submittedNow } from '@/lib/email'
import { waitlistEmails } from '@/lib/form-emails'
import { SITE_HOST } from '@/lib/site'

// App waitlist signups. Each one is saved to Isa's Resend Contacts list (so she
// can export it or email everyone at launch), announced to her inbox, and
// confirmed to the person. Either of the first two succeeding is enough for the
// signup not to be lost.

const LIMITS = { name: 100, email: 200 }

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const body = (payload ?? {}) as Record<string, unknown>
  const flagged = isFlagged(body)

  const app = apps.find(a => a.id === str(body.app))
  if (!app) {
    return Response.json({ error: 'Unknown app.' }, { status: 400 })
  }

  const clean = { name: str(body.name), email: str(body.email) }

  if (!clean.email) {
    return Response.json({ error: 'Please add your email.' }, { status: 400 })
  }
  if (clean.name.length > LIMITS.name || clean.email.length > LIMITS.email) {
    return Response.json({ error: 'That’s a little too long.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(clean.email)) {
    return Response.json({ error: 'That email address looks off.' }, { status: 400 })
  }

  // Possible bots stay off the list until Isa adds them by hand.
  const saved = flagged ? false : await saveContact({ email: clean.email, firstName: clean.name || undefined })

  const emails = waitlistEmails({
    host: SITE_HOST,
    appName: app.name,
    ...clean,
    savedToContacts: saved,
    submitted: submittedNow(),
    flagged,
  })

  const failure = await sendToIsa({ replyTo: clean.email, ...emails.toIsa })

  // Only fail the signup if it landed nowhere.
  if (failure && !saved) return failure

  if (!flagged) await sendToClient(clean.email, emails.toClient)
  return Response.json({ ok: true })
}
