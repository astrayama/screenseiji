'use client'

import { FormEvent, useId, useState } from 'react'
import { Sparkle } from '@/components/brand/SkyArt'
import { FIELD, FORM_ERROR, LABEL } from '@/components/formStyles'
import { BUTTON_PRIMARY, CONTAINER, EYEBROW } from '@/components/ui'
import { journey } from '@/lib/home-content'
import { postForm } from '@/lib/postForm'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'

// Blush glowing down from the top centre.
const PANEL =
  'radial-gradient(ellipse 60% 75% at 50% 0%, rgba(242,205,227,0.95), transparent 75%),' +
  'linear-gradient(180deg, #F3D9E8 0%, #F2DDEA 100%)'

/** The mailing list (/api/newsletter → Isa's Resend Contacts list). */
export default function JoinJourney() {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)
  // `website` is the honeypot — hidden from people, filled in by bots.
  const [form, setForm] = useState({ email: '', website: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const failure = await postForm('/api/newsletter', form)
    setError(failure)
    setStatus(failure ? 'idle' : 'sent')
    if (!failure) track('newsletter_join')
  }

  return (
    <section aria-labelledby="journey-title" className="py-6 sm:py-8">
      <div className={CONTAINER}>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 px-6 py-10 text-center shadow-card sm:px-12 sm:py-14" style={{ background: PANEL }}>
          <Sparkle className="left-[8%] top-8 h-5 w-5 text-cloud sm:left-[11%] sm:h-6 sm:w-6" twinkle />
          <Sparkle className="bottom-10 right-[12%] hidden h-4 w-4 text-cloud sm:block" twinkle style={{ animationDelay: '2s' }} />

          <p className={cn(EYEBROW, 'hidden sm:block')}>{journey.eyebrow}</p>
          <h2 id="journey-title" className="font-display text-[2.25rem] font-medium leading-tight text-plum-900 sm:mt-3 sm:text-[3rem]">
            {journey.title}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-base leading-7 text-plum-700 sm:text-[17px]">{journey.lead}</p>

          {status === 'sent' ? (
            <p role="status" className="mt-6 font-display text-2xl italic text-plum-900">
              You’re on the list. Welcome, fellow seeker.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="relative mx-auto mt-6 max-w-[28rem] text-left">
              <label htmlFor={`${id}-email`} className={LABEL}>{journey.label}</label>
              <div className="mt-2 flex gap-2.5">
                <input
                  id={`${id}-email`}
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={e => setForm(v => ({ ...v, email: e.target.value }))}
                  placeholder="you@example.com"
                  className={cn(FIELD, 'min-w-0 flex-1 rounded-full border-lilac px-5')}
                />
                <button type="submit" disabled={status === 'sending'} className={cn(BUTTON_PRIMARY, 'shrink-0 px-7')}>
                  {status === 'sending' ? 'Joining…' : journey.cta}
                </button>
              </div>
              {error ? (
                <p role="alert" className={cn(FORM_ERROR, 'mt-2')}>{error}</p>
              ) : (
                <p className="mt-2 text-[13px] text-plum-700">{journey.note}</p>
              )}
              {/* Honeypot */}
              <div aria-hidden className="sr-only">
                <label>
                  Website
                  <input tabIndex={-1} autoComplete="off" value={form.website} onChange={e => setForm(v => ({ ...v, website: e.target.value }))} />
                </label>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
