'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { MoonCardLoop } from '@/components/cartaluna/MoonCardMark'
import { DeviceNote, OpenAppButton } from '@/components/cartaluna/OpenApp'
import { CardBack, RwsCard } from '@/components/cartaluna/Cards'
import { cartalunaHero } from '@/lib/cartaluna-content'
import { cn } from '@/lib/utils'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const CARD = 'h-[118px] w-[70px] sm:h-[150px] sm:w-[88px]'

/**
 * A Past, Present, Future reading on the mat, seen from your seat: the Hermit
 * and the Moon lie face up, and the Star turns over as the page opens.
 */
function TableSpread() {
  const { reduced } = useMotionPreference()

  return (
    <div className="relative mx-auto w-full max-w-[480px] [perspective:1100px]">
      <motion.div
        initial={reduced ? false : { opacity: 0, rotateX: 58, y: 40 }}
        animate={{ opacity: 1, rotateX: 40, y: 0 }}
        transition={{ duration: 1.1, delay: reduced ? 0 : 0.35, ease: EASE }}
        className="cartaluna-mat relative rounded-[22px] px-4 pb-10 pt-12 [transform-style:preserve-3d] sm:px-8 sm:pb-12 sm:pt-14"
      >
        {/* The deck, waiting at the top of the mat */}
        <div aria-hidden className="absolute left-1/2 top-3 h-[34px] w-[58px] -translate-x-1/2 sm:top-4">
          {[0, 1, 2].map(i => (
            <CardBack key={i} className="absolute inset-0 rounded-[5px] outline-0!" style={{ transform: `translateY(${-i * 2}px)` }} />
          ))}
        </div>

        <div className="flex items-end justify-center gap-3 sm:gap-5">
          {cartalunaHero.spread.map((spot, i) => (
            <div key={spot.label} className="flex flex-col items-center">
              {spot.turns ? (
                <div className={cn('relative [perspective:900px]', CARD)}>
                  <motion.div
                    className="absolute inset-0 [transform-style:preserve-3d]"
                    initial={reduced ? false : { rotateY: 0 }}
                    animate={{ rotateY: 180 }}
                    transition={{ duration: 1, delay: reduced ? 0 : 1.5, ease: EASE }}
                  >
                    <CardBack className="absolute inset-0 [backface-visibility:hidden]" />
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <RwsCard card={spot.card} width={88} height={150} className={cn(CARD, 'shadow-[0_0_28px_rgba(255,217,138,0.35)]')} />
                    </div>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: reduced ? 0 : 0.7 + i * 0.15, ease: EASE }}
                >
                  <RwsCard card={spot.card} width={88} height={150} className={CARD} />
                </motion.div>
              )}
              {/* The spot's name, set into the cloth */}
              <span className="mt-3 font-cartaluna-display text-[12px] italic tracking-wide text-cartaluna-gold/70 sm:text-[13px]">
                {spot.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* The label the app floats in front of a turned card */}
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: reduced ? 0 : 2.5, ease: EASE }}
        className="cartaluna-panel mx-auto -mt-3 w-fit px-4 py-2 text-center text-[12.5px] text-cartaluna-text"
      >
        <span className="text-cartaluna-gold">Present</span> · The Star, upright
      </motion.p>
    </div>
  )
}

export default function CartalunaHero() {
  const { reduced } = useMotionPreference()
  const sectionRef = useRef<HTMLElement>(null)

  // The copy fades a little as you scroll on, and the table drifts up
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const tableY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[92svh] max-w-6xl items-center gap-12 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-24">
        <motion.div
          variants={container}
          initial={reduced ? false : 'hidden'}
          animate="visible"
          style={reduced ? undefined : { opacity: textOpacity }}
        >
          <motion.div variants={item} className="-ml-2 mb-2">
            <MoonCardLoop unit={0.62} />
          </motion.div>

          {/* The app's name and headline share one h1 */}
          <h1>
            <motion.span variants={item} className="cartaluna-eyebrow block">
              {cartalunaHero.eyebrow}
              <span className="text-cartaluna-faint"> · {cartalunaHero.meaning}</span>
            </motion.span>
            <span className="sr-only"> — </span>
            <motion.span
              variants={item}
              className="mt-5 block font-cartaluna-display text-[2.75rem] font-normal leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.25rem]"
            >
              {cartalunaHero.headlineTop}
              <br />
              <span className="cartaluna-gtx italic">{cartalunaHero.headlineAccent}</span>
            </motion.span>
          </h1>

          <motion.p variants={item} className="mt-6 max-w-lg text-[17px] leading-8 text-cartaluna-muted">
            {cartalunaHero.sub}
          </motion.p>

          <motion.ul variants={item} className="mt-6 flex flex-wrap gap-2">
            {cartalunaHero.chips.map(chip => (
              <li key={chip} className="cartaluna-chip px-3.5 py-1.5 text-xs font-medium">
                {chip}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-8">
            <OpenAppButton className="w-full justify-center sm:w-auto" />
            <DeviceNote className="mt-5" />
          </motion.div>
        </motion.div>

        <motion.div style={reduced ? undefined : { y: tableY }}>
          <TableSpread />
        </motion.div>
      </div>
    </section>
  )
}
