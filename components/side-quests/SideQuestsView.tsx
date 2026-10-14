'use client'

import { useId, useRef, useSyncExternalStore, type KeyboardEvent } from 'react'
import { ScrollText, Swords } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DayEntry, Quest } from '@/lib/side-quests/parse'
import QuestCard from './QuestCard'
import LogView from './LogView'

type Tab = 'quests' | 'log'

const TABS: { id: Tab; label: string; Icon: typeof Swords }[] = [
  { id: 'quests', label: 'Quests', Icon: Swords },
  { id: 'log', label: 'Log', Icon: ScrollText },
]

// The tab lives in the URL hash so /side-quests#log links straight to the calendar.
// replaceState doesn't fire hashchange, so tab switches announce themselves.
const TAB_EVENT = 'side-quests:tab'

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  window.addEventListener(TAB_EVENT, onChange)
  return () => {
    window.removeEventListener('hashchange', onChange)
    window.removeEventListener(TAB_EVENT, onChange)
  }
}

interface Props {
  quests: Quest[]
  entriesByDate: Record<string, DayEntry[]>
}

export default function SideQuestsView({ quests, entriesByDate }: Props) {
  // The server (and hydration) always renders Quests; a #log URL switches right after.
  const hash = useSyncExternalStore(subscribe, () => window.location.hash, () => '')
  const tab: Tab = hash === '#log' ? 'log' : 'quests'
  const id = useId()
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ quests: null, log: null })

  const select = (next: Tab) => {
    const { pathname, search } = window.location
    window.history.replaceState(window.history.state, '', next === 'log' ? '#log' : pathname + search)
    window.dispatchEvent(new Event(TAB_EVENT))
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const index = TABS.findIndex(t => t.id === tab)
    const target =
      e.key === 'ArrowRight' ? TABS[(index + 1) % TABS.length]
      : e.key === 'ArrowLeft' ? TABS[(index - 1 + TABS.length) % TABS.length]
      : e.key === 'Home' ? TABS[0]
      : e.key === 'End' ? TABS[TABS.length - 1]
      : null
    if (!target) return
    e.preventDefault()
    select(target.id)
    tabRefs.current[target.id]?.focus()
  }

  return (
    <div className="mt-12 sm:mt-14">
      <div
        role="tablist"
        aria-label="Side quests view"
        className="inline-flex rounded-full border border-mist bg-cloud p-1 shadow-card"
      >
        {TABS.map(({ id: tabId, label, Icon }) => {
          const selected = tab === tabId
          return (
            <button
              key={tabId}
              ref={el => { tabRefs.current[tabId] = el }}
              type="button"
              role="tab"
              id={`${id}-tab-${tabId}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${tabId}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(tabId)}
              onKeyDown={onKeyDown}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-colors',
                selected ? 'bg-plum-900 text-cloud' : 'text-plum-700 hover:bg-glow hover:text-plum-900',
              )}
            >
              <Icon size={15} aria-hidden />
              {label}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-quests`}
        aria-labelledby={`${id}-tab-quests`}
        hidden={tab !== 'quests'}
        className="mt-8"
      >
        {quests.length === 0 ? (
          <p className="text-plum-700">No side quests yet.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {quests.map(quest => <QuestCard key={quest.title} quest={quest} />)}
          </div>
        )}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-log`}
        aria-labelledby={`${id}-tab-log`}
        hidden={tab !== 'log'}
        className="mt-8"
      >
        <LogView quests={quests} entriesByDate={entriesByDate} />
      </div>
    </div>
  )
}
