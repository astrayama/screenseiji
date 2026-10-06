'use client'

import { useSyncExternalStore } from 'react'
import { useMotionPreference } from '@/hooks/useMotionPreference'

// Slow-drifting colour blooms layered over the static mesh
const BLOOMS = [
  { id: 0, size: 520, top: '-8%', left: '-10%', color: 'rgba(196,168,255,0.30)', dur: '26s', delay: '0s' },
  { id: 1, size: 420, top: '46%', left: '68%', color: 'rgba(167,139,218,0.20)', dur: '30s', delay: '5s' },
  { id: 2, size: 360, top: '72%', left: '-6%', color: 'rgba(255,214,232,0.35)', dur: '34s', delay: '9s' },
]

const emptySubscribe = () => () => {}

// The app draws a soft mesh gradient behind every screen — this is the web
// version: a fixed lavender wash, with a little drift when motion is allowed.
export default function AniccaBackground() {
  const { reduced } = useMotionPreference()
  // Hydration guard: false during SSR, true on the client after mount
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 10% 6%, rgba(196,168,255,0.30) 0%, transparent 70%),' +
            'radial-gradient(45% 40% at 92% 14%, rgba(255,214,232,0.40) 0%, transparent 70%),' +
            'radial-gradient(50% 45% at 86% 88%, rgba(167,139,218,0.20) 0%, transparent 70%),' +
            'radial-gradient(45% 40% at 8% 92%, rgba(208,226,255,0.45) 0%, transparent 70%),' +
            '#F5F0FA',
        }}
      />

      {mounted && !reduced && BLOOMS.map(b => (
        <div
          key={b.id}
          className="absolute rounded-full blur-3xl animate-orb-drift"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: b.color,
            animationDuration: b.dur,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  )
}
