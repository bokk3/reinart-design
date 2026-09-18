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
      <div id="hero" ref={sectionRef} className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full opacity-0"
          style={{ willChange: 'transform' }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/hero-bg.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
            <img
              src="/assets/hero-bg.jpg"
              alt="Handgemaakte walnoot eettafel in minimalistisch Belgisch interieur"
              className="w-full h-full object-cover"
            />
          </video>
        </div>
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/55 to-[#121110]/65 opacity-0"
        />

        <div className="relative z-10 flex flex-col justify-center h-full container-custom">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#C89968]" />
            <span
              ref={eyebrowRef}
              className="font-sans font-medium text-xs tracking-[0.25em] uppercase text-[#C89968] opacity-0"
            >
              Atelier Wilsele &bull; Massief Hout &amp; Staal
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl">
            <span
              ref={line1Ref}
              className="block font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#F6F4EE] leading-[1.04] tracking-tight opacity-0"
            >
              Tijdloos <span className="italic font-normal text-[#EAE0D5]">vakmanschap</span>.
            </span>
            <span
              ref={line2Ref}
              className="block font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#F6F4EE] leading-[1.04] tracking-tight mt-2 sm:mt-3 opacity-0"
            >
              Gebouwd voor het leven.
            </span>
          </h1>

          <p
            ref={subRef}
            className="mt-8 max-w-xl font-sans text-base sm:text-lg text-[#F6F4EE]/80 leading-relaxed font-light opacity-0"
          >
            Elk meubelstuk wordt van eerste schets tot eindafwerking met de hand vervaardigd in ons atelier.
            Geen serieproductie. Alleen puur maatwerk in staal en massief hout dat generaties meegaat.
          </p>

          <div ref={ctaRef} className="mt-12 flex flex-wrap gap-5 opacity-0 items-center">
            <button
              onClick={() => scrollTo('#projecten')}
              className="group font-sans font-medium text-xs tracking-[0.2em] uppercase px-8 py-4 bg-[#F6F4EE] text-[#121110] hover:bg-[#A67B5B] hover:text-white transition-all duration-300 flex items-center gap-3 border border-[#F6F4EE]"
            >
              <span>Bekijk realisaties</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-sm">&rarr;</span>
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="font-sans font-medium text-xs tracking-[0.2em] uppercase px-8 py-4 border border-[#F6F4EE]/40 text-[#F6F4EE] hover:border-[#F6F4EE] hover:bg-[#F6F4EE]/10 transition-all duration-300"
            >
              Vraag een gesprek aan
            </button>
          </div>
        </div>

        {/* Architectural Scroll Cue */}
        <div
          onClick={() => scrollTo('#over-rein')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2.5 opacity-50 hover:opacity-90 transition-opacity cursor-pointer z-10"
        >
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#F6F4EE]">Scroll</span>
          <div className="w-px h-9 bg-gradient-to-b from-[#F6F4EE] via-[#F6F4EE]/60 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Spacer for scroll */}
      <div className="h-screen" />
    </>
  )
}
