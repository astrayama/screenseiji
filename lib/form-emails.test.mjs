import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  BLANK,
  bookingEmails,
  contactEmails,
  escapeHtml,
  newsletterEmails,
  projectEmails,
  readingEmails,
  waitlistEmails,
  withPrefilledEmail,
} from './form-emails.ts'

const HOST = 'screenseiji.vercel.app'
const SUBMITTED = 'Wed, Nov 18, 7:44 PM EST'
const PAY = 'https://buy.stripe.com/test_123'

/** Every value must reach both the plain-text and the HTML part. */
function assertHasAll(email, values) {
  for (const value of values) {
    assert.ok(email.text.includes(value), `text is missing ${JSON.stringify(value)}`)
    assert.ok(email.html.includes(escapeHtml(value)), `html is missing ${JSON.stringify(value)}`)
  }
}

const written = {
  title: 'Written reading',
  price: '$10',
  priceUnit: 'per spread',
  details: ['A spread of 3–7 cards'],
  turnaroundHours: 48,
  paymentUrl: PAY,
  notesField: true,
}

const reading = (over = {}) =>
  readingEmails({
    host: HOST,
    pkg: written,
    name: 'Ada Reader',
    email: 'ada@example.com',
    question: 'Should I take the job in Lisbon?',
    notes: 'I have been torn for weeks.\nMy partner is staying.',
    submitted: SUBMITTED,
    flagged: false,
    ...over,
  })

const booking = (over = {}) =>
  bookingEmails({
    host: HOST,
    format: 'Voice call',
    tier: { label: '30 min', price: '$35', blockMinutes: 30, paymentUrl: PAY },
    isaTime: 'Thu, Nov 19, 12:00 PM EST',
    theirTime: 'Thu, Nov 19, 9:00 AM PST (America/Los_Angeles)',
    name: 'Luke Caller',
    email: 'luke@example.com',
    notes: 'My question is about a career change.',
    submitted: SUBMITTED,
    flagged: false,
    ...over,
  })

// ─── Tarot intake (written / video) ─────────────────────────────────────────

test('a written reading request gives Isa every field plus package, price and due time', () => {
  const { toIsa } = reading()
  assertHasAll(toIsa, [
    'Ada Reader',
    'ada@example.com',
    'Should I take the job in Lisbon?',
    'I have been torn for weeks.\nMy partner is staying.',
    'Written reading',
    '$10 per spread',
    'A spread of 3–7 cards',
    '48 hours',
    SUBMITTED,
  ])
  assert.equal(toIsa.subject, '[Written reading] New request from Ada Reader')
})

test('blank reading notes are shown as left blank, not dropped', () => {
  const { toIsa } = reading({ notes: '' })
  assert.ok(toIsa.text.includes(`Anything Isa should know: ${BLANK}`))
  assert.ok(toIsa.html.includes(BLANK))
})

test('a package without a notes field has no notes row', () => {
  const { toIsa } = reading({ pkg: { ...written, title: 'Recorded video reading', notesField: false }, notes: '' })
  assert.ok(!toIsa.text.includes('Anything Isa should know'))
})

test('the reading confirmation recaps the request and links to a prefilled payment', () => {
  const { toClient } = reading()
  assertHasAll(toClient, ['Ada', 'Should I take the job in Lisbon?', 'I have been torn for weeks.', 'Written reading', '$10', '48 hours'])
  assert.ok(toClient.html.includes(escapeHtml(withPrefilledEmail(PAY, 'ada@example.com'))))
  assert.ok(toClient.text.includes(withPrefilledEmail(PAY, 'ada@example.com')))
  assert.match(toClient.subject, /written reading/i)
})

test('the reading confirmation says payment details follow when there is no link', () => {
  const { toClient } = reading({ pkg: { ...written, paymentUrl: null } })
  assert.ok(!toClient.html.includes('buy.stripe.com'))
  assert.match(toClient.text, /payment details/i)
})

// ─── Live booking ───────────────────────────────────────────────────────────

test('a live booking gives Isa every field, including the notes', () => {
  const { toIsa } = booking()
  assertHasAll(toIsa, [
    'Voice call',
    '30 min',
    '$35',
    'Thu, Nov 19, 12:00 PM EST',
    'Thu, Nov 19, 9:00 AM PST (America/Los_Angeles)',
    'Luke Caller',
    'luke@example.com',
    'My question is about a career change.',
    SUBMITTED,
  ])
  // Kept stable so inbox filters on it keep working.
  assert.equal(toIsa.subject, '[Live reading] Thu, Nov 19, 12:00 PM EST — Voice call, 30 min — Luke Caller')
})

test('blank booking notes are shown as left blank, not dropped', () => {
  const { toIsa } = booking({ notes: '' })
  assert.ok(toIsa.text.includes(`Their question / notes: ${BLANK}`))
})

test('an unknown visitor timezone is stated rather than left out', () => {
  const { toIsa } = booking({ theirTime: null })
  assert.ok(toIsa.text.includes('Their time: unknown timezone'))
})

test('the booking confirmation shows their own time and says it is not confirmed yet', () => {
  const { toClient } = booking()
  assertHasAll(toClient, ['Luke', 'Voice call', '30 min', '$35', 'Thu, Nov 19, 9:00 AM PST (America/Los_Angeles)', 'My question is about a career change.'])
  assert.match(toClient.text, /not confirmed yet/i)
  assert.ok(toClient.text.includes(withPrefilledEmail(PAY, 'luke@example.com')))
})

test('a booking confirmation without notes asks them to reply with their question', () => {
  const { toClient } = booking({ notes: '' })
  assert.match(toClient.text, /reply with (it|your question)/i)
})

test('the booking confirmation falls back to Isa’s time when theirs is unknown', () => {
  const { toClient } = booking({ theirTime: null })
  assert.ok(toClient.text.includes('Thu, Nov 19, 12:00 PM EST'))
})

// ─── Contact ────────────────────────────────────────────────────────────────

test('a contact message gives Isa every field', () => {
  const { toIsa, toClient } = contactEmails({
    host: HOST,
    name: 'Cy Writer',
    email: 'cy@example.com',
    category: 'Collaboration',
    message: 'Want to make a video together?',
    submitted: SUBMITTED,
    flagged: false,
  })
  assertHasAll(toIsa, ['Cy Writer', 'cy@example.com', 'Collaboration', 'Want to make a video together?', SUBMITTED])
  assert.equal(toIsa.subject, '[Collaboration] Screen Sage — message from Cy Writer')
  assertHasAll(toClient, ['Cy', 'Collaboration', 'Want to make a video together?'])
})

test('a /studio message adds the shop and package; other forms leave them out', () => {
  const studio = contactEmails({
    host: HOST,
    name: 'Mia Owner',
    email: 'mia@example.com',
    category: 'Client/project inquiry',
    business: 'Corner Florist',
    pkg: 'Full Online Presence',
    message: 'We need a site and our Google listing sorted.',
    submitted: SUBMITTED,
    flagged: false,
  })
  assertHasAll(studio.toIsa, ['Corner Florist', 'Full Online Presence', 'Client/project inquiry'])
  assertHasAll(studio.toClient, ['Full Online Presence'])

  const blankShop = contactEmails({
    host: HOST, name: 'Mia Owner', email: 'mia@example.com', category: 'Client/project inquiry',
    business: '', pkg: 'Not sure yet', message: 'Hi', submitted: SUBMITTED, flagged: false,
  })
  assert.match(blankShop.toIsa.text, /Business: \(left blank\)/)

  const home = contactEmails({
    host: HOST, name: 'Cy Writer', email: 'cy@example.com', category: 'Collaboration',
    message: 'Hi', submitted: SUBMITTED, flagged: false,
  })
  assert.doesNotMatch(home.toIsa.text, /Business|Package/)
})

// ─── Studio project inquiry ─────────────────────────────────────────────────

const project = (over = {}) =>
  projectEmails({
    host: HOST,
    name: 'Pat Owner',
    email: 'pat@example.com',
    business: 'Moonlit Bakery',
    website: 'moonlitbakery.com',
    projectType: 'Redesign',
    budget: '$2,500–$5,000',
    timeline: '1–3 months',
    message: 'Our site is slow and hard to update.',
    submitted: SUBMITTED,
    flagged: false,
    ...over,
  })

test('a studio inquiry gives Isa every field', () => {
  const { toIsa } = project()
  assertHasAll(toIsa, [
    'Pat Owner',
    'pat@example.com',
    'Moonlit Bakery',
    'moonlitbakery.com',
    'Redesign',
    '$2,500–$5,000',
    '1–3 months',
    'Our site is slow and hard to update.',
    SUBMITTED,
  ])
  assert.equal(toIsa.subject, '[Studio lead] Redesign · $2,500–$5,000 — Pat Owner / Moonlit Bakery')
})

test('blank studio business and site are shown as left blank', () => {
  const { toIsa } = project({ business: '', website: '' })
  assert.ok(toIsa.text.includes(`Business: ${BLANK}`))
  assert.ok(toIsa.text.includes(`Current site: ${BLANK}`))
})

test('the studio confirmation recaps the inquiry', () => {
  const { toClient } = project()
  assertHasAll(toClient, ['Pat', 'Redesign', '$2,500–$5,000', '1–3 months', 'Our site is slow and hard to update.'])
})

// ─── Waitlist & mailing list ────────────────────────────────────────────────

test('a waitlist signup gives Isa the name, email and app', () => {
  const { toIsa, toClient } = waitlistEmails({
    host: HOST,
    appName: 'Arcana',
    name: 'Wren',
    email: 'wren@example.com',
    savedToContacts: true,
    submitted: SUBMITTED,
    flagged: false,
  })
  assertHasAll(toIsa, ['Wren', 'wren@example.com', 'Arcana', SUBMITTED])
  assert.match(toIsa.text, /saved in your Resend Contacts/)
  assertHasAll(toClient, ['Wren', 'Arcana'])
  assert.match(toClient.subject, /Arcana waitlist/)
})

test('a waitlist signup without a name says so', () => {
  const { toIsa } = waitlistEmails({
    host: HOST, appName: 'Arcana', name: '', email: 'wren@example.com', savedToContacts: false, submitted: SUBMITTED, flagged: false,
  })
  assert.ok(toIsa.text.includes(`Name: ${BLANK}`))
  assert.match(toIsa.text, /add them there by hand/i)
})

test('a mailing-list signup gives Isa the email and a confirmation goes out', () => {
  const { toIsa, toClient } = newsletterEmails({
    host: HOST, email: 'jo@example.com', savedToContacts: true, submitted: SUBMITTED, flagged: false,
  })
  assertHasAll(toIsa, ['jo@example.com', SUBMITTED])
  assert.equal(toIsa.subject, '[Mailing list] jo@example.com joined')
  assert.match(toClient.subject, /on the list/i)
})

// ─── Shared behaviour ───────────────────────────────────────────────────────

test('a filled anti-spam field flags the email to Isa instead of dropping it', () => {
  const { toIsa } = reading({ flagged: true })
  assert.ok(toIsa.subject.startsWith('[Possible spam] '))
  assert.match(toIsa.text, /anti-spam field/)
  assertHasAll(toIsa, ['Ada Reader', 'Should I take the job in Lisbon?'])
})

test('submitted text is escaped in the HTML', () => {
  const { toIsa, toClient } = contactEmails({
    host: HOST, name: '<b>Eve</b>', email: 'eve@example.com', category: 'General question',
    message: '<script>alert(1)</script>', submitted: SUBMITTED, flagged: false,
  })
  for (const email of [toIsa, toClient]) {
    assert.ok(!email.html.includes('<script>'))
    assert.ok(!email.html.includes('<b>Eve</b>'))
    assert.ok(email.html.includes('&lt;script&gt;'))
  }
})

test('every confirmation is signed by Isa and says how to reply', () => {
  const all = [
    reading().toClient,
    booking().toClient,
    project().toClient,
    newsletterEmails({ host: HOST, email: 'jo@example.com', savedToContacts: true, submitted: SUBMITTED, flagged: false }).toClient,
  ]
  for (const email of all) {
    assert.match(email.text, /\nIsa\n/)
    assert.match(email.text, /reply to this email/i)
    assert.ok(email.text.includes(HOST))
  }
})

test('withPrefilledEmail adds the checkout email, encoded', () => {
  assert.equal(
    withPrefilledEmail('https://buy.stripe.com/abc', 'a+b@example.com'),
    'https://buy.stripe.com/abc?prefilled_email=a%2Bb%40example.com',
  )
  assert.equal(
    withPrefilledEmail('https://buy.stripe.com/abc?locale=en', 'a@example.com'),
    'https://buy.stripe.com/abc?locale=en&prefilled_email=a%40example.com',
  )
})
