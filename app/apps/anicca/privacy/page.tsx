import LegalDocument from '@/components/anicca/LegalDocument'
import JsonLd from '@/components/JsonLd'
import { aniccaPrivacy } from '@/lib/anicca-content'
import { pageMetadata } from '@/lib/seo'
import { pageGraph } from '@/lib/structured-data'

export const metadata = pageMetadata('aniccaPrivacy')

export default function AniccaPrivacyPage() {
  return (
    <>
      <JsonLd data={pageGraph('aniccaPrivacy')} />
      <LegalDocument
        eyebrow="Privacy"
        title="Privacy Policy"
        doc={aniccaPrivacy}
        aside={{ prompt: 'Questions about your data?', label: 'Visit support →', href: '/apps/anicca/support' }}
      />
    </>
  )
}
