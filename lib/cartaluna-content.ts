import type { FaqItem } from '@/lib/app-content'

// All copy for /apps/cartaluna. Facts come from the Carta Luna project's
// README (the arcana-mr repo): keep them in step when the app changes.

/** The public-domain RWS scans this page draws (see components/arcana/TarotCard.tsx). */
export type CartalunaCard = 'hermit' | 'star' | 'moon'

export const cartalunaHero = {
  eyebrow: 'Carta Luna',
  meaning: 'Card of the moon',
  headlineTop: 'A tarot reading',
  headlineAccent: 'on your own table.',
  sub: 'Put on a Meta Quest 3 and a tarot deck appears on your real table. Shuffle it in your hands, draw the cards yourself, and turn them over to see what they reflect back.',
  chips: ['Mixed reality', 'No install, no account', 'Hands or controllers'],
  cta: 'Open Carta Luna',
  note: {
    headset: 'Best on Meta Quest 3, in the Quest Browser.',
    screens: 'On a phone or computer, you can watch a friend’s reading.',
  },
  tagline: 'Not a forecast. A mirror, laid out on your table.',
  spread: [
    { card: 'hermit', label: 'Past', name: 'The Hermit' },
    { card: 'star', label: 'Present', name: 'The Star', turns: true },
    { card: 'moon', label: 'Future', name: 'The Moon' },
  ] satisfies { card: CartalunaCard; label: string; name: string; turns?: boolean }[],
}

export type CartalunaVisual = 'table' | 'hands' | 'meaning' | 'spreads' | 'surroundings'

export interface CartalunaFeature {
  id: string
  eyebrow: string
  headline: string
  body: string
  visual: CartalunaVisual
  chips?: string[]
}

export const cartalunaFeatures: CartalunaFeature[] = [
  {
    id: 'table',
    eyebrow: 'Your table, your room',
    headline: 'The deck finds your table.',
    body: 'Carta Luna looks for the table you marked in Space Setup, then any flat surface at table height, and lays a cloth mat on it. Grab the mat to move it: it settles back onto the table when you let go and stays anchored to the room.',
    visual: 'table',
  },
  {
    id: 'hands',
    eyebrow: 'Shuffle, draw, turn',
    headline: 'Every card passes through your hands.',
    body: 'Tap the deck, or lift it and give it a shake, to shuffle. Pinch the top card to draw it, and turn your hand over to turn the card. The order comes from your device’s secure random generator, and any card can land reversed.',
    visual: 'hands',
    chips: ['Hand tracking', 'Controllers too'],
  },
  {
    id: 'meaning',
    eyebrow: 'Reflect',
    headline: 'Each card asks you something.',
    body: 'Every face-up card gets a meaning panel: what its position asks, whether it’s upright or reversed, three keywords, a short read, and a question to sit with. All 78 cards are written for Carta Luna, as a mirror rather than a forecast.',
    visual: 'meaning',
  },
  {
    id: 'spreads',
    eyebrow: 'Seven spreads, or your own',
    headline: 'From one card to twelve.',
    body: 'Start with a single card or go all the way to the Celtic Cross. The mat grows to fit the spread, with faint outlines marking each spot. Or make your own: choose how many cards and a shape, then name each spot, all without typing.',
    visual: 'spreads',
  },
  {
    id: 'surroundings',
    eyebrow: 'Set the scene',
    headline: 'Read in your room, or under the stars.',
    body: 'Stay in your own room through passthrough, or step into a night-sky sanctum, a sunset sea of clouds, or a fairy circle in a forest. Lay out the deck’s own 1909 back or one of six original designs.',
    visual: 'surroundings',
  },
]

/** The Star, upright, in the Present spot: the app's own words (src/data/cards.json). */
export const cartalunaMeaning = {
  position: 'Present',
  asks: 'Where you stand right now.',
  card: 'The Star',
  orientation: 'Upright',
  keywords: ['hope', 'renewal', 'quiet trust'],
  read: 'After a hard stretch, The Star shows up like the first clear night. It points to the part of you that is still willing to hope, even a little, and to the small ways you are already healing. Nothing here has to be rushed.',
  question: 'What small sign of renewal have you noticed in yourself lately, even if it felt too quiet to count?',
}

export const cartalunaHands = [
  { step: 'Shuffle', how: 'Tap the deck, or lift it and shake' },
  { step: 'Draw', how: 'Pinch the top card' },
  { step: 'Turn', how: 'Turn your hand over' },
]

/** Spot positions from the app's spread files: x to the right, y away from you, one unit per card. */
export interface SpreadSketch {
  name: string
  summary: string
  slots: { x: number; y: number }[]
  /** Index of a card laid sideways across another (the Celtic Cross's Challenge). */
  crossing?: number
  deck?: { x: number; y: number }
}

export const cartalunaSpreads: SpreadSketch[] = [
  { name: 'Single Card', summary: 'One card to sit with.', slots: [{ x: 0, y: 0 }] },
  {
    name: 'Past, Present, Future',
    summary: 'What shaped this, and where it leans.',
    slots: [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
  },
  {
    name: 'Mind, Body, Spirit',
    summary: 'A check-in with your whole self.',
    slots: [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
  },
  {
    name: 'Crossroads',
    summary: 'Five cards for a choice you face.',
    slots: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }],
    deck: { x: -2, y: 1 },
  },
  {
    name: 'Horseshoe',
    summary: 'Seven cards for a situation you’re in.',
    slots: [
      { x: -3, y: 0 }, { x: -2, y: 0.55 }, { x: -1, y: 0.9 }, { x: 0, y: 1 },
      { x: 1, y: 0.9 }, { x: 2, y: 0.55 }, { x: 3, y: 0 },
    ],
    deck: { x: 0, y: 0 },
  },
  {
    name: 'Celtic Cross',
    summary: 'The classic ten-card deep look.',
    slots: [
      { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: -1.3, y: 0 }, { x: 0, y: 1 },
      { x: 1.3, y: 0 }, { x: 2.6, y: -1.245 }, { x: 2.6, y: -0.415 }, { x: 2.6, y: 0.415 }, { x: 2.6, y: 1.245 },
    ],
    crossing: 1,
    deck: { x: -2.6, y: 0 },
  },
  {
    name: 'Twelve Houses',
    summary: 'A card for each area of life.',
    slots: [
      { x: -3, y: 0 }, { x: -2, y: -1 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 2, y: -1 },
      { x: 3, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: -2, y: 1 },
    ],
    deck: { x: 0, y: 0 },
  },
]

export const cartalunaCustomSpread = {
  name: 'Make your own',
  summary: '1 to 12 cards, in a row, rows, an arc, a ring or a cross. Name each spot from 48 reflective names; up to 8 spreads are saved.',
}

export const cartalunaSurroundings = [
  { id: 'night-sanctum', name: 'Night-sky sanctum', note: 'The default', sky: ['#03040B', '#1F1838', '#3A2A55'] },
  { id: 'cloud-sea', name: 'Sunset cloud sea', sky: ['#40598A', '#C98A86', '#FFD29A'] },
  { id: 'fairy-circle', name: 'Fairy circle', sky: ['#9FC0CF', '#F1DFA8', '#3B4A2F'] },
  { id: 'room', name: 'Your own room', note: 'Through passthrough' },
]

/** The seven card backs, as two-colour sketches of the real designs. */
export const cartalunaBacks = [
  { id: 'deck', name: '1909 roses & lilies', base: '#F1E7D0', ink: '#8E2236' },
  { id: 'celestial', name: 'Celestial', base: '#05060C', ink: '#E8C877' },
  { id: 'botanical', name: 'Botanical', base: '#2F6B43', ink: '#E6C064' },
  { id: 'sacred-geometry', name: 'Sacred geometry', base: '#110F0D', ink: '#D9B75F' },
  { id: 'minimal', name: 'Minimal', base: '#2A2622', ink: '#C9A85E' },
  { id: 'neon-circuit', name: 'Neon circuit', base: '#260B15', ink: '#29E6FF' },
  { id: 'winter', name: 'Winter', base: '#E9F4FF', ink: '#5F87B5' },
]

export const cartalunaTogether = {
  eyebrow: 'Read together',
  headline: 'Bring a friend to the table.',
  body: 'Open a room and share its six-digit code. Each headset lays the mat on its own table, wherever everyone is, and the cards move for everyone.',
  ways: [
    {
      id: 'reader',
      title: 'The reader',
      body: 'Opens a room from the headset and leads the reading. They can change what guests do at any time.',
    },
    {
      id: 'guest',
      title: 'A friend in a headset',
      body: 'Joins with the code and lays the mat on their own table, then:',
      modes: [
        { name: 'Watch', body: 'The reader does everything.' },
        { name: 'Shuffle', body: 'The guest shuffles; the reader draws and turns.' },
        { name: 'Press Next', body: 'The guest moves the reading along, one step at a time.' },
      ],
    },
    {
      id: 'watchers',
      title: 'Up to six on a screen',
      body: 'On a phone or computer, tap Watch a reading and type the code. See the table in 3D, tap a turned card for its meaning, and shake your phone to shuffle when the reader allows it.',
    },
  ],
  note: 'Anyone can join or rejoin at any point and catches up straight away.',
}

export const cartalunaPrivacy = {
  eyebrow: 'Private by design',
  headline: 'A reading is personal. It stays that way.',
  lead: 'No accounts, no analytics, no cookies, no tracking. Carta Luna loads only its own files, and it talks to nothing else unless you choose to read together.',
  points: [
    {
      title: 'Your room stays in the headset',
      body: 'With your permission, the Quest Browser shares the planes and furniture it detects so the mat can find your table. Carta Luna uses them in the moment and never stores or sends them.',
    },
    {
      title: 'Readings aren’t saved',
      body: 'When a reading ends, it’s gone: no history, and no copy on a server.',
    },
    {
      title: 'Shared readings are encrypted',
      body: 'The room code never leaves your headset. It becomes an encryption key and a separate room ID, messages are sealed (AES-GCM) before they leave, and the relay that passes them along stores nothing.',
    },
  ],
  storage: {
    title: 'What stays on your headset',
    items: [
      { key: 'iwsdk_scene_anchor_uuid', what: 'One anchor ID, so the mat comes back to the same spot.' },
      { key: 'arcana.settings.v1', what: 'Your settings: deck, card back, surroundings, and whether you’ve seen How it works.' },
      { key: 'arcana.spreads.v1', what: 'Spreads you make: their shapes and position names.' },
    ],
    clear: 'Settings › Your data › Clear saved data removes your settings and spreads.',
  },
  relay: 'What the relay can see: the room ID, each device’s IP address, when messages are sent and how big they are, and the sealed messages, which it can’t read.',
  caveat: {
    title: 'The limit of a six-digit code',
    body: 'A code has a million possibilities. Encryption keeps readings out of the relay’s sight, but someone who recorded the traffic could try every code offline. Treat a shared reading like a phone call, not a vault. A room only exists while the reader has it open.',
  },
  footnote: 'This page is part of the Screen Sage site, which has [its own privacy policy](/privacy). Carta Luna itself runs at https://cartaluna-mr.vercel.app.',
}

export const cartalunaFaq: FaqItem[] = [
  {
    q: 'What do I need?',
    a: 'A Meta Quest 3 and its built-in Quest Browser. Open cartaluna-mr.vercel.app and tap Begin. There’s nothing to install and no account to make.',
  },
  {
    q: 'How do I get the best fit on my table?',
    a: 'Run Space Setup in the headset’s settings first and mark your table. When Carta Luna asks to use spatial data, allow it, so the mat can find the table.',
  },
  {
    q: 'It didn’t find my table. What now?',
    a: 'Carta Luna tries your Space Setup table, then the nearest flat surface at table height, then a floating mat in front of you. Reach out and grab the mat to move it, point and pinch to slide it, or choose Move the mat in the menu.',
  },
  {
    q: 'Can I use controllers instead of my hands?',
    a: 'Yes. Pull the trigger up close to take a card, hold the grip button to lift the deck, and point and pull the trigger to tap from a distance.',
  },
  {
    q: 'Can friends join without a headset?',
    a: 'Yes. Up to six people can watch on a phone or computer: they open Carta Luna there, tap Watch a reading, and type the room code. One more friend can join in a headset.',
  },
  {
    q: 'Can I make my own spread?',
    a: 'Choose Make your own: pick 1 to 12 cards and a shape (a row, rows, an arc, a ring or a cross), then tap each spot and pick its name. Up to 8 of your spreads are saved on the headset.',
  },
  {
    q: 'Does it predict the future?',
    a: 'No. Carta Luna is a tool for self-reflection, not fortune telling. Every card comes with a short read and a question to sit with; what it means is up to you.',
  },
  {
    q: 'Where does the card art come from?',
    a: 'The deck is the 1909 Rider–Waite–Smith, drawn by Pamela Colman Smith and now in the public domain. The six original card backs are drawn in code.',
  },
]
