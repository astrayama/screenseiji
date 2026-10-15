import { useId } from 'react'
import type { Quest } from '@/lib/side-quests/parse'
import { LABEL } from './QuestCard'

// The main quests waiting their turn, in the order they'll start. Dashed and
// lighter than the main card: drawn in pencil, not ink yet.
export default function MainQuestQueue({ quests }: { quests: Quest[] }) {
  const id = useId()

  return (
    <aside
      aria-labelledby={id}
      className="rounded-3xl border-[1.5px] border-dashed border-lilac bg-cloud/60 p-6 sm:p-8"
    >
      <h2 id={id} className={LABEL}>Up next</h2>
      <ol className="mt-5 space-y-6">
        {quests.map((quest, i) => (
          <li key={quest.title} className="flex gap-4">
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-lilac bg-cloud font-eyebrow text-sm font-semibold text-plum-700"
            >
              {i + 1}
            </span>
            <div className="min-w-0 pt-1">
              <h3 className="flex items-center gap-2.5 font-eyebrow text-sm font-semibold uppercase tracking-[0.2em] text-plum-900">
                <span
                  aria-hidden
                  className="postit postit-mini h-3 w-3 shrink-0 rounded-[2px]"
                  style={{ '--postit': quest.color } as React.CSSProperties}
                />
                {quest.title}
              </h3>
              <p className="mt-2 font-display text-xl italic leading-snug text-plum-700">{quest.question}</p>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  )
}
