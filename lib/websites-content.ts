import type { FaqItem } from '@/lib/app-content'
import { budgetRanges, studio } from '@/lib/data'

// Copy for /websites. Services, work and process live in lib/data.ts (studio),
// shared with the home page's Studio banner.

const included = studio.included.map(i => i.toLowerCase())

export const websitesIntro = {
  eyebrow: 'Screen Sage Studios · Websites',
  title: 'Websites for small businesses and more.',
  lead: studio.subhead,
  whoFor: [
    'Small businesses',
    'Creators and artists',
    'Wellness, mindfulness, and spiritual practices',
    'Anyone with something to offer',
  ],
}

export const websitesFaq: FaqItem[] = [
  {
    q: 'What does a website from Screen Sage Studios include?',
    a: `Every site includes ${included.slice(0, -1).join(', ')}, and ${included.at(-1)} — designed mobile-first and launched on your own domain.`,
  },
  {
    q: 'Can my site take bookings and payments?',
    a: 'Yes. Online booking calendars, Stripe checkout, waitlists, and email capture are built in, not bolted on. This site’s own tarot booking and checkout are an example.',
  },
  {
    q: 'Will customers find my site on Google?',
    a: 'SEO is part of every build: clear page titles and descriptions, a sitemap, structured data, and fast, accessible pages that search engines can read.',
  },
  {
    q: 'Can you redesign the website I already have?',
    a: 'Yes — redesigns are welcome, alongside new websites, landing pages, and single features like booking or payments.',
  },
  {
    q: 'How much does a website cost?',
    a: `It depends on what you need. The project form lets you pick a budget range, from ${budgetRanges[0].toLowerCase()} to ${budgetRanges[budgetRanges.length - 2]}, and the reply comes with a plan, a timeline, and a quote.`,
  },
  {
    q: 'How do we get started?',
    a: `${studio.process[0].body} ${studio.process[1].body}`,
  },
]
