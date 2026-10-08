# Side Quests content

`side-quests.md` is the only place quest data lives. Edit it on `main` and:

- **screenseiji.vercel.app/side-quests** updates on the next deploy (every push to `main`).
- **isa23-links' Now strip** fetches the raw file from GitHub and picks the change up within an hour,
  no redeploy needed: https://raw.githubusercontent.com/astrayama/screenseiji/main/content/side-quests.md

Never copy quest text into either site's code. If you're editing it in two places, something's wrong.

## Format

```md
# Side Quests
> Main quest: self-mastery and self-expression.
<!-- colors: Lumenwright: #7c5cff, Carta Luna: #e8a2c8 -->

## Quest title
- **Status:** active
- **Question:** The question this quest is chasing?
- **Next milestone:** What's next (optional; leave empty to hide the row)
- **Link:** https://… (optional; the card's "View project" button)

### Log
- **2026-10-07:** What happened. Long entries can wrap onto
  lines indented two spaces.
- **2026-10-07:** A second entry on the same day becomes its own post-it.
```

- **Status** is `active`, `paused` or `complete`, all lowercase. Cards sort in that order, then by order in this file.
- **Log dates** are `YYYY-MM-DD`. Add new entries at the bottom (they're sorted by date anyway).
  The newest one is the card's "Latest log".
- **Links in log text:** `[text](https://…)` or a bare `https://…` URL. Everything else is plain text, so other markdown shows as typed.
- **Colors:** one `#rgb`/`#rrggbb` per quest on the `<!-- colors: -->` line. They never change on their own.
  A quest missing from that line gets a fallback color from its title (the build prints a reminder to pin it).
  Quest titles can't contain commas, since commas separate entries on that line.
- The `# Side Quests` line is just a heading. The page title and the nav say "Side Quests" regardless.
- Other HTML comments (`<!-- … -->`) are ignored.

## When it's wrong

The parser is strict on purpose. A typo like `Active`, `Next Milestone:` spelled wrong, `**Oct 7:**`,
an impossible date, or a stray line fails the screenseiji build. The error names the line
(e.g. `content/side-quests.md — Line 12: …`), and Vercel keeps the last good version live until it's fixed.
isa23 keeps showing its last good copy too, unless isa23 itself is redeployed while the file is broken.
Then its strip says "Quest log updating — check back soon." until the file is fixed.

The calendar opens on the current month, so backfill a few entries before sharing the page.
