import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  y?: number
  x?: number
  opacity?: number
  scale?: number
  duration?: number
  delay?: number
  stagger?: number
  start?: string
  once?: boolean
  children?: boolean
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null)

  const {
    y = 40,
    x = 0,
    opacity = 0,
    scale,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    start = 'top 80%',
    once = true,
    children = false,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(children ? Array.from(el.children) : el, { opacity: 1, x: 0, y: 0, scale: 1 })
      return
    }

    // Set initial state explicitly
    const targets = children ? Array.from(el.children) : el
    gsap.set(targets, { opacity, y, x, scale: scale !== undefined ? scale : 1 })

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      stagger: stagger || undefined,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [y, x, opacity, scale, duration, delay, stagger, start, once, children])

  return ref
}
