// `npm test` runs this under TZ=America/Los_Angeles: a date must never slip a day west of UTC.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  formatLongDate, formatMediumDate, formatDayHeader, formatMonth, toISODate,
  addMonths, compareYM, monthGrid, monthBounds, weekStart, buildFeed, groupByQuest,
  noteColors, contrastRatio, mixColors, tilt, localHref,
} from './display.ts'
import { FALLBACK_PALETTE } from './parse.ts'

const entry = (quest, text = 'x') => ({ quest, color: '#7c5cff', text })

test('formats calendar dates without shifting them a day', () => {
  assert.equal(formatLongDate('2026-10-07'), 'Wednesday, October 7, 2026')
  assert.equal(formatMediumDate('2026-10-07'), 'Oct 7, 2026')
  assert.equal(formatDayHeader('2026-10-07'), 'Wed, Oct 7')
  assert.equal(formatMonth({ year: 2026, month: 10 }), 'October 2026')
})

test('toISODate uses the viewer\'s local calendar date', () => {
  assert.equal(toISODate(new Date(2026, 9, 7, 23, 30)), '2026-10-07')
  assert.equal(toISODate(new Date(2026, 0, 1, 0, 5)), '2026-01-01')
})

test('addMonths and compareYM cross year boundaries', () => {
  assert.deepEqual(addMonths({ year: 2026, month: 12 }, 1), { year: 2027, month: 1 })
  assert.deepEqual(addMonths({ year: 2026, month: 1 }, -1), { year: 2025, month: 12 })
  assert.ok(compareYM({ year: 2025, month: 12 }, { year: 2026, month: 1 }) < 0)
  assert.equal(compareYM({ year: 2026, month: 10 }, { year: 2026, month: 10 }), 0)
})

test('monthGrid is Sunday-first and padded to whole weeks', () => {
  const grid = monthGrid({ year: 2026, month: 10 }) // Oct 1, 2026 is a Thursday
  assert.deepEqual(grid.slice(0, 5), [null, null, null, null, '2026-10-01'])
  assert.equal(grid.length, 35)
  assert.equal(grid[34], '2026-10-31')
  const feb = monthGrid({ year: 2026, month: 2 }) // Feb 1, 2026 is a Sunday; 28 days
  assert.equal(feb[0], '2026-02-01')
  assert.equal(feb.length, 28)
})

test('monthBounds spans the entries and the current month', () => {
  assert.deepEqual(monthBounds(['2026-09-30', '2026-10-04'], '2026-10-08'), {
    min: { year: 2026, month: 9 }, max: { year: 2026, month: 10 },
  })
  assert.deepEqual(monthBounds([], '2026-10-08'), {
    min: { year: 2026, month: 10 }, max: { year: 2026, month: 10 },
  })
  assert.deepEqual(monthBounds(['2026-12-01'], '2026-10-08'), {
    min: { year: 2026, month: 10 }, max: { year: 2026, month: 12 },
  })
})

test('weekStart is the Sunday on or before the date', () => {
  assert.equal(weekStart('2026-10-07'), '2026-10-04')
  assert.equal(weekStart('2026-10-04'), '2026-10-04')
  assert.equal(weekStart('2026-01-01'), '2025-12-28')
})

test('buildFeed always shows this week, labels recent weeks, and skips empty ones', () => {
  const feed = buildFeed({
    '2026-09-21': [entry('A', 'older')],
    '2026-10-01': [entry('A', 'last week')],
    '2026-10-04': [entry('A', 'sunday')],
    '2026-10-07': [entry('A', 'wednesday'), entry('B', 'also wednesday')],
    '2026-10-12': [entry('A', 'planned')],
  }, '2026-10-08')
  assert.deepEqual(feed.map(w => w.label), ['Next week', 'This week', 'Last week', 'Sep 20 – 26'])
  const thisWeek = feed[1]
  assert.equal(thisWeek.start, '2026-10-04')
  assert.deepEqual(thisWeek.days.map(d => d.date), ['2026-10-07', '2026-10-04'])
  assert.equal(thisWeek.days[0].entries.length, 2)
})

test('buildFeed keeps an empty this week', () => {
  const feed = buildFeed({ '2026-09-21': [entry('A')] }, '2026-10-08')
  assert.deepEqual(feed.map(w => [w.label, w.days.length]), [['This week', 0], ['Sep 20 – 26', 1]])
})

test('buildFeed labels weeks that cross a month or a year', () => {
  const months = buildFeed({ '2026-09-30': [entry('A')], '2026-10-29': [entry('A')] }, '2026-10-20')
  assert.deepEqual(months.map(w => w.label), ['Next week', 'This week', 'Sep 27 – Oct 3'])
  const years = buildFeed({ '2025-12-30': [entry('A')], '2025-09-22': [entry('A')] }, '2026-01-20')
  assert.deepEqual(years.map(w => w.label), ['This week', 'Dec 28, 2025 – Jan 3, 2026', 'Sep 21 – 27, 2025'])
  const far = buildFeed({ '2026-11-03': [entry('A')] }, '2026-10-08')
  assert.deepEqual(far.map(w => w.label), ['Nov 1 – 7', 'This week'])
})

test('groupByQuest folds consecutive entries of the same quest', () => {
  assert.deepEqual(groupByQuest([entry('A', '1'), entry('A', '2'), entry('B', '3')]), [
    { quest: 'A', color: '#7c5cff', texts: ['1', '2'] },
    { quest: 'B', color: '#7c5cff', texts: ['3'] },
  ])
})

test('noteColors keeps text at WCAG AA even where the paper curls darker', () => {
  for (const color of ['#7c5cff', '#e8a2c8', '#000', '#fff', '#1a1a2e', '#ff0000', '#0000ff', ...FALLBACK_PALETTE]) {
    const { paper, text } = noteColors(color)
    const curl = mixColors(paper, '#000000', 0.12) // the bottom shadow (9%) plus the paper grain
    assert.ok(contrastRatio(text, curl) >= 4.5, `${color}: ${contrastRatio(text, curl).toFixed(2)}:1 on ${paper}`)
  }
})
test('noteColors only lightens a color as far as it must', () => {
  assert.equal(noteColors('#e8a2c8').paper, '#e8a2c8')
  const violet = noteColors('#7c5cff').paper
  assert.notEqual(violet, '#7c5cff')
  assert.notEqual(violet, '#ffffff')
})
test('contrastRatio matches WCAG', () => {
  assert.equal(contrastRatio('#000000', '#ffffff').toFixed(1), '21.0')
  assert.equal(contrastRatio('#777777', '#777777'), 1)
})

test('tilt is deterministic and gentle', () => {
  assert.equal(tilt('2026-10-07', 1), tilt('2026-10-07', 1))
  for (let i = 0; i < 50; i++) {
    const deg = tilt(`2026-10-${String(i).padStart(2, '0')}`, i)
    assert.ok(deg >= -3 && deg <= 3, `${deg} out of range`)
  }
  assert.notEqual(tilt('2026-10-07', 0), tilt('2026-10-07', 1))
})

test('localHref turns links to this site into in-site paths', () => {
  assert.equal(localHref('https://screenseiji.vercel.app/apps/arcana'), '/apps/arcana')
  assert.equal(localHref('https://screenseiji.vercel.app/side-quests#log'), '/side-quests#log')
  assert.equal(localHref('https://screenseiji.vercel.app'), '/')
  assert.equal(localHref('https://cartaluna-mr.vercel.app'), undefined)
  assert.equal(localHref('https://screenseiji.vercel.app.evil.com/x'), undefined)
})
