import SkyBackground from '@/components/SkyBackground'
import Navbar from '@/components/Navbar'
import SiteFooter from '@/components/SiteFooter'
import AccessibilityPanel from '@/components/AccessibilityPanel'

// The frame around the site's own sub-pages (/about, /apps, /tarot, …):
// background, navbar, footer and accessibility panel. Pass the page's <main>.
// Heading styles for sub-pages live in components/ui.ts.
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkyBackground />
      <Navbar />
      {children}
      <SiteFooter />
      <AccessibilityPanel />
    </>
  )
}
