import SiteShell from '@/components/SiteShell'
import JsonLd from '@/components/JsonLd'
import WebsitesView from '@/components/studio/WebsitesView'
import { pageMetadata } from '@/lib/seo'
import { faqPage, pageGraph, webDesignService } from '@/lib/structured-data'
import { websitesFaq } from '@/lib/websites-content'

export const metadata = pageMetadata('websites')

export default function WebsitesPage() {
  return (
    <SiteShell>
      <JsonLd data={pageGraph('websites', [webDesignService(), faqPage('websites', websitesFaq)])} />
      <WebsitesView />
    </SiteShell>
  )
}
