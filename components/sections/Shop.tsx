'use client'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/SectionHeading'
import { ExternalLink } from 'lucide-react'

const PRODUCTS = [
  {
    category: 'Physical',
    eyebrow: 'Etsy · ScreenSageStudios',
    title: 'Objects for the altar and the desk.',
    items: ['Pastel Shinto line — desk mat, mug, phone case', 'Moonchild line', 'Pin buttons · tote bag'],
    href: 'https://etsy.com/shop/ScreenSageStudios',
    cta: 'Visit the Etsy shop',
    accent: 'text-amber',
    borderHover: 'hover:border-amber/30',
    delay: 0,
  },
  {
    category: 'Digital',
    eyebrow: 'Coming soon',
    title: 'Downloads for the inner library.',
    items: ['Tarot Spread Reference Guide (PDF)', 'Digital Wallpaper Pack', 'More in the works…'],
    href: 'https://screenseiji.gumroad.com/',
    cta: 'Browse the store',
    accent: 'text-teal',
    borderHover: 'hover:glass-teal',
    delay: 90,
  },
]

export default function Shop() {
  return (
    <section id="shop" className="section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Store"
          title="Carry the cosmos with you."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {PRODUCTS.map(p => {
            const { ref, inView } = useInView<HTMLDivElement>()
            return (
              <div
                key={p.category}
                ref={ref}
                className={cn('glass rounded-3xl p-7 flex flex-col gap-5 reveal', p.borderHover, 'transition-all duration-300', inView && 'reveal-in')}
                style={{ transitionDelay: `${p.delay}ms` }}
              >
                <div>
                  <p className={cn('text-[10px] font-bold uppercase tracking-[0.22em]', p.accent)}>{p.eyebrow}</p>
                  <h3 className="mt-2 font-display text-2xl font-light text-foreground">{p.title}</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {p.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <span className={cn('mt-1.5 h-1 w-1 shrink-0 rounded-full', p.accent === 'text-amber' ? 'bg-amber/60' : 'bg-teal/60')} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn('mt-auto inline-flex items-center gap-2 self-start rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all',
                    p.accent === 'text-amber'
                      ? 'border-amber/35 text-amber hover:border-amber/60 hover:bg-amber/8'
                      : 'border-teal/35 text-teal hover:border-teal/60 hover:bg-teal/8',
                  )}
                >
                  {p.cta}
                  <ExternalLink size={11} />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
