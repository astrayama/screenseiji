import FaqAccordion, { type FaqAccordionClasses } from '@/components/app-pages/FaqAccordion'
import type { FaqItem } from '@/lib/app-content'

const CLASSES: FaqAccordionClasses = {
  root: 'glass rounded-3xl px-6 py-2 sm:px-8',
  item: 'border-white/6',
  marker: { open: 'text-gold', closed: 'text-muted/40 group-hover:text-muted' },
  question: { open: 'text-foreground', closed: 'text-muted group-hover:text-foreground' },
  toggle: { open: 'rotate-45 text-gold', closed: 'text-muted/40' },
  answer: 'pb-6 pl-8 pr-6 text-sm leading-7 text-muted sm:text-[15px]',
}

// FAQs on the site's own pages (/tarot, /websites), in the Screen Sage skin
export default function SiteFaq({ items, idPrefix }: { items: FaqItem[]; idPrefix: string }) {
  return <FaqAccordion items={items} idPrefix={idPrefix} marker="✦" classes={CLASSES} />
}
