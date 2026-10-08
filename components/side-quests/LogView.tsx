'use client'

import { useSyncExternalStore } from 'react'
import type { DayEntry, Quest } from '@/lib/side-quests/parse'
import { toISODate } from '@/lib/side-quests/display'
import AgendaFeed from './AgendaFeed'
import MonthCalendar from './MonthCalendar'

const noSubscribe = () => () => {}

interface Props {
  quests: Quest[]
  entriesByDate: Record<string, DayEntry[]>
}

export default function LogView({ quests, entriesByDate }: Props) {
  // "Today" comes from the viewer's clock, never the build: the page is static,
  // so the server renders nothing here and the browser fills it in.
  // NOTE (Bel): the calendar opens on the current month — backfill a few October
  // entries in content/side-quests.md before sharing the page publicly so it
  // doesn't look empty.
  const today = useSyncExternalStore(noSubscribe, () => toISODate(new Date()), () => null)

  return (
    <div>
      <ul aria-label="Quest colors" className="flex flex-wrap gap-x-6 gap-y-2">
        {quests.map(quest => (
          <li key={quest.title} className="flex items-center gap-2 text-sm text-muted">
            <span aria-hidden className="postit postit-mini h-3.5 w-3.5 rounded-[2px]" style={{ '--postit': quest.color } as React.CSSProperties} />
            {quest.title}
          </li>
        ))}
      </ul>

      {today && (
        <div className="mt-8">
          <div className="hidden sm:block">
            <MonthCalendar entriesByDate={entriesByDate} today={today} />
          </div>
          <div className="sm:hidden">
            <AgendaFeed entriesByDate={entriesByDate} today={today} />
          </div>
        </div>
      )}
    </div>
  )
}
