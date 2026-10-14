'use client'

import { useState } from 'react'
import { Check, Mail } from 'lucide-react'
import { studio } from '@/lib/data'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { websitesFaq, websitesIntro } from '@/lib/websites-content'
import Modal from '@/components/Modal'
import SiteFaq from '@/components/SiteFaq'
import ProjectInquiryForm from '@/components/studio/ProjectInquiryForm'
import StudioDetails from '@/components/studio/StudioDetails'
import { CALM_BUTTON, CALM_EYEBROW, CALM_H2, CALM_OUTLINE_BUTTON, CONTAINER } from '@/components/ui'

// The body of /websites: the Studio's full pitch on its own page, in the calm
// skin (cloud white, Nunito headings, thin lilac rules, no decoration), with
// the same project form as the home page's Build section.
export default function WebsitesView() {
  const [formOpen, setFormOpen] = useState(false)

  const openForm = (location: string) => {
    track('studio_inquiry_open', { location: `websites_${location}` })
    setFormOpen(true)
  }

  return (
    <main className="border-b border-mist bg-cloud pb-24 pt-32 sm:pt-40">
      <div className={CONTAINER}>
        <header className="max-w-3xl">
          <p className={cn(CALM_EYEBROW, 'mb-4')}>{websitesIntro.eyebrow}</p>
          <h1 className="text-balance text-[2.5rem] font-bold leading-[1.1] tracking-[-0.01em] text-plum-900 sm:text-[3.25rem]">
            {websitesIntro.title}
          </h1>
          <p className="mt-6 text-base leading-7 text-plum-700 sm:text-lg sm:leading-8">{websitesIntro.lead}</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {websitesIntro.whoFor.map(who => (
              <li key={who} className="flex items-center gap-2 text-sm text-plum-700">
                <Check size={14} aria-hidden className="shrink-0 text-plum-500" />
                {who}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => openForm('hero')} className={CALM_BUTTON}>
              Start a project
            </button>
            <a href={`mailto:${studio.email}`} className={cn(CALM_OUTLINE_BUTTON, 'px-6 py-[0.6875rem] text-[15px]')}>
              <Mail size={14} aria-hidden />
              {studio.email}
            </a>
          </div>
        </header>

        <div className="mt-16 border-t border-mist pt-14 sm:mt-20 sm:pt-16">
          <StudioDetails onStartProject={openForm} labelAs="h2" showOffer={false} />
        </div>

        <section aria-labelledby="websites-faq" className="mx-auto mt-20 max-w-4xl">
          <h2 id="websites-faq" className={CALM_H2}>Questions about websites</h2>
          <div className="mt-8">
            <SiteFaq items={websitesFaq} idPrefix="websites-faq-panel" tone="calm" />
          </div>
        </section>
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
    </main>
  )
}
