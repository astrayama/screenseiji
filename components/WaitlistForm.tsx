'use client'

import { FormEvent, useId, useState } from 'react'
import { Send } from 'lucide-react'
import { postForm } from '@/lib/postForm'
import { FIELD, FORM_ERROR, LABEL, PRIMARY_BUTTON } from '@/components/formStyles'

export default function WaitlistForm({ appId, appName }: { appId: string; appName: string }) {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)
  // `website` is the honeypot — hidden from people, filled in by bots.
  const [form, setForm] = useState({ name: '', email: '', website: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(v => ({ ...v, [k]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const failure = await postForm('/api/waitlist', { app: appId, ...form })
    setError(failure)
    setStatus(failure ? 'idle' : 'sent')
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col items-center gap-3 py-4 text-center">
        <span aria-hidden className="text-3xl text-orchid">✦</span>
        <p className="font-display text-[1.75rem] font-medium text-plum-900">You’re on the list.</p>
        <p className="text-sm leading-6 text-plum-700">
          Isa will email you at <span className="font-bold text-plum-900">{form.email}</span> when {appName} opens up.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <p className="text-sm leading-6 text-plum-700">
        {appName} is in beta. Leave your email and you’ll hear the moment there’s room for you.
      </p>
      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-name`} className={LABEL}>
          Name <span className="font-normal text-plum-500">(optional)</span>
        </label>
        <input id={`${id}-name`} autoComplete="name" value={form.name} onChange={set('name')} className={FIELD} placeholder="Your name" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-email`} className={LABEL}>Email</label>
        <input id={`${id}-email`} required type="email" autoComplete="email" value={form.email} onChange={set('email')} className={FIELD} placeholder="you@example.com" />
      </div>
      {error && (
        <p role="alert" className={FORM_ERROR}>{error}</p>
      )}
      <button type="submit" disabled={status === 'sending'} className={`${PRIMARY_BUTTON} sm:self-end`}>
        {status === 'sending' ? 'Joining…' : 'Join the waitlist'}
        <Send size={13} aria-hidden />
      </button>
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
