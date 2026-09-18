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
    <footer ref={ref} className="bg-[#100F0E] py-20 relative z-10 text-[#F6F4EE]">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <span className="block font-serif text-2xl tracking-[0.12em] uppercase text-[#F6F4EE]">
              Rein Art Design
            </span>
            <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[#C89968] mt-1">
              Atelier Wilsele &bull; Meubelmakerij
            </span>
            <p className="font-sans text-xs text-[#F6F4EE]/60 mt-4 leading-relaxed font-light">
              Tijdloos maatwerk in massief hout en volstaal. Ontworpen, vervaardigd en geplaatst door Rein De Keyser.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 lg:gap-20">
            <div>
              <p className="font-sans font-medium text-[10px] tracking-[0.25em] uppercase text-[#F6F4EE]/50 mb-5">
                Navigatie
              </p>
              <div className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="block font-sans text-xs tracking-wider uppercase text-[#F6F4EE]/70 hover:text-[#C89968] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-sans font-medium text-[10px] tracking-[0.25em] uppercase text-[#F6F4EE]/50 mb-5">
                Atelier &amp; Contact
              </p>
              <div className="space-y-2.5 text-xs font-sans text-[#F6F4EE]/70">
                <a href="tel:+32487837041" className="block hover:text-[#C89968] transition-colors">
                  +32 (0)487 837 041
                </a>
                <a href="mailto:contact@reinartdesign.be" className="block hover:text-[#C89968] transition-colors">
                  contact@reinartdesign.be
                </a>
                <p className="text-[#F6F4EE]/50">
                  Bornestraat 285, 3012 Wilsele
                </p>
              </div>
            </div>

            <div>
              <p className="font-sans font-medium text-[10px] tracking-[0.25em] uppercase text-[#F6F4EE]/50 mb-5">
                Sociale Media
              </p>
              <a
                href="https://www.instagram.com/rein_art_design/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-xs font-sans text-[#F6F4EE]/70 hover:text-[#C89968] transition-colors"
              >
                <Instagram size={15} className="text-[#C89968]" />
                <span className="tracking-wider">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-sans text-[#F6F4EE]/40 tracking-wider">
          <p>
            &copy; {new Date().getFullYear()} Rein Art Design BV. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-8">
            <span className="cursor-default hover:text-[#F6F4EE]/60 transition-colors">
              Bornestraat 285, Wilsele
            </span>
            <span className="cursor-default hover:text-[#F6F4EE]/60 transition-colors">
              BE 0682 403 611
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
