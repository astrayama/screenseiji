'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { track } from '@/lib/track'

type VideoPlayerProps =
  | { id: string; title: string; thumbnail: string; playlistId?: undefined }
  /** When no single video could be found: the uploads playlist, newest first, behind a plain poster. */
  | { playlistId: string; title: string; id?: undefined; thumbnail?: undefined }

/**
 * A YouTube video that plays right here: a thumbnail and play button until
 * it's pressed, then the privacy-enhanced (youtube-nocookie) player. Nothing
 * loads from YouTube's player until then.
 */
export default function VideoPlayer({ id, title, thumbnail, playlistId }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const label = title || 'the latest video'
  // nocookie refuses /embed/videoseries ("Video unavailable"); listType=playlist plays.
  const src = playlistId
    ? `https://www.youtube-nocookie.com/embed?listType=playlist&list=${playlistId}&autoplay=1&rel=0`
    : `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`

  return (
    <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-white bg-blush shadow-float">
      {playing ? (
        <iframe
          src={src}
          title={label}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            track('video_play', playlistId ? { playlist: playlistId } : { id: id ?? '' })
            setPlaying(true)
          }}
          aria-label={`Play ${label}`}
          className="group absolute inset-0"
        >
          {thumbnail ? (
            <Image src={thumbnail} alt="" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
          ) : (
            <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-blush via-glow to-mist" />
          )}
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cloud text-plum-900 shadow-float transition-transform duration-300 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]">
            <Play size={24} fill="currentColor" className="ml-1" aria-hidden />
          </span>
        </button>
      )}
    </div>
  )
}
