'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import AppStoreBadge from '@/components/arcana/AppStoreBadge'
import { arcanaHero } from '@/lib/arcana-content'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

export default function ArcanaCTA() {
  const { reduced } = useMotionPreference()

  return (
    <section className="px-5 pb-28 pt-8 sm:px-8">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto max-w-2xl text-center"
      >
        <div aria-hidden className="text-4xl text-arcana-star">☾</div>
        <p className="mt-6 font-arcana-display text-3xl italic leading-[1.3] text-arcana-text sm:text-4xl">
          “{arcanaHero.tagline}”
        </p>
        <div className="mt-10 flex justify-center">
          <AppStoreBadge />
        </div>
        <p className="mt-7 text-sm text-arcana-muted">
          Questions?{' '}
          <Link
            href="/apps/arcana/support"
            className="font-bold text-arcana-purple-soft transition-colors duration-200 hover:text-arcana-text"
          >
            Visit support →
          </Link>
        </p>
      </motion.div>
    </section>
  )
}
