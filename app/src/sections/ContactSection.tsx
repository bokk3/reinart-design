import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { User, Building2, MapPin, Phone, Mail, Globe, Instagram } from 'lucide-react'

const CONTACT_DETAILS = [
  { icon: User, label: 'Naam', value: 'Rein De Keyser' },
  { icon: Building2, label: 'Bedrijf', value: 'Rein Art Design BV' },
  { icon: MapPin, label: 'Adres', value: 'Bornestraat 285, 3012 Wilsele, België' },
  { icon: Phone, label: 'Telefoon', value: '+32 (0)487 837 041', href: 'tel:+32487837041' },
  { icon: Mail, label: 'E-mail', value: 'contact@reinartdesign.be', href: 'mailto:contact@reinartdesign.be' },
  { icon: Globe, label: 'Website', value: 'reinartdesign.be', href: 'https://reinartdesign.be' },
]

export default function ContactSection() {
  const [formState, setFormState] = useState({
    naam: '',
    email: '',
    telefoon: '',
    onderwerp: 'Maatwerk aanvraag',
    bericht: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const leftRef = useScrollReveal<HTMLDivElement>({ y: 40, x: -40, start: 'top 75%' })
  const rightRef = useScrollReveal<HTMLDivElement>({ y: 40, x: 40, start: 'top 75%' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormState({
        naam: '',
        email: '',
        telefoon: '',
        onderwerp: 'Maatwerk aanvraag',
        bericht: '',
      })
    }, 4000)
  }

  return (
    <section id="contact" className="bg-charcoal section-padding relative z-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div ref={leftRef} className="lg:col-span-5">
            <span className="font-sans font-medium text-xs tracking-[0.15em] uppercase text-[#A67B5B]">
              Contact
            </span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-[#F7F5F0] leading-[1.1] tracking-tight">
              Laten we kennismaken
            </h2>
            <p className="mt-6 font-sans text-lg text-[#F7F5F0]/70 leading-relaxed">
              Heb je een project in gedachten? Of wil je gewoon eens
              kennismaken en de mogelijkheden bespreken? Ik hoor het graag.
            </p>

            <div className="mt-10 space-y-5">
              {CONTACT_DETAILS.map((item) => {
                const Icon = item.icon
                const content = (
                  <div className="flex items-start gap-4">
                    <Icon size={18} className="text-[#A67B5B] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-sans font-medium text-xs tracking-[0.1em] uppercase text-[#F7F5F0]/50">
                        {item.label}
                      </p>
                      <p className="font-sans text-base text-[#F7F5F0] mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )

                return item.href ? (
                  <a key={item.label} href={item.href} className="block hover:opacity-80 transition-opacity">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-[#F7F5F0]/10 space-y-2">
              <p className="font-sans font-medium text-xs tracking-wide text-[#F7F5F0]/40">
                BTW: BE 0682 403 611
              </p>
              <p className="font-sans font-medium text-xs tracking-wide text-[#F7F5F0]/40">
                IBAN: BE92 0018 2117 7323
              </p>
            </div>

            <a
              href="https://www.instagram.com/rein_art_design/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-[#F7F5F0]/70 hover:text-[#A67B5B] transition-colors"
            >
              <Instagram size={18} />
              <span className="font-sans text-sm">@rein_art_design</span>
            </a>
          </div>

          <div ref={rightRef} className="lg:col-span-7">
            <div className="bg-[#F7F5F0]/5 rounded-lg p-6 lg:p-8 border border-[#F7F5F0]/10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#A67B5B]/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#A67B5B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-[#F7F5F0]">Bedankt voor je bericht</h3>
                  <p className="font-sans text-sm text-[#F7F5F0]/60 mt-2">
                    Ik neem zo snel mogelijk contact met je op.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-sans font-medium text-xs tracking-[0.1em] uppercase text-[#F7F5F0]/50 mb-2">
                        Naam
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.naam}
                        onChange={(e) => setFormState((s) => ({ ...s, naam: e.target.value }))}
                        placeholder="Jouw naam"
                        className="w-full bg-transparent border-b border-[#F7F5F0]/20 focus:border-[#A67B5B] text-[#F7F5F0] font-sans text-base py-3 outline-none transition-colors placeholder:text-[#F7F5F0]/30"
                      />
                    </div>
                    <div>
                      <label className="block font-sans font-medium text-xs tracking-[0.1em] uppercase text-[#F7F5F0]/50 mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                        placeholder="jouw@email.be"
                        className="w-full bg-transparent border-b border-[#F7F5F0]/20 focus:border-[#A67B5B] text-[#F7F5F0] font-sans text-base py-3 outline-none transition-colors placeholder:text-[#F7F5F0]/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans font-medium text-xs tracking-[0.1em] uppercase text-[#F7F5F0]/50 mb-2">
                      Telefoon
                    </label>
                    <input
                      type="tel"
                      value={formState.telefoon}
                      onChange={(e) => setFormState((s) => ({ ...s, telefoon: e.target.value }))}
                      placeholder="+32 ..."
                      className="w-full bg-transparent border-b border-[#F7F5F0]/20 focus:border-[#A67B5B] text-[#F7F5F0] font-sans text-base py-3 outline-none transition-colors placeholder:text-[#F7F5F0]/30"
                    />
                  </div>

                  <div>
                    <label className="block font-sans font-medium text-xs tracking-[0.1em] uppercase text-[#F7F5F0]/50 mb-2">
                      Onderwerp
                    </label>
                    <select
                      value={formState.onderwerp}
                      onChange={(e) => setFormState((s) => ({ ...s, onderwerp: e.target.value }))}
                      className="w-full bg-transparent border-b border-[#F7F5F0]/20 focus:border-[#A67B5B] text-[#F7F5F0] font-sans text-base py-3 outline-none transition-colors"
                    >
                      <option value="Maatwerk aanvraag" className="bg-charcoal">Maatwerk aanvraag</option>
                      <option value="Kennismaking" className="bg-charcoal">Kennismaking</option>
                      <option value="Offerte" className="bg-charcoal">Offerte</option>
                      <option value="Andere vraag" className="bg-charcoal">Andere vraag</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans font-medium text-xs tracking-[0.1em] uppercase text-[#F7F5F0]/50 mb-2">
                      Bericht
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.bericht}
                      onChange={(e) => setFormState((s) => ({ ...s, bericht: e.target.value }))}
                      placeholder="Vertel me over je project..."
                      className="w-full bg-transparent border-b border-[#F7F5F0]/20 focus:border-[#A67B5B] text-[#F7F5F0] font-sans text-base py-3 outline-none transition-colors resize-none placeholder:text-[#F7F5F0]/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full font-sans font-semibold text-xs tracking-[0.1em] uppercase py-4 rounded-full bg-[#F7F5F0] text-charcoal hover:bg-[#A67B5B] hover:text-white hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Verstuur bericht
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
