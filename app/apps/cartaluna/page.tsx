import CartalunaHero from '@/components/cartaluna/CartalunaHero'
import CartalunaFeatures from '@/components/cartaluna/CartalunaFeatures'
import CartalunaTogether from '@/components/cartaluna/CartalunaTogether'
import CartalunaPrivacy from '@/components/cartaluna/CartalunaPrivacy'
import CartalunaHelp from '@/components/cartaluna/CartalunaHelp'
import CartalunaCTA from '@/components/cartaluna/CartalunaCTA'
import JsonLd from '@/components/JsonLd'
import { cartalunaLinks } from '@/lib/data'
import { cartalunaFaq } from '@/lib/cartaluna-content'
import { pageMetadata } from '@/lib/seo'
import { faqPage, pageGraph, webApplication } from '@/lib/structured-data'

export const metadata = pageMetadata('cartaluna')

// A web app: no store listing, version or price to state
const APP = webApplication({
  key: 'cartaluna',
  name: 'Carta Luna',
  appUrl: cartalunaLinks.appUrl,
  browserRequirements:
    'Requires WebXR with mixed reality (immersive-ar). Built for the Quest Browser on Meta Quest 3; other browsers can watch a shared reading.',
  featureList: [
    'A tarot deck on your real table, in mixed reality',
    'Shuffle, draw and turn cards with your hands or controllers',
    'Seven spreads, plus spreads you make',
    'Read together with a six-digit room code',
    'Watch a shared reading on a phone or computer',
  ],
})

export default function CartalunaPage() {
  return (
    <main>
      <JsonLd
        data={pageGraph('cartaluna', [APP, faqPage('cartaluna', cartalunaFaq)], 'WebPage', {
          mainEntity: { '@id': APP['@id'] },
        })}
      />
      <CartalunaHero />
      <CartalunaFeatures />
      <CartalunaTogether />
      <CartalunaPrivacy />
      <CartalunaHelp />
      <CartalunaCTA />
    </main>
  )
}
