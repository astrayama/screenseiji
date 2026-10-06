'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Lock, ShieldCheck, Smartphone } from 'lucide-react'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { cn } from '@/lib/utils'
import { aniccaPlans, aniccaPricingNote, aniccaPromises } from '@/lib/anicca-content'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
const PROMISE_ICONS = [Smartphone, Lock, ShieldCheck]

// "Private by design" band, then the three plans
export default function AniccaPricing() {
  const { reduced } = useMotionPreference()

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="anicca-card p-7 sm:p-10"
        >
          <p className="anicca-eyebrow">Private by design</p>
          <h2 className="mt-3 font-anicca-display text-3xl leading-[1.15] text-anicca-ink sm:text-4xl">
            Your inner life stays yours.
          </h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-3">
            {aniccaPromises.map((p, i) => {
              const Icon = PROMISE_ICONS[i]
              return (
                <div key={p.title}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-anicca-lavender/25 text-anicca-violet">
                    <Icon size={19} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-3 text-[15px] font-bold text-anicca-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-anicca-muted">{p.body}</p>
                </div>
              )
            })}
          </div>
          <Link
            href="/apps/anicca/privacy"
            className="mt-8 inline-block rounded-sm text-sm font-bold text-anicca-violet-deep transition-colors duration-200 hover:text-anicca-ink"
          >
            Read the privacy policy →
          </Link>
        </motion.div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="text-center">
          <p className="anicca-eyebrow">Plans</p>
          <h2 className="mt-3 font-anicca-display text-4xl leading-[1.12] text-anicca-ink sm:text-5xl">
            Start free. Go deeper when you’re ready.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {aniccaPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: reduced ? 0 : i * 0.1, ease: EASE }}
              className={cn(
                'anicca-card flex flex-col p-7',
                plan.highlight && 'ring-2 ring-anicca-violet',
              )}
            >
              <h3 className="font-anicca-display text-2xl text-anicca-ink">{plan.name}</h3>
              <p className="mt-1 text-sm text-anicca-muted">{plan.blurb}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="font-anicca-display text-4xl text-anicca-ink">{plan.price}</span>
                {plan.cadence && <span className="text-sm font-semibold text-anicca-muted">{plan.cadence}</span>}
              </p>
              <p className="mt-1 text-[13px] font-semibold text-anicca-violet-deep">
                {plan.yearly ?? 'No subscription needed'}
              </p>
              <ul className="mt-6 space-y-3 border-t border-anicca-lavender/40 pt-6">
                {plan.features.map(f => (
                  <li key={f} className="flex gap-2.5 text-sm leading-6 text-anicca-ink/85">
                    <Check aria-hidden size={16} strokeWidth={2.5} className="mt-1 shrink-0 text-anicca-violet" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-lg text-center text-xs leading-6 text-anicca-body">{aniccaPricingNote}</p>
      </section>
    </>
  )
}
