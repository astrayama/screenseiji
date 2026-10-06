'use client'

import { FormEvent, useId, useState } from 'react'
import { ChevronDown, Send } from 'lucide-react'
import { postForm } from '@/lib/postForm'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { FIELD, LABEL, NEUTRAL_BUTTON } from '@/components/formStyles'
import {
  budgetRanges, projectTimelines, projectTypes,
  type BudgetRange, type ProjectTimeline, type ProjectType,
} from '@/lib/data'

// The brand's teal focus ring swapped for a neutral one, to match the Studio.
const STUDIO_FIELD = cn(FIELD, 'focus:border-white/35')

const Optional = () => <span className="normal-case tracking-normal text-muted/50">(optional)</span>

function Select<T extends string>({
  id, label, value, options, onChange,
}: { id: string; label: string; value: T; options: readonly T[]; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={LABEL}>{label}</label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={e => onChange(e.target.value as T)}
          className={cn(STUDIO_FIELD, 'appearance-none pr-10 [&>option]:bg-surface [&>option]:text-foreground')}
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted/60" />
      </div>
    </div>
  )
}

export default function ProjectInquiryForm() {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)
  // `site` is their current website; `website` is the honeypot — hidden from
  // people, filled in by bots.
  const [form, setForm] = useState({
    name: '',
    email: '',
    business: '',
    site: '',
    projectType: projectTypes[0] as ProjectType,
    budget: 'Not sure yet' as BudgetRange,
    timeline: 'Flexible' as ProjectTimeline,
    message: '',
    website: '',
  })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(v => ({ ...v, [k]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const failure = await postForm('/api/project', form)
    setError(failure)
    setStatus(failure ? 'idle' : 'sent')
    if (!failure) track('generate_lead', { project_type: form.projectType, budget: form.budget })
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col items-center gap-3 py-4 text-center">
        <p className="text-2xl font-medium text-foreground">Got it — thank you.</p>
        <p className="text-sm leading-6 text-muted">
          I’ll reply to <span className="text-foreground">{form.email}</span> with next steps.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-name`} className={LABEL}>Name</label>
          <input id={`${id}-name`} required autoComplete="name" value={form.name} onChange={set('name')} className={STUDIO_FIELD} placeholder="Your name" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-email`} className={LABEL}>Email</label>
          <input id={`${id}-email`} required type="email" autoComplete="email" value={form.email} onChange={set('email')} className={STUDIO_FIELD} placeholder="you@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-business`} className={LABEL}>Business <Optional /></label>
          <input id={`${id}-business`} autoComplete="organization" value={form.business} onChange={set('business')} className={STUDIO_FIELD} placeholder="Business or project name" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-site`} className={LABEL}>Current website <Optional /></label>
          <input id={`${id}-site`} autoComplete="url" value={form.site} onChange={set('site')} className={STUDIO_FIELD} placeholder="yoursite.com" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Select id={`${id}-type`} label="Project" value={form.projectType} options={projectTypes} onChange={projectType => setForm(v => ({ ...v, projectType }))} />
        <Select id={`${id}-budget`} label="Budget" value={form.budget} options={budgetRanges} onChange={budget => setForm(v => ({ ...v, budget }))} />
        <Select id={`${id}-timeline`} label="Timeline" value={form.timeline} options={projectTimelines} onChange={timeline => setForm(v => ({ ...v, timeline }))} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-message`} className={LABEL}>Tell me about the project</label>
        <textarea
          id={`${id}-message`}
          required
          rows={4}
          value={form.message}
          onChange={set('message')}
          className={`${STUDIO_FIELD} resize-none`}
          placeholder="What do you do, and what should the site help you with?"
        />
      </div>
      {error && (
        <p role="alert" className="text-sm leading-6 text-amber">{error}</p>
      )}
      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted/70">No commitment — I’ll reply with next steps.</p>
        <button type="submit" disabled={status === 'sending'} className={NEUTRAL_BUTTON}>
          {status === 'sending' ? 'Sending…' : 'Send inquiry'}
          <Send size={13} />
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
