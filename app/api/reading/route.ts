import { intakePackages, type IntakePackageId } from '@/lib/data'
import { EMAIL_RE, escapeHtml, sendToIsa, str } from '@/lib/email'

// Intake for async tarot readings. Emails the request to Isa; the browser then
// sends the client on to the package's Stripe Payment Link.

const LIMITS = { name: 100, email: 200, question: 3000, notes: 3000 }

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
    return Response.json({ error: 'That’s a little too long — try trimming it down.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(clean.email)) {
    return Response.json({ error: 'That email address looks off.' }, { status: 400 })
  }

  const paymentNote = pkg.paymentUrl
    ? 'They were sent to the Stripe payment link next — match the payment by email.'
    : 'No Stripe payment link is set for this package yet — reply with payment details.'

  const failure = await sendToIsa({
    replyTo: clean.email,
    subject: `[${pkg.title}] New request from ${clean.name}`,
    text: [
      `${pkg.title} request`,
      `${clean.name} <${clean.email}>`,
      '',
      'Question:',
      clean.question,
      ...(clean.notes ? ['', 'Anything Isa should know:', clean.notes] : []),
      '',
      paymentNote,
    ].join('\n'),
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#C9943C">${escapeHtml(pkg.title)} request</p>
        <p style="margin:0 0 4px"><strong>${escapeHtml(clean.name)}</strong></p>
        <p style="margin:0 0 20px;color:#666">${escapeHtml(clean.email)}</p>
        <p style="margin:0 0 4px;color:#666">Question</p>
        <div style="white-space:pre-wrap;border-left:3px solid #C9943C;padding-left:16px">${escapeHtml(clean.question)}</div>
        ${clean.notes ? `
        <p style="margin:20px 0 4px;color:#666">Anything Isa should know</p>
        <div style="white-space:pre-wrap;border-left:3px solid #24BFB2;padding-left:16px">${escapeHtml(clean.notes)}</div>` : ''}
        <p style="margin-top:24px;color:#666">${escapeHtml(paymentNote)}</p>
        <p style="margin-top:28px;font-size:12px;color:#999">Sent from the tarot intake form at screenseiji.vercel.app — just hit reply.</p>
      </div>
    `,
  })

  return failure ?? Response.json({ ok: true })
}
