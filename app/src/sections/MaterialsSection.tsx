import { useScrollReveal } from '../hooks/useScrollReveal'

const SIGNATURE_MATERIALS = [
  {
    name: 'Massief Eikenhout',
    origin: 'Quercus &bull; Lokaal &amp; Frans Eik',
    finish: 'Natuurlijke Olie / Matte Lak',
    image: '/assets/material-oak.jpg',
    description: 'Beroemd om zijn uitzonderlijke sterkte en karaktervolle vlamtekening. Een tijdloze klassieker die door de jaren heen alleen maar aan patine en diepte wint.',
  },
  {
    name: 'Europees Notelaar',
    origin: 'Juglans &bull; Geselecteerd Stamhout',
    finish: 'Zijdezachte Olieafwerking',
    image: '/assets/material-walnut.jpg',
    description: 'Warme, diepe chocoladetinten met een uiterst verfijnde nerf. Een exclusieve houtsoort die luxe en serene rust brengt in elk architecturaal vertrek.',
  },
  {
    name: 'Zoniënwoud Essenhout',
    origin: 'Fraxinus &bull; Belgisch Stamhout',
    finish: 'Boekgematcht &amp; Hittebehandeld',
    image: '/assets/project-1.jpg',
    description: 'Licht van toon met een expressieve, levendige tekening. Twee delen uit één boomstam worden in spiegelbeeld opengevouwen voor een natuurlijk kunstwerk.',
  },
  {
    name: 'Warmgewalst Staal',
    origin: 'Volstaal &bull; Handgelast te Wilsele',
    finish: 'Traditionele Wax- &amp; Hittepatine',
    image: '/assets/material-steel.jpg',
    description: 'Geen steriele poederlak waar de ziel uit is gehaald, maar puur staal behandeld met vlam en natuurlijke wassen. De blauwzwarte walshuid blijft zichtbaar en voelbaar.',
  },
  {
    name: 'Draadglas & Messing',
    origin: 'Architecturaal &bull; Industrieel Glas',
    finish: 'Geconditioneerd &bull; Handgeborsteld',
    image: '/assets/project-2.jpg',
    description: 'Voor verfijnde contrasten: industrieel gewapend draadglas en handgeborsteld messing die warmte toevoegen aan stalen onderstellen en bijzettafels.',
  },
]

export default function MaterialsSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, start: 'top 75%' })
  const cardsRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1, children: true, start: 'top 70%' })

  return (
    <section id="materialen" className="bg-cream section-padding relative z-10 border-b border-charcoal/5">
      <div className="container-custom">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-[#A67B5B]" />
              <span className="font-sans font-medium text-xs tracking-[0.25em] uppercase text-[#A67B5B]">
                Materiaalkunde &amp; Selectie
              </span>
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-[1.08] tracking-tight">
              Eerlijke, Tastbare Grondstoffen
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm sm:text-base text-muted-custom leading-relaxed font-light">
            De ziel van elk meubelstuk schuilt in de materie. Wij selecteren stamhout en staal
            van de hoogste kwaliteit, bewerkt met respect voor de natuurlijke structuur.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SIGNATURE_MATERIALS.map((material, idx) => (
            <div
              key={material.name}
              className={`group bg-[#FAF8F5] border border-charcoal/10 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-charcoal/40 hover:shadow-lg ${
                idx === 3 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-charcoal">
                <img
                  src={material.image}
                  alt={material.name}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 font-sans text-[10px] tracking-[0.25em] uppercase px-3 py-1 bg-[#121110]/75 text-[#F6F4EE] backdrop-blur-sm border border-white/10">
                  Materiaal 0{idx + 1}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span
                    className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C89968] block"
                    dangerouslySetInnerHTML={{ __html: material.origin }}
                  />
                  <h3 className="font-serif text-2xl text-[#F6F4EE] mt-1">
                    {material.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 bg-[#FAF8F5] flex flex-col justify-between flex-1">
                <p className="font-sans text-xs text-graphite/80 leading-relaxed font-light">
                  {material.description}
                </p>
                <div className="mt-5 pt-4 border-t border-charcoal/10 flex items-center justify-between text-[11px] font-sans tracking-wider text-muted-custom">
                  <span className="uppercase text-[10px]">Afwerking:</span>
                  <span className="text-charcoal font-medium text-[11px]">{material.finish}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
