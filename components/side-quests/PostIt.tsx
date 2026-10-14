import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { contrastRatio, mixColors } from '@/lib/side-quests/display'

interface Props {
  color: string
  /** Degrees; see `tilt()` in lib/side-quests/display. */
  tilt?: number
  /** 'mini' is the calendar square; 'note' holds a log entry's text. */
  variant: 'mini' | 'note'
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

export default function PostIt({ color, tilt = 0, variant, className, children }: Props) {
  if (variant === 'mini') {
    // Textless, so it keeps the quest's exact color.
    const style = { '--postit': color, '--tilt': `${tilt}deg` } as CSSProperties
    return <span aria-hidden className={cn('postit postit-mini block h-5 w-5 shrink-0 rounded-[3px] lg:h-7 lg:w-7', className)} style={style} />
  }
  const style = { '--postit': notePaper(color), '--tilt': `${tilt}deg` } as CSSProperties
  return (
    <div className={cn('postit postit-lift rounded-md px-4 py-3 text-plum-900', className)} style={style}>
      {children}
    </div>
  )
}
