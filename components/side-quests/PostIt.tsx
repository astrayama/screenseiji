import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { noteColors } from '@/lib/side-quests/display'

interface Props {
  color: string
  /** Degrees; see `tilt()` in lib/side-quests/display. */
  tilt?: number
  /** 'mini' is the calendar square; 'note' holds a log entry's text. */
  variant: 'mini' | 'note'
  className?: string
  children?: ReactNode
}

export default function PostIt({ color, tilt = 0, variant, className, children }: Props) {
  if (variant === 'mini') {
    // Textless, so it keeps the quest's exact color.
    const style = { '--postit': color, '--tilt': `${tilt}deg` } as CSSProperties
    return <span aria-hidden className={cn('postit postit-mini block h-5 w-5 shrink-0 rounded-[3px] lg:h-7 lg:w-7', className)} style={style} />
  }
  // Text needs contrast, so the paper may be a lightened tint of the quest color.
  const { paper, text } = noteColors(color)
  const style = { '--postit': paper, '--tilt': `${tilt}deg`, color: text } as CSSProperties
  return (
    <div className={cn('postit postit-lift rounded-md px-4 py-3', className)} style={style}>
      {children}
    </div>
  )
}
