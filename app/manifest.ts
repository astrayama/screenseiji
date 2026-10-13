import type { MetadataRoute } from 'next'
import { ORG_NAME, SITE_NAME, TAGLINE } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: ORG_NAME,
    short_name: SITE_NAME,
    description: TAGLINE,
    start_url: '/',
    display: 'browser',
    background_color: '#07090F',
    theme_color: '#07090F',
    icons: [
      { src: '/icon.png', sizes: '256x256', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
