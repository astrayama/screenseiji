'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Lock } from 'lucide-react'
import { BUTTON_PRIMARY, CARD, CONTAINER, EYEBROW, H3, TAG, TEXT_LINK } from '@/components/ui'
import { useStudioInquiry } from '@/components/studio/StudioInquiry'
import StudioTitle from '@/components/studio/StudioTitle'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { studio, type StudioWork } from '@/lib/data'
import { studioWorkCopy } from '@/lib/studio-content'
import { cn } from '@/lib/utils'
import cebuShot from '@/public/work/cebu.jpg'
import formlessShot from '@/public/work/formless-guide.jpg'

const SHOTS: Record<StudioWork['image'], StaticImageData> = { cebu: cebuShot, formless: formlessShot }
const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Types its address into the browser bar once it scrolls into view, then
 * reports it loaded: the bar sweeps and the page appears.
 */
function useTypedAddress(host: string, delay: number) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const { reduced } = useMotionPreference()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    let timer: ReturnType<typeof setTimeout>
    const tick = (n: number) => {
      setCount(n)
      if (n < host.length) timer = setTimeout(() => tick(n + 1), 38 + Math.random() * 40)
    }
    timer = setTimeout(() => tick(1), delay)
    return () => clearTimeout(timer)
  }, [inView, reduced, host, delay])

  const shown = reduced ? host.length : count
  return { ref, typed: host.slice(0, shown), loaded: shown === host.length }
}

/** A browser window: dots, an address bar that types itself, and the page. */
function BrowserFrame({ host, delay, caret, children }: { host: string; delay: number; caret?: boolean; children: React.ReactNode }) {
  const { ref, typed, loaded } = useTypedAddress(host, delay)
  return (
    <div ref={ref} aria-hidden className="border-b border-mist bg-page/70">
      <div className="flex items-center gap-3 px-3.5 py-2.5">
        <span className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-blush" />
          <span className="h-2.5 w-2.5 rounded-full bg-lilac" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-cloud px-3 py-1 text-xs text-plum-700">
          <Lock size={10} className="shrink-0 text-plum-500" />
          <span className="truncate">{typed}</span>
          <span className={cn('-ml-1 h-3 w-px shrink-0 bg-plum-900', caret || !loaded ? 'animate-caret' : 'opacity-0')} />
        </span>
      </div>
      {/* The page loading: a gold bar sweeps across, then the page appears */}
      <div className="relative h-[2px]">
        <motion.span
          className="absolute inset-y-0 left-0 w-full origin-left bg-gold"
          initial={false}
          animate={loaded ? { scaleX: [0, 1, 1], opacity: [1, 1, 0] } : { scaleX: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, times: [0, 0.7, 1] }}
        />
      </div>
      <motion.div
        className="relative aspect-[16/10] overflow-hidden bg-cloud"
        initial={false}
        animate={{ clipPath: loaded ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }}
        transition={{ duration: 0.8, ease: EASE, delay: loaded ? 0.25 : 0 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function WorkCard({ work, index }: { work: StudioWork; index: number }) {
  return (
    <li className={cn(CARD, 'group flex h-full flex-col overflow-hidden')}>
      <a href={work.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden className="block">
        <BrowserFrame host={work.host} delay={250 + index * 450}>
          <Image
            src={SHOTS[work.image]}
            alt=""
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 100vw"
            placeholder="blur"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        </BrowserFrame>
      </a>
      <div className="flex flex-1 flex-col p-6">
        <p className={TAG}>{work.kind}</p>
        <h3 className={cn(H3, 'mt-1.5')}>{work.name}</h3>
        <p className="mt-2 text-[15px] leading-6 text-plum-700">{work.description}</p>
        <a
          href={work.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(TEXT_LINK, 'mt-auto inline-flex items-center gap-1 self-start pt-5 text-sm')}
        >
          {studioWorkCopy.visit}
          <ArrowUpRight size={15} aria-hidden className="transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
          <span className="sr-only">: {work.host} (opens in a new tab)</span>
        </a>
      </div>
    </li>
  )
}

/** The blueprint of a one-page site, waiting for a shop: dashed lines that creep along. */
function OpenSite() {
  const dash = 'fill-none stroke-gold-deep/50 animate-march [stroke-dasharray:6_6]'
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${i * 40},0 H${i * 40 + 40} V22 A20,14 0 0 1 ${i * 40},22 Z`} strokeWidth="1.2" className={dash} />
      ))}
      <text x="160" y="66" textAnchor="middle" className="fill-plum-500/55 font-display text-[22px] italic">
        Your shop
      </text>
      <rect x="40" y="84" width="112" height="7" rx="3.5" strokeWidth="1.2" className={dash} />
      <rect x="40" y="99" width="84" height="7" rx="3.5" strokeWidth="1.2" className={dash} />
      <rect x="40" y="114" width="98" height="7" rx="3.5" strokeWidth="1.2" className={dash} />
      <rect x="172" y="82" width="108" height="64" rx="8" strokeWidth="1.2" className={dash} />
      <path d="M226 124 c0 0 -8 -9 -8 -13.5 a8 8 0 0 1 16 0 c0 4.5 -8 13.5 -8 13.5 Z" strokeWidth="1.2" className={dash} />
      {[40, 92, 144, 196, 248].map(x => (
        <rect key={x} x={x} y="160" width="32" height="24" rx="5" strokeWidth="1.2" className={dash} />
      ))}
    </svg>
  )
}

/** The third spot: open, for the next shop. A call to action, not a project. */
function OpenCard() {
  const { pick } = useStudioInquiry()
  const open = studioWorkCopy.open
  return (
    <li className="flex h-full flex-col overflow-hidden rounded-[1.375rem] border-2 border-dashed border-gold/80 bg-cloud/50">
      <BrowserFrame host={open.host} delay={1200} caret>
        <OpenSite />
      </BrowserFrame>
      <div className="flex flex-1 flex-col p-6">
        <p className={cn(TAG, 'text-gold-deep')}>{open.kind}</p>
        <h3 className={cn(H3, 'mt-1.5')}>{open.name}</h3>
        <p className="mt-2 text-[15px] leading-6 text-plum-700">{open.body}</p>
        <div className="mt-auto pt-5">
          <button type="button" onClick={() => pick(null)} className={cn(BUTTON_PRIMARY, 'w-full sm:w-auto')}>
            {open.cta}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </li>
  )
}

export default function StudioWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-16 sm:py-24">
      <div className={CONTAINER}>
        <div className="max-w-2xl">
          <p className={EYEBROW}>{studioWorkCopy.eyebrow}</p>
          <StudioTitle id="work-title" parts={studioWorkCopy.title} className="mt-3" />
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studio.work.map((work, i) => (
            <WorkCard key={work.name} work={work} index={i} />
          ))}
          <OpenCard />
        </ul>
      </div>
    </section>
  )
}
