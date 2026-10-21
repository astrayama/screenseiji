import Image from 'next/image'
import { CARD_ART, CARD_LABELS } from '@/components/arcana/TarotCard'
import type { CartalunaCard } from '@/lib/cartaluna-content'
import { cn } from '@/lib/utils'

// Carta Luna's deck is the same public-domain 1909 Rider–Waite–Smith art as
// Arcana's, so the scans are shared; the frame here is Carta Luna's gold edge.

export function RwsCard({
  card,
  width,
  height,
  className,
  alt,
}: {
  card: CartalunaCard
  width: number
  height: number
  className?: string
  alt?: string
}) {
  return (
    <Image
      src={CARD_ART[card]}
      alt={alt ?? CARD_LABELS[card]}
      width={width}
      height={height}
      className={cn(
        'rounded-[8px] border-[1.5px] border-cartaluna-gold object-cover shadow-[0_8px_22px_rgba(0,0,0,0.5)]',
        className,
      )}
    />
  )
}

/** The app's own card back: the hatched dark card from the logo. */
export function CardBack({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden
      className={cn('cartaluna-card-back rounded-[8px] shadow-[0_8px_22px_rgba(0,0,0,0.5)]', className)}
      style={style}
    />
  )
}

/** A spot on the mat that's still waiting for its card: a faint outline. */
export function CardSlot({ className }: { className?: string }) {
  return <div aria-hidden className={cn('rounded-[8px] border border-dashed border-cartaluna-gold/40', className)} />
}
