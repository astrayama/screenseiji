'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { CONTAINER, EYEBROW } from '@/components/ui'
import StudioTitle from '@/components/studio/StudioTitle'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { studio } from '@/lib/data'
import { studioStepsCopy } from '@/lib/studio-content'

// How it works: three steps joined by a gold thread that draws itself as you
// scroll, lighting each numeral as it arrives. Across on a wide screen, down
// the left on a phone. With motion off, the thread is whole and all lit.

// Where each numeral lights, as a share of the scroll through the list.
const STOPS = [0.06, 0.5, 0.96]
const LIGHT_UP = 0.06

function Numeral({ n, progress, stop }: { n: number; progress: MotionValue<number>; stop: number }) {
  const lit = useTransform(progress, [stop - LIGHT_UP, stop], [0, 1])
  return (
    <span aria-hidden className="relative block font-display text-[3.75rem] font-medium italic leading-none sm:text-[4.25rem]">
      {/* The outline it starts as… */}
      <span className="text-transparent [-webkit-text-stroke:1.2px_#8A6516]">{n}.</span>
      {/* …and the gold it fills with */}
      <motion.span className="absolute inset-0 text-gold-deep" style={{ opacity: lit }}>
        {n}.
      </motion.span>
    </span>
  )
}

/** The stretch of thread from one numeral to the next. */
function Thread({ progress, from, to }: { progress: MotionValue<number>; from: number; to: number }) {
  const drawn = useTransform(progress, [from, to - LIGHT_UP], [0, 1])
  const line = (vertical: boolean) => (
    <>
      <line {...(vertical ? { x1: 1, y1: 0, x2: 1, y2: 100 } : { x1: 0, y1: 1, x2: 100, y2: 1 })} className="stroke-mist" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <motion.line
        {...(vertical ? { x1: 1, y1: 0, x2: 1, y2: 100 } : { x1: 0, y1: 1, x2: 100, y2: 1 })}
        className="stroke-gold" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"
        style={{ pathLength: drawn }}
      />
    </>
  )
  // The spans do the stretching: an absolutely placed <svg> keeps its own
  // intrinsic size and would ignore left/right or top/bottom.
  return (
    <>
      {/* Phone: down from this numeral to the next */}
      <span aria-hidden className="absolute -bottom-8 left-[1.05rem] top-[4.5rem] w-[2px] md:hidden">
        <svg viewBox="0 0 2 100" preserveAspectRatio="none" className="block h-full w-full">
          {line(true)}
        </svg>
      </span>
      {/* Wider: across from this numeral to the next column's */}
      <span aria-hidden className="absolute -right-6 left-[4.75rem] top-[2.05rem] hidden h-[2px] md:block">
        <svg viewBox="0 0 100 2" preserveAspectRatio="none" className="block h-full w-full">
          {line(false)}
        </svg>
      </span>
    </>
  )
}

export default function StudioSteps() {
  const ref = useRef<HTMLOListElement>(null)
  const { reduced } = useMotionPreference()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 60%'] })
  const eased = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })
  const whole = useMotionValue(1)
  const progress = reduced ? whole : eased
  const last = studio.steps.length - 1

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="border-y border-mist bg-cloud py-16 sm:py-24">
      <div className={CONTAINER}>
        <div className="max-w-2xl">
          <p className={EYEBROW}>{studioStepsCopy.eyebrow}</p>
          <StudioTitle id="how-title" parts={studioStepsCopy.title} className="mt-3" />
        </div>

        <ol ref={ref} className="mt-14 grid gap-10 md:grid-cols-3">
          {studio.steps.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-5 md:block">
              {i < last && <Thread progress={progress} from={STOPS[i]} to={STOPS[i + 1]} />}
              <Numeral n={i + 1} progress={progress} stop={STOPS[i]} />
              <div className="md:mt-5">
                <h3 className="font-eyebrow text-[15px] font-semibold uppercase tracking-[0.14em] text-plum-900">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-base leading-7 text-plum-700">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
