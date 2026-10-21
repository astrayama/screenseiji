'use client'

import { motion } from 'framer-motion'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { MoonCardMark } from '@/components/cartaluna/MoonCardMark'
import { DeviceNote, OpenAppButton } from '@/components/cartaluna/OpenApp'
import { cartalunaHero } from '@/lib/cartaluna-content'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

export default function CartalunaCTA() {
  const { reduced } = useMotionPreference()

  return (
    <section className="px-5 pb-28 pt-8 sm:px-8">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <MoonCardMark size={64} className="animate-cartaluna-float" />
        <p className="mt-7 font-cartaluna-display text-3xl italic leading-[1.3] text-cartaluna-text sm:text-4xl">
          “{cartalunaHero.tagline}”
        </p>
        <OpenAppButton className="mt-10" />
        <DeviceNote className="mt-6 text-left" />
      </motion.div>
    </section>
  )
}
