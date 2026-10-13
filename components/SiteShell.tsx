import SparkleBackground from '@/components/SparkleBackground'
import Navbar from '@/components/Navbar'
import SiteFooter from '@/components/SiteFooter'
import AccessibilityPanel from '@/components/AccessibilityPanel'

// The frame around the site's own sub-pages (/about, /apps, /tarot, …):
// background, navbar, footer and accessibility panel. Pass the page's <main>.
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SparkleBackground />
      <Navbar />
      {children}
      <SiteFooter />
      <AccessibilityPanel />
    </>
  )
}

/** Shared heading styles for sub-pages, matching /side-quests. */
export const PAGE_EYEBROW = 'mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold'
export const PAGE_TITLE = 'font-display font-light leading-[1.1] text-foreground text-glow-gold'
export const PAGE_TITLE_SIZE = { fontSize: 'clamp(2.25rem, 5.5vw, 4rem)' }
export const SECTION_TITLE = 'font-display text-3xl font-light leading-[1.15] text-foreground sm:text-4xl'
