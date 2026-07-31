export const services = [
  {
    icon: '🔮',
    title: 'Tarot Readings',
    description:
      'Tarot as symbolic language for self-reflection — not prediction, but a mirror held up to what you already know. Available async (written/recorded) or live, scheduled sessions.',
    pills: [
      { label: 'Async Reading', href: 'https://screenseiji.gumroad.com/l/tarot-async', icon: '↗' },
      // { label: 'Book a Live Session', href: 'https://calendar.app.google/RXE5ud7NgcbC1j3F9', icon: '↗' },
    ],
  },
  {
    icon: '✦',
    title: 'Video Essays',
    description:
      'Philosophical essays using anime, film, and games as entry points. Beloved characters externalize internal struggles in ways that lower our defenses — and let us absorb difficult ideas.',
    pills: [
      { label: 'YouTube', href: 'https://www.youtube.com/@screenseiji', icon: '↗' },
    ],
  },
  {
    icon: '🎮',
    title: 'Mindful Gaming',
    description:
      'Games are maps for living — not escapism. Cozy gaming as rest, restoration, and spiritual practice. Part of thegamehers: a community supporting women and marginalized creators in gaming.',
    pills: [
      { label: 'TikTok Lives', href: 'https://www.tiktok.com/@screenseiji', icon: '↗' },
    ],
  },
  {
    icon: '∞',
    title: 'Software for Seekers',
    description:
      'Indie apps and web tools built on philosophical frameworks — from the Norse world tree to Buddhist impermanence. Each tool is named after the concept it embodies.',
    pills: [
      { label: 'All Apps', href: '#apps', icon: '↓' },
      { label: 'Build in Public', href: 'https://x.com/screenseiji', icon: '↗' },
    ],
  },
]

export interface AppNode {
  id: string
  name: string
  concept: string
  href: string
  status: 'live' | 'in-dev'
  x: number
  y: number
  r: number
  nameLines: string[]
  /** Overrides the status colour to single a node out. */
  accent?: string
  /** Draw the label above the node instead of below (used for the star's apex). */
  labelAbove?: boolean
}

// The five nodes sit on the points of a star (a pentagram widened to fill the
// 800×430 viewBox): apex at top, then clockwise. Arcana takes the apex.
export const apps: AppNode[] = [
  {
    id: 'yggdrasil',
    name: 'Yggdrasil',
    concept: 'The Norse world tree · journaling',
    href: 'https://yggdrasil-journal.lovable.app',
    status: 'live',
    x: 115, y: 176, r: 12,
    nameLines: ['Yggdrasil'],
  },
  {
    id: 'anicca',
    name: 'Anicca',
    concept: 'Buddhist impermanence · mood & energy tracking',
    href: 'https://anicca.lovable.app',
    status: 'live',
    x: 685, y: 176, r: 14,
    nameLines: ['Anicca'],
  },
  {
    id: 'arcana',
    name: 'Arcana',
    concept: 'The mysteries · iOS tarot journal',
    href: '/apps/arcana',
    status: 'live',
    x: 400, y: 67, r: 14,
    nameLines: ['Arcana'],
    accent: '#B385E0',
    labelAbove: true,
  },
  {
    id: 'kairos',
    name: 'Kairos',
    concept: 'Greek sacred time · scheduling & timing',
    href: '#',
    status: 'in-dev',
    x: 576, y: 353, r: 11,
    nameLines: ['Kairos'],
  },
  {
    id: 'sunya',
    name: 'Sunya',
    concept: 'Buddhist emptiness · cross-platform breathwork',
    href: '#',
    status: 'in-dev',
    x: 224, y: 353, r: 12,
    nameLines: ['Sunya'],
  },
]

// Each point links to the two points it is NOT adjacent to — the single stroke
// that draws a five-pointed star.
export const constellationEdges: [string, string][] = [
  ['arcana', 'kairos'],
  ['kairos', 'yggdrasil'],
  ['yggdrasil', 'anicca'],
  ['anicca', 'sunya'],
  ['sunya', 'arcana'],
]

export const arcanaLinks = {
  // PLACEHOLDER — swap for the real App Store URL once the app is live,
  // then flip appStorePlaceholder to false.
  appStoreUrl: 'https://apps.apple.com/app/id0000000000',
  appStorePlaceholder: true,
  supportEmail: 'screenseiji@proton.me',
  discord: 'https://discord.gg/2rFyT6nskc',
}

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
    { label: 'Etsy', handle: 'ScreenSageStudios', href: 'https://etsy.com/shop/ScreenSageStudios' },
    { label: 'Gumroad', handle: 'screenseiji', href: 'https://screenseiji.gumroad.com/' },
    { label: 'Ko-fi', handle: 'screenseiji', href: 'https://ko-fi.com/screenseiji' },
  ],
  tools: [
    { label: 'App Hub', handle: 'screenseiji.vercel.app', href: 'https://screenseiji.vercel.app/' },
  ],
}

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
