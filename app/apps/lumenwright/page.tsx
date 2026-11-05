import LumenwrightHero from '@/components/lumenwright/LumenwrightHero'
import {
  LumenwrightHollows,
  LumenwrightRun,
  LumenwrightSigns,
  LumenwrightTemperaments,
} from '@/components/lumenwright/LumenwrightGame'
import { LumenwrightDevlog, LumenwrightPlanned, LumenwrightPrivacy } from '@/components/lumenwright/LumenwrightMore'
import { LumenwrightCTA, LumenwrightHelp } from '@/components/lumenwright/LumenwrightHelp'
import JsonLd from '@/components/JsonLd'
import { lumenwrightLinks } from '@/lib/data'
import { lumenwrightFaq } from '@/lib/lumenwright-content'
import { pageMetadata } from '@/lib/seo'
import { faqPage, pageGraph, webApplication } from '@/lib/structured-data'

export const metadata = pageMetadata('lumenwright')

// A web game: no store listing, version or price to state
const APP = webApplication({
  key: 'lumenwright',
  name: 'Lumenwright',
  appUrl: lumenwrightLinks.appUrl,
  category: 'GameApplication',
  browserRequirements:
    'Requires WebXR with hand tracking. Built for the Quest Browser on Meta Quest 3 and 3S.',
  featureList: [
    'Five hand signs that form constructs of hard light',
    'Two temperaments, Resolve and Fury',
    'Play in mixed reality in your own room, or in a virtual arena',
    'Seated or standing, with no walking',
    'Reduce flashing and high-contrast settings',
  ],
})

export default function LumenwrightPage() {
  return (
    <main>
      <JsonLd
        data={pageGraph('lumenwright', [APP, faqPage('lumenwright', lumenwrightFaq)], 'WebPage', {
          mainEntity: { '@id': APP['@id'] },
        })}
      />
      <LumenwrightHero />
      <LumenwrightTemperaments />
      <LumenwrightSigns />
      <LumenwrightHollows />
      <LumenwrightRun />
      <LumenwrightDevlog />
      <LumenwrightPlanned />
      <LumenwrightPrivacy />
      <LumenwrightHelp />
      <LumenwrightCTA />
    </main>
  )
}
