import type { FaqItem } from '@/lib/app-content'
import { studio } from '@/lib/data'

// Copy for /studio (Studio Services). The facts — packages, prices, steps,
// work and terms — live in lib/data.ts (studio); this file is the words
// around them. It folds in the old /websites page, which now redirects here.
// Headings come as [plain, italic] so the italic half can be set in gold.

/** The Say hello section's id: package cards and the navbar jump here. */
export const HELLO_ID = 'hello'

const [onePage, presence, upkeep] = studio.packages

// Lowercased to sit mid-sentence, except acronyms like SEO.
const included = studio.included.map(i => (i === i.toUpperCase() ? i : i.charAt(0).toLowerCase() + i.slice(1)))

export const studioHero = {
  eyebrow: 'Screen Sage Studios',
  title: ['Studio', 'Services'],
  lead: 'Websites and a full online presence for local shops, built by Isa.',
  primary: 'See the packages',
  secondary: 'Say hello',
  whoForLabel: 'Built for',
  whoFor: [
    'Small businesses',
    'Creators and artists',
    'Wellness, mindfulness, and spiritual practices',
    'Anyone with something to offer',
  ],
}

export const studioPackagesCopy = {
  eyebrow: 'Packages',
  title: ['Three ways to', 'be found.'],
  featuredFlag: 'The whole presence',
  notSure: 'Not sure which one fits?',
  notSureCta: 'Say hello and tell me about your shop',
}

export const studioBeyond = {
  eyebrow: 'Beyond the packages',
  title: 'Need more than one page?',
  lead: 'I design, build, and launch your site, and make it fast, accessible, and easy to find on Google. Anything not listed in a package is quoted separately first.',
  includedLabel: 'Every site includes',
}

export const studioStepsCopy = {
  eyebrow: 'How it works',
  title: ['Three steps,', 'no runaround.'],
}

export const studioWorkCopy = {
  eyebrow: 'Recent work',
  title: ['Sites I’ve', 'built.'],
  visit: 'Visit the site',
  open: {
    kind: 'Open spot',
    name: 'Your business here',
    host: 'your-shop.com',
    body: 'This spot is open for the next shop.',
    cta: 'Say hello',
  },
}

export const studioFinePrintCopy = {
  eyebrow: 'The fine print',
  title: ['Plain terms,', 'no surprises.'],
  receiptTitle: 'Studio Services',
  receiptSub: 'Terms, up front',
}

export const studioContactCopy = {
  eyebrow: 'Contact',
  title: ['Say', 'hello.'],
  lead: 'Tell me about your shop.',
  emailLead: 'Or email',
}

export const studioFaq: FaqItem[] = [
  {
    q: 'How much does a website cost?',
    a: `The ${onePage.name} is ${onePage.price}. The ${presence.name}, the one-page site plus your Google Business Profile and social media basics, is ${presence.price}. ${upkeep.name} is ${upkeep.price} a month. Anything not listed in a package is quoted separately first.`,
  },
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
    a: `SEO is part of every build: clear page titles and descriptions, a sitemap, structured data, and fast, accessible pages that search engines can read. The ${presence.name} package also claims and fills in your Google Business Profile.`,
  },
  {
    q: 'Can you redesign the website I already have?',
    a: 'Yes. I take on redesigns as well as new websites, landing pages, and single features like booking or payments.',
  },
  {
    q: 'How do we get started?',
    a: `Say hello with the form on this page, or email ${studio.email}. A 50% deposit starts the work.`,
  },
]
