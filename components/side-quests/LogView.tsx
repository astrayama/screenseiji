'use client'

import { useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'
import type { DayEntry, Quest, QuestType } from '@/lib/side-quests/parse'
import { toISODate } from '@/lib/side-quests/display'
import { LABEL } from './QuestCard'
import AgendaFeed from './AgendaFeed'
import MonthCalendar from './MonthCalendar'

const noSubscribe = () => () => {}

const GROUPS: { type: QuestType; label: string }[] = [
  { type: 'main', label: 'Main' },
  { type: 'self', label: 'Self' },
  { type: 'dev', label: 'Dev' },
]

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
  // The legend names only quests with post-its: queued or brand-new ones join once logged.
  const groups = GROUPS
    .map(group => ({ ...group, quests: quests.filter(q => q.type === group.type && q.log.length > 0) }))
    .filter(group => group.quests.length > 0)

  return (
    <div>
      <div className="space-y-3">
        {groups.map(group => (
          <div key={group.type} className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p aria-hidden className={cn(LABEL, 'w-12')}>{group.label}</p>
            <ul aria-label={`${group.label} quest colors`} className="flex flex-wrap gap-x-6 gap-y-2">
              {group.quests.map(quest => (
                <li key={quest.title} className="flex items-center gap-2 text-sm font-semibold text-plum-700">
                  <span aria-hidden className="postit postit-mini h-3.5 w-3.5 rounded-[2px]" style={{ '--postit': quest.color } as React.CSSProperties} />
                  {quest.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

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
