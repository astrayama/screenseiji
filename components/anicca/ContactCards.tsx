'use client'

import { Mail, MessageCircle } from 'lucide-react'
import ContactCards, { type ContactCard, type ContactCardsClasses } from '@/components/app-pages/ContactCards'
import { aniccaLinks } from '@/lib/data'

const CARDS: ContactCard[] = [
  {
    icon: Mail,
    title: 'Email',
    value: aniccaLinks.supportEmail,
    note: 'I read everything — usually answered within a day or two.',
    href: `mailto:${aniccaLinks.supportEmail}`,
    external: false,
  },
  {
    icon: MessageCircle,
    title: 'Discord',
    value: 'Screen Sage community',
    note: 'Ask in the community, get answers fast.',
    href: aniccaLinks.discord,
    external: true,
  },
]

const CLASSES: ContactCardsClasses = {
  card: 'anicca-card hover:shadow-[0_1px_2px_rgba(26,26,46,0.04),0_18px_40px_-14px_rgba(92,64,160,0.32)]',
  icon: 'border-anicca-lavender/60 bg-anicca-lavender/20 text-anicca-violet group-hover:bg-anicca-violet group-hover:text-white',
  title: 'font-anicca-display text-anicca-ink',
  value: 'text-anicca-violet-deep',
  note: 'text-anicca-muted',
}

export default function AniccaContactCards() {
  return <ContactCards cards={CARDS} classes={CLASSES} />
}
