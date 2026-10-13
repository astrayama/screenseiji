import AniccaHero from '@/components/anicca/AniccaHero'
import AniccaFeatures from '@/components/anicca/AniccaFeatures'
import AniccaPricing from '@/components/anicca/AniccaPricing'
import AniccaCTA from '@/components/anicca/AniccaCTA'
import JsonLd from '@/components/JsonLd'
import { aniccaLinks } from '@/lib/data'
import { aniccaApp, aniccaPlans } from '@/lib/anicca-content'
import { pageMetadata } from '@/lib/seo'
import { mobileApplication, pageGraph } from '@/lib/structured-data'

export const metadata = pageMetadata('anicca')

const APP = mobileApplication({
  key: 'anicca',
  name: 'Anicca',
  version: aniccaApp.version,
  requires: aniccaApp.requires,
  installUrl: aniccaLinks.appStorePlaceholder ? undefined : aniccaLinks.appStoreUrl,
  offers: aniccaPlans.map(plan => ({
    name: plan.name,
    price: plan.price,
    description: [plan.cadence && `${plan.price}${plan.cadence}`, plan.yearly, plan.blurb].filter(Boolean).join(' · '),
  })),
})

export default function AniccaPage() {
  return (
    <main>
      <JsonLd data={pageGraph('anicca', [APP], 'WebPage', { mainEntity: { '@id': APP['@id'] } })} />
      <AniccaHero />
      <AniccaFeatures />
      <AniccaPricing />
      <AniccaCTA />
    </main>
  )
}
