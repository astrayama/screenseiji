import type { Metadata, Viewport } from 'next'
import { Fraunces, Figtree } from 'next/font/google'
import AniccaBackground from '@/components/anicca/AniccaBackground'
import AniccaHeader from '@/components/anicca/AniccaHeader'
import AniccaFooter from '@/components/anicca/AniccaFooter'
import AppMotion from '@/components/app-pages/AppMotion'
import { aniccaOpenGraph } from './shared-metadata'

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

const DESCRIPTION =
  'A calm mood & energy journal for iPhone. Check in with how you feel, see it across seven energy centers from Root to Crown, and notice your patterns over time.'

export const metadata: Metadata = {
  title: {
    default: 'Anicca — Read your energy. Understand yourself.',
    template: '%s · Anicca',
  },
  description: DESCRIPTION,
  openGraph: {
    ...aniccaOpenGraph,
    title: 'Anicca — Read your energy. Understand yourself.',
    description: DESCRIPTION,
    url: '/apps/anicca',
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
