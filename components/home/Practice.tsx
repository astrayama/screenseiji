'use client'

import { ArrowRight } from 'lucide-react'
import WaitlistButton from '@/components/WaitlistButton'
import { Sparkle } from '@/components/brand/SkyArt'
import Fit from '@/components/home/Fit'
import { BUTTON_OUTLINE, CARD, CONTAINER, EYEBROW, H2, LEAD } from '@/components/ui'
import { apps, type AppNode } from '@/lib/data'
import { practice, type PracticeCard } from '@/lib/home-content'
import { cn } from '@/lib/utils'

const CTA = 'mt-4 inline-flex items-center gap-1 self-start whitespace-nowrap text-sm font-bold sm:gap-1.5 sm:text-[15px] text-plum-900 decoration-[1.5px] underline-offset-4 hover:underline'

const CARDS = practice.cards.map(card => ({ card, app: apps.find(a => a.id === card.id)! }))

export default function Practice() {
  return (
    <section id="practice" aria-labelledby="practice-title" className="relative py-8 sm:py-[4.5rem]">
      <Sparkle className="right-[8%] top-12 h-5 w-5 text-orchid sm:right-[14%] sm:top-16 sm:h-6 sm:w-6" twinkle />
      <div className={CONTAINER}>
        <p className={EYEBROW}>{practice.eyebrow}</p>
        <h2 id="practice-title" className={cn(H2, 'mt-3')}>{practice.title}</h2>
        <p className={cn(LEAD, 'mt-3 hidden md:block')}>{practice.lead}</p>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {CARDS.map(({ card, app }) => (
            <li key={app.id} className={cn(CARD, 'flex flex-col p-4 sm:p-5')}>
              <div className="flex items-start justify-between gap-2">
                <span
                  aria-hidden
                  className={cn('flex h-10 w-10 items-center justify-center rounded-full font-display text-2xl font-medium text-plum-900 sm:h-12 sm:w-12 sm:text-[1.75rem]', card.tint)}
                >
                  {app.name[0]}
                </span>
                <span className="mt-1.5 rounded-full bg-blush/70 px-2.5 py-1 text-xs font-bold text-plum-900">
                  <Fit short={card.platformShort} long={card.platform} />
                </span>
              </div>
              <h3 className="mt-3 font-display text-[1.5rem] font-medium leading-tight text-plum-900 sm:text-[1.625rem]">{app.name}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-[1.375rem] text-plum-700 sm:text-[14.5px] sm:leading-6">
                <Fit short={card.short} long={card.blurb} />
              </p>
              <AppCta card={card} app={app} />
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <a href="/apps" className={cn(BUTTON_OUTLINE, 'w-full sm:w-auto')}>
            {practice.seeAll}
            <ArrowRight size={16} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}

/** Join the waitlist, or try it now if there's a public beta. */
function AppCta({ card, app }: { card: PracticeCard; app: AppNode }) {
  const label = (
    <>
      <Fit short={card.ctaShort} long={card.cta} />
      <ArrowRight size={15} aria-hidden />
    </>
  )

  if (app.waitlist) {
    return (
      <WaitlistButton appId={app.id} appName={app.name} className={CTA}>
        {label}
      </WaitlistButton>
    )
  }
  const href = app.tryUrl ?? app.href
  if (!href) return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${card.cta} (${app.name})`} className={CTA}>
      {label}
    </a>
  )
}
