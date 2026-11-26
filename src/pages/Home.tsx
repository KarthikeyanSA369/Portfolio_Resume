import React from 'react';
import { AbstractGeometricBackground } from '../components/common/AbstractGeometricBackground';
import { Hero } from '../components/hero/Hero';
import { About } from '../components/about/About';
import { Skills } from '../components/skills/Skills';
import { Projects } from '../components/projects/Projects';
import { Experience } from '../components/experience/Experience';
import { Education } from '../components/education/Education';
import { Certifications } from '../components/certifications/Certifications';
import { Contact } from '../components/contact/Contact';
import { Footer } from '../components/layout/Footer';

export const Home: React.FC = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-transparent">
      {/* Global Abstract Geometric Blue Background System */}
      <AbstractGeometricBackground />

      {/* Connected Portfolio Content Sections */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </main>
  );
};
