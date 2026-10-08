'use client'

import { useState } from 'react'
import { ArrowUpRight, CalendarDays, Check, ChevronDown, Mail } from 'lucide-react'
import { studio, type StudioWork } from '@/lib/data'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import BrandMark from '@/components/BrandMark'
import Modal from '@/components/Modal'
import Marquee from '@/components/Marquee'
import ProjectInquiryForm from '@/components/studio/ProjectInquiryForm'
import { NEUTRAL_BUTTON } from '@/components/formStyles'

// Client web work. Intentionally styled apart from the Screen Sage brand
// sections: solid band, sans-serif only, neutral colours, no gold/teal.
// Starts as a compact banner + ticker; "Details" opens the full pitch.

const OUTLINE_BUTTON =
  'inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2.5 text-sm text-foreground/85 transition-colors hover:border-white/35 hover:text-foreground'
const MONO_LABEL = 'font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50'
const BOX = 'rounded-lg border border-white/10 bg-background/40 p-5'

function WorkCard({ name, kind, description, href }: StudioWork) {
  const external = href?.startsWith('http')
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className={MONO_LABEL}>{kind}</p>
        {href && <ArrowUpRight size={14} className="shrink-0 text-muted transition-colors group-hover:text-foreground" />}
      </div>
      <p className="mt-3 text-base font-medium text-foreground">{name}</p>
      <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
    </>
  )

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

export default function Studio() {
  const { reduced } = useMotionPreference()
  const [expanded, setExpanded] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  const openForm = (location: string) => {
    track('studio_inquiry_open', { location })
    setFormOpen(true)
  }

  const toggle = () => {
    if (!expanded) track('studio_expand')
    setExpanded(v => !v)
  }

  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="relative scroll-mt-16 border-y border-white/8 bg-surface"
    >
      {/* Banner — all that shows until "Details" is opened */}
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 pb-6 pt-9 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <BrandMark height={30} />
          <span className="rounded border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
            Studio
          </span>
          <h2 id="studio-heading" className="text-lg text-foreground sm:text-xl">{studio.headline}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => openForm('banner')} className={NEUTRAL_BUTTON}>
            Start a project
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls="studio-details"
            className={OUTLINE_BUTTON}
          >
            {expanded ? 'Hide details' : 'Details'}
            <ChevronDown
              size={14}
              aria-hidden
              className={cn('text-muted', !reduced && 'transition-transform duration-300', expanded && 'rotate-180')}
            />
          </button>
        </div>
      </div>

      <div className="pb-8">
        <Marquee
          items={studio.marquee.map(item => ({ key: item, content: item }))}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50"
        />
      </div>

      {/* Details — grid-rows 0fr→1fr animates to the content's natural height.
          `inert` keeps the collapsed links out of the tab order. */}
      <div
        id="studio-details"
        inert={!expanded}
        className={cn(
          'grid',
          !reduced && 'transition-[grid-template-rows] duration-500 ease-out',
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-12 border-t border-white/8 px-5 py-12 sm:px-8">
            {/* Offer */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <p className="max-w-2xl text-base leading-7 text-foreground/80 sm:text-lg">{studio.subhead}</p>
              <a href="#studio-work" className="text-sm text-muted transition-colors hover:text-foreground">
                See the work ↓
              </a>
            </div>

            {/* Services */}
            <div>
              <p className={MONO_LABEL}>Services</p>
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
              <p className={MONO_LABEL}>Recent work</p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {studio.work.map(w => (
                  <li key={w.name}><WorkCard {...w} /></li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div>
              <p className={MONO_LABEL}>How it works</p>
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
                <button type="button" onClick={() => openForm('details')} className={NEUTRAL_BUTTON}>
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
        </div>
      </div>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        eyebrow="Screen Sage Studios"
        title="Start a project"
        size="lg"
        tone="studio"
      >
        <ProjectInquiryForm />
      </Modal>
    </section>
  )
}
