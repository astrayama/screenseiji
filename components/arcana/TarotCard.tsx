import Image from 'next/image'
import { cn } from '@/lib/utils'
import moon from '@/public/arcana/cards/moon.jpg'
import star from '@/public/arcana/cards/star.jpg'
import sun from '@/public/arcana/cards/sun.jpg'
import hermit from '@/public/arcana/cards/hermit.jpg'
import tenOfCups from '@/public/arcana/cards/ten-of-cups.jpg'

// Public-domain Rider–Waite–Smith scans (Pamela Colman Smith, 1909)
export const CARD_ART = {
  moon,
  star,
  sun,
  hermit,
  'ten-of-cups': tenOfCups,
} as const

export type CardName = keyof typeof CARD_ART

const CARD_LABELS: Record<CardName, string> = {
  moon: 'The Moon',
  star: 'The Star',
  sun: 'The Sun',
  hermit: 'The Hermit',
  'ten-of-cups': 'Ten of Cups',
}

interface TarotCardProps {
  card: CardName
  width: number
  height: number
  className?: string
  style?: React.CSSProperties
  reversed?: boolean
  alt?: string
}

export default function TarotCard({ card, width, height, className, style, reversed, alt }: TarotCardProps) {
  // Size comes from the width/height attributes so responsive classes can
  // override it (e.g. smaller spread cards on narrow viewports).
  return (
    <Image
      src={CARD_ART[card]}
      alt={alt ?? CARD_LABELS[card]}
      width={width}
      height={height}
      className={cn(
        'rounded-[9px] border border-arcana-gold/40 object-cover shadow-[0_6px_18px_rgba(0,0,0,0.45)]',
        reversed && 'rotate-180',
        className,
      )}
      style={style}
    />
  )
}

// The app's card back — wireframe .cback
export function CardBack({
  width, height, className, style, glyphSize = 26,
}: {
  width: number
  height: number
  className?: string
  style?: React.CSSProperties
  glyphSize?: number
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'flex items-center justify-center rounded-[10px] border-[1.5px] border-arcana-gold/40 text-arcana-gold/75 shadow-[0_6px_18px_rgba(0,0,0,0.45)]',
        className,
      )}
      style={{
        width,
        height,
        background: 'linear-gradient(160deg, #241E37 0%, #171422 100%)',
        fontSize: glyphSize,
        ...style,
      }}
    >
      ☾
    </div>
  )
}
