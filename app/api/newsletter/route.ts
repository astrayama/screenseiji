import { EMAIL_RE, isFlagged, saveContact, sendToClient, sendToIsa, str, submittedNow } from '@/lib/email'
import { newsletterEmails } from '@/lib/form-emails'
import { SITE_HOST } from '@/lib/site'

// "Join the journey" mailing-list signups from the home page. Like the app
// waitlists: saved to Isa's Resend Contacts list (where she can send
// broadcasts, with unsubscribe handled by Resend), announced to her inbox and
// confirmed to the person. Either of the first two succeeding is enough for
// the signup not to be lost.

const MAX_EMAIL = 200

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const body = (payload ?? {}) as Record<string, unknown>
  const flagged = isFlagged(body)

  const email = str(body.email)
  if (!email) {
    return Response.json({ error: 'Please add your email.' }, { status: 400 })
  }
  if (email.length > MAX_EMAIL) {
    return Response.json({ error: 'That’s a little too long.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: 'That email address looks off.' }, { status: 400 })
  }

  // Possible bots stay off the list until Isa adds them by hand.
  const saved = flagged ? false : await saveContact({ email })

  const emails = newsletterEmails({ host: SITE_HOST, email, savedToContacts: saved, submitted: submittedNow(), flagged })

  const failure = await sendToIsa({ replyTo: email, ...emails.toIsa })

  // Only fail the signup if it landed nowhere.
  if (failure && !saved) return failure

  if (!flagged) await sendToClient(email, emails.toClient)
  return Response.json({ ok: true })
}
