import { useScrollReveal } from '../hooks/useScrollReveal'

export default function AboutSection() {
  const textRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1, children: true, start: 'top 75%' })
  const imageRef = useScrollReveal<HTMLDivElement>({ y: 40, x: 40, scale: 0.95, duration: 1, start: 'top 75%' })
  const badgeRef = useScrollReveal<HTMLDivElement>({ y: 20, delay: 0.4, start: 'top 75%' })

  return (
    <section id="over-rein" className="bg-cream section-padding relative z-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div ref={textRef} className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-sans font-medium text-xs tracking-[0.15em] uppercase text-[#A67B5B]">
              Over de vakman
            </span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-charcoal leading-[1.1] tracking-tight">
              Rein De Keyser
            </h2>

            <div className="mt-6 space-y-4">
              <p className="font-sans text-lg text-[#8A8580] leading-relaxed">
                Ik ben Rein. Meubelmaker, ontwerper en perfectionist. Al jaren
                bouw ik meubels waar mensen hun hele leven plezier van hebben.
              </p>
              <p className="font-sans text-base text-[#8A8580] leading-relaxed">
                Elk project begint met luisteren. Ik kom bij je langs, bekijk de
                ruimte, voel de sfeer en vertaal jouw wensen naar een ontwerp dat
                perfect past. Van eerste schets tot plaatsing ter plaatse — ik
                doe alles zelf.
              </p>
              <p className="font-sans text-base text-[#8A8580] leading-relaxed">
                Mijn werkplaats staat in Wilsele, vlak bij Leuven. Hier ontwerp ik
                en bouw ik elk meubelstuk met de hand. Massief hout, kwaliteitsstaal,
                en een obsessie voor detail. Dat is waar ik voor sta.
              </p>
            </div>

            <div className="mt-8">
              <p className="font-sans font-semibold text-lg text-charcoal">
                Rein De Keyser
              </p>
              <p className="font-sans font-medium text-xs tracking-[0.1em] uppercase text-[#8A8580] mt-1">
                Meubelmaker &amp; Ontwerper
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div ref={imageRef} className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/assets/about-rein.jpg"
                alt="Rein De Keyser aan het werk in zijn meubelmakerij"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            <div
              ref={badgeRef}
              className="absolute -bottom-6 -left-6 bg-[#FAFAF8] rounded-lg shadow-md p-6"
            >
              <p className="font-serif text-5xl text-[#5C3D2E] leading-none">10+</p>
              <p className="font-sans font-medium text-xs tracking-[0.1em] uppercase text-[#8A8580] mt-2">
                Jaar ervaring
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
