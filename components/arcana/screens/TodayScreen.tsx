'use client'

import { useMotionPreference } from '@/hooks/useMotionPreference'
import TarotCard from '@/components/arcana/TarotCard'
import { arcanaMock } from '@/lib/arcana-content'

// Wireframe 2a — the Today home tab
export default function TodayScreen() {
  const { reduced } = useMotionPreference()
  const m = arcanaMock.today

  return (
    <>
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="font-arcana-display text-[36px] font-medium leading-[1.05]">Today</div>
          <div className="mt-0.5 text-[14px] text-arcana-muted">{m.date}</div>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-extrabold text-[#120C1E]"
          style={{ background: 'linear-gradient(135deg, #B385E0, #66AACC)' }}
        >
          A
        </div>
      </div>

      {/* Daily card panel */}
      <div className="arcana-glass-flat flex items-center gap-4 p-[18px]" style={{ borderColor: 'rgba(246,206,85,0.35)' }}>
        <TarotCard
          card="moon"
          width={106}
          height={178}
          style={reduced ? undefined : { animation: 'arcana-float 6s ease-in-out infinite, arcana-glow 6s ease-in-out infinite' }}
        />
        <div className="min-w-0 flex-1">
          <div className="arcana-eyebrow text-[10.5px]">Today&apos;s card</div>
          <div className="mt-1 font-arcana-display text-[27px] font-medium">{m.card}</div>
          <div className="mt-0.5 text-[13px] text-arcana-muted">{m.meta}</div>
          <div className="mt-2.5 text-[13px] italic leading-[1.45] text-arcana-muted">{m.note}</div>
          <div className="mt-3 flex items-center gap-1.5 border-t border-arcana-stroke/50 pt-2.5 text-[13px] font-bold text-arcana-purple-soft">
            <span className="animate-arcana-spark text-arcana-star">✦</span> AI insight
            <span className="ml-auto text-arcana-faint">⌄</span>
          </div>
        </div>
      </div>

      {/* Spreads row */}
      <div className="arcana-glass-flat flex items-center gap-3.5 px-[18px] py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-arcana-blue/35 bg-arcana-blue/15 text-[19px] text-arcana-blue">
          ▤
        </div>
        <div className="flex-1">
          <div className="text-[16px] font-bold">Tarot Spreads</div>
          <div className="mt-px text-[12.5px] text-arcana-muted">Start a reading — 3-card, Celtic Cross, custom</div>
        </div>
        <div className="text-[18px] text-arcana-muted">›</div>
      </div>

      {/* Streak row */}
      <div className="arcana-glass-flat flex items-center gap-3 px-[18px] py-3.5">
        <span className="text-[16px] text-arcana-gold">✦</span>
        <div className="flex-1 text-[13.5px] font-semibold text-arcana-muted">{m.streak}</div>
        <div className="text-[18px] text-arcana-muted">›</div>
      </div>
    </>
  )
}
