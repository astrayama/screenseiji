import LegalDocument from '@/components/anicca/LegalDocument'
import JsonLd from '@/components/JsonLd'
import { aniccaTerms } from '@/lib/anicca-content'
import { pageMetadata } from '@/lib/seo'
import { pageGraph } from '@/lib/structured-data'

export const metadata = pageMetadata('aniccaTerms')

export default function AniccaTermsPage() {
  return (
    <>
      <JsonLd data={pageGraph('aniccaTerms')} />
      <LegalDocument
        eyebrow="Terms"
        title="Terms of Use"
        doc={aniccaTerms}
        aside={{ prompt: 'Questions about these terms?', label: 'Visit support →', href: '/apps/anicca/support' }}
      />
    </>
  )
}
