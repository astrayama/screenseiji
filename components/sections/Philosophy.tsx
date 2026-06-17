'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import { philosophyItems } from '@/lib/data'

function PhilosophyPanel({
  symbol, title, body, index,
}: typeof philosophyItems[0] & { index: number }) {
  const [open, setOpen] = useState(index === 0)
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn('reveal border-b border-white/6 last:border-0', inView && 'reveal-in')}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="group flex w-full items-start gap-5 py-6 text-left"
      >
        <span
          className={cn(
            'font-display text-4xl font-light leading-none transition-colors duration-300 sm:text-5xl',
            open ? 'text-gold text-glow-gold' : 'text-muted/50 group-hover:text-muted',
          )}
        >
          {symbol}
        </span>
        <div className="flex-1 pt-1">
          <p className={cn(
            'text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-200',
            open ? 'text-gold' : 'text-muted/60 group-hover:text-muted',
          )}>
            {title}
          </p>
        </div>
        <span className={cn('mt-2 shrink-0 text-lg transition-all duration-300', open ? 'text-gold rotate-45' : 'text-muted/40')}>
          +
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{   height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-7 pl-[3.75rem] pr-6 text-base leading-8 text-muted sm:text-lg">
              {body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Philosophy() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section id="philosophy" className="section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          {/* Left: heading + brand story */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-gold">The Philosophy</p>
            <h2 className="font-display text-5xl font-light leading-[1.05] text-foreground sm:text-6xl text-glow-gold">
              0 = 1 = ∞
            </h2>
            <p className="mt-6 text-sm leading-7 text-muted">
              Nothingness, individuality, and infinity are ultimately expressions of the same thing. Emptiness is potential. The self is not separate from the whole. The universe is inherently infinite and interconnected.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              This draws from Buddhist philosophy, Advaita Vedanta, quantum physics, and Jungian psychology. Not because these disciplines agree — but because the places where they rhyme are worth paying attention to.
            </p>
            <div
              ref={ref}
              className={cn(
                'mt-10 border-l-2 border-gold/30 pl-5 reveal',
                inView && 'reveal-in',
              )}
            >
              <p className="font-display text-lg font-light italic leading-relaxed text-foreground/80">
                "Screen Sage lives at the crossroads where a tarot card, a character arc, and a physics equation all say the same thing."
              </p>
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted/50">
              Evolved from Omniversal Seeker · <em>Seeker's Soliloquy</em>
            </p>
          </div>

          {/* Right: accordion */}
          <div className="border-t border-white/6">
            {philosophyItems.map((item, i) => (
              <PhilosophyPanel key={item.symbol + i} {...item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
