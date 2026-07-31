'use client'

import { useMotionPreference } from '@/hooks/useMotionPreference'
import { CardBack } from '@/components/arcana/TarotCard'
import { arcanaMock } from '@/lib/arcana-content'

// The riffled deck fan — wireframe 2c
const FAN = [
  { left: 12, top: 40, rotate: -22 },
  { left: 70, top: 14, rotate: -11 },
  { left: 126, top: 4, rotate: 0 },
  { left: 182, top: 14, rotate: 11 },
  { left: 238, top: 40, rotate: 22 },
]

export default function DrawScreen() {
  const { reduced } = useMotionPreference()
  const m = arcanaMock.draw

  return (
    <div className="flex flex-1 flex-col items-center pt-6">
      <div className="whitespace-pre-line text-center font-arcana-display text-[25px] font-medium leading-[1.2]">
        {m.title}
      </div>

      <div className="relative mt-6 h-[220px] w-[342px]">
        {FAN.map((c, i) => (
          <CardBack
            key={i}
            width={94}
            height={156}
            className="absolute"
            style={{ left: c.left, top: c.top, transform: `rotate(${c.rotate}deg)` }}
          />
        ))}
      </div>

      <div className="text-center text-[13px] text-arcana-muted">the deck drifts as you tilt the phone</div>

      {/* HOLD ring with a slow-sweeping conic highlight */}
      <div className="relative mt-6 h-[82px] w-[82px]">
        {!reduced && (
          <div
            className="absolute -inset-1 rounded-full animate-arcana-ring"
            style={{
              background: 'conic-gradient(rgba(246,206,85,0.6), transparent 38%, transparent)',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3.5px), black calc(100% - 2.5px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 3.5px), black calc(100% - 2.5px))',
            }}
          />
        )}
        <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-arcana-gold/60 text-[13px] font-extrabold text-arcana-gold shadow-[0_0_26px_rgba(246,206,85,0.2)]">
          HOLD
        </div>
      </div>

      <div className="mt-3 text-[11px] tracking-[0.14em] text-arcana-faint">{m.counter}</div>
    </div>
  )
}
