'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/SectionHeading'
import Modal from '@/components/Modal'
import WaitlistForm from '@/components/WaitlistForm'
import { apps, appStatusText, constellationEdges, type AppNode } from '@/lib/data'

const VB_W = 800
const VB_H = 430

function getNode(id: string) {
  return apps.find(a => a.id === id)!
}

const FLAGSHIP = apps.find(a => a.flagship)!
// Betas anyone can try right now get their own row under the flagship…
const TRY_NOW = apps.filter(a => !a.flagship && a.tryUrl)
// …so the mobile grid only needs the rest.
const GRID_APPS = apps.filter(a => !a.flagship && !a.tryUrl)

// Per-node colour: gold for apps in beta, teal for everything in the lab.
function nodeAccent(app: AppNode) {
  return app.status === 'beta' ? '#E8B860' : '#24BFB2'
}

function isExternal(href: string) {
  return !href.startsWith('/') && !href.startsWith('#')
}

export default function AppConstellation() {
  const router = useRouter()
  const { ref: sectionRef, inView } = useInView<HTMLDivElement>()
  const [hovered, setHovered] = useState<string | null>(null)

  const hoveredApp = hovered ? apps.find(a => a.id === hovered) : null

  // Convert SVG-space coords to % for the overlay tooltip
  const tooltipPos = hoveredApp
    ? { x: (hoveredApp.x / VB_W) * 100, y: (hoveredApp.y / VB_H) * 100 }
    : null

  return (
    <section id="apps" className="section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The App Universe"
          title="Seven tools. One philosophy."
          description="Each app is named after the concept it embodies — a constellation of software built for seekers."
        />

        {/* Flagship */}
        <FlagshipCard />
        {TRY_NOW.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRY_NOW.map((app, i) => <TryNowCard key={app.id} app={app} index={i} />)}
          </div>
        )}

        {/* Desktop: SVG constellation */}
        <div
          ref={sectionRef}
          className={cn('relative mt-10 hidden sm:block reveal', inView && 'reveal-in')}
        >
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="w-full"
            role="group"
            aria-label="App constellation diagram"
          >
            <defs>
              <filter id="node-glow">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="node-glow-active">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* One gradient per edge, in user space from end to end: a shared
                  objectBoundingBox gradient isn't painted on a perfectly
                  horizontal line, whose bounding box has zero height. */}
              {constellationEdges.map(([aId, bId]) => {
                const a = getNode(aId)
                const b = getNode(bId)
                return (
                  <linearGradient key={`${aId}-${bId}`} id={`edge-${aId}-${bId}`} gradientUnits="userSpaceOnUse" x1={a.x} y1={a.y} x2={b.x} y2={b.y}>
                    <stop offset="0%"   stopColor="#24BFB2" stopOpacity="0" />
                    <stop offset="50%"  stopColor="#24BFB2" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#24BFB2" stopOpacity="0" />
                  </linearGradient>
                )
              })}
            </defs>

            {/* Edges */}
            {constellationEdges.map(([aId, bId]) => {
              const a = getNode(aId)
              const b = getNode(bId)
              const isActive = hovered === aId || hovered === bId
              return (
                <line
                  key={`${aId}-${bId}`}
                  x1={a.x} y1={a.y}
                  x2={b.x} y2={b.y}
                  stroke={isActive && hoveredApp ? nodeAccent(hoveredApp) : `url(#edge-${aId}-${bId})`}
                  strokeWidth={isActive ? 1.2 : 0.8}
                  strokeOpacity={isActive ? 0.6 : 1}
                  className="transition-all duration-300"
                />
              )
            })}

            {/* Nodes */}
            {apps.map(app => {
              const isHovered = hovered === app.id
              const isFlagship = !!app.flagship
              const { href } = app
              const accent = nodeAccent(app)
              const activate = () => {
                if (!href) return
                if (isExternal(href)) window.open(href, '_blank')
                else router.push(href)
              }
              return (
                <g
                  key={app.id}
                  className={href ? 'cursor-pointer' : 'cursor-default'}
                  role={href ? 'link' : undefined}
                  tabIndex={href ? 0 : undefined}
                  aria-label={`${app.name} — ${app.concept} (${appStatusText(app)})`}
                  onClick={activate}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      activate()
                    }
                  }}
                  onFocus={() => setHovered(app.id)}
                  onBlur={() => setHovered(null)}
                  onMouseEnter={() => setHovered(app.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Outer glow ring */}
                  <circle
                    cx={app.x} cy={app.y}
                    r={app.r + 6}
                    fill={isHovered ? accent : 'transparent'}
                    fillOpacity={isHovered ? 0.08 : 0}
                    className="transition-all duration-300"
                  />
                  {/* Main node */}
                  <circle
                    cx={app.x} cy={app.y}
                    r={app.r}
                    fill={isHovered ? accent : '#0D1220'}
                    stroke={accent}
                    strokeWidth={isHovered ? 1.5 : isFlagship ? 1.6 : 1}
                    strokeOpacity={isHovered ? 1 : isFlagship ? 0.9 : 0.55}
                    filter={isHovered ? 'url(#node-glow-active)' : 'url(#node-glow)'}
                    className="transition-all duration-300 animate-node-glow"
                    style={{
                      '--node-glow': `${accent}80`,
                      '--node-glow-strong': `${accent}B0`,
                    } as React.CSSProperties}
                  />
                  {/* Center dot */}
                  <circle
                    cx={app.x} cy={app.y}
                    r={2.5}
                    fill={accent}
                    fillOpacity={isHovered ? 1 : 0.7}
                  />
                  {/* Labels */}
                  {app.nameLines.map((line, li) => (
                    <text
                      key={li}
                      x={app.x}
                      y={app.labelAbove
                        ? app.y - app.r - 10 - (app.nameLines.length - 1 - li) * 12
                        : app.y + app.r + 14 + li * 12}
                      textAnchor="middle"
                      fontSize="10"
                      fontFamily="var(--font-space-grotesk), system-ui"
                      fill={isHovered ? '#E8EAF0' : '#8892A4'}
                      className="transition-all duration-200 select-none"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              )
            })}
          </svg>

          {/* Floating tooltip — the outer div positions and centres it above the
              node; the inner motion.div only animates, because framer-motion
              replaces any static transform on the element it animates. */}
          <AnimatePresence>
            {hoveredApp && tooltipPos && (
              <div
                key={hoveredApp.id}
                className="pointer-events-none absolute w-56"
                style={{
                  left: `clamp(7rem, ${tooltipPos.x}%, calc(100% - 7rem))`,
                  top:  `${tooltipPos.y}%`,
                  transform: 'translate(-50%, calc(-100% - 24px))',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 6 }}
                  animate={{ opacity: 1, scale: 1,    y: 0 }}
                  exit={{   opacity: 0, scale: 0.92, y: 4 }}
                  transition={{ duration: 0.18 }}
                  className="glass rounded-2xl px-5 py-4 shadow-panel"
                >
                  <p
                    className="font-display text-xl font-medium"
                    style={{ color: nodeAccent(hoveredApp) }}
                  >
                    {hoveredApp.name}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted">{hoveredApp.concept}</p>
                  <p
                    className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] opacity-70"
                    style={{ color: nodeAccent(hoveredApp) }}
                  >
                    {appStatusText(hoveredApp)}
                  </p>
                  {hoveredApp.href && (
                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted/60">→ Open</p>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>

        {/* Legend — outside the star's container, whose height the tooltip's
            top % is measured against, so it must match the SVG exactly. */}
        <div className="mt-6 hidden justify-center gap-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted/70 sm:flex">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold-bright shadow-gold" />
            In beta
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full border border-teal/70" />
            In the lab
          </span>
        </div>

        {/* Mobile: card grid (the flagship is featured above) */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:hidden [&>*:last-child:nth-child(odd)]:col-span-2">
          {GRID_APPS.map(app => (
            <a
              key={app.id}
              href={app.href}
              target={app.href && isExternal(app.href) ? '_blank' : undefined}
              rel={app.href && isExternal(app.href) ? 'noreferrer' : undefined}
              className={cn(
                'glass rounded-2xl p-4 transition-all duration-200',
                app.href
                  ? 'hover:glass-teal hover:-translate-y-0.5'
                  : 'opacity-65 pointer-events-none',
              )}
            >
              <p
                className="font-display text-lg font-medium leading-tight"
                style={{ color: nodeAccent(app) }}
              >
                {app.name}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">{app.concept}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-teal/70">
                {appStatusText(app)}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function FlagshipCard() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  return (
    <div
      ref={ref}
      className={cn(
        'glass glass-gold mt-14 flex flex-col gap-6 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 reveal',
        inView && 'reveal-in',
      )}
    >
      <div className="flex items-start gap-5">
        <span
          aria-hidden
          className="mt-2 h-3 w-3 shrink-0 rounded-full bg-gold-bright shadow-gold animate-node-glow"
          style={{ '--node-glow': '#E8B86080', '--node-glow-strong': '#E8B860B0' } as React.CSSProperties}
        />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Flagship</p>
          <h3 className="mt-1 font-display text-3xl font-light text-foreground sm:text-4xl">{FLAGSHIP.name}</h3>
          <p className="mt-1 text-sm text-muted">{FLAGSHIP.concept}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setWaitlistOpen(true)}
        className="inline-flex items-center gap-2 self-start rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold-bright transition-all hover:border-gold hover:bg-gold/20 sm:self-auto"
      >
        {appStatusText(FLAGSHIP)}
      </button>

      <Modal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        eyebrow="Flagship · In beta"
        title={`Join the ${FLAGSHIP.name} waitlist`}
      >
        <WaitlistForm appId={FLAGSHIP.id} appName={FLAGSHIP.name} />
      </Modal>
    </div>
  )
}

function TryNowCard({ app, index }: { app: AppNode; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn('glass flex h-full flex-col gap-4 rounded-2xl p-6 reveal', inView && 'reveal-in')}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex-1">
        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold/80">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-bright/80" />
          Also in beta
        </p>
        <p className="mt-2 font-display text-2xl font-light text-foreground">{app.name}</p>
        <p className="mt-1 text-sm leading-6 text-muted">{app.concept}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <a
          href={app.tryUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-bright transition-all hover:border-gold hover:bg-gold/20"
        >
          {appStatusText(app)}
          <span className="opacity-70">↗</span>
        </a>
        {app.href && app.href !== app.tryUrl && (
          <a href={app.href} className="text-xs font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-foreground">
            Learn more
          </a>
        )}
      </div>
    </div>
  )
}
