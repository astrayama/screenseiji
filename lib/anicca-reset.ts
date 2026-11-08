// Password reset for Anicca accounts, behind /apps/anicca/reset-password.
//
// When someone taps "Forgot password?" in the app, Supabase emails them a link.
// The link signs them in for this one purpose and lands here with the session
// in the address bar's #fragment (never sent to a server). The page lets them
// pick a new password, then sends them back to the app to sign in. It works on
// any device, so it doesn't matter where they open the email.
//
// No imports and type-only TypeScript, so `npm test` can load it directly
// (lib/anicca-reset.test.mjs).

/**
 * Anicca's Supabase project. Both values are public by design: the publishable
 * key ships inside the app as well, and row-level security guards the data.
 * Override them in .env.local to try the page against a local Supabase.
 */
export const ANICCA_SUPABASE_URL =
  process.env.NEXT_PUBLIC_ANICCA_SUPABASE_URL || 'https://cxaqpjmbabgeqgxqhads.supabase.co'
export const ANICCA_SUPABASE_KEY =
  process.env.NEXT_PUBLIC_ANICCA_SUPABASE_KEY || 'sb_publishable_DAidGhlUPyQz8gkMqbDo_w_6pN8kqRw'

/** Opens Anicca on the sign-in screen with a "password updated" note. */
export const ANICCA_PASSWORD_UPDATED_URL = 'com.screenseiji.anicca://password-updated'

/** Same rule as the app (PasswordRules.minimumLength). */
export const MIN_PASSWORD_LENGTH = 8

/** Where the stash script keeps the link's fragment for this tab (survives a reload). */
export const RESET_STASH_KEY = 'anicca-reset-link'

/**
 * Runs while the HTML is parsed, before analytics load: moves the link's
 * #fragment (it holds the one-time session) out of the address bar, so it
 * isn't recorded anywhere or left in the history.
 */
export const RESET_STASH_SCRIPT = `(function(){try{var h=location.hash;if(h.length>1){window.__aniccaResetHash=h;try{sessionStorage.setItem(${JSON.stringify(RESET_STASH_KEY)},h)}catch(e){}history.replaceState(null,'',location.pathname)}}catch(e){}})()`

/**
 * Runs first on the Anicca landing page (the project's Site URL). Supabase
 * sends reset links there when it can't use the redirect it was given, as with
 * "Send password recovery" in the dashboard. A link that carries a recovery
 * session goes on to the reset page, #fragment and all; nothing else moves.
 */
export const RECOVERY_FORWARD_SCRIPT = `(function(){try{var h=location.hash;if(/[#&]type=recovery(&|$)/.test(h)&&/[#&]access_token=/.test(h)){location.replace('/apps/anicca/reset-password'+h)}}catch(e){}})()`

export type ResetLink =
  /** A working link: the page can save a new password with this session. */
  | { kind: 'session'; accessToken: string; refreshToken: string; expiresAt: number; email: string }
  /** Supabase says the link is expired, already used, or not valid. */
  | { kind: 'expired' }
  /** No link: someone opened the page directly. */
  | { kind: 'none' }

export type SaveResult =
  | { ok: true }
  /** The link's session ran out: they need a new email. */
  | { ok: false; expired: true }
  /** Something they can fix, like a password the server rejected. */
  | { ok: false; expired: false; message: string }

export const MESSAGES = {
  passwordTooShort: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
  passwordsDoNotMatch: 'Passwords do not match.',
  samePassword: "That's already your password. Choose a different one, or open Anicca and sign in with it.",
  tooManyTries: 'Too many tries. Wait a minute, then try again.',
  offline: "Couldn't reach Anicca. Check your connection and try again.",
  generic: 'Something went wrong. Try again in a moment.',
} as const

/**
 * Reads what Supabase put after the # when it sent the browser here: a
 * recovery session, or an error. `nowSeconds` is Unix time.
 */
export function parseResetLink(hash: string, nowSeconds: number): ResetLink {
  const params = new URLSearchParams(hash.replace(/^#/, ''))
  if (params.has('error') || params.has('error_code')) return { kind: 'expired' }

  const accessToken = params.get('access_token')
  const refreshToken = params.get('refresh_token')
  if (!accessToken || !refreshToken || params.get('type') !== 'recovery') return { kind: 'none' }

  const expiresAt =
    Number(params.get('expires_at')) || nowSeconds + (Number(params.get('expires_in')) || 3600)
  return { kind: 'session', accessToken, refreshToken, expiresAt, email: emailInToken(accessToken) }
}

/** The account's email, from the access token's claims ("" if it can't be read). */
export function emailInToken(accessToken: string): string {
  try {
    const payload = accessToken.split('.')[1] ?? ''
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    const bytes = Uint8Array.from(atob(padded), c => c.charCodeAt(0))
    const claims = JSON.parse(new TextDecoder().decode(bytes))
    return typeof claims.email === 'string' ? claims.email : ''
  } catch {
    return ''
  }
}

/** Problems with the two fields, worded like the app. Empty when both are fine. */
export function checkNewPassword(
  password: string,
  confirmation: string,
): { password?: string; confirmation?: string } {
  const problems: { password?: string; confirmation?: string } = {}
  if (password.length < MIN_PASSWORD_LENGTH) problems.password = MESSAGES.passwordTooShort
  else if (password !== confirmation) problems.confirmation = MESSAGES.passwordsDoNotMatch
  return problems
}

type Fetch = (input: string, init?: RequestInit) => Promise<Response>

interface SaveOptions {
  session: { accessToken: string; refreshToken: string; expiresAt: number }
  password: string
  nowSeconds: number
  fetchImpl?: Fetch
  supabaseUrl?: string
  supabaseKey?: string
}

/**
 * Saves the new password with the link's session, then signs that session
 * out: the person signs in to the app with the new password next.
 */
export async function saveNewPassword({
  session,
  password,
  nowSeconds,
  fetchImpl = fetch,
  supabaseUrl = ANICCA_SUPABASE_URL,
  supabaseKey = ANICCA_SUPABASE_KEY,
}: SaveOptions): Promise<SaveResult> {
  const auth = `${supabaseUrl}/auth/v1`
  const headers = (token?: string): Record<string, string> => ({
    apikey: supabaseKey,
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  })

  try {
    let accessToken = session.accessToken
    // Sessions last an hour; if the page sat open longer, renew it first.
    if (session.expiresAt - 30 <= nowSeconds) {
      const refreshed = await fetchImpl(`${auth}/token?grant_type=refresh_token`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ refresh_token: session.refreshToken }),
      })
      if (!refreshed.ok) return { ok: false, expired: true }
      accessToken = (await refreshed.json()).access_token
    }

    const response = await fetchImpl(`${auth}/user`, {
      method: 'PUT',
      headers: headers(accessToken),
      body: JSON.stringify({ password }),
    })
    if (response.ok) {
      // Best effort: this browser has no further use for the session.
      fetchImpl(`${auth}/logout?scope=local`, { method: 'POST', headers: headers(accessToken) }).catch(() => {})
      return { ok: true }
    }
    return failure(response.status, await response.json().catch(() => ({})))
  } catch {
    return { ok: false, expired: false, message: MESSAGES.offline }
  }
}

/** Turns a Supabase Auth error response into what the page shows. */
export function failure(status: number, body: { error_code?: string; msg?: string; message?: string }): SaveResult {
  const code = body.error_code ?? ''
  if (status === 401 || status === 403 || ['bad_jwt', 'session_not_found', 'session_expired'].includes(code)) {
    return { ok: false, expired: true }
  }
  if (code === 'same_password') return { ok: false, expired: false, message: MESSAGES.samePassword }
  if (status === 429 || code.startsWith('over_')) return { ok: false, expired: false, message: MESSAGES.tooManyTries }
  // Weak or leaked passwords: Supabase's own wording says what to change.
  if (code === 'weak_password' || status === 422) {
    return { ok: false, expired: false, message: body.msg || body.message || MESSAGES.generic }
  }
  return { ok: false, expired: false, message: MESSAGES.generic }
}

/** iPhone, iPad or iPod (iPadOS reports itself as a Mac with a touch screen). */
export function isAppleMobile(userAgent: string, maxTouchPoints: number): boolean {
  return /iPhone|iPad|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && maxTouchPoints > 1)
}
