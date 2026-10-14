// Every page, in one registry: titles, descriptions, sitemap priority,
// breadcrumbs and share-card text all come from here. Pages marked `noindex`
// (the Sanctum) stay out of search, the sitemap and llms.txt.
// No imports and type-only TypeScript, so `npm test` can load it directly
// (lib/routes.test.mjs checks lengths, uniqueness and that every page is here).

export type OgTheme = 'site' | 'arcana' | 'anicca'

export interface PageEntry {
  path: string
  /** Full <title>, used as-is (title.absolute): ≤ 60 characters. */
  title: string
  /** Meta description: 70–160 characters. */
  description: string
  /** Sitemap priority, 0–1. */
  priority: number
  /** Short name for breadcrumbs. */
  crumb: string
  /** Registry key of the page one level up. */
  parent?: string
  /** Share-card text. */
  og: { eyebrow: string; title: string; subtitle?: string; theme: OgTheme }
  /** Keep out of search engines, the sitemap and llms.txt. */
  noindex?: boolean
}

export const PAGES = {
  home: {
    path: '/',
    title: 'Screen Sage Studios — Tarot, Anime Philosophy & Apps',
    description:
      'Screen Sage Studios (@screenseiji): anime edits & philosophy essays, tarot readings, mindful iOS apps, and websites for small businesses — by Isa.',
    priority: 1,
    crumb: 'Home',
    og: {
      eyebrow: 'Screen Sage Studios',
      title: 'Where spirituality, science, and story collide.',
      subtitle: 'Tarot · anime edits & philosophy · apps for seekers · websites',
      theme: 'site',
    },
  },
  about: {
    path: '/about',
    title: 'About Screen Sage Studios — Meet Isa',
    description:
      "Screen Sage Studios is Isa's one-person studio where spirituality, science, and story collide: tarot, anime, indie apps, and web design.",
    priority: 0.8,
    crumb: 'About',
    parent: 'home',
    og: {
      eyebrow: 'About',
      title: 'Screen Sage Studios',
      subtitle: 'Spirituality, science, and story — by Isa (@screenseiji)',
      theme: 'site',
    },
  },
  apps: {
    path: '/apps',
    title: 'Screen Sage Apps — Tarot, Journaling & Mindfulness Tools',
    description:
      'Seven apps from Screen Sage Studios, each named for the concept it embodies — Arcana tarot journal, Anicca mood journal, Yggdrasil, Carta Luna, and more.',
    priority: 0.9,
    crumb: 'Apps',
    parent: 'home',
    og: {
      eyebrow: 'The App Universe',
      title: 'Seven tools. One philosophy.',
      subtitle: 'Yggdrasil · Arcana · Carta Luna · Lumenwright · Anicca · Kairos · Sunya',
      theme: 'site',
    },
  },
  tarot: {
    path: '/tarot',
    title: 'Tarot Readings Online — Written, Video & Live · Screen Sage',
    description:
      'Tarot as a mirror, not a forecast. Book a written, recorded video, or live tarot reading — by voice, video call, or VR — with Isa of Screen Sage Studios.',
    priority: 0.9,
    crumb: 'Tarot readings',
    parent: 'home',
    og: {
      eyebrow: 'Tarot readings',
      title: 'A mirror, not a forecast.',
      subtitle: 'Written · recorded video · live by voice, video call, or VR',
      theme: 'site',
    },
  },
  websites: {
    path: '/websites',
    title: 'Websites for Small Businesses — Screen Sage Studios',
    description:
      'Landing pages, business websites, and custom features like booking and Stripe payments — designed and built by Screen Sage Studios for small businesses.',
    priority: 0.8,
    crumb: 'Websites',
    parent: 'home',
    og: {
      eyebrow: 'Screen Sage Studios · Websites',
      title: 'Websites for small businesses and more.',
      subtitle: 'Landing pages · business websites · booking & payments',
      theme: 'site',
    },
  },
  sideQuests: {
    path: '/side-quests',
    title: 'Side Quests — What Isa Is Building Now · Screen Sage',
    description:
      'The Screen Sage Studios quest log: the apps, videos, and experiments Isa is building right now, with milestones and a day-by-day build log.',
    priority: 0.7,
    crumb: 'Side Quests',
    parent: 'home',
    og: {
      eyebrow: 'Side Quests',
      title: 'What Isa is building right now.',
      subtitle: 'Quest cards and a day-by-day build log',
      theme: 'site',
    },
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy · Screen Sage',
    description:
      'How the Screen Sage site handles your data: Google Analytics, Vercel Web Analytics, form emails via Resend, Stripe checkout, and the Ko-fi widget.',
    priority: 0.3,
    crumb: 'Privacy',
    parent: 'home',
    og: {
      eyebrow: 'Privacy',
      title: 'Privacy Policy',
      subtitle: 'How the Screen Sage site handles your data',
      theme: 'site',
    },
  },
  sanctum: {
    path: '/sanctum',
    title: 'The Sanctum · Screen Sage',
    description:
      'A private corner of the Screen Sage site: developer links and resources, kept behind a word of passage. Some doors require a key.',
    priority: 0,
    crumb: 'The Sanctum',
    parent: 'home',
    noindex: true,
    og: { eyebrow: 'The Sanctum', title: 'Some doors require a key.', theme: 'site' },
  },
  arcana: {
    path: '/apps/arcana',
    title: 'Arcana — Tarot Journal App for iPhone · Screen Sage',
    description:
      'A warm, quiet tarot journal for iPhone: log every pull and spread in 10 seconds, with meaning hints for all 78 cards and beautiful exports.',
    priority: 0.9,
    crumb: 'Arcana',
    parent: 'apps',
    og: {
      eyebrow: 'Arcana · Tarot journal for iPhone',
      title: 'Give your tarot cards a home.',
      subtitle: 'Every pull, every spread, every thought — kept safe.',
      theme: 'arcana',
    },
  },
  arcanaSupport: {
    path: '/apps/arcana/support',
    title: 'Support & FAQ · Arcana Tarot Journal',
    description: 'Help, FAQs, and contact for Arcana — the tarot journal by Screen Sage Studios.',
    priority: 0.5,
    crumb: 'Support',
    parent: 'arcana',
    og: { eyebrow: 'Arcana · Support', title: 'How can we help?', subtitle: 'Help, FAQs, and contact', theme: 'arcana' },
  },
  arcanaPrivacy: {
    path: '/apps/arcana/privacy',
    title: 'Privacy Policy · Arcana Tarot Journal',
    description: 'How Arcana handles your data: local-first storage, optional sync, and no tracking — ever.',
    priority: 0.3,
    crumb: 'Privacy',
    parent: 'arcana',
    og: {
      eyebrow: 'Arcana · Privacy',
      title: 'Privacy Policy',
      subtitle: 'Local-first storage, optional sync, and no tracking',
      theme: 'arcana',
    },
  },
  anicca: {
    path: '/apps/anicca',
    title: 'Anicca — Mood & Energy (Chakra) Journal for iPhone',
    description:
      'A calm mood & energy journal for iPhone. Name how you feel, see it across seven energy centers from Root to Crown, and notice your patterns over time.',
    priority: 0.9,
    crumb: 'Anicca',
    parent: 'apps',
    og: {
      eyebrow: 'Anicca · Mood & energy journal for iPhone',
      title: 'Read your energy. Understand yourself.',
      subtitle: 'Seven energy centers, from Root to Crown',
      theme: 'anicca',
    },
  },
  aniccaSupport: {
    path: '/apps/anicca/support',
    title: 'Support & FAQ · Anicca Mood & Energy Journal',
    description: 'Help, FAQs, and contact for Anicca — the mood & energy journal by Screen Sage Studios.',
    priority: 0.5,
    crumb: 'Support',
    parent: 'anicca',
    og: { eyebrow: 'Anicca · Support', title: 'How can we help?', subtitle: 'Help, FAQs, and contact', theme: 'anicca' },
  },
  aniccaPrivacy: {
    path: '/apps/anicca/privacy',
    title: 'Privacy Policy · Anicca Mood & Energy Journal',
    description:
      'How Anicca handles your data: on-device emotion matching, a private synced account, and no ads or tracking — ever.',
    priority: 0.3,
    crumb: 'Privacy',
    parent: 'anicca',
    og: {
      eyebrow: 'Anicca · Privacy',
      title: 'Privacy Policy',
      subtitle: 'On-device emotion matching, and no ads or tracking',
      theme: 'anicca',
    },
  },
  aniccaTerms: {
    path: '/apps/anicca/terms',
    title: 'Terms of Use · Anicca Mood & Energy Journal',
    description:
      'The terms for using Anicca: what it is (and isn’t), your account, subscriptions, and your content.',
    priority: 0.3,
    crumb: 'Terms',
    parent: 'anicca',
    og: { eyebrow: 'Anicca · Terms', title: 'Terms of Use', subtitle: 'What Anicca is, and isn’t', theme: 'anicca' },
  },
} satisfies Record<string, PageEntry>

export type PageKey = keyof typeof PAGES

/** The pages search engines and AI assistants should know about. */
export function indexablePages(): [PageKey, PageEntry][] {
  return (Object.entries(PAGES) as [PageKey, PageEntry][]).filter(([, page]) => !page.noindex)
}

/** The page and every page above it, from the home page down. */
export function breadcrumbTrail(key: PageKey): PageEntry[] {
  const trail: PageEntry[] = []
  let current: PageEntry | undefined = PAGES[key]
  while (current) {
    trail.unshift(current)
    current = current.parent ? PAGES[current.parent as PageKey] : undefined
  }
  return trail
}
