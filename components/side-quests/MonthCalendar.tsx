'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BUTTON_OUTLINE, CARD } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { DayEntry } from '@/lib/side-quests/parse'
import {
  addMonths, compareYM, formatLongDate, formatMonth, monthBounds, monthGrid, monthOf, tilt,
} from '@/lib/side-quests/display'
import PostIt from './PostIt'
import DayPanel from './DayPanel'

const WEEKDAYS = [
  ['Sun', 'Sunday'], ['Mon', 'Monday'], ['Tue', 'Tuesday'], ['Wed', 'Wednesday'],
  ['Thu', 'Thursday'], ['Fri', 'Friday'], ['Sat', 'Saturday'],
]
/** Post-its shown in a day cell before the "+N more" chip. */
const MAX_IN_CELL = 4

interface Props {
  entriesByDate: Record<string, DayEntry[]>
  /** The viewer's local date, YYYY-MM-DD. */
  today: string
}

export default function MonthCalendar({ entriesByDate, today }: Props) {
  const bounds = useMemo(() => monthBounds(Object.keys(entriesByDate), today), [entriesByDate, today])
  const [month, setMonth] = useState(() => monthOf(today))
  const [openDay, setOpenDay] = useState<string | null>(null)

  const cells = monthGrid(month)
  const weeks = Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7))
  const canPrev = compareYM(month, bounds.min) > 0
  const canNext = compareYM(month, bounds.max) < 0
  const onCurrentMonth = compareYM(month, monthOf(today)) === 0

  return (
    <div className={cn(CARD, 'p-3 lg:p-5')}>
      <div className="flex items-center justify-between gap-4 px-1.5 pt-1">
        <h2 aria-live="polite" className="font-display text-3xl font-medium leading-tight text-plum-900">
          {formatMonth(month)}
        </h2>
        <div className="flex items-center gap-2">
          {!onCurrentMonth && (
            <button
              type="button"
              onClick={() => setMonth(monthOf(today))}
              className={cn(BUTTON_OUTLINE, 'px-4 py-1.5 text-sm')}
            >
              Today
            </button>
          )}
          <MonthButton label="Previous month" disabled={!canPrev} onClick={() => setMonth(m => addMonths(m, -1))}>
            <ChevronLeft size={18} />
          </MonthButton>
          <MonthButton label="Next month" disabled={!canNext} onClick={() => setMonth(m => addMonths(m, 1))}>
            <ChevronRight size={18} />
          </MonthButton>
        </div>
      </div>

      <table className="mt-4 w-full table-fixed border-separate border-spacing-1.5">
        <thead>
          <tr>
            {WEEKDAYS.map(([short, long]) => (
              <th key={short} scope="col" className="pb-1 font-eyebrow text-[11px] font-semibold uppercase tracking-[0.2em] text-plum-500">
                <abbr title={long} className="no-underline">{short}</abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, w) => (
            <tr key={w}>
              {week.map((date, d) => {
                if (!date) return <td key={d} />
                const entries = entriesByDate[date] ?? []
                const isToday = date === today
                // The day whose log is open in the DayPanel.
                const isOpen = date === openDay
                // Today wears a plum ring, the open day a plum fill; days with
                // entries are bold on a tinted cell, empty days stay faint.
                const dayNumber = (
                  <span
                    className={cn(
                      'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs tabular-nums',
                      entries.length > 0 ? 'font-bold text-plum-900' : 'text-plum-500',
                      isToday && 'font-bold text-plum-900 ring-[1.5px] ring-plum-900',
                      isOpen && 'bg-plum-900 text-cloud',
                    )}
                  >
                    {Number(date.slice(8))}
                  </span>
                )
                return (
                  <td
                    key={d}
                    aria-current={isToday ? 'date' : undefined}
                    className={cn(
                      'h-24 rounded-xl border align-top lg:h-28',
                      entries.length > 0 ? 'border-mist bg-page' : 'border-mist/60',
                      isToday && 'border-plum-500',
                    )}
                  >
                    {entries.length === 0 ? (
                      // Days without entries stay empty — no placeholder squares.
                      <div className="p-1.5">{dayNumber}</div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOpenDay(date)}
                        aria-label={`${formatLongDate(date)}: ${entries.length} log ${entries.length === 1 ? 'entry' : 'entries'} (${[...new Set(entries.map(e => e.quest))].join(', ')})`}
                        className={cn(
                          'flex h-full min-h-24 w-full flex-col rounded-xl p-1.5 text-left transition-colors hover:bg-glow lg:min-h-28',
                          isOpen && 'bg-glow',
                        )}
                      >
                        {dayNumber}
                        <span className="mt-2 flex flex-wrap items-center gap-1.5 px-0.5">
                          {entries.slice(0, MAX_IN_CELL).map((entry, i) => (
                            <PostIt key={i} variant="mini" color={entry.color} tilt={tilt(date, i)} />
                          ))}
                          {entries.length > MAX_IN_CELL && (
                            <span className="rounded-full bg-blush px-1.5 py-0.5 text-[11px] font-bold leading-none text-plum-900">
                              +{entries.length - MAX_IN_CELL} more
                            </span>
                          )}
                        </span>
                      </button>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <DayPanel date={openDay} entries={openDay ? entriesByDate[openDay] ?? [] : []} onClose={() => setOpenDay(null)} />
    </div>
  )
}

function MonthButton({ label, disabled, onClick, children }: {
  label: string
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="rounded-full border border-mist p-2 text-plum-700 transition-colors hover:border-lilac hover:bg-glow hover:text-plum-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-mist disabled:hover:bg-transparent disabled:hover:text-plum-700"
    >
      {children}
    </button>
  )
}
