import FaqAccordion, { type FaqAccordionClasses } from '@/components/app-pages/FaqAccordion'
import { arcanaFaq } from '@/lib/arcana-content'

const CLASSES: FaqAccordionClasses = {
  root: 'arcana-glass px-6 py-2 sm:px-8',
  item: 'border-arcana-stroke/40',
  marker: { open: 'text-arcana-gold', closed: 'text-arcana-faint/60 group-hover:text-arcana-muted' },
  question: { open: 'text-arcana-text', closed: 'text-arcana-muted group-hover:text-arcana-text' },
  toggle: { open: 'rotate-45 text-arcana-gold', closed: 'text-arcana-faint/50' },
  answer: 'pb-6 pl-9 pr-8 text-[14px] leading-7 text-arcana-muted',
}

export default function ArcanaFaqAccordion() {
  return <FaqAccordion items={arcanaFaq} idPrefix="arcana-faq-panel" marker="✦" classes={CLASSES} />
}
