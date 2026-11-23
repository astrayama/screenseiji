'use client'

import { Check } from 'lucide-react'
import { BUTTON_OUTLINE, CARD, CONTAINER, EYEBROW, H3, TAG, TEXT_LINK } from '@/components/ui'
import { OnePageGlyph, PresenceGlyph, UpkeepGlyph } from '@/components/studio/StudioArt'
import { useStudioInquiry } from '@/components/studio/StudioInquiry'
import StudioTitle from '@/components/studio/StudioTitle'
import { studio, type StudioPackage, type StudioPackageId } from '@/lib/data'
import { studioBeyond, studioPackagesCopy } from '@/lib/studio-content'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'

const GLYPHS: Record<StudioPackageId, typeof OnePageGlyph> = {
  'one-page': OnePageGlyph,
  presence: PresenceGlyph,
  upkeep: UpkeepGlyph,
}

// The full presence is the featured card: deep plum, with gold.
const FEATURED: StudioPackageId = 'presence'

function PackageCard({ pkg }: { pkg: StudioPackage }) {
  const { pick } = useStudioInquiry()
  const featured = pkg.id === FEATURED
  const Glyph = GLYPHS[pkg.id]

  return (
    <li
      className={cn(
        'relative flex h-full flex-col rounded-[1.375rem] p-6 transition-transform duration-300 motion-safe:hover:-translate-y-1 sm:p-7',
        featured ? 'bg-plum-900 text-cloud shadow-float lg:-my-3 lg:py-10' : CARD,
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-gold px-3.5 py-1 font-eyebrow text-[11px] font-semibold uppercase tracking-[0.2em] text-plum-900 sm:left-7">
          {studioPackagesCopy.featuredFlag}
        </span>
      )}
      <Glyph tone={featured ? 'dark' : 'light'} />
      <h3 className={cn(H3, 'mt-4', featured && 'text-cloud')}>{pkg.name}</h3>
      <p className="mt-3 flex items-baseline gap-2">
        <span className={cn('font-display text-[3.25rem] font-semibold leading-none', featured ? 'text-gold' : 'text-plum-900')}>
          {pkg.price}
        </span>
        {pkg.per && (
          <span className={cn('font-eyebrow text-xs font-semibold uppercase tracking-[0.16em]', featured ? 'text-cloud/80' : 'text-plum-500')}>
            {pkg.per}
          </span>
        )}
      </p>

      <ul className={cn('mt-6 flex flex-col gap-2.5 border-t pt-5', featured ? 'border-cloud/20' : 'border-mist')}>
        {pkg.includes.map(item => (
          <li key={item} className={cn('flex gap-3 text-[15px] leading-6', featured ? 'text-cloud' : 'text-plum-700')}>
            <span
              aria-hidden
              className={cn('mt-[0.45rem] h-2.5 w-2.5 shrink-0 rounded-full border-2', featured ? 'border-gold' : 'border-gold-deep')}
            />
            {item}
          </li>
        ))}
      </ul>
      {pkg.note && (
        <p className={cn('mt-5 rounded-xl px-4 py-3 text-sm leading-6', featured ? 'bg-cloud/10 text-cloud' : 'bg-glow/70 text-plum-700')}>
          {pkg.note}
        </p>
      )}

      <div className="mt-auto pt-7">
        <button
          type="button"
          onClick={() => {
            track('studio_package_pick', { package: pkg.id })
            pick(pkg.name)
          }}
          className={cn(
            featured
              ? 'inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-[15px] font-bold text-plum-900 transition-colors hover:bg-cloud'
              : cn(BUTTON_OUTLINE, 'w-full'),
          )}
        >
          {pkg.cta}
          <span aria-hidden>→</span>
        </button>
      </div>
    </li>
  )
}

// The three packages, then the bigger builds that are quoted separately.
export default function StudioPackages() {
  const { pick } = useStudioInquiry()

  return (
    <section id="packages" aria-labelledby="packages-title" className="py-16 sm:py-24">
      <div className={CONTAINER}>
        <div className="max-w-2xl">
          <p className={EYEBROW}>{studioPackagesCopy.eyebrow}</p>
          <StudioTitle id="packages-title" parts={studioPackagesCopy.title} className="mt-3" />
        </div>

        <ul className="mt-14 grid gap-8 lg:grid-cols-3 lg:items-stretch lg:gap-5">
          {studio.packages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </ul>

        <p className="mt-10 text-[15px] leading-7 text-plum-700">
          {studioPackagesCopy.notSure}{' '}
          <button type="button" onClick={() => pick(null)} className={cn(TEXT_LINK, 'text-left')}>
            {studioPackagesCopy.notSureCta}
          </button>
          .
        </p>

        {/* Beyond the packages: what the old /websites page offered */}
        <div className="mt-16 grid gap-8 rounded-[1.375rem] border border-mist bg-cloud/60 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          <div>
            <p className={TAG}>{studioBeyond.eyebrow}</p>
            <h3 className={cn(H3, 'mt-2')}>{studioBeyond.title}</h3>
            <p className="mt-3 text-[15px] leading-7 text-plum-700">{studioBeyond.lead}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {studio.services.map(s => (
              <li key={s.title} className="rounded-2xl border border-mist bg-cloud p-5">
                <p className="text-base font-bold text-plum-900">{s.title}</p>
                <p className="mt-1 text-sm leading-6 text-plum-700">{s.description}</p>
                <ul className="mt-4 flex flex-col gap-1.5 border-t border-mist pt-4">
                  {s.includes.map(i => (
                    <li key={i} className="flex items-center gap-2 text-[13px] text-plum-700">
                      <Check size={13} aria-hidden className="shrink-0 text-gold-deep" />
                      {i}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-2 border-t border-mist pt-6 lg:col-span-2">
            <span className="mr-1 text-[13px] font-bold text-plum-900">{studioBeyond.includedLabel}</span>
            {studio.included.map(i => (
              <span key={i} className="rounded-full border border-mist bg-cloud px-3 py-1 text-[13px] text-plum-700">
                {i}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
