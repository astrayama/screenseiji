import { liveReading, type LiveTier } from '@/lib/data'

// Open live-reading slots, computed from the weekly hours in lib/data.ts.
// Shared by the booking form (to show times) and /api/booking (to re-check
// the requested time), so both always agree on what's open.

const HOUR = 3_600_000

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function zonedParts(utcMs: number, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).formatToParts(new Date(utcMs))
  const n = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find(p => p.type === type)?.value)
  return { y: n('year'), m: n('month'), d: n('day'), h: n('hour'), min: n('minute'), s: n('second') }
}

/** Offset of `timeZone` from UTC at the given instant, in ms. */
function zoneOffset(utcMs: number, timeZone: string) {
  const whole = Math.floor(utcMs / 1000) * 1000
  const p = zonedParts(whole, timeZone)
  return Date.UTC(p.y, p.m - 1, p.d, p.h, p.min, p.s) - whole
}

/** UTC instant for a wall-clock date + minutes-past-midnight in `timeZone`. */
function zonedTimeToUtc(y: number, m: number, d: number, minutes: number, timeZone: string) {
  const naive = Date.UTC(y, m - 1, d, 0, minutes)
  const guess = naive - zoneOffset(naive, timeZone)
  // Re-measure at the guess in case it sits on the other side of a DST change.
  return naive - zoneOffset(guess, timeZone)
}

/** Start times (UTC ms) that are open for a reading of this length. */
export function getSlots(tier: LiveTier, now = Date.now()): number[] {
  const { timeZone, weekly, slotStepMinutes, minNoticeHours, daysAhead } = liveReading.availability
  const earliest = now + minNoticeHours * HOUR
  const today = zonedParts(now, timeZone)
  const slots: number[] = []

  for (let i = 0; i <= daysAhead; i++) {
    const day = new Date(Date.UTC(today.y, today.m - 1, today.d + i))
    const [y, m, d] = [day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate()]
    for (const [from, to] of weekly[day.getUTCDay()] ?? []) {
      const end = toMinutes(to)
      for (let t = toMinutes(from); t + tier.blockMinutes <= end; t += slotStepMinutes) {
        const start = zonedTimeToUtc(y, m, d, t, timeZone)
        if (start >= earliest) slots.push(start)
      }
    }
  }
  return slots
}

/** True if `timeZone` is an IANA zone this runtime understands. */
export function isValidTimeZone(timeZone: unknown): timeZone is string {
  if (typeof timeZone !== 'string' || !timeZone) return false
  try {
    new Intl.DateTimeFormat('en-US', { timeZone })
    return true
  } catch {
    return false
  }
}

/** e.g. "Thu, Oct 9, 1:00 PM EDT" */
export function formatSlot(utcMs: number, timeZone?: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(utcMs)
}
