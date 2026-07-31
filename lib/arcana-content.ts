// All copy for the Arcana pages (/apps/arcana). Marketing lines come from
// the App Store screenshot set; in-app strings mirror the shipping app.

export const arcanaHero = {
  eyebrow: 'ARCANA',
  headlineTop: 'Give your tarot cards',
  headlineGradient: 'a home.',
  sub: 'A warm, quiet tarot journal — every pull, every spread, every thought, kept safe.',
  chips: ['10-second logging', 'Meaning hints', 'RWS export'],
  tagline: 'A quiet ledger for your cards, spreads, and the patterns between them.',
}

export interface ArcanaFeature {
  id: string
  eyebrow: string
  headline: string
  body: string
  visual: 'quicklog' | 'flip' | 'journal' | 'draw' | 'spread' | 'export'
  chips?: string[]
}

export const arcanaFeatures: ArcanaFeature[] = [
  {
    id: 'log',
    eyebrow: 'Your daily card',
    headline: 'Logged in ten seconds.',
    body: 'Pull your card, tap it in, add a line — done before your tea has steeped.',
    visual: 'quicklog',
  },
  {
    id: 'meanings',
    eyebrow: 'Card meaning hints',
    headline: 'Never wonder what it means.',
    body: 'Gentle hints for all 78 cards — upright and reversed — right where you write.',
    visual: 'flip',
  },
  {
    id: 'journal',
    eyebrow: 'The journal',
    headline: 'A ledger of your practice.',
    body: 'Months turn like pages. Streaks, stats, and every note — all kept for you.',
    visual: 'journal',
  },
  {
    id: 'draw',
    eyebrow: 'Draw from the deck',
    headline: 'No deck? No problem.',
    body: 'Hold a question in mind, hold the ring, and watch your card turn over.',
    visual: 'draw',
  },
  {
    id: 'spreads',
    eyebrow: 'Tarot spreads',
    headline: 'Readings, laid out with care.',
    body: 'Three-card, Celtic Cross, or a spread of your own design — with room to reflect.',
    visual: 'spread',
  },
  {
    id: 'export',
    eyebrow: 'Share & keep',
    headline: 'Beautiful enough to share.',
    body: 'Turn any reading into a Rider–Waite–Smith image or a journal-page PDF.',
    visual: 'export',
    chips: ['Post 1:1', 'Story 9:16', 'Journal PDF'],
  },
]

export interface FaqItem {
  q: string
  a: string
}

export const arcanaFaq: FaqItem[] = [
  {
    q: 'How do I log a card?',
    a: 'Tap the ⊕ button in the middle of the tab bar, search for your card, choose upright or reversed, and add a note if something stirred. Tap "Save to ledger ✦" and you\'re done — it takes about ten seconds. You can also draw a card straight from the in-app deck if yours isn\'t nearby.',
  },
  {
    q: 'What are meaning hints?',
    a: 'Every one of the 78 cards carries gentle keyword hints for both upright and reversed orientations, right where you write. They\'re composed on-device from the card\'s traditional keywords, so they work offline — and they nudge you toward your own reflection rather than predicting anything for you.',
  },
  {
    q: 'Where is my journal stored? Does it sync?',
    a: 'By default your ledger lives entirely on your device — no account needed. If you\'d like it everywhere, you can turn on Sync to Cloud in Settings and sign in with email and password; entries then sync automatically, and only you can see your own rows. Sync is always optional and off until you enable it.',
  },
  {
    q: 'How do I export a reading?',
    a: 'Open any spread and tap "↥ Export spread". Choose a canvas — Post 1:1, Story 9:16, or Journal PDF — toggle notes, card images, and the date, then tap "Render & share ↥" to send it anywhere through the iOS share sheet.',
  },
  {
    q: 'How do daily reminders work?',
    a: 'Arcana sends at most one gentle reminder a day — "Pull tonight\'s card before the day slips away." You choose the time in Settings (9:00 PM by default), and you can switch it off any time. That\'s how streaks survive busy weeks.',
  },
  {
    q: 'How do I delete my data?',
    a: 'Settings → "Erase journal & start fresh" clears every entry on your device. If you use sync, deleting entries removes them from your synced account too, and you can sign out at any time. Nothing is kept that you can\'t see in your own ledger.',
  },
  {
    q: 'What deck art does Arcana use?',
    a: 'The classic Rider–Waite–Smith deck, illustrated by Pamela Colman Smith in 1909 and now in the public domain. Card images stream from Wikimedia Commons and are cached on your device; if you\'re offline, Arcana shows a cosmic card face instead.',
  },
  {
    q: 'Does Arcana have widgets?',
    a: 'Yes — a "Today\'s card" home-screen widget showing your daily pull and streak, and a quiet crescent-moon lock-screen widget that fills in once today\'s card is in the ledger. Both tap through straight to logging or your journal.',
  },
]

export const arcanaPrivacy = {
  effective: 'Effective July 2026 · Applies to Arcana 1.0.0',
  sections: [
    {
      title: 'The short version',
      body: [
        'Arcana is local-first. Your journal lives on your device, in your pocket, under your control. There are no ads, no analytics, no tracking — ever. The only time any of your data leaves your phone is if you turn on sync, and then it goes only to your own account.',
      ],
    },
    {
      title: 'What Arcana stores',
      body: [
        'Your ledger holds exactly what you put in it: which card you pulled, its orientation, your note, the date, spread titles and layouts, and (if you open one) the card\'s insight text — composed on your device and kept with the entry.',
        'All of it is kept in a single journal file on your device. No account is required to use Arcana.',
      ],
    },
    {
      title: 'Optional sync',
      body: [
        'If you enable Sync to Cloud, your entries are stored in a private database (hosted on Supabase) tied to your email-and-password account. Access is protected by row-level security — you can only ever read and write your own rows. Sync is off by default and you can sign out or stop syncing at any time.',
      ],
    },
    {
      title: 'What we never do',
      body: [
        'No analytics SDKs. No advertising. No tracking pixels. No selling or sharing of data with third parties. No profiling. Your reflections are yours.',
        '(This policy covers the Arcana app. This website, like most, uses standard visit analytics — the app itself contains none.)',
      ],
    },
    {
      title: 'Network connections',
      body: [
        'Arcana talks to the network for exactly two reasons: fetching public-domain Rider–Waite–Smith card art from Wikimedia Commons (cached after the first load), and syncing your entries if — and only if — you\'ve enabled sync. A future opt-in card-insight service is switched off in this version; if it ever ships, this policy will be updated first.',
      ],
    },
    {
      title: 'Notifications & permissions',
      body: [
        'Notifications: Arcana asks permission to send one gentle daily reminder to pull your card, at a time you choose (9:00 PM by default). You can decline or disable it whenever you like.',
        'Motion: the draw-from-the-deck screen uses your device\'s motion sensors so the deck drifts as you tilt the phone. Motion data never leaves the device.',
      ],
    },
    {
      title: 'Deleting your data',
      body: [
        'Settings → "Erase journal & start fresh" removes every entry from your device. If you use sync, deleting entries removes your rows from the synced database as well. To delete a sync account entirely, contact us and we\'ll take care of it.',
      ],
    },
    {
      title: 'Changes & contact',
      body: [
        'If this policy ever changes, the update will appear on this page with a new effective date. Questions, concerns, or requests — write to screenseiji@proton.me and a human (the one who builds Arcana) will answer.',
      ],
    },
  ],
}

// In-app strings used by the phone-screen mockups.
export const arcanaMock = {
  today: {
    date: 'Sunday, July 6',
    card: 'The Moon',
    meta: 'Upright · Major Arcana',
    note: '“Strange dreams again — trusting the undercurrent…”',
    streak: '12-day streak — full stats in your journal',
  },
  journal: {
    month: 'July',
    year: '2026',
    stats: [
      { value: '12', label: 'Day streak' },
      { value: '24', label: 'Cards' },
      { value: '6', label: 'Spreads' },
    ],
    rows: [
      { day: 'Jul 6', title: 'The Moon', dir: '↑' as const, note: '“Strange dreams again — trusting…”' },
      { day: 'Jul 6', title: 'Career check-in', dir: null, note: 'Past · Present · Future' },
      { day: 'Jul 5', title: 'Ten of Cups', dir: '↓' as const, note: '“Family dinner went sideways…”' },
      { day: 'Jul 4', title: 'The Star', dir: '↑' as const, note: '“A good omen before the interview”' },
      { day: 'Jul 3', title: 'The Hermit', dir: '↑' as const, note: 'quiet day, no notes' },
    ],
  },
  draw: {
    title: 'Hold a question\nin mind',
    hint: 'tilt to shuffle · hold to draw',
    counter: '42 of 78',
  },
  export: {
    formats: ['Post 1:1', 'Story 9:16', 'Journal PDF'],
    active: 1,
    toggles: ['Include notes', 'Card images', 'Show date'],
    cta: 'Render & share ↥',
  },
  meaningHint: {
    lead: '✦ Upright, the Star speaks to…',
    body: 'hope and renewal — a quiet light after the storm. Keep the wish specific.',
    keywords: '☾ hope · faith · renewal',
  },
}
