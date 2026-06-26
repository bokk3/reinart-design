import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'

const TESTIMONIALS = [
  {
    quote: 'Rein heeft onze droomkeuken gerealiseerd. Elke detail klopt. Je ziet en voelt het vakmanschap in elk oppervlak.',
    name: 'Sofie & Thomas',
    project: 'Keuken op maat — Leuven',
  },
  {
    quote: 'Onze eettafel is het pronkstuk van ons huis geworden. Massief eik met een stalen onderstel — precies wat we wilden.',
    name: 'Annelies M.',
    project: 'Eettafel — Tienen',
  },
  {
    quote: 'Van ontwerp tot plaatsing: alles verliep vlekkeloos. Rein denkt mee, adviseert en levert kwaliteit waar je elke dag van geniet.',
    name: 'Pieter D.',
    project: 'Volledige inrichting — Wilsele',
  },
  {
    quote: 'Onze dressing is perfect. Elke schoen, elke das heeft zijn plek. Rein begreep precies wat we nodig hadden.',
    name: 'Katrien B.',
    project: 'Dressing — Aarschot',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const goTo = (index: number) => {
    if (!contentRef.current || index === current) return

    const tl = gsap.timeline()
    tl.to(contentRef.current, { opacity: 0, x: index > current ? -30 : 30, duration: 0.3 })
    tl.call(() => setCurrent(index))
    tl.to(contentRef.current, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' })
  }

  const prev = () => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => goTo((current + 1) % TESTIMONIALS.length)

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      next()
    }, 6000)
    return () => clearInterval(timer)
  }, [current])

  const t = TESTIMONIALS[current]

  return (
    <section className="bg-sand section-padding relative z-10">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="text-center">
          <span className="font-serif text-8xl text-[#A67B5B]/30 leading-none select-none">"</span>
        </div>

        <div ref={contentRef} className="text-center mt-4">
          <p className="font-serif text-xl sm:text-2xl text-charcoal leading-relaxed italic max-w-3xl mx-auto">
            "{t.quote}"
          </p>

          <div className="mt-8">
            <p className="font-sans font-semibold text-lg text-charcoal">{t.name}</p>
            <p className="font-sans font-medium text-xs tracking-[0.1em] uppercase text-[#8A8580] mt-1">
              {t.project}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-[#D4CFC8] flex items-center justify-center hover:border-charcoal transition-colors"
            aria-label="Vorige testimonial"
          >
            <ChevronLeft size={20} className="text-charcoal" />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === current ? 'bg-charcoal w-6' : 'bg-[#D4CFC8]'
                }`}
                aria-label={`Ga naar testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-[#D4CFC8] flex items-center justify-center hover:border-charcoal transition-colors"
            aria-label="Volgende testimonial"
          >
            <ChevronRight size={20} className="text-charcoal" />
          </button>
        </div>
      </div>
    </section>
  )
}
