import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { MotionPreferenceProvider } from '@/hooks/useMotionPreference'
import KofiWidget from '@/components/KofiWidget'
import { Analytics } from '@vercel/analytics/next'
import { PAGES } from '@/lib/routes'
import { FOUNDER, ORG_NAME, SITE_NAME, SITE_URL, TWITTER } from '@/lib/site'

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

// Site-wide defaults. Pages set their own title, description, canonical and
// openGraph from lib/routes.ts (via pageMetadata) — never put a canonical or
// openGraph.url here, or every page that forgets one would inherit the home page's.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: PAGES.home.title, template: `%s · ${SITE_NAME}` },
  description: PAGES.home.description,
  applicationName: SITE_NAME,
  authors: [{ name: FOUNDER, url: '/about' }],
  creator: ORG_NAME,
  publisher: ORG_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    title: PAGES.home.title,
    description: PAGES.home.description,
  },
  // Title, description and image are copied from openGraph by Next
  twitter: { card: 'summary_large_image', site: TWITTER, creator: TWITTER },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  // Ownership checks for Google Search Console and Bing Webmaster Tools — set
  // the codes in Vercel's environment variables (see .env.example).
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION && { google: process.env.GOOGLE_SITE_VERIFICATION }),
    ...(process.env.BING_SITE_VERIFICATION && { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } }),
  },
}

// Browser UI colour, matching the page background. No colorScheme: it would
// restyle native form controls.
export const viewport: Viewport = {
  themeColor: '#07090F',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior: Next turns off the CSS smooth scroll while it changes
    // pages, so a <Link> lands at the new page's top instead of gliding there.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5V74DNE51Q"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5V74DNE51Q');
          `}
        </Script>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <MotionPreferenceProvider>
          {children}
        </MotionPreferenceProvider>
        <KofiWidget />
        <Analytics />
      </body>
    </html>
  )
}
