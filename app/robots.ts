import type { MetadataRoute } from 'next'
import { SITE_URL, absoluteUrl } from '@/lib/site'

// Everyone is welcome — search engines and AI assistants alike. Only the
// form endpoints are off-limits (the GitHub clock badge is fetched by
// GitHub's image proxy, which doesn't read robots.txt).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  }
}
