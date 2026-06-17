'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/SectionHeading'
import { apps, constellationEdges } from '@/lib/data'

const VB_W = 800
const VB_H = 430

function getNode(id: string) {
  return apps.find(a => a.id === id)!
}

export default function AppConstellation() {
  const { ref: sectionRef, inView } = useInView<HTMLDivElement>()
  const svgContainerRef = useRef<HTMLDivElement>(null)
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

        {/* Desktop: SVG constellation */}
        <div
          ref={ref => {
            // merge refs
            ;(sectionRef as React.MutableRefObject<HTMLDivElement | null>).current = ref
            ;(svgContainerRef as React.MutableRefObject<HTMLDivElement | null>).current = ref
          }}
          className={cn('relative mt-14 hidden sm:block reveal', inView && 'reveal-in')}
        >
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="w-full"
            role="img"
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
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#24BFB2" stopOpacity="0" />
                <stop offset="50%"  stopColor="#24BFB2" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#24BFB2" stopOpacity="0" />
              </linearGradient>
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
                  stroke={isActive ? '#24BFB2' : 'url(#line-grad)'}
                  strokeWidth={isActive ? 1.2 : 0.8}
                  strokeOpacity={isActive ? 0.6 : 1}
                  className="transition-all duration-300"
                />
              )
            })}

            {/* Nodes */}
            {apps.map(app => {
              const isHovered = hovered === app.id
              const isLive = app.status === 'live'
              return (
                <g
                  key={app.id}
                  className="cursor-pointer"
                  onClick={() => { if (isLive) window.open(app.href, '_blank') }}
                  onMouseEnter={() => setHovered(app.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Outer glow ring */}
                  <circle
                    cx={app.x} cy={app.y}
                    r={app.r + 6}
                    fill={isHovered ? (isLive ? '#24BFB2' : '#C9943C') : 'transparent'}
                    fillOpacity={isHovered ? 0.08 : 0}
                    className="transition-all duration-300"
                  />
                  {/* Main node */}
                  <circle
                    cx={app.x} cy={app.y}
                    r={app.r}
                    fill={isHovered ? (isLive ? '#24BFB2' : '#C9943C') : '#0D1220'}
                    stroke={isLive ? '#24BFB2' : '#C9943C'}
                    strokeWidth={isHovered ? 1.5 : 1}
                    strokeOpacity={isHovered ? 1 : 0.55}
                    filter={isHovered ? 'url(#node-glow-active)' : 'url(#node-glow)'}
                    className="transition-all duration-300 animate-node-glow"
                  />
                  {/* Center dot */}
                  <circle
                    cx={app.x} cy={app.y}
                    r={2.5}
                    fill={isLive ? '#24BFB2' : '#C9943C'}
                    fillOpacity={isHovered ? 1 : 0.7}
                  />
                  {/* Labels */}
                  {app.nameLines.map((line, li) => (
                    <text
                      key={li}
                      x={app.x}
                      y={app.y + app.r + 14 + li * 12}
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

          {/* Floating tooltip */}
          <AnimatePresence>
            {hoveredApp && tooltipPos && (
              <motion.div
                key={hoveredApp.id}
                initial={{ opacity: 0, scale: 0.92, y: 6 }}
                animate={{ opacity: 1, scale: 1,    y: 0 }}
                exit={{   opacity: 0, scale: 0.92, y: 4 }}
                transition={{ duration: 0.18 }}
                className="pointer-events-none absolute glass rounded-2xl px-5 py-4 shadow-panel w-56"
                style={{
                  left: `${tooltipPos.x}%`,
                  top:  `${tooltipPos.y}%`,
                  transform: 'translate(-50%, calc(-100% - 24px))',
                }}
              >
                <p className={cn(
                  'font-display text-xl font-medium',
                  hoveredApp.status === 'live' ? 'text-teal' : 'text-gold',
                )}>
                  {hoveredApp.name}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted">{hoveredApp.concept}</p>
                {hoveredApp.status === 'live' ? (
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-teal/70">
                    → Open app
                  </p>
                ) : (
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/70">
                    In development
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile: card grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:hidden">
          {apps.map(app => (
            <a
              key={app.id}
              href={app.status === 'live' ? app.href : undefined}
              target="_blank"
              rel="noreferrer"
              className={cn(
                'glass rounded-2xl p-4 transition-all duration-200',
                app.status === 'live'
                  ? 'hover:glass-teal hover:-translate-y-0.5'
                  : 'opacity-65 pointer-events-none',
              )}
            >
              <p className={cn(
                'font-display text-lg font-medium leading-tight',
                app.status === 'live' ? 'text-teal' : 'text-gold',
              )}>
                {app.name}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">{app.concept}</p>
              {app.status === 'in-dev' && (
                <p className="mt-2 text-[10px] font-semibold text-gold/60">Coming soon</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
