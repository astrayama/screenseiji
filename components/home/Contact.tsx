'use client'

import { FormEvent, useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FIELD, FORM_ERROR, LABEL } from '@/components/formStyles'
import { BUTTON_PRIMARY, CARD, CONTAINER, EYEBROW, H2 } from '@/components/ui'
import { contactCategories, type ContactCategory } from '@/lib/data'
import { contact } from '@/lib/home-content'
import { postForm } from '@/lib/postForm'
import { cn } from '@/lib/utils'

export default function Contact() {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)
  // `website` is the honeypot — hidden from people, filled in by bots.
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: contactCategories[0] as ContactCategory,
    message: '',
    website: '',
  })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(v => ({ ...v, [k]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const failure = await postForm('/api/contact', form)
    setError(failure)
    setStatus(failure ? 'idle' : 'sent')
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-8 sm:py-[4.5rem]">
      <div className={cn(CONTAINER, 'grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16')}>
        <div>
          <p className={EYEBROW}>{contact.eyebrow}</p>
          <h2 id="contact-title" className={cn(H2, 'mt-3')}>{contact.title}</h2>
          <p className="mt-4 max-w-sm text-base leading-7 text-plum-700 sm:text-[17px] sm:leading-[1.75]">
            {contact.lead}
            <span className="hidden md:inline"> {contact.leadMore}</span>
          </p>
        </div>

        {status === 'sent' ? (
          <div role="status" className={cn(CARD, 'flex min-h-[18rem] flex-col items-center justify-center gap-3 p-8 text-center')}>
            <span aria-hidden className="text-3xl text-orchid">✦</span>
            <p className="font-display text-[2rem] font-medium text-plum-900">Message received.</p>
            <p className="text-[15px] text-plum-700">I&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={cn(CARD, 'flex flex-col gap-4 p-5 sm:p-7')}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-name`} className={LABEL}>Name</label>
                <input id={`${id}-name`} required autoComplete="name" value={form.name} onChange={set('name')} className={FIELD} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${id}-email`} className={LABEL}>Email</label>
                <input id={`${id}-email`} required type="email" autoComplete="email" value={form.email} onChange={set('email')} className={FIELD} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`${id}-topic`} className={LABEL}>Topic</label>
              <div className="relative">
                <select id={`${id}-topic`} value={form.category} onChange={set('category')} className={cn(FIELD, 'appearance-none pr-10')}>
                  {contactCategories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={16} aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-plum-700" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`${id}-message`} className={LABEL}>Message</label>
              <textarea id={`${id}-message`} required rows={4} value={form.message} onChange={set('message')} className={cn(FIELD, 'resize-y')} />
            </div>
            {error && <p role="alert" className={FORM_ERROR}>{error}</p>}
            <button type="submit" disabled={status === 'sending'} className={cn(BUTTON_PRIMARY, 'w-full py-3.5 sm:w-fit')}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            {/* Honeypot — kept last so tabbing never reaches it first. */}
            <div aria-hidden className="sr-only">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
              </label>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
