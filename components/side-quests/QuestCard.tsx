import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Quest, QuestStatus } from '@/lib/side-quests/parse'
import { formatMediumDate } from '@/lib/side-quests/display'
import InlineText from './InlineText'

const STATUS: Record<QuestStatus, { label: string; className: string }> = {
  active:   { label: 'Active',   className: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' },
  paused:   { label: 'Paused',   className: 'border-amber-400/30 bg-amber-400/10 text-amber-300' },
  complete: { label: 'Complete', className: 'border-violet-400/30 bg-violet-400/10 text-violet-300' },
}

// Where a quest stands — deliberately no description or feature list (those live on the portfolio).
export default function QuestCard({ quest }: { quest: Quest }) {
  const status = STATUS[quest.status]

  return (
    <article className="quest-card glass flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8">
      {/* The quest's pinned color — the same one its post-its use in the Log. */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: quest.color }} />

      <div className="flex items-start justify-between gap-4">
        <h2 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
          <span aria-hidden className="h-2 w-2 shrink-0 rotate-45" style={{ background: quest.color }} />
          {quest.title}
        </h2>
        <span
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]',
            status.className,
          )}
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
          {status.label}
        </span>
      </div>

      <p className="mt-5 font-display text-[1.75rem] font-light italic leading-snug text-foreground sm:text-3xl">
        {quest.question}
      </p>

      <dl className="mt-7 space-y-5 border-t border-white/5 pt-6 text-sm">
        {quest.latest && (
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">Latest log</dt>
            <dd className="mt-1.5 leading-6 text-foreground/85">
              <time dateTime={quest.latest.date} className="mr-2 text-muted">
                {formatMediumDate(quest.latest.date)}
              </time>
              <InlineText text={quest.latest.text} />
            </dd>
          </div>
        )}
        {quest.milestone && (
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">Next milestone</dt>
            <dd className="mt-1.5 leading-6 text-foreground/85">{quest.milestone}</dd>
          </div>
        )}
      </dl>

      {quest.link && (
        // mt-auto pins the button to the card's bottom so it lines up across the row.
        <div className="mt-auto pt-7">
          <a
            href={quest.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-4 py-2 text-sm font-medium text-gold transition-all hover:border-gold hover:bg-gold/10"
          >
            View project
            <ArrowUpRight size={15} aria-hidden />
          </a>
        </div>
      )}
    </article>
  )
}
