'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { track } from '@/lib/track'

/**
 * A YouTube video that plays right here: a thumbnail and play button until
 * it's pressed, then the privacy-enhanced (youtube-nocookie) player. Nothing
 * loads from YouTube's player until then.
 */
export default function VideoPlayer({ id, title, thumbnail }: { id: string; title: string; thumbnail: string }) {
  const [playing, setPlaying] = useState(false)
  const label = title || 'the latest video'

  return (
    <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-white bg-blush shadow-float">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={label}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            track('video_play', { id })
            setPlaying(true)
          }}
          aria-label={`Play ${label}`}
          className="group absolute inset-0"
        >
          <Image src={thumbnail} alt="" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cloud text-plum-900 shadow-float transition-transform duration-300 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]">
            <Play size={24} fill="currentColor" className="ml-1" aria-hidden />
          </span>
        </button>
      )}
    </div>
  )
}
