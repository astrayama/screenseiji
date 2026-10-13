import SiteShell, { PAGE_EYEBROW, PAGE_TITLE, PAGE_TITLE_SIZE, SECTION_TITLE } from '@/components/SiteShell'
import JsonLd from '@/components/JsonLd'
import { about } from '@/lib/about-content'
import { profileLinks, services } from '@/lib/data'
import { pageMetadata } from '@/lib/seo'
import { ORG_ID, founder, pageGraph, podcast } from '@/lib/structured-data'

export const metadata = pageMetadata('about')

// The pillars link to their own pages here (on the home page they scroll to sections)
const PILLARS = [
  ...services.map(s => ({
    title: s.title,
    description: s.description,
    label: s.cta.label,
    href: s.cta.href.startsWith('#') ? `/${s.cta.href.slice(1)}` : s.cta.href,
  })),
  {
    title: 'Websites',
    description: 'Websites for small businesses and creators — design, build, and launch, with booking, payments, and SEO built in.',
    label: 'See websites',
    href: '/websites',
  },
]

export default function AboutPage() {
  return (
    <SiteShell>
      <JsonLd
        data={pageGraph('about', [founder(), podcast()], 'AboutPage', {
          about: { '@id': ORG_ID },
          mainEntity: { '@id': ORG_ID },
        })}
      />
      <main className="mx-auto max-w-5xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <header className="max-w-3xl">
          <p className={PAGE_EYEBROW}>{about.eyebrow}</p>
          <h1 className={PAGE_TITLE} style={PAGE_TITLE_SIZE}>{about.title}</h1>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">{about.lead}</p>
        </header>

        <section aria-labelledby="meet-isa" className="mt-20 grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 id="meet-isa" className={SECTION_TITLE}>Meet Isa</h2>
          <div className="flex flex-col gap-5">
            {about.story.map(paragraph => (
              <p key={paragraph} className="text-base leading-8 text-muted">{paragraph}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="names" className="mt-20">
          <h2 id="names" className={SECTION_TITLE}>One studio, three names</h2>
          <dl className="mt-8 grid gap-5 md:grid-cols-3">
            {about.names.map(({ name, body }) => (
              <div key={name} className="glass rounded-3xl p-6">
                <dt className="font-display text-2xl font-medium text-gold">{name}</dt>
                <dd className="mt-2 text-sm leading-7 text-muted">{body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="pillars" className="mt-20">
          <h2 id="pillars" className={SECTION_TITLE}>What Screen Sage makes</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map(pillar => {
              const external = pillar.href.startsWith('http')
              return (
                <li key={pillar.title} className="glass flex flex-col gap-3 rounded-3xl p-6">
                  <h3 className="font-display text-2xl font-medium text-foreground">{pillar.title}</h3>
                  <p className="flex-1 text-sm leading-6 text-muted">{pillar.description}</p>
                  <a
                    href={pillar.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    className="text-sm font-semibold text-gold transition-colors hover:text-gold-bright"
                  >
                    {pillar.label} {external ? '↗' : '→'}
                  </a>
                </li>
              )
            })}
          </ul>
        </section>

        <section aria-labelledby="elsewhere" className="mt-20">
          <h2 id="elsewhere" className={SECTION_TITLE}>Find Screen Sage elsewhere</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{about.lineage}</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {profileLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="me noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground/85 transition-colors hover:text-foreground"
                >
                  {link.label}
                  <span className="text-xs text-muted">{link.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </SiteShell>
  )
}
