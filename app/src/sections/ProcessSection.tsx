import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: '01',
    phase: 'Fase 01 &bull; Eerste Contact',
    title: 'Dialoog &amp; Visie',
    description: 'We starten met een diepgaand gesprek over jouw levensstijl, esthetische voorkeuren en de functie van het meubel. Geen haastige cataloguskeuzes, maar het fundament voor een uniek stuk.',
  },
  {
    number: '02',
    phase: 'Fase 02 &bull; Ter Plaatse',
    title: 'Opmeting &amp; Lichtinval',
    description: 'Ik kom persoonlijk ter plaatse inmeten. We analyseren de lichtinval, ruimtelijke proporties, vloeraansluitingen en architecturale zichtlijnen zodat het meubel naadloos integreert.',
  },
  {
    number: '03',
    phase: 'Fase 03 &bull; Ontwerpstudio',
    title: 'Materiaalselectie &amp; Detailontwerp',
    description: 'Samen kiezen we de exacte stamdelen, houtsoorten en metaalafwerkingen. Schetsen en technische detailleringen geven een kristalhelder beeld van het toekomstige resultaat.',
  },
  {
    number: '04',
    phase: 'Fase 04 &bull; Werkplaats Wilsele',
    title: 'Ambachtelijke Vervaardiging',
    description: 'In mijn atelier te Wilsele wordt het meubel met de hand gezaagd, geschaafd, gelast en samengesteld. Traditionele houtverbindingen en hittebehandeld staal vormen het hart van de constructie.',
  },
  {
    number: '05',
    phase: 'Fase 05 &bull; Oplevering',
    title: 'Eigenhandige Plaatsing',
    description: 'Ik plaats het meubelstuk zelf bij jou thuis. Millimeterwerk, perfect waterpas en afgewerkt tot in het kleinste detail. Klaar om generaties lang gekoesterd te worden.',
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
      tl.fromTo(content, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.7 }, 0.15)
      tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(1.7)' }, 0.1)
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section id="werkwijze" ref={sectionRef} className="bg-[#121110] section-padding relative z-10 border-b border-white/10">
      <div className="container-custom">
        <div ref={headerRef} className="text-center mb-24">
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-px bg-[#C89968]" />
            <span className="font-sans font-medium text-xs tracking-[0.25em] uppercase text-[#C89968]">
              Methodiek &amp; Fasering
            </span>
            <span className="w-6 h-px bg-[#C89968]" />
          </div>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F6F4EE] leading-[1.08] tracking-tight">
            Van Ruwe Balk tot Meesterstuk
          </h2>
          <p className="mt-4 max-w-xl mx-auto font-sans text-sm sm:text-base text-[#F6F4EE]/70 leading-relaxed font-light">
            Eén meubelmaker begeleidt jouw project van het eerste gesprek tot de definitieve plaatsing in jouw interieur.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div
            ref={lineRef}
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-white/15 lg:-translate-x-px"
          />

          <div className="space-y-16 lg:space-y-24">
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
                    <span className="step-number font-serif text-6xl lg:text-7xl text-white/10 leading-none select-none block">
                      {step.number}
                    </span>
                    <div className="step-content mt-1">
                      <span
                        className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C89968] block"
                        dangerouslySetInnerHTML={{ __html: step.phase }}
                      />
                      <h3
                        className="font-serif text-2xl lg:text-3xl text-[#F6F4EE] leading-tight mt-1"
                        dangerouslySetInnerHTML={{ __html: step.title }}
                      />
                      <p className="font-sans text-xs sm:text-sm text-[#F6F4EE]/75 leading-relaxed mt-3 font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden lg:flex lg:col-span-2 justify-center">
                    <div className="step-dot w-3.5 h-3.5 rounded-full bg-[#C89968] ring-4 ring-[#121110] border border-white/30" />
                  </div>

                  <div className="hidden lg:block lg:col-span-5" />

                  {/* Mobile dot */}
                  <div className="absolute left-4 top-3 lg:hidden -translate-x-1/2">
                    <div className="step-dot w-3 h-3 rounded-full bg-[#C89968]" />
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
