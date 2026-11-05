import { apps, appStatusText, intakePackages, liveReading, profileLinks, reviewsSite, studio } from '@/lib/data'
import { indexablePages } from '@/lib/routes'
import { FOUNDER, HANDLE, ORG_NAME, SITE_NAME, absoluteUrl } from '@/lib/site'

// /llms.txt — a plain-text map of the site for AI assistants (llmstxt.org),
// built from the same data as the pages, so it never drifts from them.
export const dynamic = 'force-static'

const link = (href: string) => (href.startsWith('/') ? absoluteUrl(href) : href)

function body() {
  const { written, video } = intakePackages
  const pages = indexablePages().map(([, page]) => page)

  return [
    `# ${ORG_NAME}`,
    '',
    `> ${ORG_NAME} (${SITE_NAME}, @${HANDLE}) is ${FOUNDER}'s one-person studio. ` +
      'It makes anime edits and philosophical video essays, reviews films and series, offers tarot readings for self-reflection, builds apps for seekers, and designs websites for small businesses.',
    '',
    `"${HANDLE}" is ${SITE_NAME} spelled the Japanese way. It's the handle for the anime edits and a love of Japanese culture. ` +
      `${SITE_NAME}, ${ORG_NAME} and ${HANDLE} are the same brand. It evolved from Omniversal Seeker.`,
    '',
    '## Pages',
    ...pages.map(page => `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`),
    '',
    '## Apps',
    ...apps.map(app => {
      const versions = app.links?.map(l => `${l.label}: ${l.href}`).join('; ')
      const where = versions ?? (app.href ? link(app.href) : 'not public yet')
      const tryIt = app.tryUrl && app.tryUrl !== app.href ? `; try it: ${app.tryUrl}` : ''
      return `- ${app.name} (${app.platform}, ${appStatusText(app)}): ${app.summary} Link: ${where}${tryIt}`
    }),
    '',
    '## Reviews',
    `- [Reviews](${reviewsSite.url}): ${reviewsSite.summary}`,
    '',
    '## Tarot readings',
    `- ${written.title}: ${written.price} ${written.priceUnit}. ${written.description}`,
    `- ${video.title}: ${video.price} ${video.priceUnit}. ${video.description}`,
    `- ${liveReading.title} by voice call, video call, or VR: ${liveReading.tiers.map(t => `${t.label} ${t.price}`).join(', ')}.`,
    `- Book at ${absoluteUrl('/tarot')}`,
    '',
    '## Websites for small businesses',
    ...studio.services.map(s => `- ${s.title}: ${s.description}`),
    `- Every site includes: ${studio.included.join(', ')}.`,
    `- Start a project at ${absoluteUrl('/websites')}`,
    '',
    '## Profiles',
    ...profileLinks.map(p => `- [${p.label} (${p.handle})](${p.href})`),
    '',
  ].join('\n')
}

export function GET() {
  return new Response(body(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
