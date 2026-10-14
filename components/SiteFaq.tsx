import FaqAccordion, { type FaqAccordionClasses } from '@/components/app-pages/FaqAccordion'
import { CARD } from '@/components/ui'
import type { FaqItem } from '@/lib/app-content'

const QUESTION = { open: 'text-plum-900', closed: 'text-plum-700 group-hover:text-plum-900' }
const TOGGLE = { open: 'rotate-45 text-plum-500', closed: 'text-plum-500/60 group-hover:text-plum-500' }

const SKINS: Record<'brand' | 'calm', { classes: FaqAccordionClasses; marker: React.ReactNode }> = {
  // /tarot: a white card on the sky, a sparkle by each question.
  brand: {
    marker: '✦',
    classes: {
      root: `${CARD} px-6 py-2 sm:px-8`,
      item: 'border-mist',
      marker: { open: 'text-plum-500', closed: 'text-plum-500/45 group-hover:text-plum-500' },
      question: QUESTION,
      toggle: TOGGLE,
      answer: 'pb-6 pl-8 pr-6 text-sm leading-7 text-plum-700 sm:text-[15px]',
    },
  },
  // /websites (Studio): thin lilac rules, no decoration.
  calm: {
    marker: null,
    classes: {
      root: 'rounded-lg border border-mist bg-cloud px-6 py-2 sm:px-8',
      item: 'border-mist',
      marker: { open: 'hidden', closed: 'hidden' },
      question: QUESTION,
      toggle: TOGGLE,
      answer: 'pb-6 pr-6 text-sm leading-7 text-plum-700 sm:text-[15px]',
    },
  },
}

// FAQs on the site's own pages, in the brand skin (/tarot) or the calm one (/websites).
export default function SiteFaq({ items, idPrefix, tone = 'brand' }: { items: FaqItem[]; idPrefix: string; tone?: 'brand' | 'calm' }) {
  const { classes, marker } = SKINS[tone]
  return <FaqAccordion items={items} idPrefix={idPrefix} marker={marker} classes={classes} />
}
