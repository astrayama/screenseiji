'use client'

import { Mail, MessageCircle } from 'lucide-react'
import ContactCards, { type ContactCard, type ContactCardsClasses } from '@/components/app-pages/ContactCards'
import { cartalunaLinks } from '@/lib/data'

const CARDS: ContactCard[] = [
  {
    icon: Mail,
    title: 'Email',
    value: cartalunaLinks.supportEmail,
    note: 'I read everything — usually answered within a day or two.',
    href: `mailto:${cartalunaLinks.supportEmail}`,
    external: false,
    className: 'hover:border-cartaluna-gold/50',
  },
  {
    icon: MessageCircle,
    title: 'Discord',
    value: 'Screen Sage community',
    note: 'Share what broke or what you’d love next, and meet other testers.',
    href: cartalunaLinks.discord,
    external: true,
    className: 'hover:border-cartaluna-glow/50',
  },
]

const CLASSES: ContactCardsClasses = {
  card: 'cartaluna-panel',
  icon: 'border-cartaluna-gold/30 bg-cartaluna-gold/10 text-cartaluna-gold group-hover:text-cartaluna-glow',
  title: 'font-cartaluna-display text-cartaluna-text',
  value: 'text-cartaluna-glow',
  note: 'text-cartaluna-muted',
}

export default function CartalunaContactCards() {
  return <ContactCards cards={CARDS} classes={CLASSES} />
}
