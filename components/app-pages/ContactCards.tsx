'use client'

import type { LucideIcon } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

export interface ContactCard {
  icon: LucideIcon
  title: string
  value: string
  note: string
  href: string
  external: boolean
  /** Per-card extras, e.g. a hover border colour. */
  className?: string
}

/** Theme hooks for each app's skin; behaviour and layout stay shared. */
export interface ContactCardsClasses {
  card: string
  icon: string
  title: string
  value: string
  note: string
}

function Card({ card, index, classes }: { card: ContactCard; index: number; classes: ContactCardsClasses }) {
  const { ref, inView } = useInView<HTMLAnchorElement>()
  const Icon = card.icon

  return (
    <a
      ref={ref}
      href={card.href}
      target={card.external ? '_blank' : undefined}
      rel={card.external ? 'noreferrer' : undefined}
      className={cn(
        classes.card,
        'reveal group block p-6 transition-all duration-300 hover:-translate-y-1',
        card.className,
        inView && 'reveal-in',
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <span
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300',
          classes.icon,
        )}
      >
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <p className={cn('mt-4 text-xl', classes.title)}>{card.title}</p>
      <p className={cn('mt-1 text-sm font-bold', classes.value)}>{card.value}</p>
      <p className={cn('mt-2 text-[13px] leading-6', classes.note)}>{card.note}</p>
    </a>
  )
}

export default function ContactCards({ cards, classes }: { cards: ContactCard[]; classes: ContactCardsClasses }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((card, i) => (
        <Card key={card.title} card={card} index={i} classes={classes} />
      ))}
    </div>
  )
}
