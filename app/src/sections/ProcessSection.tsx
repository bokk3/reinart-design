import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: '01',
    title: 'Kennismaking',
    description: 'We beginnen met een gesprek. Ik luister naar je wensen, je leefstijl en de sfeer van je huis. Geen standaardoplossingen — elk project is uniek.',
  },
  {
    number: '02',
    title: 'Opmeting',
    description: 'Ik kom ter plaatse opmeten. Elke ruimte is anders en millimeters tellen mee. Ik bekijk lichtinval, verhoudingen en bestaande elementen.',
  },
  {
    number: '03',
    title: 'Ontwerp',
    description: 'Samen komen we tot het perfecte ontwerp. Ik maak schetsen en 3D-visualisaties zodat je precies weet wat je krijgt. Revisies horen bij het proces.',
  },
  {
    number: '04',
    title: 'Materiaalkeuze',
    description: 'Enkel hoogwaardige materialen. Massief eik, notelaar of essen. Kwaliteitsstaal met de juiste afwerking. Ik begeleid je bij elke keuze.',
  },
  {
    number: '05',
    title: 'Productie',
    description: 'In mijn werkplaats in Wilsele wordt alles met uiterste precisie vervaardigd. Handgemaakt, niet machinaal. Elke verbinding, elke afwerking telt.',
  },
  {
    number: '06',
    title: 'Plaatsing',
    description: 'Professionele installatie ter plaatse. Ik plaats alles zelf en werk af tot in de kleinste details. Jij hoeft alleen maar te genieten.',
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, start: 'top 75%' })
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !lineRef.current) return

    // Draw the center line
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    )

    // Animate each step
    stepsRef.current.forEach((step) => {
      if (!step) return
      const number = step.querySelector('.step-number')
      const content = step.querySelector('.step-content')
      const dot = step.querySelector('.step-dot')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      tl.fromTo(number, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      tl.fromTo(content, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7 }, 0.15)
      tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(1.7)' }, 0.1)
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section id="werkwijze" ref={sectionRef} className="bg-charcoal section-padding relative z-10">
      <div className="container-custom">
        <div ref={headerRef} className="text-center mb-24">
          <span className="font-sans font-medium text-xs tracking-[0.15em] uppercase text-[#A67B5B]">
            Hoe ik werk
          </span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-[#F7F5F0] leading-[1.1] tracking-tight">
            Van idee tot realisatie
          </h2>
          <p className="mt-4 max-w-2xl mx-auto font-sans text-lg text-[#F7F5F0]/60 leading-relaxed">
            Een transparant proces waarbij jij centraal staat. Samen brengen
            we jouw visie tot leven.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div
            ref={lineRef}
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-[#F7F5F0]/20 lg:-translate-x-px"
          />

          <div className="space-y-20 lg:space-y-24">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={step.number}
                  ref={(el) => { stepsRef.current[index] = el }}
                  className={`relative grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center ${
                    isEven ? '' : 'lg:[direction:rtl]'
                  }`}
                >
                  <div
                    className={`lg:col-span-5 pl-12 lg:pl-0 ${
                      isEven ? 'lg:text-right lg:[direction:ltr]' : 'lg:text-left lg:[direction:ltr]'
                    }`}
                  >
                    <span className="step-number font-serif text-7xl lg:text-8xl text-[#F7F5F0]/10 leading-none select-none">
                      {step.number}
                    </span>
                    <div className="step-content mt-2">
                      <h3 className="font-serif text-2xl lg:text-3xl text-[#F7F5F0] leading-tight">
                        {step.title}
                      </h3>
                      <p className="font-sans text-sm lg:text-base text-[#F7F5F0]/70 leading-relaxed mt-3 max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden lg:flex lg:col-span-2 justify-center">
                    <div className="step-dot w-4 h-4 rounded-full bg-[#A67B5B] ring-4 ring-charcoal" />
                  </div>

                  <div className="hidden lg:block lg:col-span-5" />

                  {/* Mobile dot */}
                  <div className="absolute left-4 top-2 lg:hidden -translate-x-1/2">
                    <div className="step-dot w-3 h-3 rounded-full bg-[#A67B5B]" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
