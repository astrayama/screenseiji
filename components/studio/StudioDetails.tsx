'use client'

import { ArrowUpRight, CalendarDays, Check, Mail } from 'lucide-react'
import { studio, type StudioWork } from '@/lib/data'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { NEUTRAL_BUTTON } from '@/components/formStyles'

// The full Studio pitch — services, work, process and a closing call to
// action. Shared by the home page's collapsible Studio banner and /websites.
// Styled apart from the Screen Sage brand sections: sans-serif, neutral, no gold.

export const OUTLINE_BUTTON =
  'inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2.5 text-sm text-foreground/85 transition-colors hover:border-white/35 hover:text-foreground'
export const MONO_LABEL = 'font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50'
const BOX = 'rounded-lg border border-white/10 bg-background/40 p-5'

function WorkCard({ name, kind, description, href, links }: StudioWork) {
  const external = href?.startsWith('http')
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className={MONO_LABEL}>{kind}</p>
        {href && !links && <ArrowUpRight size={14} className="shrink-0 text-muted transition-colors group-hover:text-foreground" />}
      </div>
      <p className="mt-3 text-base font-medium text-foreground">{name}</p>
      <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
    </>
  )

  // Several versions: a plain card with a link to each (links can't nest).
  if (links) {
    return (
      <div className={cn(BOX, 'h-full')}>
        {inner}
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-foreground/85 underline-offset-4 hover:underline"
            >
              {link.label}
              <ArrowUpRight size={13} className="text-muted" />
            </a>
          ))}
        </p>
      </div>
    )
  }

  return href ? (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={cn(BOX, 'group block h-full transition-colors hover:border-white/30')}
    >
      {inner}
    </a>
  ) : (
    <div className={cn(BOX, 'h-full')}>{inner}</div>
  )
}

interface StudioDetailsProps {
  /** Opens the project form; the location names the button for analytics. */
  onStartProject: (location: string) => void
  /** Section labels: plain text inside the home page's Studio section, h2 on /websites. */
  labelAs?: 'p' | 'h2'
  /** The subhead and "See the work" row (/websites has its own intro). */
  showOffer?: boolean
}

export default function StudioDetails({ onStartProject, labelAs: Label = 'p', showOffer = true }: StudioDetailsProps) {
  return (
    <div className="flex flex-col gap-12">
      {/* Offer */}
      {showOffer && (
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-base leading-7 text-foreground/80 sm:text-lg">{studio.subhead}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href="#studio-work" className="text-muted transition-colors hover:text-foreground">
              See the work ↓
            </a>
            <a href="/websites" className="text-muted transition-colors hover:text-foreground">
              All about websites →
            </a>
          </div>
        </div>
      )}

      {/* Services */}
      <div>
        <Label className={MONO_LABEL}>Services</Label>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {studio.services.map(s => (
            <li key={s.title} className={BOX}>
              <h3 className="text-lg font-medium text-foreground">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{s.description}</p>
              <ul className="mt-4 flex flex-col gap-1.5">
                {s.includes.map(i => (
                  <li key={i} className="flex items-center gap-2 text-xs text-foreground/70">
                    <Check size={13} className="text-foreground/40" />
                    {i}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-muted">Every site includes</span>
          {studio.included.map(i => (
            <span key={i} className="rounded-full border border-white/10 px-3 py-1 text-xs text-foreground/75">
              {i}
            </span>
          ))}
        </div>
      </div>

      {/* Work */}
      <div id="studio-work" className="scroll-mt-24">
        <Label className={MONO_LABEL}>Recent work</Label>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {studio.work.map(w => (
            <li key={w.name}><WorkCard {...w} /></li>
          ))}
        </ul>
      </div>

      {/* Process */}
      <div>
        <Label className={MONO_LABEL}>How it works</Label>
        <ol className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {studio.process.map((step, i) => (
            <li key={step.title} className="border-l border-white/10 pl-4">
              <span className="font-mono text-xs text-foreground/40">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-1 text-base font-medium text-foreground">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Closing CTA */}
      <div className={cn(BOX, 'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between')}>
        <div>
          <p className="text-lg font-medium text-foreground">Have a project in mind?</p>
          <p className="mt-1 text-sm text-muted">
            Tell me about it, or email{' '}
            <a href={`mailto:${studio.email}`} className="text-foreground/85 underline-offset-4 hover:underline">
              {studio.email}
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => onStartProject('details')} className={NEUTRAL_BUTTON}>
            <Mail size={14} />
            Start a project
          </button>
          {studio.callUrl && (
            <a
              href={studio.callUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => track('studio_call_click')}
              className={OUTLINE_BUTTON}
            >
              <CalendarDays size={14} />
              Book a call
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
