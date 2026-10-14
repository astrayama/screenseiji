import { AppWindow, CirclePlay, Smartphone } from 'lucide-react'
import { CloudBand, FlowerOfLife, Heart, Sparkle } from '@/components/brand/SkyArt'
import Fit from '@/components/home/Fit'
import { CONTAINER, TAG } from '@/components/ui'
import { doors, hero } from '@/lib/home-content'
import { cn } from '@/lib/utils'

// The sky from the channel banner: orchid on the left, blush up top, mist on the right.
const SKY =
  'radial-gradient(ellipse 55% 60% at 0% 45%, rgba(233,176,218,0.85), transparent 70%),' +
  'radial-gradient(ellipse 55% 60% at 100% 60%, rgba(221,208,231,0.95), transparent 70%),' +
  'linear-gradient(180deg, #F2C5DF 0%, #F6CDE3 40%, #F0D2E6 100%)'

/** A tarot card with a sparkle on it, in lucide's style, for the Reflect door. */
function TarotCardIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 7.5c.4 2.1 1.4 3.1 3.5 3.5-2.1.4-3.1 1.4-3.5 3.5-.4-2.1-1.4-3.1-3.5-3.5 2.1-.4 3.1-1.4 3.5-3.5Z" />
    </svg>
  )
}

const DOOR_ICONS = {
  watch: { icon: <CirclePlay size={20} aria-hidden />, tint: 'bg-glow' },
  practice: { icon: <Smartphone size={20} aria-hidden />, tint: 'bg-lilac/45' },
  reflect: { icon: <TarotCardIcon />, tint: 'bg-blush/70' },
  build: { icon: <AppWindow size={20} aria-hidden />, tint: 'bg-mist/70' },
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-[6.5rem] sm:pb-52 sm:pt-36" style={{ background: SKY }}>
      <FlowerOfLife
        id="hero-flower"
        className="pointer-events-none absolute left-1/2 top-14 w-[min(44.5rem,98vw)] -translate-x-1/2 text-white/60 sm:top-16"
      />

      {/* Sparkles, a few per screen; hearts, hero only */}
      <Sparkle className="left-[8%] top-[24%] h-6 w-6 text-cloud sm:top-[21%] sm:h-7 sm:w-7" twinkle />
      <Sparkle className="left-[30%] top-[13%] hidden h-3 w-3 text-cloud sm:block" twinkle style={{ animationDelay: '1.2s' }} />
      <Sparkle className="right-[26%] top-[17%] hidden h-5 w-5 text-cloud sm:block" twinkle style={{ animationDelay: '2.4s' }} />
      <Sparkle className="right-[9%] top-[40%] h-6 w-6 text-cloud sm:h-7 sm:w-7" twinkle style={{ animationDelay: '0.6s' }} />
      <Sparkle className="left-[16%] top-[46%] hidden h-2.5 w-2.5 text-cloud sm:block" twinkle style={{ animationDelay: '3s' }} />
      <Heart className="left-[9%] top-[10%] h-[18px] w-5 sm:left-[24%] sm:top-[19%] sm:h-5 sm:w-[22px]" />
      <Heart className="right-[8%] top-[10%] h-[22px] w-6 sm:right-[13%] sm:top-[22%] sm:h-6 sm:w-[26px]" style={{ animationDelay: '2s' }} />
      <Heart className="left-[12%] top-[31%] h-[22px] w-6 sm:left-[11%] sm:top-[31%] sm:h-6 sm:w-[26px]" style={{ animationDelay: '4s' }} />
      <Heart className="right-[19%] top-[47%] hidden h-[18px] w-5 sm:block" style={{ animationDelay: '1s' }} />

      <CloudBand className="h-[15rem] sm:h-[21rem] lg:h-[24rem]" eager />

      <div className={cn(CONTAINER, 'relative text-center')}>
        <h1>
          <span className="block font-eyebrow text-[11px] font-semibold uppercase tracking-[0.32em] text-plum-900 sm:text-sm sm:tracking-[0.36em]">
            {hero.eyebrow.map((word, i) => (
              <span key={word}>
                {i > 0 && <span aria-hidden className="mx-2 sm:mx-3">✦</span>}
                {i > 0 && <span className="sr-only">, </span>}
                {word}
              </span>
            ))}
          </span>
          <span className="sr-only"> — </span>
          <span
            className="mt-2 block font-display font-semibold leading-[1.02] tracking-[-0.01em] text-plum-900 [text-shadow:0_0_40px_rgba(255,251,253,0.7)]"
            style={{ fontSize: 'clamp(4rem, 10.5vw, 8.5rem)' }}
          >
            {hero.title}
          </span>
        </h1>

        <p className="mt-1 flex items-center justify-center gap-2 font-display text-[1.375rem] font-medium italic text-plum-900 sm:gap-3 sm:text-[2rem]">
          <span aria-hidden className="flex items-center">
            <span className="h-px w-7 bg-plum-900/70 sm:w-20" />
            <span className="ml-2 h-1 w-1 rounded-full bg-plum-900" />
          </span>
          {hero.tagline}
          <span aria-hidden className="flex items-center">
            <span className="mr-2 h-1 w-1 rounded-full bg-plum-900" />
            <span className="h-px w-7 bg-plum-900/70 sm:w-20" />
          </span>
        </p>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-plum-700 sm:text-lg sm:leading-8">
          {hero.lead}
          <span className="hidden md:inline">
            <br />
            {hero.leadMore}
          </span>
        </p>

        {/* The four doors, each one tap from its section */}
        <nav aria-label="Start here" className="mt-9 sm:mt-14">
          <ul className="grid grid-cols-2 gap-3 text-left sm:gap-4 lg:grid-cols-4">
            {doors.map(door => {
              const { icon, tint } = DOOR_ICONS[door.id]
              return (
                <li key={door.id}>
                  <a
                    href={`#${door.id}`}
                    className="flex h-full flex-col rounded-[1.375rem] border border-white bg-cloud/95 p-4 shadow-float transition-transform duration-300 hover:-translate-y-1 sm:p-5"
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span className={cn('flex h-10 w-10 items-center justify-center rounded-full text-plum-900 sm:h-11 sm:w-11', tint)}>
                        {icon}
                      </span>
                      <span className={cn(TAG, 'pt-2.5 text-right')}>
                        <Fit short={'tagShort' in door ? door.tagShort : undefined} long={door.tag} />
                      </span>
                    </span>
                    <span className="mt-3 block font-display text-[1.75rem] font-semibold leading-tight text-plum-900 sm:mt-4 sm:text-[2rem]">
                      {door.title}
                    </span>
                    <span className="mt-1.5 block text-[14.5px] leading-6 text-plum-700">
                      <Fit short={door.short} long={door.description} />
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </section>
  )
}
