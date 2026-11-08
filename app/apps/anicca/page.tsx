import AniccaHero from '@/components/anicca/AniccaHero'
import AniccaFeatures from '@/components/anicca/AniccaFeatures'
import AniccaPricing from '@/components/anicca/AniccaPricing'
import AniccaCTA from '@/components/anicca/AniccaCTA'
import JsonLd from '@/components/JsonLd'
import { aniccaLinks } from '@/lib/data'
import { aniccaApp, aniccaPlans } from '@/lib/anicca-content'
import { RECOVERY_FORWARD_SCRIPT } from '@/lib/anicca-reset'
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
      {/* Reset links that fell back to this page (the Site URL) go on to the reset page. */}
      <script dangerouslySetInnerHTML={{ __html: RECOVERY_FORWARD_SCRIPT }} />
      <JsonLd data={pageGraph('anicca', [APP], 'WebPage', { mainEntity: { '@id': APP['@id'] } })} />
      <AniccaHero />
      <AniccaFeatures />
      <AniccaPricing />
      <AniccaCTA />
    </main>
  )
}
