# Screen Sage Studios

**[screenseiji.vercel.app](https://screenseiji.vercel.app)** — where spirituality, science, and story collide.

Screen Sage Studios is Isa's one-person studio: anime edits and philosophical video essays, tarot readings for self-reflection, apps for seekers, and websites for small businesses. **Screen Sage** is the brand; **screenseiji** is the handle — Screen Sage spelled the Japanese way, home of the anime edits — on [YouTube](https://www.youtube.com/@screenseiji), [TikTok](https://www.tiktok.com/@screenseiji), [Instagram](https://instagram.com/screenseiji), [Threads](https://threads.net/@screenseiji) and [X](https://x.com/screenseiji).

| Page | What's there |
|---|---|
| [/](https://screenseiji.vercel.app) | The whole studio, section by section |
| [/about](https://screenseiji.vercel.app/about) | Who Screen Sage Studios is |
| [/apps](https://screenseiji.vercel.app/apps) | All seven apps — [Arcana](https://screenseiji.vercel.app/apps/arcana) (tarot journal for iPhone), [Anicca](https://screenseiji.vercel.app/apps/anicca) (mood & energy journal), [Carta Luna](https://screenseiji.vercel.app/apps/cartaluna) (mixed-reality tarot for Meta Quest 3), Yggdrasil, Lumenwright, Kairos, Sunya |
| [/tarot](https://screenseiji.vercel.app/tarot) | Written, video, and live tarot readings |
| [/websites](https://screenseiji.vercel.app/websites) | Websites for small businesses |
| [/side-quests](https://screenseiji.vercel.app/side-quests) | What's being built right now |

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · framer-motion · Resend for form email · Vercel hosting and analytics.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # unit tests (Node's built-in runner)
npm run lint
npm run build
```

Copy `.env.example` to `.env.local` and fill it in — it documents every variable: Resend (all forms), `SANCTUM_PASSWORD`, `NEXT_PUBLIC_SITE_URL` (only for a custom domain), and the search engine verification codes.

## Where things live

- `app/` — routes. Each page sets its metadata with `pageMetadata()` and its structured data with `<JsonLd>`; each page folder has an `opengraph-image.tsx` share card.
- `lib/routes.ts` — the registry of every page: title, description, sitemap priority, breadcrumbs, share-card text. Add new pages here (a test checks).
- `lib/site.ts` — the site URL and the brand's names. A custom domain is a one-line change here (or `NEXT_PUBLIC_SITE_URL`).
- `lib/structured-data.ts` — schema.org JSON-LD: the organization, its profiles, apps, services, FAQs.
- `lib/data.ts` — apps, tarot offerings and prices, social links, Studio services. Page copy lives in `lib/*-content.ts`.
- `content/side-quests.md` — the Side Quests log (see `content/README.md`).
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `app/llms.txt/` — generated from the registry and data.
- `docs/seo-checklist.md` — the off-site SEO steps (Search Console, Bing, profile links).
