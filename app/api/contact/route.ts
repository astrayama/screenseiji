import { contactCategories, type ContactCategory } from '@/lib/data'
import { EMAIL_RE, isFlagged, sendToClient, sendToIsa, str, submittedNow } from '@/lib/email'
import { contactEmails } from '@/lib/form-emails'
import { SITE_HOST } from '@/lib/site'

const LIMITS = { name: 100, email: 200, message: 5000 }

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const body = (payload ?? {}) as Record<string, unknown>
  const flagged = isFlagged(body)

  const clean = {
    name: str(body.name),
    email: str(body.email),
    message: str(body.message),
    // Unknown or missing categories fall back to the general bucket.
    category: (contactCategories as readonly unknown[]).includes(body.category)
      ? (body.category as ContactCategory)
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

  const emails = contactEmails({ host: SITE_HOST, ...clean, submitted: submittedNow(), flagged })

  const failure = await sendToIsa({ replyTo: clean.email, ...emails.toIsa })
  if (failure) return failure

  if (!flagged) await sendToClient(clean.email, emails.toClient)
  return Response.json({ ok: true })
}
