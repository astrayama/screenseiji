'use client'

import { useState } from 'react'
import { CalendarDays, Check, PenLine, Video, type LucideIcon } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import Modal from '@/components/Modal'
import IntakeForm from '@/components/tarot/IntakeForm'
import BookingForm, { FORMAT_ICONS } from '@/components/tarot/BookingForm'
import { Sparkle } from '@/components/brand/SkyArt'
import { BUTTON_OUTLINE, CARD, CONTAINER, EYEBROW, H2, H3, LEAD, TAG } from '@/components/ui'
import { intakePackages, liveReading, readingDisclaimer, type IntakePackageId } from '@/lib/data'

const STEPS = [
  {
    title: 'Fill the intake form',
    body: 'Share your question and anything I should know in a short form right here.',
  },
  {
    title: 'Pay via secure Stripe link',
    body: 'You’re taken straight to a secure Stripe checkout to complete your order.',
  },
  {
    title: 'Receive or book',
    body: 'Written and video readings arrive within 48 hours. For live readings, pick voice, video, or VR and a time right here, and I’ll confirm by email.',
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
      className={cn(CARD, 'reveal flex h-full flex-col gap-5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lilac sm:p-7', inView && 'reveal-in')}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-glow text-plum-900">
          <Icon size={18} aria-hidden />
        </span>
        <div className="text-right">
          <p className="font-display text-[2.5rem] font-semibold leading-none text-plum-900">{price}</p>
          <p className={cn(TAG, 'mt-1.5')}>{priceUnit}</p>
        </div>
      </div>
      <div>
        <p className={TAG}>{eyebrow}</p>
        <h3 className={cn(H3, 'mt-1.5')}>{title}</h3>
        <p className="mt-2 text-[15px] leading-6 text-plum-700">{description}</p>
      </div>
      {details.length > 0 && (
        <ul className="flex flex-col gap-2">
          {details.map(d => (
            <li key={d} className="flex items-center gap-2 text-sm text-plum-700">
              <Check size={14} aria-hidden className="shrink-0 text-plum-500" />
              {d}
            </li>
          ))}
        </ul>
      )}
      {children}
      <div className="mt-auto pt-1">
        <button type="button" onClick={onCta} className={cn(BUTTON_OUTLINE, 'w-full sm:w-auto')}>
          {cta}
        </button>
      </div>
    </div>
  )
}

// The packages, the live-reading booking and how ordering works. Rendered on /tarot.
export default function Readings() {
  const [dialog, setDialog] = useState<IntakePackageId | 'live' | null>(null)
  const close = () => setDialog(null)
  const activePackage = dialog && dialog !== 'live' ? intakePackages[dialog] : null
  const { written, video } = intakePackages

  return (
    <section id="tarot" aria-labelledby="tarot-readings-title" className="relative pb-20 pt-16">
      <Sparkle className="right-[8%] top-14 h-5 w-5 text-orchid sm:right-[14%] sm:top-20 sm:h-6 sm:w-6" twinkle />
      <div className={CONTAINER}>
        <div className="max-w-2xl">
          <p className={EYEBROW}>Tarot Readings</p>
          <h2 id="tarot-readings-title" className={cn(H2, 'mt-3')}>A mirror, not a forecast.</h2>
          <p className={cn(LEAD, 'mt-4')}>
            Tarot as a symbolic language for self-reflection. It lays out what you already know where you can see it. Choose how you’d like to receive your reading.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
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
              <p className="text-[13px] font-bold text-plum-900">You pick: voice, video, or VR.</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {liveReading.formats.map(f => {
                  const Icon = FORMAT_ICONS[f.id]
                  return (
                    <li
                      key={f.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-blush/70 px-3 py-1 text-xs font-bold text-plum-900"
                    >
                      <Icon size={12} aria-hidden />
                      {f.label}
                    </li>
                  )
                })}
              </ul>
              <ul className="mt-4 flex flex-col divide-y divide-mist rounded-xl border border-mist">
                {liveReading.tiers.map(t => (
                  <li key={t.id} className="flex items-center justify-between px-3.5 py-2 text-[13px]">
                    <span className="text-plum-700">{t.label}</span>
                    <span className="font-bold text-plum-900">{t.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </PackageCard>
        </div>

        {/* How it works — the home page links here (/tarot#how-it-works) */}
        <div id="how-it-works" className="mt-10 scroll-mt-24 rounded-[1.375rem] border border-mist bg-cloud/60 p-6 sm:p-8">
          <p className={EYEBROW}>How it works</p>
          <ol className="mt-6 grid gap-6 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush/70 font-display text-lg font-semibold text-plum-900">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[15px] font-bold text-plum-900">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-plum-700">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[13px] leading-5 text-plum-700">{readingDisclaimer}</p>
        </div>
      </div>

      <Modal
        open={dialog !== null}
        onClose={close}
        eyebrow={activePackage ? `${activePackage.eyebrow} · ${activePackage.price}` : liveReading.eyebrow}
        title={activePackage ? activePackage.title : 'Book a live reading'}
        size={dialog === 'live' ? 'lg' : 'md'}
      >
        {dialog === 'live' && <BookingForm />}
        {activePackage && <IntakeForm key={activePackage.id} pkg={activePackage} />}
      </Modal>
    </section>
  )
}
