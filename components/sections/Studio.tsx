import { ArrowUpRight } from 'lucide-react'
import { studio } from '@/lib/data'
import BrandMark from '@/components/BrandMark'

// Client web work. Intentionally styled apart from the Screen Sage brand
// sections: solid band, sans-serif only, neutral colours, no gold/teal.
export default function Studio() {
  const { featured, servicesUrl } = studio
  const linkClass =
    'inline-flex items-center gap-1.5 rounded-md border border-white/12 px-3.5 py-2 text-sm text-foreground/85 transition-colors hover:border-white/30 hover:text-foreground'

  return (
    <section id="studio" aria-label="Studio — client websites" className="relative border-y border-white/8 bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:px-8 sm:py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <BrandMark height={30} />
          <span className="rounded border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
            Studio
          </span>
          <p className="text-lg text-foreground sm:text-xl">I also build websites for clients.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {featured.href ? (
            <a href={featured.href} target="_blank" rel="noreferrer" className={linkClass}>
              <span className="text-muted">Featured:</span> {featured.name}
              <ArrowUpRight size={14} className="text-muted" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-1 py-2 text-sm text-foreground/85">
              <span className="text-muted">Featured:</span> {featured.name}
            </span>
          )}
          {servicesUrl ? (
            <a href={servicesUrl} target="_blank" rel="noreferrer" className={linkClass}>
              Services
              <ArrowUpRight size={14} className="text-muted" />
            </a>
          ) : (
            <a href="#contact" className={linkClass}>
              Get in touch
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
