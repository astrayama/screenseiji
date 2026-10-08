'use client'

import type { ReactNode } from 'react'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { cn } from '@/lib/utils'

export interface MarqueeItem {
  key: string
  content: ReactNode
}

interface Props {
  items: MarqueeItem[]
  /** Text styles for the items. */
  className?: string
  /** Drawn between items. */
  separator?: ReactNode
}

function MarqueeList({ items, separator, hidden }: Props & { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map(item => (
        <li key={item.key} className="flex items-center gap-8 pr-8">
          <span className="whitespace-nowrap">{item.content}</span>
          <span aria-hidden className="text-foreground/25">{separator}</span>
        </li>
      ))}
    </ul>
  )
}

// A slow, endless ticker that pauses on hover. With reduced motion it's a plain wrapped list.
export default function Marquee({ items, className, separator = '/' }: Props) {
  const { reduced } = useMotionPreference()

  if (reduced) {
    return (
      <ul className={cn('mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-2 px-5 sm:px-8', className)}>
        {items.map(item => <li key={item.key}>{item.content}</li>)}
      </ul>
    )
  }

  return (
    <div className={cn('group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]', className)}>
      {/* Two identical copies; the second is decorative so the list is read once. */}
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <MarqueeList items={items} separator={separator} />
        <MarqueeList items={items} separator={separator} hidden />
      </div>
    </div>
  )
}
