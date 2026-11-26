import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Filter } from 'lucide-react';
import { innerOrbitLogos, middleOrbitLogos, outerOrbitLogos } from '../../data/skills';
import type { OrbitTechItem } from '../../data/skills';
import { TechLogo } from './TechLogos';
import systemWorkPhoto from '../../assets/skills/karthikeyan-system-work.jpg';

const orbitCategories = [
  'All (32)',
  'Programming Languages',
  'AI & Machine Learning',
  'Data Science & Analytics',
  'Backend & DevOps'
];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All (32)');
  const [hoveredTech, setHoveredTech] = useState<OrbitTechItem | null>(null);
  const [isOrbitPaused, setIsOrbitPaused] = useState<boolean>(false);

  // Helper to determine if a logo matches the selected filter category
  const isTechHighlighted = (tech: OrbitTechItem) => {
    if (activeCategory === 'All (32)') return true;
    if (activeCategory === 'Programming Languages') {
      return tech.category.toLowerCase().includes('programming') || tech.category.toLowerCase().includes('frontend');
    }
    if (activeCategory === 'AI & Machine Learning') {
      return tech.category.toLowerCase().includes('ai') || tech.category.toLowerCase().includes('machine') || tech.category.toLowerCase().includes('deep') || tech.category.toLowerCase().includes('vision');
    }
    if (activeCategory === 'Data Science & Analytics') {
      return tech.category.toLowerCase().includes('data') || tech.category.toLowerCase().includes('analytics');
    }
    if (activeCategory === 'Backend & DevOps') {
      return tech.category.toLowerCase().includes('backend') || tech.category.toLowerCase().includes('database') || tech.category.toLowerCase().includes('container') || tech.category.toLowerCase().includes('version') || tech.category.toLowerCase().includes('platform') || tech.category.toLowerCase().includes('environment') || tech.category.toLowerCase().includes('automation');
    }
    return true;
  };

  return (
    <section id="skills" className="pt-16 pb-10 sm:pt-20 sm:pb-12 bg-transparent relative overflow-hidden scroll-mt-20">
      
      {/* Background radial atmosphere */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#DBEAFE]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#EFF6FF]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-9"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lightBlueCard border border-cardBorder text-primaryRoyalBlue text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Ecosystem</span>
          </div>
          <h2 className="typo-section-heading mb-4">
            Skills & <span className="text-primaryRoyalBlue">Technologies</span>
          </h2>
          <p className="typo-section-subtitle max-w-2xl mx-auto">
            A comprehensive suite of programming languages, machine learning frameworks, data analytics libraries, and systems engineering tools.
          </p>
        </motion.div>

        {/* 07. Skill Category Transition: Smooth Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-8 sm:mb-9 z-20 relative">
          <span className="text-xs font-semibold text-secondaryText flex items-center gap-1.5 mr-1 hidden sm:flex">
            <Filter className="w-3.5 h-3.5 text-primaryRoyalBlue" />
            <span>Category:</span>
          </span>
          {orbitCategories.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 focus:outline-none ${
                  isSelected ? 'text-white' : 'text-secondaryText hover:text-headingNavy hover:bg-white/80'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSkillCategory"
                    className="absolute inset-0 bg-primaryRoyalBlue rounded-full shadow-xs -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{category}</span>
              </button>
            );
          })}
        </div>

        {/* PLANETARY ORBITAL VISUALIZATION: LOGOS MOVING DIRECTLY ON ORBIT PATHS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl mx-auto h-[480px] xs:h-[540px] sm:h-[620px] md:h-[650px] flex items-center justify-center select-none"
          onMouseEnter={() => setIsOrbitPaused(true)}
          onMouseLeave={() => {
            setIsOrbitPaused(false);
            setHoveredTech(null);
          }}
        >
          {/* Active Hover Tooltip floating in top corner */}
          {hoveredTech && (
            <div className="absolute top-4 z-40 px-4 py-2 rounded-2xl bg-white border border-primaryRoyalBlue shadow-card flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-150">
              <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                <TechLogo name={hoveredTech.name} size={20} className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-headingNavy leading-tight">{hoveredTech.name}</p>
                <p className="text-[10px] font-semibold text-primaryRoyalBlue">{hoveredTech.category}</p>
              </div>
            </div>
          )}

          {/* Orbital Viewport Scaler: Scales down cleanly on mobile viewports without blurry 3D texture rasterization */}
          <div className="relative z-10 w-full h-full flex items-center justify-center scale-[0.52] xs:scale-[0.70] sm:scale-[0.88] md:scale-100 transition-transform origin-center pointer-events-none crisp-render">

            {/* INNER ORBIT TRACK LINE (Radius: 152px) */}
            <div
              className="absolute w-[304px] h-[304px] rounded-full border-2 border-dashed border-primaryRoyalBlue/30 pointer-events-none"
            />

            {/* INNER ORBIT ROTATING CONTAINER (Clockwise - 14s Fast Orbit) */}
            <div
              className={`absolute w-[304px] h-[304px] rounded-full animate-orbit-inner pointer-events-none ${
                isOrbitPaused ? 'orbit-paused' : ''
              }`}
            >
              {innerOrbitLogos.map((tech, index) => {
                const count = innerOrbitLogos.length;
                const angleRad = (index * 2 * Math.PI) / count;
                const radius = 152; // pixels
                const x = Math.round(Math.cos(angleRad) * radius);
                const y = Math.round(Math.sin(angleRad) * radius);

                return (
                  <div
                    key={tech.name}
                    className="absolute left-1/2 top-1/2 -ml-6 -mt-6"
                    style={{
                      transform: `translate3d(${x}px, ${y}px, 0)`,
                    }}
                  >
                    {/* Counter-rotation keeps the logo 100% upright at all orbital angles */}
                    <div
                      className={`animate-counter-inner ${isOrbitPaused ? 'orbit-paused' : ''}`}
                    >
                      {/* Individual 2D Logo Micro-Movement: Float */}
                      <div
                        className={`logo-float-${index % 4}`}
                        style={{
                          animationDelay: `-${(index * 0.45).toFixed(2)}s`,
                        }}
                      >
                        <div
                          onMouseEnter={() => setHoveredTech(tech)}
                          className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white shadow-card border flex items-center justify-center p-2.5 transition-all duration-300 hover:scale-120 hover:shadow-[0_0_20px_rgba(23,99,232,0.45)] hover:border-primaryRoyalBlue cursor-pointer select-none group relative pointer-events-auto ${
                            isTechHighlighted(tech)
                              ? 'border-cardBorder/90 opacity-100 scale-100'
                              : 'border-cardBorder/40 opacity-30 scale-90'
                          }`}
                        >
                          <TechLogo name={tech.name} size={26} className="w-full h-full object-contain" />
                          
                          {/* Tooltip on individual logo hover (06. Interactive Orbit Tooltip) */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-headingNavy text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-all duration-200 shadow-md z-40 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
                            <span>{tech.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MIDDLE ORBIT TRACK LINE (Radius: 222px) */}
            <div
              className="absolute w-[444px] h-[444px] rounded-full border-2 border-dashed border-primaryRoyalBlue/25 pointer-events-none"
            />

            {/* MIDDLE ORBIT ROTATING CONTAINER (Counter-Clockwise - 22s Fast Orbit) */}
            <div
              className={`absolute w-[444px] h-[444px] rounded-full animate-orbit-middle pointer-events-none ${
                isOrbitPaused ? 'orbit-paused' : ''
              }`}
            >
              {middleOrbitLogos.map((tech, index) => {
                const count = middleOrbitLogos.length;
                const angleRad = (index * 2 * Math.PI) / count;
                const radius = 222; // pixels
                const x = Math.round(Math.cos(angleRad) * radius);
                const y = Math.round(Math.sin(angleRad) * radius);

                return (
                  <div
                    key={tech.name}
                    className="absolute left-1/2 top-1/2 -ml-6 -mt-6"
                    style={{
                      transform: `translate3d(${x}px, ${y}px, 0)`,
                    }}
                  >
                    {/* Counter-rotation keeps the logo 100% upright at all orbital angles */}
                    <div
                      className={`animate-counter-middle ${isOrbitPaused ? 'orbit-paused' : ''}`}
                    >
                      {/* Individual 2D Logo Micro-Movement: Float */}
                      <div
                        className={`logo-float-${(index + 1) % 4}`}
                        style={{
                          animationDelay: `-${(index * 0.38).toFixed(2)}s`,
                        }}
                      >
                        <div
                          onMouseEnter={() => setHoveredTech(tech)}
                          className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white shadow-card border flex items-center justify-center p-2.5 transition-all duration-300 hover:scale-120 hover:shadow-[0_0_20px_rgba(23,99,232,0.45)] hover:border-primaryRoyalBlue cursor-pointer select-none group relative pointer-events-auto ${
                            isTechHighlighted(tech)
                              ? 'border-cardBorder/90 opacity-100 scale-100'
                              : 'border-cardBorder/40 opacity-30 scale-90'
                          }`}
                        >
                          <TechLogo name={tech.name} size={26} className="w-full h-full object-contain" />
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-headingNavy text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-all duration-200 shadow-md z-40 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
                            <span>{tech.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* OUTER ORBIT TRACK LINE (Radius: 298px) */}
            <div
              className="absolute w-[596px] h-[596px] rounded-full border-2 border-dashed border-primaryRoyalBlue/20 pointer-events-none"
            />

            {/* OUTER ORBIT ROTATING CONTAINER (Clockwise - 30s Fast Orbit) */}
            <div
              className={`absolute w-[596px] h-[596px] rounded-full animate-orbit-outer pointer-events-none ${
                isOrbitPaused ? 'orbit-paused' : ''
              }`}
            >
              {outerOrbitLogos.map((tech, index) => {
                const count = outerOrbitLogos.length;
                const angleRad = (index * 2 * Math.PI) / count;
                const radius = 298; // pixels
                const x = Math.round(Math.cos(angleRad) * radius);
                const y = Math.round(Math.sin(angleRad) * radius);

                return (
                  <div
                    key={tech.name}
                    className="absolute left-1/2 top-1/2 -ml-6 -mt-6"
                    style={{
                      transform: `translate3d(${x}px, ${y}px, 0)`,
                    }}
                  >
                    {/* Counter-rotation keeps the logo 100% upright at all orbital angles */}
                    <div
                      className={`animate-counter-outer ${isOrbitPaused ? 'orbit-paused' : ''}`}
                    >
                      {/* Individual 2D Logo Micro-Movement: Float */}
                      <div
                        className={`logo-float-${(index + 2) % 4}`}
                        style={{
                          animationDelay: `-${(index * 0.32).toFixed(2)}s`,
                        }}
                      >
                        <div
                          onMouseEnter={() => setHoveredTech(tech)}
                          className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white shadow-card border flex items-center justify-center p-2.5 transition-all duration-300 hover:scale-120 hover:shadow-[0_0_20px_rgba(23,99,232,0.45)] hover:border-primaryRoyalBlue cursor-pointer select-none group relative pointer-events-auto ${
                            isTechHighlighted(tech)
                              ? 'border-cardBorder/90 opacity-100 scale-100'
                              : 'border-cardBorder/40 opacity-30 scale-90'
                          }`}
                        >
                          <TechLogo name={tech.name} size={26} className="w-full h-full object-contain" />
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-headingNavy text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-all duration-200 shadow-md z-40 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
                            <span>{tech.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* STATIONARY CENTER ELEMENT: Profile Photo + Badge */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="relative z-30 flex flex-col items-center pointer-events-auto cursor-pointer"
            >
              {/* Circular Profile Photo with glowing Blue highlight gradient ring (#3B82F6 -> #2563EB) */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] shadow-glow overflow-hidden group">
                <img
                  src={systemWorkPhoto}
                  alt="Karthikeyan S A at Work Station"
                  className="w-full h-full object-cover object-center rounded-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full border-2 border-white/60 pointer-events-none" />
              </div>

              {/* Central Badge: Skills & Technologies */}
              <div className="mt-3.5 sm:mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primaryRoyalBlue text-white font-semibold text-xs sm:text-sm shadow-md shadow-primaryRoyalBlue/25 tracking-wide">
                <span>Skills & Technologies</span>
              </div>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
