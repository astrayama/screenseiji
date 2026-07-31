'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { cn } from '@/lib/utils'
import PhoneFrame from '@/components/arcana/PhoneFrame'
import TodayScreen from '@/components/arcana/screens/TodayScreen'
import TarotCard from '@/components/arcana/TarotCard'
import AppStoreBadge from '@/components/arcana/AppStoreBadge'
import { arcanaHero } from '@/lib/arcana-content'
import { arcanaLinks } from '@/lib/data'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export default function ArcanaHero() {
  const { reduced } = useMotionPreference()
  const sectionRef = useRef<HTMLElement>(null)

  // Cinematic scroll parallax — phone and fan cards drift at different rates
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const cardNearY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const cardFarY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[92svh] max-w-6xl items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pt-24">
        {/* Copy */}
        <motion.div
          variants={container}
          initial={reduced ? false : 'hidden'}
          animate="visible"
          style={reduced ? undefined : { opacity: textOpacity }}
        >
          <motion.p variants={item} className="arcana-eyebrow text-[13px]">
            <span aria-hidden className="animate-arcana-spark mr-2 inline-block text-arcana-star">✦</span>
            {arcanaHero.eyebrow}
            <span aria-hidden className="animate-arcana-spark ml-2 inline-block text-arcana-star" style={{ animationDelay: '1.2s' }}>✦</span>
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 font-arcana-display text-5xl leading-[1.08] sm:text-6xl lg:text-[64px]"
          >
            {arcanaHero.headlineTop}
            <br />
            <span className="arcana-gtx">{arcanaHero.headlineGradient}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-md text-base leading-7 text-arcana-muted sm:text-lg sm:leading-8">
            {arcanaHero.sub}
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap gap-2.5">
            {arcanaHero.chips.map(chip => (
              <span
                key={chip}
                className="rounded-full border border-arcana-purple/40 bg-arcana-purple/10 px-4 py-1.5 text-xs font-bold text-arcana-purple-soft"
              >
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-6">
            <AppStoreBadge />
            <a
              href={arcanaLinks.discord}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-bold text-arcana-muted transition-colors duration-200 hover:text-arcana-text"
            >
              Join the Discord →
            </a>
          </motion.div>
        </motion.div>

        {/* Phone + card fan */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="relative mx-auto lg:mx-0 lg:justify-self-center"
        >
          <motion.div aria-hidden style={reduced ? undefined : { y: cardNearY }} className="absolute -left-20 top-16 hidden sm:block">
            <TarotCard card="star" width={122} height={204} className="-rotate-[14deg] opacity-80" />
          </motion.div>
          <motion.div aria-hidden style={reduced ? undefined : { y: cardFarY }} className="absolute -right-16 top-44 hidden sm:block">
            <TarotCard card="sun" width={112} height={188} className="rotate-[18deg] opacity-70" />
          </motion.div>
          <motion.div aria-hidden style={reduced ? undefined : { y: cardFarY }} className="absolute -right-6 -top-8 hidden lg:block">
            <TarotCard card="hermit" width={88} height={148} className="rotate-[8deg] opacity-45" />
          </motion.div>

          <motion.div style={reduced ? undefined : { y: phoneY }} className="relative z-10">
            <div className={cn(!reduced && 'animate-arcana-float')} style={{ animationDuration: '7s' }}>
              <PhoneFrame
                tab="today"
                label="Arcana's Today screen: today's card is The Moon, upright, with a journal note, the Tarot Spreads shortcut, and a 12-day streak."
                className="[--phone-scale:0.6] sm:[--phone-scale:0.72] lg:[--phone-scale:0.76]"
              >
                <TodayScreen />
              </PhoneFrame>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xl text-arcana-faint"
        animate={reduced ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        ⌄
      </motion.div>
    </section>
  )
}
