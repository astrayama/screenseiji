'use client'

import { useRef, useSyncExternalStore } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Smartphone } from 'lucide-react'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { cn } from '@/lib/utils'
import AppStoreBadge from '@/components/anicca/AppStoreBadge'
import ChakraDots from '@/components/anicca/ChakraDots'
import { BalanceRadar, EmotionChip, IntensityDots } from '@/components/anicca/AniccaVisuals'
import { aniccaHero, aniccaMock } from '@/lib/anicca-content'
import { aniccaLinks } from '@/lib/data'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

// Parallax only where the card and its satellites sit side by side with the
// copy (lg+); stacked on a phone, they'd slide over the chart's labels.
const WIDE = '(min-width: 1024px)'
function subscribeWide(onChange: () => void) {
  const mq = window.matchMedia(WIDE)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

export default function AniccaHero() {
  const { reduced } = useMotionPreference()
  const wide = useSyncExternalStore(subscribeWide, () => window.matchMedia(WIDE).matches, () => false)
  const parallax = wide && !reduced
  const sectionRef = useRef<HTMLElement>(null)
  const checkin = aniccaMock.checkin

  // Gentle scroll parallax — the balance card and its satellites drift apart
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const nearY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const farY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.25])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[92svh] max-w-6xl items-center gap-16 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pt-24">
        {/* Copy */}
        <motion.div
          variants={container}
          initial={reduced ? false : 'hidden'}
          animate="visible"
          style={reduced ? undefined : { opacity: textOpacity }}
        >
          <motion.p variants={item} className="anicca-eyebrow flex items-center gap-3 text-[13px]">
            <ChakraDots size={7} gap={4} breathe={!reduced} />
            {aniccaHero.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 font-anicca-display text-5xl leading-[1.06] text-anicca-ink sm:text-6xl lg:text-[66px]"
          >
            {aniccaHero.headlineTop}
            <br />
            <span className="anicca-gtx">{aniccaHero.headlineGradient}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-md text-base leading-7 text-anicca-body sm:text-lg sm:leading-8">
            {aniccaHero.sub}
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap gap-2.5">
            {aniccaHero.chips.map(chip => (
              <span key={chip} className="anicca-chip">
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-6">
            <AppStoreBadge />
            <a
              href={aniccaLinks.discord}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm text-sm font-bold text-anicca-violet-deep transition-colors duration-200 hover:text-anicca-ink"
            >
              Join the Discord →
            </a>
          </motion.div>
        </motion.div>

        {/* Balance card + satellites */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="relative mx-auto w-full max-w-[400px] lg:justify-self-center"
          role="img"
          aria-label={`Anicca's chakra balance chart across the seven energy centers, Root to Crown, with Heart the strongest — beside a check-in of ${checkin.selected}, Heart, intensity ${checkin.intensity} of 5.`}
        >
          <motion.div style={parallax ? { y: cardY } : undefined}>
            <div className={cn('anicca-card p-5 sm:p-6', !reduced && 'animate-anicca-float')}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-anicca-muted">Chakra balance</p>
                  <p className="mt-1 font-anicca-display text-2xl text-anicca-ink">Your energy</p>
                </div>
                <ChakraDots size={5} gap={3} className="mt-2" />
              </div>
              <BalanceRadar className="mt-2" />
            </div>
          </motion.div>

          <motion.div
            aria-hidden
            style={parallax ? { y: nearY } : undefined}
            className="relative z-10 -mt-7 ml-3 w-fit lg:absolute lg:-bottom-20 lg:-left-12 lg:ml-0 lg:mt-0"
          >
            <div className="anicca-card w-[230px] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-anicca-muted">Check-in</p>
              <div className="mt-2.5">
                <EmotionChip emotion={checkin.selected} center="heart" />
              </div>
              <div className="mt-3 flex items-center gap-2.5">
                <IntensityDots value={checkin.intensity} size={9} />
                <span className="text-xs font-bold text-anicca-ink">{checkin.intensity}/5</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            aria-hidden
            style={parallax ? { y: farY } : undefined}
            className="absolute -top-5 right-2 sm:-right-8"
          >
            <span className="anicca-chip bg-white shadow-[0_8px_24px_-10px_rgba(92,64,160,0.35)]">
              <Smartphone size={13} strokeWidth={2.25} />
              Matched on-device
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xl text-anicca-lilac"
        animate={reduced ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        ⌄
      </motion.div>
    </section>
  )
}
