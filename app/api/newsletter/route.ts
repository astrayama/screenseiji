import { EMAIL_RE, escapeHtml, saveContact, sendToIsa, str } from '@/lib/email'
import { SITE_HOST } from '@/lib/site'

// "Join the journey" mailing-list signups from the home page. Like the app
// waitlists: saved to Isa's Resend Contacts list (where she can send
// broadcasts, with unsubscribe handled by Resend) and announced to her inbox.
// Either one succeeding is enough for the signup not to be lost.

const MAX_EMAIL = 200

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const body = (payload ?? {}) as Record<string, unknown>

  // Honeypot — hidden from real people, irresistible to bots. Accept and drop.
  if (str(body.website) !== '') {
    return Response.json({ ok: true })
  }

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

  const saved = await saveContact({ email })
  const listNote = saved
    ? 'They’re saved in your Resend Contacts list.'
    : 'Saving them to your Resend Contacts list failed — add them there by hand.'

  const failure = await sendToIsa({
    replyTo: email,
    subject: `[Mailing list] ${email} joined`,
    text: `${email} joined the mailing list.\n\n${listNote}`,
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6A4D86">Mailing list</p>
        <p style="margin:0 0 20px"><strong>${escapeHtml(email)}</strong></p>
        <p style="margin:0;color:#666">${escapeHtml(listNote)}</p>
        <p style="margin-top:28px;font-size:12px;color:#999">Sent from the “Join the journey” form at ${SITE_HOST}.</p>
      </div>
    `,
  })

  // Only fail the signup if it landed nowhere.
  if (failure && !saved) return failure
  return Response.json({ ok: true })
}
