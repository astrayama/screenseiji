import type { Metadata } from 'next'
import { PAGES, type PageKey } from '@/lib/routes'
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
  const { path, title, description } = PAGES[key]
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
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
