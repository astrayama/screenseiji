import type { Metadata } from 'next'
import { PAGES, type PageEntry, type PageKey } from '@/lib/routes'
import { SITE_NAME } from '@/lib/site'

/**
 * A page's metadata from the registry (lib/routes.ts).
 *
 * Every page sets its own canonical and full openGraph: Next replaces nested
 * fields like openGraph instead of merging them, so nothing can be left to a
 * layout. The share image comes from the opengraph-image file beside each
 * page, and twitter:* is filled in from openGraph by Next.
 */
export function pageMetadata(key: PageKey): Metadata {
  const { path, title, description, noindex } = PAGES[key] as PageEntry
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    // Overrides the site-wide "index, follow" (robots and googlebot) in app/layout.tsx.
    ...(noindex && { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } }),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      url: path,
      title,
      description,
    },
  }
}
