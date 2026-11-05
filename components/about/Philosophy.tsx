'use client'

import { useId, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import { philosophyItems } from '@/lib/data'
import Collapsible from '@/components/Collapsible'
import { EYEBROW, H2 } from '@/components/ui'

function PhilosophyPanel({
  symbol, title, body, index,
}: typeof philosophyItems[0] & { index: number }) {
  const [open, setOpen] = useState(index === 0)
  const { ref, inView } = useInView<HTMLDivElement>()
  const panelId = useId()

  return (
    <div
      ref={ref}
      className={cn('reveal border-b border-mist last:border-0', inView && 'reveal-in')}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-start gap-5 py-6 text-left"
      >
        <span
          aria-hidden
          className={cn(
            'font-display text-4xl font-medium leading-none transition-colors duration-300 sm:text-5xl',
            open ? 'text-plum-900' : 'text-plum-500/60 group-hover:text-plum-700',
          )}
        >
          {symbol}
        </span>
        <div className="flex-1 pt-1">
          <p className={cn(
            'text-sm font-bold uppercase tracking-[0.18em] transition-colors duration-200',
            open ? 'text-plum-900' : 'text-plum-500 group-hover:text-plum-700',
          )}>
            {title}
          </p>
        </div>
        <span
          aria-hidden
          className={cn(
            'mt-2 shrink-0 text-lg transition-[color,transform] duration-300',
            open ? 'rotate-45 text-plum-900' : 'text-plum-500/60 group-hover:text-plum-700',
          )}
        >
          +
        </span>
      </button>

      <Collapsible id={panelId} open={open}>
        <p className="pb-7 pl-[3.75rem] pr-6 text-base leading-8 text-plum-700 sm:text-lg">
          {body}
        </p>
      </Collapsible>
    </div>
  )
}

/** 0 = 1 = ∞ — the idea under everything, on /about after "Meet Isa". */
export default function Philosophy({ className }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section
      aria-labelledby="philosophy"
      className={cn('grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16', className)}
    >
      {/* Left: heading + brand story */}
      <div>
        <p className={EYEBROW}>The Philosophy</p>
        <h2 id="philosophy" className={cn(H2, 'mt-3 scroll-mt-28')}>
          0 = 1 = ∞
        </h2>
        <p className="mt-6 text-[15px] leading-7 text-plum-700">
          The equation is shorthand for one idea: nothingness, the self, and infinity are the same thing seen from three sides. The three panels take each one in turn.
        </p>
        <div
          ref={ref}
          className={cn(
            'reveal mt-10 border-l-2 border-orchid pl-5',
            inView && 'reveal-in',
          )}
        >
          <p className="font-display text-xl font-medium italic leading-relaxed text-plum-900">
            &quot;Screen Sage is for the moments when a tarot card, a character arc, and a physics equation say the same thing.&quot;
          </p>
        </div>
      </div>

      {/* Right: accordion */}
      <div className="border-t border-mist">
        {philosophyItems.map((item, i) => (
          <PhilosophyPanel key={item.symbol + i} {...item} index={i} />
        ))}
      </div>
    </section>
  )
}
