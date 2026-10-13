import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import ContactCards from '@/components/anicca/ContactCards'
import FaqAccordion from '@/components/anicca/FaqAccordion'
import { aniccaApp, aniccaFaq } from '@/lib/anicca-content'
import { pageMetadata } from '@/lib/seo'
import { faqPage, pageGraph } from '@/lib/structured-data'

export const metadata = pageMetadata('aniccaSupport')

export default function AniccaSupportPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
      <JsonLd data={pageGraph('aniccaSupport', [faqPage('aniccaSupport', aniccaFaq)])} />
      <p className="anicca-eyebrow">Support</p>
      <h1 className="mt-3 font-anicca-display text-4xl leading-[1.1] text-anicca-ink sm:text-5xl">
        How can we help?
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-anicca-body">
        Real answers from the person who builds Anicca. Reach out directly, or see
        if your question is already answered below.
      </p>

      <div className="mt-12">
        <ContactCards />
      </div>

      <h2 className="anicca-eyebrow mt-16">Frequently asked</h2>
      <div className="mt-5">
        <FaqAccordion />
      </div>

      <div className="anicca-card mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 p-6">
        <p className="text-sm text-anicca-muted">
          Looking for how Anicca handles your data?
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href="/apps/anicca/privacy"
            className="rounded-sm text-sm font-bold text-anicca-violet-deep transition-colors hover:text-anicca-ink"
          >
            Read the privacy policy →
          </Link>
          <Link
            href="/apps/anicca/terms"
            className="rounded-sm text-sm font-bold text-anicca-violet-deep transition-colors hover:text-anicca-ink"
          >
            Terms of use →
          </Link>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-anicca-body">
        Anicca {aniccaApp.version} · Requires {aniccaApp.requires} or later
      </p>
    </main>
  )
}
