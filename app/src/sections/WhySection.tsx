import { useScrollReveal } from '../hooks/useScrollReveal'
import { Ruler, User, Handshake, TreePine, Sparkles, Truck } from 'lucide-react'

const BENEFITS = [
  {
    icon: Ruler,
    title: 'Volledig maatwerk',
    description: 'Geen standaardmaten. Elk meubel wordt precies gemaakt voor jouw ruimte, jouw stijl en jouw behoeften.',
  },
  {
    icon: User,
    title: 'Persoonlijke begeleiding',
    description: 'Je werkt rechtstreeks met mij. Van eerste gesprek tot oplevering heb je één aanspreekpunt die jouw project kent.',
  },
  {
    icon: Handshake,
    title: 'Één aanspreekpunt',
    description: 'Ontwerp, productie én plaatsing — ik doe het allemaal zelf. Geen tussenpersonen, geen miscommunicatie.',
  },
  {
    icon: TreePine,
    title: 'Hoogwaardige materialen',
    description: 'Enkel het beste: massief hout van duurzame oorsprong, kwaliteitsstaal en zorgvuldig geselecteerde afwerkingen.',
  },
  {
    icon: Sparkles,
    title: 'Perfecte afwerking',
    description: 'Elke rand, elk oppervlak, elke verbinding wordt tot in het kleinste detail afgewerkt. Dat is waar ik voor sta.',
  },
  {
    icon: Truck,
    title: 'Plaatsing inbegrepen',
    description: 'Ik plaats alles zelf ter plaatse en werk af tot de laatste schroef. Jij hoeft niets te regelen.',
  },
]

export default function WhySection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, start: 'top 75%' })
  const cardsRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.1, children: true, start: 'top 70%' })

  return (
    <section id="waarom-rein" className="bg-cream section-padding relative z-10">
      <div className="container-custom">
        <div ref={headerRef} className="text-center mb-20">
          <span className="font-sans font-medium text-xs tracking-[0.15em] uppercase text-[#A67B5B]">
            Waarom Rein Art Design
          </span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-charcoal leading-[1.1] tracking-tight">
            Vakmanschap dat je voelt
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div key={benefit.title} className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#5C3D2E]" />
                </div>
                <h3 className="font-sans font-semibold text-lg text-charcoal tracking-wide">
                  {benefit.title}
                </h3>
                <p className="font-sans text-sm text-[#8A8580] leading-relaxed mt-2">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
