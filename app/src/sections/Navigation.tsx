import { useEffect, useState, useCallback } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Atelier', href: '#over-rein' },
  { label: 'Collectie', href: '#diensten' },
  { label: 'Realisaties', href: '#projecten' },
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
            className="text-left group focus:outline-none"
          >
            <span
              className={`block font-serif text-lg tracking-[0.12em] uppercase transition-colors duration-300 ${
                scrolled ? 'text-charcoal' : 'text-[#F6F4EE]'
              }`}
            >
              Rein Art Design
            </span>
            <span
              className={`block font-sans text-[9px] tracking-[0.3em] uppercase transition-colors duration-300 ${
                scrolled ? 'text-muted-custom' : 'text-[#F6F4EE]/60'
              }`}
            >
              Atelier Wilsele &bull; Maatwerk
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative font-sans font-medium text-xs tracking-[0.2em] uppercase transition-colors duration-300 group py-1 ${
                    scrolled ? 'text-charcoal/80 hover:text-charcoal' : 'text-[#F6F4EE]/80 hover:text-[#F6F4EE]'
                  } ${isActive ? '!text-[#A67B5B]' : ''}`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-px transition-all duration-300 bg-[#A67B5B] ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <div className="hidden lg:block">
            <button
              onClick={() => scrollTo('#contact')}
              className={`font-sans font-medium text-xs tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300 border ${
                scrolled
                  ? 'border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-[#F6F4EE]'
                  : 'border-[#F6F4EE]/40 text-[#F6F4EE] hover:bg-[#F6F4EE] hover:text-charcoal'
              }`}
            >
              Contacteer Atelier
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden p-2 transition-colors focus:outline-none ${
              scrolled ? 'text-charcoal' : 'text-[#F6F4EE]'
            }`}
            aria-label="Menu openen"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-[#121110] transition-opacity duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container-custom flex flex-col h-full py-6">
          <div className="flex justify-between items-center h-16 border-b border-white/10">
            <div>
              <span className="block font-serif text-lg tracking-[0.12em] uppercase text-[#F6F4EE]">
                Rein Art Design
              </span>
              <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-[#F6F4EE]/60">
                Atelier Wilsele
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-[#F6F4EE]/80 hover:text-white p-2"
              aria-label="Menu sluiten"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-7">
            {NAV_LINKS.map((link, idx) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-serif text-3xl sm:text-4xl text-[#F6F4EE] text-left hover:text-[#A67B5B] transition-colors flex items-center justify-between group"
              >
                <span>{link.label}</span>
                <span className="text-xs font-sans tracking-[0.25em] text-[#F6F4EE]/30 group-hover:text-[#A67B5B]">
                  0{idx + 1}
                </span>
              </button>
            ))}
            <div className="pt-8 border-t border-white/10 mt-4">
              <button
                onClick={() => scrollTo('#contact')}
                className="w-full font-sans font-medium text-xs tracking-[0.2em] uppercase px-8 py-4 border border-[#F6F4EE]/40 text-[#F6F4EE] hover:bg-[#F6F4EE] hover:text-[#121110] transition-all duration-300"
              >
                Contacteer Atelier
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
