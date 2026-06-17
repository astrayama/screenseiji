'use client'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/SectionHeading'
import { services } from '@/lib/data'

function ServiceCard({
  icon, title, description, pills, index,
}: typeof services[0] & { index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const delay = Math.min(index * 80, 240)

  return (
    <div
      ref={ref}
      className={cn('glass rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:glass-gold reveal h-full', inView && 'reveal-in')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-xl">
        {icon}
      </span>
      <div className="flex-1">
        <h3 className="font-display text-2xl font-medium text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      </div>
      {pills && pills.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {pills.map(pill => (
            <a
              key={pill.label}
              href={pill.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-teal/25 bg-teal/8 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal transition-all hover:border-teal/50 hover:bg-teal/15"
            >
              {pill.label}
              <span className="opacity-60">{pill.icon}</span>
            </a>
          ))}
        </div>
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
          description="Tarot, video essays, gaming, and software — each is a vehicle for self-awareness, self-improvement, and self-mastery."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
