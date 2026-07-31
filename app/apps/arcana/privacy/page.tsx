import type { Metadata } from 'next'
import Link from 'next/link'
import { arcanaPrivacy } from '@/lib/arcana-content'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Arcana handles your data: local-first storage, optional sync, and no tracking — ever.',
}

export default function ArcanaPrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
      <p className="arcana-eyebrow">
        <span aria-hidden>✦</span> Privacy
      </p>
      <h1 className="mt-3 font-arcana-display text-4xl leading-[1.1] sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-arcana-faint">{arcanaPrivacy.effective}</p>

      <div className="mt-12 space-y-10">
        {arcanaPrivacy.sections.map(section => (
          <section key={section.title}>
            <h2 className="font-arcana-display text-2xl text-arcana-text">
              {section.title}
            </h2>
            {section.body.map((paragraph, i) => (
              <p key={i} className="mt-3 text-[15px] leading-7 text-arcana-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="arcana-glass mt-14 flex flex-wrap items-center justify-between gap-4 p-6">
        <p className="text-sm text-arcana-muted">
          Questions about your data?
        </p>
        <Link
          href="/apps/arcana/support"
          className="text-sm font-bold text-arcana-purple-soft transition-colors hover:text-arcana-text"
        >
          Visit support →
        </Link>
      </div>
    </main>
  )
}
