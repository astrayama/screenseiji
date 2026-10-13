import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { energyCenters } from '@/lib/anicca-content'
import type { OgTheme, PageEntry } from '@/lib/routes'
import { ORG_NAME, SITE_HOST } from '@/lib/site'

// Share cards — the image shown when a link is posted on X, Discord, iMessage…
// Every page folder has an opengraph-image.tsx that calls renderOgImage with
// its registry entry (lib/routes.ts). Rendered once at build time by Satori:
// flexbox only, and fonts must be static TTF/OTF files (assets/fonts, OFL).

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const THEMES: Record<OgTheme, { bg: string; glows: string; fg: string; muted: string; accent: string }> = {
  site: {
    bg: '#07090F',
    glows: 'radial-gradient(circle at 85% 10%, rgba(201,148,60,0.28), transparent 45%), radial-gradient(circle at 5% 100%, rgba(36,191,178,0.2), transparent 50%)',
    fg: '#E8EAF0',
    muted: '#8892A4',
    accent: '#E8B860',
  },
  arcana: {
    bg: '#0D0B13',
    glows: 'radial-gradient(circle at 85% 10%, rgba(246,206,85,0.22), transparent 45%), radial-gradient(circle at 5% 100%, rgba(179,133,224,0.28), transparent 50%)',
    fg: '#F2EEF7',
    muted: '#A698B3',
    accent: '#F6CE55',
  },
  anicca: {
    bg: '#F5F0FA',
    glows: 'radial-gradient(circle at 85% 10%, rgba(196,168,255,0.55), transparent 45%), radial-gradient(circle at 5% 100%, rgba(167,139,218,0.35), transparent 50%)',
    fg: '#1A1A2E',
    muted: '#4A4A66',
    accent: '#5E43A6',
  },
}

const asset = (...parts: string[]) => readFile(join(process.cwd(), ...parts))

export async function renderOgImage({ eyebrow, title, subtitle, theme }: PageEntry['og']) {
  const [display, sans, mark] = await Promise.all([
    asset('assets', 'fonts', 'CormorantGaramond-Light.ttf'),
    asset('assets', 'fonts', 'SpaceGrotesk-Medium.ttf'),
    asset('public', 'brand', 'sss-mark.png'),
  ])
  const t = THEMES[theme]
  const logo = `data:image/png;base64,${mark.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 76px',
          backgroundColor: t.bg,
          backgroundImage: t.glows,
          color: t.fg,
          fontFamily: 'Space Grotesk',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img */}
          <img src={logo} width={107} height={56} alt="" />
          <span style={{ fontSize: 22, letterSpacing: 4, textTransform: 'uppercase', color: t.accent }}>
            {eyebrow}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <span
            style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: title.length > 24 ? 76 : 92,
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
          {subtitle && <span style={{ fontSize: 28, color: t.muted, maxWidth: 1000 }}>{subtitle}</span>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, color: t.muted }}>
          <span>{SITE_HOST}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {theme === 'anicca' && (
              <div style={{ display: 'flex', gap: 8 }}>
                {energyCenters.map(c => (
                  <div key={c.id} style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: c.color }} />
                ))}
              </div>
            )}
            <span>{ORG_NAME}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Cormorant Garamond', data: display, weight: 300, style: 'normal' },
        { name: 'Space Grotesk', data: sans, weight: 500, style: 'normal' },
      ],
    },
  )
}
