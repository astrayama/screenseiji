'use client'

import { useState } from 'react'
import Image from 'next/image'
import Modal from '@/components/Modal'
import ProjectInquiryForm from '@/components/studio/ProjectInquiryForm'
import Fit from '@/components/home/Fit'
import { CALM_BUTTON, CALM_EYEBROW, CALM_H2, CONTAINER, TEXT_LINK } from '@/components/ui'
import { build } from '@/lib/home-content'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import arcanaShot from '@/public/work/arcana.jpg'
import formlessShot from '@/public/work/formless-guide.jpg'

const SHOTS = { arcana: arcanaShot, formless: formlessShot }

// Websites for small businesses, by Screen Sage Studios — in the calm skin:
// cloud white, Nunito headings, thin lilac rules, no decoration. /websites
// has the full pitch.
export default function Build() {
  const [formOpen, setFormOpen] = useState(false)

  const openForm = () => {
    track('studio_inquiry_open', { location: 'home' })
    setFormOpen(true)
  }

  return (
    <section id="build" aria-labelledby="build-title" className="border-y border-mist bg-cloud py-10 sm:py-20">
      <div className={cn(CONTAINER, 'grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-x-14 lg:gap-y-7')}>
        <div>
          <p className={CALM_EYEBROW}>{build.eyebrow}</p>
          <h2 id="build-title" className={cn(CALM_H2, 'mt-3')}>{build.title}</h2>
          <p className="mt-4 text-base leading-7 text-plum-700 sm:text-[17px] sm:leading-[1.75]">
            <Fit short={build.short} long={build.lead} />
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {build.work.map(work => {
            const external = work.href.startsWith('http')
            return (
              <li key={work.name}>
                <a
                  href={work.href}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="group grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] items-center gap-4 sm:block"
                >
                  <Image
                    src={SHOTS[work.image]}
                    alt={`The ${work.name} website`}
                    sizes="(min-width: 1024px) 290px, (min-width: 640px) 45vw, 120px"
                    placeholder="blur"
                    className="aspect-[16/10] w-full rounded-lg border border-mist object-cover transition-opacity group-hover:opacity-90"
                  />
                  <span className="block sm:mt-3">
                    <span className="block text-lg font-bold text-plum-900 group-hover:underline">{work.name}</span>
                    <span className="mt-1 block text-sm leading-6 text-plum-700">
                      <Fit short={work.short} long={work.description} />
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>

        <div>
          <div className="flex flex-col items-center gap-x-5 gap-y-3 sm:flex-row">
            <button type="button" onClick={openForm} className={cn(CALM_BUTTON, 'w-full py-3.5 sm:w-auto')}>
              {build.cta}
            </button>
            <a href="/websites" className={cn(TEXT_LINK, 'hidden text-[15px] sm:inline')}>
              {build.more}
            </a>
          </div>
          <p className="mt-3 text-center text-sm text-plum-700 sm:text-left">
            {build.note}{' '}
            <a href="/websites" className={cn(TEXT_LINK, 'sm:hidden')}>
              {build.moreShort}
            </a>
          </p>
        </div>
      </div>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} eyebrow="Screen Sage Studios" title={build.cta} size="lg" tone="studio">
        <ProjectInquiryForm />
      </Modal>
    </section>
  )
}
