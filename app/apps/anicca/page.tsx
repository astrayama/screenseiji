import type { Metadata } from 'next'
import AniccaHero from '@/components/anicca/AniccaHero'
import AniccaFeatures from '@/components/anicca/AniccaFeatures'
import AniccaPricing from '@/components/anicca/AniccaPricing'
import AniccaCTA from '@/components/anicca/AniccaCTA'
import { aniccaOpenGraph } from './shared-metadata'

export const metadata: Metadata = {
  description:
    'A calm mood & energy journal for iPhone. Name how you feel in your own words — matched on-device — see it across seven energy centers, and notice your patterns over time.',
  openGraph: {
    ...aniccaOpenGraph,
    title: 'Anicca — Read your energy. Understand yourself.',
    description: 'A calm mood & energy journal for iPhone, across seven energy centers from Root to Crown.',
    url: '/apps/anicca',
  },
}

export default function AniccaPage() {
  return (
    <main>
      <AniccaHero />
      <AniccaFeatures />
      <AniccaPricing />
      <AniccaCTA />
    </main>
  )
}
