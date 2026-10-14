import type { MetadataRoute } from 'next'
import { indexablePages } from '@/lib/routes'
import { loadSideQuests } from '@/lib/side-quests/load'
import { absoluteUrl } from '@/lib/site'

// Every indexable page in lib/routes.ts. Only /side-quests gets a lastModified — its
// newest log entry — since a build date on every page would be noise.
export default function sitemap(): MetadataRoute.Sitemap {
  const logDates = Object.keys(loadSideQuests().entriesByDate)
  const sideQuestsUpdated = logDates.at(-1)

  return indexablePages().map(([key, page]) => ({
    url: absoluteUrl(page.path),
    priority: page.priority,
    ...(key === 'sideQuests' && sideQuestsUpdated && { lastModified: sideQuestsUpdated }),
  }))
}
