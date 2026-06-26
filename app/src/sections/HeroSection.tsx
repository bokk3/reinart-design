import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set([eyebrowRef.current, line1Ref.current, line2Ref.current, subRef.current, ctaRef.current], {
        opacity: 1,
        y: 0,
      })
      gsap.set(bgRef.current, { scale: 1, opacity: 1 })
      gsap.set(overlayRef.current, { opacity: 0.5 })
      return
    }

    const tl = gsap.timeline()

    tl.fromTo(
      bgRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
    )
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 0.5, duration: 0.8 },
      0.2
    )
    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.4
    )
    tl.fromTo(
      line1Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      0.6
    )
    tl.fromTo(
      line2Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      0.8
    )
    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      1.0
    )
    tl.fromTo(
      ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
      1.2
    )

    // Parallax on scroll
    gsap.to(bgRef.current, {
      scale: 1.05,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tl.kill()
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Fixed hero */}
      <div ref={sectionRef} className="fixed inset-0 z-0 h-screen w-full">
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full opacity-0"
          style={{ willChange: 'transform' }}
        >
          <img
            src="/assets/hero-bg.jpg"
            alt="Handgemaakte walnoot eettafel in minimalistisch Belgisch interieur"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#1A1A1A] opacity-0"
          style={{ mixBlendMode: 'multiply' }}
        />

        <div className="relative z-10 flex flex-col justify-center h-full container-custom">
          <span
            ref={eyebrowRef}
            className="font-sans font-medium text-xs tracking-[0.2em] uppercase text-[#A67B5B] opacity-0"
          >
            Maatwerk in hout &amp; staal — Wilsele, België
          </span>

          <h1 className="mt-6 max-w-3xl">
            <span
              ref={line1Ref}
              className="block font-serif text-5xl sm:text-6xl lg:text-7xl text-[#F7F5F0] leading-[1.05] tracking-tight opacity-0"
            >
              Tijdloos vakmanschap.
            </span>
            <span
              ref={line2Ref}
              className="block font-serif text-5xl sm:text-6xl lg:text-7xl text-[#F7F5F0] leading-[1.05] tracking-tight mt-2 opacity-0"
            >
              Gebouwd voor het leven.
            </span>
          </h1>

          <p
            ref={subRef}
            className="mt-8 max-w-xl font-sans text-base sm:text-lg text-[#F7F5F0]/80 leading-relaxed opacity-0"
          >
            Elk meubelstuk wordt met de hand ontworpen en vervaardigd in onze
            werkplaats. Geen massaproductie. Alleen uitzonderlijk maatwerk dat
            generaties meegaat.
          </p>

          <div ref={ctaRef} className="mt-12 flex flex-wrap gap-4 opacity-0">
            <button
              onClick={() => scrollTo('#projecten')}
              className="font-sans font-semibold text-xs tracking-[0.1em] uppercase px-8 py-4 rounded-full bg-[#F7F5F0] text-charcoal hover:bg-[#A67B5B] hover:text-white hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Bekijk realisaties
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="font-sans font-semibold text-xs tracking-[0.1em] uppercase px-8 py-4 rounded-full border border-[#F7F5F0]/40 text-[#F7F5F0] hover:border-[#F7F5F0] hover:bg-[#F7F5F0]/10 transition-all duration-300"
            >
              Vraag een gesprek aan
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for scroll */}
      <div className="h-screen" />
    </>
  )
}
