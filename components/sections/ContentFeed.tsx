'use client'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/SectionHeading'
import { ExternalLink } from 'lucide-react'

interface FeedCardProps {
  platform: string
  handle: string
  description: string
  href: string
  accentClass: string
  borderClass: string
  index: number
  badge?: string
}

function FeedCard({ platform, handle, description, href, accentClass, borderClass, index, badge }: FeedCardProps) {
  const { ref, inView } = useInView<HTMLAnchorElement>()
  const delay = index * 90

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'glass group flex flex-col gap-4 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 reveal',
        borderClass,
        inView && 'reveal-in',
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn('text-xs font-bold uppercase tracking-[0.2em]', accentClass)}>
            {platform}
            {badge && (
              <span className="ml-2 rounded-full bg-white/8 px-2 py-0.5 text-[9px] text-muted normal-case tracking-normal">
                {badge}
              </span>
            )}
          </p>
          <p className="mt-1 font-display text-xl font-medium text-foreground">{handle}</p>
        </div>
        <ExternalLink size={14} className="mt-1 shrink-0 text-muted/50 transition-all group-hover:text-muted" />
      </div>
      <p className="text-sm leading-6 text-muted">{description}</p>
      <div className={cn('mt-auto self-start rounded-full px-4 py-1.5 text-xs font-semibold transition-all', accentClass, 'bg-current/10 group-hover:bg-current/20')}>
        <span className={accentClass}>Watch / Follow →</span>
      </div>
    </a>
  )
}

const FEEDS = [
  {
    platform: 'YouTube',
    handle: '@screenseiji',
    description: 'Long-form philosophical video essays + tarot readings. Anime, film, and games as entry points for the hard questions.',
    href: 'https://www.youtube.com/@screenseiji',
    accentClass: 'text-red-400',
    borderClass: 'hover:border-red-400/25',
    badge: undefined,
  },
  {
    platform: 'TikTok',
    handle: '@screenseiji',
    description: 'Short-form spiritual observations, anime philosophy hot-takes, cozy gaming commentary, and tarot card-of-the-day.',
    href: 'https://www.tiktok.com/@screenseiji',
    accentClass: 'text-teal',
    borderClass: 'hover:glass-teal',
    badge: undefined,
  },
  {
    platform: 'Podcast',
    handle: "Seeker's Soliloquy",
    description: 'The original solo monologue series — late-night Jungian psychology and pop culture philosophy. Available on Spotify and Apple Podcasts.',
    href: 'https://open.spotify.com/show/2w5Gt1BLDsrcSjDyVIdbow',
    accentClass: 'text-green-400',
    borderClass: 'hover:border-green-400/25',
    badge: 'legacy',
  },
]

export default function ContentFeed() {
  return (
    <section id="content" className="section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Work"
          title="What I'm making."
          description="Videos, shorts, and spoken monologues — all orbiting the same question."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {FEEDS.map((f, i) => <FeedCard key={f.platform} {...f} index={i} />)}
        </div>
      </div>
    </section>
  )
}
