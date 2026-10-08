// Date, week and color helpers for the Side Quests views. Pure, so `npm test`
// can run them under a non-UTC timezone.
//
// Log dates are calendar dates ("2026-10-07"), not instants: every helper here
// does its math in UTC so a date never slips a day for a viewer west of UTC.

import type { DayEntry } from './parse'

export interface YearMonth {
  year: number
  /** 1–12 */
  month: number
}

export interface FeedDay {
  date: string
  entries: DayEntry[]
}

export interface FeedWeek {
  /** The week's Sunday. */
  start: string
  label: string
  /** Newest first. */
  days: FeedDay[]
}

const DAY_MS = 86_400_000

const format = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...options })

const LONG = format({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
const MEDIUM = format({ month: 'short', day: 'numeric', year: 'numeric' })
const DAY_HEADER = format({ weekday: 'short', month: 'short', day: 'numeric' })
const MONTH = format({ month: 'long', year: 'numeric' })
const MONTH_DAY = format({ month: 'short', day: 'numeric' })

function utc(date: string): Date {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

function iso(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function addDays(date: string, days: number): string {
  return iso(new Date(utc(date).getTime() + days * DAY_MS))
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

/** "Wednesday, October 7, 2026" */
export function formatLongDate(date: string): string {
  return LONG.format(utc(date))
}

/** "Oct 7, 2026" */
export function formatMediumDate(date: string): string {
  return MEDIUM.format(utc(date))
}

/** "Wed, Oct 7" */
export function formatDayHeader(date: string): string {
  return DAY_HEADER.format(utc(date))
}

/** "October 2026" */
export function formatMonth(ym: YearMonth): string {
  return MONTH.format(new Date(Date.UTC(ym.year, ym.month - 1, 1)))
}

/** The viewer's local calendar date for an instant. */
export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function monthOf(date: string): YearMonth {
  return { year: Number(date.slice(0, 4)), month: Number(date.slice(5, 7)) }
}

export function addMonths(ym: YearMonth, n: number): YearMonth {
  const index = ym.year * 12 + (ym.month - 1) + n
  return { year: Math.floor(index / 12), month: (index % 12) + 1 }
}

export function compareYM(a: YearMonth, b: YearMonth): number {
  return a.year * 12 + a.month - (b.year * 12 + b.month)
}

/** The month's dates, Sunday-first, with null padding to whole weeks. */
export function monthGrid(ym: YearMonth): (string | null)[] {
  const first = new Date(Date.UTC(ym.year, ym.month - 1, 1))
  const days = new Date(Date.UTC(ym.year, ym.month, 0)).getUTCDate()
  const cells: (string | null)[] = Array(first.getUTCDay()).fill(null)
  for (let d = 1; d <= days; d++) cells.push(`${ym.year}-${pad(ym.month)}-${pad(d)}`)
  while (cells.length % 7) cells.push(null)
  return cells
}

/** Months the calendar can show: from the first entry to the last, always including today's month. */
export function monthBounds(dates: string[], today: string): { min: YearMonth; max: YearMonth } {
  const sorted = [...dates, today].sort()
  return { min: monthOf(sorted[0]), max: monthOf(sorted[sorted.length - 1]) }
}

/** The Sunday on or before `date`. */
export function weekStart(date: string): string {
  return addDays(date, -utc(date).getUTCDay())
}

function weekLabel(start: string, thisWeek: string, currentYear: number): string {
  if (start === thisWeek) return 'This week'
  if (start === addDays(thisWeek, -7)) return 'Last week'
  if (start === addDays(thisWeek, 7)) return 'Next week'

  const end = addDays(start, 6)
  const startYear = Number(start.slice(0, 4))
  const endYear = Number(end.slice(0, 4))
  const from = MONTH_DAY.format(utc(start))
  if (startYear !== endYear) return `${from}, ${startYear} – ${MONTH_DAY.format(utc(end))}, ${endYear}`

  const to = start.slice(5, 7) === end.slice(5, 7) ? String(utc(end).getUTCDate()) : MONTH_DAY.format(utc(end))
  return startYear === currentYear ? `${from} – ${to}` : `${from} – ${to}, ${startYear}`
}

/**
 * The mobile agenda: weeks newest first, each with its days newest first.
 * Today's week is always present (possibly empty); other weeks only when they have entries.
 */
export function buildFeed(entriesByDate: Record<string, DayEntry[]>, today: string): FeedWeek[] {
  const thisWeek = weekStart(today)
  const weeks = new Map<string, FeedDay[]>([[thisWeek, []]])
  for (const [date, entries] of Object.entries(entriesByDate)) {
    const start = weekStart(date)
    const days = weeks.get(start) ?? []
    days.push({ date, entries })
    weeks.set(start, days)
  }
  const currentYear = Number(today.slice(0, 4))
  return [...weeks.entries()]
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([start, days]) => ({
      start,
      label: weekLabel(start, thisWeek, currentYear),
      days: days.sort((a, b) => (a.date < b.date ? 1 : -1)),
    }))
}

/** Folds a day's entries (already in quest order) into one group per quest. */
export function groupByQuest(entries: DayEntry[]): { quest: string; color: string; texts: string[] }[] {
  const groups: { quest: string; color: string; texts: string[] }[] = []
  for (const { quest, color, text } of entries) {
    const last = groups[groups.length - 1]
    if (last && last.quest === quest) last.texts.push(text)
    else groups.push({ quest, color, texts: [text] })
  }
  return groups
}

const DARK_TEXT = '#10131C'

function channels(hex: string): number[] {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? [...h].map(c => c + c).join('') : h
  return [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16))
}

function luminance(hex: string): number {
  const [r, g, b] = channels(hex).map(v => {
    const c = v / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG contrast ratio between two colors (1–21). */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** Mixes `amount` (0–1) of `with` into `hex`, in sRGB. */
export function mixColors(hex: string, withHex: string, amount: number): string {
  const a = channels(hex)
  const b = channels(withHex)
  return `#${a.map((v, i) => Math.round(v + (b[i] - v) * amount).toString(16).padStart(2, '0')).join('')}`
}

/**
 * Paper and ink for a post-it that carries text. Quest colors are Bel's choice,
 * so the paper is lightened just enough for dark ink to stay at WCAG AA (4.5:1)
 * even where the paper curls darker (12% shade). The sheen only lightens, which
 * helps dark ink, so it needs no allowance.
 */
export function noteColors(hex: string): { paper: string; text: '#10131C' } {
  for (let step = 0; step <= 20; step++) {
    const paper = mixColors(hex, '#ffffff', step / 20)
    if (contrastRatio(DARK_TEXT, mixColors(paper, '#000000', 0.12)) >= 4.5) {
      return { paper: step === 0 ? hex.toLowerCase() : paper, text: DARK_TEXT }
    }
  }
  return { paper: '#ffffff', text: DARK_TEXT }
}

const TILTS = [-2.5, 1.5, -1, 2.5, -2, 1]

/** A post-it's rotation in degrees: stable per date, and neighbors never match. */
export function tilt(seed: string, index: number): number {
  let hash = 0
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return TILTS[(hash + index) % TILTS.length]
}
