import { CardBack } from '@/components/arcana/TarotCard'
import { cn } from '@/lib/utils'
import { arcanaMock } from '@/lib/arcana-content'

// Wireframe 2f — export template picker
export default function ExportScreen() {
  const m = arcanaMock.export

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-[20px] text-arcana-muted">‹</span>
        <div className="font-arcana-display text-[25px] font-medium">Export</div>
      </div>

      {/* Canvas previews: Post 1:1 · Story 9:16 (active) · Journal PDF */}
      <div className="flex items-end justify-center gap-3">
        <div className="text-center">
          <div
            className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-[10px] border border-arcana-field p-2"
            style={{ background: 'linear-gradient(180deg, #12101C, #171327)' }}
          >
            <div className="flex gap-[3px]">
              <CardBack width={14} height={23} glyphSize={8} className="border" />
              <CardBack width={14} height={23} glyphSize={8} className="border" />
              <CardBack width={14} height={23} glyphSize={8} className="border" />
            </div>
            <div className="font-arcana-display text-[7px] text-arcana-text">Career check-in</div>
          </div>
          <div className="mt-[7px] text-[11.5px] font-bold text-arcana-muted">{m.formats[0]}</div>
        </div>

        <div className="text-center">
          <div
            className="flex h-[210px] w-[118px] flex-col items-center justify-center gap-[7px] rounded-xl border-2 border-arcana-gold p-2.5 shadow-[0_0_22px_rgba(246,206,85,0.25)]"
            style={{ background: 'linear-gradient(180deg, #12101C, #1A1530)' }}
          >
            <div className="font-arcana-display text-[9px] tracking-[0.1em] text-arcana-gold">✦ JUL 6 ✦</div>
            <div className="flex gap-1">
              <CardBack width={20} height={33} glyphSize={10} className="border" />
              <CardBack width={20} height={33} glyphSize={10} className="border" />
              <CardBack width={20} height={33} glyphSize={10} className="border" />
            </div>
            <div className="font-arcana-display text-[9.5px] text-arcana-text">Career check-in</div>
            <div className="h-[3px] w-[60%] rounded-[2px] bg-[#252537]" />
            <div className="h-[3px] w-[45%] rounded-[2px] bg-[#252537]" />
          </div>
          <div className="mt-[7px] text-[11.5px] font-bold text-arcana-gold">{m.formats[1]} ✓</div>
        </div>

        <div className="text-center">
          <div className="flex h-[130px] w-24 flex-col gap-1 rounded-md border border-[#D8CCB4] bg-[#F5EFE2] p-[9px]">
            <div className="font-arcana-display text-[7.5px] text-[#2E2438]">Career check-in</div>
            <div className="h-[2.5px] w-[70%] bg-[#D8CCB4]" />
            <div className="mt-0.5 flex gap-[3px]">
              <div className="h-[21px] w-[13px] rounded-[2px] border border-[#8A5A3B]" />
              <div className="h-[21px] w-[13px] rounded-[2px] border border-[#8A5A3B]" />
              <div className="h-[21px] w-[13px] rounded-[2px] border border-[#8A5A3B]" />
            </div>
            <div className="h-[2.5px] w-full bg-[#E5DCC8]" />
            <div className="h-[2.5px] w-[85%] bg-[#E5DCC8]" />
            <div className="h-[2.5px] w-[90%] bg-[#E5DCC8]" />
          </div>
          <div className="mt-[7px] text-[11.5px] font-bold text-arcana-muted">{m.formats[2]}</div>
        </div>
      </div>

      {/* Toggles */}
      <div className="arcana-glass-flat py-0.5">
        {m.toggles.map((label, i) => (
          <div
            key={label}
            className={cn(
              'flex items-center justify-between px-4 py-[13px] text-[14px] font-semibold',
              i < m.toggles.length - 1 && 'border-b border-arcana-stroke/40',
            )}
          >
            {label}
            <span
              className="relative h-[26px] w-11 rounded-full"
              style={{ background: 'linear-gradient(135deg, #B385E0, #9367CF)' }}
            >
              <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white" />
            </span>
          </div>
        ))}
      </div>

      <div className="arcana-btn-gold arcana-shimmer mt-1 p-[15px] text-center text-[15px] font-extrabold">
        {m.cta}
      </div>
    </div>
  )
}
