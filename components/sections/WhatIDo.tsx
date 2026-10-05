'use client'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/SectionHeading'
import { services } from '@/lib/data'

function ServiceCard({
  icon, step, title, description, cta, index, isLast,
}: typeof services[0] & { index: number; isLast: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const delay = Math.min(index * 80, 240)
  const external = !cta.href.startsWith('#')

  return (
    <div
      ref={ref}
      className={cn('glass relative rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:glass-gold reveal h-full', inView && 'reveal-in')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-xl">
          {icon}
        </span>
        <span aria-hidden className="font-display text-3xl font-light leading-none text-muted/30">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{step}</p>
        <h3 className="mt-1 font-display text-2xl font-medium text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      </div>
      <a
        href={cta.href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className="inline-flex items-center gap-1 self-start rounded-full border border-teal/25 bg-teal/8 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal transition-all hover:border-teal/50 hover:bg-teal/15"
      >
        {cta.label}
        <span className="opacity-60">{external ? '↗' : '↓'}</span>
      </a>

      {/* Journey arrow into the next pillar (desktop row only) */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute -right-[15px] top-1/2 z-10 hidden -translate-y-1/2 text-sm text-gold/50 lg:block"
        >
          →
        </span>
      )}
    </div>
  )
}

export default function WhatIDo() {
  return (
    <section id="services" className="section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What I Do"
          title="Tools for intentional evolution."
          description="Video essays, tarot, software, and gaming — each is a vehicle for self-awareness, self-improvement, and self-mastery."
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <li key={s.title}>
              <ServiceCard {...s} index={i} isLast={i === services.length - 1} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
