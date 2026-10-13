import ArcanaHero from '@/components/arcana/ArcanaHero'
import ArcanaFeatures from '@/components/arcana/ArcanaFeatures'
import ArcanaCTA from '@/components/arcana/ArcanaCTA'
import JsonLd from '@/components/JsonLd'
import { arcanaLinks } from '@/lib/data'
import { arcanaApp } from '@/lib/arcana-content'
import { pageMetadata } from '@/lib/seo'
import { mobileApplication, pageGraph } from '@/lib/structured-data'

export const metadata = pageMetadata('arcana')

// No offers: Arcana's App Store pricing isn't public yet
const APP = mobileApplication({
  key: 'arcana',
  name: 'Arcana',
  version: arcanaApp.version,
  requires: arcanaApp.requires,
  installUrl: arcanaLinks.appStorePlaceholder ? undefined : arcanaLinks.appStoreUrl,
})

export default function ArcanaPage() {
  return (
    <main>
      <JsonLd data={pageGraph('arcana', [APP], 'WebPage', { mainEntity: { '@id': APP['@id'] } })} />
      <ArcanaHero />
      <ArcanaFeatures />
      <ArcanaCTA />
    </main>
  )
}
