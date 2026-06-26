import { useLenis } from './hooks/useLenis'
import { useActiveSection } from './hooks/useActiveSection'
import Navigation from './sections/Navigation'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import ProcessSection from './sections/ProcessSection'
import WhySection from './sections/WhySection'
import ProjectsSection from './sections/ProjectsSection'
import MaterialsSection from './sections/MaterialsSection'
import TestimonialsSection from './sections/TestimonialsSection'
import ContactSection from './sections/ContactSection'
import MapSection from './sections/MapSection'
import Footer from './sections/Footer'

export default function App() {
  useLenis()
  const activeSection = useActiveSection()

  return (
    <>
      <Navigation activeSection={activeSection} />
      <HeroSection />
      <div className="relative z-10">
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <WhySection />
        <ProjectsSection />
        <MaterialsSection />
        <TestimonialsSection />
        <ContactSection />
        <MapSection />
        <Footer />
      </div>
    </>
  )
}
