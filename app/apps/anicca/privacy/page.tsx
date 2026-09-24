import type { Metadata } from 'next'
import LegalDocument from '@/components/anicca/LegalDocument'
import { aniccaPrivacy } from '@/lib/anicca-content'
import { aniccaOpenGraph } from '../shared-metadata'

const DESCRIPTION =
  'How Anicca handles your data: on-device emotion matching, a private synced account, and no ads or tracking — ever.'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: DESCRIPTION,
  openGraph: {
    ...aniccaOpenGraph,
    title: 'Privacy Policy · Anicca',
    description: DESCRIPTION,
    url: '/apps/anicca/privacy',
  },
}

export default function AniccaPrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Privacy"
      title="Privacy Policy"
      doc={aniccaPrivacy}
      aside={{ prompt: 'Questions about your data?', label: 'Visit support →', href: '/apps/anicca/support' }}
    />
  )
}
