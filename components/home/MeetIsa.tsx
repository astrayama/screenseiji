import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Sparkle } from '@/components/brand/SkyArt'
import Fit from '@/components/home/Fit'
import { BUTTON_OUTLINE, CONTAINER, EYEBROW, H2, TAG, TEXT_LINK } from '@/components/ui'
import { socialLinks } from '@/lib/data'
import { meetIsa } from '@/lib/home-content'
import type { Quest } from '@/lib/side-quests/parse'
import { cn } from '@/lib/utils'
import avatar from '@/public/brand/isa-avatar.webp'

const kofi = socialLinks.shop.find(link => link.label === 'Ko-fi')!

/** "Can willpower be…?" reads on from "Lumenwright: " in lower case. */
function lowerFirst(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1)
}

/** The avatar lives in Meet Isa only; the S badge carries the brand everywhere else. */
function Avatar() {
  return (
    <Image
      src={avatar}
      alt="Illustrated portrait of Isa in a pastel kimono, in front of a flower of life"
      sizes="(min-width: 1024px) 304px, (min-width: 640px) 192px, 112px"
      placeholder="blur"
      className="aspect-square w-full rounded-full border-[6px] border-white object-cover shadow-float"
    />
  )
}

/** Who's behind it, and what's being built right now (the way into /side-quests). */
export default function MeetIsa({ quest }: { quest?: Quest }) {
  return (
    <section id="meet-isa" aria-labelledby="meet-isa-title" className="relative py-8 sm:py-[4.5rem]">
      <div className={cn(CONTAINER, 'relative grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-x-6 gap-y-6 sm:grid-cols-[12rem_minmax(0,1fr)] lg:grid-cols-[19rem_minmax(0,1fr)] lg:items-start lg:gap-x-16')}>
        <Sparkle className="-top-3 left-3 h-5 w-5 text-orchid sm:left-6 sm:h-6 sm:w-6" twinkle />
        <div className="lg:row-span-2 lg:pt-2">
          <Avatar />
        </div>

        <div>
          <p className={EYEBROW}>{meetIsa.eyebrow}</p>
          <h2 id="meet-isa-title" className={cn(H2, 'mt-3')}>{meetIsa.title}</h2>
        </div>

        <div className="col-span-2 lg:col-span-1 lg:col-start-2">
          <p className="text-base leading-7 text-plum-700 sm:text-[17px] sm:leading-[1.75]">
            <Fit short={meetIsa.short} long={meetIsa.lead} />
          </p>

          {quest && (
            <a
              href="/side-quests"
              className="group mt-6 flex items-center gap-4 rounded-2xl border border-white bg-cloud p-4 shadow-card transition-transform hover:-translate-y-0.5 sm:px-5"
            >
              <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush/70 text-plum-700">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 0C12.7 6.6 17.4 11.3 24 12 17.4 12.7 12.7 17.4 12 24 11.3 17.4 6.6 12.7 0 12 6.6 11.3 11.3 6.6 12 0Z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn(TAG, 'block')}>
                  <Fit short={meetIsa.nowBuildingShort} long={meetIsa.nowBuilding} />
                </span>
                <span className="mt-1 block font-bold leading-snug text-plum-900">
                  {quest.title}: {lowerFirst(quest.question)}
                </span>
              </span>
              <ArrowRight size={18} aria-hidden className="hidden shrink-0 text-plum-900 transition-transform group-hover:translate-x-0.5 sm:block" />
            </a>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="/about" className={BUTTON_OUTLINE}>
              {meetIsa.more}
            </a>
            <a href={kofi.href} target="_blank" rel="me noopener noreferrer" className={cn(TEXT_LINK, 'text-[15px]')}>
              <Fit short={meetIsa.supportShort} long={meetIsa.support} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
