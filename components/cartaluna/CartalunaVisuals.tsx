'use client'

import { motion } from 'framer-motion'
import { Gamepad2, Hand, HandGrab, RotateCcw } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { CardBack, CardSlot, RwsCard } from '@/components/cartaluna/Cards'
import {
  cartalunaBacks,
  cartalunaCustomSpread,
  cartalunaHands,
  cartalunaMeaning,
  cartalunaSpreads,
  cartalunaSurroundings,
  type SpreadSketch,
} from '@/lib/cartaluna-content'
import { cn } from '@/lib/utils'

// The feature section's pictures, drawn in code from the app's own data.

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

// ─── The deck finds your table ──────────────────────────────────────────────

const FINDING = ['Your Space Setup table', 'The nearest flat surface at table height', 'A floating mat in front of you']

export function TableVisual() {
  const { reduced } = useMotionPreference()

  return (
    <div className="w-full max-w-md">
      <div
        role="img"
        aria-label="A table seen in perspective: a dashed gold outline marks the detected surface, and the mat sits anchored on it."
        className="relative [perspective:900px]"
      >
        <div className="relative mx-auto h-[210px] w-full rounded-[18px] [transform:rotateX(48deg)] [transform-style:preserve-3d]">
          {/* The real table */}
          <div className="absolute inset-0 rounded-[18px] bg-[linear-gradient(160deg,#3A2B1F,#241912)] shadow-[0_40px_60px_rgba(0,0,0,0.5)]" />
          {/* The surface the headset detected */}
          <motion.div
            className="absolute inset-3 rounded-[14px] border-2 border-dashed border-cartaluna-glow/70"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: [0, 1, 0.55] }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.6, ease: EASE }}
          />
          {/* The mat, settling onto it */}
          <motion.div
            className="cartaluna-mat absolute inset-x-[18%] inset-y-[16%] rounded-[12px] outline-offset-[-8px]!"
            initial={reduced ? false : { opacity: 0, y: -40, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: reduced ? 0 : 0.9, ease: EASE }}
          >
            <div className="flex h-full items-center justify-center gap-3">
              <CardSlot className="h-[58%] w-[16%]" />
              <CardSlot className="h-[58%] w-[16%]" />
              <CardSlot className="h-[58%] w-[16%]" />
            </div>
          </motion.div>
        </div>
      </div>

      <ol className="cartaluna-panel mt-6 space-y-2.5 p-5 text-[13.5px] text-cartaluna-muted">
        <li className="cartaluna-eyebrow mb-1 text-[10.5px]">Where the mat goes</li>
        {FINDING.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cartaluna-gold/40 text-[11px] font-semibold text-cartaluna-gold">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  )
}

// ─── Shuffle, draw, turn ────────────────────────────────────────────────────

const HAND_ICONS = [Hand, HandGrab, RotateCcw]

const CONTROLLERS = [
  { action: 'Take a card', how: 'Trigger, up close' },
  { action: 'Lift the deck', how: 'Grip button' },
  { action: 'Tap from a distance', how: 'Point and pull the trigger' },
]

export function HandsVisual() {
  const { reduced } = useMotionPreference()

  return (
    <div className="w-full max-w-md space-y-4">
      <ol className="grid grid-cols-3 gap-3">
        {cartalunaHands.map((step, i) => {
          const Icon = HAND_ICONS[i]
          return (
            <motion.li
              key={step.step}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.12, ease: EASE }}
              className="cartaluna-panel flex flex-col items-center px-2 py-5 text-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cartaluna-gold/35 bg-cartaluna-gold/10 text-cartaluna-glow">
                <Icon size={20} aria-hidden />
              </span>
              <span className="mt-3 font-cartaluna-display text-lg text-cartaluna-text">{step.step}</span>
              <span className="mt-1 text-[12px] leading-5 text-cartaluna-muted">{step.how}</span>
            </motion.li>
          )
        })}
      </ol>

      <div className="cartaluna-panel p-5">
        <p className="cartaluna-eyebrow flex items-center gap-2 text-[10.5px]">
          <Gamepad2 size={14} aria-hidden />
          With controllers
        </p>
        <dl className="mt-3 space-y-2 text-[13px]">
          {CONTROLLERS.map(row => (
            <div key={row.action} className="flex justify-between gap-4 border-t border-cartaluna-gold/10 pt-2 first:border-0 first:pt-0">
              <dt className="text-cartaluna-muted">{row.action}</dt>
              <dd className="text-right text-cartaluna-text">{row.how}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

// ─── Each card asks you something ───────────────────────────────────────────

export function MeaningVisual() {
  const { reduced } = useMotionPreference()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 })
  const m = cartalunaMeaning

  return (
    <div ref={ref} className="flex flex-wrap items-center justify-center gap-7">
      <div className="h-[250px] w-[146px] [perspective:1000px]">
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          initial={false}
          animate={{ rotateY: inView || reduced ? 180 : 0 }}
          transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.3, ease: EASE }}
        >
          <CardBack className="absolute inset-0 rounded-[10px] [backface-visibility:hidden]" />
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <RwsCard card="star" width={146} height={250} className="h-[250px] w-[146px] rounded-[10px]" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: reduced ? 0 : 1.1, ease: EASE }}
        className="cartaluna-panel w-full max-w-[280px] p-5"
      >
        <p className="cartaluna-eyebrow text-[10.5px]">{m.position}</p>
        <p className="mt-1 text-[12.5px] italic text-cartaluna-faint">{m.asks}</p>
        <p className="mt-3 font-cartaluna-display text-xl text-cartaluna-text">
          {m.card} <span className="text-[14px] text-cartaluna-muted">· {m.orientation}</span>
        </p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {m.keywords.map(word => (
            <li key={word} className="cartaluna-chip px-2.5 py-0.5 text-[11px]">{word}</li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] leading-6 text-cartaluna-muted">{m.read}</p>
        <p className="mt-3 border-t border-cartaluna-gold/15 pt-3 font-cartaluna-display text-[14px] italic leading-6 text-cartaluna-moon">
          {m.question}
        </p>
      </motion.div>
    </div>
  )
}

// ─── From one card to twelve ────────────────────────────────────────────────

const SLOT_W = 0.56
const SLOT_H = 0.9

/** A spread's spots as a small diagram: +y is away from you, so it's up. */
function SpreadSketchSvg({ spread }: { spread: SpreadSketch }) {
  const points = [...spread.slots, ...(spread.deck ? [spread.deck] : [])]
  const pad = 0.75
  const minX = Math.min(...points.map(p => p.x)) - pad
  const maxX = Math.max(...points.map(p => p.x)) + pad
  const minY = Math.min(...points.map(p => -p.y)) - pad
  const maxY = Math.max(...points.map(p => -p.y)) + pad
  const width = Math.max(maxX - minX, 3)
  const height = Math.max(maxY - minY, 2.2)
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2

  return (
    <svg
      viewBox={`${cx - width / 2} ${cy - height / 2} ${width} ${height}`}
      aria-hidden
      className="h-16 w-full"
    >
      {spread.deck && (
        <rect
          x={spread.deck.x - SLOT_W / 2}
          y={-spread.deck.y - SLOT_H / 2}
          width={SLOT_W}
          height={SLOT_H}
          rx={0.07}
          fill="#15100C"
          stroke="#D4AF37"
          strokeWidth={0.04}
        />
      )}
      {spread.slots.map((slot, i) => (
        <rect
          key={i}
          x={slot.x - SLOT_W / 2}
          y={-slot.y - SLOT_H / 2}
          width={SLOT_W}
          height={SLOT_H}
          rx={0.07}
          fill={i === spread.crossing ? 'rgba(212,175,55,0.38)' : 'rgba(212,175,55,0.16)'}
          stroke="#D4AF37"
          strokeOpacity={0.75}
          strokeWidth={0.035}
          transform={i === spread.crossing ? `rotate(90 ${slot.x} ${-slot.y})` : undefined}
        />
      ))}
    </svg>
  )
}

export function SpreadsVisual() {
  const { reduced } = useMotionPreference()

  return (
    <ul className="grid w-full max-w-md grid-cols-2 gap-3">
      {cartalunaSpreads.map((spread, i) => (
        <motion.li
          key={spread.name}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : (i % 4) * 0.08, ease: EASE }}
          className="cartaluna-panel p-3.5"
        >
          <SpreadSketchSvg spread={spread} />
          <p className="mt-2.5 font-cartaluna-display text-[15px] leading-tight text-cartaluna-text">{spread.name}</p>
          <p className="mt-0.5 text-[11.5px] text-cartaluna-faint">
            {spread.slots.length} {spread.slots.length === 1 ? 'card' : 'cards'}
          </p>
        </motion.li>
      ))}
      <motion.li
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: reduced ? 0 : 0.24, ease: EASE }}
        className="flex flex-col justify-center rounded-[16px] border border-dashed border-cartaluna-gold/45 p-3.5"
      >
        <p className="font-cartaluna-display text-[15px] text-cartaluna-glow">{cartalunaCustomSpread.name}</p>
        <p className="mt-1 text-[11.5px] leading-[1.15rem] text-cartaluna-muted">{cartalunaCustomSpread.summary}</p>
      </motion.li>
    </ul>
  )
}

// ─── Read in your room, or under the stars ──────────────────────────────────

/** Each back's look, sketched in CSS. Like the real ones, each reads the same upside down. */
function backPattern(id: string, ink: string): string {
  switch (id) {
    case 'deck':
      return `radial-gradient(circle, ${ink} 0 1.6px, transparent 2px) 0 0 / 9px 9px, radial-gradient(circle, ${ink}88 0 1px, transparent 1.4px) 4.5px 4.5px / 9px 9px`
    case 'celestial':
      return `radial-gradient(circle at 50% 50%, ${ink} 0 5px, transparent 5.5px), radial-gradient(circle, ${ink}cc 0 0.8px, transparent 1.2px) 0 0 / 11px 13px`
    case 'botanical':
      return `repeating-linear-gradient(60deg, ${ink}66 0 1px, transparent 1px 8px), repeating-linear-gradient(-60deg, ${ink}66 0 1px, transparent 1px 8px)`
    case 'sacred-geometry':
      return `repeating-radial-gradient(circle at 50% 50%, ${ink}99 0 1px, transparent 1px 7px)`
    case 'neon-circuit':
      return `linear-gradient(${ink}55 1px, transparent 1px) 0 0 / 9px 9px, linear-gradient(90deg, ${ink}55 1px, transparent 1px) 0 0 / 9px 9px, radial-gradient(circle, #FF3FD2 0 1.4px, transparent 1.8px) 4px 4px / 18px 18px`
    case 'winter':
      return `radial-gradient(circle, ${ink} 0 1.2px, transparent 1.6px) 0 0 / 10px 10px, radial-gradient(circle, ${ink}77 0 0.8px, transparent 1.2px) 5px 5px / 10px 10px`
    default:
      return 'none'
  }
}

export function SurroundingsVisual() {
  return (
    <div className="w-full max-w-md space-y-4">
      <ul className="grid grid-cols-2 gap-3">
        {cartalunaSurroundings.map(place => (
          <li key={place.id} className="overflow-hidden rounded-[16px] border border-cartaluna-gold/20">
            <div
              aria-hidden
              className={cn('relative h-24', !place.sky && 'bg-[#2C2A28]')}
              style={place.sky ? { background: `linear-gradient(180deg, ${place.sky.join(', ')})` } : undefined}
            >
              {place.id === 'night-sanctum' && <div className="cartaluna-stars absolute inset-0" />}
              {!place.sky && (
                <div className="absolute inset-3 rounded-[10px] border border-dashed border-cartaluna-muted/50" />
              )}
            </div>
            <div className="bg-cartaluna-card/90 px-3.5 py-2.5">
              <p className="font-cartaluna-display text-[15px] text-cartaluna-text">{place.name}</p>
              {place.note && <p className="text-[11.5px] text-cartaluna-faint">{place.note}</p>}
            </div>
          </li>
        ))}
      </ul>

      <div className="cartaluna-panel p-5">
        <p className="cartaluna-eyebrow text-[10.5px]">Seven card backs</p>
        <ul className="mt-3.5 flex flex-wrap gap-2.5">
          {cartalunaBacks.map(back => (
            <li key={back.id} title={back.name}>
              <span
                className="block h-[58px] w-[36px] rounded-[5px] border-[1.5px] shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                style={{ background: `${backPattern(back.id, back.ink)}, ${back.base}`, borderColor: back.ink }}
              />
              <span className="sr-only">{back.name}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[12px] leading-5 text-cartaluna-faint">
          The deck’s own 1909 roses and lilies, or Celestial, Botanical, Sacred geometry, Minimal, Neon circuit and Winter.
        </p>
      </div>
    </div>
  )
}
