// Every email the site's forms send: the notice to Isa, and the confirmation
// to the person who filled the form in. No imports, so the API routes and
// `node --test` (lib/form-emails.test.mjs) run the same code. The routes
// validate input and format times; this file only turns clean values into
// emails.

/** Shown for an optional field the person left empty, so blank never looks like lost. */
export const BLANK = '(left blank)'

export interface Email {
  subject: string
  text: string
  html: string
}

export interface FormEmails {
  toIsa: Email
  toClient: Email
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** A Stripe Payment Link with the checkout email filled in, so the payment matches the request. */
export function withPrefilledEmail(url: string, email: string) {
  const link = new URL(url)
  link.searchParams.set('prefilled_email', email)
  return link.toString()
}

// ─── Layout ─────────────────────────────────────────────────────────────────

type Row = [label: string, value: string]

type Block =
  | { p: string; muted?: boolean }
  | { rows: Row[] }
  | { quote: string; label: string }
  | { button: string; href: string }

const INK = '#3F2A58'
const BODY = '#593D75'
const MUTED = '#8A7A99'
const ACCENT = '#6A4D86'
const ORCHID = '#E9B0DA'

const SPAM_NOTE =
  'Possible spam: the hidden anti-spam field was filled in, so this may be a bot (or a password manager). ' +
  'They were not sent a confirmation email. If it looks real, reply as usual.'

function blockText(block: Block) {
  if ('p' in block) return block.p
  if ('rows' in block) return block.rows.map(([k, v]) => `${k}: ${v}`).join('\n')
  if ('quote' in block) return block.quote.includes('\n') ? `${block.label}:\n${block.quote}` : `${block.label}: ${block.quote}`
  return `${block.button}: ${block.href}`
}

function blockHtml(block: Block) {
  if ('p' in block) {
    return block.muted
      ? `<p style="margin:0 0 12px;font-size:13px;color:${MUTED}">${escapeHtml(block.p)}</p>`
      : `<p style="margin:0 0 16px">${escapeHtml(block.p)}</p>`
  }
  if ('rows' in block) {
    const rows = block.rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:3px 16px 3px 0;color:${MUTED};vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td>` +
          `<td style="padding:3px 0;color:${INK};white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
      )
      .join('')
    return `<table style="border-collapse:collapse;margin:0 0 18px">${rows}</table>`
  }
  if ('quote' in block) {
    return (
      `<p style="margin:0 0 4px;color:${MUTED}">${escapeHtml(block.label)}</p>` +
      `<div style="margin:0 0 18px;padding-left:14px;border-left:3px solid ${ORCHID};color:${INK};white-space:pre-wrap">${escapeHtml(block.quote)}</div>`
    )
  }
  return (
    `<p style="margin:4px 0 20px"><a href="${escapeHtml(block.href)}" ` +
    `style="display:inline-block;padding:10px 22px;border-radius:999px;background:${INK};color:#FFFBFD;font-weight:600;text-decoration:none">` +
    `${escapeHtml(block.button)}</a></p>`
  )
}

function render(eyebrow: string | null, blocks: Block[], footer: string): { text: string; html: string } {
  const text = [...(eyebrow ? [eyebrow.toUpperCase()] : []), ...blocks.map(blockText), '—', footer].join('\n\n')
  const html = `
<div style="max-width:560px;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:15px;line-height:1.6;color:${BODY}">
  ${eyebrow ? `<p style="margin:0 0 14px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:${ACCENT}">${escapeHtml(eyebrow)}</p>` : ''}
  ${blocks.map(blockHtml).join('\n  ')}
  <p style="margin:28px 0 0;font-size:12px;color:${MUTED}">${escapeHtml(footer)}</p>
</div>`
  return { text, html }
}

/** The notice to Isa. A flagged submission is still delivered, marked as possible spam. */
function toIsa(opts: { subject: string; eyebrow: string; blocks: Block[]; footer: string; flagged: boolean }): Email {
  const blocks: Block[] = opts.flagged ? [{ p: SPAM_NOTE }, ...opts.blocks] : opts.blocks
  return {
    subject: `${opts.flagged ? '[Possible spam] ' : ''}${opts.subject}`,
    ...render(opts.eyebrow, blocks, opts.footer),
  }
}

/** The confirmation to the person who filled the form in, signed by Isa. */
function toClient(opts: {
  subject: string
  name: string
  blocks: Block[]
  why: string
  signature?: string
}): Email {
  const blocks: Block[] = [
    { p: opts.name ? `Hi ${opts.name},` : 'Hi,' },
    ...opts.blocks,
    { p: 'You can reply to this email to reach me.' },
    { p: `Isa\n${opts.signature ?? 'Screen Sage'}` },
  ]
  return { subject: opts.subject, ...render(null, blocks, opts.why) }
}

const sentFrom = (form: string, host: string, name?: string) =>
  `Sent from the ${form} at ${host}.${name ? ` Hit reply to answer ${name}.` : ''}`

// ─── Tarot intake (written / video) ─────────────────────────────────────────

export interface ReadingInput {
  host: string
  pkg: {
    title: string
    price: string
    priceUnit: string
    details: string[]
    turnaroundHours: number
    paymentUrl: string | null
    notesField: boolean
  }
  name: string
  email: string
  question: string
  notes: string
  /** When it arrived, already formatted in Isa's timezone. */
  submitted: string
  flagged: boolean
}

export function readingEmails(input: ReadingInput): FormEmails {
  const { host, pkg, name, email, question, notes, submitted, flagged } = input
  const due = `Within ${pkg.turnaroundHours} hours of payment`
  const packageLine = [`${pkg.title} · ${pkg.price} ${pkg.priceUnit}`, ...pkg.details].join(' · ')

  const isa = toIsa({
    subject: `[${pkg.title}] New request from ${name}`,
    eyebrow: `${pkg.title} request`,
    flagged,
    blocks: [
      { rows: [['Name', name], ['Email', email], ['Package', packageLine], ['Due', due], ['Submitted', submitted]] },
      { label: 'Question', quote: question },
      ...(pkg.notesField ? [{ label: 'Anything Isa should know', quote: notes || BLANK }] : []),
      {
        p: pkg.paymentUrl
          ? 'They were sent to the Stripe payment link next, with this email filled in. Match the payment by email.'
          : 'No Stripe payment link is set for this package yet. Reply with payment details.',
        muted: true,
      },
    ],
    footer: sentFrom('tarot intake form', host, name),
  })

  const client = toClient({
    subject: `Your ${pkg.title.toLowerCase()} request is in`,
    name,
    blocks: [
      { p: `I have your request for a ${pkg.title.toLowerCase()}. Here’s a copy of what you sent.` },
      { rows: [['Reading', `${pkg.title} · ${pkg.price} ${pkg.priceUnit}`]] },
      { label: 'Your question', quote: question },
      ...(pkg.notesField && notes ? [{ label: 'Anything else', quote: notes }] : []),
      ...(pkg.paymentUrl
        ? [
            {
              p: 'If you haven’t paid yet, you can do it here. Please use this same email address at checkout so I can match your payment to your question.',
            },
            { button: `Pay ${pkg.price}`, href: withPrefilledEmail(pkg.paymentUrl, email) },
            { p: `Your reading arrives within ${pkg.turnaroundHours} hours of payment.` },
          ]
        : [{ p: `I’ll email you payment details soon. Your reading arrives within ${pkg.turnaroundHours} hours of payment.` }]),
    ],
    why: `You’re getting this because you asked for a tarot reading at ${host}.`,
  })

  return { toIsa: isa, toClient: client }
}

// ─── Live booking ───────────────────────────────────────────────────────────

export interface BookingInput {
  host: string
  /** e.g. "Voice call" */
  format: string
  tier: { label: string; price: string; blockMinutes: number; paymentUrl: string | null }
  /** The slot in Isa's timezone, e.g. "Thu, Nov 19, 12:00 PM EST". */
  isaTime: string
  /** The slot in the visitor's timezone with the zone name, or null if the browser didn't say. */
  theirTime: string | null
  name: string
  email: string
  notes: string
  submitted: string
  flagged: boolean
}

export function bookingEmails(input: BookingInput): FormEmails {
  const { host, format, tier, isaTime, theirTime, name, email, notes, submitted, flagged } = input

  const isa = toIsa({
    subject: `[Live reading] ${isaTime} — ${format}, ${tier.label} — ${name}`,
    eyebrow: 'Live reading request',
    flagged,
    blocks: [
      { p: `Reply to this email to confirm the time with ${name}.` },
      {
        rows: [
          ['Format', format],
          ['Length', `${tier.label} · ${tier.price} (holds ${tier.blockMinutes} min)`],
          ['Your time', isaTime],
          ['Their time', theirTime ?? 'unknown timezone'],
          ['Name', name],
          ['Email', email],
          ['Submitted', submitted],
        ],
      },
      { label: 'Their question / notes', quote: notes || BLANK },
      {
        p: tier.paymentUrl
          ? `They were offered the ${tier.price} Stripe payment link, with this email filled in. Match the payment by email.`
          : `No Stripe link is set for this length yet. Include payment details (${tier.price}) when you confirm.`,
        muted: true,
      },
      { p: 'The attached calendar file adds the slot to your calendar.', muted: true },
    ],
    footer: sentFrom('live booking form', host, name),
  })

  const when = theirTime ?? isaTime
  const client = toClient({
    subject: `Your live reading request for ${when}`,
    name,
    blocks: [
      { p: 'I have your request for a live reading. This time is not confirmed yet. I’ll reply to this email to confirm it.' },
      { rows: [['Format', format], ['Length', `${tier.label} · ${tier.price}`], ['Requested time', when]] },
      notes
        ? { label: 'Your notes', quote: notes }
        : { p: 'If there’s a question you’d like us to focus on, reply with it and I’ll have it ready when we meet.' },
      ...(tier.paymentUrl
        ? [
            {
              p: 'If you haven’t paid yet, you can do it here. Please use this same email address at checkout so I can match your payment to your booking.',
            },
            { button: `Pay ${tier.price}`, href: withPrefilledEmail(tier.paymentUrl, email) },
          ]
        : [{ p: `I’ll include payment details (${tier.price}) when I confirm.` }]),
    ],
    why: `You’re getting this because you booked a live tarot reading at ${host}.`,
  })

  return { toIsa: isa, toClient: client }
}

// ─── Contact ────────────────────────────────────────────────────────────────

export interface ContactInput {
  host: string
  name: string
  email: string
  category: string
  message: string
  submitted: string
  flagged: boolean
}

export function contactEmails(input: ContactInput): FormEmails {
  const { host, name, email, category, message, submitted, flagged } = input

  const isa = toIsa({
    subject: `[${category}] Screen Sage — message from ${name}`,
    eyebrow: `Message · ${category}`,
    flagged,
    blocks: [
      { rows: [['Name', name], ['Email', email], ['Topic', category], ['Submitted', submitted]] },
      { label: 'Message', quote: message },
    ],
    footer: sentFrom('contact form', host, name),
  })

  const client = toClient({
    subject: 'I got your message',
    name,
    blocks: [
      { p: 'Thanks for writing. I’ll answer at this address as soon as I can. Here’s a copy of your message.' },
      { rows: [['Topic', category]] },
      { label: 'Your message', quote: message },
    ],
    why: `You’re getting this because you used the contact form at ${host}.`,
  })

  return { toIsa: isa, toClient: client }
}

// ─── Studio project inquiry ─────────────────────────────────────────────────

export interface ProjectInput {
  host: string
  name: string
  email: string
  business: string
  /** Their current website, if they have one. */
  website: string
  projectType: string
  budget: string
  timeline: string
  message: string
  submitted: string
  flagged: boolean
}

export function projectEmails(input: ProjectInput): FormEmails {
  const { host, name, email, business, website, projectType, budget, timeline, message, submitted, flagged } = input
  const who = business ? `${name} / ${business}` : name

  const isa = toIsa({
    subject: `[Studio lead] ${projectType} · ${budget} — ${who}`,
    eyebrow: 'Studio · new project inquiry',
    flagged,
    blocks: [
      {
        rows: [
          ['Name', name],
          ['Email', email],
          ['Business', business || BLANK],
          ['Current site', website || BLANK],
          ['Project', projectType],
          ['Budget', budget],
          ['Timeline', timeline],
          ['Submitted', submitted],
        ],
      },
      { label: 'Message', quote: message },
    ],
    footer: sentFrom('Studio project form', host, name),
  })

  const client = toClient({
    subject: 'I got your project inquiry',
    name,
    signature: 'Screen Sage Studios',
    blocks: [
      { p: 'Thanks for telling me about your project. I’ll reply by email with next steps. Here’s a copy of what you sent.' },
      {
        rows: [
          ...(business ? [['Business', business] as Row] : []),
          ...(website ? [['Current site', website] as Row] : []),
          ['Project', projectType],
          ['Budget', budget],
          ['Timeline', timeline],
        ],
      },
      { label: 'About the project', quote: message },
    ],
    why: `You’re getting this because you sent a project inquiry at ${host}.`,
  })

  return { toIsa: isa, toClient: client }
}

// ─── Waitlist & mailing list ────────────────────────────────────────────────

function listNote(savedToContacts: boolean, flagged: boolean) {
  if (flagged) return 'Not added to your Resend Contacts list because the anti-spam field was filled in. Add them by hand if they look real.'
  return savedToContacts
    ? 'They’re saved in your Resend Contacts list.'
    : 'Saving them to your Resend Contacts list failed. Add them there by hand.'
}

const IGNORE_IF_NOT_YOU = 'If you didn’t sign up, you can ignore this email.'

export interface WaitlistInput {
  host: string
  appName: string
  name: string
  email: string
  savedToContacts: boolean
  submitted: string
  flagged: boolean
}

export function waitlistEmails(input: WaitlistInput): FormEmails {
  const { host, appName, name, email, savedToContacts, submitted, flagged } = input

  const isa = toIsa({
    subject: `[${appName} waitlist] ${name || email} joined`,
    eyebrow: `${appName} waitlist`,
    flagged,
    blocks: [
      { rows: [['Name', name || BLANK], ['Email', email], ['App', appName], ['Submitted', submitted]] },
      { p: listNote(savedToContacts, flagged), muted: true },
    ],
    footer: sentFrom('waitlist form', host),
  })

  const client = toClient({
    subject: `You’re on the ${appName} waitlist`,
    name,
    blocks: [{ p: `Thanks for signing up. I’ll email you when ${appName} is ready.` }],
    why: `You’re getting this because this address joined the ${appName} waitlist at ${host}. ${IGNORE_IF_NOT_YOU}`,
  })

  return { toIsa: isa, toClient: client }
}

export interface NewsletterInput {
  host: string
  email: string
  savedToContacts: boolean
  submitted: string
  flagged: boolean
}

export function newsletterEmails(input: NewsletterInput): FormEmails {
  const { host, email, savedToContacts, submitted, flagged } = input

  const isa = toIsa({
    subject: `[Mailing list] ${email} joined`,
    eyebrow: 'Mailing list',
    flagged,
    blocks: [
      { rows: [['Email', email], ['Submitted', submitted]] },
      { p: listNote(savedToContacts, flagged), muted: true },
    ],
    footer: sentFrom('“Join the journey” form', host),
  })

  const client = toClient({
    subject: 'You’re on the list',
    name: '',
    blocks: [{ p: 'Thanks for joining. You’ll get new videos, app drops and the occasional dispatch. You can unsubscribe anytime.' }],
    why: `You’re getting this because this address joined the Screen Sage mailing list at ${host}. ${IGNORE_IF_NOT_YOU}`,
  })

  return { toIsa: isa, toClient: client }
}
