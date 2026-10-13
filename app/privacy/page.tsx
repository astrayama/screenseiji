import SiteShell from '@/components/SiteShell'
import SiteLegalDocument from '@/components/SiteLegalDocument'
import JsonLd from '@/components/JsonLd'
import { sitePrivacy } from '@/lib/privacy-content'
import { pageMetadata } from '@/lib/seo'
import { pageGraph } from '@/lib/structured-data'

export const metadata = pageMetadata('privacy')

export default function PrivacyPage() {
  return (
    <SiteShell>
      <JsonLd data={pageGraph('privacy')} />
      <SiteLegalDocument
        eyebrow="Privacy"
        title="Privacy Policy"
        doc={sitePrivacy}
        aside={{ prompt: 'Questions about your data?', label: 'Get in touch →', href: '/#contact' }}
      />
    </SiteShell>
  )
}
