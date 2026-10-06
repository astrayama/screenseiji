import { budgetRanges, projectTimelines, projectTypes } from '@/lib/data'
import { EMAIL_RE, escapeHtml, sendToIsa, str } from '@/lib/email'

// Studio project inquiries — website leads from the "Start a project" form.
// Emailed to Isa only: they're deliberately not saved to Resend Contacts, which
// holds the app waitlist (business leads shouldn't get app launch emails).

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

  // Honeypot — hidden from real people, irresistible to bots. Accept and drop.
  if (str(body.website) !== '') {
    return Response.json({ ok: true })
  }

  const clean = {
    name: str(body.name),
    email: str(body.email),
    business: str(body.business),
    site: str(body.site),
    message: str(body.message),
    // Unknown or missing choices fall back to "not sure" rather than failing.
    projectType: pick(projectTypes, body.projectType, 'Not sure yet'),
    budget: pick(budgetRanges, body.budget, 'Not sure yet'),
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

  const who = clean.business ? `${clean.name} / ${clean.business}` : clean.name
  const rows: [string, string][] = [
    ['Name', clean.name],
    ['Email', clean.email],
    ['Business', clean.business || '—'],
    ['Current site', clean.site || '—'],
    ['Project', clean.projectType],
    ['Budget', clean.budget],
    ['Timeline', clean.timeline],
  ]

  const failure = await sendToIsa({
    replyTo: clean.email,
    subject: `[Studio lead] ${clean.projectType} · ${clean.budget} — ${who}`,
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${clean.message}`,
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#666">Studio · new project inquiry</p>
        <table style="border-collapse:collapse;margin:0 0 20px">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:2px 16px 2px 0;color:#666">${k}</td><td style="padding:2px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
            )
            .join('')}
        </table>
        <div style="white-space:pre-wrap;border-left:3px solid #1a1a1a;padding-left:16px">${escapeHtml(clean.message)}</div>
        <p style="margin-top:28px;font-size:12px;color:#999">Sent from the Studio project form at screenseiji.vercel.app — just hit reply.</p>
      </div>
    `,
  })

  return failure ?? Response.json({ ok: true })
}
