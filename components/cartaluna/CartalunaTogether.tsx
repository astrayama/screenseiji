'use client'

import { motion } from 'framer-motion'
import { Laptop, LockKeyhole, RectangleGoggles, Smartphone } from 'lucide-react'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { cartalunaTogether } from '@/lib/cartaluna-content'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

function WayIcon({ id }: { id: string }) {
  const ring = 'flex h-12 w-12 items-center justify-center rounded-full border border-cartaluna-gold/40 bg-cartaluna-gold/10 text-cartaluna-glow'
  if (id === 'watchers') {
    return (
      <span className="flex gap-2">
        <span className={ring}><Smartphone size={20} aria-hidden /></span>
        <span className={ring}><Laptop size={20} aria-hidden /></span>
      </span>
    )
  }
  return (
    <span className={ring}>
      <RectangleGoggles size={22} aria-hidden />
    </span>
  )
}

export default function CartalunaTogether() {
  const { reduced } = useMotionPreference()
  const t = cartalunaTogether

  return (
    <section id="together" aria-labelledby="together-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="cartaluna-eyebrow">{t.eyebrow}</p>
        <h2 id="together-title" className="mt-4 font-cartaluna-display text-4xl leading-[1.12] sm:text-5xl">
          {t.headline}
        </h2>
        <p className="mt-5 text-base leading-7 text-cartaluna-muted">{t.body}</p>
      </div>

      <div className="relative mt-16">
        {/* The thread that joins everyone: one sealed connection through the room code */}
        <div
          aria-hidden
          className="absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 border-l border-dashed border-cartaluna-gold/35 lg:inset-x-[16%] lg:top-[3.25rem] lg:bottom-auto lg:h-px lg:w-auto lg:translate-x-0 lg:border-l-0 lg:border-t"
        />

        <ol className="relative grid gap-6 lg:grid-cols-3 lg:gap-8">
          {t.ways.map((way, i) => (
            <motion.li
              key={way.id}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: reduced ? 0 : i * 0.12, ease: EASE }}
              className="cartaluna-panel flex flex-col items-center px-6 pb-7 pt-7 text-center"
            >
              <WayIcon id={way.id} />
              <h3 className="mt-5 font-cartaluna-display text-2xl text-cartaluna-text">{way.title}</h3>
              <p className="mt-2.5 text-[14px] leading-6 text-cartaluna-muted">{way.body}</p>
              {'modes' in way && way.modes && (
                <dl className="mt-4 w-full space-y-2 text-left">
                  {way.modes.map(mode => (
                    <div key={mode.name} className="rounded-[12px] border border-cartaluna-gold/15 bg-cartaluna-night/40 px-3.5 py-2.5">
                      <dt className="text-[13px] font-semibold text-cartaluna-gold">{mode.name}</dt>
                      <dd className="mt-0.5 text-[12.5px] leading-5 text-cartaluna-muted">{mode.body}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <a
          href="#privacy"
          className="cartaluna-chip inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium transition-colors hover:bg-cartaluna-gold/15"
        >
          <LockKeyhole size={15} aria-hidden />
          End-to-end encrypted · how it works
        </a>
        <p className="text-[13px] text-cartaluna-faint">{t.note}</p>
      </div>
    </section>
  )
}
