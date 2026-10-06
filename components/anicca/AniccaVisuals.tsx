'use client'

import { useId } from 'react'
import { motion } from 'framer-motion'
import { Bell, FileBraces, FileText, Smartphone } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import { aniccaMock, energyCenter, energyCenters, type EnergyCenterId } from '@/lib/anicca-content'

// Illustrative cards for the landing page, drawn from the app's features.
// Each one is a single labelled image to assistive tech.

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

function Illustration({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div role="img" aria-label={label} className={className}>
      {children}
    </div>
  )
}

export function EmotionChip({ emotion, center, selected }: { emotion: string; center: EnergyCenterId; selected?: boolean }) {
  const c = energyCenter(center)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-semibold text-anicca-ink',
        selected
          ? 'border-anicca-violet bg-anicca-lavender/25 shadow-[0_0_0_3px_rgba(196,168,255,0.35)]'
          : 'border-anicca-lavender/50 bg-white',
      )}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
      {emotion}
      <span className="font-medium text-anicca-muted">· {c.name}</span>
    </span>
  )
}

export function IntensityDots({ value, size = 10 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map(n => (
        <span
          key={n}
          className={cn('rounded-full border', n <= value ? 'border-anicca-violet bg-anicca-violet' : 'border-anicca-lavender bg-white')}
          style={{ width: size, height: size }}
        />
      ))}
    </span>
  )
}

function ProPill() {
  return (
    <span className="rounded-full bg-anicca-violet px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
      Pro
    </span>
  )
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-anicca-muted">{children}</p>
}

// ─── Chakra balance radar ───────────────────────────────────────────────
const R = 100
const CX = 150
const CY = 150

function polar(i: number, r: number) {
  const a = ((i * 360) / 7 - 90) * (Math.PI / 180)
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const
}

function ring(r: number) {
  return energyCenters.map((_, i) => polar(i, r).map(n => n.toFixed(1)).join(',')).join(' ')
}

export function BalanceRadar({ values = aniccaMock.balance, className }: { values?: number[]; className?: string }) {
  const points = values.map((v, i) => polar(i, v * R))
  const fillId = useId()
  const { ref, inView } = useInView<SVGGElement>({ threshold: 0.6 })

  return (
    <svg viewBox="-52 8 404 290" className={cn('w-full', className)} aria-hidden>
      <defs>
        <radialGradient id={fillId} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#C4A8FF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7C5CBF" stopOpacity="0.28" />
        </radialGradient>
      </defs>

      {[0.25, 0.5, 0.75, 1].map(f => (
        <polygon key={f} points={ring(R * f)} fill="none" stroke="#C4A8FF" strokeOpacity={f === 1 ? 0.7 : 0.4} strokeWidth="1" />
      ))}
      {energyCenters.map((c, i) => {
        const [x, y] = polar(i, R)
        return <line key={c.id} x1={CX} y1={CY} x2={x} y2={y} stroke="#C4A8FF" strokeOpacity="0.4" strokeWidth="1" />
      })}

      {/* A CSS transition rather than framer-motion, which overrides SVG
          transform-origin — this way it grows from the chart's centre. */}
      <g
        ref={ref}
        className={cn(
          'transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] motion-reduce:scale-100',
          inView ? 'scale-100 opacity-100' : 'scale-[0.55] opacity-0',
        )}
        style={{ transformBox: 'view-box', transformOrigin: `${CX}px ${CY}px` }}
      >
        <polygon
          points={points.map(p => p.map(n => n.toFixed(1)).join(',')).join(' ')}
          fill={`url(#${fillId})`}
          stroke="#7C5CBF"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill={energyCenters[i].color} stroke="#fff" strokeWidth="2" />
        ))}
      </g>

      {energyCenters.map((c, i) => {
        const [x, y] = polar(i, R + 20)
        const anchor = Math.abs(x - CX) < 4 ? 'middle' : x > CX ? 'start' : 'end'
        return (
          <text
            key={c.id}
            x={x}
            y={y}
            dy="0.35em"
            textAnchor={anchor}
            fontSize="12.5"
            fontWeight="600"
            fill="#6B6B8A"
            style={{ fontFamily: 'var(--font-figtree), system-ui, sans-serif' }}
          >
            {c.name}
          </text>
        )
      })}
    </svg>
  )
}

// ─── Feature 1 — Map my feelings ───────────────────────────────────────
export function MapFeelingsCard() {
  const m = aniccaMock.map
  return (
    <Illustration
      label={`Map my feelings: the typed words “${m.typed}” are matched on the iPhone to the emotions ${m.matches.map(x => `${x.emotion} (${energyCenter(x.center).name})`).join(' and ')}.`}
      className="anicca-card w-full max-w-sm p-6"
    >
      <CardLabel>Map my feelings</CardLabel>
      <div className="mt-3 rounded-2xl border border-anicca-lavender/40 bg-anicca-bg/70 p-4 text-[15px] leading-6 text-anicca-ink">
        {m.typed}
        <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-anicca-violet" />
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-anicca-muted">
        <Smartphone size={14} strokeWidth={2} className="text-anicca-violet" />
        Matched on this iPhone
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {m.matches.map((x, i) => (
          <motion.span
            key={x.emotion}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.25, ease: EASE }}
          >
            <EmotionChip emotion={x.emotion} center={x.center} />
          </motion.span>
        ))}
      </div>
    </Illustration>
  )
}

// ─── Feature 2 — emotion library, intensity, note ──────────────────────
export function CheckInCard() {
  const m = aniccaMock.checkin
  return (
    <Illustration
      label={`A check-in: ${m.selected} chosen from the emotion library, intensity ${m.intensity} of 5, with the note “${m.note}”`}
      className="anicca-card w-full max-w-sm p-6"
    >
      <CardLabel>Emotions</CardLabel>
      <div className="mt-3 flex flex-wrap gap-2">
        {m.library.map(x => (
          <EmotionChip key={x.emotion} emotion={x.emotion} center={x.center} selected={x.emotion === m.selected} />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-anicca-lavender/40 pt-4">
        <CardLabel>Intensity</CardLabel>
        <span className="flex items-center gap-3">
          <IntensityDots value={m.intensity} size={14} />
          <span className="text-sm font-bold text-anicca-ink">{m.intensity}/5</span>
        </span>
      </div>
      <div className="mt-4 border-t border-anicca-lavender/40 pt-4">
        <CardLabel>Note</CardLabel>
        <p className="mt-2 text-[14px] italic text-anicca-ink/80">{m.note}</p>
      </div>
    </Illustration>
  )
}

// ─── Feature 3 — energy-center breakdown ───────────────────────────────
export function BreakdownCard() {
  const counts = aniccaMock.breakdown
  const max = Math.max(...counts)
  return (
    <Illustration
      label={`Energy-center breakdown: ${energyCenters.map((c, i) => `${c.name} ${counts[i]}`).join(', ')} check-ins.`}
      className="anicca-card w-full max-w-sm p-6"
    >
      <CardLabel>Energy-center breakdown</CardLabel>
      <ul className="mt-4 space-y-3">
        {energyCenters.map((c, i) => (
          <li key={c.id} className="flex items-center gap-3 text-[13px]">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
            <span className="w-[84px] shrink-0 font-semibold text-anicca-ink">{c.name}</span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-anicca-lavender/25">
              <motion.span
                className="block h-full rounded-full"
                style={{ width: `${(counts[i] / max) * 100}%`, background: c.color, originX: 0 }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: EASE }}
              />
            </span>
            <span className="w-6 shrink-0 text-right font-bold text-anicca-muted">{counts[i]}</span>
          </li>
        ))}
      </ul>
    </Illustration>
  )
}

// ─── Feature 4 — mood timeline + recent check-ins ──────────────────────
function smoothPath(pts: (readonly [number, number])[]) {
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C ${c1.map(n => n.toFixed(1)).join(' ')} ${c2.map(n => n.toFixed(1)).join(' ')} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

export function TimelineCard() {
  const m = aniccaMock.timeline
  const W = 300
  const H = 110
  const pts = m.points.map((v, i) => [12 + (i * (W - 24)) / (m.points.length - 1), H - 12 - v * (H - 28)] as const)
  const line = smoothPath(pts)
  const areaId = useId()

  return (
    <Illustration
      label={`Mood timeline for a week, dipping midweek and rising toward the weekend, above three recent check-ins: ${m.recent.map(r => `${r.emotion} (${energyCenter(r.center).name}) ${r.when.toLowerCase()}`).join('; ')}.`}
      className="anicca-card w-full max-w-sm p-6"
    >
      <CardLabel>Mood timeline</CardLabel>
      <svg viewBox={`0 0 ${W} ${H + 18}`} className="mt-3 w-full" aria-hidden>
        <defs>
          <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C4A8FF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C4A8FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L ${pts[pts.length - 1][0].toFixed(1)} ${H} L ${pts[0][0].toFixed(1)} ${H} Z`} fill={`url(#${areaId})`} />
        <motion.path
          d={line}
          fill="none"
          stroke="#7C5CBF"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke="#7C5CBF" strokeWidth="2" />
        ))}
        {m.days.map((d, i) => (
          <text
            key={i}
            x={pts[i][0]}
            y={H + 14}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="#6B6B8A"
            style={{ fontFamily: 'var(--font-figtree), system-ui, sans-serif' }}
          >
            {d}
          </text>
        ))}
      </svg>

      <div className="mt-4 border-t border-anicca-lavender/40 pt-4">
        <CardLabel>Recent check-ins</CardLabel>
        <ul className="mt-2 divide-y divide-anicca-lavender/30">
          {m.recent.map(r => {
            const c = energyCenter(r.center)
            return (
              <li key={r.emotion} className="flex items-center gap-3 py-2.5 text-[13.5px]">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                <span className="font-bold text-anicca-ink">{r.emotion}</span>
                <span className="text-anicca-muted">{c.name}</span>
                <span className="ml-auto flex items-center gap-3">
                  <IntensityDots value={r.intensity} size={6} />
                  <span className="w-[68px] text-right text-xs text-anicca-muted">{r.when}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </Illustration>
  )
}

// ─── Feature 5 — weekly reflection (Pro) ───────────────────────────────
export function ReflectionCard() {
  const m = aniccaMock.reflection
  return (
    <Illustration
      label={`A weekly reflection: “${m.body}” with a practice to try: “${m.practice}”`}
      className="anicca-card w-full max-w-sm p-6"
    >
      <div className="flex items-center justify-between">
        <CardLabel>Weekly reflection</CardLabel>
        <ProPill />
      </div>
      <p className="mt-3 font-anicca-display text-2xl text-anicca-ink">{m.heading}</p>
      <p className="mt-2 text-[14px] leading-6 text-anicca-ink/80">{m.body}</p>
      <div className="mt-4 rounded-2xl border border-anicca-lavender/40 bg-anicca-bg/70 p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-anicca-violet-deep">{m.practiceLabel}</p>
        <p className="mt-1.5 text-[14px] leading-6 text-anicca-ink">{m.practice}</p>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-anicca-muted">
        <Smartphone size={14} strokeWidth={2} className="text-anicca-violet" />
        Made on your iPhone, from your check-ins
      </p>
    </Illustration>
  )
}

// ─── Feature 6 — reminders & export ────────────────────────────────────
export function KeepCard() {
  const m = aniccaMock.reminder
  return (
    <Illustration
      label={`A daily reminder set for ${m.time}, and export options: JSON on the free plan, PDF with Pro.`}
      className="w-full max-w-sm space-y-4"
    >
      <div className="anicca-card flex items-center gap-4 p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-anicca-lavender/25 text-anicca-violet">
          <Bell size={20} strokeWidth={1.75} />
        </span>
        <span className="flex-1">
          <span className="block text-[15px] font-bold text-anicca-ink">{m.label}</span>
          <span className="block text-[13px] text-anicca-muted">{m.time}</span>
        </span>
        {/* An "on" switch */}
        <span className="relative h-[30px] w-[50px] rounded-full bg-anicca-violet">
          <span className="absolute right-[3px] top-[3px] h-6 w-6 rounded-full bg-white shadow-sm" />
        </span>
      </div>

      <div className="anicca-card p-5">
        <CardLabel>Export</CardLabel>
        <div className="mt-3 space-y-2.5">
          {[
            { icon: FileBraces, name: 'JSON', note: 'Every check-in, as data', tag: <span className="rounded-full border border-anicca-lavender px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-anicca-violet-deep">Free</span> },
            { icon: FileText, name: 'PDF', note: 'A readable journal', tag: <ProPill /> },
          ].map(row => (
            <div key={row.name} className="flex items-center gap-3 rounded-2xl border border-anicca-lavender/40 bg-anicca-bg/60 px-4 py-3">
              <row.icon size={18} strokeWidth={1.75} className="text-anicca-violet" />
              <span className="flex-1">
                <span className="block text-sm font-bold text-anicca-ink">{row.name}</span>
                <span className="block text-xs text-anicca-muted">{row.note}</span>
              </span>
              {row.tag}
            </div>
          ))}
        </div>
      </div>
    </Illustration>
  )
}
