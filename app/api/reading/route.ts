import { intakePackages, type IntakePackageId } from '@/lib/data'
import { EMAIL_RE, isFlagged, sendToClient, sendToIsa, str, submittedNow } from '@/lib/email'
import { readingEmails } from '@/lib/form-emails'
import { SITE_HOST } from '@/lib/site'

// Intake for async tarot readings. Emails the request to Isa and a copy to the
// client; the browser then sends the client on to the package's Stripe
// Payment Link.

const LIMITS = { name: 100, email: 200, question: 3000, notes: 3000 }

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const body = (payload ?? {}) as Record<string, unknown>
  const flagged = isFlagged(body)

  const pkg = Object.hasOwn(intakePackages, str(body.package))
    ? intakePackages[str(body.package) as IntakePackageId]
    : null
  if (!pkg) {
    return Response.json({ error: 'Unknown reading type.' }, { status: 400 })
  }

  const clean = {
    name: str(body.name),
    email: str(body.email),
    question: str(body.question),
    notes: pkg.notesField ? str(body.notes) : '',
  }

  if (!clean.name || !clean.email || !clean.question) {
    return Response.json({ error: 'Please add your name, email, and question.' }, { status: 400 })
  }
  if (
    clean.name.length > LIMITS.name ||
    clean.email.length > LIMITS.email ||
    clean.question.length > LIMITS.question ||
    clean.notes.length > LIMITS.notes
  ) {
    return Response.json({ error: 'That’s a little too long. Try trimming it down.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(clean.email)) {
    return Response.json({ error: 'That email address looks off.' }, { status: 400 })
  }

  const emails = readingEmails({ host: SITE_HOST, pkg, ...clean, submitted: submittedNow(), flagged })

  const failure = await sendToIsa({ replyTo: clean.email, ...emails.toIsa })
  if (failure) return failure

  if (!flagged) await sendToClient(clean.email, emails.toClient)
  return Response.json({ ok: true })
}
