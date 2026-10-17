import SiteShell from '@/components/SiteShell'
import { CARD, CHIP, PAGE_EYEBROW, PAGE_TITLE, PAGE_TITLE_SIZE, SECTION_TITLE } from '@/components/ui'
import { Sparkle } from '@/components/brand/SkyArt'
import Philosophy from '@/components/about/Philosophy'
import JsonLd from '@/components/JsonLd'
import { about } from '@/lib/about-content'
import { profileLinks, services } from '@/lib/data'
import { pageMetadata } from '@/lib/seo'
import { ORG_ID, founder, pageGraph, podcast } from '@/lib/structured-data'
import { cn } from '@/lib/utils'

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
    description: 'Websites for small businesses and creators, with booking, payments, and SEO built in.',
    label: 'See websites',
    href: '/websites',
  },
]

const SECTION_H2 = cn(SECTION_TITLE, 'scroll-mt-28')
const CARD_TITLE = 'font-display text-[1.625rem] font-medium leading-tight text-plum-900'
const CARD_LINK =
  'inline-flex items-center gap-1.5 self-start text-sm font-bold text-plum-900 decoration-[1.5px] underline-offset-4 hover:underline sm:text-[15px]'

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
        <header className="relative max-w-3xl">
          <Sparkle className="-top-6 right-0 h-5 w-5 text-orchid sm:-right-10 sm:h-6 sm:w-6" twinkle />
          <p className={PAGE_EYEBROW}>{about.eyebrow}</p>
          <h1 className={PAGE_TITLE} style={PAGE_TITLE_SIZE}>{about.title}</h1>
          <p className="mt-6 text-base leading-8 text-plum-700 sm:text-lg">{about.lead}</p>
        </header>

        <section aria-labelledby="meet-isa" className="mt-20 grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 id="meet-isa" className={SECTION_H2}>Meet Isa</h2>
          <div className="flex flex-col gap-5">
            {about.story.map(paragraph => (
              <p key={paragraph} className="text-base leading-8 text-plum-700">{paragraph}</p>
            ))}
          </div>
        </section>

        <Philosophy className="mt-20" />

        <section aria-labelledby="names" className="mt-20">
          <h2 id="names" className={SECTION_H2}>One studio, three names</h2>
          <dl className="mt-8 grid gap-5 md:grid-cols-3">
            {about.names.map(({ name, body }) => (
              <div key={name} className={cn(CARD, 'p-6')}>
                <dt className={CARD_TITLE}>{name}</dt>
                <dd className="mt-2 text-sm leading-7 text-plum-700">{body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="pillars" className="mt-20">
          <h2 id="pillars" className={SECTION_H2}>What Screen Sage makes</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map(pillar => {
              const external = pillar.href.startsWith('http')
              return (
                <li key={pillar.title} className={cn(CARD, 'flex flex-col gap-3 p-6')}>
                  <h3 className={CARD_TITLE}>{pillar.title}</h3>
                  <p className="flex-1 text-sm leading-6 text-plum-700">{pillar.description}</p>
                  <a
                    href={pillar.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    className={CARD_LINK}
                  >
                    {pillar.label} <span aria-hidden>{external ? '↗' : '→'}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>

        <section aria-labelledby="elsewhere" className="mt-20">
          <h2 id="elsewhere" className={SECTION_H2}>Find Screen Sage elsewhere</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-plum-700">{about.lineage}</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {profileLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="me noreferrer"
                  className={cn(CHIP, 'gap-2')}
                >
                  {link.label}
                  <span className="text-xs font-semibold text-plum-700">{link.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </SiteShell>
  )
}
