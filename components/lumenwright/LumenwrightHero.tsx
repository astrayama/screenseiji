'use client'

import { useId } from 'react'
import { motion } from 'framer-motion'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { OpenAppButton } from '@/components/lumenwright/OpenApp'
import { FURY, RESOLVE, lumenwrightHero } from '@/lib/lumenwright-content'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

/** A Hollow: a dark, jagged shard with a faint rim. */
function Hollow({ d, cracked }: { d: string; cracked?: string }) {
  return (
    <g>
      <path d={d} fill="#1D1934" stroke="#8C7FD0" strokeOpacity="0.45" strokeWidth="1.2" strokeLinejoin="round" />
      {cracked && <path d={cracked} fill="none" stroke={FURY} strokeOpacity="0.8" strokeWidth="1.2" strokeLinecap="round" />}
    </g>
  )
}

/**
 * The arena at a glance: a Resolve Bulwark holding the front while Fury
 * shards crack a Hollow, with the ring glowing on the hand that made them.
 * Drawn in code; real headset captures can replace it later.
 */
function ArenaScene() {
  const id = useId().replace(/[^\w-]/g, '')

  return (
    <svg viewBox="0 0 520 470" className="h-auto w-full max-w-[520px]" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>
        A gold wall of light holds back dark shard-like Hollows while magenta bolts crack one of them.
      </title>
      <defs>
        <pattern id={`${id}-hex`} width="22" height="38" patternUnits="userSpaceOnUse" patternTransform="scale(0.9)">
          <path d="M11 0 L22 6.3 L22 19 L11 25.3 L0 19 L0 6.3 Z M11 25.3 L11 38" fill="none" stroke={RESOLVE} strokeOpacity="0.32" strokeWidth="1" />
        </pattern>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={RESOLVE} stopOpacity="0.22" />
          <stop offset="1" stopColor={RESOLVE} stopOpacity="0.06" />
        </linearGradient>
        <radialGradient id={`${id}-floor`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#2A2A5A" stopOpacity="0.9" />
          <stop offset="1" stopColor="#161632" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-ring`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={RESOLVE} stopOpacity="0.55" />
          <stop offset="1" stopColor={RESOLVE} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* The platform in the void */}
      <ellipse cx="260" cy="420" rx="240" ry="44" fill={`url(#${id}-floor)`} />
      <ellipse cx="260" cy="420" rx="200" ry="32" fill="none" stroke={RESOLVE} strokeOpacity="0.16" />

      {/* Hollows closing in, the far ones drifting */}
      <g className="animate-lumenwright-drift">
        <Hollow d="M58 92 L92 70 L104 108 L84 140 L52 126 Z" />
        <Hollow d="M238 34 L262 22 L272 48 L250 62 Z" />
        <Hollow d="M286 52 L300 42 L308 60 L294 70 Z" />
        <Hollow d="M214 66 L228 58 L234 74 L220 80 Z" />
      </g>
      <Hollow
        d="M392 120 L436 96 L462 138 L446 186 L402 176 L384 148 Z"
        cracked="M420 112 L414 140 L428 156 M414 140 L398 150"
      />
      {/* Flakes breaking off the struck Hollow */}
      <g fill="#8C7FD0" fillOpacity="0.7">
        <path d="M470 116 l8 -3 -2 8 z" />
        <path d="M466 168 l7 2 -5 5 z" />
        <path d="M478 146 l6 -1 -3 6 z" />
      </g>

      {/* Fury: Shards fired from the hand toward the struck Hollow */}
      <g filter={`url(#${id}-glow)`} className="animate-lumenwright-fury">
        <path d="M352 372 L412 168" stroke={FURY} strokeWidth="3" strokeLinecap="round" />
        <path d="M372 380 L432 182" stroke={FURY} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
        <path d="M402 214 l10 -14 4 16 z" fill={FURY} />
        <path d="M384 262 l9 -12 3 14 z" fill={FURY} />
      </g>

      {/* Resolve: a Bulwark planted in front */}
      <g className="animate-lumenwright-pulse">
        <path
          d="M118 168 L318 146 L318 336 L118 352 Z"
          fill={`url(#${id}-wall)`}
          stroke={RESOLVE}
          strokeWidth="2.5"
          strokeLinejoin="round"
          filter={`url(#${id}-glow)`}
        />
        <path d="M118 168 L318 146 L318 336 L118 352 Z" fill={`url(#${id}-hex)`} />
        <path d="M118 168 L318 146" stroke="#FFF1C9" strokeWidth="1.2" strokeOpacity="0.8" />
      </g>
      {/* A Hollow pressing on the wall */}
      <Hollow d="M150 118 L186 104 L202 136 L182 160 L146 150 Z" />

      {/* The ring on the player's hand */}
      <circle cx="300" cy="420" r="38" fill={`url(#${id}-ring)`} />
      <circle cx="300" cy="420" r="14" fill="none" stroke={RESOLVE} strokeWidth="4" filter={`url(#${id}-glow)`} />
    </svg>
  )
}

export default function LumenwrightHero() {
  const { reduced } = useMotionPreference()

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[92svh] max-w-6xl items-center gap-12 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-24">
        <motion.div variants={container} initial={reduced ? false : 'hidden'} animate="visible">
          {/* The app's name and headline share one h1 */}
          <h1>
            <motion.span variants={item} className="lumenwright-eyebrow block">
              {lumenwrightHero.eyebrow}
              <span className="text-lumenwright-faint"> · {lumenwrightHero.meaning}</span>
            </motion.span>
            <span className="sr-only">: </span>
            <motion.span
              variants={item}
              className="mt-5 block text-balance font-lumenwright-display text-[2.6rem] font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-[4rem]"
            >
              {lumenwrightHero.headline[0]}
              <span className="lumenwright-gtx">{lumenwrightHero.headline[1]}</span>
              {lumenwrightHero.headline[2]}
            </motion.span>
          </h1>

          <motion.p variants={item} className="mt-6 max-w-lg text-[17px] leading-8 text-lumenwright-muted">
            {lumenwrightHero.sub}
          </motion.p>

          <motion.ul variants={item} className="mt-6 flex flex-wrap gap-2">
            {lumenwrightHero.chips.map(chip => (
              <li key={chip} className="lumenwright-chip px-3.5 py-1.5 text-xs font-medium">
                {chip}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-8">
            <OpenAppButton className="w-full justify-center sm:w-auto" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: reduced ? 0 : 0.3, ease: EASE }}
          className="flex justify-center"
        >
          <ArenaScene />
        </motion.div>
      </div>
    </section>
  )
}
