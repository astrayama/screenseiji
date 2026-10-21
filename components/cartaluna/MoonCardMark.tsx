import { useId } from 'react'
import { cn } from '@/lib/utils'

// Carta Luna's logo: a crescent moon over a gold-edged card
// (arcana-mr/brand/carta-luna-mark.svg). The mark appears more than once on the
// page, so every gradient, mask and clip gets its own id.

/** useId's characters aren't all valid in url(#…), so keep word characters only. */
function useSvgId() {
  return useId().replace(/[^\w-]/g, '')
}

/** The static mark, square. */
export function MoonCardMark({ size = 32, className }: { size?: number; className?: string }) {
  const id = useSvgId()

  return (
    <svg
      viewBox="21 15.8 126.2 126.2"
      width={size}
      height={size}
      aria-hidden
      className={cn('shrink-0', className)}
    >
      <defs>
        <radialGradient id={`${id}-moon`} cx="38%" cy="38%" r="70%">
          <stop offset="0" stopColor="#fff4cf" />
          <stop offset="1" stopColor="#d4af37" />
        </radialGradient>
        <mask id={`${id}-cut`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect width="100" height="100" fill="#fff" />
          <circle cx="64" cy="38" r="36" fill="#000" />
        </mask>
        <pattern id={`${id}-hatch`} patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(-45)">
          <rect width="1.5" height="7" fill="#d4af37" fillOpacity="0.133" />
        </pattern>
        <clipPath id={`${id}-inside`}>
          <rect x="35.5" y="35.5" width="57" height="99" rx="5.5" />
        </clipPath>
      </defs>
      <g transform="translate(74 12) scale(0.7)">
        <circle cx="48" cy="52" r="38" fill={`url(#${id}-moon)`} mask={`url(#${id}-cut)`} />
      </g>
      <rect x="34" y="34" width="60" height="102" rx="7" fill="#15100c" />
      <g clipPath={`url(#${id}-inside)`}>
        <rect x="34" y="34" width="60" height="102" fill={`url(#${id}-hatch)`} />
      </g>
      <circle cx="64" cy="85" r="13.5" fill="#d4af37" fillOpacity="0.2" />
      <rect x="39.5" y="39.5" width="49" height="91" rx="1.5" fill="none" stroke="#d4af37" strokeOpacity="0.333" strokeWidth="1" />
      <rect x="34.75" y="34.75" width="58.5" height="100.5" rx="6.25" fill="none" stroke="#d4af37" strokeWidth="1.5" />
    </svg>
  )
}

/**
 * The logo animation from the app's loading screen: the halo breathes, the
 * card floats and turns over on a 6.5 s loop. `unit` scales the 170 × 150
 * stage. With reduced motion it holds still, card face up.
 */
export function MoonCardLoop({ unit = 1, className }: { unit?: number; className?: string }) {
  const id = useSvgId()

  return (
    <div
      aria-hidden
      className={cn('cartaluna-logo', className)}
      style={{ '--u': `${unit}px` } as React.CSSProperties}
    >
      <div className="cartaluna-logo-halo" />
      <svg className="cartaluna-logo-moon" viewBox="0 0 100 100">
        <defs>
          <radialGradient id={`${id}-moon`} cx="38%" cy="38%" r="70%">
            <stop offset="0" stopColor="#fff4cf" />
            <stop offset="1" stopColor="#d4af37" />
          </radialGradient>
          <mask id={`${id}-cut`}>
            <rect width="100" height="100" fill="#fff" />
            <circle cx="64" cy="38" r="36" fill="#000" />
          </mask>
        </defs>
        <circle cx="48" cy="52" r="38" fill={`url(#${id}-moon)`} mask={`url(#${id}-cut)`} />
      </svg>
      <div className="cartaluna-logo-turn">
        <div className="cartaluna-logo-card">
          <div className="cartaluna-logo-face cartaluna-logo-back" />
          <div className="cartaluna-logo-face cartaluna-logo-front">
            <svg viewBox="0 0 100 100">
              <mask id={`${id}-emblem`}>
                <rect width="100" height="100" fill="#fff" />
                <circle cx="62" cy="40" r="32" fill="#000" />
              </mask>
              <circle cx="48" cy="52" r="34" fill="#b8902c" mask={`url(#${id}-emblem)`} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
