import type { LegalDoc } from '@/lib/app-content'
import { EMAIL } from '@/lib/site'

// The site-wide privacy policy (/privacy). The apps have their own policies.
// Written to describe what the code actually does — update it when that
// changes. It's a plain-language notice, not legal advice.

export const sitePrivacy: LegalDoc = {
  effective: 'Effective October 14, 2026',
  sections: [
    {
      title: 'The short version',
      body: [
        'This site doesn’t sell your data, doesn’t run ads, and only asks for personal details when you fill in a form. Analytics help me see which pages people visit; nothing here builds a profile of you.',
        'This policy covers the Screen Sage website. The apps have their own: [Arcana’s privacy policy](/apps/arcana/privacy) and [Anicca’s privacy policy](/apps/anicca/privacy).',
      ],
    },
    {
      title: 'Analytics',
      body: [
        'Google Analytics (GA4) measures visits — pages viewed, rough location, device and browser — and sets cookies in your browser to do it. Google processes that data under its own privacy policy: https://policies.google.com/privacy',
        'Vercel Web Analytics also counts page views. It doesn’t use cookies and doesn’t identify you.',
      ],
    },
    {
      title: 'Forms',
      body: [
        'The contact form, tarot intake form, live booking form, app waitlist, and Studio project form ask for your name, your email, and whatever you choose to write. Each submission is emailed to me through Resend, an email delivery service.',
        'Waitlist signups are also saved to a mailing list in Resend, so I can tell you when an app launches. Everything else stays in my inbox; it isn’t added to any list.',
        'The “Join the journey” mailing list on the home page asks only for your email. It’s saved to the same Resend list so I can send new videos, app drops and occasional dispatches, and every email has an unsubscribe link.',
      ],
    },
    {
      title: 'Payments',
      body: [
        'Tarot readings are paid through Stripe Payment Links. Checkout happens on Stripe’s own secure page, so your card details go to Stripe — this site never sees or stores them. Stripe’s privacy policy: https://stripe.com/privacy',
      ],
    },
    {
      title: 'Ko-fi',
      body: [
        'The floating “Support me” button loads a script from Ko-fi, which can see that you visited. If you choose to support me, that happens on Ko-fi under its own policies.',
      ],
    },
    {
      title: 'YouTube videos',
      body: [
        'The home page shows my latest YouTube video. Its thumbnail is fetched by this site, so your browser doesn’t contact YouTube until you press play. The video then plays in YouTube’s privacy-enhanced mode (youtube-nocookie.com), under Google’s privacy policy: https://policies.google.com/privacy',
      ],
    },
    {
      title: 'Fonts and links',
      body: [
        'The site’s fonts are served from this site, not loaded from Google Fonts while you browse. Links to YouTube, TikTok, Instagram, Spotify, and other services take you to sites with their own privacy policies.',
      ],
    },
    {
      title: 'How long data is kept',
      body: [
        'Form emails are kept as long as they’re useful for replying to you and keeping records. Waitlist and mailing-list contacts stay on the list until you unsubscribe or ask to be removed. Analytics data is kept according to Google’s and Vercel’s retention settings.',
      ],
    },
    {
      title: 'Your choices',
      body: [
        'You can block or clear cookies in your browser, or use a tracker blocker; the site works without them. To see, correct, or delete what you’ve sent me — or to leave the waitlist or mailing list — just email me.',
      ],
    },
    {
      title: 'Contact',
      body: [`Questions about this policy or your data: ${EMAIL}`],
    },
  ],
}
