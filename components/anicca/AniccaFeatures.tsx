'use client'

import { motion } from 'framer-motion'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { cn } from '@/lib/utils'
import {
  BreakdownCard,
  CheckInCard,
  KeepCard,
  MapFeelingsCard,
  ReflectionCard,
  TimelineCard,
} from '@/components/anicca/AniccaVisuals'
import { aniccaFeatures, energyCenters, type AniccaFeature } from '@/lib/anicca-content'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

function FeatureVisual({ feature }: { feature: AniccaFeature }) {
  switch (feature.visual) {
    case 'map':
      return <MapFeelingsCard />
    case 'checkin':
      return <CheckInCard />
    case 'balance':
      return <BreakdownCard />
    case 'timeline':
      return <TimelineCard />
    case 'reflection':
      return <ReflectionCard />
    case 'keep':
      return <KeepCard />
  }
}

function FeatureBlock({ feature, index }: { feature: AniccaFeature; index: number }) {
  const { reduced } = useMotionPreference()
  const flip = index % 2 === 1
  // The eyebrow dots climb the energy centers as you scroll — Root first
  const accent = energyCenters[index % energyCenters.length].color

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={reduced ? false : { opacity: 0, x: flip ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={cn(flip && 'lg:order-2')}
      >
        <p className="anicca-eyebrow flex items-center gap-2.5">
          <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: accent }} />
          {feature.eyebrow}
          {feature.pro && (
            <span className="rounded-full bg-anicca-violet px-2 py-0.5 text-[10px] tracking-[0.12em] text-white">Pro</span>
          )}
        </p>
        <h2 className="mt-4 font-anicca-display text-4xl leading-[1.12] text-anicca-ink sm:text-5xl">{feature.headline}</h2>
        <p className="mt-5 max-w-md text-base leading-7 text-anicca-body">{feature.body}</p>
        {feature.chips && (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {feature.chips.map(chip => (
              <span key={chip} className="anicca-chip">
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

export default function AniccaFeatures() {
  // overflow-x-clip: the ±40px whileInView slide-ins would otherwise make the
  // page horizontally scrollable while blocks wait below the fold
  return (
    <section className="mx-auto max-w-6xl space-y-28 overflow-x-clip px-5 py-24 sm:px-8 sm:py-32 lg:space-y-36">
      {aniccaFeatures.map((feature, i) => (
        <FeatureBlock key={feature.id} feature={feature} index={i} />
      ))}
    </section>
  )
}
