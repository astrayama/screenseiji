'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

type KofiWindow = Window & {
  kofiWidgetOverlay?: { draw: (username: string, options: Record<string, string>) => void }
}

// The first sign someone is using the page. Ko-fi's script (and the iframe it
// adds) is heavy for phones, so it waits for one of these instead of loading
// with the page: the button appears a moment after the first scroll or tap.
const FIRST_INTERACTION = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel'] as const

export default function KofiWidget() {
  const pathname = usePathname()
  // Keep the floating donate button off the app pages (/apps/arcana,
  // /apps/cartaluna, …) — they're product and support pages.
  const onAppPage = pathname?.startsWith('/apps/') ?? false
  // Lives in the root layout, so once armed it stays armed across pages.
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (armed) return
    const arm = () => setArmed(true)
    for (const event of FIRST_INTERACTION) window.addEventListener(event, arm, { once: true, passive: true })
    return () => {
      for (const event of FIRST_INTERACTION) window.removeEventListener(event, arm)
    }
  }, [armed])

  // Ko-fi injects its overlay outside React (and possibly after this effect
  // runs, if the CDN script is still loading), so hide it declaratively via a
  // body attribute + CSS rule in globals.css rather than touching its DOM.
  useEffect(() => {
    document.body.toggleAttribute('data-hide-kofi', onAppPage)
  }, [onAppPage])

  if (onAppPage || !armed) return null

  return (
    <Script
      src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        try {
          // Guard against double-draw: next/script can re-fire onLoad if the
          // component unmounts and remounts while the script is cached.
          const alreadyDrawn = document.querySelector('.floatingchat-container-wrap, .floatingchat-container-wrap-mobi')
          const overlay = typeof window !== 'undefined' ? (window as KofiWindow).kofiWidgetOverlay : undefined
          if (!alreadyDrawn && overlay) {
            overlay.draw('screenseiji', {
              type: 'floating-chat',
              'floating-chat.donateButton.text': 'Support me',
              'floating-chat.donateButton.background-color': '#794bc4',
              'floating-chat.donateButton.text-color': '#fff',
            })
          }
        } catch (e) {
          console.error('Failed to initialize Ko-fi widget:', e)
        }
      }}
    />
  )
}
