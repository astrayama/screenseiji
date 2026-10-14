'use client'

import { ArrowUpRight, CalendarDays, Check, Mail } from 'lucide-react'
import { studio, type StudioWork } from '@/lib/data'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { CALM_BUTTON, CALM_EYEBROW, CALM_OUTLINE_BUTTON, TEXT_LINK } from '@/components/ui'

// The Studio's full pitch on /websites — services, work, process and a
// closing call to action. In the calm skin (components/ui.ts): cloud white,
// Nunito headings, thin lilac rules, no decoration.

const BOX = 'rounded-lg border border-mist bg-cloud p-5'

function WorkCard({ name, kind, description, href, links }: StudioWork) {
  const external = href?.startsWith('http')
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className={cn(CALM_EYEBROW, 'sm:text-xs')}>{kind}</p>
        {href && !links && (
          <ArrowUpRight size={14} className="shrink-0 text-plum-500 transition-colors group-hover:text-plum-900" />
        )}
      </div>
      <p className="mt-3 text-base font-bold text-plum-900 group-hover:underline">{name}</p>
      <p className="mt-1 text-sm leading-6 text-plum-700">{description}</p>
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
              className="inline-flex items-center gap-1 font-bold text-plum-900 underline-offset-4 hover:underline"
            >
              {link.label}
              <ArrowUpRight size={13} className="text-plum-500" />
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
      className={cn(BOX, 'group block h-full transition-[border-color,box-shadow] hover:border-lilac hover:shadow-card')}
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
  /** Section labels: plain text by default, h2 on /websites. */
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
          <p className="max-w-2xl text-base leading-7 text-plum-700 sm:text-lg sm:leading-8">{studio.subhead}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href="#studio-work" className="font-bold text-plum-900 underline-offset-4 hover:underline">
              See the work ↓
            </a>
            <a href="/websites" className="font-bold text-plum-900 underline-offset-4 hover:underline">
              All about websites →
            </a>
          </div>
        </div>
      )}

      {/* Services */}
      <div>
        <Label className={CALM_EYEBROW}>Services</Label>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {studio.services.map(s => (
            <li key={s.title} className={BOX}>
              <h3 className="text-lg font-bold text-plum-900">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-plum-700">{s.description}</p>
              <ul className="mt-4 flex flex-col gap-1.5 border-t border-mist pt-4">
                {s.includes.map(i => (
                  <li key={i} className="flex items-center gap-2 text-[13px] text-plum-700">
                    <Check size={13} aria-hidden className="shrink-0 text-plum-500" />
                    {i}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[13px] font-semibold text-plum-700">Every site includes</span>
          {studio.included.map(i => (
            <span key={i} className="rounded-md border border-mist bg-page px-2.5 py-1 text-[13px] text-plum-700">
              {i}
            </span>
          ))}
        </div>
      </div>

      {/* Work */}
      <div id="studio-work" className="scroll-mt-24">
        <Label className={CALM_EYEBROW}>Recent work</Label>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {studio.work.map(w => (
            <li key={w.name}><WorkCard {...w} /></li>
          ))}
        </ul>
      </div>

      {/* Process */}
      <div>
        <Label className={CALM_EYEBROW}>How it works</Label>
        <ol className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {studio.process.map((step, i) => (
            <li key={step.title} className="border-l border-lilac pl-4">
              <span className="text-xs font-bold tabular-nums tracking-[0.16em] text-plum-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-1 text-base font-bold text-plum-900">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-plum-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Closing CTA */}
      <div className={cn(BOX, 'flex flex-col gap-4 bg-page sm:flex-row sm:items-center sm:justify-between sm:p-6')}>
        <div>
          <p className="text-lg font-bold text-plum-900">Have a project in mind?</p>
          <p className="mt-1 text-sm leading-6 text-plum-700">
            Tell me about it, or email{' '}
            <a href={`mailto:${studio.email}`} className={TEXT_LINK}>
              {studio.email}
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => onStartProject('details')} className={CALM_BUTTON}>
            <Mail size={14} aria-hidden />
            Start a project
          </button>
          {studio.callUrl && (
            <a
              href={studio.callUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => track('studio_call_click')}
              className={cn(CALM_OUTLINE_BUTTON, 'px-6 py-[0.6875rem] text-[15px]')}
            >
              <CalendarDays size={14} aria-hidden />
              Book a call
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
