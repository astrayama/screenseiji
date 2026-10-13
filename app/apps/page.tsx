import SiteShell, { PAGE_EYEBROW, PAGE_TITLE, PAGE_TITLE_SIZE } from '@/components/SiteShell'
import JsonLd from '@/components/JsonLd'
import { apps, appStatusText, type AppNode, type LabeledLink } from '@/lib/data'
import { pageMetadata } from '@/lib/seo'
import { appList, pageGraph } from '@/lib/structured-data'

export const metadata = pageMetadata('apps')

const LIST = appList()

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
// them as an interactive constellation).
export default function AppsPage() {
  return (
    <SiteShell>
      <JsonLd data={pageGraph('apps', [LIST], 'CollectionPage', { mainEntity: { '@id': LIST['@id'] } })} />
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <header className="max-w-3xl">
          <p className={PAGE_EYEBROW}>The App Universe</p>
          <h1 className={PAGE_TITLE} style={PAGE_TITLE_SIZE}>Screen Sage apps</h1>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            Seven tools, one philosophy. Each app is named after the concept it embodies — a
            constellation of software for seekers, from tarot and journaling to breathwork, built
            by Screen Sage Studios.
          </p>
        </header>

        <ul className="mt-16 grid gap-5 md:grid-cols-2">
          {apps.map(app => (
            <li key={app.id} id={app.id} className="glass flex scroll-mt-28 flex-col gap-3 rounded-3xl p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                {app.platform} · {appStatusText(app)}
              </p>
              <h2 className="font-display text-3xl font-light text-foreground">{app.name}</h2>
              <p className="text-xs uppercase tracking-[0.14em] text-muted/70">{app.concept}</p>
              <p className="flex-1 text-sm leading-7 text-muted">{app.summary}</p>
              {appLinks(app).length > 0 && (
                <p className="mt-1 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                  {appLinks(app).map(link => {
                    const external = !link.href.startsWith('/')
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer' : undefined}
                        className="text-gold transition-colors hover:text-gold-bright"
                      >
                        {link.label} {external ? '↗' : '→'}
                      </a>
                    )
                  })}
                </p>
              )}
            </li>
          ))}
        </ul>
      </main>
    </SiteShell>
  )
}
