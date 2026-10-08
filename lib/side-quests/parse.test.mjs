// Run with `npm test` (Node's built-in runner; Node 24 strips the .ts types itself).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseSideQuests, parseInline, SideQuestsParseError, FALLBACK_PALETTE } from './parse.ts'

const VALID = `# Side Quests
> Main quest: self-mastery and self-expression.
<!-- colors: Lumenwright: #7c5cff, Carta Luna: #e8a2c8 -->

## Lumenwright
- **Status:** active
- **Question:** Can willpower be a game mechanic?
- **Next milestone:** First public demo Short
- **Link:** https://lumenwright-nu.vercel.app

### Log
- **2026-10-07:** Demo Shorts in production — strongest construct in the
  first 3 seconds, ending on "what construct should I build next?"

## Carta Luna
- **Status:** active
- **Question:** What does a tarot reading feel like in mixed reality?
- **Next milestone:** Gather feedback from the first beta testers
- **Link:** https://cartaluna-mr.vercel.app

### Log
- **2026-10-07:** Quest card created — details to follow.
`

// Builds a file from quest blocks so each test only spells out what it's about.
function doc(blocks, colors = '') {
  const colorLine = colors ? `<!-- colors: ${colors} -->\n` : ''
  return `# Side Quests\n> Main quest: test.\n${colorLine}\n${blocks.join('\n')}`
}

function quest(title, { status = 'active', question = 'Why?', extra = '', log = '' } = {}) {
  return `## ${title}\n- **Status:** ${status}\n- **Question:** ${question}\n${extra}${log ? `\n### Log\n${log}` : ''}\n`
}

function throwsAt(markdown, line, pattern) {
  assert.throws(
    () => parseSideQuests(markdown),
    err => {
      assert.ok(err instanceof SideQuestsParseError, `expected SideQuestsParseError, got ${err}`)
      assert.equal(err.line, line, `wrong line for: ${err.message}`)
      if (pattern) assert.match(err.message, pattern)
      return true
    },
  )
}

test('parses the seed', () => {
  const data = parseSideQuests(VALID)
  assert.equal(data.tagline, 'Main quest: self-mastery and self-expression.')
  assert.equal(data.quests.length, 2)
  const [lumen, carta] = data.quests
  assert.equal(lumen.title, 'Lumenwright')
  assert.equal(lumen.status, 'active')
  assert.equal(lumen.question, 'Can willpower be a game mechanic?')
  assert.equal(lumen.milestone, 'First public demo Short')
  assert.equal(lumen.link, 'https://lumenwright-nu.vercel.app')
  assert.equal(lumen.color, '#7c5cff')
  assert.deepEqual(lumen.log, [{
    date: '2026-10-07',
    text: 'Demo Shorts in production — strongest construct in the first 3 seconds, ending on "what construct should I build next?"',
  }])
  assert.deepEqual(lumen.latest, lumen.log[0])
  assert.equal(carta.title, 'Carta Luna')
  assert.equal(carta.color, '#e8a2c8')
  assert.deepEqual(data.colors, { Lumenwright: '#7c5cff', 'Carta Luna': '#e8a2c8' })
  assert.deepEqual(data.warnings, [])
})

test('sorts quests by status, then file order', () => {
  const data = parseSideQuests(doc([
    quest('Done', { status: 'complete' }),
    quest('Resting', { status: 'paused' }),
    quest('First', { status: 'active' }),
    quest('Second', { status: 'active' }),
  ]))
  assert.deepEqual(data.quests.map(q => q.title), ['First', 'Second', 'Resting', 'Done'])
})

test('sorts the log by date, keeps file order within a day, and latest is last', () => {
  const data = parseSideQuests(doc([quest('Q', {
    log: '- **2026-10-07:** a\n- **2026-10-04:** early\n- **2026-10-07:** b\n',
  })]))
  const q = data.quests[0]
  assert.deepEqual(q.log.map(e => `${e.date} ${e.text}`), ['2026-10-04 early', '2026-10-07 a', '2026-10-07 b'])
  assert.deepEqual(q.latest, { date: '2026-10-07', text: 'b' })
})

test('entriesByDate flattens every quest, keys ascending, quest order within a day', () => {
  const data = parseSideQuests(doc([
    quest('Later', { status: 'paused', log: '- **2026-10-07:** paused note\n' }),
    quest('Now', { log: '- **2026-10-07:** active note\n- **2026-09-30:** older\n' }),
  ], 'Later: #111111, Now: #222222'))
  assert.deepEqual(Object.keys(data.entriesByDate), ['2026-09-30', '2026-10-07'])
  assert.deepEqual(data.entriesByDate['2026-10-07'], [
    { quest: 'Now', color: '#222222', text: 'active note' },
    { quest: 'Later', color: '#111111', text: 'paused note' },
  ])
})

test('an empty milestone and a missing link are omitted', () => {
  const data = parseSideQuests(doc([quest('Q', { extra: '- **Next milestone:**\n' })]))
  assert.equal(data.quests[0].milestone, undefined)
  assert.equal(data.quests[0].link, undefined)
})

test('field names are case-insensitive', () => {
  const data = parseSideQuests(doc([quest('Q', { extra: '- **next MILESTONE:** Ship it\n' })]))
  assert.equal(data.quests[0].milestone, 'Ship it')
})

test('a quest with no log has no latest entry', () => {
  const data = parseSideQuests(doc([quest('Q')]))
  assert.deepEqual(data.quests[0].log, [])
  assert.equal(data.quests[0].latest, undefined)
})

test('fields can wrap onto indented continuation lines', () => {
  const data = parseSideQuests(doc([quest('Q', { question: 'A long\n  question?' })]))
  assert.equal(data.quests[0].question, 'A long question?')
})

test('an unpinned quest gets a stable hashed fallback color and a warning', () => {
  const alone = parseSideQuests(doc([quest('Zeta')]))
  const crowded = parseSideQuests(doc([quest('Alpha'), quest('Zeta'), quest('Omega')], 'Alpha: #123456'))
  const color = alone.quests[0].color
  assert.ok(FALLBACK_PALETTE.includes(color))
  assert.equal(crowded.colors.Zeta, color)
  assert.equal(alone.warnings.length, 1)
  assert.match(alone.warnings[0], /Zeta/)
})

test('a pinned color can belong to a title containing a colon', () => {
  const data = parseSideQuests(doc([quest('Act: Two')], 'Act: Two: #123456'))
  assert.equal(data.quests[0].color, '#123456')
})

test('HTML comments are ignored without shifting line numbers', () => {
  const md = doc([quest('Q')]).replace('## Q', '<!-- a note\n- **2026-10-01:** not a real entry\n-->\n## Q')
  const data = parseSideQuests(md)
  assert.deepEqual(data.quests[0].log, [])
  // The stray line sits on line 12, after the 3-line comment.
  throwsAt(md + '\nstray', 12, /unexpected/i)
})

test('CRLF line endings are normalised', () => {
  const data = parseSideQuests(VALID.replace(/\n/g, '\r\n'))
  assert.equal(data.quests[0].question, 'Can willpower be a game mechanic?')
})

// Lines: 1 "# Side Quests", 2 "> tagline", 3 blank, 4 "## Q", 5 Status, 6 Question, 7… extra/log.
test('rejects a file without a tagline', () => {
  throwsAt('# Side Quests\n\n## Q\n- **Status:** active\n- **Question:** Why?\n', 3, /tagline/i)
})
test('rejects a capitalised status', () => throwsAt(doc([quest('Q', { status: 'Active' })]), 5, /status/i))
test('rejects an unknown field', () => throwsAt(doc([quest('Q', { extra: '- **Notes:** x\n' })]), 7, /unknown field/i))
test('rejects a duplicate field', () => throwsAt(doc([quest('Q', { extra: '- **Status:** paused\n' })]), 7, /duplicate/i))
test('rejects a quest without a question', () => {
  throwsAt('# Side Quests\n> Main quest: test.\n\n## Q\n- **Status:** active\n', 4, /question/i)
})
test('rejects a non-http link', () => throwsAt(doc([quest('Q', { extra: '- **Link:** ftp://x.y\n' })]), 7, /link/i))
test('rejects a log entry without an ISO date', () => {
  throwsAt(doc([quest('Q', { log: '- **Oct 7:** x\n' })]), 9, /YYYY-MM-DD/)
})
test('rejects an impossible date', () => {
  throwsAt(doc([quest('Q', { log: '- **2026-02-30:** x\n' })]), 9, /not a real date/i)
})
test('rejects an empty log entry', () => throwsAt(doc([quest('Q', { log: '- **2026-10-07:**\n' })]), 9, /empty/i))
test('rejects a field after the log', () => {
  throwsAt(doc([quest('Q', { log: '- **2026-10-07:** x\n- **Link:** https://a.b\n' })]), 10, /before "### Log"/)
})
test('rejects any ### heading other than Log', () => throwsAt(doc([quest('Q', { extra: '### Notes\n' })]), 7, /### Log/))
test('rejects duplicate quest titles, ignoring case', () => {
  throwsAt(doc([quest('Lumen'), quest('lumen')]), 9, /duplicate quest/i)
})
test('rejects a colors entry naming no quest', () => {
  throwsAt(doc([quest('Lumenwright')], 'Lumenwrite: #7c5cff'), 3, /Lumenwrite/)
})
test('rejects an invalid hex color', () => throwsAt(doc([quest('Q')], 'Q: #12345'), 3, /color/i))
test('rejects a stray line', () => throwsAt(doc([quest('Q', { extra: 'hello\n' })]), 7, /unexpected/i))
test('rejects a non-http link inside log text', () => {
  throwsAt(doc([quest('Q', { log: '- **2026-10-07:** [x](javascript:alert(1))\n' })]), 9, /link/i)
})

test('parseInline splits markdown links', () => {
  assert.deepEqual(parseInline('see [devlog](https://y.t/a) now'), [
    { text: 'see ' },
    { text: 'devlog', href: 'https://y.t/a' },
    { text: ' now' },
  ])
})
test('parseInline links bare URLs and leaves trailing punctuation out', () => {
  assert.deepEqual(parseInline('at https://a.b/c).'), [
    { text: 'at ' },
    { text: 'https://a.b/c', href: 'https://a.b/c' },
    { text: ').' },
  ])
})
test('parseInline keeps a closing paren that belongs to the URL', () => {
  assert.deepEqual(parseInline('https://w.org/A_(b)'), [{ text: 'https://w.org/A_(b)', href: 'https://w.org/A_(b)' }])
})
test('parseInline returns plain text as one segment', () => {
  assert.deepEqual(parseInline('just words'), [{ text: 'just words' }])
})

test('the real content file parses cleanly', async () => {
  const { readFileSync } = await import('node:fs')
  const markdown = readFileSync(new URL('../../content/side-quests.md', import.meta.url), 'utf8')
  const data = parseSideQuests(markdown)
  assert.equal(data.tagline, 'Main quest: self-mastery and self-expression.')
  assert.deepEqual(data.quests.map(q => [q.title, q.status]), [['Lumenwright', 'active'], ['Carta Luna', 'active']])
  assert.equal(data.quests[0].latest.date, '2026-10-07')
  assert.equal(Object.values(data.entriesByDate).flat().length, 3)
  assert.deepEqual(data.warnings, [])
})

// ─── Review fixes ───────────────────────────────────────────────────────────

test('rejects a misspelled colors keyword instead of silently dropping every pin', () => {
  for (const comment of ['color: Q: #123456', 'colours: Q: #123456', 'colors Q: #123456']) {
    throwsAt(doc([quest('Q')]).replace('\n\n## Q', `\n<!-- ${comment} -->\n\n## Q`), 3, /colors:/)
  }
})
test('rejects a comment that pins colors without the colors: keyword', () => {
  throwsAt(doc([quest('Q')]).replace('\n\n## Q', '\n<!-- Q: #123456 -->\n\n## Q'), 3, /colors:/)
})
test('ordinary comments with colons are still ignored', () => {
  const data = parseSideQuests(doc([quest('Q')]).replace('\n\n## Q', '\n<!-- todo: write more, maybe #2 -->\n\n## Q'))
  assert.equal(data.quests.length, 1)
})
test('a value can start on the continuation line after an empty field', () => {
  const data = parseSideQuests('# Side Quests\n> Main quest: test.\n\n## Q\n- **Status:**\n  active\n- **Question:**\n  Why wrap?\n')
  assert.equal(data.quests[0].status, 'active')
  assert.equal(data.quests[0].question, 'Why wrap?')
})
test('explains a colon written outside the bold', () => {
  throwsAt('# Side Quests\n> Main quest: test.\n\n## Q\n- **Status**: active\n', 5, /inside the bold/)
})
test('ignores a byte-order mark at the start of the file', () => {
  assert.equal(parseSideQuests('﻿' + VALID).quests.length, 2)
})
