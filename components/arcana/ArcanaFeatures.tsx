'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { cn } from '@/lib/utils'
import PhoneFrame from '@/components/arcana/PhoneFrame'
import JournalScreen from '@/components/arcana/screens/JournalScreen'
import DrawScreen from '@/components/arcana/screens/DrawScreen'
import ExportScreen from '@/components/arcana/screens/ExportScreen'
import TarotCard, { CardBack, type CardName } from '@/components/arcana/TarotCard'
import { arcanaFeatures, arcanaMock, type ArcanaFeature } from '@/lib/arcana-content'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
const PHONE_SCALE = '[--phone-scale:0.62] sm:[--phone-scale:0.68]'

// Feature 1 — quick-log vignette (wireframe 2b)
function QuickLogVignette() {
  return (
    <div className="arcana-glass w-full max-w-sm p-6">
      <div className="font-arcana-display text-2xl font-medium">Log today&apos;s card</div>
      <div className="flex items-center gap-2.5 rounded-[13px] border border-arcana-field bg-[#252537]/70 px-3.5 py-3 text-sm text-arcana-muted" style={{ marginTop: 18 }}>
        ⌕ <span className="text-arcana-text">The Moon</span>
        <span aria-hidden className="h-4 w-px animate-pulse bg-arcana-purple" />
      </div>
      <div className="mt-3 flex rounded-[13px] border border-arcana-field bg-[#252537]/60 p-[3px] text-[13px] font-bold">
        <div className="flex-1 rounded-[10px] bg-arcana-purple/25 py-2 text-center text-arcana-purple-soft">↑ Upright</div>
        <div className="flex-1 py-2 text-center text-arcana-muted">↓ Reversed</div>
      </div>
      <div className="mt-3 rounded-[13px] border border-arcana-field bg-[#252537]/60 px-3.5 py-3 text-sm text-arcana-faint">
        What does it stir up?…
      </div>
      <div className="arcana-btn-gold arcana-shimmer mt-4 p-[14px] text-center text-[15px] font-extrabold">
        Save to ledger ✦
      </div>
    </div>
  )
}

// Feature 2 — 3D card flip revealing The Star, with a meaning hint
function FlipVisual() {
  const { reduced } = useMotionPreference()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 })
  const hint = arcanaMock.meaningHint

  return (
    <div ref={ref} className="flex flex-wrap items-center justify-center gap-8">
      <div className="[perspective:1000px]">
        <motion.div
          className="relative h-[300px] w-[180px] [transform-style:preserve-3d]"
          initial={false}
          animate={{ rotateY: inView ? 180 : 0 }}
          transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.3, ease: EASE }}
        >
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <CardBack width={180} height={300} glyphSize={44} className="rounded-[12px]" />
          </div>
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <TarotCard card="star" width={180} height={300} className="rounded-[12px]" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: reduced ? 0 : 1.1, ease: EASE }}
        className="arcana-glass max-w-[230px] p-5"
      >
        <p className="text-[13px] font-bold text-arcana-purple-soft">{hint.lead}</p>
        <p className="mt-2 text-[13px] leading-6 text-arcana-muted">{hint.body}</p>
        <p className="mt-3 border-t border-arcana-stroke/40 pt-3 text-[11.5px] font-bold tracking-wide text-arcana-faint">
          {hint.keywords}
        </p>
      </motion.div>
    </div>
  )
}

// Feature 5 — three-card spread (wireframe 2e)
const SPREAD: { card: CardName; label: string; name: string; reversed?: boolean; glow?: boolean }[] = [
  { card: 'star', label: 'Past', name: 'The Star' },
  { card: 'sun', label: 'Present', name: 'The Sun', glow: true },
  { card: 'ten-of-cups', label: 'Future', name: 'Ten of Cups (R)', reversed: true },
]

function SpreadVisual() {
  const { reduced } = useMotionPreference()

  return (
    <div className="arcana-glass flex w-full max-w-md justify-center gap-3 p-4 sm:gap-6 sm:p-8">
      {SPREAD.map((pos, i) => (
        <motion.div
          key={pos.label}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.12, ease: EASE }}
          className="text-center"
        >
          <div className={cn('arcana-eyebrow mb-2 text-[10px]', !pos.glow && 'text-arcana-faint')}>
            {pos.label}
          </div>
          <TarotCard
            card={pos.card}
            width={96}
            height={160}
            reversed={pos.reversed}
            className="h-[140px] w-[84px] sm:h-[160px] sm:w-[96px]"
            style={pos.glow && !reduced ? { animation: 'arcana-glow 6s ease-in-out infinite' } : undefined}
          />
          <div className="mt-2 text-[12.5px] font-bold">{pos.name}</div>
        </motion.div>
      ))}
    </div>
  )
}

function FeatureVisual({ feature }: { feature: ArcanaFeature }) {
  switch (feature.visual) {
    case 'quicklog':
      return <QuickLogVignette />
    case 'flip':
      return <FlipVisual />
    case 'journal':
      return (
        <PhoneFrame crop label="Arcana's Journal: July 2026 with a 12-day streak, 24 cards, 6 spreads, and ruled ledger rows." className={PHONE_SCALE}>
          <JournalScreen />
        </PhoneFrame>
      )
    case 'draw':
      return (
        <PhoneFrame crop label="Arcana's draw screen: a fanned face-down deck, with a gold HOLD ring to draw a card." className={PHONE_SCALE}>
          <DrawScreen />
        </PhoneFrame>
      )
    case 'spread':
      return <SpreadVisual />
    case 'export':
      return (
        <PhoneFrame crop label="Arcana's export screen: Post 1:1, Story 9:16, and Journal PDF canvases with share options." className={PHONE_SCALE}>
          <ExportScreen />
        </PhoneFrame>
      )
  }
}

function FeatureBlock({ feature, index }: { feature: ArcanaFeature; index: number }) {
  const { reduced } = useMotionPreference()
  const flip = index % 2 === 1

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={reduced ? false : { opacity: 0, x: flip ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={cn(flip && 'lg:order-2')}
      >
        <p className="arcana-eyebrow">
          <span aria-hidden className="mr-1.5 text-arcana-star">✦</span>
          {feature.eyebrow}
        </p>
        <h2 className="mt-4 font-arcana-display text-4xl leading-[1.12] sm:text-5xl">{feature.headline}</h2>
        <p className="mt-5 max-w-md text-base leading-7 text-arcana-muted">{feature.body}</p>
        {feature.chips && (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {feature.chips.map(chip => (
              <span key={chip} className="rounded-full border border-arcana-gold/40 bg-arcana-gold/10 px-4 py-1.5 text-xs font-bold text-arcana-gold">
                {chip}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, x: flip ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className={cn('flex justify-center', flip && 'lg:order-1')}
      >
        <FeatureVisual feature={feature} />
      </motion.div>
    </div>
  )
}

export default function ArcanaFeatures() {
  // overflow-x-clip: the ±40px whileInView slide-ins would otherwise make the
  // page horizontally scrollable while blocks wait below the fold
  return (
    <section className="mx-auto max-w-6xl space-y-28 overflow-x-clip px-5 py-24 sm:px-8 sm:py-32 lg:space-y-36">
      {arcanaFeatures.map((feature, i) => (
        <FeatureBlock key={feature.id} feature={feature} index={i} />
      ))}
    </section>
  )
}
