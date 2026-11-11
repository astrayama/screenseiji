// Copy for the home page. Each section is a short teaser that hands off to its
// own page (/tarot, /apps, /websites, /about, /side-quests). Where the phone
// layout uses shorter copy, `short` holds it.

import { apps, intakePackages, liveReadingRange } from '@/lib/data'

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const word = (n: number) => NUMBER_WORDS[n] ?? String(n)
const capitalized = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// Out now or in beta: anything people can use today.
const availableCount = apps.filter(a => a.status !== 'lab').length
const labCount = apps.filter(a => a.status === 'lab').length

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
    description: 'Video essays on anime, film and games, and written reviews.',
    short: 'Video essays and reviews.',
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
    description: 'Tarot readings for your question, written, recorded or live.',
    short: 'Tarot readings, written or live.',
  },
  {
    id: 'build',
    title: 'Build',
    tag: 'For business',
    tagShort: 'Business',
    description: 'Sites for small businesses, with booking and payments.',
    short: 'Websites for small businesses.',
  },
] as const

export const watch = {
  eyebrow: 'Watch',
  title: 'The latest from the channel',
  allVideos: 'All videos on YouTube',
  lead: 'Long-form video essays that read anime, film and games for what they say about philosophy, psychology and inner work.',
  /** After "Latest video" or "Latest Short". */
  meta: 'YouTube @screenseiji · plays right here, no new tab',
  metaShort: 'plays right here',
  /** When the newest upload can't be looked up, the uploads playlist plays instead. */
  playlist: { label: 'Newest uploads', title: 'The newest videos and Shorts' },
  subscribe: 'Subscribe on YouTube',
  reviews: {
    eyebrow: 'Reviews',
    title: 'Film and series reviews',
    description: 'A score, a spoiler-free verdict and a spoiler zone for every film and episode I review.',
    cta: 'Read the reviews',
  },
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
  title: 'Apps for seekers, out now and in beta',
  lead: `${capitalized(word(availableCount))} tools you can try today. ${capitalized(word(labCount))} more are in the lab.`,
  seeAll: `See all ${word(apps.length)} apps`,
  cards: [
    {
      id: 'anicca',
      tint: 'bg-lilac',
      platform: 'iPhone',
      blurb: 'A calm mood and energy journal. Name a feeling, see it across seven energy centers.',
      short: 'Name a feeling, see it across seven energy centers.',
      cta: 'About Anicca',
      ctaShort: 'About',
    },
    {
      id: 'arcana',
      tint: 'bg-blush',
      platform: 'iPhone',
      blurb: 'A quiet tarot journal. Log every pull in seconds, with hints for all 78 cards.',
      short: 'A quiet tarot journal with hints for all 78 cards.',
      cta: 'About Arcana',
      ctaShort: 'About',
    },
    {
      id: 'cartaluna',
      tint: 'bg-mist',
      platform: 'WebXR',
      blurb: 'A mixed-reality tarot table. Shuffle with your hands, read under a night sky.',
      short: 'A mixed-reality tarot table you shuffle by hand.',
      cta: 'About Carta Luna',
      ctaShort: 'About',
    },
    {
      id: 'lumenwright',
      tint: 'bg-heart',
      platform: 'VR and AR',
      platformShort: 'VR, AR',
      blurb: 'A hand-tracked experiment: can willpower be a game mechanic?',
      short: 'Can willpower be a game mechanic?',
      cta: 'About Lumenwright',
      ctaShort: 'About',
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
  lead: 'Landing pages, business sites and custom features like booking and payments, built phone-first, fast and accessible, with forms that email you.',
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
