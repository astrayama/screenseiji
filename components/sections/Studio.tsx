'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { studio } from '@/lib/data'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import BrandMark from '@/components/BrandMark'
import Modal from '@/components/Modal'
import Marquee from '@/components/Marquee'
import ProjectInquiryForm from '@/components/studio/ProjectInquiryForm'
import StudioDetails, { OUTLINE_BUTTON } from '@/components/studio/StudioDetails'
import { NEUTRAL_BUTTON } from '@/components/formStyles'

// Client web work by Screen Sage Studios. Styled apart from the brand
// sections — solid band, sans-serif only, neutral colours, no gold/teal — but
// part of the brand (and its SEO; /websites is the full page).
// Starts as a compact banner + ticker; "Details" opens the full pitch.

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
          <div className="mx-auto max-w-7xl border-t border-white/8 px-5 py-12 sm:px-8">
            <StudioDetails onStartProject={openForm} />
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
