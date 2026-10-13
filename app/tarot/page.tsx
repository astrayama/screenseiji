import SiteShell, { PAGE_EYEBROW, PAGE_TITLE, PAGE_TITLE_SIZE, SECTION_TITLE } from '@/components/SiteShell'
import JsonLd from '@/components/JsonLd'
import SiteFaq from '@/components/SiteFaq'
import Tarot from '@/components/sections/Tarot'
import { apps } from '@/lib/data'
import { pageMetadata } from '@/lib/seo'
import { faqPage, pageGraph, tarotService } from '@/lib/structured-data'
import { tarotFaq, tarotIntro } from '@/lib/tarot-content'

export const metadata = pageMetadata('tarot')

// The two tarot apps, for reading on your own
const TAROT_APPS = apps.filter(app => app.id === 'arcana' || app.id === 'cartaluna')

export default function TarotPage() {
  return (
    <SiteShell>
      <JsonLd data={pageGraph('tarot', [tarotService(), faqPage('tarot', tarotFaq)])} />
      <main className="pb-24 pt-32 sm:pt-40">
        <header className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className={PAGE_EYEBROW}>{tarotIntro.eyebrow}</p>
            <h1 className={PAGE_TITLE} style={PAGE_TITLE_SIZE}>{tarotIntro.title}</h1>
            {tarotIntro.lead.map(paragraph => (
              <p key={paragraph} className="mt-6 text-base leading-8 text-muted sm:text-lg">{paragraph}</p>
            ))}
          </div>
        </header>

        {/* The packages and booking, shared with the home page */}
        <Tarot showMoreLink={false} className="pb-20 pt-16" />

        <section aria-labelledby="tarot-faq" className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 id="tarot-faq" className={SECTION_TITLE}>Questions about readings</h2>
          <div className="mt-8">
            <SiteFaq items={tarotFaq} idPrefix="tarot-faq-panel" />
          </div>
        </section>

        <section aria-labelledby="tarot-apps" className="mx-auto mt-20 max-w-4xl px-5 sm:px-8">
          <h2 id="tarot-apps" className={SECTION_TITLE}>Read for yourself</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {TAROT_APPS.map(app => {
              const external = !app.href?.startsWith('/')
              return (
                <li key={app.id} className="glass flex flex-col gap-2 rounded-3xl p-6">
                  <h3 className="font-display text-2xl font-medium text-foreground">{app.name}</h3>
                  <p className="flex-1 text-sm leading-6 text-muted">{app.summary}</p>
                  {app.href && (
                    <a
                      href={app.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="text-sm font-semibold text-gold transition-colors hover:text-gold-bright"
                    >
                      {external ? `Try ${app.name} ↗` : `About ${app.name} →`}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      </main>
    </SiteShell>
  )
}
