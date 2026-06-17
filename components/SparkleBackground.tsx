'use client'

import { useEffect, useState } from 'react'
import { useMotionPreference } from '@/hooks/useMotionPreference'

// Deterministic pseudo-random (avoids SSR/client hydration mismatch)
const ORBS = [
  { id: 0, size: 420, top: '2%',  left: '8%',  color: 'rgba(201,148,60,0.13)',  dur: '22s', delay: '0s'  },
  { id: 1, size: 320, top: '55%', left: '2%',  color: 'rgba(36,191,178,0.10)',  dur: '18s', delay: '3s'  },
  { id: 2, size: 240, top: '8%',  left: '68%', color: 'rgba(232,150,10,0.08)',  dur: '26s', delay: '1s'  },
  { id: 3, size: 360, top: '62%', left: '62%', color: 'rgba(36,191,178,0.08)',  dur: '21s', delay: '5s'  },
  { id: 4, size: 480, top: '28%', left: '38%', color: 'rgba(26,22,64,0.22)',    dur: '30s', delay: '2s'  },
]

const STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  top:      `${(i * 37 + 13) % 100}%`,
  left:     `${(i * 61 + 7)  % 100}%`,
  size:     i % 3 === 0 ? '2px' : '1px',
  dur:      `${4 + (i % 5)}s`,
  delay:    `${(i * 0.35) % 4}s`,
}))

export default function SparkleBackground() {
  const { reduced } = useMotionPreference()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 0%, rgba(201,148,60,0.07) 0%, transparent 55%),' +
            'radial-gradient(ellipse at 80% 90%, rgba(36,191,178,0.06) 0%, transparent 50%),' +
            'linear-gradient(180deg, #07090F 0%, #080C18 50%, #050709 100%)',
        }}
      />

      {/* Orbs */}
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

      {/* Stars */}
      {mounted && !reduced && STARS.map(s => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white/60 animate-star-twinkle"
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
