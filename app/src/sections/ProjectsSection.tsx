import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { X, ArrowRight, ChevronLeft, ChevronRight, Images } from 'lucide-react'

export interface ProjectItem {
  id: string | number
  title: string
  category: string
  coverImage: string
  images: string[]
  description: string
}

const STATIC_PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: 'Tafel Es — Zoniënwoud',
    category: 'Tafels',
    coverImage: '/assets/project-1.jpg',
    images: ['/assets/project-1.jpg'],
    description: 'Essenhouten tafel met onderstel uit volstalen buizen. Hout uit het Zoniënwoud uit 1 boomstam. Twee delen in spiegelbeeld opengevouwen.',
  },
  {
    id: 2,
    title: 'Salontafel Zebrano',
    category: 'Tafels',
    coverImage: '/assets/project-2.jpg',
    images: ['/assets/project-2.jpg'],
    description: 'Ovale salontafel met Zebrano blad. Vol stalen gebogen onderstel behandeld met wax en hitte om het karakter van het staal te bewaren.',
  },
  {
    id: 3,
    title: 'Bed Frame Notelaar',
    category: 'Interieur',
    coverImage: '/assets/project-3.jpg',
    images: ['/assets/project-3.jpg'],
    description: 'Frame gemaakt uit stalen onderdelen gecombineerd met notelaar. Volledig demonteerbaar en op maat van de matras.',
  },
  {
    id: 4,
    title: 'Keuken Eik & Staal',
    category: 'Interieur',
    coverImage: '/assets/project-4.jpg',
    images: ['/assets/project-4.jpg'],
    description: 'Bespoke kitchen met massief eiken werkbladen, matte zwarte stalen open planken en witte kasten. Warm, functioneel Belgisch design.',
  },
  {
    id: 5,
    title: 'Dressing op Maat',
    category: 'Kasten',
    coverImage: '/assets/project-5.jpg',
    images: ['/assets/project-5.jpg'],
    description: 'Inloopdressing met vloer-tot-plafond ingebouwde kasten in warm eik. Geïntegreerde LED-verlichting en een centraal eiland.',
  },
  {
    id: 6,
    title: 'TV-meubel Walnoot',
    category: 'Kasten',
    coverImage: '/assets/project-6.jpg',
    images: ['/assets/project-6.jpg'],
    description: 'Strak mediameubel in donkere walnoot dat de volle breedte van de woonkamer beslaat. Met push-to-open laden en geïntegreerde verlichting.',
  },
  {
    id: 7,
    title: 'Badkamermeubel Es',
    category: 'Interieur',
    coverImage: '/assets/project-8.jpg',
    images: ['/assets/project-8.jpg'],
    description: 'Zwevend badkamermeubel in licht essenhout met witte keramische waskom en messing kraan. Spa-achtige, serene sfeer.',
  },
]

export default function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectItem[]>(STATIC_PROJECTS)
  const [categories, setCategories] = useState<string[]>(['Tafels', 'Kasten', 'Interieur'])
  const [activeFilter, setActiveFilter] = useState('Alles')
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [driveMode, setDriveMode] = useState<'local' | 'google'>('local')

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, start: 'top 75%' })
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 50, stagger: 0.12, children: true, start: 'top 75%' })

  useEffect(() => {
    let isMounted = true

    async function loadDriveProjects() {
      try {
        const res = await fetch('/api/projects')
        if (!res.ok) return
        const data = await res.json()
        if (isMounted && data.projects && data.projects.length > 0) {
          setProjects(data.projects)
          if (data.categories && data.categories.length > 0) {
            setCategories(data.categories)
          }
          if (data.mode) {
            setDriveMode(data.mode)
          }
        }
      } catch {
        // Fall back gracefully to static projects if API is unreachable
      }
    }

    loadDriveProjects()
    return () => {
      isMounted = false
    }
  }, [])

  const filtered = activeFilter === 'Alles'
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase())

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxProject])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxProject) return
      if (e.key === 'Escape') setLightboxProject(null)
      if (e.key === 'ArrowRight' && lightboxProject.images.length > 1) {
        setLightboxIndex((prev) => (prev + 1) % lightboxProject.images.length)
      }
      if (e.key === 'ArrowLeft' && lightboxProject.images.length > 1) {
        setLightboxIndex((prev) => (prev - 1 + lightboxProject.images.length) % lightboxProject.images.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxProject])

  const openLightbox = (project: ProjectItem) => {
    setLightboxProject(project)
    setLightboxIndex(0)
  }

  const allFilters = ['Alles', ...categories]

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
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-custom/70 pl-2">
                &bull; {driveMode === 'google' ? 'Google Drive Live' : 'Test-Drive Modus'}
              </span>
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-[1.08] tracking-tight">
              Geselecteerde Werken
            </h2>
          </div>

          <div className="flex gap-1.5 flex-wrap border border-charcoal/15 p-1 bg-[#FAF8F5]">
            {allFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-sans font-medium text-xs tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 ${
                  activeFilter.toLowerCase() === filter.toLowerCase()
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
              onClick={() => openLightbox(project)}
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-charcoal">
                <img
                  src={project.coverImage || project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="font-sans text-[10px] tracking-[0.25em] uppercase px-3 py-1 bg-[#121110]/75 text-[#F6F4EE] backdrop-blur-sm border border-white/10">
                    {project.category}
                  </span>
                  {project.images && project.images.length > 1 && (
                    <span className="flex items-center gap-1 font-sans text-[10px] px-2 py-1 bg-[#121110]/75 text-[#C89968] backdrop-blur-sm border border-white/10">
                      <Images size={12} />
                      <span>{project.images.length}</span>
                    </span>
                  )}
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
          className="fixed inset-0 z-[70] bg-[#121110]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-12 animate-fadeIn"
          onClick={() => setLightboxProject(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 text-[#F6F4EE]/70 hover:text-white hover:border-white flex items-center justify-center transition-colors z-20"
            onClick={() => setLightboxProject(null)}
            aria-label="Sluiten"
          >
            <X size={22} />
          </button>

          <div
            className="max-w-4xl w-full bg-[#1E1D1B] border border-white/15 p-6 sm:p-8 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden bg-black aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
              <img
                src={lightboxProject.images[lightboxIndex] || lightboxProject.coverImage}
                alt={`${lightboxProject.title} foto ${lightboxIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Multi-image navigation arrows */}
              {lightboxProject.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxIndex((prev) => (prev - 1 + lightboxProject.images.length) % lightboxProject.images.length)
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20"
                    aria-label="Vorige foto"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxIndex((prev) => (prev + 1) % lightboxProject.images.length)
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20"
                    aria-label="Volgende foto"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-black/70 rounded-full text-[10px] font-sans text-white/80 tracking-wider">
                    <span>{lightboxIndex + 1} / {lightboxProject.images.length}</span>
                  </div>
                </>
              )}
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
