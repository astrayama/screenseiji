import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'
import { PAGES } from '@/lib/routes'

// This page's share card — see lib/og.tsx
export const alt = `${PAGES.privacy.og.eyebrow} — ${PAGES.privacy.og.title}`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOgImage(PAGES.privacy.og)
}
