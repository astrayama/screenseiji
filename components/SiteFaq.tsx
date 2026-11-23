import FaqAccordion from '@/components/app-pages/FaqAccordion'
import { CARD } from '@/components/ui'
import type { FaqItem } from '@/lib/app-content'

// FAQs on the site's own pages (/tarot, /studio): a white card on the sky, a
// sparkle by each question.
const CLASSES = {
  root: `${CARD} px-6 py-2 sm:px-8`,
  item: 'border-mist',
  marker: { open: 'text-plum-500', closed: 'text-plum-500/45 group-hover:text-plum-500' },
  question: { open: 'text-plum-900', closed: 'text-plum-700 group-hover:text-plum-900' },
  toggle: { open: 'rotate-45 text-plum-500', closed: 'text-plum-500/60 group-hover:text-plum-500' },
  answer: 'pb-6 pl-8 pr-6 text-sm leading-7 text-plum-700 sm:text-[15px]',
}

export default function SiteFaq({ items, idPrefix }: { items: FaqItem[]; idPrefix: string }) {
  return <FaqAccordion items={items} idPrefix={idPrefix} marker="✦" classes={CLASSES} />
}
