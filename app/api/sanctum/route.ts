import { createHash, timingSafeEqual } from 'node:crypto'
import { str } from '@/lib/email'

// The Sanctum's word of passage. The password and the links it unlocks live
// only here on the server — never in client JS, where anyone could read them.
// Set SANCTUM_PASSWORD in .env.local and in Vercel → Settings → Environment
// Variables (see .env.example). While it's unset, every attempt is refused.

const GATED_LINKS = [
  { label: 'GitHub', href: 'https://github.com/astrayama' },
  { label: 'Devpost', href: 'https://devpost.com/isabiiil' },
]

// Slows down guessing: every wrong answer costs the guesser this long.
const WRONG_DELAY_MS = 600

function digest(value: string) {
  return createHash('sha256').update(value).digest()
}

function matches(attempt: string, secret: string) {
  // Same-length digests keep the comparison constant-time whatever the input.
  return timingSafeEqual(digest(attempt), digest(secret))
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const attempt = str((payload as Record<string, unknown> | null)?.password)
  const secret = process.env.SANCTUM_PASSWORD

  if (!secret || !attempt || !matches(attempt, secret)) {
    await new Promise(resolve => setTimeout(resolve, WRONG_DELAY_MS))
    return Response.json({ error: 'The door stays shut.' }, { status: 401 })
  }

  return Response.json({ links: GATED_LINKS })
}
