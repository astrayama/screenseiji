import type { Metadata } from 'next'
import LegalDocument from '@/components/anicca/LegalDocument'
import { aniccaTerms } from '@/lib/anicca-content'
import { aniccaOpenGraph } from '../shared-metadata'

const DESCRIPTION =
  'The terms for using Anicca: what it is (and isn’t), your account, subscriptions, and your content.'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: DESCRIPTION,
  openGraph: {
    ...aniccaOpenGraph,
    title: 'Terms of Use · Anicca',
    description: DESCRIPTION,
    url: '/apps/anicca/terms',
  },
}

export default function AniccaTermsPage() {
  return (
    <LegalDocument
      eyebrow="Terms"
      title="Terms of Use"
      doc={aniccaTerms}
      aside={{ prompt: 'Questions about these terms?', label: 'Visit support →', href: '/apps/anicca/support' }}
    />
  )
}
