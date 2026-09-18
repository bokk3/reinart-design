import { useScrollReveal } from '../hooks/useScrollReveal'
import { ArrowUpRight } from 'lucide-react'

const DISCIPLINES = [
  {
    number: '01',
    title: 'Tafels op Maat',
    category: 'Eettafels & Salontafels',
    image: '/assets/project-1.jpg',
    materials: 'Massief Eik &bull; Notelaar &bull; Essenhout &bull; Volstaal',
    description: 'Het middelpunt van de leefruimte. Eettafels en salontafels vervaardigd uit karaktervol stamhout (zoals Zoniënwoud-es) gecombineerd met unieke, handgesmede stalen onderstellen.',
    anchor: '#projecten',
  },
  {
    number: '02',
    title: 'Maatkasten & Dressings',
    category: 'Architecturaal Maatwerk',
    image: '/assets/project-5.jpg',
    materials: 'Eiken fineer &bull; Massief hout &bull; Zwart beslag',
    description: 'Vloer-tot-plafond kastenwanden, inloopdressings en serene TV-meubels die naadloos opgaan in de architectuur van de woning. Perfecte maatvoering en doordachte binnenindeling.',
    anchor: '#projecten',
  },
  {
    number: '03',
    title: 'Keukens & Interieur',
    category: 'Woon & Badkamerinterieur',
    image: '/assets/project-4.jpg',
    materials: 'Eik &bull; Donker staal &bull; Natuursteen combinaties',
    description: 'Bespoke keukens en zwevende badkamermeubels ontworpen met een eerlijke materiële dialoog. Warm, minimalistisch en behandeld voor levenslang intensief gebruik.',
    anchor: '#projecten',
  },
  {
    number: '04',
    title: 'Staal & Architectuur',
    category: 'Constructies & Onderstellen',
    image: '/assets/material-steel.jpg',
    materials: 'Warmgewalst staal &bull; Wax &amp; hitte &bull; Poederlak',
    description: 'Met de hand vervaardigde volstalen frames, deuren en constructies. Behandeld met traditionele wax en hitte om het authentieke walskarakter en de diepte van het metaal te bewaren.',
    anchor: '#projecten',
  },
]

export default function ServicesSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, start: 'top 75%' })
  const cardsRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1, children: true, start: 'top 70%' })

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="diensten" className="bg-sand section-padding relative z-10 border-b border-charcoal/5">
      <div className="container-custom">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-[#A67B5B]" />
              <span className="font-sans font-medium text-xs tracking-[0.25em] uppercase text-[#A67B5B]">
                Domeinen van vakmanschap
              </span>
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-[1.08] tracking-tight">
              Bespoke Collectie &amp; Maatwerk
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm sm:text-base text-muted-custom leading-relaxed font-light">
            Ieder project is een uniek samenspel tussen de wensen van de bewoner,
            de architectuur van de ruimte en pure ambachtelijke materialen.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {DISCIPLINES.map((discipline) => (
            <div
              key={discipline.number}
              onClick={() => scrollTo(discipline.anchor)}
              className="group bg-[#FAF8F5] border border-charcoal/10 overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 hover:border-charcoal/40 hover:shadow-lg"
            >
              <div className="aspect-[16/10] overflow-hidden relative bg-charcoal">
                <img
                  src={discipline.image}
                  alt={discipline.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/80 via-[#121110]/20 to-transparent" />
                <div className="absolute top-4 left-4 font-sans text-xs tracking-[0.25em] uppercase px-3 py-1 bg-[#121110]/80 text-[#F6F4EE] backdrop-blur-sm border border-white/10">
                  {discipline.number}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-[#F6F4EE]">
                  <div>
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C89968] block">
                      {discipline.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl mt-1 text-[#F6F4EE]">
                      {discipline.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[#F6F4EE] group-hover:text-charcoal transition-all duration-300 flex-shrink-0">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-[#FAF8F5]">
                <p className="font-sans text-sm text-graphite/80 leading-relaxed font-light">
                  {discipline.description}
                </p>
                <div className="mt-6 pt-5 border-t border-charcoal/10 flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
                  <span
                    className="text-muted-custom tracking-wider text-[11px]"
                    dangerouslySetInnerHTML={{ __html: discipline.materials }}
                  />
                  <span className="text-charcoal font-medium tracking-[0.15em] uppercase text-[10px] group-hover:text-[#A67B5B] transition-colors">
                    Realisaties bekijken &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
