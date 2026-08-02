import React, { useEffect, useState } from 'react';
import { LiquidGlass } from '@ybouane/liquidglass';
import { ParticleBackground } from './components/ParticleBackground';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SkillsGrid } from './components/SkillsGrid';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ContactSection } from './components/ContactSection';

export const App: React.FC = () => {
  const [lgInstance, setLgInstance] = useState<LiquidGlass | null>(null);

  useEffect(() => {
    // Initialize @ybouane/liquidglass library over all glass slab elements
    let instanceRef: LiquidGlass | null = null;

    const timer = setTimeout(() => {
      const root = document.getElementById('root');
      const glassEls = document.querySelectorAll<HTMLElement>('.liquid-glass-element');

      if (root && glassEls.length > 0) {
        LiquidGlass.init({
          root: root,
          glassElements: Array.from(glassEls),
          defaults: {
            blurAmount: 0.6,
            refraction: 1.5,
            chromAberration: 1.0,
            fresnel: 0.85,
            specular: 0.9,
            edgeHighlight: 0.85,
            shadowOpacity: 0.5,
            floating: true,
          },
        })
          .then((inst) => {
            instanceRef = inst;
            setLgInstance(inst);
            console.log('LiquidGlass rendering pipeline initialized successfully.');
          })
          .catch((err) => {
            console.warn('LiquidGlass initialization notice:', err);
          });
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      if (instanceRef) {
        instanceRef.destroy();
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Dynamic Animated Particle & Technical Schematic Background */}
      <ParticleBackground />

      {/* Main Content Area */}
      <div className="relative z-10">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <HeroSection
          onExploreClick={() => scrollToSection('projects')}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* Skills Grid Section */}
        <SkillsGrid />

        {/* Projects Showcase Section */}
        <ProjectsShowcase />

        {/* Get in Touch / Contact Modal Section */}
        <ContactSection liquidGlassInstance={lgInstance} />
      </div>
    </div>
  );
};

export default App;
