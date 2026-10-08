# Side Quests — design

Date: 2026-10-08 · Repos: `astrayama/screenseiji` (this), `astrayama/isa23-links`
Source brief: `claude-code-sidequests-prompts.md` (Prompts 1 + 2), refined with Bel's answers below.

## Goal

One hand-edited file, `content/side-quests.md` in the screenseiji repo, drives:

1. **screenseiji.vercel.app/side-quests**: a "Quests" tab (status cards) and a "Log" tab (post-it calendar).
2. **isa23-links "Now" strip**: active quests, condensed, fetched from the raw GitHub URL
   `https://raw.githubusercontent.com/astrayama/screenseiji/main/content/side-quests.md` (repo is public, branch `main`).

Editing quest data in two places is a bug.

## Decisions made with Bel (2026-10-08)

| Topic | Decision |
|---|---|
| Carta Luna | Align with the live MR beta: status **active**, question "What does a tarot reading feel like in mixed reality?", milestone "Gather feedback from the first beta testers", link `https://cartaluna-mr.vercel.app`. |
| Lumenwright link | The app, `https://lumenwright-nu.vercel.app` (matches "View project" and the homepage). |
| Lumenwright devlog | Add log entry for https://www.youtube.com/shorts/SJ_dLZOa5X4 ("Lumenwright devlog 01"), published 2026-10-04 (10:33pm ET). It's a devlog, not the demo Short, so "Next milestone: First public demo Short" stands. |
| Mobile log | Rolling feed (not strictly "this week"); see below. |
| Scope | Both repos, this session. |
| isa23 Now strip | **Merge**: the hand-written "Building" row is replaced by the active quests; Writing / Watching / Seeking stay hand-edited. |
| Pantheon / Duality | Dropped (not current). |

## Data file — `content/side-quests.md`

```
# Side Quests
> Main quest: self-mastery and self-expression.
<!-- colors: Lumenwright: #7c5cff, Carta Luna: #e8a2c8 -->

## <Quest title>
- **Status:** active | paused | complete
- **Question:** …
- **Next milestone:** …        (optional; empty = row hidden)
- **Link:** https://…          (optional)

### Log
- **YYYY-MM-DD:** text, newest last; continuation lines
  indented two spaces
```

`content/README.md` documents the format for Bel.

## Parser — `lib/side-quests/parse.ts`

Pure, dependency-free, erasable-TypeScript-only (Node can run it directly).
isa23 keeps a **byte-identical copy** so both sites apply the same rules.

Output:

```ts
type QuestStatus = 'active' | 'paused' | 'complete'
interface LogEntry  { date: string /* YYYY-MM-DD */; text: string }
interface Quest     { title; status; question; milestone?; link?; color; log: LogEntry[]; latest?: LogEntry }
interface DayEntry  { quest: string; color: string; text: string }
interface SideQuests {
  tagline: string
  quests: Quest[]                       // active → paused → complete, then file order
  colors: Record<string, string>        // every quest, pinned or fallback
  entriesByDate: Record<string, DayEntry[]> // keys ascending; per day in quest order, then file order
  warnings: string[]
}
```

Rules:

- **Strict.** Throws `SideQuestsParseError` (with 1-based line number) on: missing tagline;
  malformed/duplicate colors comment; invalid hex; colors naming a non-existent quest; duplicate
  quest titles (case-insensitive); unknown or duplicate field; missing/empty Status or Question;
  invalid status (lowercase only); Link not http(s); field after `### Log`; any `###` other than
  `Log`; malformed or impossible log date; empty log text; markdown link with a non-http(s) URL;
  any unexpected non-blank line. Screenseiji's build fails on these. Vercel keeps the last good
  deploy live.
- Field names are matched case-insensitively; values are trimmed.
- The `# Title` line is allowed and ignored (the page kicker is fixed: "Side Quests").
- HTML comments are ignored (line numbers preserved) except the `<!-- colors: … -->` line.
- Continuation lines (≥2 leading spaces) append to the preceding field or log entry with one space.
- CRLF is normalised.
- **Colors** parse `Name: #hex` pairs separated by commas (quest titles can't contain commas).
  A quest with no pinned color gets a fallback from a fixed palette indexed by a **hash of its
  title**, never its position, so adding quests never shifts colors. It also adds a warning.
- **Dates** stay `YYYY-MM-DD` strings; validated by a UTC round-trip; never `new Date('YYYY-MM-DD')`
  for display (that shifts a day west of UTC).
- Each quest's `log` is sorted by date (stable: same-day entries keep file order); `latest` is
  the last one.
- **Log text** is plain text except inline links: `[text](https://…)` and bare `http(s)://` URLs.
  `parseInline(text)` splits text into `{ text }` / `{ text, href }` segments for renderers.

## Loader — `lib/side-quests/load.ts`

Server-only. Reads `content/side-quests.md` via `fs` at build time, rethrows parse errors with
the file path and line, and prints warnings. `/side-quests` stays fully static (`○`).

## `/side-quests` page

- Same chrome as home: `SparkleBackground`, `Navbar`, `AccessibilityPanel`, and the footer,
  which is extracted to `components/SiteFooter.tsx` and shared.
- Metadata: title "Side Quests — Screen Sage", description = tagline.
- Intro: "Side Quests" gold kicker + tagline as the page `<h1>`.
- **Tabs**: "Quests" | "Log". WAI-ARIA tablist (arrow keys, Home/End). `#log` deep-links to Log;
  switching uses `history.replaceState`. SSR always renders Quests.
- **Quest cards** (1 col; 2 cols ≥ md), `glass` panel with a thin top bar in the quest color:
  1. Title + status badge (active emerald, paused amber, complete violet)
  2. Question: italic display font, the visual headline
  3. "Latest log": date ("Oct 7, 2026") + text (links rendered)
  4. "Next milestone" (omitted when empty)
  5. "View project ↗" when Link is set (new tab)
  - No descriptions or feature lists. Empty state if there are no quests.
- **Log tab**
  - Legend: every quest's color swatch + title, in quest order.
  - **Desktop (≥ 640px):** Sunday-first month grid. The initial month and "today" are computed
    in the browser (Log only mounts client-side, so there's no build-date staleness and no
    hydration mismatch). Prev/next are bounded by
    `[min(first entry month, current month), max(last entry month, current month)]`; a
    "Today" button returns to the current month. Today's cell is highlighted. Each entry is
    a mini post-it in its quest color (deterministic tilt, shadow, CSS-only paper texture).
    More than 4 entries in a day shows the first 4 + a "+N more" chip. Cells with entries are
    buttons that open the existing `Modal` with the day's entries grouped by quest (color chip
    + name, quest order). Empty days render empty and aren't focusable.
    Code comment: Bel backfills a few October entries before sharing publicly.
  - **Mobile (< 640px):** rolling agenda feed instead of the grid. Weeks (Sunday start, viewer's
    local time), newest first. "This week" is always shown ("Nothing logged yet this week." when
    empty); other weeks appear only if they have entries, labelled "Last week", "Next week" or a
    range ("Sep 20 – 26", "Sep 27 – Oct 3", with years when they differ from the current year).
    Future-dated weeks sit above "This week". Day headers ("Today" / "Wed, Oct 7") with
    full-width post-its stacked beneath (quest name + text). Shows 4 entry-weeks beyond this
    week, then "Show earlier" reveals 4 more.
  - Post-it text color is chosen per quest color for contrast (dark on light, light on dark).
  - Hover lift only under `motion-safe`.
- **Nav**: "Side Quests" → `/side-quests`, after "Apps", `aria-current="page"` when active. All
  section links become `/#…` (and the logo `/#home`) so they work from `/side-quests`. Verify no
  desktop overflow; move the desktop breakpoint if needed.

## isa23-links — Now strip

- `lib/side-quests/parse.ts`: byte-identical copy.
- `lib/side-quests/fetch.ts`: `getActiveQuests()` fetches the raw URL with
  `next: { revalidate: 3600 }`, parses, keeps `status === 'active'`, maps to
  `{ title, color, link?, latest? }`.
  - Error during **build** (`NEXT_PHASE === 'phase-production-build'`) → returns `null`, and the strip
    shows "Quest log updating — check back soon."
  - Error at **runtime revalidation** → throw, so Next keeps serving the last good page and retries.
- Home page: `export const revalidate = 3600`.
- `NowStrip`: the active-quest rows (color dot, title, latest log on one truncated line with links
  rendered, ↗ icon when Link exists), then "View all quests →"
  (`https://screenseiji.vercel.app/side-quests`), then the hand-edited Writing / Watching /
  Seeking rows. The "Building" item is removed from `lib/now.ts`. With no active quests, only
  "View all quests →" shows.
- Work branches from `origin/main` (local main is 2 commits behind).

## Testing

- Parser unit tests with Node's built-in runner (`node --test`, Node 24 strips types natively):
  no new dependencies. `npm test` script.
- `npm run lint`, `npm run build` (confirm `/side-quests` is `○` static).
- Browser checks: desktop + 375px, tabs, `#log` deep link, month nav bounds, modal, "+N more",
  mobile feed, nav links from both pages; isa23 strip renders live data.

## Delivery

One PR per repo. Merge screenseiji first; until then isa23 shows the fallback message (no breakage).
