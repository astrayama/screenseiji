import Image from 'next/image'
import { cn } from '@/lib/utils'
import clouds from '@/public/brand/clouds.jpg'

// The brand's motifs, most used first: sky (every page), clouds (hero and
// footer only), flower of life (behind the hero, faint), sparkles (a few per
// screen), hearts (hero only, 3 to 5). All decorative, so all aria-hidden.

/**
 * The flower of life: nineteen circles on a hexagonal grid, clipped to the
 * circle that holds them, inside two outer rings.
 */
export function FlowerOfLife({ className, id = 'flower-of-life' }: { className?: string; id?: string }) {
  const r = 50
  const centres: [number, number][] = [[0, 0]]
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i
    centres.push([r * Math.cos(a), r * Math.sin(a)])
    centres.push([2 * r * Math.cos(a), 2 * r * Math.sin(a)])
    const b = a + Math.PI / 6
    centres.push([Math.sqrt(3) * r * Math.cos(b), Math.sqrt(3) * r * Math.sin(b)])
  }

  return (
    <svg aria-hidden viewBox="-170 -170 340 340" fill="none" stroke="currentColor" className={className}>
      <defs>
        <clipPath id={`${id}-clip`}>
          <circle r={3 * r} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`} strokeWidth="1">
        {centres.map(([x, y], i) => (
          <circle key={i} cx={x.toFixed(2)} cy={y.toFixed(2)} r={r} />
        ))}
      </g>
      <circle r={3 * r} strokeWidth="1.2" />
      <circle r={3 * r + 12} strokeWidth="0.8" strokeOpacity="0.7" />
    </svg>
  )
}

/** A four-pointed sparkle. Colour it with text-*; size it with className. */
export function Sparkle({ className, style, twinkle }: { className?: string; style?: React.CSSProperties; twinkle?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('pointer-events-none absolute drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]', twinkle && 'animate-star-twinkle', className)}
      style={style}
    >
      <path d="M12 0C12.7 6.6 17.4 11.3 24 12 17.4 12.7 12.7 17.4 12 24 11.3 17.4 6.6 12.7 0 12 6.6 11.3 11.3 6.6 12 0Z" />
    </svg>
  )
}

/** A glossy pink heart with a white rim, as on the channel banner. Hero only. */
export function Heart({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 30"
      className={cn('pointer-events-none absolute animate-float drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]', className)}
      style={style}
    >
      <path
        d="M16 28.5C9.5 23.6 2 18.2 2 10.6 2 6 5.5 2.5 9.8 2.5c2.6 0 4.8 1.3 6.2 3.4 1.4-2.1 3.6-3.4 6.2-3.4C26.5 2.5 30 6 30 10.6c0 7.6-7.5 13-14 17.9Z"
        fill="#F9CDDD"
        stroke="#FFFBFD"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M8.2 7.4c1.4-1 3.2-.9 4.3.3" stroke="#FFFBFD" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.9" />
    </svg>
  )
}

/**
 * The cloud bank from the channel banner, across the bottom of its parent
 * (which must be `relative`). Its top fades out so it melts into any sky above.
 */
export function CloudBand({ className, eager }: { className?: string; eager?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-x-0 bottom-0 select-none', className)}
      style={{ maskImage: 'linear-gradient(to bottom, transparent, black 38%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 38%)' }}
    >
      <Image
        src={clouds}
        alt=""
        fill
        sizes="100vw"
        preload={eager}
        className="object-cover object-bottom"
      />
    </div>
  )
}
