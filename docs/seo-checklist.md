# 🚀 Screen Sage: SEO launch checklist

Things only you can do: they happen outside the code. The code side (sitemap, structured data, share cards, new pages) is already live once this branch is deployed.

**Rules:** one box at a time. Each mission takes 10 minutes or less. You can stop after any mission; nothing breaks.
Do Missions 1–5 **the day the code is deployed**. Missions 6–8 can be any day.

---

## 🔑 Mission 1: New Sanctum password (5 min)
- [ ] Pick a **new** password. The old one is public in the git history.
- [ ] Go to vercel.com → **screenseiji** project → **Settings** → **Environment Variables**.
- [ ] Add: Name `SANCTUM_PASSWORD`, Value: your new password → **Save**.

✅ Done when you can see it in the list. (It takes effect on the redeploy in Mission 2.)

## 🔎 Mission 2: Tell Google the site exists (10 min)
- [ ] Go to **search.google.com/search-console** and sign in.
- [ ] Click **Add property** → choose **URL prefix** (the right box) → paste `https://screenseiji.vercel.app/` → **Continue**.
- [ ] Choose **HTML tag** → copy **only** the code inside `content="…"`.
- [ ] Back in Vercel's Environment Variables, add Name `GOOGLE_SITE_VERIFICATION`, Value: that code → **Save**.
- [ ] In Vercel, go to **Deployments** → latest → **⋯** → **Redeploy**. Wait for **Ready**.
- [ ] Back in Search Console, click **Verify**.

✅ Done when it says **"Ownership verified"**.

## 🗺️ Mission 3: Give Google the map (2 min)
- [ ] In Search Console's left menu, click **Sitemaps** → type `sitemap.xml` → **Submit**.

✅ Done when the status says **Success**. "Couldn't fetch" for a few hours is normal; check again tomorrow.

## 👀 Mission 4: Ask Google to look now (5 min)
In the search bar at the top of Search Console, paste each URL → Enter → **Request indexing**:
- [ ] `https://screenseiji.vercel.app/`
- [ ] `https://screenseiji.vercel.app/about`
- [ ] `https://screenseiji.vercel.app/apps`
- [ ] `https://screenseiji.vercel.app/tarot`
- [ ] `https://screenseiji.vercel.app/websites`

✅ Done when each one says **"Indexing requested"**.

## 🅱️ Mission 5: Bing (also feeds ChatGPT search, DuckDuckGo and Copilot) (5 min)
- [ ] Go to **bing.com/webmasters** → sign in → **Import from Google Search Console** → allow → pick the site → **Import**.

✅ Done when the site shows in your Bing dashboard.

🎉 **Break time. The urgent part is done.**

---

## 🔗 Mission 6: Link your profiles back (about 2 min each; do a few a day)
Paste `https://screenseiji.vercel.app` in the link or website field, and mention **Screen Sage Studios** in the bio. Keep your display names as they are.
- [ ] YouTube (Customize channel → Basic info → Links)
- [ ] TikTok
- [ ] Instagram
- [ ] Threads
- [ ] X (Edit profile → Website)
- [ ] Seeker's Soliloquy show description (Spotify for Creators; Apple Podcasts updates from the same feed)
- [ ] Gumroad
- [ ] Ko-fi
- [ ] Discord server (About or welcome channel)
- [ ] GitHub repo **astrayama/screenseiji** → ⚙️ next to "About" → Website
- [ ] GitHub profile README

💡 The same link everywhere teaches Google that all of these are one brand.

## ✅ Mission 7: Check it worked (one week later, 5 min)
- [ ] Google `site:screenseiji.vercel.app`. Your pages should show up.
- [ ] Google `Screen Sage Studios`. You should show up.
- [ ] Paste the site link into Discord or iMessage. A preview card with an image should appear.
- [ ] Paste the home URL into **search.google.com/test/rich-results**. It should find Organization and WebSite.

😬 Nothing yet after 2 weeks? In Search Console, run **URL inspection** on the home page, take a screenshot and send it to Claude.

## 🌱 Mission 8: Later, when it happens
- [ ] **An app goes live on the App Store:** set the seller name to **Screen Sage Studios**, then send Claude the App Store link so the placeholder in `lib/data.ts` gets swapped.
- [ ] **You buy a domain** (for example `screenseiji.com`): tell Claude. In code it's one setting (`NEXT_PUBLIC_SITE_URL`); you add the domain in Vercel, redirect the old vercel.app address to it, and add it in Search Console.
- [ ] **You launch an app:** post it on Product Hunt or Meta Quest App Lab, with a link back to the site.
