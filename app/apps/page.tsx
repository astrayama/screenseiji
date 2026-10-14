import SiteShell from '@/components/SiteShell'
import { CARD, PAGE_EYEBROW, PAGE_TITLE, PAGE_TITLE_SIZE, TAG } from '@/components/ui'
import { Sparkle } from '@/components/brand/SkyArt'
import JsonLd from '@/components/JsonLd'
import WaitlistButton from '@/components/WaitlistButton'
import { apps, appStatusText, type AppNode, type LabeledLink } from '@/lib/data'
import { practice } from '@/lib/home-content'
import { pageMetadata } from '@/lib/seo'
import { appList, pageGraph } from '@/lib/structured-data'
import { cn } from '@/lib/utils'

export const metadata = pageMetadata('apps')

const LIST = appList()

// Letter-badge tints: the home page's for the apps it features, then these.
const TINTS: Record<string, string> = {
  anicca: 'bg-glow',
  kairos: 'bg-lilac',
  sunya: 'bg-blush',
  ...Object.fromEntries(practice.cards.map(card => [card.id, card.tint])),
}

const LINK =
  'inline-flex items-center gap-1.5 text-sm font-bold text-plum-900 decoration-[1.5px] underline-offset-4 hover:underline sm:text-[15px]'

/** Every way into an app: its versions, its page, and any public beta. */
function appLinks(app: AppNode): LabeledLink[] {
  if (app.links) return app.links
  const links: LabeledLink[] = []
  if (app.href) {
    links.push({ label: app.href.startsWith('/') ? `About ${app.name}` : `Open ${app.name}`, href: app.href })
  }
  if (app.tryUrl && app.tryUrl !== app.href) links.push({ label: appStatusText(app), href: app.tryUrl })
  return links
}

// The app hub: all seven apps as plain, crawlable cards (the home page shows
// the ones in beta as cards too).
export default function AppsPage() {
  return (
    <SiteShell>
      <JsonLd data={pageGraph('apps', [LIST], 'CollectionPage', { mainEntity: { '@id': LIST['@id'] } })} />
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <header className="relative max-w-3xl">
          <Sparkle className="-top-6 right-0 h-5 w-5 text-orchid sm:-right-10 sm:h-6 sm:w-6" twinkle />
          <p className={PAGE_EYEBROW}>The App Universe</p>
          <h1 className={PAGE_TITLE} style={PAGE_TITLE_SIZE}>Screen Sage apps</h1>
          <p className="mt-6 text-base leading-8 text-plum-700 sm:text-lg">
            Seven tools, one philosophy. Each app is named after the concept it embodies — a
            constellation of software for seekers, from tarot and journaling to breathwork, built
            by Screen Sage Studios.
          </p>
        </header>

        <ul className="mt-16 grid gap-5 md:grid-cols-2">
          {apps.map(app => {
            const links = appLinks(app)
            return (
              <li key={app.id} id={app.id} className={cn(CARD, 'flex scroll-mt-28 flex-col p-6 sm:p-7')}>
                <div className="flex items-start justify-between gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      'flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-[1.75rem] font-medium text-plum-900',
                      TINTS[app.id] ?? 'bg-blush',
                    )}
                  >
                    {app.name[0]}
                  </span>
                  <span className="mt-1.5 rounded-full bg-blush/70 px-2.5 py-1 text-xs font-bold text-plum-900">
                    {app.platform}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-[1.75rem] font-medium leading-tight text-plum-900 sm:text-[1.875rem]">
                  {app.name}
                </h2>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-plum-500">{app.concept}</p>
                <p className="mt-3 flex-1 text-[15px] leading-7 text-plum-700">{app.summary}</p>
                <div className="mt-5 border-t border-mist pt-4">
                  <p className={TAG}>{appStatusText(app)}</p>
                  {(app.waitlist || links.length > 0) && (
                    <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2">
                      {app.waitlist && (
                        <WaitlistButton appId={app.id} appName={app.name} className={LINK}>
                          Join the waitlist <span aria-hidden>→</span>
                        </WaitlistButton>
                      )}
                      {links.map(link => {
                        const external = !link.href.startsWith('/')
                        return (
                          <a
                            key={link.href}
                            href={link.href}
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noreferrer' : undefined}
                            className={LINK}
                          >
                            {link.label} <span aria-hidden>{external ? '↗' : '→'}</span>
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </main>
    </SiteShell>
  )
}
