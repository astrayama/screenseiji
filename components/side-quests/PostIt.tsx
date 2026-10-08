import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { textColorOn } from '@/lib/side-quests/display'

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
  const style = {
    '--postit': color,
    '--tilt': `${tilt}deg`,
    color: textColorOn(color),
  } as CSSProperties

  if (variant === 'mini') {
    return <span aria-hidden className={cn('postit postit-mini block h-5 w-5 shrink-0 rounded-[3px] lg:h-7 lg:w-7', className)} style={style} />
  }
  return (
    <div className={cn('postit postit-lift rounded-md px-4 py-3', className)} style={style}>
      {children}
    </div>
  )
}
