import FaqAccordion, { type FaqAccordionClasses } from '@/components/app-pages/FaqAccordion'
import { cartalunaFaq } from '@/lib/cartaluna-content'

const CLASSES: FaqAccordionClasses = {
  root: 'cartaluna-panel px-6 py-2 sm:px-8',
  item: 'border-cartaluna-gold/15',
  marker: { open: 'text-cartaluna-gold', closed: 'text-cartaluna-faint/70 group-hover:text-cartaluna-muted' },
  question: { open: 'text-cartaluna-text', closed: 'text-cartaluna-muted group-hover:text-cartaluna-text' },
  toggle: { open: 'rotate-45 text-cartaluna-gold', closed: 'text-cartaluna-faint/60' },
  answer: 'pb-6 pl-9 pr-8 text-[14px] leading-7 text-cartaluna-muted',
}

export default function CartalunaFaqAccordion() {
  return <FaqAccordion items={cartalunaFaq} idPrefix="cartaluna-faq-panel" marker="☾" classes={CLASSES} />
}
