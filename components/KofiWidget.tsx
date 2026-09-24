'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    kofiWidgetOverlay?: { draw: (username: string, options: Record<string, string>) => void }
  }
}

export default function KofiWidget() {
  const pathname = usePathname()
  // Keep the floating donate button off the app pages (/apps/arcana,
  // /apps/anicca, …) — they're App Store product/support URLs.
  const onAppPage = pathname?.startsWith('/apps/') ?? false

  // Ko-fi injects its overlay outside React (and possibly after this effect
  // runs, if the CDN script is still loading), so hide it declaratively via a
  // body attribute + CSS rule in globals.css rather than touching its DOM.
  useEffect(() => {
    document.body.toggleAttribute('data-hide-kofi', onAppPage)
  }, [onAppPage])

  if (onAppPage) return null

  return (
    <Script
      src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        try {
          // Guard against double-draw: next/script can re-fire onLoad if the
          // component unmounts and remounts while the script is cached.
          const alreadyDrawn = document.querySelector('.floatingchat-container-wrap, .floatingchat-container-wrap-mobi')
          if (!alreadyDrawn && typeof window !== 'undefined' && window.kofiWidgetOverlay) {
            window.kofiWidgetOverlay.draw('screenseiji', {
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
