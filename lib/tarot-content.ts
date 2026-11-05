import type { FaqItem } from '@/lib/app-content'
import { intakePackages, liveReading } from '@/lib/data'

// Copy for /tarot. Prices and booking rules are read from lib/data.ts so the
// page, the FAQ, and the structured data can never disagree with checkout.

const { written, video } = intakePackages
const firstTier = liveReading.tiers[0]
const lastTier = liveReading.tiers.at(-1)!
const { minNoticeHours, daysAhead } = liveReading.availability

export const tarotIntro = {
  eyebrow: 'Tarot readings online',
  title: 'Tarot readings for self-reflection.',
  lead: [
    'I read tarot as a symbolic language for self-reflection. The cards help you look clearly at what you already know.',
    'I read for you in writing, on a recorded video, or live by voice call, video call, or in VR. Every reading starts with your question.',
  ],
}

export const tarotFaq: FaqItem[] = [
  {
    q: 'Does tarot predict the future?',
    a: 'Not here. I read the cards as a symbolic language that helps you see your situation, your patterns, and your options more clearly. What you do next is up to you.',
  },
  {
    q: 'What kinds of readings can I book?',
    a: `A written reading (${written.price} ${written.priceUnit}: ${written.details.join(', ').toLowerCase()}), a recorded video reading (${video.price} ${video.priceUnit}: ${video.details.join(', ').toLowerCase()}), or a live reading by voice call, video call, or VR, from ${firstTier.price} for ${firstTier.label} to ${lastTier.price} for ${lastTier.label}.`,
  },
  {
    q: 'How does ordering a written or video reading work?',
    a: 'Share your question in the short intake form on this page (for a written reading, you can add anything else I should know), then pay through Stripe’s secure checkout. Your reading arrives within 48 hours.',
  },
  {
    q: 'How do live readings work?',
    a: `Choose a format (voice, video, or VR), a length, and an open time slot right on this page, and I confirm by email. Slots open at least ${minNoticeHours} hours ahead and up to ${daysAhead / 7} weeks out, shown in your own time zone.`,
  },
  {
    q: 'What is a VR tarot reading?',
    a: 'A live reading where we meet in virtual reality instead of on a call. Choose "VR experience" when you book. To read for yourself in mixed reality, try Carta Luna, the Screen Sage tarot app for Meta Quest 3. It runs right in the Quest Browser, and friends can watch your reading from a phone or computer.',
  },
  {
    q: 'Can I keep a journal of my own readings?',
    a: 'Yes. Arcana, the Screen Sage tarot journal for iPhone, keeps every pull and spread, with meaning hints for all 78 cards. It’s in public beta on TestFlight.',
  },
]
