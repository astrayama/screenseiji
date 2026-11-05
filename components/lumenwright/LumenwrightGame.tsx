import { Armchair, Box, Grab, Hand, HandFist, Mountain, PersonStanding, Pointer, Zap } from 'lucide-react'
import Reveal from '@/components/lumenwright/Reveal'
import {
  FURY,
  RESOLVE,
  lumenwrightHollows,
  lumenwrightRun,
  lumenwrightSigns,
  lumenwrightTemperaments,
  type Sign,
} from '@/lib/lumenwright-content'
import { cn } from '@/lib/utils'

const H2 = 'mt-4 text-balance font-lumenwright-display text-3xl font-medium leading-[1.12] tracking-tight sm:text-[2.6rem]'
const LEAD = 'mt-5 text-base leading-7 text-lumenwright-muted'

/** Both palms up, spreading: two hands under an arc. */
function DomeIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 15a9 9 0 0 1 18 0" />
      <path d="M2 19h6M16 19h6" />
      <path d="M6 15v4M18 15v4" />
    </svg>
  )
}

const SIGN_ICONS: Record<Sign['icon'], React.ComponentType<{ size?: number }>> = {
  hand: Hand,
  grab: Grab,
  fist: HandFist,
  point: Pointer,
  dome: DomeIcon,
}

function SectionHead({ eyebrow, headline, lead, id }: { eyebrow: string; headline: string; lead?: string; id: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="lumenwright-eyebrow">{eyebrow}</p>
      <h2 id={id} className={H2}>{headline}</h2>
      {lead && <p className={LEAD}>{lead}</p>}
    </Reveal>
  )
}

export function LumenwrightTemperaments() {
  const t = lumenwrightTemperaments

  return (
    <section aria-labelledby="temperaments-title" className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
      <SectionHead id="temperaments-title" eyebrow={t.eyebrow} headline={t.headline} lead={t.lead} />
      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {t.items.map((temperament, i) => (
          <li key={temperament.id}>
            <Reveal delay={i * 0.1} className="lumenwright-panel h-full p-7">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={cn(
                    'lumenwright-light h-4 w-4 rounded-full',
                    temperament.id === 'resolve' ? 'animate-lumenwright-pulse' : 'animate-lumenwright-fury',
                  )}
                  style={{ '--glow': temperament.color, background: temperament.color } as React.CSSProperties}
                />
                <h3 className="font-lumenwright-display text-2xl font-medium" style={{ color: temperament.color }}>
                  {temperament.name}
                </h3>
              </div>
              <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.14em] text-lumenwright-faint">{temperament.look}</p>
              <p className="mt-4 text-[15px] leading-7 text-lumenwright-muted">{temperament.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Construct({ name, body, color }: { name: string; body: string; color: string }) {
  return (
    <div>
      <p className="font-lumenwright-display text-lg font-medium" style={{ color }}>{name}</p>
      <p className="mt-1 text-[14px] leading-6 text-lumenwright-muted">{body}</p>
    </div>
  )
}

export function LumenwrightSigns() {
  const s = lumenwrightSigns

  return (
    <section id="signs" aria-labelledby="signs-title" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24">
      <SectionHead id="signs-title" eyebrow={s.eyebrow} headline={s.headline} lead={s.lead} />

      {/* Column labels for wide screens; each card names its temperaments on phones */}
      <div aria-hidden className="mt-12 hidden grid-cols-[1.1fr_1fr_1fr] gap-6 px-7 text-[12px] font-semibold uppercase tracking-[0.18em] md:grid">
        <span className="text-lumenwright-faint">Sign</span>
        <span style={{ color: RESOLVE }}>Resolve makes</span>
        <span style={{ color: FURY }}>Fury makes</span>
      </div>
      <ul className="mt-4 space-y-4 max-md:mt-12">
        {s.signs.map((sign, i) => {
          const Icon = SIGN_ICONS[sign.icon]
          return (
            <li key={sign.sign}>
              <Reveal delay={i * 0.05} className="lumenwright-panel grid gap-5 p-6 sm:p-7 md:grid-cols-[1.1fr_1fr_1fr] md:gap-6">
                <div className="flex items-start gap-4">
                  <span className="lumenwright-light flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lumenwright-resolve" style={{ '--glow': RESOLVE } as React.CSSProperties}>
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-lumenwright-display text-xl font-medium text-lumenwright-text">{sign.sign}</h3>
                    <p className="mt-0.5 text-[14px] text-lumenwright-faint">{sign.pose}</p>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] md:sr-only" style={{ color: RESOLVE }}>Resolve</p>
                  <Construct {...sign.resolve} color={RESOLVE} />
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] md:sr-only" style={{ color: FURY }}>Fury</p>
                  <Construct {...sign.fury} color={FURY} />
                </div>
              </Reveal>
            </li>
          )
        })}
      </ul>
      <Reveal className="mt-6 flex items-start justify-center gap-2.5 text-center text-[15px] leading-7 text-lumenwright-text">
        <Zap size={18} aria-hidden className="mt-1 shrink-0 text-lumenwright-resolve" />
        <p className="max-w-xl">{s.charge}</p>
      </Reveal>
    </section>
  )
}

/** A Hollow's silhouette, the decoy drawn with its hollow core. */
function HollowGlyph({ decoy }: { decoy?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" width={44} height={44} aria-hidden>
      <path d="M10 18 L28 6 L42 20 L36 40 L14 38 Z" fill="#1D1934" stroke="#8C7FD0" strokeOpacity="0.6" strokeWidth="1.5" strokeLinejoin="round" />
      {decoy ? (
        <path d="M22 20 L30 18 L32 28 L24 30 Z" fill="#0A0A17" stroke="#8C7FD0" strokeOpacity="0.5" strokeDasharray="2 2" />
      ) : (
        <path d="M26 12 L23 24 L30 30" fill="none" stroke="#8C7FD0" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
      )}
    </svg>
  )
}

export function LumenwrightHollows() {
  const h = lumenwrightHollows

  return (
    <section aria-labelledby="hollows-title" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <SectionHead id="hollows-title" eyebrow={h.eyebrow} headline={h.headline} lead={h.lead} />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {h.items.map((hollow, i) => (
          <li key={hollow.name}>
            <Reveal
              delay={i * 0.06}
              className={cn(
                'lumenwright-panel h-full p-5',
                'decoy' in hollow && 'border-dashed border-lumenwright-fury/40',
              )}
            >
              <HollowGlyph decoy={'decoy' in hollow} />
              <h3 className="mt-3 font-lumenwright-display text-lg font-medium text-lumenwright-text">{hollow.name}</h3>
              <p className="mt-1.5 text-[14px] leading-6 text-lumenwright-muted">{hollow.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}

const PLACE_ICONS = { room: Box, arena: Mountain }

export function LumenwrightRun() {
  const r = lumenwrightRun

  return (
    <section id="run" aria-labelledby="run-title" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24">
      <SectionHead id="run-title" eyebrow={r.eyebrow} headline={r.headline} />

      <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {r.steps.map((step, i) => (
          <li key={step.title}>
            <Reveal delay={i * 0.08} className="lumenwright-panel h-full p-6">
              <span className="font-lumenwright-display text-sm font-medium text-lumenwright-resolve">0{i + 1}</span>
              <h3 className="mt-2 font-lumenwright-display text-xl font-medium text-lumenwright-text">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-6 text-lumenwright-muted">{step.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr_1.15fr]">
        {r.places.map(place => {
          const Icon = PLACE_ICONS[place.id as keyof typeof PLACE_ICONS]
          return (
            <Reveal key={place.id} className="lumenwright-panel p-6">
              <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-lumenwright-faint">
                <Icon size={15} aria-hidden className="text-lumenwright-resolve" />
                {place.kind}
              </p>
              <h3 className="mt-3 font-lumenwright-display text-xl font-medium text-lumenwright-text">{place.title}</h3>
              <p className="mt-2 text-[14px] leading-6 text-lumenwright-muted">{place.body}</p>
            </Reveal>
          )
        })}
        <Reveal className="rounded-[18px] border border-lumenwright-resolve/25 bg-lumenwright-resolve/[0.05] p-6">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-lumenwright-faint">
            <Armchair size={15} aria-hidden className="text-lumenwright-resolve" />
            <PersonStanding size={15} aria-hidden className="-ml-1 text-lumenwright-resolve" />
            Seated or standing
          </p>
          <p className="mt-3 text-[14px] leading-6 text-lumenwright-muted">{r.stance}</p>
          <p className="mt-3 border-t border-lumenwright-resolve/15 pt-3 text-[14px] leading-6 text-lumenwright-text">{r.comfort}</p>
        </Reveal>
      </div>
    </section>
  )
}
