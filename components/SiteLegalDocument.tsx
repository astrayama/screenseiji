import LegalDocument, { type LegalDocumentClasses } from '@/components/app-pages/LegalDocument'
import { BUTTON_OUTLINE, CARD, EYEBROW, PAGE_TITLE, TEXT_LINK } from '@/components/ui'
import type { LegalDoc } from '@/lib/app-content'
import { cn } from '@/lib/utils'

const CLASSES: LegalDocumentClasses = {
  eyebrow: EYEBROW,
  title: cn(PAGE_TITLE, 'mt-4 text-5xl leading-[1.1] sm:text-6xl'),
  effective: 'mt-4 text-sm text-plum-500',
  sectionTitle: 'font-display text-3xl font-medium leading-tight text-plum-900',
  paragraph: 'mt-3 text-[15px] leading-7 text-plum-700',
  link: cn(TEXT_LINK, 'break-words'),
  aside: cn(CARD, 'mt-14 flex flex-wrap items-center justify-between gap-4 p-6'),
  asidePrompt: 'text-[15px] text-plum-700',
  asideLink: BUTTON_OUTLINE,
}

interface SiteLegalDocumentProps {
  eyebrow: string
  title: string
  doc: LegalDoc
  aside: { prompt: string; label: string; href: string }
}

// The site's own policy pages (/privacy), in the Screen Sage skin
export default function SiteLegalDocument(props: SiteLegalDocumentProps) {
  return <LegalDocument {...props} classes={CLASSES} />
}
