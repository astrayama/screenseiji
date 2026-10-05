import { liveReading } from '@/lib/data'
import { formatSlot, getSlots, isValidTimeZone } from '@/lib/booking'
import { EMAIL_RE, escapeHtml, sendToIsa, str } from '@/lib/email'

// Live-reading requests. The requested time is re-checked against Isa's weekly
// hours, then emailed to her with a calendar file. She confirms by replying —
// there's no database, so nothing is locked until she does.

const LIMITS = { name: 100, email: 200, notes: 3000 }

/** RFC 5545 text escaping + 75-octet line folding (approximated by characters). */
function icsText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')
}
function icsFold(line: string) {
  const chunks = line.match(/.{1,73}/g) ?? ['']
  return chunks.join('\r\n ')
}
function icsDate(utcMs: number) {
  return new Date(utcMs).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
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

  const format = liveReading.formats.find(f => f.id === str(body.format))
  const tier = liveReading.tiers.find(t => t.id === str(body.tier))
  if (!format || !tier) {
    return Response.json({ error: 'Pick a format and a length.' }, { status: 400 })
  }

  const start = typeof body.start === 'number' ? body.start : NaN
  if (!getSlots(tier).includes(start)) {
    return Response.json(
      { error: 'That time isn’t open anymore — please pick another.' },
      { status: 409 },
    )
  }

  const clean = {
    name: str(body.name),
    email: str(body.email),
    notes: str(body.notes),
    timeZone: isValidTimeZone(body.timeZone) ? body.timeZone : null,
  }

  if (!clean.name || !clean.email) {
    return Response.json({ error: 'Please add your name and email.' }, { status: 400 })
  }
  if (
    clean.name.length > LIMITS.name ||
    clean.email.length > LIMITS.email ||
    clean.notes.length > LIMITS.notes
  ) {
    return Response.json({ error: 'That’s a little too long — try trimming it down.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(clean.email)) {
    return Response.json({ error: 'That email address looks off.' }, { status: 400 })
  }

  const isaTime = formatSlot(start, liveReading.availability.timeZone)
  const theirTime = clean.timeZone ? `${formatSlot(start, clean.timeZone)} (${clean.timeZone})` : 'unknown timezone'
  const paymentNote = tier.paymentUrl
    ? `They were offered the ${tier.price} Stripe payment link — match the payment by email.`
    : `No Stripe link is set for this length yet — include payment details (${tier.price}) when you confirm.`
  const rows: [string, string][] = [
    ['Format', format.label],
    ['Length', `${tier.label} · ${tier.price} (holds ${tier.blockMinutes} min)`],
    ['Your time', isaTime],
    ['Their time', theirTime],
    ['Name', clean.name],
    ['Email', clean.email],
    ...(clean.notes ? [['Anything Isa should know', clean.notes] as [string, string]] : []),
  ]

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Screen Sage//Live reading//EN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${start}-${crypto.randomUUID()}@screenseiji.vercel.app`,
    `DTSTAMP:${icsDate(Date.now())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(start + tier.blockMinutes * 60_000)}`,
    `SUMMARY:${icsText(`Live tarot reading — ${clean.name} (${format.label}, ${tier.label})`)}`,
    `DESCRIPTION:${icsText(`${clean.email}${clean.notes ? `\n\n${clean.notes}` : ''}`)}`,
    'STATUS:TENTATIVE',
    'END:VEVENT',
    'END:VCALENDAR',
  ].map(icsFold).join('\r\n')

  const failure = await sendToIsa({
    replyTo: clean.email,
    subject: `[Live reading] ${isaTime} — ${format.label}, ${tier.label} — ${clean.name}`,
    text: [
      'Live reading request — reply to this email to confirm.',
      '',
      ...rows.map(([k, v]) => `${k}: ${v}`),
      '',
      paymentNote,
      'The attached calendar file adds the slot to your calendar.',
    ].join('\n'),
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#C9943C">Live reading request</p>
        <p style="margin:0 0 20px;color:#666">Reply to this email to confirm with ${escapeHtml(clean.name)}.</p>
        <table style="border-collapse:collapse">
          ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:4px 16px 4px 0;color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td>
            <td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(v)}</td>
          </tr>`).join('')}
        </table>
        <p style="margin-top:20px;color:#666">${escapeHtml(paymentNote)}</p>
        <p style="margin:4px 0 0;color:#666">The attached calendar file adds the slot to your calendar.</p>
        <p style="margin-top:28px;font-size:12px;color:#999">Sent from the live booking form at screenseiji.vercel.app — just hit reply.</p>
      </div>
    `,
    attachments: [{ filename: 'live-reading.ics', content: Buffer.from(ics), contentType: 'text/calendar' }],
  })

  return failure ?? Response.json({ ok: true })
}
