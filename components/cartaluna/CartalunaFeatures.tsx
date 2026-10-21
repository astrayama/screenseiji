'use client'

import { motion } from 'framer-motion'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import {
  HandsVisual,
  MeaningVisual,
  SpreadsVisual,
  SurroundingsVisual,
  TableVisual,
} from '@/components/cartaluna/CartalunaVisuals'
import { cartalunaFeatures, type CartalunaFeature } from '@/lib/cartaluna-content'
import { cn } from '@/lib/utils'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

function FeatureVisual({ feature }: { feature: CartalunaFeature }) {
  switch (feature.visual) {
    case 'table':
      return <TableVisual />
    case 'hands':
      return <HandsVisual />
    case 'meaning':
      return <MeaningVisual />
    case 'spreads':
      return <SpreadsVisual />
    case 'surroundings':
      return <SurroundingsVisual />
  }
}

function FeatureBlock({ feature, index }: { feature: CartalunaFeature; index: number }) {
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
        <p className="cartaluna-eyebrow">{feature.eyebrow}</p>
        <h3 className="mt-4 font-cartaluna-display text-4xl leading-[1.12] sm:text-5xl">{feature.headline}</h3>
        <p className="mt-5 max-w-md text-base leading-7 text-cartaluna-muted">{feature.body}</p>
        {feature.chips && (
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {feature.chips.map(chip => (
              <li key={chip} className="cartaluna-chip px-4 py-1.5 text-xs font-medium">
                {chip}
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, x: flip ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className={cn('flex justify-center', flip && 'lg:order-1')}
      >
        <FeatureVisual feature={feature} />
      </motion.div>
    </div>
  )
}

export default function CartalunaFeatures() {
  // overflow-x-clip: the ±40px whileInView slide-ins would otherwise make the
  // page horizontally scrollable while blocks wait below the fold
  return (
    <section id="how" aria-labelledby="how-title" className="mx-auto max-w-6xl overflow-x-clip px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="cartaluna-eyebrow">How a reading works</p>
        <h2 id="how-title" className="mt-4 font-cartaluna-display text-3xl leading-tight sm:text-[2.6rem]">
          The table, the cards, and you.
        </h2>
      </div>
      <div className="mt-20 space-y-28 lg:space-y-36">
        {cartalunaFeatures.map((feature, i) => (
          <FeatureBlock key={feature.id} feature={feature} index={i} />
        ))}
      </div>
    </section>
  )
}
