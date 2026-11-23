'use client'

import { motion, type Transition } from 'framer-motion'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { cn } from '@/lib/utils'

// Studio Services' drawings, all hand-built SVG and all decorative
// (aria-hidden). Each one draws what a package actually is: a one-page site
// with the shop's services, hours, map, photos and a booking button, and the
// listing and social profile around it. Colours are the site's tokens via
// fill-*/stroke-* classes; gold is the one accent.

const EASE = [0.22, 1, 0.36, 1] as const
const LABEL = 'font-eyebrow fill-plum-500 text-[7px] font-semibold uppercase tracking-[0.18em]'

/** A four-pointed sparkle, as in components/brand/SkyArt, but inside an SVG. */
function SvgSparkle({ x, y, size, className }: { x: number; y: number; size: number; className?: string }) {
  // The twinkle is a CSS transform, which would replace a transform attribute,
  // so the placing goes on a wrapper.
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}>
      <path
        d="M12 0C12.7 6.6 17.4 11.3 24 12 17.4 12.7 12.7 17.4 12 24 11.3 17.4 6.6 12.7 0 12 6.6 11.3 11.3 6.6 12 0Z"
        className={cn('animate-star-twinkle [transform-box:fill-box] [transform-origin:center]', className)}
      />
    </g>
  )
}

// ─── Hero: the shop, found ──────────────────────────────────────────────────

const AWNING = Array.from({ length: 6 }, (_, i) => 130 + i * 30)

/** A shop's one-page site on a phone, with its listing and social profile drawn in around it. */
export function ShopFoundScene({ className }: { className?: string }) {
  const { reduced } = useMotionPreference()
  const at = (delay: number, extra?: Transition): Transition => ({ duration: 0.6, ease: EASE, delay: reduced ? 0 : delay, ...extra })
  const enter = (delay: number, y = 10) => ({
    initial: reduced ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: at(delay),
  })

  return (
    <svg aria-hidden viewBox="0 0 440 470" className={cn('h-auto w-full overflow-visible', className)}>
      <defs>
        <clipPath id="studio-screen">
          <rect x="130" y="30" width="180" height="400" rx="22" />
        </clipPath>
        <filter id="studio-lift" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#593D75" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Threads from the site out to the listing and the profile */}
      <g fill="none" strokeLinecap="round" className="stroke-gold" strokeWidth="1.6">
        <motion.path
          d="M132 214 C 96 214, 70 232, 70 262"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={at(2.1, { duration: 0.7 })}
        />
        <motion.path
          d="M308 300 C 352 300, 372 256, 368 214"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={at(2.25, { duration: 0.7 })}
        />
      </g>

      {/* The phone */}
      <g filter="url(#studio-lift)">
        <motion.rect
          x="120" y="20" width="200" height="420" rx="30"
          className="fill-cloud"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={at(0.35)}
        />
      </g>
      <motion.rect
        x="120" y="20" width="200" height="420" rx="30"
        fill="none" strokeWidth="2" className="stroke-plum-900"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={at(0, { duration: 1.1 })}
      />

      <g clipPath="url(#studio-screen)">
        {/* Awning: striped, scalloped, and it drops open with a little bounce */}
        <motion.g
          style={{ originY: 0, originX: 0.5, transformBox: 'fill-box' }}
          initial={reduced ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 230, damping: 11, delay: 0.75 }}
        >
          {AWNING.map((x, i) => (
            <path
              key={x}
              d={`M${x},26 H${x + 30} V70 A15,15 0 0 1 ${x},70 Z`}
              className={cn(i % 2 ? 'fill-cloud' : 'fill-blush', 'stroke-plum-900')}
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          ))}
        </motion.g>

        {/* Shop name and the OPEN sign */}
        <motion.g {...enter(1.05)}>
          <text x="220" y="112" textAnchor="middle" className="fill-plum-900 font-display text-[22px] italic">
            Your shop
          </text>
          <rect x="190" y="120" width="60" height="16" rx="8" className="fill-glow" />
          <circle cx="201" cy="128" r="3" className="fill-gold" />
          <text x="226" y="131" textAnchor="middle" className="font-eyebrow fill-plum-900 text-[7.5px] font-semibold tracking-[0.2em]">
            OPEN
          </text>
        </motion.g>

        {/* Services */}
        <motion.g {...enter(1.25)}>
          <text x="144" y="160" className={LABEL}>Services</text>
          {[168, 180, 192].map((y, i) => (
            <g key={y}>
              <rect x="144" y={y} width={[78, 64, 86][i]} height="5" rx="2.5" className="fill-mist" />
              <rect x="276" y={y} width="20" height="5" rx="2.5" className="fill-lilac" />
            </g>
          ))}
        </motion.g>

        {/* Hours: a week, with today in gold */}
        <motion.g {...enter(1.4)}>
          <text x="144" y="216" className={LABEL}>Hours</text>
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x={144 + i * 22} y="222" width="18" height="14" rx="4" className={i === 3 ? 'fill-gold' : 'fill-mist'} />
          ))}
        </motion.g>

        {/* Map, with the pin dropping onto the shop */}
        <motion.g {...enter(1.55)}>
          <text x="144" y="258" className={LABEL}>Map</text>
          <rect x="144" y="264" width="152" height="70" rx="8" className="fill-glow" />
          <g fill="none" strokeLinecap="round" className="stroke-cloud" strokeWidth="5">
            <path d="M144 300 C 180 292, 214 312, 296 296" />
            <path d="M196 264 C 200 288, 190 312, 202 334" />
            <path d="M250 264 L 262 334" />
          </g>
          <path d="M144 318 C 170 314, 190 326, 230 322" fill="none" strokeLinecap="round" strokeWidth="2" className="stroke-lilac" />
        </motion.g>
        {!reduced && (
          <motion.circle
            cx="228" cy="304" r="4" fill="none" strokeWidth="1.5" className="stroke-gold"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 4.5], opacity: [0.9, 0] }}
            style={{ transformBox: 'fill-box', originX: 0.5, originY: 0.5 }}
            transition={{ duration: 1.6, ease: 'easeOut', delay: 2.15, repeat: Infinity, repeatDelay: 2.4 }}
          />
        )}
        <motion.g
          initial={reduced ? false : { y: -46, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 13, delay: 1.95 }}
        >
          <path
            d="M228 304 C 228 304, 216 290, 216 283 A 12 12 0 0 1 240 283 C 240 290, 228 304, 228 304 Z"
            className="fill-plum-900"
          />
          <circle cx="228" cy="283" r="4.5" className="fill-gold" />
        </motion.g>

        {/* Photos */}
        <motion.g {...enter(1.7)}>
          <text x="144" y="356" className={LABEL}>Photos</text>
          {[
            [144, 'fill-blush'],
            [196, 'fill-lilac'],
            [248, 'fill-gold/45'],
          ].map(([x, fill]) => (
            <g key={x}>
              <rect x={x} y="362" width="48" height="38" rx="6" className={fill as string} />
              <path
                d={`M${(x as number) + 6},394 l11,-12 l8,8 l6,-6 l11,10`}
                fill="none" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" className="stroke-cloud"
              />
              <circle cx={(x as number) + 36} cy="372" r="3.5" className="fill-cloud" />
            </g>
          ))}
        </motion.g>

        {/* Book */}
        <motion.g {...enter(1.85)}>
          <rect x="144" y="406" width="152" height="20" rx="10" className="fill-plum-900" />
          <text x="220" y="419" textAnchor="middle" className="font-eyebrow fill-cloud text-[7.5px] font-semibold tracking-[0.24em]">
            BOOK
          </text>
        </motion.g>
      </g>

      {/* The listing: where people nearby find the shop first */}
      <g className="animate-float [animation-duration:7s]">
        <motion.g
          filter="url(#studio-lift)"
          initial={reduced ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformBox: 'fill-box', originX: 0.5, originY: 0 }}
          transition={at(2.55)}
        >
          <rect x="6" y="262" width="128" height="106" rx="12" className="fill-cloud stroke-mist" strokeWidth="1" />
          <text x="20" y="281" className={LABEL}>Listing</text>
          <path d="M28 314 c0 0 -7 -8 -7 -12 a7 7 0 0 1 14 0 c0 4 -7 12 -7 12 Z" className="fill-plum-900" />
          <circle cx="28" cy="302" r="2.4" className="fill-gold" />
          <rect x="42" y="296" width="70" height="5" rx="2.5" className="fill-plum-900/80" />
          <rect x="42" y="306" width="50" height="4" rx="2" className="fill-mist" />
          <rect x="20" y="322" width="100" height="4" rx="2" className="fill-mist" />
          <rect x="20" y="331" width="84" height="4" rx="2" className="fill-mist" />
          {[20, 52, 84].map(x => (
            <rect key={x} x={x} y="343" width="28" height="14" rx="7" className={x === 20 ? 'fill-gold/60' : 'fill-glow'} />
          ))}
        </motion.g>
      </g>

      {/* The profile: tidy basics, a grid of photos */}
      <g className="animate-float [animation-delay:-3s] [animation-duration:8s]">
        <motion.g
          filter="url(#studio-lift)"
          initial={reduced ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformBox: 'fill-box', originX: 0.5, originY: 1 }}
          transition={at(2.7)}
        >
          <rect x="302" y="86" width="132" height="128" rx="12" className="fill-cloud stroke-mist" strokeWidth="1" />
          <circle cx="324" cy="110" r="10" className="fill-blush stroke-plum-900" strokeWidth="1.2" />
          <text x="342" y="106" className={LABEL}>Social</text>
          <rect x="342" y="111" width="56" height="4" rx="2" className="fill-mist" />
          {Array.from({ length: 9 }, (_, i) => {
            const fills = ['fill-blush', 'fill-lilac', 'fill-glow', 'fill-gold/45', 'fill-blush', 'fill-mist', 'fill-lilac', 'fill-glow', 'fill-blush']
            return (
              <rect key={i} x={314 + (i % 3) * 36} y={128 + Math.floor(i / 3) * 27} width="32" height="23" rx="3" className={fills[i]} />
            )
          })}
        </motion.g>
      </g>

      <SvgSparkle x={96} y={70} size={16} className="fill-gold" />
      <SvgSparkle x={404} y={262} size={12} className="fill-gold [animation-delay:-2s]" />
      <SvgSparkle x={62} y={404} size={10} className="fill-orchid [animation-delay:-1s]" />
    </svg>
  )
}

// ─── A hand-drawn gold underline ────────────────────────────────────────────

/** A pen stroke under a word; its parent must be `relative`. */
export function GoldSwash({ className, delay = 0.5 }: { className?: string; delay?: number }) {
  const { reduced } = useMotionPreference()
  return (
    <svg aria-hidden viewBox="0 0 300 24" preserveAspectRatio="none" className={cn('pointer-events-none absolute', className)}>
      <motion.path
        d="M4 15 C 52 6, 128 4, 190 9 S 268 18, 296 7"
        fill="none" strokeWidth="3.5" strokeLinecap="round" className="stroke-gold"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE, delay: reduced ? 0 : delay }}
      />
    </svg>
  )
}

// ─── Package glyphs ─────────────────────────────────────────────────────────
// Small drawings at the top of each package card. They play once in view.

type Tone = 'light' | 'dark'

function inks(tone: Tone) {
  return tone === 'dark'
    ? { line: 'stroke-cloud', paper: 'fill-plum-700', bar: 'fill-cloud/35', accent: 'fill-gold', accentLine: 'stroke-gold' }
    : { line: 'stroke-plum-900', paper: 'fill-cloud', bar: 'fill-mist', accent: 'fill-gold', accentLine: 'stroke-gold' }
}

function useGlyph() {
  const { reduced } = useMotionPreference()
  return {
    reduced,
    play: {
      initial: reduced ? ('shown' as const) : ('hidden' as const),
      whileInView: 'shown' as const,
      viewport: { once: true, amount: 0.6 },
    },
  }
}

/** One page: the five parts of the one-page site, stacking in. */
export function OnePageGlyph({ tone = 'light' }: { tone?: Tone }) {
  const ink = inks(tone)
  const { play } = useGlyph()
  const rows = [
    { y: 18, w: 24 },
    { y: 25, w: 30 },
    { y: 32, w: 18 },
    { y: 39, w: 26 },
  ]
  return (
    <motion.svg aria-hidden viewBox="0 0 72 56" className="h-14 w-[4.5rem]" {...play}>
      <rect x="20" y="3" width="32" height="50" rx="5" strokeWidth="1.5" className={cn(ink.paper, ink.line)} />
      <motion.path
        d="M20 8 a5 5 0 0 1 5 -5 h22 a5 5 0 0 1 5 5 v4 h-32 Z"
        className={ink.accent}
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.3 } } }}
      />
      {rows.map((r, i) => (
        <motion.rect
          key={r.y}
          x="26" y={r.y} width={r.w} height="3" rx="1.5" className={ink.bar}
          style={{ originX: 0, transformBox: 'fill-box' }}
          variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 0.45, ease: EASE, delay: 0.15 + i * 0.12 } } }}
        />
      ))}
      <motion.rect
        x="26" y="45" width="20" height="4" rx="2" className={ink.accent}
        variants={{ hidden: { opacity: 0, y: 3 }, shown: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.7 } } }}
      />
    </motion.svg>
  )
}

/** The site, tied by gold thread to the listing pin and the profile grid. */
export function PresenceGlyph({ tone = 'light' }: { tone?: Tone }) {
  const ink = inks(tone)
  const { play } = useGlyph()
  const thread = (delay: number) => ({
    hidden: { pathLength: 0 },
    shown: { pathLength: 1, transition: { duration: 0.5, ease: EASE, delay } },
  })
  return (
    <motion.svg aria-hidden viewBox="0 0 72 56" className="h-14 w-[4.5rem]" {...play}>
      <motion.path d="M13 22 C 16 14, 22 14, 26 18" fill="none" strokeWidth="1.4" strokeLinecap="round" className={ink.accentLine} variants={thread(0.2)} />
      <motion.path d="M46 38 C 50 44, 56 44, 59 38" fill="none" strokeWidth="1.4" strokeLinecap="round" className={ink.accentLine} variants={thread(0.4)} />
      <rect x="26" y="8" width="20" height="38" rx="4" strokeWidth="1.5" className={cn(ink.paper, ink.line)} />
      <rect x="30" y="14" width="12" height="3" rx="1.5" className={ink.accent} />
      <rect x="30" y="21" width="9" height="2.5" rx="1.25" className={ink.bar} />
      <rect x="30" y="27" width="11" height="2.5" rx="1.25" className={ink.bar} />
      <motion.g variants={{ hidden: { opacity: 0, y: -6 }, shown: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 12, delay: 0.55 } } }}>
        <path d="M11 31 c0 0 -6 -7 -6 -10.5 a6 6 0 0 1 12 0 c0 3.5 -6 10.5 -6 10.5 Z" strokeWidth="1.4" className={cn(ink.paper, ink.line)} />
        <circle cx="11" cy="20.5" r="2" className={ink.accent} />
      </motion.g>
      <motion.g variants={{ hidden: { opacity: 0, scale: 0.6 }, shown: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE, delay: 0.75 } } }} style={{ transformBox: 'fill-box', originX: 0.5, originY: 0.5 }}>
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={52 + (i % 2) * 8} y={22 + Math.floor(i / 2) * 8} width="7" height="7" rx="1.5" strokeWidth="1.2" className={cn(i === 1 ? ink.accent : ink.paper, ink.line)} />
        ))}
      </motion.g>
    </motion.svg>
  )
}

/** A month on the calendar, with a gold check-in moving through it. */
export function UpkeepGlyph({ tone = 'light' }: { tone?: Tone }) {
  const ink = inks(tone)
  const { play, reduced } = useGlyph()
  const days = Array.from({ length: 12 }, (_, i) => [24 + (i % 4) * 8, 26 + Math.floor(i / 4) * 8] as const)
  return (
    <motion.svg aria-hidden viewBox="0 0 72 56" className="h-14 w-[4.5rem]" {...play}>
      <rect x="18" y="8" width="36" height="42" rx="5" strokeWidth="1.5" className={cn(ink.paper, ink.line)} />
      <path d="M18 13 a5 5 0 0 1 5 -5 h26 a5 5 0 0 1 5 5 v5 h-36 Z" className={ink.accent} />
      <path d="M27 5 v6 M45 5 v6" strokeWidth="1.5" strokeLinecap="round" className={ink.line} />
      {days.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" className={ink.bar} />
      ))}
      {/* The monthly check-in: a ring that steps from week to week */}
      <motion.circle
        r="3.6" fill="none" strokeWidth="1.4" className={ink.accentLine}
        variants={{
          hidden: { cx: days[0][0], cy: days[0][1], opacity: 0 },
          shown: {
            cx: reduced ? days[9][0] : [days[0][0], days[5][0], days[10][0], days[9][0]],
            cy: reduced ? days[9][1] : [days[0][1], days[5][1], days[10][1], days[9][1]],
            opacity: 1,
            transition: { duration: 1.4, ease: 'easeInOut', times: [0, 0.35, 0.7, 1], delay: 0.2 },
          },
        }}
      />
    </motion.svg>
  )
}
