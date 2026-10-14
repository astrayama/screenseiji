import { ArrowUpRight } from 'lucide-react'
import { BUTTON_OUTLINE, CARD } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { Quest, QuestStatus } from '@/lib/side-quests/parse'
import { formatMediumDate, localHref } from '@/lib/side-quests/display'
import { LOCAL_HOSTS } from '@/lib/site'
import InlineText from './InlineText'

// Plum ink on a pastel pill; the label says the status, the fill and dot echo it.
const STATUS: Record<QuestStatus, { label: string; className: string; dot: string }> = {
  active:   { label: 'Active',   className: 'bg-blush text-plum-900',    dot: 'bg-current' },
  paused:   { label: 'Paused',   className: 'bg-mist text-plum-700',     dot: 'border-[1.5px] border-current' },
  complete: { label: 'Complete', className: 'bg-lilac/70 text-plum-900', dot: 'bg-current' },
}

/** A field's label: Latest log, Next milestone. */
const LABEL = 'font-eyebrow text-[11px] font-semibold uppercase tracking-[0.22em] text-plum-500'

// Where a quest stands — deliberately no description or feature list (those live on the portfolio).
export default function QuestCard({ quest }: { quest: Quest }) {
  const status = STATUS[quest.status]

  return (
    <article className={cn('quest-card', CARD, 'flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8')}>
      {/* The quest's pinned color — the same one its post-its use in the Log.
          The hairline keeps pale colors visible against the cloud card. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 shadow-[inset_0_-1px_0_rgba(63,42,88,0.1)]"
        style={{ background: quest.color }}
      />

      <div className="flex items-start justify-between gap-4">
        <h2 className="flex items-center gap-2.5 font-eyebrow text-sm font-semibold uppercase tracking-[0.2em] text-plum-900">
          <span
            aria-hidden
            className="postit postit-mini h-3.5 w-3.5 shrink-0 rounded-[2px]"
            style={{ '--postit': quest.color } as React.CSSProperties}
          />
          {quest.title}
        </h2>
        <span
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em]',
            status.className,
          )}
        >
          <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />
          {status.label}
        </span>
      </div>

      <p className="mt-5 font-display text-[1.75rem] font-medium italic leading-snug text-plum-900 sm:text-3xl">
        {quest.question}
      </p>

      <dl className="mt-7 space-y-5 border-t border-mist pt-6 text-sm">
        {quest.latest && (
          <div>
            <dt className={LABEL}>Latest log</dt>
            <dd className="mt-1.5 leading-6 text-plum-700">
              <time dateTime={quest.latest.date} className="mr-2 font-semibold text-plum-500">
                {formatMediumDate(quest.latest.date)}
              </time>
              <InlineText text={quest.latest.text} />
            </dd>
          </div>
        )}
        {quest.milestone && (
          <div>
            <dt className={LABEL}>Next milestone</dt>
            <dd className="mt-1.5 leading-6 text-plum-700">{quest.milestone}</dd>
          </div>
        )}
      </dl>

      {quest.link && <ProjectLink link={quest.link} />}
    </article>
  )
}

// Pages on this site (e.g. /apps/arcana) open in place; everything else in a new tab.
function ProjectLink({ link }: { link: string }) {
  const local = localHref(link, LOCAL_HOSTS)
  return (
    // mt-auto pins the button to the card's bottom so it lines up across the row.
    <div className="mt-auto pt-7">
      <a
        href={local ?? link}
        target={local ? undefined : '_blank'}
        rel={local ? undefined : 'noopener noreferrer'}
        className={cn(BUTTON_OUTLINE, 'gap-1.5 px-4 py-2 text-sm')}
      >
        View project
        {!local && <ArrowUpRight size={15} aria-hidden />}
      </a>
    </div>
  )
}
