import { youtube } from '@/lib/data'
import {
  displayTitle,
  oembedUrl,
  parseFeed,
  uploadsPlaylistId,
  videoIdFromThumbnail,
  type FeedEntry,
} from '@/lib/youtube-feed'

// Server-only: the channel's newest upload — long-form or Short — for the home
// page's Watch section, cached for an hour. No API key: it reads the public
// feed (the latest 15 uploads), and when that's down (it 404s for every
// channel as of October 2026) it asks oEmbed. Neither gives durations, so none
// are shown.

export interface LatestVideo {
  id: string
  title: string
  thumbnail: string
  /** A Short (vertical). Its HD thumbnail is already framed 16:9, over a blurred backdrop. */
  short: boolean
}

/** Newest first, Shorts included. The Watch section plays it when no single video can be found. */
export const UPLOADS_PLAYLIST_ID = uploadsPlaylistId(youtube.channelId)

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

async function readFeed(): Promise<FeedEntry | null> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: HOUR } })
    if (!res.ok) {
      console.warn(`YouTube feed returned ${res.status}; trying oEmbed`)
      return null
    }
    return parseFeed(await res.text())[0] ?? null
  } catch (err) {
    console.error('Could not read the YouTube feed:', err)
    return null
  }
}

async function getJson(url: string): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(url, { next: { revalidate: HOUR } })
    if (!res.ok) {
      console.error(`YouTube oEmbed returned ${res.status} for ${url}`)
      return null
    }
    return await res.json()
  } catch (err) {
    console.error('Could not read YouTube oEmbed:', err)
    return null
  }
}

/** /shorts/<id> answers 200 for a Short and redirects a regular video to /watch. HEAD: the page itself is ~1.5 MB. */
async function isShort(id: string) {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${id}`, {
      method: 'HEAD',
      redirect: 'manual',
      next: { revalidate: HOUR },
    })
    return res.status === 200
  } catch {
    return false
  }
}

/**
 * The newest upload via oEmbed: the uploads playlist's thumbnail is its first
 * (newest) video's, which gives the id; that video's own oEmbed gives the title.
 * The playlist's title is the playlist's name, so it's not used.
 */
async function readOembed(): Promise<FeedEntry | null> {
  if (!UPLOADS_PLAYLIST_ID) return null
  const playlist = await getJson(oembedUrl(`https://www.youtube.com/playlist?list=${UPLOADS_PLAYLIST_ID}`))
  const id = videoIdFromThumbnail(playlist?.thumbnail_url)
  if (!id) return null
  const [video, short] = await Promise.all([
    getJson(oembedUrl(`https://www.youtube.com/watch?v=${id}`)),
    isShort(id),
  ])
  // JSON arrives decoded, so no decodeXml here.
  const title = typeof video?.title === 'string' ? displayTitle(video.title) : ''
  return { id, title, short }
}

/**
 * The pinned video (youtube.featuredVideo) if set, else the newest upload,
 * Shorts included. Null when neither the feed nor oEmbed can be read — the
 * section then plays the uploads playlist instead.
 */
export async function getLatestVideo(): Promise<LatestVideo | null> {
  const pinned = youtube.featuredVideo
  const pick = pinned ? { ...pinned, short: false } : ((await readFeed()) ?? (await readOembed()))
  if (!pick) return null
  return { ...pick, thumbnail: await thumbnailFor(pick.id) }
}
