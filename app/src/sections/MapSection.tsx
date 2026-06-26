export default function MapSection() {
  return (
    <section className="relative z-10 w-full h-80 lg:h-96 bg-white">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2516.0!2d4.7269!3d50.9187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c1679c0b000001%3A0x0!2zQm9ybmVzdHJhYXQgMjg1LCAzMDEyIFdpbHNlbGU!5e0!3m2!1snl!2sbe!4v1"
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Rein Art Design locatie - Bornestraat 285, Wilsele"
      />
    </section>
  )
}
