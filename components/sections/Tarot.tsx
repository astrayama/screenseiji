'use client'

import { useState } from 'react'
import { CalendarDays, Check, PenLine, Video, type LucideIcon } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/SectionHeading'
import Modal from '@/components/Modal'
import IntakeForm from '@/components/tarot/IntakeForm'
import BookingForm, { FORMAT_ICONS } from '@/components/tarot/BookingForm'
import { intakePackages, liveReading, type IntakePackageId } from '@/lib/data'

const STEPS = [
  {
    title: 'Fill the intake form',
    body: 'Share your question — and anything Isa should know — in a short form right here.',
  },
  {
    title: 'Pay via secure Stripe link',
    body: 'You’re taken straight to a secure Stripe checkout to complete your order.',
  },
  {
    title: 'Receive or book',
    body: 'Async readings are delivered within 48 hours. Live readings are booked right here — you pick voice, video, or VR, and a time; Isa confirms by email.',
  },
]

interface CardProps {
  icon: LucideIcon
  eyebrow: string
  title: string
  description: string
  details: string[]
  price: string
  priceUnit: string
  cta: string
  onCta: () => void
  index: number
  children?: React.ReactNode
}

function PackageCard({ icon: Icon, eyebrow, title, description, details, price, priceUnit, cta, onCta, index, children }: CardProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn('glass rounded-3xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:glass-gold reveal h-full', inView && 'reveal-in')}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-gold">
          <Icon size={18} />
        </span>
        <div className="text-right">
          <p className="font-display text-3xl font-light leading-none text-foreground">{price}</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/70">{priceUnit}</p>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        <h3 className="mt-1 font-display text-2xl font-medium text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      </div>
      {details.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {details.map(d => (
            <li key={d} className="flex items-center gap-2 text-xs text-muted/80">
              <Check size={13} className="text-teal/70" />
              {d}
            </li>
          ))}
        </ul>
      )}
      {children}
      <div className="mt-auto">
        <button
          type="button"
          onClick={onCta}
          className="self-start rounded-full border border-gold/40 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:border-gold hover:bg-gold/10"
        >
          {cta}
        </button>
      </div>
    </div>
  )
}

export default function Tarot() {
  const [dialog, setDialog] = useState<IntakePackageId | 'live' | null>(null)
  const close = () => setDialog(null)
  const activePackage = dialog && dialog !== 'live' ? intakePackages[dialog] : null
  const { written, video } = intakePackages

  return (
    <section id="tarot" className="section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Tarot Readings"
          title="A mirror, not a forecast."
          description="Tarot as a symbolic language for self-reflection — not prediction, but a mirror held up to what you already know. Choose how you’d like to receive yours."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <PackageCard
            icon={PenLine}
            eyebrow={written.eyebrow}
            title={written.title}
            description={written.description}
            details={written.details}
            price={written.price}
            priceUnit={written.priceUnit}
            cta={written.cta}
            onCta={() => setDialog('written')}
            index={0}
          />
          <PackageCard
            icon={Video}
            eyebrow={video.eyebrow}
            title={video.title}
            description={video.description}
            details={video.details}
            price={video.price}
            priceUnit={video.priceUnit}
            cta={video.cta}
            onCta={() => setDialog('video')}
            index={1}
          />
          <PackageCard
            icon={CalendarDays}
            eyebrow={liveReading.eyebrow}
            title={liveReading.title}
            description={liveReading.description}
            details={[]}
            price={`${liveReading.tiers[0].price}–${liveReading.tiers.at(-1)!.price.replace('$', '')}`}
            priceUnit="by length"
            cta="Book a live reading"
            onCta={() => setDialog('live')}
            index={2}
          >
            <div>
              <p className="text-xs font-semibold text-foreground/80">You pick: voice, video, or VR.</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {liveReading.formats.map(f => {
                  const Icon = FORMAT_ICONS[f.id]
                  return (
                    <li
                      key={f.id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-teal/25 bg-teal/8 px-3 py-1 text-[11px] font-medium text-teal"
                    >
                      <Icon size={12} />
                      {f.label}
                    </li>
                  )
                })}
              </ul>
              <ul className="mt-4 flex flex-col divide-y divide-white/6 rounded-xl border border-white/6">
                {liveReading.tiers.map(t => (
                  <li key={t.id} className="flex items-center justify-between px-3.5 py-2 text-xs">
                    <span className="text-muted">{t.label}</span>
                    <span className="font-medium text-foreground">{t.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </PackageCard>
        </div>

        {/* How it works */}
        <div className="mt-10 rounded-3xl border border-white/6 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">How it works</p>
          <ol className="mt-6 grid gap-6 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-base text-gold">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Modal
        open={dialog !== null}
        onClose={close}
        eyebrow={activePackage ? `${activePackage.eyebrow} · ${activePackage.price}` : liveReading.eyebrow}
        title={activePackage ? activePackage.title : 'Book a live reading'}
        size={dialog === 'live' ? 'lg' : 'md'}
      >
        {dialog === 'live' && <BookingForm onClose={close} />}
        {activePackage && <IntakeForm key={activePackage.id} pkg={activePackage} />}
      </Modal>
    </section>
  )
}
