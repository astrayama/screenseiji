// The four pillars, ordered as a journey: watch → go deeper → practice → rest.
// Each pillar gets exactly one call to action.
export const services = [
  {
    icon: '✦',
    step: 'Watch',
    title: 'Video Essays',
    description:
      'Philosophical essays using anime, film, and games as entry points. Beloved characters externalize internal struggles in ways that lower our defenses — and let us absorb difficult ideas.',
    cta: { label: 'Watch', href: 'https://www.youtube.com/@screenseiji' },
  },
  {
    icon: '🔮',
    step: 'Go deeper',
    title: 'Tarot Readings',
    description:
      'Tarot as a symbolic language for self-reflection — not prediction, but a mirror held up to what you already know. Written, recorded, or live.',
    cta: { label: 'Book a reading', href: '#tarot' },
  },
  {
    icon: '∞',
    step: 'Practice daily',
    title: 'Software for Seekers',
    description:
      'Indie apps and web tools built on philosophical frameworks — from the Norse world tree to Buddhist impermanence. Each tool is named after the concept it embodies.',
    cta: { label: 'Try the apps', href: '#apps' },
  },
  {
    icon: '🎮',
    step: 'Rest',
    title: 'Mindful Gaming',
    description:
      'Games are maps for living — not escapism. Cozy gaming as rest, restoration, and spiritual practice.',
    cta: { label: 'Hang out', href: 'https://www.tiktok.com/@screenseiji' },
  },
]

// ─── Tarot readings ────────────────────────────────────────────────────────
// Async packages go through a native intake form (emailed to Isa via
// /api/reading), then the client is sent to the package's Stripe Payment Link.

export type IntakePackageId = 'written' | 'video'

export interface IntakePackage {
  id: IntakePackageId
  eyebrow: string
  title: string
  description: string
  /** Short facts shown under the description. */
  details: string[]
  cta: string
  price: string
  priceUnit: string
  /** Stripe Payment Link. While null, the confirmation says Isa will follow up by email. */
  paymentUrl: string | null
  /** Whether the intake form asks "Anything Isa should know?" */
  notesField: boolean
}

export const intakePackages: Record<IntakePackageId, IntakePackage> = {
  written: {
    id: 'written',
    eyebrow: 'Async · Written',
    title: 'Written reading',
    description: 'Isa answers your question in writing within 48 hours.',
    details: ['A spread of 3–7 cards', 'Delivered within 48 hours'],
    cta: 'Order a written reading',
    price: '$10',
    priceUnit: 'per spread',
    paymentUrl: 'https://buy.stripe.com/5kQ28q41I2ZK70GaxO8EM02',
    notesField: true,
  },
  video: {
    id: 'video',
    eyebrow: 'Async · Recorded',
    title: 'Recorded video reading',
    description: 'A personal video reading, recorded for you and delivered within 48 hours.',
    details: ['About 5 minutes of video', 'Delivered within 48 hours'],
    cta: 'Order a video reading',
    price: '$18',
    priceUnit: 'per spread',
    paymentUrl: 'https://buy.stripe.com/6oUeVc8hYasc0Ci49q8EM03',
    notesField: false,
  },
}

// Live readings are requested natively on the site (/api/booking): the client
// picks a format, a length and an open slot; Isa confirms by replying.

export type LiveFormat = 'voice' | 'video' | 'vr'
export type LiveTierId = '15' | '30' | '45'

export interface LiveTier {
  id: LiveTierId
  label: string
  price: string
  /** How long the slot holds on the calendar. */
  blockMinutes: number
  /** Stripe Payment Link. While null, Isa sends payment details when she confirms. */
  paymentUrl: string | null
}

/** [start, end) in 24h "HH:MM", wall-clock time in `availability.timeZone`. */
export type TimeRange = [string, string]

export const liveReading = {
  eyebrow: 'Live · You pick the format',
  title: 'Live reading',
  description: 'A reading in real time, together. The format is yours to choose.',
  formats: [
    { id: 'voice' as LiveFormat, label: 'Voice call' },
    { id: 'video' as LiveFormat, label: 'Video call' },
    { id: 'vr' as LiveFormat, label: 'VR experience' },
  ],
  tiers: [
    { id: '15', label: '15 min', price: '$25', blockMinutes: 15, paymentUrl: 'https://buy.stripe.com/6oU9AS0Pw9o85WC9tK8EM04' },
    { id: '30', label: '30 min', price: '$35', blockMinutes: 30, paymentUrl: 'https://buy.stripe.com/14A00igOu8k41GmbBS8EM05' },
    { id: '45', label: '45+ min', price: '$50', blockMinutes: 60, paymentUrl: 'https://buy.stripe.com/fZu9AS2XE6bW1GmgWc8EM06' },
  ] as LiveTier[],
  availability: {
    // Taken from Isa's Mac (Eastern). Change here if readings run on another clock.
    timeZone: 'America/New_York',
    // Keyed by day of week, 0 = Sunday … 6 = Saturday. A slot must end by the range end.
    weekly: {
      0: [['13:00', '18:00']],
      1: [['13:00', '18:00']],
      2: [['13:00', '18:00']],
      3: [['13:00', '18:00']],
      4: [['12:00', '16:00']],
      5: [['12:00', '16:00']],
      6: [['13:00', '18:00']],
    } as Record<number, TimeRange[]>,
    slotStepMinutes: 30,
    minNoticeHours: 24,
    daysAhead: 21,
  },
}

export interface AppLinks {
  appStoreUrl: string
  /** While true, the App Store badge renders as a non-link "Coming soon". */
  appStorePlaceholder: boolean
  /** Public TestFlight beta — the "try it" link while the App Store listing is pending. */
  testflightUrl?: string
  supportEmail: string
  discord: string
}

export const arcanaLinks: AppLinks = {
  // PLACEHOLDER — swap for the real App Store URL once the app is live,
  // then flip appStorePlaceholder to false.
  appStoreUrl: 'https://apps.apple.com/app/id0000000000',
  appStorePlaceholder: true,
  testflightUrl: 'https://testflight.apple.com/join/FZTcG7YT',
  supportEmail: 'screenseiji@proton.me',
  discord: 'https://discord.gg/2rFyT6nskc',
}

export const aniccaLinks: AppLinks = {
  // PLACEHOLDER — swap for the real App Store URL once the app is live,
  // then flip appStorePlaceholder to false.
  appStoreUrl: 'https://apps.apple.com/app/id0000000000',
  appStorePlaceholder: true,
  supportEmail: 'screenseiji@proton.me',
  discord: 'https://discord.gg/2rFyT6nskc',
}

export type AppStatus = 'beta' | 'lab'

export const appStatusLabel: Record<AppStatus, string> = {
  beta: 'In beta',
  lab: 'In the lab',
}

export interface AppNode {
  id: string
  name: string
  concept: string
  /** Omitted while there's nothing public to open yet. */
  href?: string
  status: AppStatus
  /** Specific status line, e.g. how to get into the beta. Defaults to appStatusLabel. */
  statusNote?: string
  /** Public beta anyone can try right now (e.g. TestFlight). */
  tryUrl?: string
  /** The featured app — gets the apex of the star and the flagship card. */
  flagship?: boolean
  x: number
  y: number
  r: number
  nameLines: string[]
  /** Draw the label above the node instead of below (used for the star's apex). */
  labelAbove?: boolean
}

export function appStatusText(app: AppNode) {
  return app.statusNote ?? appStatusLabel[app.status]
}

// The seven nodes sit on the points of a seven-pointed star (a {7/3} heptagram
// on an ellipse centred at 400,221 with radii 340×154, widened to fill the
// 800×430 viewBox): apex at top, then clockwise. Yggdrasil, the flagship, takes
// the apex; the two tarot apps, Arcana and Carta Luna, sit side by side.
// Array order sets the order of the "Also in beta" cards.
export const apps: AppNode[] = [
  {
    id: 'yggdrasil',
    name: 'Yggdrasil',
    concept: 'The Norse world tree · journaling',
    href: 'https://yggdrasil-journal.lovable.app',
    status: 'beta',
    statusNote: 'In beta — join the waitlist',
    flagship: true,
    x: 400, y: 67, r: 16,
    nameLines: ['Yggdrasil'],
    labelAbove: true,
  },
  {
    id: 'arcana',
    name: 'Arcana',
    concept: 'The mysteries · iOS tarot journal',
    href: '/apps/arcana',
    status: 'beta',
    statusNote: 'In beta — try it on TestFlight',
    tryUrl: arcanaLinks.testflightUrl,
    x: 134, y: 125, r: 13,
    nameLines: ['Arcana'],
  },
  {
    id: 'cartaluna',
    name: 'Carta Luna',
    concept: 'Card of the moon · mixed-reality tarot on Meta Quest',
    href: 'https://cartaluna-mr.vercel.app',
    status: 'beta',
    statusNote: 'In beta — try it on Meta Quest',
    tryUrl: 'https://cartaluna-mr.vercel.app',
    x: 69, y: 255, r: 13,
    nameLines: ['Carta Luna'],
  },
  {
    id: 'lumenwright',
    name: 'Lumenwright',
    concept: 'Maker of light · VR & AR',
    href: 'https://lumenwright-nu.vercel.app',
    status: 'beta',
    statusNote: 'In beta — try it in VR & AR',
    tryUrl: 'https://lumenwright-nu.vercel.app',
    x: 731, y: 255, r: 12,
    nameLines: ['Lumenwright'],
  },
  {
    id: 'anicca',
    name: 'Anicca',
    concept: 'Buddhist impermanence · iOS mood & energy journal',
    href: '/apps/anicca',
    status: 'lab',
    x: 666, y: 125, r: 13,
    nameLines: ['Anicca'],
  },
  {
    id: 'kairos',
    name: 'Kairos',
    concept: 'Greek sacred time · scheduling & timing',
    status: 'lab',
    x: 548, y: 360, r: 11,
    nameLines: ['Kairos'],
  },
  {
    id: 'sunya',
    name: 'Sunya',
    concept: 'Buddhist emptiness · cross-platform breathwork',
    status: 'lab',
    x: 252, y: 360, r: 12,
    nameLines: ['Sunya'],
  },
]

// Each point links to the point three steps around the ring — the single
// stroke that draws a sharp seven-pointed star.
export const constellationEdges: [string, string][] = [
  ['yggdrasil', 'kairos'],
  ['kairos', 'arcana'],
  ['arcana', 'lumenwright'],
  ['lumenwright', 'cartaluna'],
  ['cartaluna', 'anicca'],
  ['anicca', 'sunya'],
  ['sunya', 'yggdrasil'],
]

export const socialLinks = {
  content: [
    { label: 'YouTube', handle: '@screenseiji', href: 'https://www.youtube.com/@screenseiji' },
    { label: 'TikTok', handle: '@screenseiji', href: 'https://www.tiktok.com/@screenseiji' },
    { label: 'Instagram', handle: '@screenseiji', href: 'https://instagram.com/screenseiji' },
    { label: 'Threads', handle: '@screenseiji', href: 'https://threads.net/@screenseiji' },
    { label: 'X / Twitter', handle: '@screenseiji', href: 'https://x.com/screenseiji' },
    { label: 'Discord', handle: 'Join Community', href: 'https://discord.gg/2rFyT6nskc' },
  ],
  listen: [
    { label: 'Spotify', handle: "Seeker's Soliloquy", href: 'https://open.spotify.com/show/2w5Gt1BLDsrcSjDyVIdbow' },
    { label: 'Apple Podcasts', handle: "Seeker's Soliloquy", href: 'https://podcasts.apple.com/us/podcast/seekers-soliloquy/id1818254857' },
  ],
  shop: [
    { label: 'Gumroad', handle: 'screenseiji', href: 'https://screenseiji.gumroad.com/' },
    { label: 'Ko-fi', handle: 'screenseiji', href: 'https://ko-fi.com/screenseiji' },
  ],
  tools: [
    { label: 'App Hub', handle: 'screenseiji.vercel.app', href: 'https://screenseiji.vercel.app/' },
  ],
}

// ─── Studio: client web work ───────────────────────────────────────────────
// Deliberately kept apart from the Screen Sage brand. Leads come in through the
// project form (/api/project), which emails Isa.

export interface StudioWork {
  name: string
  kind: 'Client site' | 'My own product'
  description: string
  /** Omitted when the piece is the page you're already on. */
  href?: string
}

export const studio = {
  headline: 'Websites for small businesses and more.',
  subhead:
    'Design, build, and launch — for small businesses, creators, and anyone with something to offer. Fast, accessible, and found on Google.',
  // The scrolling ticker on the collapsed banner.
  marquee: [
    'Landing pages',
    'Business websites',
    'Booking & payments',
    'SEO',
    'Mobile-first',
    'Accessible',
    'Waitlists & email capture',
    'Web apps',
    'Redesigns',
  ],
  services: [
    {
      title: 'Landing page',
      description: 'One focused page that turns visitors into calls, bookings, or sales.',
      includes: ['Copy and layout help', 'Contact or booking form', 'Live on your own domain'],
    },
    {
      title: 'Business website',
      description: 'A multi-page home for your services, your story, and how to reach you.',
      includes: ['Services, about & contact pages', 'SEO so customers find you', 'Easy to update later'],
    },
    {
      title: 'Custom features',
      description: 'Booking, payments, waitlists, or a full web app — built in, not bolted on.',
      includes: ['Online booking calendars', 'Stripe checkout', 'Email capture & forms'],
    },
  ],
  included: ['Mobile-first design', 'SEO', 'Accessibility', 'Fast hosting', 'Forms that email you', 'Analytics'],
  work: [
    {
      name: 'The Formless Guide',
      kind: 'Client site',
      description: 'A website for a mindfulness and personal-growth practice.',
      href: 'https://theformlessguide.vercel.app/',
    },
    {
      name: 'Screen Sage',
      kind: 'My own product',
      description: 'The site you’re on — native booking calendar, Stripe checkout, and email forms.',
    },
    {
      name: 'Arcana',
      kind: 'My own product',
      description: 'App Store marketing, support, and privacy pages for an iOS app.',
      href: '/apps/arcana',
    },
    {
      name: 'Yggdrasil',
      kind: 'My own product',
      description: 'A journaling web app with interactive visualizations and AI insights.',
      href: 'https://yggdrasil-journal.lovable.app',
    },
  ] as StudioWork[],
  process: [
    { title: 'Tell me about it', body: 'Fill out the short project form — two minutes, no commitment.' },
    { title: 'Proposal & quote', body: 'I reply with a plan, a timeline, and a quote for your project.' },
    { title: 'Design & build', body: 'You see progress along the way and give feedback as it comes together.' },
    { title: 'Launch', body: 'Your site goes live on your domain, ready for customers.' },
  ],
  email: 'screenseiji@proton.me',
  // Discovery-call link (Cal.com, Calendly…). A "Book a call" button shows once set.
  callUrl: null as string | null,
}

export const projectTypes = [
  'New website',
  'Redesign',
  'Landing page',
  'Booking / payments / custom feature',
  'Not sure yet',
] as const

// These quietly signal Isa's price level — adjust to taste.
export const budgetRanges = [
  'Under $1,000',
  '$1,000–$2,500',
  '$2,500–$5,000',
  '$5,000+',
  'Not sure yet',
] as const

export const projectTimelines = ['ASAP', '1–3 months', '3+ months', 'Flexible'] as const

export type ProjectType = (typeof projectTypes)[number]
export type BudgetRange = (typeof budgetRanges)[number]
export type ProjectTimeline = (typeof projectTimelines)[number]

export const contactCategories = [
  'General question',
  'Tarot reading inquiry',
  'Collaboration',
  'Client/project inquiry',
] as const

export type ContactCategory = (typeof contactCategories)[number]

export const gatedLinks = [
  { label: 'GitHub', href: 'https://github.com/astrayama' },
  { label: 'Devpost', href: 'https://devpost.com/isabiiil' },
]

export const philosophyItems = [
  {
    symbol: '0',
    title: 'Nothingness',
    body: "The void is not absence. It's pure potential — the space before the first note of a song that hasn't been written yet. Buddhism calls it śūnyatā. Quantum physics calls it the vacuum state. Both are pointing at the same door.",
  },
  {
    symbol: '1',
    title: 'The Self',
    body: "You are a story the universe is telling. Separate enough to have perspective. Connected enough to matter. Jungian psychology calls this individuation. Advaita Vedanta calls it the witness. The observer effect in quantum mechanics may have something to say here too.",
  },
  {
    symbol: '∞',
    title: 'Everything',
    body: "Infinity is not about size. It's about the impossibility of edges. You do not end where other things begin. The holographic principle. Indra's net. The mycorrhizal network. Different maps of the same territory.",
  },
]
