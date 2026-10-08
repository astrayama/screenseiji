'use client'

import { useMemo, useState } from 'react'
import type { DayEntry } from '@/lib/side-quests/parse'
import { buildFeed, formatDayHeader, tilt, weekStart } from '@/lib/side-quests/display'
import InlineText from './InlineText'
import PostIt from './PostIt'

/** Weeks with entries revealed per "Show earlier" press. */
const PAGE = 4

interface Props {
  entriesByDate: Record<string, DayEntry[]>
  /** The viewer's local date, YYYY-MM-DD. */
  today: string
}

// The phone-sized Log: weeks newest first instead of a month grid too small to read.
export default function AgendaFeed({ entriesByDate, today }: Props) {
  const weeks = useMemo(() => buildFeed(entriesByDate, today), [entriesByDate, today])
  const [earlierShown, setEarlierShown] = useState(PAGE)

  // Future-dated weeks and this week always show; earlier weeks page in.
  const thisWeek = weeks.findIndex(w => w.start === weekStart(today))
  const visible = weeks.slice(0, thisWeek + 1 + earlierShown)

  return (
    <div className="space-y-10">
      {visible.map(week => (
        <section key={week.start}>
          <h2 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {week.label}
            <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-gold/25 to-transparent" />
          </h2>
          {week.days.length === 0 ? (
            <p className="mt-4 text-sm text-muted">Nothing logged yet this week.</p>
          ) : (
            <div className="mt-5 space-y-6">
              {week.days.map(day => (
                <div key={day.date}>
                  <h3 className="text-sm font-medium text-foreground/80">
                    <time dateTime={day.date}>
                      {day.date === today ? `Today · ${formatDayHeader(day.date)}` : formatDayHeader(day.date)}
                    </time>
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {day.entries.map((entry, i) => (
                      <li key={i}>
                        <PostIt variant="note" color={entry.color} tilt={tilt(day.date, i) * 0.4}>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-75">{entry.quest}</p>
                          <p className="mt-1 text-sm leading-6">
                            <InlineText text={entry.text} />
                          </p>
                        </PostIt>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {weeks.length > visible.length && (
        <button
          type="button"
          onClick={() => setEarlierShown(n => n + PAGE)}
          className="w-full rounded-full border border-gold/40 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:border-gold hover:bg-gold/10"
        >
          Show earlier
        </button>
      )}
    </div>
  )
}
