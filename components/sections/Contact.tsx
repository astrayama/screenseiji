'use client'

import { FormEvent, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/SectionHeading'
import { Send } from 'lucide-react'

export default function Contact() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(v => ({ ...v, [k]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Wire up Resend / Supabase here. For now, simulate a send.
    await new Promise(r => setTimeout(r, 900))
    setStatus('sent')
  }

  return (
    <section id="contact" className="section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Say hello."
              description="Questions, collaboration ideas, tarot inquiries, or just a note — I read everything."
            />
            <p className="mt-8 font-display text-lg italic font-light text-foreground/60 leading-relaxed">
              "I'll see you, fellow seeker."
            </p>
          </div>

          {/* Right */}
          <div
            ref={ref}
            className={cn('reveal', inView && 'reveal-in')}
          >
            {status === 'sent' ? (
              <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center gap-4 text-center min-h-[280px]">
                <div className="text-3xl">✦</div>
                <p className="font-display text-2xl font-light text-teal">Message received.</p>
                <p className="text-sm text-muted">I'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8 flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted/70">Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={set('name')}
                      className="glass rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/40 outline-none focus:border-teal/35 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted/70">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      className="glass rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/40 outline-none focus:border-teal/35 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted/70">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    className="glass rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/40 outline-none focus:border-teal/35 transition-colors resize-none"
                    placeholder="What's on your mind?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center justify-center gap-2 self-end rounded-full bg-gold px-7 py-3 text-sm font-semibold text-background transition-all hover:bg-gold-bright disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  <Send size={13} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
