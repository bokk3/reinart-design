import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { X, ArrowRight } from 'lucide-react'

const FILTERS = ['Alles', 'Tafels', 'Kasten', 'Interieur']

const PROJECTS = [
  { id: 1, title: 'Tafel Es — Zoniënwoud', category: 'Tafels', image: '/assets/project-1.jpg', description: 'Essenhouten tafel met onderstel uit volstalen buizen. Hout uit het Zoniënwoud uit 1 boomstam. Twee delen in spiegelbeeld opengevouwen.' },
  { id: 2, title: 'Salontafel Zebrano', category: 'Tafels', image: '/assets/project-2.jpg', description: 'Ovale salontafel met Zebrano blad. Vol stalen gebogen onderstel behandeld met wax en hitte om het karakter van het staal te bewaren.' },
  { id: 3, title: 'Bed Frame Notelaar', category: 'Interieur', image: '/assets/project-3.jpg', description: 'Frame gemaakt uit stalen onderdelen gecombineerd met notelaar. Volledig demonteerbaar en op maat van de matras.' },
  { id: 4, title: 'Keuken Eik & Staal', category: 'Interieur', image: '/assets/project-4.jpg', description: 'Bespoke kitchen met massief eiken werkbladen, matte zwarte stalen open planken en witte kasten. Warm, functioneel Belgisch design.' },
  { id: 5, title: 'Dressing op Maat', category: 'Kasten', image: '/assets/project-5.jpg', description: 'Inloopdressing met vloer-tot-plafond ingebouwde kasten in warm eik. Geïntegreerde LED-verlichting en een centraal eiland.' },
  { id: 6, title: 'TV-meubel Walnoot', category: 'Kasten', image: '/assets/project-6.jpg', description: 'Strak mediameubel in donkere walnoot dat de volle breedte van de woonkamer beslaat. Met push-to-open laden en geïntegreerde verlichting.' },
  { id: 7, title: 'Bijzettafels Thelma', category: 'Tafels', image: '/assets/project-2.jpg', description: 'Combinatie van 3 tafels met zwart gepoederlakt onderstel. Essenhouten tafel met bijzettafels van draadglas en staal.' },
  { id: 8, title: 'Badkamermeubel Es', category: 'Interieur', image: '/assets/project-8.jpg', description: 'Zwevend badkamermeubel in licht essenhout met witte keramische waskom en messing kraan. Spa-achtige, serene sfeer.' },
]

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('Alles')
  const [lightboxProject, setLightboxProject] = useState<typeof PROJECTS[0] | null>(null)

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, start: 'top 75%' })
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 50, stagger: 0.12, children: true, start: 'top 75%' })

  const filtered = activeFilter === 'Alles'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter)

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxProject])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxProject(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="projecten" className="bg-sand section-padding relative z-10 border-b border-charcoal/5">
      <div className="container-custom">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-[#A67B5B]" />
              <span className="font-sans font-medium text-xs tracking-[0.25em] uppercase text-[#A67B5B]">
                Portfolio Realisaties
              </span>
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-[1.08] tracking-tight">
              Geselecteerde Werken
            </h2>
          </div>

          <div className="flex gap-1.5 flex-wrap border border-charcoal/15 p-1 bg-[#FAF8F5]">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-sans font-medium text-xs tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-charcoal text-[#F6F4EE]'
                    : 'text-muted-custom hover:text-charcoal'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, idx) => (
            <div
              key={project.id}
              className={`group bg-[#FAF8F5] border border-charcoal/10 overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 hover:border-charcoal/40 hover:shadow-lg ${
                idx === 0 || idx === 3 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              onClick={() => setLightboxProject(project)}
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-charcoal">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4 font-sans text-[10px] tracking-[0.25em] uppercase px-3 py-1 bg-[#121110]/75 text-[#F6F4EE] backdrop-blur-sm border border-white/10">
                  {project.category}
                </div>
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#FAF8F5] text-charcoal opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center shadow-md">
                  <ArrowRight size={16} />
                </div>
              </div>

              <div className="p-6 bg-[#FAF8F5] flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal group-hover:text-[#A67B5B] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs text-graphite/75 leading-relaxed mt-2 line-clamp-2 font-light">
                    {project.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-charcoal/10 flex items-center justify-between text-[11px] font-sans tracking-wider text-muted-custom uppercase">
                  <span>Atelier Wilsele</span>
                  <span className="text-charcoal font-medium group-hover:text-[#A67B5B] transition-colors">
                    Bekijk detail &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Luxury Atelier Lightbox */}
      {lightboxProject && (
        <div
          className="fixed inset-0 z-[70] bg-[#121110]/95 backdrop-blur-md flex items-center justify-center p-6 lg:p-12 animate-fadeIn"
          onClick={() => setLightboxProject(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 text-[#F6F4EE]/70 hover:text-white hover:border-white flex items-center justify-center transition-colors"
            onClick={() => setLightboxProject(null)}
            aria-label="Sluiten"
          >
            <X size={22} />
          </button>

          <div
            className="max-w-4xl w-full bg-[#1E1D1B] border border-white/15 p-6 sm:p-8 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden bg-black aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
              <img
                src={lightboxProject.image}
                alt={lightboxProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="font-sans font-medium text-[11px] tracking-[0.25em] uppercase text-[#C89968]">
                  {lightboxProject.category} &bull; Atelier Wilsele
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F6F4EE] mt-1">
                  {lightboxProject.title}
                </h3>
                <p className="font-sans text-sm text-[#F6F4EE]/80 mt-3 leading-relaxed max-w-xl font-light">
                  {lightboxProject.description}
                </p>
              </div>
              <div className="pt-2 sm:pt-0 flex-shrink-0">
                <a
                  href="#contact"
                  onClick={() => setLightboxProject(null)}
                  className="font-sans text-xs tracking-[0.2em] uppercase px-6 py-3 border border-[#F6F4EE]/40 text-[#F6F4EE] hover:bg-[#F6F4EE] hover:text-[#121110] transition-colors inline-block text-center"
                >
                  Vergelijkbaar project aanvragen
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
