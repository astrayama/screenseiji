'use client'

import { cn } from '@/lib/utils'
import { useMotionPreference } from '@/hooks/useMotionPreference'

interface CollapsibleProps {
  /** Target of the toggle's aria-controls. */
  id: string
  open: boolean
  children: React.ReactNode
}

/**
 * Content that folds away without leaving the page. Collapsed, it's still in
 * the HTML — so search engines and AI crawlers can read every answer — while
 * `inert` keeps it out of the tab order and the accessibility tree.
 * grid-rows 0fr→1fr animates to the content's natural height, like the Studio
 * panel. Put padding on the children, not here: the wrapper must reach zero.
 */
export default function Collapsible({ id, open, children }: CollapsibleProps) {
  const { reduced } = useMotionPreference()

  return (
    <div
      id={id}
      inert={!open}
      className={cn(
        'grid',
        !reduced && 'transition-[grid-template-rows,opacity] duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
      )}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  )
}
