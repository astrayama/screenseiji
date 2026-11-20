import { liveReading } from '@/lib/data'
import { formatSlot, getSlots, isValidTimeZone } from '@/lib/booking'
import { EMAIL_RE, isFlagged, sendToClient, sendToIsa, str, submittedNow } from '@/lib/email'
import { bookingEmails } from '@/lib/form-emails'
import { SITE_HOST } from '@/lib/site'

// Live-reading requests. The requested time is re-checked against Isa's weekly
// hours, then emailed to her with a calendar file, and a copy goes to the
// client. She confirms by replying — there's no database, so nothing is locked
// until she does.

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
  const flagged = isFlagged(body)

  const format = liveReading.formats.find(f => f.id === str(body.format))
  const tier = liveReading.tiers.find(t => t.id === str(body.tier))
  if (!format || !tier) {
    return Response.json({ error: 'Pick a format and a length.' }, { status: 400 })
  }

  const start = typeof body.start === 'number' ? body.start : NaN
  if (!getSlots(tier).includes(start)) {
    return Response.json(
      { error: 'That time isn’t open anymore. Please pick another.' },
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
    return Response.json({ error: 'That’s a little too long. Try trimming it down.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(clean.email)) {
    return Response.json({ error: 'That email address looks off.' }, { status: 400 })
  }

  const emails = bookingEmails({
    host: SITE_HOST,
    format: format.label,
    tier,
    isaTime: formatSlot(start, liveReading.availability.timeZone),
    theirTime: clean.timeZone ? `${formatSlot(start, clean.timeZone)} (${clean.timeZone})` : null,
    name: clean.name,
    email: clean.email,
    notes: clean.notes,
    submitted: submittedNow(),
    flagged,
  })

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Screen Sage//Live reading//EN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${start}-${crypto.randomUUID()}@${SITE_HOST}`,
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
    ...emails.toIsa,
    attachments: [{ filename: 'live-reading.ics', content: Buffer.from(ics), contentType: 'text/calendar' }],
  })
  if (failure) return failure

  if (!flagged) await sendToClient(clean.email, emails.toClient)
  return Response.json({ ok: true })
}
