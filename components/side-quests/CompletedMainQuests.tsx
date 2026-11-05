import { useId } from 'react'
import { CircleCheck } from 'lucide-react'
import { CARD } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { Quest } from '@/lib/side-quests/parse'
import { formatMediumDate } from '@/lib/side-quests/display'
import { LABEL } from './QuestCard'

const CHIP = 'rounded-full bg-blush/70 px-2.5 py-1 text-xs font-bold text-plum-900'

// Main quests that are done, newest first: one line each, with when and what.
// Solid ink, where "Up next" is drawn in pencil.
export default function CompletedMainQuests({ quests }: { quests: Quest[] }) {
  const id = useId()

  return (
    <aside aria-labelledby={id} className={cn(CARD, 'rounded-3xl p-6 sm:p-8')}>
      <h2 id={id} className={cn(LABEL, 'flex items-center gap-2')}>
        <CircleCheck size={14} aria-hidden />
        Completed
      </h2>
      <ul className="mt-5 space-y-6">
        {quests.map(quest => (
          <li key={quest.title}>
            <h3 className="flex items-center gap-2.5 font-eyebrow text-sm font-semibold uppercase tracking-[0.2em] text-plum-900">
              <span
                aria-hidden
                className="postit postit-mini h-3 w-3 shrink-0 rounded-[2px]"
                style={{ '--postit': quest.color } as React.CSSProperties}
              />
              {quest.title}
            </h3>
            {quest.outcome && <p className="mt-2 leading-6 text-plum-700">{quest.outcome}</p>}
            {(quest.finished || quest.tags.length > 0) && (
              <ul aria-label="Details" className="mt-3 flex flex-wrap gap-1.5">
                {quest.finished && (
                  <li className={CHIP}>
                    Finished <time dateTime={quest.finished}>{formatMediumDate(quest.finished)}</time>
                  </li>
                )}
                {quest.tags.map(tag => <li key={tag} className={CHIP}>{tag}</li>)}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  )
}
