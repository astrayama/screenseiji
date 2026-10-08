// `npm test` runs this under TZ=America/Los_Angeles: a date must never slip a day west of UTC.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  formatLongDate, formatMediumDate, formatDayHeader, formatMonth, toISODate,
  addMonths, compareYM, monthGrid, monthBounds, weekStart, buildFeed, groupByQuest,
  textColorOn, tilt,
} from './display.ts'

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

test('textColorOn picks the more readable of dark and white text', () => {
  assert.equal(textColorOn('#e8a2c8'), '#10131C')
  assert.equal(textColorOn('#7c5cff'), '#FFFFFF')
  assert.equal(textColorOn('#fff'), '#10131C')
  assert.equal(textColorOn('#000'), '#FFFFFF')
})

test('tilt is deterministic and gentle', () => {
  assert.equal(tilt('2026-10-07', 1), tilt('2026-10-07', 1))
  for (let i = 0; i < 50; i++) {
    const deg = tilt(`2026-10-${String(i).padStart(2, '0')}`, i)
    assert.ok(deg >= -3 && deg <= 3, `${deg} out of range`)
  }
  assert.notEqual(tilt('2026-10-07', 0), tilt('2026-10-07', 1))
})
