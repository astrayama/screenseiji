'use client'

import { FormEvent, useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FIELD, FORM_ERROR, LABEL } from '@/components/formStyles'
import Honeypot from '@/components/Honeypot'
import { BUTTON_PRIMARY, CARD, CONTAINER, EYEBROW, TEXT_LINK } from '@/components/ui'
import { useStudioInquiry } from '@/components/studio/StudioInquiry'
import StudioTitle from '@/components/studio/StudioTitle'
import { contactCategories, studio, studioPackageChoices, type ContactCategory } from '@/lib/data'
import { postForm } from '@/lib/postForm'
import { HELLO_ID, studioContactCopy } from '@/lib/studio-content'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'

// Say hello on /studio: the site's contact form (/api/contact), set to
// "Client/project inquiry", with the shop's name and the package. Picking a
// package on a card fills that in and brings you here.

const PROJECT: ContactCategory = 'Client/project inquiry'
const NOT_SURE = studioPackageChoices.at(-1)!

const Optional = () => <span className="font-normal text-plum-500">(optional)</span>

function Select({ id, value, options, onChange }: { id: string; value: string; options: readonly string[]; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <select id={id} value={value} onChange={e => onChange(e.target.value)} className={cn(FIELD, 'appearance-none pr-10')}>
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown size={16} aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-plum-700" />
    </div>
  )
}

export default function StudioContact() {
  const id = useId()
  const nameRef = useRef<HTMLInputElement>(null)
  const { picked, pickCount } = useStudioInquiry()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)
  // `website` is the hidden anti-spam field (see components/Honeypot).
  const [form, setForm] = useState({
    name: '',
    email: '',
    business: '',
    category: PROJECT as ContactCategory,
    pkg: NOT_SURE as string,
    message: '',
    website: '',
  })
  const isProject = form.category === PROJECT

  // A card was picked: switch to a project inquiry and note the package
  // (adjusted while rendering, so the form never shows the old values)…
  const [seenPick, setSeenPick] = useState(pickCount)
  if (pickCount !== seenPick) {
    setSeenPick(pickCount)
    setForm(v => ({ ...v, category: PROJECT, pkg: picked ?? v.pkg }))
  }
  // …and put the cursor in Name (not on touch screens, where it would pop the keyboard).
  useEffect(() => {
    if (pickCount && window.matchMedia('(pointer: fine)').matches) nameRef.current?.focus({ preventScroll: true })
  }, [pickCount])

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(v => ({ ...v, [k]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const { pkg, ...rest } = form
    const failure = await postForm('/api/contact', { ...rest, ...(isProject && { package: pkg }) })
    setError(failure)
    setStatus(failure ? 'idle' : 'sent')
    if (!failure) track('generate_lead', { form: 'studio_contact', topic: form.category, ...(isProject && { package: pkg }) })
  }

  return (
    <section id={HELLO_ID} aria-labelledby="hello-title" className="py-16 sm:py-24">
      <div className={cn(CONTAINER, 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16')}>
        <div>
          <p className={EYEBROW}>{studioContactCopy.eyebrow}</p>
          <StudioTitle id="hello-title" parts={studioContactCopy.title} className="mt-3" />
          <p className="mt-4 max-w-sm text-base leading-7 text-plum-700 sm:text-[17px] sm:leading-[1.75]">
            {studioContactCopy.lead}
          </p>
          <p className="mt-3 text-[15px] text-plum-700">
            {studioContactCopy.emailLead}{' '}
            <a href={`mailto:${studio.email}`} className={TEXT_LINK}>
              {studio.email}
            </a>
            .
          </p>
        </div>

        {status === 'sent' ? (
          <div role="status" className={cn(CARD, 'flex min-h-[18rem] flex-col items-center justify-center gap-3 p-8 text-center')}>
            <span aria-hidden className="text-3xl text-gold">✦</span>
            <p className="font-display text-[2rem] font-medium text-plum-900">Message received.</p>
            <p className="text-[15px] text-plum-700">
              I’ll reply to <span className="font-bold text-plum-900">{form.email}</span> soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={cn(CARD, 'flex flex-col gap-4 p-5 sm:p-7')}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-name`} className={LABEL}>Name</label>
                <input ref={nameRef} id={`${id}-name`} required autoComplete="name" value={form.name} onChange={set('name')} className={FIELD} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-email`} className={LABEL}>Email</label>
                <input id={`${id}-email`} required type="email" autoComplete="email" value={form.email} onChange={set('email')} className={FIELD} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`${id}-business`} className={LABEL}>Shop or business <Optional /></label>
              <input id={`${id}-business`} autoComplete="organization" value={form.business} onChange={set('business')} className={FIELD} />
            </div>
            <div className={cn('grid gap-4', isProject && 'sm:grid-cols-2')}>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-topic`} className={LABEL}>Topic</label>
                <Select
                  id={`${id}-topic`}
                  value={form.category}
                  options={contactCategories}
                  onChange={category => setForm(v => ({ ...v, category: category as ContactCategory }))}
                />
              </div>
              {isProject && (
                // A gold glow when a card fills this in, so you see it land.
                <motion.div
                  key={pickCount}
                  className="flex flex-col gap-2 rounded-xl"
                  initial={pickCount ? { boxShadow: '0 0 0 6px rgba(224,188,90,0.55)' } : false}
                  animate={{ boxShadow: '0 0 0 6px rgba(224,188,90,0)' }}
                  transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
                >
                  <label htmlFor={`${id}-package`} className={LABEL}>Package</label>
                  <Select id={`${id}-package`} value={form.pkg} options={studioPackageChoices} onChange={pkg => setForm(v => ({ ...v, pkg }))} />
                </motion.div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`${id}-message`} className={LABEL}>Message</label>
              <textarea
                id={`${id}-message`}
                required
                rows={4}
                value={form.message}
                onChange={set('message')}
                placeholder="Tell me about your shop and what you need."
                className={cn(FIELD, 'resize-y')}
              />
            </div>
            {error && <p role="alert" className={FORM_ERROR}>{error}</p>}
            <button type="submit" disabled={status === 'sending'} className={cn(BUTTON_PRIMARY, 'w-full py-3.5 sm:w-fit')}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            {/* Kept last so tabbing never reaches it first. */}
            <Honeypot value={form.website} onChange={website => setForm(v => ({ ...v, website }))} />
          </form>
        )}
      </div>
    </section>
  )
}
