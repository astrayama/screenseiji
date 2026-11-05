import { useId } from 'react'
import { cn } from '@/lib/utils'
import { FURY, RESOLVE } from '@/lib/lumenwright-content'

/** useId's characters aren't all valid in url(#…), so keep word characters only. */
function useSvgId() {
  return useId().replace(/[^\w-]/g, '')
}

/**
 * Lumen, the ring: a band of hard light, gold for Resolve with a magenta
 * glint for Fury. Drawn here; the game has no logo file yet.
 */
export function LumenMark({ size = 32, className }: { size?: number; className?: string }) {
  const id = useSvgId()

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden className={cn('shrink-0 overflow-visible', className)}>
      <defs>
        <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0.55" stopColor={RESOLVE} stopOpacity="0.32" />
          <stop offset="1" stopColor={RESOLVE} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF1C9" />
          <stop offset="0.6" stopColor={RESOLVE} />
          <stop offset="1" stopColor="#D9B45E" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill={`url(#${id}-halo)`} />
      <circle cx="32" cy="32" r="17" fill="none" stroke={`url(#${id}-band)`} strokeWidth="5" />
      <circle cx="32" cy="32" r="11.5" fill="none" stroke={RESOLVE} strokeOpacity="0.35" strokeWidth="1" />
      {/* The glint where the band catches the light */}
      <path d="M45 19.5 l1.6 -4.4 1.6 4.4 4.4 1.6 -4.4 1.6 -1.6 4.4 -1.6 -4.4 -4.4 -1.6 z" fill={FURY} />
    </svg>
  )
}
