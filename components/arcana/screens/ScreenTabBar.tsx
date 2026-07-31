import { cn } from '@/lib/utils'

function Tab({ icon, label, on }: { icon: string; label: string; on?: boolean }) {
  return (
    <div
      className={cn(
        'flex w-[84px] flex-col items-center gap-0.5 text-[10px] font-bold',
        on ? 'text-arcana-purple' : 'text-arcana-faint',
      )}
    >
      <span className="text-[21px] leading-none">{icon}</span>
      {label}
    </div>
  )
}

// The app's floating frosted tab bar — wireframe .htab (no backdrop-blur
// inside the scaled frame, so the fill is more opaque instead)
export default function ScreenTabBar({ active }: { active: 'today' | 'journal' }) {
  return (
    <div className="absolute inset-x-3.5 bottom-[26px] z-[6] flex h-16 items-center justify-around rounded-[32px] border border-arcana-stroke/50 bg-[rgba(16,14,26,0.88)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <Tab icon="☾" label="Today" on={active === 'today'} />
      <div
        className="-mt-[34px] flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white/30 text-[30px] font-normal text-[#120C1E] shadow-[0_0_26px_rgba(179,133,224,0.45),0_10px_22px_rgba(0,0,0,0.45)]"
        style={{ background: 'linear-gradient(135deg, #C29BEA, #8A5FC9)' }}
      >
        +
      </div>
      <Tab icon="▦" label="Journal" on={active === 'journal'} />
    </div>
  )
}
