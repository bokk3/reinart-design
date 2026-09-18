export default function MapSection() {
  return (
    <section className="relative z-10 w-full bg-[#121110] border-b border-white/10">
      <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans tracking-[0.2em] uppercase text-[#F6F4EE]/60">
        <span>Atelier Locatie &bull; Wilsele</span>
        <span className="text-[#C89968]">Bornestraat 285, 3012 Wilsele &bull; Vlaams-Brabant</span>
      </div>
      <div className="w-full h-80 lg:h-96 relative bg-charcoal overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2516.0!2d4.7269!3d50.9187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c1679c0b000001%3A0x0!2zQm9ybmVzdHJhYXQgMjg1LCAzMDEyIFdpbHNlbGU!5e0!3m2!1snl!2sbe!4v1"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(1.2)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Rein Art Design locatie - Bornestraat 285, Wilsele"
        />
      </div>
    </section>
  )
}
