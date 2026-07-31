'use client'

import { useSyncExternalStore } from 'react'
import { useMotionPreference } from '@/hooks/useMotionPreference'

// Deterministic positions (avoids SSR/client hydration mismatch)
const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  top:   `${(i * 37 + 13) % 100}%`,
  left:  `${(i * 61 + 7) % 100}%`,
  size:  i % 4 === 0 ? '2px' : i % 3 === 0 ? '1.5px' : '1px',
  dur:   `${3.5 + (i % 5) * 0.7}s`,
  delay: `${(i * 0.31) % 4}s`,
}))

const ORBS = [
  { id: 0, size: 460, top: '4%',  left: '6%',  color: 'rgba(88,58,138,0.20)', dur: '24s', delay: '0s' },
  { id: 1, size: 380, top: '58%', left: '64%', color: 'rgba(30,74,102,0.16)', dur: '28s', delay: '4s' },
]

const emptySubscribe = () => () => {}

export default function ArcanaBackground() {
  const { reduced } = useMotionPreference()
  // Hydration guard: false during SSR, true on the client after mount
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Cosmos base — the app's CosmosBackground */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 12%, rgba(88,58,138,0.38) 0%, transparent 52%),' +
            'radial-gradient(ellipse at 82% 88%, rgba(30,74,102,0.32) 0%, transparent 52%),' +
            'linear-gradient(180deg, #0D0B13 0%, #131020 100%)',
        }}
      />

      {mounted && !reduced && ORBS.map(orb => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-3xl animate-orb-drift"
          style={{
            width:  orb.size,
            height: orb.size,
            top:    orb.top,
            left:   orb.left,
            background: orb.color,
            animationDuration: orb.dur,
            animationDelay:    orb.delay,
          }}
        />
      ))}

      {mounted && !reduced && STARS.map(s => (
        <span
          key={s.id}
          className="absolute rounded-full bg-arcana-star animate-arcana-twinkle"
          style={{
            width:  s.size,
            height: s.size,
            top:    s.top,
            left:   s.left,
            animationDuration: s.dur,
            animationDelay:    s.delay,
          }}
        />
      ))}
    </div>
  )
}
