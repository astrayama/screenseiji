import { contactCategories, type ContactCategory } from '@/lib/data'
import { EMAIL_RE, escapeHtml, sendToIsa, str } from '@/lib/email'

const LIMITS = { name: 100, email: 200, message: 5000 }

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { name, email, category, message, website } = (payload ?? {}) as Record<string, unknown>

  // Honeypot — hidden from real people, irresistible to bots. Accept and drop.
  if (str(website) !== '') {
    return Response.json({ ok: true })
  }

  const clean = {
    name: str(name),
    email: str(email),
    message: str(message),
    // Unknown or missing categories fall back to the general bucket.
    category: (contactCategories as readonly unknown[]).includes(category)
      ? (category as ContactCategory)
      : contactCategories[0],
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

  const failure = await sendToIsa({
    replyTo: clean.email,
    subject: `[${clean.category}] Screen Sage — message from ${clean.name}`,
    text: `Category: ${clean.category}\n${clean.name} <${clean.email}>\n\n${clean.message}`,
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a">
        <p style="margin:0 0 4px"><strong>${escapeHtml(clean.name)}</strong></p>
        <p style="margin:0 0 4px;color:#666">${escapeHtml(clean.email)}</p>
        <p style="margin:0 0 20px;color:#666">Category: <strong>${escapeHtml(clean.category)}</strong></p>
        <div style="white-space:pre-wrap;border-left:3px solid #C9943C;padding-left:16px">${escapeHtml(clean.message)}</div>
        <p style="margin-top:28px;font-size:12px;color:#999">Sent from the contact form at screenseiji.vercel.app — just hit reply.</p>
      </div>
    `,
  })

  return failure ?? Response.json({ ok: true })
}
