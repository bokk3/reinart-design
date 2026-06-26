import { useScrollReveal } from '../hooks/useScrollReveal'
import { Boxes, Table2, Shirt, ChefHat, Tv, Bath, Hammer, Layers, Home } from 'lucide-react'

const SERVICES = [
  {
    icon: Boxes,
    title: 'Maatkasten',
    description: 'Ingebouwde kasten, boekenkasten en opbergmeubels die naadloos in je interieur passen. Van vloer tot plafond, precies op maat.',
  },
  {
    icon: Table2,
    title: 'Tafels',
    description: 'Eettafels, salontafels, bijzettafels en bureau\'s in massief hout met stalen onderstellen. Elk blad vertelt een verhaal.',
  },
  {
    icon: Shirt,
    title: 'Dressings',
    description: 'Volledig op maat gemaakte inloopdressings met slimme indeling. Iedere schoen, das en jas krijgt zijn plek.',
  },
  {
    icon: ChefHat,
    title: 'Keukens',
    description: 'Maatwerkkeukens die het hart van je huis vormen. Kwaliteitsvol, duurzaam en precies naar jouw wensen.',
  },
  {
    icon: Tv,
    title: 'TV-meubels',
    description: 'Strakke mediameubels die techniek wegwerken en stijl tonen. Met oog voor kabelmanagement en afwerking.',
  },
  {
    icon: Bath,
    title: 'Badkamermeubels',
    description: 'Houten badkamermeubels met de juiste behandeling tegen vocht. Tijdloos design voor je ochtendritueel.',
  },
  {
    icon: Hammer,
    title: 'Staalconstructies',
    description: 'Metalen onderstellen, frames en constructies op maat. Poederlaken in elke kleur, of raw steel met karakter.',
  },
  {
    icon: Layers,
    title: 'Hout & Staal',
    description: 'De perfecte combinatie van warm hout en koud staal. Tafels, bedden en kasten waar beide materialen elkaar versterken.',
  },
  {
    icon: Home,
    title: 'Interieurprojecten',
    description: 'Complete interieurinrichtingen waarin alle meubels op elkaar zijn afgestemd. Één visie, doorgevoerd in elk detail.',
  },
]

export default function ServicesSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, start: 'top 75%' })
  const cardsRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.08, children: true, start: 'top 70%' })

  return (
    <section id="diensten" className="bg-sand section-padding relative z-10">
      <div className="container-custom">
        <div ref={headerRef} className="text-center mb-20">
          <span className="font-sans font-medium text-xs tracking-[0.15em] uppercase text-[#A67B5B]">
            Wat ik doe
          </span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-charcoal leading-[1.1] tracking-tight">
            Maatwerk voor elk vertrek
          </h2>
          <p className="mt-4 max-w-2xl mx-auto font-sans text-lg text-[#8A8580] leading-relaxed">
            Van kast tot keuken, van tafel tot badkamer. Elk stuk wordt
            volledig op maat gemaakt.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="bg-[#FAFAF8] rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="h-48 bg-sand relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon size={48} className="text-[#5C3D2E]/30 group-hover:text-[#5C3D2E]/50 transition-colors duration-300" />
                  </div>
                </div>
                <div className="p-6">
                  <Icon size={24} className="text-[#5C3D2E] mb-3" />
                  <h3 className="font-sans font-semibold text-lg text-charcoal tracking-wide">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm text-[#8A8580] leading-relaxed mt-2 line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
