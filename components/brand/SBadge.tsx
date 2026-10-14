import Image from 'next/image'
import { cn } from '@/lib/utils'
import badge from '@/public/brand/s-badge.png'

/**
 * The S badge — the brand's logo mark (navbar, footer, favicon, share images).
 * Decorative: pair it with the visible "Screen Sage" wordmark.
 */
export default function SBadge({ size, eager, className }: { size: number; eager?: boolean; className?: string }) {
  return (
    <Image
      src={badge}
      alt=""
      width={size}
      height={size}
      loading={eager ? 'eager' : undefined}
      className={cn('shrink-0', className)}
    />
  )
}

/** Badge + wordmark, as in the navbar and footer. */
export function Wordmark({ size = 40, eager, className }: { size?: number; eager?: boolean; className?: string }) {
  return (
    <span className={cn('flex items-center gap-3 font-display font-semibold leading-none text-plum-900', className)}>
      <SBadge size={size} eager={eager} />
      Screen Sage
    </span>
  )
}
