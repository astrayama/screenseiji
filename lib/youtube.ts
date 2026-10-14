import { youtube } from '@/lib/data'
import { parseFeed, type FeedEntry } from '@/lib/youtube-feed'

// Server-only: the channel's newest upload — long-form or Short — for the home
// page's Watch section, read from the public feed (the latest 15 uploads, no
// API key) and cached for an hour. The feed has no durations, so none are shown.

export interface LatestVideo {
  id: string
  title: string
  thumbnail: string
  /** A Short (vertical). Its HD thumbnail is already framed 16:9, over a blurred backdrop. */
  short: boolean
}

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtube.channelId}`
const HOUR = 3600

/** The HD thumbnail when YouTube has one; every video has the 480×360 one. */
async function thumbnailFor(id: string) {
  const hd = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  try {
    const res = await fetch(hd, { method: 'HEAD', next: { revalidate: HOUR } })
    if (res.ok) return hd
  } catch {
    // fall through to the always-present thumbnail
  }
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

async function readFeed(): Promise<FeedEntry[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: HOUR } })
    if (!res.ok) {
      console.error(`YouTube feed returned ${res.status}`)
      return []
    }
    return parseFeed(await res.text())
  } catch (err) {
    console.error('Could not read the YouTube feed:', err)
    return []
  }
}

/**
 * The pinned video (youtube.featuredVideo) if set, else the newest upload,
 * Shorts included. Null when the feed can't be read — the section then just
 * links to the channel.
 */
export async function getLatestVideo(): Promise<LatestVideo | null> {
  const pinned = youtube.featuredVideo
  const pick = pinned
    ? { ...pinned, short: false }
    : await readFeed().then(entries => entries[0])
  if (!pick) return null
  return { ...pick, thumbnail: await thumbnailFor(pick.id) }
}
