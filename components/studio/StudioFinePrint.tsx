'use client'

import { motion } from 'framer-motion'
import { CONTAINER, EYEBROW } from '@/components/ui'
import StudioTitle from '@/components/studio/StudioTitle'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { studio } from '@/lib/data'
import { studioFinePrintCopy } from '@/lib/studio-content'

// The fine print, set as a receipt that prints out of a slot when it scrolls
// into view, then gets stamped. Every term is on it, up front.

const EASE = [0.22, 1, 0.36, 1] as const

// A zig-zag torn edge along the bottom of the receipt.
const TORN_EDGE = {
  maskImage: 'conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg)',
  maskSize: '16px 100%',
  maskPosition: '50%',
  WebkitMaskImage: 'conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg)',
  WebkitMaskSize: '16px 100%',
  WebkitMaskPosition: '50%',
} as const

export default function StudioFinePrint() {
  const { reduced } = useMotionPreference()
  const copy = studioFinePrintCopy

  return (
    <section id="fine-print" aria-labelledby="fine-print-title" className="py-16 sm:py-24">
      <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16`}>
        <div className="max-w-xl">
          <p className={EYEBROW}>{copy.eyebrow}</p>
          <StudioTitle id="fine-print-title" parts={copy.title} className="mt-3" />
        </div>

        <motion.div
          className="mx-auto w-full max-w-[27rem]"
          initial={reduced ? 'shown' : 'hidden'}
          whileInView="shown"
          viewport={{ once: true, amount: 0.35 }}
        >
          {/* The slot it prints from */}
          <div aria-hidden className="relative z-10 mx-[-0.75rem] h-4 rounded-full bg-plum-900 shadow-button" />
          <div className="-mt-2 overflow-hidden px-3 pb-6 pt-2">
            <motion.div
              className="drop-shadow-[0_14px_18px_rgba(89,61,117,0.18)]"
              variants={{
                hidden: { y: '-101%' },
                shown: { y: 0, transition: { duration: 1.3, ease: EASE, delay: 0.15 } },
              }}
            >
              <div className="bg-cloud px-6 pb-9 pt-8 sm:px-8" style={TORN_EDGE}>
                <p className="text-center font-eyebrow text-xs font-semibold uppercase tracking-[0.3em] text-plum-900">
                  <span aria-hidden className="mr-2 text-gold-deep">✦</span>
                  {copy.receiptTitle}
                  <span aria-hidden className="ml-2 text-gold-deep">✦</span>
                </p>
                <p className="mt-1 text-center font-display text-lg italic text-plum-700">{copy.receiptSub}</p>

                <dl className="mt-6 flex flex-col gap-3.5 border-y border-dashed border-plum-500/40 py-5">
                  {studio.finePrint.map(([label, term]) => (
                    // On a phone a long term drops to its own line under the label, like a till receipt.
                    <div key={label} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:flex-nowrap">
                      <dt className="shrink-0 font-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-plum-500">
                        {label}
                      </dt>
                      <span aria-hidden className="min-w-4 flex-1 translate-y-[-0.2rem] border-b-2 border-dotted border-mist" />
                      <dd className="ml-auto text-right text-[15px] font-semibold leading-6 text-plum-900 sm:max-w-[58%]">{term}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-center text-sm leading-6 text-plum-700">{studio.payment}</p>

                {/* Stamped once it has printed */}
                <div aria-hidden className="mt-3 flex justify-end">
                  <motion.span
                    className="flex h-[4.5rem] w-[4.5rem] rotate-[-12deg] items-center justify-center rounded-full border-2 border-gold-deep/70"
                    variants={{
                      hidden: { opacity: 0, scale: 1.6 },
                      shown: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 520, damping: 18, delay: 1.35 } },
                    }}
                  >
                    <span className="flex h-[3.6rem] w-[3.6rem] items-center justify-center rounded-full border border-gold-deep/50 text-center font-eyebrow text-[8px] font-semibold uppercase leading-[1.35] tracking-[0.18em] text-gold-deep">
                      No
                      <br />
                      surprises
                    </span>
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
