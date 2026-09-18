import { useScrollReveal } from '../hooks/useScrollReveal'
import { useForm, ValidationError } from '@formspree/react'
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
  const [state, handleSubmit] = useForm('xeevejjg')

  const leftRef = useScrollReveal<HTMLDivElement>({ y: 40, x: -40, start: 'top 75%' })
  const rightRef = useScrollReveal<HTMLDivElement>({ y: 40, x: 40, start: 'top 75%' })

  return (
    <section id="contact" className="bg-[#141312] section-padding relative z-10 border-b border-white/10 text-[#F6F4EE]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div ref={leftRef} className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-[#C89968]" />
              <span className="font-sans font-medium text-xs tracking-[0.25em] uppercase text-[#C89968]">
                Dialoog &amp; Afspraak
              </span>
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F6F4EE] leading-[1.08] tracking-tight">
              Start een Project
            </h2>
            <p className="mt-6 font-sans text-sm sm:text-base text-[#F6F4EE]/75 leading-relaxed font-light">
              Heb je een specifiek meubelstuk of totaalproject voor ogen? Of wens je een verkennend gesprek in het atelier te Wilsele?
              Ik bekijk graag de mogelijkheden en denk mee over materiaal en constructie.
            </p>

            <div className="mt-10 space-y-6">
              {CONTACT_DETAILS.map((item) => {
                const Icon = item.icon
                const content = (
                  <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-none border border-white/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-[#C89968] transition-colors">
                      <Icon size={15} className="text-[#C89968]" />
                    </div>
                    <div>
                      <p className="font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-[#F6F4EE]/50">
                        {item.label}
                      </p>
                      <p className="font-sans text-sm text-[#F6F4EE] mt-0.5 group-hover:text-[#C89968] transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )

                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                )
              })}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 space-y-2 text-xs font-sans tracking-wider text-[#F6F4EE]/40">
              <p>BTW: BE 0682 403 611 &bull; Rein Art Design BV</p>
              <p>IBAN: BE92 0018 2117 7323</p>
            </div>

            <a
              href="https://www.instagram.com/rein_art_design/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 px-4 py-2.5 border border-white/15 text-[#F6F4EE]/80 hover:text-white hover:border-white/40 transition-all text-xs font-sans tracking-[0.15em] uppercase"
            >
              <Instagram size={15} className="text-[#C89968]" />
              <span>@rein_art_design</span>
            </a>
          </div>

          <div ref={rightRef} className="lg:col-span-7">
            <div className="bg-[#1C1B1A] p-8 sm:p-10 border border-white/10">
              {state.succeeded ? (
                <div className="text-center py-16">
                  <div className="w-14 h-14 border border-[#C89968] flex items-center justify-center mx-auto mb-6">
                    <svg className="w-6 h-6 text-[#C89968]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl text-[#F6F4EE]">Aanvraag Ontvangen</h3>
                  <p className="font-sans text-sm text-[#F6F4EE]/70 mt-3 max-w-md mx-auto leading-relaxed font-light">
                    Hartelijk dank. Ik neem binnen twee werkdagen persoonlijk contact met je op om de wensen door te spreken.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div>
                    <span className="block font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-[#F6F4EE]/60 mb-2">
                      Waarover gaat jouw project?
                    </span>
                    <select
                      id="onderwerp"
                      name="onderwerp"
                      defaultValue="Tafel op maat"
                      className="w-full bg-[#141312] border border-white/15 px-4 py-3 text-[#F6F4EE] font-sans text-sm focus:border-[#C89968] outline-none transition-colors"
                    >
                      <option value="Tafel op maat" className="bg-[#1C1B1A]">Eettafel of Salontafel op maat</option>
                      <option value="Maatkast of Dressing" className="bg-[#1C1B1A]">Maatkast, Boekenkast of Dressing</option>
                      <option value="Keuken of Badkamer" className="bg-[#1C1B1A]">Keuken of Badkamermeubel</option>
                      <option value="Staalconstructie" className="bg-[#1C1B1A]">Staalconstructie of Onderstel</option>
                      <option value="Totaalproject" className="bg-[#1C1B1A]">Volledig Interieurproject</option>
                      <option value="Algemene vraag" className="bg-[#1C1B1A]">Vrijblijvende Kennismaking</option>
                    </select>
                    <ValidationError field="onderwerp" errors={state.errors} className="text-red-400 text-xs mt-1" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="naam" className="block font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-[#F6F4EE]/60 mb-2">
                        Voor- en Achternaam *
                      </label>
                      <input
                        id="naam"
                        type="text"
                        name="naam"
                        required
                        placeholder="Rein De Keyser"
                        className="w-full bg-[#141312] border border-white/15 px-4 py-3 text-[#F6F4EE] font-sans text-sm focus:border-[#C89968] outline-none transition-colors placeholder:text-white/20"
                      />
                      <ValidationError field="naam" errors={state.errors} className="text-red-400 text-xs mt-1" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-[#F6F4EE]/60 mb-2">
                        E-mailadres *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        placeholder="contact@domein.be"
                        className="w-full bg-[#141312] border border-white/15 px-4 py-3 text-[#F6F4EE] font-sans text-sm focus:border-[#C89968] outline-none transition-colors placeholder:text-white/20"
                      />
                      <ValidationError field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telefoon" className="block font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-[#F6F4EE]/60 mb-2">
                      Telefoonnummer
                    </label>
                    <input
                      id="telefoon"
                      type="tel"
                      name="telefoon"
                      placeholder="+32 (0)4..."
                      className="w-full bg-[#141312] border border-white/15 px-4 py-3 text-[#F6F4EE] font-sans text-sm focus:border-[#C89968] outline-none transition-colors placeholder:text-white/20"
                    />
                    <ValidationError field="telefoon" errors={state.errors} className="text-red-400 text-xs mt-1" />
                  </div>

                  <div>
                    <label htmlFor="bericht" className="block font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-[#F6F4EE]/60 mb-2">
                      Toelichting of Afmetingen *
                    </label>
                    <textarea
                      id="bericht"
                      name="bericht"
                      required
                      rows={4}
                      placeholder="Beschrijf de gewenste afmetingen, houtsoorten of stijl van de ruimte..."
                      className="w-full bg-[#141312] border border-white/15 px-4 py-3 text-[#F6F4EE] font-sans text-sm focus:border-[#C89968] outline-none transition-colors resize-none placeholder:text-white/20"
                    />
                    <ValidationError field="bericht" errors={state.errors} className="text-red-400 text-xs mt-1" />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full font-sans font-medium text-xs tracking-[0.25em] uppercase py-4 bg-[#F6F4EE] text-[#121110] hover:bg-[#C89968] hover:text-white transition-all duration-300 border border-[#F6F4EE] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state.submitting ? 'Verzenden...' : 'Verstuur Projectaanvraag'}
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
