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
}

export const apps: AppNode[] = [
  {
    id: 'yggdrasil',
    name: 'Yggdrasil',
    concept: 'The Norse world tree · journaling',
    href: 'https://yggdrasil-journal.lovable.app',
    status: 'live',
    x: 140, y: 82, r: 12,
    nameLines: ['Yggdrasil'],
  },
  {
    id: 'anicca',
    name: 'Anicca',
    concept: 'Buddhist impermanence · mood & energy tracking',
    href: 'https://anicca.lovable.app',
    status: 'live',
    x: 398, y: 50, r: 14,
    nameLines: ['Anicca'],
  },
  {
    id: 'mystic-ledger',
    name: 'Mystic Ledger',
    concept: 'Sacred memory · tarot journal',
    href: 'https://mystic-ledger.lovable.app',
    status: 'live',
    x: 658, y: 102, r: 12,
    nameLines: ['Mystic', 'Ledger'],
  },
  {
    id: 'kairos',
    name: 'Kairos',
    concept: 'Greek sacred time · scheduling & timing',
    href: '#',
    status: 'in-dev',
    x: 732, y: 275, r: 11,
    nameLines: ['Kairos'],
  },
  {
    id: 'equilibrium',
    name: 'Equilibrium',
    concept: 'Balance competing goals simultaneously',
    href: 'https://my-equilibrium.lovable.app',
    status: 'live',
    x: 555, y: 358, r: 12,
    nameLines: ['Equilibrium'],
  },
  {
    id: 'predict-edge',
    name: 'Predict the Edge',
    concept: 'Sharpen intuition · self-scored forecasting',
    href: 'https://predict-the-edge.lovable.app',
    status: 'live',
    x: 282, y: 372, r: 11,
    nameLines: ['Predict', 'the Edge'],
  },
  {
    id: 'spoonful',
    name: 'Spoonful Steps',
    concept: 'Neurodivergent-friendly · spoon-aware tasks',
    href: 'https://spoonful-steps.lovable.app',
    status: 'live',
    x: 124, y: 295, r: 13,
    nameLines: ['Spoonful', 'Steps'],
  },
]

export const constellationEdges: [string, string][] = [
  ['yggdrasil', 'anicca'],
  ['anicca', 'mystic-ledger'],
  ['mystic-ledger', 'kairos'],
  ['kairos', 'equilibrium'],
  ['equilibrium', 'predict-edge'],
  ['predict-edge', 'spoonful'],
  ['spoonful', 'yggdrasil'],
  ['anicca', 'spoonful'],
  ['mystic-ledger', 'equilibrium'],
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
