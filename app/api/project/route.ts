import { projectPackages, projectTimelines, projectTypes } from '@/lib/data'
import { EMAIL_RE, isFlagged, sendToClient, sendToIsa, str, submittedNow } from '@/lib/email'
import { projectEmails } from '@/lib/form-emails'
import { SITE_HOST } from '@/lib/site'

// Studio project inquiries — website leads from the "Start a project" form.
// Emailed to Isa (plus a copy to the client) only: they're deliberately not
// saved to Resend Contacts, which holds the app waitlist (business leads
// shouldn't get app launch emails).

const LIMITS = { name: 100, email: 200, business: 150, website: 300, message: 5000 }

/** Returns `value` if it's one of `options`, otherwise `fallback`. */
function pick<T extends string>(options: readonly T[], value: unknown, fallback: T): T {
  return (options as readonly unknown[]).includes(value) ? (value as T) : fallback
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const body = (payload ?? {}) as Record<string, unknown>
  // `website` is the hidden anti-spam field; their real site comes in as `site`.
  const flagged = isFlagged(body)

  const clean = {
    name: str(body.name),
    email: str(body.email),
    business: str(body.business),
    site: str(body.site),
    message: str(body.message),
    // Unknown or missing choices fall back to "not sure" rather than failing.
    projectType: pick(projectTypes, body.projectType, 'Not sure yet'),
    package: pick(projectPackages, body.package, 'Not sure yet'),
    timeline: pick(projectTimelines, body.timeline, 'Flexible'),
  }

  if (!clean.name || !clean.email || !clean.message) {
    return Response.json({ error: 'Please add your name, email, and a few words about the project.' }, { status: 400 })
  }
  if (
    clean.name.length > LIMITS.name ||
    clean.email.length > LIMITS.email ||
    clean.business.length > LIMITS.business ||
    clean.site.length > LIMITS.website ||
    clean.message.length > LIMITS.message
  ) {
    return Response.json({ error: 'That’s a little too long.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(clean.email)) {
    return Response.json({ error: 'That email address looks off.' }, { status: 400 })
  }

  const emails = projectEmails({
    host: SITE_HOST,
    name: clean.name,
    email: clean.email,
    business: clean.business,
    website: clean.site,
    projectType: clean.projectType,
    package: clean.package,
    timeline: clean.timeline,
    message: clean.message,
    submitted: submittedNow(),
    flagged,
  })

  const failure = await sendToIsa({ replyTo: clean.email, ...emails.toIsa })
  if (failure) return failure

  if (!flagged) await sendToClient(clean.email, emails.toClient)
  return Response.json({ ok: true })
}
