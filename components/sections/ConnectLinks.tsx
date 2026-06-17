'use client'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/SectionHeading'
import { socialLinks } from '@/lib/data'
import { ExternalLink } from 'lucide-react'

const CATEGORIES = [
  { key: 'content' as const, label: 'Content',     accent: 'text-gold',  border: 'hover:glass-gold'  },
  { key: 'listen'  as const, label: 'Listen',      accent: 'text-teal',  border: 'hover:glass-teal'  },
  { key: 'shop'    as const, label: 'Shop',         accent: 'text-amber', border: 'hover:border-amber/30' },
  { key: 'tools'   as const, label: 'Tools',        accent: 'text-teal',  border: 'hover:glass-teal'  },
]

export default function ConnectLinks() {
  return (
    <section id="connect" className="section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Find Me"
          title="In the cosmos and elsewhere."
          align="center"
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat, ci) => {
            const links = socialLinks[cat.key]
            const { ref, inView } = useInView<HTMLDivElement>()
            return (
              <div
                key={cat.key}
                ref={ref}
                className={cn('reveal', inView && 'reveal-in')}
                style={{ transitionDelay: `${ci * 70}ms` }}
              >
                <p className={cn('mb-4 text-[10px] font-bold uppercase tracking-[0.22em]', cat.accent)}>
                  {cat.label}
                </p>
                <div className="flex flex-col gap-2.5">
                  {links.map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        'glass group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-200',
                        cat.border,
                      )}
                    >
                      <div>
                        <p className="text-sm font-semibold text-foreground">{link.label}</p>
                        <p className="text-[11px] text-muted/70">{link.handle}</p>
                      </div>
                      <ExternalLink
                        size={12}
                        className="shrink-0 text-muted/30 transition-all group-hover:text-muted/70"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
