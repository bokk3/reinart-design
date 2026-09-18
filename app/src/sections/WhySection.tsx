import { useScrollReveal } from '../hooks/useScrollReveal'

const PILLARS = [
  {
    number: '01',
    title: 'Pure Singulariteit',
    subtitle: 'Geen Massaproductie',
    description: 'Elk meubelstuk ontstaat vanuit een leeg blad. Ontworpen rondom de exacte verhoudingen van jouw ruimte en de unieke tekening van het geselecteerde hout.',
  },
  {
    number: '02',
    title: 'Eerlijke Materie',
    subtitle: 'Stamhout & Volstaal',
    description: 'Massief hout met respect voor noesten en vlammen, gecombineerd met volstaal behandeld met open vlam en bijenwas. Geen holle profielen of kunstmatige fineerfolies.',
  },
  {
    number: '03',
    title: 'Eén Meester-Ambachtsman',
    subtitle: 'Van Schets tot Plaatsing',
    description: 'Geen tussenpersonen, accountmanagers of externe onderaannemers. Rein De Keyser ontwerpt, bouwt en monteert elk stuk persoonlijk in jouw woning.',
  },
  {
    number: '04',
    title: 'Generatielang Karakter',
    subtitle: 'Tijdloos & Onverwoestbaar',
    description: 'Onze meubels zijn gemaakt om intensief in te leven en generaties lang mee te gaan. Ze slijten niet af, maar bouwen door de jaren heen een rijke patine op.',
  },
]

export default function WhySection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, start: 'top 75%' })
  const cardsRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.1, children: true, start: 'top 70%' })

  return (
    <section id="waarom-rein" className="bg-cream section-padding relative z-10 border-b border-charcoal/5">
      <div className="container-custom">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-[#A67B5B]" />
              <span className="font-sans font-medium text-xs tracking-[0.25em] uppercase text-[#A67B5B]">
                Filosofie &amp; Waarden
              </span>
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-[1.08] tracking-tight">
              Het Atelier Manifest
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm sm:text-base text-muted-custom leading-relaxed font-light">
            Vakmanschap is geen marketingterm, maar een dagelijkse toewijding aan precisie,
            materiaalkennis en compromisloze kwaliteit.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-[#FAF8F5] border border-charcoal/10 p-8 flex flex-col justify-between hover:border-charcoal/40 transition-colors duration-300"
            >
              <div>
                <span className="font-serif text-4xl text-[#A67B5B]/40 block leading-none select-none">
                  {pillar.number}
                </span>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-custom mt-6 block">
                  {pillar.subtitle}
                </span>
                <h3 className="font-serif text-2xl text-charcoal mt-1 leading-snug">
                  {pillar.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-graphite/75 leading-relaxed mt-4 font-light">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-charcoal/10 text-[10px] font-sans tracking-[0.2em] uppercase text-muted-custom">
                Atelier Wilsele Standaard
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
