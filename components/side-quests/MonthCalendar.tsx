'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 aria-live="polite" className="font-display text-3xl font-light text-foreground">
          {formatMonth(month)}
        </h2>
        <div className="flex items-center gap-2">
          {!onCurrentMonth && (
            <button
              type="button"
              onClick={() => setMonth(monthOf(today))}
              className="rounded-full border border-gold/40 px-4 py-1.5 text-sm font-medium text-gold transition-all hover:border-gold hover:bg-gold/10"
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

      <table className="mt-6 w-full table-fixed border-separate border-spacing-1.5">
        <thead>
          <tr>
            {WEEKDAYS.map(([short, long]) => (
              <th key={short} scope="col" className="pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
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
                const dayNumber = (
                  <span
                    className={cn(
                      'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs tabular-nums',
                      isToday ? 'bg-gold font-semibold text-background' : 'text-muted',
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
                      isToday ? 'border-gold/50 bg-gold/[0.04]' : 'border-white/5 bg-white/[0.015]',
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
                        className="flex h-full min-h-24 w-full flex-col rounded-xl p-1.5 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:min-h-28"
                      >
                        {dayNumber}
                        <span className="mt-2 flex flex-wrap items-center gap-1.5 px-0.5">
                          {entries.slice(0, MAX_IN_CELL).map((entry, i) => (
                            <PostIt key={i} variant="mini" color={entry.color} tilt={tilt(date, i)} />
                          ))}
                          {entries.length > MAX_IN_CELL && (
                            <span className="rounded-full border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium leading-none text-foreground/80">
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
      className="rounded-full border border-white/10 p-2 text-muted transition-colors hover:border-white/25 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-muted"
    >
      {children}
    </button>
  )
}
