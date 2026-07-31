import { cn } from '@/lib/utils'
import ScreenTabBar from '@/components/arcana/screens/ScreenTabBar'

// In-phone starfield — wireframe .sf
const STARFIELD: React.CSSProperties = {
  backgroundImage:
    'radial-gradient(1px 1px at 20px 30px, #FFF2CC 1px, transparent 0),' +
    'radial-gradient(1px 1px at 90px 140px, #FFF2CC 1px, transparent 0),' +
    'radial-gradient(1.5px 1.5px at 160px 60px, rgba(255,242,204,0.8) 1px, transparent 0),' +
    'radial-gradient(1px 1px at 240px 190px, #FFF2CC 1px, transparent 0),' +
    'radial-gradient(1px 1px at 310px 90px, rgba(255,242,204,0.7) 1px, transparent 0),' +
    'radial-gradient(1.5px 1.5px at 60px 230px, rgba(255,242,204,0.6) 1px, transparent 0)',
  backgroundSize: '360px 260px',
}

interface PhoneFrameProps {
  children: React.ReactNode
  /** Set the scale via a `[--phone-scale:.6]`-style class on the caller. */
  className?: string
  /** Show only the top ~620px with a fade-out — for feature sections. */
  crop?: boolean
  /** Render the floating tab bar (full frames only). */
  tab?: 'today' | 'journal'
  /** Screen-reader description of what the mockup shows. */
  label: string
}

// A 390×844 recreation of the app, scaled with a CSS variable so screens can
// be authored at the wireframe's exact pixel sizes. The illustration itself is
// aria-hidden; `label` carries the accessible description.
export default function PhoneFrame({ children, className, crop, tab, label }: PhoneFrameProps) {
  const visibleH = crop ? 620 : 844
  // In crop mode the wrapper is overflow-hidden, which would clip the bezel
  // (drawn as box-shadow rings) — pad it so the rings stay visible.
  const pad = crop ? 14 : 0

  return (
    <div
      className={cn('relative', className)}
      style={{
        width: `calc(${390 + pad * 2}px * var(--phone-scale, 0.7))`,
        height: `calc(${visibleH + pad}px * var(--phone-scale, 0.7))`,
      }}
    >
      <span className="sr-only">{label}</span>
      <div
        aria-hidden
        className={cn(
          'absolute left-0 top-0 origin-top-left',
          crop && 'overflow-hidden [mask-image:linear-gradient(to_bottom,black_72%,transparent_98%)]',
        )}
        style={{
          transform: 'scale(var(--phone-scale, 0.7))',
          width: 390 + pad * 2,
          height: visibleH + pad,
          paddingLeft: pad,
          paddingTop: pad,
        }}
      >
        <div
          className="relative flex h-[844px] w-[390px] flex-col overflow-hidden rounded-[54px] text-arcana-text"
          style={{
            fontFamily: 'var(--font-nunito), system-ui, sans-serif',
            boxShadow: '0 0 0 11px #17151D, 0 0 0 13px #35323E, 0 26px 50px rgba(0,0,0,0.4)',
            background:
              'radial-gradient(ellipse at 20% 12%, rgba(88,58,138,0.38) 0%, transparent 52%),' +
              'radial-gradient(ellipse at 82% 88%, rgba(30,74,102,0.32) 0%, transparent 52%),' +
              'linear-gradient(180deg, #0D0B13 0%, #131020 100%)',
          }}
        >
          <div className="pointer-events-none absolute inset-0 z-0 opacity-35" style={STARFIELD} />

          {/* Status bar */}
          <div className="relative z-[4] flex flex-none items-center justify-between px-[30px] pb-1 pt-4 text-[15px] font-semibold">
            <span>9:41</span>
            <div className="absolute left-1/2 top-[13px] h-[34px] w-[118px] -translate-x-1/2 rounded-[20px] bg-black" />
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] tracking-[2px]">•••</span>
              <span className="relative h-[11px] w-6 rounded-[3px] border border-white/50">
                <span className="absolute bottom-[1.5px] left-[1.5px] top-[1.5px] w-[13px] rounded-[1.5px] bg-arcana-text" />
              </span>
            </div>
          </div>

          {/* Screen body — wireframe .hbody */}
          <div className="relative z-[2] flex flex-1 flex-col gap-3.5 overflow-hidden px-6 pb-[120px] pt-3.5">
            {children}
          </div>

          {tab && <ScreenTabBar active={tab} />}

          {/* Home indicator */}
          <div className="absolute bottom-[9px] left-1/2 z-[7] h-[5px] w-[134px] -translate-x-1/2 rounded-[3px] bg-white/30" />
        </div>
      </div>
    </div>
  )
}
