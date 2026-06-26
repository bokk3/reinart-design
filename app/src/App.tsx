import { useLenis } from './hooks/useLenis'
import { useActiveSection } from './hooks/useActiveSection'
import Navigation from './sections/Navigation'
import HeroSection from './sections/HeroSection'
import ProjectsSection from './sections/ProjectsSection'
import AboutSection from './sections/AboutSection'
import ProcessSection from './sections/ProcessSection'
import MaterialsSection from './sections/MaterialsSection'
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
        <ProjectsSection />
        <AboutSection />
        <ProcessSection />
        <MaterialsSection />
        <ContactSection />
        <MapSection />
        <Footer />
      </div>
    </>
  )
}
