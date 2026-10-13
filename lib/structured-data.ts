import type { FaqItem } from '@/lib/app-content'
import { apps, intakePackages, liveReading, profileLinks, socialLinks, studio } from '@/lib/data'
import { PAGES, breadcrumbTrail, type PageKey } from '@/lib/routes'
import {
  ALT_NAMES, EMAIL, FOUNDER, ORG_NAME, SITE_ALT_NAMES, SITE_NAME, SITE_URL, TAGLINE, absoluteUrl,
} from '@/lib/site'

// Schema.org structured data, rendered by components/JsonLd.tsx. This is how
// search engines learn that Screen Sage, Screen Sage Studios and screenseiji
// are one entity, which profiles belong to it, and what each page offers.
// Every page gets one @graph; nodes link to each other by stable @id.
// Never invent facts here (ratings, reviews, addresses) — only what the site says.

type Node = Record<string, unknown>

/** The organization's @id — point a page's about/mainEntity at it with { '@id': ORG_ID }. */
export const ORG_ID = `${SITE_URL}/#organization`
const FOUNDER_ID = `${SITE_URL}/#founder`
const WEBSITE_ID = `${SITE_URL}/#website`

const pageUrl = (key: PageKey) => absoluteUrl(PAGES[key].path)
const ref = (id: string) => ({ '@id': id })

export function graph(...nodes: Node[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}

// ─── The entity ─────────────────────────────────────────────────────────────

/** The full organization — on the home page, where Google reads it. */
export function organization(): Node {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: ORG_NAME,
    alternateName: ALT_NAMES,
    url: absoluteUrl('/'),
    logo: { '@type': 'ImageObject', url: absoluteUrl('/icon.png'), width: 256, height: 256 },
    description: PAGES.home.description,
    slogan: TAGLINE,
    email: EMAIL,
    founder: ref(FOUNDER_ID),
    sameAs: profileLinks.map(link => link.href),
    knowsAbout: [
      'Tarot', 'Anime edits', 'Anime philosophy', 'Japanese culture', 'Video essays',
      'Buddhist philosophy', 'Jungian psychology', 'Mindfulness', 'Mindful gaming',
      'iOS apps', 'Virtual and mixed reality', 'Web design',
    ],
  }
}

/**
 * A short stand-in for the organization on other pages: Google reads each
 * page on its own, so a bare @id reference wouldn't tell it whose page it is.
 */
export function organizationRef(): Node {
  return { '@type': 'Organization', '@id': ORG_ID, name: ORG_NAME, alternateName: ALT_NAMES, url: absoluteUrl('/') }
}

export function founder(): Node {
  return { '@type': 'Person', '@id': FOUNDER_ID, name: FOUNDER, url: absoluteUrl('/about'), worksFor: ref(ORG_ID) }
}

/** The website — its name and alternateName are what Google may show as the site name. */
export function website(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    alternateName: SITE_ALT_NAMES,
    url: absoluteUrl('/'),
    inLanguage: 'en',
    publisher: ref(ORG_ID),
  }
}

// ─── Pages ──────────────────────────────────────────────────────────────────

export function breadcrumbs(key: PageKey): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl(key)}#breadcrumb`,
    itemListElement: breadcrumbTrail(key).map((page, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: page.crumb,
      item: absoluteUrl(page.path),
    })),
  }
}

export function webPage(key: PageKey, type = 'WebPage', extra: Node = {}): Node {
  const { title, description } = PAGES[key]
  return {
    '@type': type,
    '@id': `${pageUrl(key)}#webpage`,
    url: pageUrl(key),
    name: title,
    description,
    inLanguage: 'en',
    isPartOf: ref(WEBSITE_ID),
    publisher: ref(ORG_ID),
    ...(key !== 'home' && { breadcrumb: ref(`${pageUrl(key)}#breadcrumb`) }),
    ...extra,
  }
}

/** The home page: the whole entity, the site, and the founder. */
export function homeGraph() {
  return graph(organization(), founder(), website(), webPage('home', 'WebPage', { about: ref(ORG_ID) }))
}

/** Any other page: who publishes it, the page, its breadcrumbs, and anything page-specific. */
export function pageGraph(key: PageKey, extra: Node[] = [], pageType = 'WebPage', pageExtra: Node = {}) {
  return graph(organizationRef(), webPage(key, pageType, pageExtra), breadcrumbs(key), ...extra)
}

export function faqPage(key: PageKey, items: FaqItem[]): Node {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl(key)}#faq`,
    isPartOf: ref(`${pageUrl(key)}#webpage`),
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

// ─── What's offered ─────────────────────────────────────────────────────────

const usd = (price: string) => price.replace(/[^0-9.]/g, '')

function offer(name: string, price: string, description: string, url: string): Node {
  return { '@type': 'Offer', name, description, price: usd(price), priceCurrency: 'USD', url }
}

export function tarotService(): Node {
  const { written, video } = intakePackages
  const url = pageUrl('tarot')
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'Tarot readings',
    serviceType: 'Tarot reading',
    description: PAGES.tarot.description,
    provider: ref(ORG_ID),
    areaServed: 'Worldwide',
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: url },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tarot readings',
      itemListElement: [
        offer(written.title, written.price, written.description, url),
        offer(video.title, video.price, video.description, url),
        ...liveReading.tiers.map(tier =>
          offer(`Live reading · ${tier.label}`, tier.price, 'By voice call, video call, or in VR.', url),
        ),
      ],
    },
  }
}

export function webDesignService(): Node {
  const url = pageUrl('websites')
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'Websites for small businesses',
    serviceType: 'Web design',
    description: PAGES.websites.description,
    provider: ref(ORG_ID),
    areaServed: 'Worldwide',
    audience: { '@type': 'BusinessAudience', name: 'Small businesses and creators' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website services',
      itemListElement: studio.services.map(service => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.description },
      })),
    },
  }
}

interface MobileAppFacts {
  key: PageKey
  name: string
  version: string
  /** e.g. "iOS 17" */
  requires: string
  /** Real App Store URL, once the listing is live. */
  installUrl?: string
  offers?: { name: string; price: string; description: string }[]
}

export function mobileApplication({ key, name, version, requires, installUrl, offers }: MobileAppFacts): Node {
  const url = pageUrl(key)
  return {
    '@type': 'MobileApplication',
    '@id': `${url}#app`,
    name,
    description: PAGES[key].description,
    url,
    operatingSystem: `${requires} or later`,
    applicationCategory: 'LifestyleApplication',
    softwareVersion: version,
    publisher: ref(ORG_ID),
    ...(installUrl && { installUrl }),
    ...(offers && { offers: offers.map(o => offer(o.name, o.price, o.description, url)) }),
  }
}

/** All seven apps, in the order the site shows them. */
export function appList(): Node {
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl('apps')}#list`,
    name: 'Screen Sage apps',
    numberOfItems: apps.length,
    itemListElement: apps.map((app, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: app.name,
      description: app.summary,
      url: app.href ? (app.href.startsWith('/') ? absoluteUrl(app.href) : app.href) : `${pageUrl('apps')}#${app.id}`,
    })),
  }
}

/** The podcast, from its listing links. */
export function podcast(): Node {
  const [first, ...rest] = socialLinks.listen
  return {
    '@type': 'PodcastSeries',
    name: first.handle,
    url: first.href,
    sameAs: rest.map(link => link.href),
    publisher: ref(ORG_ID),
  }
}
