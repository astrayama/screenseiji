'use client'

// Client: the contact cards take icon components, which can't cross from the server.
import { Mail, MessageCircle } from 'lucide-react'
import ContactCards, { type ContactCard, type ContactCardsClasses } from '@/components/app-pages/ContactCards'
import FaqAccordion, { type FaqAccordionClasses } from '@/components/app-pages/FaqAccordion'
import { LumenMark } from '@/components/lumenwright/LumenMark'
import { OpenAppButton } from '@/components/lumenwright/OpenApp'
import Reveal from '@/components/lumenwright/Reveal'
import { lumenwrightLinks } from '@/lib/data'
import { lumenwrightCta, lumenwrightFaq } from '@/lib/lumenwright-content'

const FAQ_CLASSES: FaqAccordionClasses = {
  root: 'lumenwright-panel px-6 py-2 sm:px-8',
  item: 'border-lumenwright-resolve/15',
  marker: { open: 'text-lumenwright-resolve', closed: 'text-lumenwright-faint/70 group-hover:text-lumenwright-muted' },
  question: { open: 'text-lumenwright-text', closed: 'text-lumenwright-muted group-hover:text-lumenwright-text' },
  toggle: { open: 'rotate-45 text-lumenwright-resolve', closed: 'text-lumenwright-faint/60' },
  answer: 'pb-6 pl-9 pr-8 text-[14px] leading-7 text-lumenwright-muted',
}

const CARDS: ContactCard[] = [
  {
    icon: Mail,
    title: 'Email',
    value: lumenwrightLinks.supportEmail,
    note: 'I read every message and usually reply within a day or two.',
    href: `mailto:${lumenwrightLinks.supportEmail}`,
    external: false,
    className: 'hover:border-lumenwright-resolve/50',
  },
  {
    icon: MessageCircle,
    title: 'Discord',
    value: 'Screen Sage community',
    note: 'Share what broke or what you’d like next, and meet other testers.',
    href: lumenwrightLinks.discord,
    external: true,
    className: 'hover:border-lumenwright-fury/50',
  },
]

const CARD_CLASSES: ContactCardsClasses = {
  card: 'lumenwright-panel',
  icon: 'border-lumenwright-resolve/30 bg-lumenwright-resolve/10 text-lumenwright-resolve group-hover:text-lumenwright-text',
  title: 'font-lumenwright-display text-lumenwright-text',
  value: 'text-lumenwright-resolve',
  note: 'text-lumenwright-muted',
}

export function LumenwrightHelp() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-4xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24">
      <div className="text-center">
        <p className="lumenwright-eyebrow">Questions</p>
        <h2 id="faq-title" className="mt-4 font-lumenwright-display text-3xl font-medium leading-[1.12] tracking-tight sm:text-[2.6rem]">
          Before you play
        </h2>
      </div>
      <div className="mt-12">
        <FaqAccordion items={lumenwrightFaq} idPrefix="lumenwright-faq-panel" marker="◇" classes={FAQ_CLASSES} />
      </div>

      <h3 className="mt-16 text-center font-lumenwright-display text-2xl font-medium text-lumenwright-text">Still have a question?</h3>
      <p className="mt-2 text-center text-[14px] text-lumenwright-muted">
        Lumenwright is in beta, and every playtest note helps.
      </p>
      <div className="mt-8">
        <ContactCards cards={CARDS} classes={CARD_CLASSES} />
      </div>
    </section>
  )
}

export function LumenwrightCTA() {
  return (
    <section className="px-5 pb-28 pt-8 sm:px-8">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <LumenMark size={64} className="animate-lumenwright-pulse" />
        <p className="mt-7 font-lumenwright-display text-3xl font-medium leading-[1.25] tracking-tight text-lumenwright-text sm:text-4xl">
          {lumenwrightCta.headline}
        </p>
        <OpenAppButton className="mt-9" />
      </Reveal>
    </section>
  )
}
