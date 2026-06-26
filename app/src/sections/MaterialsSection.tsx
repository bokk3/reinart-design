import { useScrollReveal } from '../hooks/useScrollReveal'

const MATERIALS = [
  { name: 'Eik', description: 'Sterk, karaktervol en tijdloos. De koning onder de houtsoorten voor meubels die generaties meegaan.', image: '/assets/material-oak.jpg' },
  { name: 'Notelaar', description: 'Warm bruin met een verfijnde nerf. Luxe uitstraling die door de jaren heen alleen maar mooier wordt.', image: '/assets/material-walnut.jpg' },
  { name: 'Essenhout', description: 'Licht en fris met een subtiele tekening. Perfect voor minimalistische interieurs en Scandinavisch design.', image: '/assets/material-oak.jpg' },
  { name: 'Zwart Staal', description: 'Industrieel, sterk en tijdloos. Voor onderstellen en details die karakter toevoegen aan elk ontwerp.', image: '/assets/material-steel.jpg' },
  { name: 'Inox', description: 'Strak, modern en onderhoudsvriendelijk. Voor een eigentijdse look in keukens en badkamers.', image: '/assets/material-steel.jpg' },
  { name: 'Fineer', description: 'Natuurlijke houtlook met extra stabiliteit. Breed scala aan houtsoorten en afwerkingen mogelijk.', image: '/assets/material-oak.jpg' },
  { name: 'Massief Hout', description: 'Puur, duurzaam en uniek. Elke plank heeft zijn eigen tekening — geen enkel meubel is hetzelfde.', image: '/assets/material-walnut.jpg' },
  { name: 'Glas & Messing', description: 'Voor dat beetje extra. Terrazzo, draadglas of messing details die je meubel naar een hoger niveau tillen.', image: '/assets/material-steel.jpg' },
]

export default function MaterialsSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, start: 'top 75%' })
  const cardsRef = useScrollReveal<HTMLDivElement>({ y: 40, scale: 0.95, stagger: 0.1, children: true, start: 'top 70%' })

  return (
    <section id="materialen" className="bg-cream section-padding relative z-10">
      <div className="container-custom">
        <div ref={headerRef} className="text-center mb-20">
          <span className="font-sans font-medium text-xs tracking-[0.15em] uppercase text-[#A67B5B]">
            Materialen
          </span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-charcoal leading-[1.1] tracking-tight">
            Alleen het beste
          </h2>
          <p className="mt-4 max-w-2xl mx-auto font-sans text-lg text-[#8A8580] leading-relaxed">
            De keuze van materiaal bepaalt het karakter van je meubel. Ik werk
            uitsluitend met hoogwaardige materialen die jaren meegaan.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {MATERIALS.map((material) => (
            <div
              key={material.name}
              className="relative rounded-lg overflow-hidden aspect-[3/4] group cursor-pointer"
            >
              <img
                src={material.image}
                alt={material.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <h3 className="font-sans font-semibold text-base lg:text-lg text-[#F7F5F0] tracking-wide">
                  {material.name}
                </h3>
                <p className="font-sans text-xs lg:text-sm text-[#F7F5F0]/70 mt-1 leading-relaxed line-clamp-3">
                  {material.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
