import type { Metadata } from 'next'
import ArcanaHero from '@/components/arcana/ArcanaHero'
import ArcanaFeatures from '@/components/arcana/ArcanaFeatures'
import ArcanaCTA from '@/components/arcana/ArcanaCTA'

export const metadata: Metadata = {
  description:
    'A warm, quiet tarot journal for iPhone — every pull, every spread, every thought, kept safe. 10-second logging, meaning hints for all 78 cards, and beautiful exports.',
  openGraph: {
    title: 'Arcana — Give your tarot cards a home.',
    description: 'A warm, quiet tarot journal — every pull, every spread, every thought, kept safe.',
    siteName: 'Screen Sage',
    type: 'website',
    url: '/apps/arcana',
  },
}

export default function ArcanaPage() {
  return (
    <main>
      <ArcanaHero />
      <ArcanaFeatures />
      <ArcanaCTA />
    </main>
  )
}
