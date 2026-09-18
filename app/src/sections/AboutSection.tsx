import { useScrollReveal } from '../hooks/useScrollReveal'

export default function AboutSection() {
  const textRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1, children: true, start: 'top 75%' })
  const imageRef = useScrollReveal<HTMLDivElement>({ y: 40, x: 40, scale: 0.95, duration: 1, start: 'top 75%' })
  const badgeRef = useScrollReveal<HTMLDivElement>({ y: 20, delay: 0.4, start: 'top 75%' })

  return (
    <section id="over-rein" className="bg-cream section-padding relative z-10 border-b border-charcoal/5">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div ref={textRef} className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-[#A67B5B]" />
              <span className="font-sans font-medium text-xs tracking-[0.25em] uppercase text-[#A67B5B]">
                Over de vakman &amp; atelier
              </span>
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-[1.08] tracking-tight">
              Rein De Keyser
            </h2>

            <div className="mt-8 space-y-5 text-graphite font-sans text-base sm:text-lg leading-relaxed font-light">
              <p className="text-xl text-charcoal font-serif italic">
                &ldquo;Wij maken meubels die afgestemd zijn op mensen die ze dagdagelijks gebruiken.
                Eerlijke materialen, ontworpen om generaties mee te gaan.&rdquo;
              </p>
              <p>
                Elk project begint met luisteren. Ik kom ter plaatse bij je langs, analyseer de
                lichtinval, proporties en atmosfeer van de ruimte en vertaal jouw visie naar een doordacht architecturaal ontwerp.
              </p>
              <p>
                In mijn atelier te Wilsele bouw ik elk meubelstuk eigenhandig. Van het selecteren van massief Zoniënwoud-essen
                en Frans eiken tot het lassen en behandelen van volstaal met hitte en natuurlijke wassen. Eén aanspreekpunt,
                zonder tussenpersonen.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-charcoal/10 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-muted-custom">Locatie</span>
                <span className="block font-serif text-lg text-charcoal mt-1">Wilsele (Leuven)</span>
                <span className="block font-sans text-xs text-muted-custom">Eigen atelier &amp; werkplaats</span>
              </div>
              <div>
                <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-muted-custom">Kernmaterialen</span>
                <span className="block font-serif text-lg text-charcoal mt-1">Hout &amp; Staal</span>
                <span className="block font-sans text-xs text-muted-custom">Duurzaam massief &amp; volstaal</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-muted-custom">Garantie</span>
                <span className="block font-serif text-lg text-charcoal mt-1">Levenslang</span>
                <span className="block font-sans text-xs text-muted-custom">Plaatsing eigenhandig</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div ref={imageRef} className="relative overflow-hidden border border-charcoal/10 bg-sand">
              <img
                src="/assets/about-rein.jpg"
                alt="Rein De Keyser aan het werk in zijn meubelmakerij"
                className="w-full h-auto object-cover grayscale-[15%] contrast-[1.05]"
                loading="lazy"
              />
              <div className="p-4 bg-sand border-t border-charcoal/10 flex justify-between items-center text-[10px] font-sans tracking-[0.2em] uppercase text-muted-custom">
                <span>Rein De Keyser</span>
                <span>Atelier Wilsele</span>
              </div>
            </div>

            <div
              ref={badgeRef}
              className="mt-6 sm:mt-0 sm:absolute sm:-bottom-8 sm:-left-8 bg-[#FAF8F5] border border-charcoal/10 p-6 sm:max-w-xs shadow-sm"
            >
              <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-[#A67B5B] font-medium">
                Atelier Filosofie
              </span>
              <p className="font-serif text-base text-charcoal mt-2 italic leading-snug">
                &ldquo;Geen serieproductie. Elk stuk is een uniek object op maat van jouw leven.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
