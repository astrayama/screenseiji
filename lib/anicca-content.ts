// All copy for the Anicca pages (/apps/anicca). Facts mirror Anicca 1.0.0 —
// keep plans, prices, and data handling in sync with the shipping app.

import type { FaqItem, LegalDoc } from '@/lib/app-content'

export const aniccaApp = {
  version: '1.0.0',
  requires: 'iOS 17',
}

// The seven energy centers, Root → Crown, in the app's colours.
export const energyCenters = [
  { id: 'root', name: 'Root', color: '#C0392B' },
  { id: 'sacral', name: 'Sacral', color: '#E67E22' },
  { id: 'solar-plexus', name: 'Solar Plexus', color: '#F1C40F' },
  { id: 'heart', name: 'Heart', color: '#27AE60' },
  { id: 'throat', name: 'Throat', color: '#2980B9' },
  { id: 'third-eye', name: 'Third Eye', color: '#3F51B5' },
  { id: 'crown', name: 'Crown', color: '#8E44AD' },
] as const

export type EnergyCenterId = (typeof energyCenters)[number]['id']

export function energyCenter(id: EnergyCenterId) {
  return energyCenters.find(c => c.id === id)!
}

export const aniccaHero = {
  eyebrow: 'Anicca',
  headlineTop: 'Read your energy.',
  headlineGradient: 'Understand yourself.',
  sub: 'A calm mood & energy journal for iPhone. Check in with how you feel, see where it sits across seven energy centers, and notice your patterns over time.',
  chips: ['Seven energy centers', '98 emotions', 'Matched on-device'],
  // Closing CTA — the app is named for the Pali word for impermanence.
  meaning: 'Anicca · impermanence',
  tagline: 'Nothing you feel is permanent — but all of it is worth noticing.',
}

export interface AniccaFeature {
  id: string
  eyebrow: string
  headline: string
  body: string
  visual: 'map' | 'checkin' | 'balance' | 'timeline' | 'reflection' | 'keep'
  chips?: string[]
  pro?: boolean
}

export const aniccaFeatures: AniccaFeature[] = [
  {
    id: 'map',
    eyebrow: 'Map my feelings',
    headline: 'Say it in your own words.',
    body: 'Type how you feel, however it comes out. Anicca matches your words to emotions right on your iPhone, using Apple’s built-in language tools — nothing is sent anywhere for analysis.',
    visual: 'map',
  },
  {
    id: 'checkin',
    eyebrow: 'The emotion library',
    headline: 'Or find the exact word.',
    body: 'Browse a library of 98 emotions, rate how strongly you feel it from 1 to 5, and add a note if you want to remember why.',
    visual: 'checkin',
    chips: ['98 emotions', 'Intensity 1–5', 'Optional note'],
  },
  {
    id: 'balance',
    eyebrow: 'Chakra balance',
    headline: 'See where your energy gathers.',
    body: 'Every check-in belongs to one of seven energy centers, from Root to Crown. Your balance chart and energy-center breakdown show where your feelings have been gathering lately.',
    visual: 'balance',
  },
  {
    id: 'timeline',
    eyebrow: 'Mood timeline',
    headline: 'Patterns, gently surfaced.',
    body: 'Follow how your mood moves across the days, with your recent check-ins close at hand — so the shape of a week is easy to see.',
    visual: 'timeline',
  },
  {
    id: 'reflection',
    eyebrow: 'Weekly reflection',
    headline: 'A quiet look back, every week.',
    body: 'Each week, Anicca offers a short reflection on your check-ins, with practices to try. It’s built right on your iPhone from your own entries — no AI service, nothing sent away to be analyzed.',
    visual: 'reflection',
    pro: true,
  },
  {
    id: 'keep',
    eyebrow: 'Reminders & export',
    headline: 'Gentle nudges. Your data, to keep.',
    body: 'Daily reminders are free for everyone, at the time you choose. And your journal is yours to take with you — export it as JSON anytime, or as a PDF with Pro.',
    visual: 'keep',
    chips: ['Daily reminders', 'JSON export', 'PDF with Pro'],
  },
]

export const aniccaPromises = [
  {
    title: 'Matched on your iPhone',
    body: 'What you type into “Map my feelings” is analyzed on-device and never stored or sent. Only the emotions you confirm are saved.',
  },
  {
    title: 'Your account, your rows',
    body: 'Sign in with Apple, Google, or email. Check-ins sync to your account as a backup, readable only by you.',
  },
  {
    title: 'No ads, no tracking',
    body: 'No third-party analytics in the app, and we never sell your data. Your feelings are yours.',
  },
]

export interface AniccaPlan {
  id: string
  name: string
  price: string
  cadence?: string
  yearly?: string
  blurb: string
  features: string[]
  highlight?: boolean
}

export const aniccaPlans: AniccaPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    blurb: 'Everything you need to start checking in.',
    features: ['30 check-ins a month', 'Gentle daily reminders', 'Export as JSON'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$4.99',
    cadence: '/month',
    yearly: 'or $39.99/year',
    blurb: 'For a steady, everyday practice.',
    features: [
      'Unlimited check-ins',
      'Weekly reflection & practice suggestions',
      'Streaks',
      '14-day and monthly timelines',
      'PDF export',
    ],
    highlight: true,
  },
  {
    id: 'bundle',
    name: 'Bundle',
    price: '$8.99',
    cadence: '/month',
    yearly: 'or $69.99/year',
    blurb: 'Anicca and Yggdrasil, together.',
    features: ['Everything in Pro', 'Yggdrasil integration', 'Deep sync — coming soon'],
  },
]

export const aniccaPricingNote =
  'Subscriptions renew automatically through Apple — cancel anytime in your App Store settings. Prices in USD; the App Store shows your local price.'

export const aniccaDisclaimer =
  'Anicca is a tool for self-reflection. It isn’t medical advice, therapy, or a diagnosis.'

export const aniccaFaq: FaqItem[] = [
  {
    q: 'What are the energy centers?',
    a: 'Anicca looks at your feelings through seven energy centers, from Root to Crown: Root, Sacral, Solar Plexus, Heart, Throat, Third Eye, and Crown. Each check-in belongs to one of them, and over time your chakra balance chart and energy-center breakdown show where your feelings tend to gather. They’re a lens for reflection — not a medical or scientific measurement.',
  },
  {
    q: 'Is my journal private?',
    a: 'Yes. When you use “Map my feelings”, what you type is matched to emotions on your iPhone with Apple’s built-in language tools — it’s never stored or sent anywhere. Only the emotions you confirm (and a note, if you add one) are saved. Your check-ins then sync to your Anicca account as a backup, in a database that only lets your account read them. No ads, no tracking, and we never sell your data.',
  },
  {
    q: 'What’s the difference between Free and Pro?',
    a: 'Free gives you 30 check-ins a month, daily reminders, and JSON export. Pro ($4.99/month or $39.99/year) adds unlimited check-ins, the weekly reflection with practice suggestions, streaks, 14-day and monthly timelines, and PDF export. The Bundle ($8.99/month or $69.99/year) includes everything in Pro plus Yggdrasil integration, with deep sync coming soon.',
  },
  {
    q: 'How do I cancel my subscription?',
    a: 'Subscriptions are managed by Apple. On your iPhone, open Settings → your name → Subscriptions → Anicca, then tap Cancel Subscription. Cancel at least 24 hours before the end of the current period to stop it renewing — you keep your plan until then. Deleting the app or your account doesn’t cancel a subscription on its own.',
  },
  {
    q: 'How do I restore my purchases?',
    a: 'Make sure you’re signed in to the same Apple Account you subscribed with, and to the same Anicca account, then tap Restore Purchases in Anicca. If your plan still doesn’t show up, email us with the address you use for Anicca and we’ll sort it out.',
  },
  {
    q: 'How do I export my data?',
    a: 'You can export your check-ins anytime — as JSON on any plan, or as a PDF with Pro. Exports are created on your iPhone and only go where you choose to save or share them.',
  },
  {
    q: 'How do I delete my account?',
    a: 'Go to Settings → Delete My Account in Anicca. You’ll be asked to sign in again to confirm; then your account and all synced data — profile, check-ins, and emotions — are permanently deleted. This can’t be undone, so export first if you’d like a copy. Deleting your account doesn’t cancel a subscription: do that in your App Store settings.',
  },
  {
    q: 'My reminders aren’t arriving. What can I do?',
    a: 'Reminders are scheduled on your iPhone itself, so they don’t need a connection. First, check that the daily reminder is switched on in Anicca, with the time you want. Then open iPhone Settings → Notifications → Anicca and make sure Allow Notifications is on. A Focus mode or Scheduled Summary can also hold notifications back. If you’ve reinstalled Anicca, open it once so your reminder can be set up again.',
  },
]

export const aniccaPrivacy: LegalDoc = {
  effective: 'Effective September 2026 · Applies to Anicca 1.0.0',
  sections: [
    {
      title: 'The short version',
      body: [
        'Anicca is a journal for your feelings, and we’ve tried to treat it like one. There are no ads, no tracking, and no analytics inside the app, and we never sell your data. The words you type to map your feelings are analyzed on your iPhone and never leave it. The check-ins you save are synced to your own account so they’re backed up — and only your account can read them.',
      ],
    },
    {
      title: 'What Anicca stores',
      body: [
        'Your account: your email address, display name, and how you sign in — with Apple (including Apple’s “Hide My Email” relay address, if you choose it), with Google, or with email and a password. Sign-in is handled by Supabase Auth.',
        'Your check-ins: the emotions you choose, how intense each one felt, its energy center, when you checked in, and the note you write, if you add one.',
        'Your profile stats: your streak, total check-ins, the date of your last check-in, whether reminders are on and at what time, and your plan.',
      ],
    },
    {
      title: 'Your journal text stays on your phone',
      body: [
        'When you use “Map my feelings”, the words you type are matched to emotions on your iPhone, using Apple’s built-in language tools. That text is never stored and never sent anywhere — not to us, and not to anyone else. Only the emotions you confirm are saved, plus a note if you choose to write one.',
        'Your weekly reflection and practice suggestions are generated on your iPhone, too, from your own check-ins. Anicca doesn’t use AI services or send your entries anywhere to be analyzed.',
      ],
    },
    {
      title: 'Your account & sync',
      body: [
        'Your check-ins are kept on your iPhone and synced to your Anicca account, so they’re backed up and waiting when you sign in again. They’re stored in a Supabase database protected by per-user row-level security, which means the database only lets your signed-in account read or change your rows.',
      ],
    },
    {
      title: 'Subscriptions',
      body: [
        'Pro and Bundle subscriptions are purchased through Apple, and Apple handles payment — we never see your card details. We use RevenueCat to process your subscription status and purchase history, linked to your Anicca account ID, so your plan follows you when you sign in.',
      ],
    },
    {
      title: 'Notifications',
      body: [
        'Daily reminders are scheduled locally on your iPhone. There are no push servers involved — nothing leaves your device to make a reminder happen. You can change the time or switch reminders off whenever you like.',
      ],
    },
    {
      title: 'What we never do',
      body: [
        'No ads. No tracking. No third-party analytics in the app. We never sell your data or share it with advertisers or data brokers. The only services that handle it are the ones named on this page — Supabase for your account and sync, RevenueCat and Apple for subscriptions, and the sign-in provider you choose — and only to run Anicca.',
        '(This policy covers the Anicca app. This website, like most, uses standard visit analytics — the app itself contains none.)',
      ],
    },
    {
      title: 'Links outside the app',
      body: [
        'Anicca links to Yggdrasil, a separate Screen Sage website. It opens outside the app and has its own policies.',
      ],
    },
    {
      title: 'Exporting & deleting your data',
      body: [
        'You can export your check-ins anytime — as JSON on any plan, or as a PDF with Pro. Exports are created on your iPhone and only go where you choose to save or share them.',
        'To delete everything, go to Settings → Delete My Account. You’ll be asked to sign in again to confirm. This permanently deletes your account and all synced data — your profile, check-ins, and emotions — and can’t be undone.',
        'Deleting your account doesn’t cancel a subscription; cancel that separately in your App Store settings. Apple and RevenueCat keep their own subscription records — email us and we’ll help with any request about them.',
      ],
    },
    {
      title: 'Children',
      body: [
        'Anicca isn’t directed to children under 13, and we don’t knowingly collect their personal information. If you believe a child under 13 has created an account, let us know and we’ll remove it.',
      ],
    },
    {
      title: 'Changes & contact',
      body: [
        'If this policy ever changes, the update will appear on this page with a new effective date. Questions, concerns, or requests — write to screenseiji@proton.me and a human (the one who builds Anicca) will answer.',
      ],
    },
  ],
}

export const aniccaTerms: LegalDoc = {
  effective: 'Effective September 2026 · Applies to Anicca 1.0.0',
  sections: [
    {
      title: 'Agreeing to these terms',
      body: [
        'These terms are an agreement between you and Screen Sage Studios (“we”, “us”) about your use of Anicca. By creating an account or using the app, you agree to them. If you don’t agree, please don’t use Anicca.',
        'They sit alongside our [Privacy Policy](/apps/anicca/privacy), which explains what we store and how we handle it.',
      ],
    },
    {
      title: 'What Anicca is — and isn’t',
      body: [
        'Anicca is a self-reflection tool: a place to notice your feelings and the patterns in them, seen through seven energy centers.',
        'It is not medical advice, therapy, or a diagnosis, and it isn’t a substitute for care from a qualified professional. The energy-center framework is a lens for reflection, not a medical or scientific assessment.',
        'If you’re in crisis or thinking about harming yourself, please contact your local emergency services or a crisis line right away. In the US, you can call or text 988 to reach the Suicide & Crisis Lifeline.',
      ],
    },
    {
      title: 'Your account',
      body: [
        'You can sign in with Apple, Google, or email. Please give accurate information and keep your sign-in details secure — you’re responsible for activity under your account.',
        'You need to be at least 13 to use Anicca. If you’re under the age of majority where you live, please use it with a parent or guardian’s permission.',
      ],
    },
    {
      title: 'Plans & subscriptions',
      body: [
        'Anicca is free to use with up to 30 check-ins a month. Pro ($4.99/month or $39.99/year) and the Bundle ($8.99/month or $69.99/year) add more, as described in the app. Prices can vary by region; the App Store shows yours before you buy.',
        'Payment is charged to your Apple Account at confirmation of purchase. Your subscription renews automatically unless cancelled at least 24 hours before the end of the current period. Manage or cancel anytime in your App Store settings.',
        'Refunds are handled by Apple under its policies — we can’t issue them directly. You can request one at [reportaproblem.apple.com](https://reportaproblem.apple.com).',
        'Features marked “coming soon”, like Yggdrasil deep sync, aren’t promised on any particular timeline.',
      ],
    },
    {
      title: 'Apple’s terms',
      body: [
        'If you downloaded Anicca from the App Store, Apple’s [Standard Licensed Application End User License Agreement](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/) also applies, and these terms add to it. Apple isn’t a party to these terms and isn’t responsible for Anicca or its content.',
      ],
    },
    {
      title: 'Your content',
      body: [
        'Your check-ins and notes are yours. We don’t claim ownership of anything you write in Anicca.',
        'You give us permission only to store, sync, and process your content as needed to run Anicca for you — for example, backing up your check-ins to your account. We don’t use it for anything else.',
      ],
    },
    {
      title: 'Acceptable use',
      body: [
        'Please use Anicca for its intended purpose and within the law. Don’t try to access other people’s accounts or data, interfere with or disrupt the app or the services it relies on, reverse-engineer it except where the law allows, or use it to harm anyone.',
      ],
    },
    {
      title: 'Intellectual property',
      body: [
        'Anicca — its design, code, text, and artwork, and the Anicca and Screen Sage names — belongs to Screen Sage Studios. These terms give you a personal, non-transferable right to use the app; they don’t transfer any ownership to you.',
      ],
    },
    {
      title: 'Ending your account',
      body: [
        'You can stop using Anicca at any time, and delete your account from Settings → Delete My Account. Deleting your account doesn’t cancel an App Store subscription — cancel that in your App Store settings.',
        'We may suspend or close accounts that break these terms or put the service or other people at risk. If we ever discontinue Anicca, we’ll try to give you reasonable notice and a chance to export your data.',
      ],
    },
    {
      title: 'Disclaimers & limitation of liability',
      body: [
        'Anicca is provided “as is” and “as available”. We work hard to keep it reliable, but we can’t promise it will always be available or error-free, or that data will never be lost — so exporting now and then is a good idea.',
        'To the fullest extent the law allows, Screen Sage Studios isn’t liable for indirect, incidental, or consequential damages, or for decisions you make based on what you see in the app. Our total liability for any claim relating to Anicca is limited to the amount you paid for it in the 12 months before the claim.',
        'Some places don’t allow these limits, so they may not all apply to you. Nothing in these terms limits rights you have under consumer-protection laws that can’t be waived.',
      ],
    },
    {
      title: 'Governing law',
      body: [
        'These terms are governed by the laws of the United States of America, without regard to conflict-of-law rules. This doesn’t take away any protections you have under the consumer laws where you live.',
      ],
    },
    {
      title: 'Changes to these terms',
      body: [
        'We may update these terms as Anicca changes. The latest version will always be on this page with a new effective date, and if a change is significant, we’ll do our best to let you know before it takes effect. Continuing to use Anicca after a change means you accept the updated terms.',
      ],
    },
    {
      title: 'Contact',
      body: [
        'Questions about these terms? Write to screenseiji@proton.me — a human (the one who builds Anicca) will answer.',
      ],
    },
  ],
}

// Sample content for the illustrative cards on the landing page.
export const aniccaMock = {
  map: {
    typed: 'Can’t stop worrying about tomorrow, but so thankful for today.',
    matches: [
      { emotion: 'Anxious', center: 'root' },
      { emotion: 'Grateful', center: 'heart' },
    ] as { emotion: string; center: EnergyCenterId }[],
  },
  checkin: {
    library: [
      { emotion: 'Calm', center: 'heart' },
      { emotion: 'Grateful', center: 'heart' },
      { emotion: 'Curious', center: 'third-eye' },
      { emotion: 'Confident', center: 'solar-plexus' },
      { emotion: 'Playful', center: 'sacral' },
      { emotion: 'Unheard', center: 'throat' },
      { emotion: 'Restless', center: 'root' },
      { emotion: 'Connected', center: 'crown' },
    ] as { emotion: string; center: EnergyCenterId }[],
    selected: 'Grateful',
    intensity: 4,
    note: 'Long walk with M. after work.',
  },
  // 0–1 share of recent check-ins per center, Root → Crown
  balance: [0.52, 0.4, 0.64, 0.86, 0.46, 0.6, 0.36],
  breakdown: [12, 8, 15, 24, 9, 14, 6],
  timeline: {
    days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    // mood level per day, 0 (heavy) – 1 (light)
    points: [0.42, 0.55, 0.3, 0.48, 0.66, 0.78, 0.7],
    recent: [
      { emotion: 'Content', center: 'heart', when: 'Today', intensity: 3 },
      { emotion: 'Focused', center: 'third-eye', when: 'Yesterday', intensity: 4 },
      { emotion: 'Worried', center: 'root', when: 'Wednesday', intensity: 2 },
    ] as { emotion: string; center: EnergyCenterId; when: string; intensity: number }[],
  },
  reflection: {
    heading: 'Your week',
    body: 'Heart came up most often, usually alongside Grateful and Calm. Root rose midweek, when things felt uncertain.',
    practiceLabel: 'A practice to try',
    practice: 'Five slow breaths before bed, noticing where you feel them.',
  },
  reminder: { label: 'Daily reminder', time: '8:30 PM' },
}
