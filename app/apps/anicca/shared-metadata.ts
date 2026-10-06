import type { Metadata } from 'next'

// Nested metadata fields (openGraph) are replaced, not merged, by child
// segments — so every Anicca page spreads this and adds its own title/url.
export const aniccaOpenGraph = {
  siteName: 'Screen Sage',
  type: 'website',
} satisfies Metadata['openGraph']
