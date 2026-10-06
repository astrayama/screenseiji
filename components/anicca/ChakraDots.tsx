import { cn } from '@/lib/utils'
import { energyCenters } from '@/lib/anicca-content'

interface ChakraDotsProps {
  /** Dot diameter in px. */
  size?: number
  /** Gap between dots in px. */
  gap?: number
  vertical?: boolean
  /** Gently pulse the dots in sequence, Root → Crown. */
  breathe?: boolean
  className?: string
}

// The seven energy-center colours as a row of dots — Anicca's signature
// accent, always decorative.
export default function ChakraDots({ size = 6, gap = 4, vertical, breathe, className }: ChakraDotsProps) {
  return (
    <span
      aria-hidden
      className={cn('inline-flex shrink-0 items-center', vertical ? 'flex-col-reverse' : 'flex-row', className)}
      style={{ gap }}
    >
      {energyCenters.map((c, i) => (
        <span
          key={c.id}
          className={cn('block rounded-full', breathe && 'animate-anicca-breathe')}
          style={{
            width: size,
            height: size,
            background: c.color,
            animationDelay: breathe ? `${i * 0.35}s` : undefined,
          }}
        />
      ))}
    </span>
  )
}
