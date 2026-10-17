import type { FaqItem } from '@/lib/app-content'
import { budgetRanges, studio } from '@/lib/data'

// Copy for /websites. Services, work and process live in lib/data.ts (studio).

// Lowercase for mid-sentence use, but leave acronyms like SEO alone.
const included = studio.included.map(i => (/^[A-Z]{2,}/.test(i) ? i : i.charAt(0).toLowerCase() + i.slice(1)))

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
    a: `Every site includes ${included.slice(0, -1).join(', ')}, and ${included.at(-1)}, launched on your own domain.`,
  },
  {
    q: 'Can my site take bookings and payments?',
    a: 'Yes. Online booking calendars, Stripe checkout, waitlists, and email capture are built right into your site. This site’s own tarot booking and checkout are an example.',
  },
  {
    q: 'Will customers find my site on Google?',
    a: 'Every site ships with the SEO basics: clear page titles and descriptions, a sitemap, structured data, and fast, readable pages. Rankings take time and depend on your market, so I can’t promise a spot on page one. Your site will be ready to be found.',
  },
  {
    q: 'Can you redesign the website I already have?',
    a: 'Yes. Redesigns are welcome, alongside new websites, landing pages, and single features like booking or payments.',
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
