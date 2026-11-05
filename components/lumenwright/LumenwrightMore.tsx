import { ArrowUpRight, EyeOff, Hand, HardDrive, Sparkles } from 'lucide-react'
import VideoPlayer from '@/components/home/VideoPlayer'
import Reveal from '@/components/lumenwright/Reveal'
import { youtube } from '@/lib/data'
import { lumenwrightDevlog, lumenwrightPlanned, lumenwrightPrivacy } from '@/lib/lumenwright-content'

const H2 = 'mt-4 text-balance font-lumenwright-display text-3xl font-medium leading-[1.12] tracking-tight sm:text-[2.6rem]'

export function LumenwrightDevlog() {
  const d = lumenwrightDevlog

  return (
    <section aria-labelledby="devlog-title" className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
        <Reveal>
          <p className="lumenwright-eyebrow">{d.eyebrow}</p>
          <h2 id="devlog-title" className={H2}>{d.headline}</h2>
          <p className="mt-2 font-lumenwright-display text-lg text-lumenwright-resolve">{d.episode}</p>
          <p className="mt-5 max-w-md text-base leading-7 text-lumenwright-muted">{d.body}</p>
          <a
            href={youtube.channelUrl}
            target="_blank"
            rel="me noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-lumenwright-text underline decoration-lumenwright-resolve/50 underline-offset-4 transition-colors hover:text-lumenwright-resolve"
          >
            {d.more}
            <ArrowUpRight size={16} aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto w-full max-w-[300px] md:w-[280px] lg:w-[300px]">
          <VideoPlayer
            id={d.video.id}
            title={d.video.title}
            thumbnail={`https://i.ytimg.com/vi/${d.video.id}/hqdefault.jpg`}
            vertical
            frameClassName="lumenwright-light rounded-[1.5rem] bg-lumenwright-panel"
          />
        </Reveal>
      </div>
    </section>
  )
}

export function LumenwrightPlanned() {
  const p = lumenwrightPlanned

  return (
    <section aria-labelledby="planned-title" className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="lumenwright-eyebrow">{p.eyebrow}</p>
        <h2 id="planned-title" className={H2}>{p.headline}</h2>
        <p className="mt-5 text-base leading-7 text-lumenwright-muted">{p.lead}</p>
      </Reveal>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {p.items.map((planned, i) => (
          <li key={planned.title}>
            <Reveal delay={i * 0.06} className="h-full rounded-[18px] border border-dashed border-lumenwright-resolve/30 p-6">
              <h3 className="flex items-center gap-2 font-lumenwright-display text-lg font-medium text-lumenwright-text">
                <Sparkles size={16} aria-hidden className="text-lumenwright-resolve" />
                {planned.title}
              </h3>
              <p className="mt-2 text-[14px] leading-6 text-lumenwright-muted">{planned.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}

const PRIVACY_ICONS = [EyeOff, Hand, HardDrive]

// Lumenwright has no separate policy page: this is its plain-language privacy
// notice, written from what the game does (app/src/settings.ts and the spec).
export function LumenwrightPrivacy() {
  const p = lumenwrightPrivacy

  return (
    <section id="privacy" aria-labelledby="privacy-title" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="lumenwright-eyebrow">{p.eyebrow}</p>
        <h2 id="privacy-title" className={H2}>{p.headline}</h2>
      </Reveal>
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {p.points.map((point, i) => {
          const Icon = PRIVACY_ICONS[i]
          return (
            <li key={point.title}>
              <Reveal delay={i * 0.08} className="lumenwright-panel h-full p-6">
                <Icon size={20} aria-hidden className="text-lumenwright-resolve" />
                <h3 className="mt-4 font-lumenwright-display text-lg font-medium leading-snug text-lumenwright-text">{point.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-lumenwright-muted">{point.body}</p>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
