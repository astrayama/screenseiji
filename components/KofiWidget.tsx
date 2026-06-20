'use client'

import Script from 'next/script'

export default function KofiWidget() {
  return (
    <Script
      src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        try {
          // @ts-ignore
          if (typeof window !== 'undefined' && window.kofiWidgetOverlay) {
            // @ts-ignore
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
