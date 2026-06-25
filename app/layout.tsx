import type { Metadata } from 'next'
import { Cormorant_Garamond, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { MotionPreferenceProvider } from '@/hooks/useMotionPreference'
import KofiWidget from '@/components/KofiWidget'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Screen Sage — Where spirituality, science, and story collide',
  description:
    'A space for seekers at the crossroads of anime, metaphysics, gaming, and inner work. Tarot readings, philosophical video essays, and spiritual software tools.',
  keywords: ['tarot readings', 'anime philosophy', 'spiritual gaming', 'mindfulness', 'screen sage', 'screenseiji'],
  openGraph: {
    title: 'Screen Sage',
    description: 'Where spirituality, science, and story collide.',
    siteName: 'Screen Sage',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-K1LKGSZ47Y"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-K1LKGSZ47Y');
          `}
        </Script>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <MotionPreferenceProvider>
          {children}
        </MotionPreferenceProvider>
        <KofiWidget />
      </body>
    </html>
  )
}
