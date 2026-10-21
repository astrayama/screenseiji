import CartalunaFaqAccordion from '@/components/cartaluna/FaqAccordion'
import CartalunaContactCards from '@/components/cartaluna/ContactCards'

export default function CartalunaHelp() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-4xl px-5 py-24 sm:px-8">
      <div className="text-center">
        <p className="cartaluna-eyebrow">Questions</p>
        <h2 id="faq-title" className="mt-4 font-cartaluna-display text-4xl leading-[1.12] sm:text-5xl">
          Frequently asked
        </h2>
      </div>
      <div className="mt-12">
        <CartalunaFaqAccordion />
      </div>

      <h3 className="mt-16 text-center font-cartaluna-display text-2xl text-cartaluna-text">Still have a question?</h3>
      <p className="mt-2 text-center text-[14px] text-cartaluna-muted">
        Carta Luna is in beta, and every note from a reading helps.
      </p>
      <div className="mt-8">
        <CartalunaContactCards />
      </div>
    </section>
  )
}
