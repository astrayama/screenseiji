// Reading the YouTube channel feed (Atom XML). Pure functions, no imports, so
// Node's test runner can load this file directly (see youtube-feed.test.mjs).

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }

export function decodeXml(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (match, code: string) => {
    if (code[0] === '#') {
      const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10)
      return Number.isFinite(n) ? String.fromCodePoint(n) : match
    }
    return ENTITIES[code] ?? match
  })
}

/**
 * Tidies a title for display: drops the run of hashtags at the end, keeps
 * inline ones as plain words (capitalised if the title opened with one), and
 * trims a dangling separator.
 * "#lanterns made me build my ring • devlog 01 • #vr #dc" → "Lanterns made me build my ring • devlog 01"
 */
export function displayTitle(raw: string) {
  const title = raw
    .replace(/(\s*#[\p{L}\p{N}_]+)+\s*$/u, '')
    .replace(/#([\p{L}\p{N}_]+)/gu, '$1')
    .replace(/\s*[•|·-]+\s*$/, '')
    .trim()
  return raw.trimStart().startsWith('#') ? title.charAt(0).toUpperCase() + title.slice(1) : title
}

export interface FeedEntry {
  id: string
  title: string
  short: boolean
}

export function parseFeed(xml: string): FeedEntry[] {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].flatMap(([, entry]) => {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]
    const title = entry.match(/<title>([^<]*)<\/title>/)?.[1]
    const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? ''
    return id && title ? [{ id, title: displayTitle(decodeXml(title)), short: link.includes('/shorts/') }] : []
  })
}
