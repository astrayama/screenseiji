import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { contrastRatio, mixColors } from '@/lib/side-quests/display'

interface Props {
  color: string
  /** Degrees; see `tilt()` in lib/side-quests/display. */
  tilt?: number
  /** 'mini' is the calendar square; 'note' holds a log entry's text. */
  variant: 'mini' | 'note'
  /** A completed main quest: a bigger square, or a roomier note. */
  large?: boolean
  className?: string
  children?: ReactNode
}

/** --color-plum-900: the ink on every post-it. */
const INK = '#3F2A58'
/** --color-cloud: what a quest color is lightened toward. */
const CLOUD = '#FFFBFD'
/** The darkest the paper gets: globals.css .postit's curl (6% plum) plus a fibre (2%). */
const CURL = 0.08

/**
 * Paper for a post-it that carries plum ink. Quest colors are Bel's choice, so a
 * color too dark for the ink is lightened toward cloud just enough to keep WCAG
 * AA (4.5:1) even where the paper curls darker; the rest keep their exact color.
 */
function notePaper(hex: string): string {
  for (let step = 0; step <= 20; step++) {
    const paper = step === 0 ? hex : mixColors(hex, CLOUD, step / 20)
    if (contrastRatio(INK, mixColors(paper, INK, CURL)) >= 4.5) return paper
  }
  return CLOUD
}

export default function PostIt({ color, tilt = 0, variant, large, className, children }: Props) {
  if (variant === 'mini') {
    // Textless (an icon at most), so it keeps the quest's exact color.
    const style = { '--postit': color, '--tilt': `${tilt}deg` } as CSSProperties
    return (
      <span
        aria-hidden
        className={cn(
          'postit postit-mini block shrink-0 rounded-[3px]',
          large ? 'postit-large flex h-10 w-10 items-center justify-center text-plum-900 lg:h-14 lg:w-14' : 'h-5 w-5 lg:h-7 lg:w-7',
          className,
        )}
        style={style}
      >
        {children}
      </span>
    )
  }
  const style = { '--postit': notePaper(color), '--tilt': `${tilt}deg` } as CSSProperties
  return (
    <div
      className={cn('postit postit-lift rounded-md text-plum-900', large ? 'postit-large px-5 py-5 sm:px-6' : 'px-4 py-3', className)}
      style={style}
    >
      {children}
    </div>
  )
}
