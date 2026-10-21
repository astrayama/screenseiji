import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import CartalunaBackground from '@/components/cartaluna/CartalunaBackground'
import CartalunaHeader from '@/components/cartaluna/CartalunaHeader'
import CartalunaFooter from '@/components/cartaluna/CartalunaFooter'
import AppMotion from '@/components/app-pages/AppMotion'
import { PAGES } from '@/lib/routes'

// The app's own type: Playfair Display headings, Inter body (arcana-mr/CREDITS.md)
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// The page sets its own metadata from lib/routes.ts; this is a fallback.
export const metadata: Metadata = {
  title: { absolute: PAGES.cartaluna.title },
}

// Carta Luna is dark-only, like the app's night sky
export const viewport: Viewport = {
  themeColor: '#0F0D0B',
  colorScheme: 'dark',
}

export default function CartalunaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${playfair.variable} ${inter.variable} cartaluna-root relative min-h-screen font-cartaluna-body text-cartaluna-text`}
    >
      <CartalunaBackground />
      <CartalunaHeader />
      <AppMotion>{children}</AppMotion>
      <CartalunaFooter />
    </div>
  )
}
