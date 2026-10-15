import { Crown } from 'lucide-react'
import { CARD, EYEBROW } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { Quest } from '@/lib/side-quests/parse'
import { ProjectLink, QuestDetails, StatusPill } from './QuestCard'
import Countdown from './Countdown'

// The life quest of the moment: a side quest card's anatomy, at hero size.
export default function MainQuestCard({ quest }: { quest: Quest }) {
  return (
    <article className={cn('quest-card', CARD, 'flex flex-col overflow-hidden rounded-3xl p-6 sm:p-10')}>
      {/* The quest's pinned color, as on the side quest cards, a little bolder. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1.5 shadow-[inset_0_-1px_0_rgba(63,42,88,0.1)]"
        style={{ background: quest.color }}
      />

      <div className="flex items-start justify-between gap-4">
        <p className={cn(EYEBROW, 'flex items-center gap-2')}>
          <Crown size={15} aria-hidden />
          Main quest
        </p>
        <StatusPill status={quest.status} />
      </div>

      <h2 className="mt-4 text-balance font-display text-[2.25rem] font-medium leading-[1.08] text-plum-900 sm:text-5xl">
        {quest.title}
      </h2>
      <p className="mt-4 font-display text-2xl italic leading-snug text-plum-700 sm:text-[1.75rem]">
        {quest.question}
      </p>

      {quest.target && (
        <div className="mt-6">
          <Countdown target={quest.target} />
        </div>
      )}

      <QuestDetails quest={quest} />

      {quest.link && <ProjectLink link={quest.link} />}
    </article>
  )
}
