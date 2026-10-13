'use client'

import { useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import type { FaqItem } from '@/lib/app-content'
import Collapsible from '@/components/Collapsible'

/** Theme hooks for each app's skin; behaviour and layout stay shared. */
export interface FaqAccordionClasses {
  /** The panel that wraps the whole list. */
  root: string
  /** Each item — typically its divider colour. */
  item: string
  marker: { open: string; closed: string }
  question: { open: string; closed: string }
  toggle: { open: string; closed: string }
  /** The answer paragraph — including the indent that lines it up under the question. */
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
  /** Prefix for the panels' DOM ids — unique per page. */
  idPrefix: string
  /** Glyph shown before each question. */
  marker: React.ReactNode
  classes: FaqAccordionClasses
}

function FaqPanel({
  item,
  index,
  idPrefix,
  marker,
  classes,
}: Omit<FaqAccordionProps, 'items'> & { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(index === 0)
  const { ref, inView } = useInView<HTMLDivElement>()
  const panelId = `${idPrefix}-${index}`

  return (
    <div
      ref={ref}
      className={cn('reveal border-b last:border-0', classes.item, inView && 'reveal-in')}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-center gap-4 py-5 text-left"
      >
        <span
          aria-hidden
          className={cn('shrink-0 text-lg transition-all duration-300', open ? classes.marker.open : classes.marker.closed)}
        >
          {marker}
        </span>
        <span
          className={cn(
            'flex-1 text-[15px] font-bold transition-colors duration-200',
            open ? classes.question.open : classes.question.closed,
          )}
        >
          {item.q}
        </span>
        <span
          aria-hidden
          className={cn('shrink-0 text-lg transition-all duration-300', open ? classes.toggle.open : classes.toggle.closed)}
        >
          +
        </span>
      </button>

      {/* Always in the HTML, collapsed or not, so every answer can be indexed */}
      <Collapsible id={panelId} open={open}>
        <p className={classes.answer}>{item.a}</p>
      </Collapsible>
    </div>
  )
}

export default function FaqAccordion({ items, ...rest }: FaqAccordionProps) {
  return (
    <div className={rest.classes.root}>
      {items.map((item, i) => (
        <FaqPanel key={item.q} item={item} index={i} {...rest} />
      ))}
    </div>
  )
}
