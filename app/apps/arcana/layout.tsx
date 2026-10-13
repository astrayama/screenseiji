import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Nunito } from 'next/font/google'
import ArcanaBackground from '@/components/arcana/ArcanaBackground'
import ArcanaHeader from '@/components/arcana/ArcanaHeader'
import ArcanaFooter from '@/components/arcana/ArcanaFooter'
import AppMotion from '@/components/app-pages/AppMotion'
import { PAGES } from '@/lib/routes'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
})

// Pages set their own metadata from lib/routes.ts; these are fallbacks.
export const metadata: Metadata = {
  title: {
    absolute: PAGES.arcana.title,
    template: '%s · Arcana',
  },
}

// Arcana is dark-only, like the app
export const viewport: Viewport = {
  themeColor: '#0D0B13',
}

export default function ArcanaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${playfair.variable} ${nunito.variable} arcana-root relative min-h-screen font-arcana-body text-arcana-text`}
    >
      <ArcanaBackground />
      <ArcanaHeader />
      <AppMotion>{children}</AppMotion>
      <ArcanaFooter />
    </div>
  )
}
