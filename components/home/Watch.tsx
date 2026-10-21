import { ArrowUpRight } from 'lucide-react'
import Fit from '@/components/home/Fit'
import VideoPlayer from '@/components/home/VideoPlayer'
import { BUTTON_PRIMARY, CARD, CHIP, CONTAINER, EYEBROW, H2, LEAD, TEXT_LINK } from '@/components/ui'
import { socialLinks, youtube } from '@/lib/data'
import { watch } from '@/lib/home-content'
import { cn } from '@/lib/utils'
import { getLatestVideo, UPLOADS_PLAYLIST_ID } from '@/lib/youtube'

const [spotify, applePodcasts] = socialLinks.listen
const tiktok = socialLinks.content.find(link => link.label === 'TikTok')!

const PODCAST_LINKS = [
  { label: 'Spotify', href: spotify.href },
  { label: 'Apple Podcasts', href: applePodcasts.href },
  { label: 'YouTube', href: youtube.podcastPlaylistUrl },
]

export default async function Watch() {
  const video = await getLatestVideo()

  return (
    <section id="watch" aria-labelledby="watch-title" className="py-8 sm:py-[4.5rem]">
      <div className={CONTAINER}>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className={EYEBROW}>{watch.eyebrow}</p>
            <h2 id="watch-title" className={cn(H2, 'mt-3')}>{watch.title}</h2>
          </div>
          <a
            href={youtube.channelUrl}
            target="_blank"
            rel="me noopener noreferrer"
            className={cn(TEXT_LINK, 'mb-2 hidden shrink-0 items-center gap-1 text-sm sm:inline-flex')}
          >
            {watch.allVideos}
            <ArrowUpRight size={15} aria-hidden />
          </a>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-9">
          <div>
            {video ? (
              <>
                <VideoPlayer id={video.id} title={video.title} thumbnail={video.thumbnail} />
                {video.title && (
                  <h3 className="mt-5 font-display text-[1.625rem] font-medium leading-tight text-plum-900 sm:text-[1.75rem]">
                    {video.title}
                  </h3>
                )}
                <p className="mt-1.5 text-sm text-plum-700">
                  {video.short ? 'Latest Short' : 'Latest video'} · <Fit short={watch.metaShort} long={watch.meta} />
                </p>
              </>
            ) : UPLOADS_PLAYLIST_ID ? (
              // No single video could be found: play the channel's uploads, newest first.
              <>
                <VideoPlayer playlistId={UPLOADS_PLAYLIST_ID} title={watch.playlist.title} />
                <h3 className="mt-5 font-display text-[1.625rem] font-medium leading-tight text-plum-900 sm:text-[1.75rem]">
                  {watch.playlist.title}
                </h3>
                <p className="mt-1.5 text-sm text-plum-700">
                  {watch.playlist.label} · <Fit short={watch.metaShort} long={watch.meta} />
                </p>
              </>
            ) : (
              <a
                href={youtube.channelUrl}
                target="_blank"
                rel="me noopener noreferrer"
                className="flex aspect-video items-center justify-center rounded-[1.5rem] border border-white bg-gradient-to-br from-blush via-glow to-mist font-display text-2xl text-plum-900 shadow-float"
              >
                Watch on YouTube ↗
              </a>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <p className={cn(LEAD, 'hidden lg:block')}>{watch.lead}</p>
            <a
              href={youtube.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(BUTTON_PRIMARY, 'w-full py-3.5 sm:w-fit')}
            >
              {watch.subscribe}
            </a>

            <div className={cn(CARD, 'p-5 sm:p-6')}>
              <p className={EYEBROW}>{watch.podcast.eyebrow}</p>
              <h3 className="mt-2 font-display text-[1.625rem] font-medium leading-tight text-plum-900">{watch.podcast.title}</h3>
              <p className="mt-1.5 text-[15px] leading-6 text-plum-700">{watch.podcast.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {PODCAST_LINKS.map(link => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={CHIP}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="hidden text-sm leading-6 text-plum-700 lg:block">
              {watch.tiktok}{' '}
              <a href={tiktok.href} target="_blank" rel="me noopener noreferrer" className={TEXT_LINK}>
                {tiktok.handle}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
