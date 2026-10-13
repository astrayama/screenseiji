import LegalDocument, { type LegalDocumentClasses } from '@/components/app-pages/LegalDocument'
import type { LegalDoc } from '@/lib/app-content'

const CLASSES: LegalDocumentClasses = {
  eyebrow: 'anicca-eyebrow',
  title: 'mt-3 font-anicca-display text-4xl leading-[1.1] text-anicca-ink sm:text-5xl',
  effective: 'mt-4 text-sm text-anicca-body',
  sectionTitle: 'font-anicca-display text-2xl text-anicca-ink',
  paragraph: 'mt-3 text-[15px] leading-7 text-anicca-body',
  link:
    'break-words font-semibold text-anicca-violet-deep underline decoration-anicca-lavender underline-offset-4 transition-colors hover:text-anicca-ink hover:decoration-anicca-violet',
  aside: 'anicca-card mt-14 flex flex-wrap items-center justify-between gap-4 p-6',
  asidePrompt: 'text-sm text-anicca-muted',
  asideLink: 'rounded-sm text-sm font-bold text-anicca-violet-deep transition-colors hover:text-anicca-ink',
}

interface AniccaLegalDocumentProps {
  eyebrow: string
  title: string
  doc: LegalDoc
  aside: { prompt: string; label: string; href: string }
}

// Anicca's privacy policy and terms of use, in the Anicca skin
export default function AniccaLegalDocument(props: AniccaLegalDocumentProps) {
  return <LegalDocument {...props} classes={CLASSES} />
}
