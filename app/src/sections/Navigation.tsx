import { useEffect, useState, useCallback } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Realisaties', href: '#projecten' },
  { label: 'Over Rein', href: '#over-rein' },
  { label: 'Werkwijze', href: '#werkwijze' },
  { label: 'Materialen', href: '#materialen' },
  { label: 'Contact', href: '#contact' },
]

interface NavigationProps {
  activeSection: string
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-nav shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between h-20">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`font-sans font-semibold text-lg tracking-wide transition-colors duration-300 ${
              scrolled ? 'text-charcoal' : 'text-[#F7F5F0]'
            }`}
          >
            Rein Art Design
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative font-sans font-medium text-sm tracking-widest uppercase transition-colors duration-300 group ${
                  scrolled ? 'text-charcoal' : 'text-[#F7F5F0]/90'
                } ${
                  activeSection === link.href.slice(1) ? '!text-[#A67B5B]' : ''
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-[#A67B5B]`}
                />
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <button
              onClick={() => scrollTo('#contact')}
              className={`font-sans font-semibold text-xs tracking-widest uppercase px-7 py-3 rounded-full transition-all duration-300 ${
                scrolled
                  ? 'bg-charcoal text-[#F7F5F0] hover:bg-[#A67B5B]'
                  : 'bg-[#F7F5F0] text-charcoal hover:bg-[#A67B5B] hover:text-white'
              }`}
            >
              Vraag een gesprek aan
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden p-2 transition-colors ${
              scrolled ? 'text-charcoal' : 'text-[#F7F5F0]'
            }`}
            aria-label="Menu openen"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-charcoal transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container-custom flex flex-col h-full">
          <div className="flex justify-between items-center h-20">
            <span className="font-sans font-semibold text-lg text-[#F7F5F0]">
              Rein Art Design
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-[#F7F5F0] p-2"
              aria-label="Menu sluiten"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-serif text-3xl text-[#F7F5F0] text-left hover:text-[#A67B5B] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              className="mt-4 font-sans font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-full bg-[#F7F5F0] text-charcoal hover:bg-[#A67B5B] hover:text-white transition-colors w-fit"
            >
              Vraag een gesprek aan
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
