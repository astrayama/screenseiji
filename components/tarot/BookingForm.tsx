'use client'

import { FormEvent, useId, useMemo, useState } from 'react'
import { ArrowUpRight, Glasses, Phone, Send, Video, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { liveReading, type LiveFormat, type LiveTierId } from '@/lib/data'
import { getSlots } from '@/lib/booking'
import { postForm } from '@/lib/postForm'
import { FIELD, FORM_ERROR, LABEL, PRIMARY_BUTTON } from '@/components/formStyles'
import { TEXT_LINK } from '@/components/ui'

export const FORMAT_ICONS: Record<LiveFormat, LucideIcon> = { voice: Phone, video: Video, vr: Glasses }

// Times are shown in the visitor's own timezone (the browser default).
const dayKey = (ms: number) => new Intl.DateTimeFormat('en-CA').format(ms) // YYYY-MM-DD
const dayLabel = (ms: number) => new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' }).format(ms)
const timeLabel = (ms: number) => new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(ms)
const fullLabel = (ms: number) => new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(ms)

function Choice({ name, value, checked, onChange, className, children }: {
  name: string
  value: string
  checked: boolean
  onChange: () => void
  className?: string
  children: React.ReactNode
}) {
  return (
    <label
      className={cn(
        'cursor-pointer rounded-xl border-[1.5px] px-3 py-2.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-plum-500 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-cloud has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-45',
        checked ? 'border-plum-900 bg-plum-900 text-cloud' : 'border-mist bg-cloud text-plum-900 hover:border-lilac hover:bg-glow/50',
        className,
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  )
}

export default function BookingForm() {
  const id = useId()
  const [format, setFormat] = useState<LiveFormat | null>(null)
  const [tierId, setTierId] = useState<LiveTierId | null>(null)
  const [pickedDay, setPickedDay] = useState<string | null>(null)
  const [pickedSlot, setPickedSlot] = useState<number | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)
  // `website` is the honeypot — hidden from people, filled in by bots.
  const [form, setForm] = useState({ name: '', email: '', notes: '', website: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(v => ({ ...v, [k]: e.target.value }))

  const tier = liveReading.tiers.find(t => t.id === tierId) ?? null
  const formatLabel = liveReading.formats.find(f => f.id === format)?.label

  // This form only mounts inside the open dialog, so the clock and timezone
  // used here are always the visitor's — never the server's.
  const days = useMemo(() => {
    const byDay = new Map<string, number[]>()
    for (const slot of tier ? getSlots(tier) : []) {
      const key = dayKey(slot)
      byDay.set(key, [...(byDay.get(key) ?? []), slot])
    }
    return [...byDay]
  }, [tier])

  // Selections that no longer fit (e.g. after switching to a longer reading) fall away.
  const activeDay = days.find(([key]) => key === pickedDay) ?? days[0]
  const slot = pickedSlot !== null && days.some(([, slots]) => slots.includes(pickedSlot)) ? pickedSlot : null

  // Close the native dialog synchronously — it hands focus back to its opener,
  // which would otherwise undo the jump — then scroll to the contact form.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!format || !tier || slot === null) {
      setError('Pick a format, a length, and a time first.')
      return
    }
    setStatus('sending')
    setError(null)
    const failure = await postForm('/api/booking', {
      format,
      tier: tier.id,
      start: slot,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      ...form,
    })
    setError(failure)
    setStatus(failure ? 'idle' : 'sent')
  }

  if (status === 'sent' && tier && slot !== null) {
    return (
      <div role="status" className="flex flex-col items-center gap-3 py-4 text-center">
        <span aria-hidden className="text-3xl text-orchid">✦</span>
        <p className="font-display text-[2rem] font-medium leading-tight text-plum-900">Request sent.</p>
        <p className="text-[15px] font-semibold leading-6 text-plum-900">
          {formatLabel} · {tier.label} · {tier.price}
          <br />
          {fullLabel(slot)} <span className="font-normal text-plum-700">(your time)</span>
        </p>
        <p className="text-[15px] leading-6 text-plum-700">Isa will reply by email to confirm your time.</p>
        {tier.paymentUrl ? (
          <>
            <a
              href={tier.paymentUrl}
              className={cn(PRIMARY_BUTTON, 'mt-2')}
            >
              Continue to payment
              <ArrowUpRight size={15} aria-hidden />
            </a>
            <p className="text-[13px] leading-5 text-plum-700">Use the same email at checkout so Isa can match it to your booking.</p>
          </>
        ) : (
          <p className="text-[15px] leading-6 text-plum-700">She’ll include payment details when she confirms.</p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <fieldset className="flex min-w-0 flex-col gap-2">
        <legend className={cn(LABEL, 'mb-2')}>Format — you pick</legend>
        <div className="grid grid-cols-3 gap-2">
          {liveReading.formats.map(f => {
            const Icon = FORMAT_ICONS[f.id]
            return (
              <Choice key={f.id} name={`${id}-format`} value={f.label} checked={format === f.id} onChange={() => setFormat(f.id)} className="flex flex-col items-center gap-1.5 py-3 text-center">
                <Icon size={18} aria-hidden />
                <span className="text-xs font-bold sm:text-sm">{f.label}</span>
              </Choice>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="flex min-w-0 flex-col gap-2">
        <legend className={cn(LABEL, 'mb-2')}>Length</legend>
        <div className="grid grid-cols-3 gap-2">
          {liveReading.tiers.map(t => (
            <Choice key={t.id} name={`${id}-tier`} value={`${t.label} ${t.price}`} checked={tierId === t.id} onChange={() => setTierId(t.id)} className="text-center">
              <span className="block font-bold">{t.label}</span>
              <span className="block text-xs font-semibold">{t.price}</span>
            </Choice>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex min-w-0 flex-col gap-3">
        <legend className={cn(LABEL, 'mb-2')}>Day &amp; time</legend>
        {!tier ? (
          <p className="text-sm text-plum-700">Pick a length to see open times.</p>
        ) : days.length === 0 ? (
          <p className="text-sm leading-6 text-plum-700">
            No open times in the next few weeks.{' '}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- hash link to the home page's contact form (see Navbar); leaving the page closes the dialog */}
            <a href="/#contact" className={TEXT_LINK}>Send a note</a>{' '}
            and Isa will find a time with you.
          </p>
        ) : (
          <>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {days.map(([key, slots]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPickedDay(key)}
                  aria-pressed={key === activeDay?.[0]}
                  className={cn(
                    'shrink-0 rounded-full border-[1.5px] px-3.5 py-1.5 text-xs font-bold transition-colors',
                    key === activeDay?.[0] ? 'border-plum-500 bg-blush text-plum-900' : 'border-mist bg-cloud text-plum-700 hover:border-lilac hover:text-plum-900',
                  )}
                >
                  {dayLabel(slots[0])}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {activeDay?.[1].map(s => (
                <Choice key={s} name={`${id}-slot`} value={timeLabel(s)} checked={slot === s} onChange={() => setPickedSlot(s)} className="py-2 text-center text-xs sm:text-sm">
                  {timeLabel(s)}
                </Choice>
              ))}
            </div>
            <p className="text-xs text-plum-700">
              Times shown in your timezone ({Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, ' ')}).
            </p>
          </>
        )}
      </fieldset>

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
        <label htmlFor={`${id}-notes`} className={LABEL}>
          Anything Isa should know <span className="font-normal text-plum-500">(optional)</span>
        </label>
        <textarea
          id={`${id}-notes`}
          rows={3}
          value={form.notes}
          onChange={set('notes')}
          className={`${FIELD} resize-none`}
          placeholder="Your question, what's on your mind, or your VR setup…"
        />
      </div>

      {format && tier && slot !== null && (
        <p className="rounded-xl border border-lilac bg-glow px-4 py-3 text-sm leading-6 text-plum-900">
          {formatLabel} · {tier.label} · {fullLabel(slot)} — <span className="font-bold">{tier.price}</span>
        </p>
      )}
      {error && (
        <p role="alert" className={FORM_ERROR}>{error}</p>
      )}
      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] leading-5 text-plum-700">Isa confirms every request by email.</p>
        <button type="submit" disabled={status === 'sending'} className={PRIMARY_BUTTON}>
          {status === 'sending' ? 'Sending…' : 'Request this time'}
          <Send size={14} aria-hidden />
        </button>
      </div>
      {/* Honeypot — kept last so it never takes the dialog's initial focus. */}
      <div aria-hidden className="sr-only">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
        </label>
      </div>
    </form>
  )
}
