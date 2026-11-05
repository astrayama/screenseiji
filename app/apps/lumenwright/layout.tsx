import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import LumenwrightBackground from '@/components/lumenwright/LumenwrightBackground'
import LumenwrightHeader from '@/components/lumenwright/LumenwrightHeader'
import LumenwrightFooter from '@/components/lumenwright/LumenwrightFooter'
import AppMotion from '@/components/app-pages/AppMotion'
import { PAGES } from '@/lib/routes'

// Space Grotesk headings (the type the Screen Sage app cards use), Inter body
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// The page sets its own metadata from lib/routes.ts; this is a fallback.
export const metadata: Metadata = {
  title: { absolute: PAGES.lumenwright.title },
}

// Lumenwright is dark-only, like the arena's void
export const viewport: Viewport = {
  themeColor: '#0A0A17',
  colorScheme: 'dark',
}

export default function LumenwrightLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable} lumenwright-root relative min-h-screen font-lumenwright-body text-lumenwright-text`}
    >
      <LumenwrightBackground />
      <LumenwrightHeader />
      <AppMotion>{children}</AppMotion>
      <LumenwrightFooter />
    </div>
  )
}
