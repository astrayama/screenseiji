// Sends a GA4 event through the gtag snippet loaded in app/layout.tsx.
// A no-op when gtag hasn't loaded (blocked, or during SSR).

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: Record<string, string>) => void
  }
}

export function track(name: string, params?: Record<string, string>) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', name, params)
}
