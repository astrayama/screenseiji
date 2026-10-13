import LegalDocument, { type LegalDocumentClasses } from '@/components/app-pages/LegalDocument'
import type { LegalDoc } from '@/lib/app-content'

const CLASSES: LegalDocumentClasses = {
  eyebrow: 'text-xs font-semibold uppercase tracking-[0.28em] text-gold',
  title: 'mt-4 font-display text-5xl font-light leading-[1.1] text-foreground text-glow-gold sm:text-6xl',
  effective: 'mt-4 text-sm text-muted/70',
  sectionTitle: 'font-display text-3xl font-light text-foreground',
  paragraph: 'mt-3 text-[15px] leading-7 text-muted',
  link: 'break-words font-semibold text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-bright',
  aside: 'glass mt-14 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6',
  asidePrompt: 'text-sm text-muted',
  asideLink: 'text-sm font-semibold text-gold transition-colors hover:text-gold-bright',
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
