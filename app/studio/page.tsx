import SiteShell from '@/components/SiteShell'
import JsonLd from '@/components/JsonLd'
import SiteFaq from '@/components/SiteFaq'
import StudioContact from '@/components/studio/StudioContact'
import StudioFinePrint from '@/components/studio/StudioFinePrint'
import StudioHero from '@/components/studio/StudioHero'
import { StudioInquiryProvider } from '@/components/studio/StudioInquiry'
import StudioPackages from '@/components/studio/StudioPackages'
import StudioSteps from '@/components/studio/StudioSteps'
import StudioTitle from '@/components/studio/StudioTitle'
import StudioWork from '@/components/studio/StudioWork'
import { CONTAINER, EYEBROW } from '@/components/ui'
import { pageMetadata } from '@/lib/seo'
import { faqPage, pageGraph, studioService } from '@/lib/structured-data'
import { studioFaq } from '@/lib/studio-content'

export const metadata = pageMetadata('studio')

// Studio Services: websites and a full online presence for local shops.
// The old /websites page redirects here (next.config.ts).
export default function StudioPage() {
  return (
    <SiteShell>
      <JsonLd data={pageGraph('studio', [studioService(), faqPage('studio', studioFaq)])} />
      <StudioInquiryProvider>
        <main>
          <StudioHero />
          <StudioPackages />
          <StudioSteps />
          <StudioWork />
          <StudioFinePrint />
          <section aria-labelledby="studio-faq" className={`${CONTAINER} max-w-4xl py-16 sm:py-24`}>
            <p className={EYEBROW}>Questions</p>
            <StudioTitle id="studio-faq" parts={['Questions about', 'websites']} className="mt-3" />
            <div className="mt-8">
              <SiteFaq items={studioFaq} idPrefix="studio-faq-panel" />
            </div>
          </section>
          <StudioContact />
        </main>
      </StudioInquiryProvider>
    </SiteShell>
  )
}
