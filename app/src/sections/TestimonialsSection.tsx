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
    <section className="bg-sand section-padding relative z-10 border-b border-charcoal/5">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-px bg-[#A67B5B]" />
            <span className="font-sans font-medium text-xs tracking-[0.25em] uppercase text-[#A67B5B]">
              Ervaringen &amp; Getuigenissen
            </span>
            <span className="w-6 h-px bg-[#A67B5B]" />
          </div>
          <span className="font-serif text-7xl text-[#A67B5B]/30 leading-none select-none block mt-6">
            &ldquo;
          </span>
        </div>

        <div ref={contentRef} className="text-center mt-2">
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal leading-relaxed italic max-w-3xl mx-auto font-normal">
            &ldquo;{t.quote}&rdquo;
          </p>

          <div className="mt-10">
            <p className="font-sans font-semibold text-base text-charcoal tracking-wider uppercase">
              {t.name}
            </p>
            <p className="font-sans font-medium text-xs tracking-[0.2em] uppercase text-muted-custom mt-1">
              {t.project}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 mt-14">
          <button
            onClick={prev}
            className="w-10 h-10 border border-charcoal/20 flex items-center justify-center hover:border-charcoal hover:bg-charcoal hover:text-[#F6F4EE] transition-all duration-300 text-charcoal"
            aria-label="Vorige testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2.5 items-center">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`h-1 transition-all duration-500 ${
                  idx === current ? 'bg-charcoal w-8' : 'bg-charcoal/20 w-4 hover:bg-charcoal/40'
                }`}
                aria-label={`Ga naar testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 border border-charcoal/20 flex items-center justify-center hover:border-charcoal hover:bg-charcoal hover:text-[#F6F4EE] transition-all duration-300 text-charcoal"
            aria-label="Volgende testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
