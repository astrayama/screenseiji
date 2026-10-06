'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import AppStoreBadge from '@/components/anicca/AppStoreBadge'
import ChakraDots from '@/components/anicca/ChakraDots'
import { aniccaDisclaimer, aniccaHero } from '@/lib/anicca-content'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

export default function AniccaCTA() {
  const { reduced } = useMotionPreference()

  return (
    <section className="px-5 pb-24 pt-4 sm:px-8">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto max-w-2xl text-center"
      >
        <ChakraDots size={9} gap={7} breathe={!reduced} />
        <p className="anicca-eyebrow mt-7">{aniccaHero.meaning}</p>
        <p className="mt-4 font-anicca-display text-3xl italic leading-[1.3] text-anicca-ink sm:text-4xl">
          “{aniccaHero.tagline}”
        </p>
        <div className="mt-10 flex justify-center">
          <AppStoreBadge />
        </div>
        <p className="mt-7 text-sm text-anicca-body">
          Questions?{' '}
          <Link
            href="/apps/anicca/support"
            className="rounded-sm font-bold text-anicca-violet-deep transition-colors duration-200 hover:text-anicca-ink"
          >
            Visit support →
          </Link>
        </p>
        <p className="mx-auto mt-12 max-w-sm text-xs leading-5 text-anicca-body">{aniccaDisclaimer}</p>
      </motion.div>
    </section>
  )
}
