# Rein Art Design — Technische Specificatie

## Dependencies

### Core
| Package | Versie | Doel |
|---------|--------|------|
| `react` | ^19.0.0 | UI framework |
| `react-dom` | ^19.0.0 | DOM rendering |
| `typescript` | ^5.7.0 | Type safety |
| `vite` | ^6.0.0 | Build tool |
| `@vitejs/plugin-react` | ^4.4.0 | Vite React plugin |

### Styling
| Package | Versie | Doel |
|---------|--------|------|
| `tailwindcss` | ^4.0.0 | Utility-first CSS |
| `@tailwindcss/vite` | ^4.0.0 | Tailwind Vite integratie |
| `clsx` | ^2.1.0 | Conditionele classnames |
| `tailwind-merge` | ^3.0.0 | Tailwind class conflict resolving |

### Animatie
| Package | Versie | Doel |
|---------|--------|------|
| `gsap` | ^3.12.0 | Animatie engine + ScrollTrigger plugin |
| `lenis` | ^1.2.0 | Smooth scroll |

### UI
| Package | Versie | Doel |
|---------|--------|------|
| `lucide-react` | ^0.470.0 | Iconen (Cabinet, Table, Shirt, ChefHat, Tv, Bath, Hammer, Layers, Home, Ruler, User, Handshake, TreePine, Sparkles, Truck, MapPin, Phone, Mail, Globe, Instagram, ArrowRight, ChevronLeft, ChevronRight, Menu, X, Quote) |

### Fonts
Playfair Display (400, 500, 600) en Plus Jakarta Sans (400, 500, 600, 700) geladen via Google Fonts `<link>` in `index.html` met `font-display: swap`.

### Dev Dependencies
| Package | Versie | Doel |
|---------|--------|------|
| `@types/react` | ^19.0.0 | React type definitions |
| `@types/react-dom` | ^19.0.0 | ReactDOM type definitions |

---

## Component Inventaris

### Layout
| Component | Bron | Hergebruik | Beschrijving |
|-----------|------|------------|--------------|
| `Navigation` | Custom | Single | Fixed top bar met transparant→blur overgang, mobile hamburger menu, active section tracking |
| `Footer` | Custom | Single | Minimale footer met nav, contact, socials, copyright |

### Sections
| Component | Bron | Beschrijving |
|-----------|------|-------------|
| `HeroSection` | Custom | Full-viewport fixed hero met parallax, gestackte entrance animatie |
| `AboutSection` | Custom | Asymmetrische twee-koloms layout met ervaring badge |
| `ServicesSection` | Custom | 3-koloms grid met 9 service cards |
| `ProcessSection` | Custom | Donkere sectie met verticale tijdlijn (6 stappen) |
| `WhySection` | Custom | Voordelen in 3-koloms grid (6 items) |
| `ProjectsSection` | Custom | Masonry grid met 8 project cards + filter tabs + lightbox modal |
| `MaterialsSection` | Custom | 4-koloms grid met 8 material cards |
| `TestimonialsSection` | Custom | Carousel met 4 testimonials, dot navigatie |
| `ContactSection` | Custom | Twee-koloms: contact info + formulier |
| `MapSection` | Custom | Google Maps iframe (grayscale) |

### Herbruikbare Componenten
| Component | Bron | Gebruikt door | Beschrijving |
|-----------|------|---------------|-------------|
| `SectionHeader` | Custom | Alle sections | Eyebrow + Headline + optionele subtext patroon |
| `ServiceCard` | Custom | ServicesSection | Card met afbeelding, icoon, titel, beschrijving |
| `ProjectCard` | Custom | ProjectsSection | Card met hover overlay, lightbox trigger |
| `MaterialCard` | Custom | MaterialsSection | Aspect-ratio card met gradient overlay |
| `BenefitItem` | Custom | WhySection | Icoon + titel + beschrijving |
| `ProcessStep` | Custom | ProcessSection | Alternating layout tijdlijn stap |
| `ContactItem` | Custom | ContactSection | Icoon + label + waarde |
| `TestimonialSlide` | Custom | TestimonialsSection | Quote + auteur |
| `Lightbox` | Custom | ProjectsSection | Modal overlay voor project afbeeldingen |

### Hooks
| Hook | Doel |
|------|------|
| `useScrollReveal` | GSAP ScrollTrigger wrapper voor section entrance animaties |
| `useActiveSection` | IntersectionObserver voor nav active state tracking |
| `useLenis` | Lenis smooth scroll initialisatie en cleanup |

---

## Animatie Implementatie Plan

| Animatie | Library | Implementatie | Complexiteit |
|----------|---------|---------------|--------------|
| Hero entrance sequence (8-staps gestaggerd) | GSAP timeline | `gsap.timeline()` met `.from()` calls, delays en staggers. Wordt getriggerd on mount. | **High** |
| Hero parallax (scale + overlay) | GSAP ScrollTrigger | `ScrollTrigger.create()` met scrub, animeren van `backgroundScale` (1.0→1.05) en `overlayOpacity` op scroll | **Medium** |
| Nav background overgang | GSAP ScrollTrigger | ScrollTrigger op hero bottom, toggle class voor blur/achtergrond. Aparte trigger voor text kleurwissel. | **Medium** |
| Section scroll reveals | GSAP ScrollTrigger | `useScrollReveal` hook — `gsap.from()` met `scrollTrigger: { trigger, start: "top 75%", once: true }`. Batch voor card grids. | **Low** |
| About content stagger | GSAP ScrollTrigger | `gsap.from()` met stagger op left column elementen, aparte `from()` voor right image met translateX+scale | **Low** |
| Process tijdlijn lijn-tekening | GSAP ScrollTrigger | `gsap.fromTo()` met `scaleY: 0→1`, `transformOrigin: "top"`, `scrub: true` op de center lijn | **Medium** |
| Process step reveals | GSAP ScrollTrigger | Per step: nummer fade, title+description translateX (±30px), dot scale 0→1. Stagger binnen step. | **Medium** |
| Testimonial carousel | GSAP | `gsap.timeline()` voor fade-out (opacity+translateX) → swap content → fade-in | **Medium** |
| Card hover effects | CSS | `group-hover:` utilities voor scale, overlay opacity, content translateY. `transition` utility. | **Low** |
| Button hover effects | CSS | `hover:` utilities voor translateY, kleur, shadow. `transition` utility. | **Low** |
| Smooth scrolling | Lenis | `useLenis` hook — initialiseert Lenis met `lerp: 0.1`, koppelt aan GSAP ticker | **Low** |
| Mobile menu overlay | GSAP | `gsap.fromTo()` voor fade in/out van full-screen overlay | **Low** |
| Scroll indicator pulse | CSS | `animate-pulse` of custom keyframe animatie | **Low** |

### GSAP Plugin Registratie
`ScrollTrigger` moet geregistreerd worden via `gsap.registerPlugin(ScrollTrigger)` in de entry point. Lenis wordt gekoppeld aan GSAP's ticker voor synchronisatie.

### Batch Strategy
Voor card grids (Services, Projects, Materials, Benefits) wordt GSAP's `ScrollTrigger.batch()` gebruikt om het aantal scroll triggers te minimaliseren en performance te optimaliseren.

---

## State & Logic Plan

### Active Section Tracking
`useActiveSection` hook gebruikt `IntersectionObserver` met `threshold: 0.3` om de huidig zichtbare sectie te detecteren. De sectie ID wordt opgeslagen in React state en doorgegeven aan Navigation voor active link highlighting.

### Project Filter
Lokale React state (`useState`) in `ProjectsSection` houdt het actieve filter bij ("Alles" | "Tafels" | "Kasten" | "Interieur"). Cards worden gefilterd met een eenvoudige array filter; animatie bij filterwissel via GSAP `gsap.fromTo()` op de grid.

### Testimonial Carousel
Lokale React state (`useState`) houdt de huidige index bij. Navigatie via prev/next buttons en dot indicators. Transitie geanimeerd met GSAP timeline (fade out → content swap → fade in).

### Lightbox Modal
Lokale React state (`useState`) beheert open/closed state en geselecteerd project. `useEffect` voor Escape-toets listener en body scroll lock. Overlay click om te sluiten.

### Contact Form
Lokale React state (`useState`) voor form velden. `onSubmit` handler met `FormData`. Geen backend — formulier toont een bevestigingsmelding (succes state).

### Reduced Motion
Alle GSAP animaties checken `window.matchMedia('(prefers-reduced-motion: reduce)')` en worden overgeslagen of vereenvoudigd indien actief. CSS transities worden gerespecteerd via `@media (prefers-reduced-motion: reduce)`.

---

## Overige Architectuur Beslissingen

### Single Page Architecture
De website is een single-page application met 10 scroll sections. Geen routing nodig. Nav links gebruiken smooth scroll naar sectie anchors (`#realisaties`, `#over-rein`, etc.).

### Hero Fixed Position Strategy
De Hero section is `position: fixed` met `z-index: 0`. Een lege spacer div van 100vh hoogte zorgt ervoor dat de page content correct over de hero heen scrollt. De hero parallax wordt via GSAP ScrollTrigger geregeld, niet via native scroll.

### Image Preloading
De hero achtergrondafbeelding wordt preloaded via `<link rel="preload">` in `index.html`. Overige afbeeldingen gebruiken native lazy loading (`loading="lazy"`) met `srcset` voor responsive sizing.

### Google Maps
Een simpele `<iframe>` embed met grayscale CSS filter. Geen Google Maps API key nodig voor een statische embed.

### Tailwind Configuratie
Custom design tokens worden gemapt naar Tailwind CSS via `@theme` in de CSS file:
- Kleuren onder `color-*` namen
- Fonts onder `font-*` namen  
- Spacing wordt gedefinieerd als custom utilities
- Border radius onder `radius-*` namen
- Shadows onder `shadow-*` namen
