'use client'

import { Mail, MessageCircle } from 'lucide-react'
import ContactCards, { type ContactCard, type ContactCardsClasses } from '@/components/app-pages/ContactCards'
import { arcanaLinks } from '@/lib/data'

const CARDS: ContactCard[] = [
  {
    icon: Mail,
    title: 'Email',
    value: arcanaLinks.supportEmail,
    note: 'I read every message and usually reply within a day or two.',
    href: `mailto:${arcanaLinks.supportEmail}`,
    external: false,
    className: 'hover:border-arcana-gold/50',
  },
  {
    icon: MessageCircle,
    title: 'Discord',
    value: 'Screen Sage community',
    note: 'Ask in the community; answers usually come quickly.',
    href: arcanaLinks.discord,
    external: true,
    className: 'hover:border-arcana-purple/50',
  },
]

const CLASSES: ContactCardsClasses = {
  card: 'arcana-glass',
  icon: 'border-arcana-stroke/60 bg-arcana-field/40 text-arcana-purple-soft group-hover:text-arcana-gold',
  title: 'font-arcana-display text-arcana-text',
  value: 'text-arcana-purple-soft',
  note: 'text-arcana-muted',
}

export default function ArcanaContactCards() {
  return <ContactCards cards={CARDS} classes={CLASSES} />
}
