import FaqAccordion, { type FaqAccordionClasses } from '@/components/app-pages/FaqAccordion'
import { aniccaFaq } from '@/lib/anicca-content'

const CLASSES: FaqAccordionClasses = {
  root: 'anicca-card px-5 py-1 sm:px-8',
  item: 'border-anicca-lavender/40',
  marker: { open: 'text-anicca-violet', closed: 'text-anicca-lavender group-hover:text-anicca-lilac' },
  question: { open: 'text-anicca-ink', closed: 'text-anicca-ink/80 group-hover:text-anicca-ink' },
  toggle: { open: 'rotate-45 text-anicca-violet', closed: 'text-anicca-muted' },
  answer: 'pb-6 pl-6 pr-2 text-[14.5px] leading-7 text-anicca-muted sm:pr-8',
}

// A small filled dot, coloured by the marker classes above
const MARKER = <span className="block h-2 w-2 rounded-full bg-current" />

export default function AniccaFaqAccordion() {
  return <FaqAccordion items={aniccaFaq} idPrefix="anicca-faq-panel" marker={MARKER} classes={CLASSES} />
}
