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
    <section id="projecten" className="bg-sand section-padding relative z-10">
      <div className="container-custom">
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-16 gap-6">
          <div>
            <span className="font-sans font-medium text-sm tracking-[0.15em] uppercase text-[#A67B5B]">
              Realisaties
            </span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-charcoal leading-[1.1] tracking-tight">
              Projecten
            </h2>
          </div>

          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-sans font-medium text-sm px-5 py-2 rounded-full border transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-charcoal text-[#F7F5F0] border-charcoal'
                    : 'bg-transparent text-[#8A8580] border-[#D4CFC8] hover:border-charcoal'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, idx) => (
            <div
              key={project.id}
              className={`relative rounded-lg overflow-hidden shadow-sm group cursor-pointer ${
                idx === 0 || idx === 3 ? 'md:col-span-2 lg:col-span-1' : ''
              } ${idx === 3 ? 'md:col-span-2' : ''}`}
              onClick={() => setLightboxProject(project)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="font-sans font-medium text-sm tracking-[0.1em] uppercase text-[#F7F5F0]/80">
                  {project.category}
                </span>
                <h3 className="font-sans font-semibold text-lg text-[#F7F5F0] mt-1 flex items-center gap-2">
                  {project.title}
                  <ArrowRight size={16} className="text-[#F7F5F0]" />
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxProject && (
        <div
          className="fixed inset-0 z-[70] bg-[#1A1A1A]/95 flex items-center justify-center p-6 lg:p-12"
          onClick={() => setLightboxProject(null)}
        >
          <button
            className="absolute top-6 right-6 text-[#F7F5F0]/70 hover:text-[#F7F5F0] transition-colors"
            onClick={() => setLightboxProject(null)}
            aria-label="Sluiten"
          >
            <X size={32} />
          </button>

          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxProject.image}
              alt={lightboxProject.title}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
            <div className="mt-6">
              <span className="font-sans font-medium text-sm tracking-[0.1em] uppercase text-[#A67B5B]">
                {lightboxProject.category}
              </span>
              <h3 className="font-serif text-2xl text-[#F7F5F0] mt-2">
                {lightboxProject.title}
              </h3>
              <p className="font-sans text-base text-[#F7F5F0]/85 mt-2 leading-relaxed">
                {lightboxProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
