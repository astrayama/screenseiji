import type { Metadata } from 'next'
import { Playfair_Display, Nunito } from 'next/font/google'
import ArcanaBackground from '@/components/arcana/ArcanaBackground'
import ArcanaHeader from '@/components/arcana/ArcanaHeader'
import ArcanaFooter from '@/components/arcana/ArcanaFooter'
import AppMotion from '@/components/app-pages/AppMotion'

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

export const metadata: Metadata = {
  title: {
    default: 'Arcana — Give your tarot cards a home.',
    template: '%s · Arcana',
  },
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
