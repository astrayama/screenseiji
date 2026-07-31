'use client'

import { Mail, MessageCircle } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import { arcanaLinks } from '@/lib/data'

const CARDS = [
  {
    icon: Mail,
    title: 'Email',
    value: arcanaLinks.supportEmail,
    note: 'I read everything — usually answered within a day or two.',
    href: `mailto:${arcanaLinks.supportEmail}`,
    external: false,
    accent: 'hover:border-arcana-gold/50',
  },
  {
    icon: MessageCircle,
    title: 'Discord',
    value: 'Screen Sage community',
    note: 'Ask in the community, get answers fast.',
    href: arcanaLinks.discord,
    external: true,
    accent: 'hover:border-arcana-purple/50',
  },
]

function ContactCard({ card, index }: { card: typeof CARDS[number]; index: number }) {
  const { ref, inView } = useInView<HTMLAnchorElement>()
  const Icon = card.icon

  return (
    <a
      ref={ref}
      href={card.href}
      target={card.external ? '_blank' : undefined}
      rel={card.external ? 'noreferrer' : undefined}
      className={cn(
        'arcana-glass reveal group block p-6 transition-all duration-300 hover:-translate-y-1',
        card.accent,
        inView && 'reveal-in',
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-arcana-stroke/60 bg-arcana-field/40 text-arcana-purple-soft transition-colors duration-300 group-hover:text-arcana-gold">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <p className="mt-4 font-arcana-display text-xl text-arcana-text">{card.title}</p>
      <p className="mt-1 text-sm font-bold text-arcana-purple-soft">{card.value}</p>
      <p className="mt-2 text-[13px] leading-6 text-arcana-muted">{card.note}</p>
    </a>
  )
}

export default function ContactCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CARDS.map((card, i) => (
        <ContactCard key={card.title} card={card} index={i} />
      ))}
    </div>
  )
}
