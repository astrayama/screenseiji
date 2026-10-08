import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Marquee from '@/components/Marquee'
import type { Quest } from '@/lib/side-quests/parse'

interface Props {
  tagline: string
  /** Active quests, most recently logged first (see activeByRecency). */
  quests: Quest[]
}

// A band like the Studio banner, but in the brand's gold: the main quest, a
// ticker of what's being built, and the way into the full log at /side-quests.
// Everything comes from content/side-quests.md at build time.
export default function SideQuestsBanner({ tagline, quests }: Props) {
  return (
    <section aria-labelledby="side-quests-banner-heading" className="relative border-y border-gold/15 bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 pb-6 pt-9 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="rounded border border-gold/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
            Side Quests
          </span>
          <h2 id="side-quests-banner-heading" className="font-display text-2xl font-light text-foreground sm:text-3xl">
            {tagline}
          </h2>
        </div>
        <Link
          href="/side-quests"
          className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:border-gold hover:bg-gold/10"
        >
          Open the quest log
          <ArrowRight size={15} aria-hidden />
        </Link>
      </div>

      {quests.length > 0 && (
        <div className="pb-8">
          <Marquee
            separator="✦"
            className="text-sm"
            items={quests.map(quest => ({
              key: quest.title,
              content: (
                <span className="inline-flex items-center gap-3">
                  <span aria-hidden className="h-2 w-2 shrink-0 rotate-45" style={{ background: quest.color }} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80">{quest.title}</span>
                  <span className="font-display text-base italic text-muted">{quest.question}</span>
                </span>
              ),
            }))}
          />
        </div>
      )}
    </section>
  )
}
