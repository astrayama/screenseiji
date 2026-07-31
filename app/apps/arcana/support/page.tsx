import type { Metadata } from 'next'
import Link from 'next/link'
import ContactCards from '@/components/arcana/ContactCards'
import FaqAccordion from '@/components/arcana/FaqAccordion'

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Help, FAQs, and contact for Arcana — the tarot journal by Screen Sage Studios.',
}

export default function ArcanaSupportPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
      <p className="arcana-eyebrow">
        <span aria-hidden>✦</span> Support
      </p>
      <h1 className="mt-3 font-arcana-display text-4xl leading-[1.1] sm:text-5xl">
        How can we help?
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-arcana-muted">
        Real answers from the person who builds Arcana. Reach out directly, or see
        if your question is already answered below.
      </p>

      <div className="mt-12">
        <ContactCards />
      </div>

      <h2 className="arcana-eyebrow mt-16">Frequently asked</h2>
      <div className="mt-5">
        <FaqAccordion />
      </div>

      <div className="arcana-glass mt-10 flex flex-wrap items-center justify-between gap-4 p-6">
        <p className="text-sm text-arcana-muted">
          Looking for how Arcana handles your data?
        </p>
        <Link
          href="/apps/arcana/privacy"
          className="text-sm font-bold text-arcana-purple-soft transition-colors hover:text-arcana-text"
        >
          Read the privacy policy →
        </Link>
      </div>

      <p className="mt-10 text-center text-xs text-arcana-faint">
        Arcana 1.0.0 · Requires iOS 17 or later
      </p>
    </main>
  )
}
