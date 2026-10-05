import { apps } from '@/lib/data'
import { EMAIL_RE, escapeHtml, saveContact, sendToIsa, str } from '@/lib/email'

// App waitlist signups. Each one is saved to Isa's Resend Contacts list (so she
// can export it or email everyone at launch) and announced to her inbox. Either
// one succeeding is enough for the signup not to be lost.

const LIMITS = { name: 100, email: 200 }

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

  const saved = await saveContact({ email: clean.email, firstName: clean.name || undefined })
  const listNote = saved
    ? 'They’re saved in your Resend Contacts list.'
    : 'Saving them to your Resend Contacts list failed — add them there by hand.'
  const who = clean.name ? `${clean.name} <${clean.email}>` : clean.email

  const failure = await sendToIsa({
    replyTo: clean.email,
    subject: `[${app.name} waitlist] ${clean.name || clean.email} joined`,
    text: `${who} joined the ${app.name} waitlist.\n\n${listNote}`,
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#C9943C">${escapeHtml(app.name)} waitlist</p>
        <p style="margin:0 0 4px"><strong>${escapeHtml(clean.name || '(no name given)')}</strong></p>
        <p style="margin:0 0 20px;color:#666">${escapeHtml(clean.email)}</p>
        <p style="margin:0;color:#666">${escapeHtml(listNote)}</p>
        <p style="margin-top:28px;font-size:12px;color:#999">Sent from the waitlist form at screenseiji.vercel.app.</p>
      </div>
    `,
  })

  // Only fail the signup if it landed nowhere.
  if (failure && !saved) return failure
  return Response.json({ ok: true })
}
