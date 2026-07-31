import { Resend } from 'resend'

const LIMITS = { name: 100, email: 200, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { name, email, message, website } = (payload ?? {}) as Record<string, unknown>

  // Honeypot — hidden from real people, irresistible to bots. Accept and drop.
  if (typeof website === 'string' && website.trim() !== '') {
    return Response.json({ ok: true })
  }

  const clean = {
    name: typeof name === 'string' ? name.trim() : '',
    email: typeof email === 'string' ? email.trim() : '',
    message: typeof message === 'string' ? message.trim() : '',
  }

  if (!clean.name || !clean.email || !clean.message) {
    return Response.json({ error: 'Please fill in every field.' }, { status: 400 })
  }
  if (
    clean.name.length > LIMITS.name ||
    clean.email.length > LIMITS.email ||
    clean.message.length > LIMITS.message
  ) {
    return Response.json({ error: 'That message is a little too long.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(clean.email)) {
    return Response.json({ error: 'That email address looks off.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || 'Screen Sage <onboarding@resend.dev>'

  if (!apiKey || !to) {
    console.error('Contact form missing RESEND_API_KEY or CONTACT_TO_EMAIL')
    return Response.json({ error: 'The contact form is not configured yet.' }, { status: 500 })
  }

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    replyTo: clean.email,
    subject: `Screen Sage — message from ${clean.name}`,
    text: `${clean.name} <${clean.email}>\n\n${clean.message}`,
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a">
        <p style="margin:0 0 4px"><strong>${escapeHtml(clean.name)}</strong></p>
        <p style="margin:0 0 20px;color:#666">${escapeHtml(clean.email)}</p>
        <div style="white-space:pre-wrap;border-left:3px solid #C9943C;padding-left:16px">${escapeHtml(clean.message)}</div>
        <p style="margin-top:28px;font-size:12px;color:#999">Sent from the contact form at screenseiji.vercel.app — just hit reply.</p>
      </div>
    `,
  })

  if (error) {
    // Log the provider's reason server-side; never surface it to the browser.
    console.error('Resend rejected the contact email:', error)
    return Response.json(
      { error: 'Something went wrong sending that. Please email screenseiji@proton.me directly.' },
      { status: 502 },
    )
  }

  return Response.json({ ok: true })
}
