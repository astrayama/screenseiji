'use client'

import { useState } from 'react'
import { Check, Mail } from 'lucide-react'
import { studio } from '@/lib/data'
import { track } from '@/lib/track'
import { websitesFaq, websitesIntro } from '@/lib/websites-content'
import Modal from '@/components/Modal'
import SiteFaq from '@/components/SiteFaq'
import ProjectInquiryForm from '@/components/studio/ProjectInquiryForm'
import StudioDetails, { OUTLINE_BUTTON } from '@/components/studio/StudioDetails'
import { NEUTRAL_BUTTON } from '@/components/formStyles'

// The body of /websites: the Studio's full pitch on its own page, in the
// Studio's neutral style, with the same project form as the home banner.
export default function WebsitesView() {
  const [formOpen, setFormOpen] = useState(false)

  const openForm = (location: string) => {
    track('studio_inquiry_open', { location: `websites_${location}` })
    setFormOpen(true)
  }

  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <header className="max-w-3xl">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
          {websitesIntro.eyebrow}
        </p>
        <h1 className="text-4xl font-medium leading-[1.1] text-foreground sm:text-5xl">{websitesIntro.title}</h1>
        <p className="mt-6 text-base leading-8 text-foreground/80 sm:text-lg">{websitesIntro.lead}</p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {websitesIntro.whoFor.map(who => (
            <li key={who} className="flex items-center gap-2 text-sm text-muted">
              <Check size={14} className="text-foreground/40" />
              {who}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => openForm('hero')} className={NEUTRAL_BUTTON}>
            Start a project
          </button>
          <a href={`mailto:${studio.email}`} className={OUTLINE_BUTTON}>
            <Mail size={14} />
            {studio.email}
          </a>
        </div>
      </header>

      <div className="mt-20">
        <StudioDetails onStartProject={openForm} labelAs="h2" showOffer={false} />
      </div>

      <section aria-labelledby="websites-faq" className="mx-auto mt-20 max-w-4xl">
        <h2 id="websites-faq" className="text-2xl font-medium text-foreground sm:text-3xl">Questions about websites</h2>
        <div className="mt-8">
          <SiteFaq items={websitesFaq} idPrefix="websites-faq-panel" />
        </div>
      </section>

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
    </main>
  )
}
