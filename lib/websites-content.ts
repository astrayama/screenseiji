import type { FaqItem } from '@/lib/app-content'
import { budgetRanges, studio } from '@/lib/data'

// Copy for /websites. Services, work and process live in lib/data.ts (studio).

// Lowercased to sit mid-sentence, except acronyms like SEO.
const included = studio.included.map(i => (i === i.toUpperCase() ? i : i.charAt(0).toLowerCase() + i.slice(1)))

export const websitesIntro = {
  eyebrow: 'Screen Sage Studios · Websites',
  title: 'Websites for small businesses and creators.',
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
    a: `Every site comes with ${included.slice(0, -1).join(', ')}, and ${included.at(-1)}. It goes live on your own domain.`,
  },
  {
    q: 'Can my site take bookings and payments?',
    a: 'Yes. I can build in online booking calendars, Stripe checkout, waitlists, and email capture. The tarot booking and checkout on this site are an example.',
  },
  {
    q: 'Will customers find my site on Google?',
    a: 'SEO is part of every build: clear page titles and descriptions, a sitemap, structured data, and fast, accessible pages that search engines can read.',
  },
  {
    q: 'Can you redesign the website I already have?',
    a: 'Yes. I take on redesigns as well as new websites, landing pages, and single features like booking or payments.',
  },
  {
    q: 'How much does a website cost?',
    a: `It depends on what you need. The project form lets you pick a budget range, from ${budgetRanges[0].toLowerCase()} to ${budgetRanges[budgetRanges.length - 2]}, and I quote from there.`,
  },
  {
    q: 'How do we get started?',
    a: `Click Start a project on this page, or email ${studio.email}. ${studio.process[1].body}`,
  },
]
