// Copy for the home page. Each section is a short teaser that hands off to its
// own page (/tarot, /apps, /websites, /about, /side-quests). Where the phone
// layout uses shorter copy, `short` holds it.

import { apps, intakePackages, liveReadingRange } from '@/lib/data'

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const word = (n: number) => NUMBER_WORDS[n] ?? String(n)
const capitalized = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const betaCount = apps.filter(a => a.status === 'beta').length
const labCount = apps.length - betaCount

export const hero = {
  eyebrow: ['Spirituality', 'Science', 'Story'],
  title: 'Screen Sage',
  tagline: 'You belong here, fellow seeker.',
  lead: 'I help people see themselves clearly and evolve intentionally.',
  /** Desktop only. */
  leadMore: 'Start wherever you like.',
}

/** The four doors in the hero, each one tap from its section. */
export const doors = [
  {
    id: 'watch',
    title: 'Watch',
    tag: 'Free',
    description: 'Video essays on anime, film and games as doorways inward.',
    short: 'Video essays on anime, film and games.',
  },
  {
    id: 'practice',
    title: 'Practice',
    tag: 'In beta',
    description: 'Apps for journaling, tarot and daily reflection.',
    short: 'Apps for journaling and tarot.',
  },
  {
    id: 'reflect',
    title: 'Reflect',
    tag: `From ${intakePackages.written.price}`,
    description: 'Tarot readings as a mirror, written, recorded or live.',
    short: 'Tarot readings, written or live.',
  },
  {
    id: 'build',
    title: 'Build',
    tag: 'For business',
    tagShort: 'Business',
    description: 'Websites for small businesses and creators.',
    short: 'Websites for small businesses.',
  },
] as const

export const watch = {
  eyebrow: 'Watch',
  title: 'The latest from the channel',
  allVideos: 'All videos on YouTube',
  lead: 'Long-form video essays that use anime, film and games as doorways into philosophy, psychology and inner work.',
  /** After "Latest video" or "Latest Short". */
  meta: 'YouTube @screenseiji · plays right here, no new tab',
  metaShort: 'plays right here',
  subscribe: 'Subscribe on YouTube',
  podcast: {
    eyebrow: 'Podcast',
    title: "Seeker's Soliloquy",
    description: 'Solo episodes on Jungian psychology and pop culture.',
  },
  tiktok: 'Short takes and mindful gaming live on TikTok,',
}

export interface PracticeCard {
  /** An id from `apps` in lib/data.ts. */
  id: string
  /** Background of the letter badge. */
  tint: string
  platform: string
  platformShort?: string
  blurb: string
  short: string
  cta: string
  ctaShort?: string
}

export const practice = {
  eyebrow: 'Practice',
  title: 'Apps for seekers, in beta now',
  lead: `${capitalized(word(betaCount))} tools you can try today. ${capitalized(word(labCount))} more are in the lab.`,
  seeAll: `See all ${word(apps.length)} apps`,
  cards: [
    {
      id: 'yggdrasil',
      tint: 'bg-lilac',
      platform: 'Web',
      blurb: 'A journal that shows you the shape of your own growth.',
      short: 'A journal that shows the shape of your growth.',
      cta: 'Join the waitlist',
    },
    {
      id: 'arcana',
      tint: 'bg-blush',
      platform: 'iPhone',
      blurb: 'A quiet tarot journal. Log every pull in seconds, with hints for all 78 cards.',
      short: 'A quiet tarot journal with hints for all 78 cards.',
      cta: 'Try it on TestFlight',
      ctaShort: 'Try on TestFlight',
    },
    {
      id: 'cartaluna',
      tint: 'bg-mist',
      platform: 'WebXR',
      blurb: 'A mixed-reality tarot table. Shuffle with your hands, read under a night sky.',
      short: 'A mixed-reality tarot table you shuffle by hand.',
      cta: 'Open Carta Luna',
      ctaShort: 'Open',
    },
    {
      id: 'lumenwright',
      tint: 'bg-heart',
      platform: 'VR and AR',
      platformShort: 'VR, AR',
      blurb: 'A hand-tracked experiment: can willpower be a game mechanic?',
      short: 'Can willpower be a game mechanic?',
      cta: 'Open Lumenwright',
      ctaShort: 'Open',
    },
  ] satisfies PracticeCard[],
}

export const reflect = {
  eyebrow: 'Reflect',
  title: 'Tarot as a mirror, not a forecast.',
  lead: 'Bring a question. I read the cards as a reflection of where you are, so you can choose where to go next.',
  short: 'Bring a question. I read the cards as a reflection of where you are.',
  cta: 'Book a reading',
  how: 'How it works',
  prices: [
    {
      label: 'Written',
      price: intakePackages.written.price,
      detail: '3 to 7 cards, back within 48 hours.',
      short: '3 to 7 cards, within 48 hours',
    },
    {
      label: 'Video',
      price: intakePackages.video.price,
      detail: 'About 5 minutes, recorded within 48 hours.',
      short: 'About 5 minutes, within 48 hours',
    },
    {
      label: 'Live',
      price: liveReadingRange(),
      detail: '15 to 45+ minutes by voice, video or VR.',
      short: 'Voice, video or VR',
    },
  ],
}

export const build = {
  eyebrow: 'Build · Screen Sage Studios',
  title: 'Websites for small businesses and creators.',
  lead: 'Landing pages, business sites and custom features like booking and payments. Mobile first, accessible and fast, with forms that email you.',
  short: 'Landing pages, business sites and custom features like booking and payments.',
  cta: 'Start a project',
  more: 'Services and process',
  moreShort: 'Services',
  note: 'A two-minute form, no commitment.',
  work: [
    {
      name: 'Arcana',
      description: 'App Store marketing, support and privacy pages for an iOS app.',
      short: 'App Store marketing, support and privacy pages.',
      href: '/apps/arcana',
      image: 'arcana' as const,
    },
    {
      name: 'The Formless Guide',
      description: 'A website for a mindfulness and personal-growth practice.',
      short: 'A site for a mindfulness and personal-growth practice.',
      href: 'https://theformlessguide.vercel.app/',
      image: 'formless' as const,
    },
  ],
}

export const meetIsa = {
  eyebrow: 'Meet Isa',
  title: "Hi, I'm Isa.",
  lead: 'I run Screen Sage Studios on my own. I turn philosophy, psychology and pop-culture stories into videos, readings, apps and games, drawing on Buddhism, Jung and a little quantum physics.',
  short: 'I run Screen Sage Studios on my own, turning philosophy, psychology and pop-culture stories into videos, readings, apps and games.',
  nowBuilding: 'Now building · Side Quests',
  nowBuildingShort: 'Now building',
  more: 'More about me',
  support: 'Support me on Ko-fi',
  supportShort: 'Support me',
}

export const journey = {
  eyebrow: 'Mailing list',
  title: 'Join the journey',
  lead: 'New videos, app drops and occasional dispatches.',
  label: 'Email address',
  cta: 'Join',
  note: 'Unsubscribe anytime.',
}

export const contact = {
  eyebrow: 'Contact',
  title: 'Say hello.',
  lead: 'Questions, readings, collaborations or a project in mind.',
  /** Desktop only. */
  leadMore: 'Write to me here.',
}
