'use client'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/SectionHeading'
import { ExternalLink } from 'lucide-react'

const DIGITAL = {
  eyebrow: 'Coming soon',
  title: 'Downloads for the inner library.',
  items: ['Tarot Spread Reference Guide (PDF)', 'Digital Wallpaper Pack', 'More in the works…'],
  href: 'https://screenseiji.gumroad.com/',
  cta: 'Browse the store',
}

function ShopCard({ delay, className, children }: { delay: number; className?: string; children: React.ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={cn('glass rounded-3xl p-7 flex flex-col gap-5 reveal transition-all duration-300', className, inView && 'reveal-in')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function Shop() {
  return (
    <section id="shop" className="section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Store"
          title="Carry the cosmos with you."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {/* Digital — Gumroad */}
          <ShopCard delay={0} className="hover:glass-teal">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-teal">{DIGITAL.eyebrow}</p>
              <h3 className="mt-2 font-display text-2xl font-light text-foreground">{DIGITAL.title}</h3>
            </div>
            <ul className="flex flex-col gap-2">
              {DIGITAL.items.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal/60" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={DIGITAL.href}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center gap-2 self-start rounded-full border border-teal/35 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-teal transition-all hover:border-teal/60 hover:bg-teal/8"
            >
              {DIGITAL.cta}
              <ExternalLink size={11} />
            </a>
          </ShopCard>

          {/* Physical — placeholder while the print shop is closed. No links on purpose. */}
          <ShopCard delay={90} className="border-dashed !border-white/10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber/70">Physical</p>
              <h3 className="mt-2 font-display text-2xl font-light text-foreground/80">Print shop reopening soon.</h3>
            </div>
            <p className="text-sm leading-6 text-muted">
              Objects for the altar and the desk are resting between seasons. They&apos;ll be back here when the shop reopens.
            </p>
          </ShopCard>
        </div>
      </div>
    </section>
  )
}
