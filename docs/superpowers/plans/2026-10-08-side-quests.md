# Side Quests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** One hand-edited markdown file drives a `/side-quests` page (quest cards + post-it calendar) on screenseiji and the active-quest rows of isa23-links' Now strip.

**Architecture:** A pure, dependency-free parser (`lib/side-quests/parse.ts`, byte-identical in both repos) turns the markdown into typed data. Screenseiji reads the file with `fs` at build time (static page); isa23 fetches the raw GitHub URL with hourly ISR. Display math (dates, weeks, contrast) lives in a separate pure module so it can be unit-tested with Node's built-in runner.

**Tech Stack:** Next.js 16.2.9 App Router, React 19, Tailwind v4 (screenseiji) / v3 (isa23), TypeScript, `node --test` (Node 24 strips types natively).

**Spec:** `docs/superpowers/specs/2026-10-08-side-quests-design.md`

## Global Constraints

- No new npm dependencies in either repo.
- Data file path: `content/side-quests.md`; raw URL `https://raw.githubusercontent.com/astrayama/screenseiji/main/content/side-quests.md`.
- Statuses: `active` | `paused` | `complete` (lowercase only). Sort order active → paused → complete, then file order.
- Status badge colors: active emerald, paused amber, complete violet.
- Desktop/mobile switch for the Log tab at 640px (`sm:`).
- More than 4 entries in a day: show 4 + "+N more".
- isa23 fallback copy, exact: `Quest log updating — check back soon.`
- isa23 link copy, exact: `View all quests →` → `https://screenseiji.vercel.app/side-quests`.
- `parse.ts` must stay erasable-only TypeScript (no enums/namespaces/parameter properties) and import nothing.
- Dates are `YYYY-MM-DD` strings end to end; format them with `Intl.DateTimeFormat(..., { timeZone: 'UTC' })` on `Date.UTC(...)`.

## Review Focus

1. Viewer west of UTC: an entry dated 2026-10-07 must display as Oct 7, never Oct 6. Pinned by running display tests under `TZ=America/Los_Angeles` (Task 2).
2. Hand-edit typos (`Active`, `Next Milestone`, `- **Oct 7:**`, `2026-02-30`) must fail loudly with a line number, never drop data silently (Task 1).
3. Week labels crossing a month or year boundary ("Sep 28 – Oct 4", "Dec 28, 2025 – Jan 3, 2026") (Task 2).
4. Adding a quest without a pinned color must not change any other quest's color (Task 1).
5. isa23 when the raw file is missing (404 before merge): the build must succeed with the fallback copy (Task 6, verified for real because the file isn't on `main` yet).

---

### Task 1: Parser

**Files:**
- Create: `lib/side-quests/parse.ts`
- Test: `lib/side-quests/parse.test.mjs`
- Modify: `package.json` (add `"test": "TZ=America/Los_Angeles node --test \"lib/**/*.test.mjs\""`)

**Interfaces — Produces:**
```ts
export type QuestStatus = 'active' | 'paused' | 'complete'
export interface LogEntry { date: string; text: string }
export interface Quest { title: string; status: QuestStatus; question: string; milestone?: string; link?: string; color: string; log: LogEntry[]; latest?: LogEntry }
export interface DayEntry { quest: string; color: string; text: string }
export interface SideQuests { tagline: string; quests: Quest[]; colors: Record<string, string>; entriesByDate: Record<string, DayEntry[]>; warnings: string[] }
export class SideQuestsParseError extends Error { line: number }   // message prefixed "Line N: "
export function parseSideQuests(markdown: string): SideQuests
export interface InlineSegment { text: string; href?: string }
export function parseInline(text: string): InlineSegment[]
export const FALLBACK_PALETTE: readonly string[]   // 8 hexes
```

- [ ] **Step 1: Write failing tests** in `parse.test.mjs` (import from `./parse.ts`), using a `VALID` fixture equal to the spec's seed file:
  - `parses the seed`: tagline `'Main quest: self-mastery and self-expression.'`; 2 quests; Lumenwright `{status:'active', milestone:'First public demo Short', link:'https://lumenwright-nu.vercel.app', color:'#7c5cff'}`; multi-line entry text equals `'Demo Shorts in production — strongest construct in the first 3 seconds, ending on "what construct should I build next?"'`; `warnings` is `[]`.
  - `sorts quests by status then file order`: complete/paused/active input → active, paused, complete.
  - `sorts log chronologically, stable within a day; latest is last`: entries 10-07(a), 10-04, 10-07(b) → `[10-04, 10-07a, 10-07b]`, latest = 10-07b.
  - `entriesByDate`: keys ascending; a day with entries from two quests lists them in quest order; each item has `quest`, `color`, `text`.
  - `empty milestone and link are omitted`: `- **Next milestone:**` → `milestone === undefined`.
  - `field names are case-insensitive`: `- **next milestone:** x` parses.
  - `quest with no log has latest undefined`.
  - `colors: unpinned quest gets hashed fallback + warning, stable when other quests are added`: color of quest "Zeta" identical in a 1-quest and a 3-quest file; is a member of `FALLBACK_PALETTE`; warning mentions `Zeta`.
  - `colors: title containing a colon` (`Act: Two: #123456`) pins correctly.
  - Throws `SideQuestsParseError` with the right `line` for each: missing tagline; `- **Status:** Active`; unknown field `- **Notes:** x`; duplicate field; missing Question; `- **Link:** ftp://x`; `- **Oct 7:** x` under Log; `- **2026-02-30:** x`; empty log text; field after `### Log`; `### Notes`; duplicate quest title (case-insensitive); colors naming `Lumenwrite`; colors hex `#12345`; stray line `hello`; `[x](javascript:alert(1))` in a log entry.
  - `ignores HTML comments (keeps line numbers)` and `normalises CRLF`.
  - `parseInline`: `'see [devlog](https://y.t/a) now'` → 3 segments; bare `'https://a.b/c).'` → link `https://a.b/c` followed by text `').'`; plain text → 1 segment.

- [ ] **Step 2: Run** `npm test` → FAIL (module not found).

- [ ] **Step 3: Implement** `parse.ts`. Line-by-line state machine (`top` → `quest` → `log`). Blank HTML comments with same-length newline padding before scanning. Fallback color = `FALLBACK_PALETTE[fnv1a(title.toLowerCase()) % 8]`. Continuation = line starting with ≥2 spaces after a field or log entry. Bare-URL trailing `.,;:!?)` are trimmed (a `)` is kept only if the URL contains a matching `(`).

- [ ] **Step 4: Run** `npm test` → all PASS.

- [ ] **Step 5: Commit** `feat(side-quests): strict markdown parser with tests`.

### Task 2: Display helpers

**Files:**
- Create: `lib/side-quests/display.ts`
- Test: `lib/side-quests/display.test.mjs`

**Interfaces — Consumes:** `DayEntry` from Task 1. **Produces:**
```ts
export interface YearMonth { year: number; month: number }      // month 1–12
export function formatLongDate(date: string): string           // 'Wednesday, October 7, 2026'
export function formatMediumDate(date: string): string         // 'Oct 7, 2026'
export function formatDayHeader(date: string): string          // 'Wed, Oct 7'
export function formatMonth(ym: YearMonth): string             // 'October 2026'
export function toISODate(d: Date): string                     // viewer-local calendar date
export function addMonths(ym: YearMonth, n: number): YearMonth
export function compareYM(a: YearMonth, b: YearMonth): number
export function monthGrid(ym: YearMonth): (string | null)[]    // Sunday-first, padded with null to a multiple of 7
export function monthBounds(dates: string[], today: string): { min: YearMonth; max: YearMonth }
export function weekStart(date: string): string                // the Sunday on/before date
export interface FeedDay { date: string; entries: DayEntry[] }
export interface FeedWeek { start: string; label: string; days: FeedDay[] } // days newest first
export function buildFeed(entriesByDate: Record<string, DayEntry[]>, today: string): FeedWeek[] // newest first; always includes today's week
export function groupByQuest(entries: DayEntry[]): { quest: string; color: string; texts: string[] }[]
export function textColorOn(hex: string): '#10131C' | '#FFFFFF' // higher WCAG contrast wins
export function tilt(seed: string, index: number): number      // deterministic degrees in [-3, 3]
```

- [ ] **Step 1: Write failing tests:** the three formatters on `'2026-10-07'` give the strings above (run under `TZ=America/Los_Angeles` via the npm script); `monthGrid({2026,10})` starts with 4 nulls (Oct 1, 2026 is a Thursday), contains `'2026-10-31'`, length 35; `monthBounds(['2026-09-30','2026-10-04'], '2026-10-08')` → `{min:{2026,9}, max:{2026,10}}`; `monthBounds([], '2026-10-08')` → both Oct 2026; `weekStart('2026-10-07')` → `'2026-10-04'`; `buildFeed` labels: this week `'This week'` (present even with no entries, `days: []`), previous `'Last week'`, older `'Sep 20 – 26'`, cross-month `'Sep 27 – Oct 3'`, cross-year `'Dec 28, 2025 – Jan 3, 2026'` (today in 2026), next week `'Next week'`; empty non-current weeks omitted; days newest first; `textColorOn('#e8a2c8')` dark, `textColorOn('#7c5cff')` white; `tilt` is stable and within ±3.
- [ ] **Step 2: Run** `npm test` → FAIL.
- [ ] **Step 3: Implement** `display.ts` (pure; UTC date math on `Date.UTC`).
- [ ] **Step 4: Run** `npm test` → PASS.
- [ ] **Step 5: Commit** `feat(side-quests): date, week and contrast helpers`.

### Task 3: Content, loader, docs

**Files:**
- Create: `content/side-quests.md` (exact seed from the spec, plus the Lumenwright entry `- **2026-10-04:** Devlog 01 is live — [Lanterns made me build my own ring](https://www.youtube.com/shorts/SJ_dLZOa5X4)` before the 10-07 entry)
- Create: `content/README.md` (format, rules, what fails the build, where it shows up, isa23 hourly refresh)
- Create: `lib/side-quests/load.ts`: `export function loadSideQuests(): SideQuests`; reads `path.join(process.cwd(), 'content', 'side-quests.md')`; on `SideQuestsParseError` throws `new Error('content/side-quests.md — ' + err.message)`; `console.warn` each warning once.
- Test: append `the real content file parses` to `parse.test.mjs` (reads the file with `node:fs`, asserts 2 active quests, Lumenwright latest date `2026-10-07`, 3 total entries, no warnings).

- [ ] Step 1: add the test → FAIL (file missing). Step 2: create the files → PASS. Step 3: commit `feat(side-quests): seed content and build-time loader`.

### Task 4: Shared chrome (nav + footer)

**Files:**
- Create: `components/SiteFooter.tsx` (footer markup moved verbatim from `app/page.tsx`)
- Modify: `app/page.tsx` (use `<SiteFooter />`)
- Modify: `components/Navbar.tsx`: hrefs become `/#services` … `/#connect`, `/#contact`, logo `/#home`; insert `{ label: 'Side Quests', href: '/side-quests' }` after Apps; `aria-current="page"` + foreground color when `usePathname() === href`.

- [ ] Step 1: implement. Step 2: `npm run lint` clean. Step 3: in the browser at 768px, 1024px and 1280px, confirm the desktop nav fits on one line; if not, move the desktop/hamburger switch from `md` to `lg`. Step 4: commit `feat(nav): add Side Quests; make section links work from sub-pages`.

### Task 5: `/side-quests` page

**Files:**
- Create: `app/side-quests/page.tsx` (server; `metadata` title `'Side Quests — Screen Sage'`, description = tagline via `generateMetadata`; renders SparkleBackground, Navbar, intro, `<SideQuestsView data={…} />`, SiteFooter, AccessibilityPanel)
- Create: `components/side-quests/SideQuestsView.tsx` (client; tablist "Quests" | "Log"; `#log` hash sync with `history.replaceState`; arrow/Home/End keys)
- Create: `components/side-quests/QuestCard.tsx`, `InlineText.tsx` (renders `parseInline` segments; external links open in a new tab), `PostIt.tsx` (`variant: 'mini' | 'note'`)
- Create: `components/side-quests/LogView.tsx` (computes `today` with `toISODate(new Date())` in a `useState` initializer: it only mounts client-side; legend; renders `MonthCalendar` in `hidden sm:block` and `AgendaFeed` in `sm:hidden`; carries the backfill code comment)
- Create: `components/side-quests/MonthCalendar.tsx` (bounded prev/next, Today button, day buttons with an aria-label listing the quests, "+N more", opens `DayPanel`)
- Create: `components/side-quests/DayPanel.tsx` (uses `components/Modal.tsx`, eyebrow "Log", title `formatLongDate`, groups via `groupByQuest`)
- Create: `components/side-quests/AgendaFeed.tsx` (`buildFeed`; shows 4 entry-weeks beyond this week, "Show earlier" +4; "Today" day header; empty-week copy `Nothing logged yet this week.`)
- Modify: `app/globals.css`: `.postit` paper texture (layered gradients + shadow, no images).

- [ ] Step 1: implement. Step 2: `npm run lint && npm run build`; the build table shows `○ /side-quests`. Step 3: browser at 1280px and 375px: cards, badge colors, links, tabs (click + keys), `/side-quests#log`, month bounds, today ring, modal, mobile feed. Temporarily add 6 same-day entries to verify "+N more" and the panel, then revert the content file. Step 4: home-page nav links still scroll. Step 5: commit `feat(side-quests): quest cards and post-it log calendar`.

### Task 6: isa23-links Now strip (repo `/Users/isa/isa23-links`, new worktree from `origin/main`)

**Files:**
- Create: `lib/side-quests/parse.ts` (byte-identical copy; `cmp` must report no difference)
- Create: `lib/side-quests/fetch.ts`: `export const SIDE_QUESTS_RAW_URL`, `export const SIDE_QUESTS_PAGE_URL = 'https://screenseiji.vercel.app/side-quests'`, `export interface ActiveQuest { title: string; color: string; link?: string; latest?: LogEntry }`, `export async function getActiveQuests(): Promise<ActiveQuest[] | null>`. Fetches with `{ next: { revalidate: 3600 } }`, then `!res.ok` → throw. Any error: if `process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD` (from `next/constants`) → `console.warn` + return `null`; else rethrow (ISR keeps the last good page).
- Modify: `components/now-strip.tsx` → `async` server component: quest rows (color dot, title, latest text on one `truncate` line with inline links, `ExternalLink` icon when `link`), then `View all quests →`, then the `now.items` rows. `null` → fallback copy.
- Modify: `lib/now.ts`: remove the `Building` item.
- Modify: `app/page.tsx`: `export const revalidate = 3600`.

- [ ] Step 1: implement. Step 2: `npm run lint && npm run build`. The file isn't on `main` yet, so the build must pass and print the fallback warning (Review Focus 5). Step 3: dev server with `SIDE_QUESTS_RAW_URL` temporarily pointed at the pushed screenseiji branch: rows render live data; revert. Step 4: commit `feat(now): pull active side quests from screenseiji`.

### Task 7: Ship

- [ ] Push both branches; open PRs (screenseiji first; isa23's PR body says it depends on it). Bind PRs, report CI.
