import { useEffect, useState } from 'react'

const SECTION_IDS = [
  'hero',
  'projecten',
  'over-rein',
  'werkwijze',
  'materialen',
  'contact',
]

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    // Check if we're at the top on mount/scroll
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('hero')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && window.scrollY >= 100) {
              setActiveSection(id)
            }
          })
        },
        { threshold: 0.3 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  return activeSection
}
