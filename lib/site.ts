// The site's public address and the names the brand goes by, in one place.
// A custom domain is a one-line change here — or just NEXT_PUBLIC_SITE_URL in
// Vercel. Client components import this too, so it may only read NEXT_PUBLIC_
// env vars (anything else is undefined in the browser and breaks hydration).

const VERCEL_URL = 'https://screenseiji.vercel.app'

/** Canonical origin, no trailing slash. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || VERCEL_URL).replace(/\/+$/, '')
export const SITE_HOST = new URL(SITE_URL).hostname

/**
 * Hosts whose links open in place as this site. The vercel.app address stays
 * on the list after a domain move, so old links in content still resolve.
 */
export const LOCAL_HOSTS: readonly string[] = [...new Set([SITE_HOST, new URL(VERCEL_URL).hostname])]

/** An absolute URL on this site. The home page has no trailing slash, like Next's canonical. */
export function absoluteUrl(path = '/'): string {
  if (path === '/' || path === '') return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

// ─── Names ──────────────────────────────────────────────────────────────────
// Screen Sage is the brand, Screen Sage Studios the maker, and screenseiji the
// handle — where the anime edits and the love of Japanese culture live. Search
// engines only learn they're one entity if we say so (see structured-data.ts).

export const SITE_NAME = 'Screen Sage'
export const ORG_NAME = 'Screen Sage Studios'
export const HANDLE = 'screenseiji'
export const TWITTER = '@screenseiji'
/** Credited by first name only — never the full name. */
export const FOUNDER = 'Isa'
export const EMAIL = 'screenseiji@proton.me'
export const TAGLINE = 'Where spirituality, science, and story collide.'

/** Every other name the studio goes by, including the one it evolved from. */
export const ALT_NAMES = ['Screen Sage', 'screenseiji', 'Screen Seiji', 'ScreenSage', 'Omniversal Seeker']
/** Names for the website itself — what Google may show as the site name. */
export const SITE_ALT_NAMES = ['Screen Sage Studios', 'screenseiji']
