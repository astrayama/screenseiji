import type { Metadata, Viewport } from 'next'
import { Fraunces, Figtree } from 'next/font/google'
import AniccaBackground from '@/components/anicca/AniccaBackground'
import AniccaHeader from '@/components/anicca/AniccaHeader'
import AniccaFooter from '@/components/anicca/AniccaFooter'
import AppMotion from '@/components/app-pages/AppMotion'
import { PAGES } from '@/lib/routes'

// Fraunces with its "soft" axis for display — rounded, unhurried serifs —
// over Figtree, a clear and friendly sans for reading.
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

// Pages set their own metadata from lib/routes.ts; these are fallbacks.
export const metadata: Metadata = {
  title: {
    absolute: PAGES.anicca.title,
    template: '%s · Anicca',
  },
}

// Anicca is light-only, like the app
export const viewport: Viewport = {
  themeColor: '#F5F0FA',
  colorScheme: 'light',
}

export default function AniccaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} ${figtree.variable} anicca-root relative min-h-screen font-anicca-body text-anicca-ink`}
    >
      <AniccaBackground />
      <AniccaHeader />
      <AppMotion>{children}</AppMotion>
      <AniccaFooter />
    </div>
  )
}
