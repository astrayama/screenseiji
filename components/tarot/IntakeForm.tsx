'use client'

import { FormEvent, useEffect, useId, useState } from 'react'
import { ArrowUpRight, Send } from 'lucide-react'
import type { IntakePackage } from '@/lib/data'
import { postForm } from '@/lib/postForm'
import { FIELD, FORM_ERROR, LABEL, PRIMARY_BUTTON } from '@/components/formStyles'
import { cn } from '@/lib/utils'

export default function IntakeForm({ pkg }: { pkg: IntakePackage }) {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)
  // `website` is the honeypot — hidden from people, filled in by bots.
  const [form, setForm] = useState({ name: '', email: '', question: '', notes: '', website: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(v => ({ ...v, [k]: e.target.value }))

  // Once the request is in, hand off to Stripe. Closing the dialog unmounts
  // this form, which cancels the redirect.
  useEffect(() => {
    const paymentUrl = pkg.paymentUrl
    if (status !== 'sent' || !paymentUrl) return
    const timer = window.setTimeout(() => window.location.assign(paymentUrl), 3000)
    return () => window.clearTimeout(timer)
  }, [status, pkg.paymentUrl])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const failure = await postForm('/api/reading', { package: pkg.id, ...form })
    setError(failure)
    setStatus(failure ? 'idle' : 'sent')
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col items-center gap-3 py-4 text-center">
        <span aria-hidden className="text-3xl text-orchid">✦</span>
        <p className="font-display text-[2rem] font-medium leading-tight text-plum-900">Request received.</p>
        {pkg.paymentUrl ? (
          <>
            <p className="text-[15px] leading-6 text-plum-700">
              Taking you to secure payment with Stripe… Use the same email at checkout so Isa can match it to your question.
            </p>
            <a
              href={pkg.paymentUrl}
              className={cn(PRIMARY_BUTTON, 'mt-2')}
            >
              Continue to payment
              <ArrowUpRight size={15} aria-hidden />
            </a>
          </>
        ) : (
          <p className="text-[15px] leading-6 text-plum-700">
            Isa will email you at <span className="font-bold text-plum-900">{form.email}</span> with payment details.
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-name`} className={LABEL}>Name</label>
          <input id={`${id}-name`} required autoComplete="name" value={form.name} onChange={set('name')} className={FIELD} placeholder="Your name" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-email`} className={LABEL}>Email</label>
          <input id={`${id}-email`} required type="email" autoComplete="email" value={form.email} onChange={set('email')} className={FIELD} placeholder="you@example.com" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-question`} className={LABEL}>Your question</label>
        <textarea
          id={`${id}-question`}
          required
          rows={4}
          value={form.question}
          onChange={set('question')}
          className={`${FIELD} resize-none`}
          placeholder="What would you like the cards to reflect on?"
        />
      </div>
      {pkg.notesField && (
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-notes`} className={LABEL}>
            Anything Isa should know <span className="font-normal text-plum-500">(optional)</span>
          </label>
          <textarea
            id={`${id}-notes`}
            rows={3}
            value={form.notes}
            onChange={set('notes')}
            className={`${FIELD} resize-none`}
            placeholder="Context, background, how you're feeling about it…"
          />
        </div>
      )}
      {error && (
        <p role="alert" className={FORM_ERROR}>{error}</p>
      )}
      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] leading-5 text-plum-700">
          {pkg.paymentUrl ? 'Next: secure payment via Stripe.' : 'Isa will follow up by email with payment details.'}
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className={PRIMARY_BUTTON}
        >
          {status === 'sending' ? 'Sending…' : 'Send request'}
          <Send size={14} aria-hidden />
        </button>
      </div>
      {/* Honeypot — kept last so the dialog's initial focus lands on Name. */}
      <div aria-hidden className="sr-only">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
        </label>
      </div>
    </form>
  )
}
