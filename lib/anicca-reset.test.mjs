import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  MESSAGES,
  RECOVERY_FORWARD_SCRIPT,
  RESET_STASH_KEY,
  RESET_STASH_SCRIPT,
  checkNewPassword,
  emailInToken,
  failure,
  isAppleMobile,
  parseResetLink,
  saveNewPassword,
} from './anicca-reset.ts'

const NOW = 1_800_000_000

/** An unsigned JWT with these claims (the page only reads them). */
function token(claims) {
  const part = obj => Buffer.from(JSON.stringify(obj)).toString('base64url')
  return `${part({ alg: 'HS256', typ: 'JWT' })}.${part(claims)}.signature`
}

const ACCESS = token({ email: 'seeker@example.com', amr: [{ method: 'recovery' }] })

test('a recovery link gives a session with the account email', () => {
  const link = parseResetLink(
    `#access_token=${ACCESS}&expires_at=${NOW + 3600}&expires_in=3600&refresh_token=r1&token_type=bearer&type=recovery`,
    NOW,
  )
  assert.deepEqual(link, {
    kind: 'session',
    accessToken: ACCESS,
    refreshToken: 'r1',
    expiresAt: NOW + 3600,
    email: 'seeker@example.com',
  })
})

test('without expires_at the session lasts expires_in from now', () => {
  const link = parseResetLink(`#access_token=${ACCESS}&expires_in=600&refresh_token=r1&type=recovery`, NOW)
  assert.equal(link.expiresAt, NOW + 600)
})

test('an expired or used link is reported as expired', () => {
  const hash = '#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired'
  assert.deepEqual(parseResetLink(hash, NOW), { kind: 'expired' })
})

test('no fragment, or a session that is not a recovery, is no link', () => {
  assert.deepEqual(parseResetLink('', NOW), { kind: 'none' })
  assert.deepEqual(parseResetLink('#section-2', NOW), { kind: 'none' })
  assert.deepEqual(parseResetLink(`#access_token=${ACCESS}&refresh_token=r1&type=signup`, NOW), { kind: 'none' })
})

test('emailInToken reads non-ASCII emails and survives junk', () => {
  assert.equal(emailInToken(token({ email: 'zoë@example.com' })), 'zoë@example.com')
  assert.equal(emailInToken('not-a-jwt'), '')
  assert.equal(emailInToken(token({ sub: 'no-email' })), '')
})

test('new passwords follow the app rules', () => {
  assert.deepEqual(checkNewPassword('short', 'short'), { password: MESSAGES.passwordTooShort })
  assert.deepEqual(checkNewPassword('long enough', 'long enougH'), { confirmation: MESSAGES.passwordsDoNotMatch })
  assert.deepEqual(checkNewPassword('long enough', 'long enough'), {})
})

/** A fetch that answers from `replies` in order and records each call. */
function fakeFetch(replies) {
  const calls = []
  const impl = async (url, init = {}) => {
    calls.push({ url, method: init.method, headers: init.headers, body: init.body && JSON.parse(init.body) })
    const reply = replies.shift() ?? { status: 200, body: {} }
    if (reply.throws) throw new TypeError('Failed to fetch')
    return new Response(JSON.stringify(reply.body ?? {}), { status: reply.status })
  }
  return { impl, calls }
}

const SESSION = { accessToken: 'a1', refreshToken: 'r1', expiresAt: NOW + 3600 }
const BASE = { supabaseUrl: 'https://project.supabase.co', supabaseKey: 'sb_publishable_test' }

test('saving updates the password with the link session, then signs it out', async () => {
  const { impl, calls } = fakeFetch([{ status: 200, body: { id: 'u1' } }, { status: 204 }])
  const result = await saveNewPassword({ ...BASE, session: SESSION, password: 'new password', nowSeconds: NOW, fetchImpl: impl })
  assert.deepEqual(result, { ok: true })
  assert.equal(calls[0].url, 'https://project.supabase.co/auth/v1/user')
  assert.equal(calls[0].method, 'PUT')
  assert.equal(calls[0].headers.Authorization, 'Bearer a1')
  assert.equal(calls[0].headers.apikey, 'sb_publishable_test')
  assert.deepEqual(calls[0].body, { password: 'new password' })
  assert.equal(calls[1].url, 'https://project.supabase.co/auth/v1/logout?scope=local')
})

test('a session about to run out is renewed before saving', async () => {
  const { impl, calls } = fakeFetch([{ status: 200, body: { access_token: 'a2' } }, { status: 200 }, { status: 204 }])
  const result = await saveNewPassword({
    ...BASE,
    session: { ...SESSION, expiresAt: NOW + 10 },
    password: 'new password',
    nowSeconds: NOW,
    fetchImpl: impl,
  })
  assert.deepEqual(result, { ok: true })
  assert.equal(calls[0].url, 'https://project.supabase.co/auth/v1/token?grant_type=refresh_token')
  assert.deepEqual(calls[0].body, { refresh_token: 'r1' })
  assert.equal(calls[1].headers.Authorization, 'Bearer a2')
})

test('a session that cannot be renewed means the link expired', async () => {
  const { impl } = fakeFetch([{ status: 400, body: { error_code: 'refresh_token_not_found' } }])
  const result = await saveNewPassword({
    ...BASE,
    session: { ...SESSION, expiresAt: NOW - 1 },
    password: 'new password',
    nowSeconds: NOW,
    fetchImpl: impl,
  })
  assert.deepEqual(result, { ok: false, expired: true })
})

test('server answers become messages people can act on', async () => {
  const save = async reply => {
    const { impl } = fakeFetch([reply])
    return saveNewPassword({ ...BASE, session: SESSION, password: 'new password', nowSeconds: NOW, fetchImpl: impl })
  }
  assert.deepEqual(await save({ status: 422, body: { error_code: 'same_password', msg: 'New password should be different from the old password.' } }), {
    ok: false,
    expired: false,
    message: MESSAGES.samePassword,
  })
  assert.deepEqual(await save({ status: 422, body: { error_code: 'weak_password', msg: 'Password is known to be weak and easy to guess, please choose a different one.' } }), {
    ok: false,
    expired: false,
    message: 'Password is known to be weak and easy to guess, please choose a different one.',
  })
  assert.deepEqual(await save({ status: 403, body: { error_code: 'session_not_found' } }), { ok: false, expired: true })
  assert.deepEqual(await save({ status: 429, body: { error_code: 'over_request_rate_limit' } }), {
    ok: false,
    expired: false,
    message: MESSAGES.tooManyTries,
  })
  assert.deepEqual(await save({ throws: true }), { ok: false, expired: false, message: MESSAGES.offline })
  assert.deepEqual(failure(500, {}), { ok: false, expired: false, message: MESSAGES.generic })
})

test('the stash script moves the fragment out of the address bar', () => {
  const stored = {}
  const replaced = []
  const window = {}
  const location = { hash: '#access_token=a1&type=recovery', pathname: '/apps/anicca/reset-password' }
  const sessionStorage = { setItem: (k, v) => (stored[k] = v) }
  const history = { replaceState: (_s, _t, url) => replaced.push(url) }
  new Function('window', 'location', 'sessionStorage', 'history', RESET_STASH_SCRIPT)(window, location, sessionStorage, history)
  assert.equal(window.__aniccaResetHash, location.hash)
  assert.equal(stored[RESET_STASH_KEY], location.hash)
  assert.deepEqual(replaced, ['/apps/anicca/reset-password'])
})

test('the Open Anicca button shows on iPhone and iPad only', () => {
  const iPhone = 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15'
  const iPadOS = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15'
  assert.equal(isAppleMobile(iPhone, 5), true)
  assert.equal(isAppleMobile(iPadOS, 5), true)
  assert.equal(isAppleMobile(iPadOS, 0), false)
  assert.equal(isAppleMobile('Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 0), false)
})

/** Runs the landing page's forwarder against a hash; returns where it sent the browser, if anywhere. */
function forward(hash) {
  const moves = []
  const location = { hash, replace: url => moves.push(url) }
  new Function('location', RECOVERY_FORWARD_SCRIPT)(location)
  return moves[0]
}

test('the landing page forwards reset links that fell back to it', () => {
  const hash = `#access_token=${ACCESS}&expires_in=3600&refresh_token=r1&token_type=bearer&type=recovery`
  assert.equal(forward(hash), `/apps/anicca/reset-password${hash}`)
})

test('the landing page leaves every other fragment alone', () => {
  assert.equal(forward(''), undefined)
  assert.equal(forward('#pricing'), undefined)
  assert.equal(forward(`#access_token=${ACCESS}&refresh_token=r1&type=signup`), undefined)
  assert.equal(forward('#error=access_denied&error_code=otp_expired'), undefined)
})
