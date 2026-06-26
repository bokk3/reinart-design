import { useScrollReveal } from '../hooks/useScrollReveal'
import { Instagram } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Realisaties', href: '#projecten' },
  { label: 'Over Rein', href: '#over-rein' },
  { label: 'Werkwijze', href: '#werkwijze' },
  { label: 'Materialen', href: '#materialen' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const ref = useScrollReveal<HTMLElement>({ y: 20, start: 'top 95%' })

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer ref={ref} className="bg-[#1A1A1A] py-16 relative z-10">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          <div>
            <p className="font-sans font-semibold text-lg text-[#F7F5F0]">Rein Art Design</p>
            <p className="font-sans text-sm text-[#F7F5F0]/40 mt-2">
              Maatwerk in hout &amp; staal
            </p>
          </div>

          <div className="flex flex-wrap gap-12 lg:gap-16">
            <div>
              <p className="font-sans font-medium text-xs tracking-[0.1em] uppercase text-[#F7F5F0]/40 mb-4">
                Navigatie
              </p>
              <div className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="block font-sans text-sm text-[#F7F5F0]/60 hover:text-[#A67B5B] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-sans font-medium text-xs tracking-[0.1em] uppercase text-[#F7F5F0]/40 mb-4">
                Contact
              </p>
              <div className="space-y-2">
                <a href="tel:+32487837041" className="block font-sans text-sm text-[#F7F5F0]/60 hover:text-[#A67B5B] transition-colors">
                  +32 (0)487 837 041
                </a>
                <a href="mailto:contact@reinartdesign.be" className="block font-sans text-sm text-[#F7F5F0]/60 hover:text-[#A67B5B] transition-colors">
                  contact@reinartdesign.be
                </a>
                <p className="font-sans text-sm text-[#F7F5F0]/60">
                  Bornestraat 285, Wilsele
                </p>
              </div>
            </div>

            <div>
              <p className="font-sans font-medium text-xs tracking-[0.1em] uppercase text-[#F7F5F0]/40 mb-4">
                Volg mij
              </p>
              <a
                href="https://www.instagram.com/rein_art_design/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#F7F5F0]/60 hover:text-[#A67B5B] transition-colors"
              >
                <Instagram size={18} />
                <span className="font-sans text-sm">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#F7F5F0]/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans font-medium text-xs text-[#F7F5F0]/30">
            &copy; 2025 Rein Art Design. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6">
            <span className="font-sans font-medium text-xs text-[#F7F5F0]/30 cursor-default">
              Privacybeleid
            </span>
            <span className="font-sans font-medium text-xs text-[#F7F5F0]/30 cursor-default">
              Cookiebeleid
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
