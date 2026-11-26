import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar, Building2 } from 'lucide-react';
import { educationCards, academicOverview } from '../../data/education';
import { AnimatedCounter } from '../common/AnimatedCounter';

export const Education: React.FC = () => {
  return (
    <section id="education" className="pt-16 pb-20 sm:pt-20 sm:pb-24 bg-transparent relative overflow-hidden scroll-mt-20">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#EFF6FF]/70 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#DBEAFE]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lightBlueCard border border-cardBorder text-primaryRoyalBlue text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className="typo-section-heading mb-4">
            Education & <span className="text-primaryRoyalBlue">Academics</span>
          </h2>
          <p className="typo-section-subtitle max-w-2xl mx-auto">
            My academic progression in chronological order from secondary school to Bachelor of Engineering.
          </p>
        </div>

        {/* Content Layout: Hanging Cards on Left, Academic Overview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: HANGING ACADEMIC ID CARDS ON FIXED STATIONARY RAIL (Wind-Swaying Hanging ID Cards) */}
          <div className="lg:col-span-8 flex flex-col items-center relative w-full pt-2">
            
            {/* 1. Continuous Stationary Horizontal Rod with Chrome Mounting End Brackets */}
            <div className="w-full h-6 rounded-full bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 shadow-md border border-amber-950/50 relative z-10 hidden sm:flex items-center justify-between px-2 overflow-hidden">
              {/* Left wall mounting bracket */}
              <div className="w-2.5 h-4 rounded-xs bg-gradient-to-r from-slate-400 to-slate-600 border border-slate-700 shadow-xs shrink-0" />
              
              {/* Stationary Rod Highlight Sheen */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="w-full h-1 bg-gradient-to-r from-amber-400/30 via-amber-200/60 to-amber-400/30 origin-left mx-2"
              />

              {/* Right wall mounting bracket */}
              <div className="w-2.5 h-4 rounded-xs bg-gradient-to-r from-slate-600 to-slate-400 border border-slate-700 shadow-xs shrink-0" />
            </div>

            {/* 2. Unified 3-Column Assembly Grid: SSLC (Longest) -> HSC (Medium) -> B.E. (Shortest) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-7 w-full sm:-mt-5 z-20 items-start px-2">
              {educationCards.map((card, idx) => {
                const isThird = card.hierarchyTier === 'third';
                const imageHeight = 'h-32 sm:h-36';

                // Explicit hanging configurations fulfilling strict requirement:
                // SSLC (2021–2022) = LONGEST hanging length (hangs lowest)
                // HSC (2022–2024) = MEDIUM hanging length (hangs at medium height)
                // B.E. AI & DS (2024–2028) = SHORTEST hanging length (hangs highest)
                const hangingConfig = (() => {
                  switch (card.hierarchyTier) {
                    case 'first': // SSLC (2021–2022) - LONGEST
                      return {
                        strapHeightClass: 'h-32 sm:h-[144px]', // 144px hanging drop
                        swayClass: 'card-sway-sslc',
                        lengthLabel: 'Longest Hanging Length',
                      };
                    case 'second': // HSC (2022–2024) - MEDIUM
                      return {
                        strapHeightClass: 'h-20 sm:h-[88px]', // 88px hanging drop
                        swayClass: 'card-sway-hsc',
                        lengthLabel: 'Medium Hanging Length',
                      };
                    case 'third': // B.E. AI & DS (2024–2028) - SHORTEST
                    default:
                      return {
                        strapHeightClass: 'h-9 sm:h-[40px]', // 40px hanging drop
                        swayClass: 'card-sway-be',
                        lengthLabel: 'Shortest Hanging Length',
                      };
                  }
                })();

                return (
                  <motion.div
                    key={card.level}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.65,
                      delay: 0.25 + idx * 0.18,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className="flex flex-col items-center w-full relative"
                  >
                    {/* Component 1: Fixed Stationary Mounting Nail / Screw on the stationary horizontal rod */}
                    <div
                      className="w-4 h-4 rounded-full bg-gradient-to-b from-slate-100 via-slate-300 to-slate-400 border border-slate-600 shadow-sm hidden sm:flex items-center justify-center z-30 shrink-0"
                      title={`Suspension anchor on fixed rod (${hangingConfig.lengthLabel})`}
                    >
                      <span className="w-2 h-0.5 bg-slate-600" />
                    </div>

                    {/* SWINGING PENDULUM ASSEMBLY (Strap + Clasp + ID Card) */}
                    {/* Transform-origin is fixed precisely at the top suspension nail */}
                    <div
                      className={`w-full flex flex-col items-center origin-top will-change-transform ${hangingConfig.swayClass}`}
                      style={{ transformOrigin: 'top center' }}
                    >
                      {/* Component 2: Blue Fabric Lanyard Strap (Length varies distinctly: SSLC 144px, HSC 88px, B.E. 40px) */}
                      <div
                        className={`w-5 ${hangingConfig.strapHeightClass} bg-gradient-to-b from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] shadow-xs hidden sm:flex flex-col items-center justify-between py-1.5 -mt-1 z-20 shrink-0 relative border-x border-white/20`}
                      >
                        {/* Lanyard texture and edge stitching */}
                        <div className="absolute inset-y-0 left-0.5 w-px bg-white/25 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0.5 w-px bg-white/25 pointer-events-none" />
                        
                        {/* Top suspension rivet */}
                        <span className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-2xs z-10" />

                        {/* Middle safety buckle clip on longer straps */}
                        {idx < 2 && (
                          <span className="w-5 h-2 rounded-xs bg-[#172554] border border-blue-300/40 z-10" />
                        )}

                        {/* Bottom swivel rivet */}
                        <span className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-2xs z-10" />
                      </div>

                      {/* Component 3: Metallic Hook / Swivel Clasp */}
                      <div className="w-7 h-4 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-500 rounded-sm border border-slate-600 shadow-xs hidden sm:flex items-center justify-center -mt-0.5 z-25 shrink-0">
                        <div className="w-2.5 h-1.5 rounded-t-full border-t-2 border-x-2 border-slate-600" />
                      </div>

                      {/* Component 4: ID Card Body (Clean White Surface #FFFFFF) */}
                      <div className="w-full mt-0 z-20 flex flex-col">
                        <motion.div
                          whileHover={{ y: -4, scale: 1.01 }}
                          transition={{ duration: 0.25 }}
                          className={`w-full bg-white border ${
                            isThird
                              ? 'border-primaryRoyalBlue shadow-card-hover ring-2 ring-primaryRoyalBlue/20'
                              : 'border-cardBorder shadow-card'
                          } rounded-3xl overflow-hidden hover:shadow-card-hover transition-all flex flex-col justify-between`}
                        >
                          {/* Top Card Header */}
                          <div className={`p-3 text-center ${
                            isThird
                              ? 'bg-gradient-to-r from-[#101B46] via-[#1763E8] to-[#3978ED] text-white'
                              : 'bg-gradient-to-r from-[#1763E8] to-[#3978ED] text-white'
                          }`}>
                            <div className="flex items-center justify-center gap-1.5 mb-0.5">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-white/90">
                                {card.badge}
                              </span>
                              {isThird && (
                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-white/20 text-white">
                                  Current
                                </span>
                              )}
                            </div>
                            <h3 className="text-xs sm:text-sm font-extrabold truncate">
                              {card.level}
                            </h3>
                          </div>

                          {/* Actual Uploaded Institution Photograph */}
                          <div className={`${imageHeight} overflow-hidden bg-slate-100 border-b border-cardBorder relative transition-all`}>
                            <img
                              src={card.image}
                              alt={`${card.institution}`}
                              className="w-full h-full object-cover object-center filter contrast-[1.03] hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-deepNavy/15 to-transparent pointer-events-none" />
                          </div>

                          {/* Card Content Details */}
                          <div className="p-3.5 flex flex-col justify-between flex-1">
                            <div>
                              <div className="flex items-start gap-1.5 mb-2">
                                <Building2 className="w-3.5 h-3.5 text-primaryRoyalBlue shrink-0 mt-0.5" />
                                <h4 className="text-xs font-bold text-headingNavy line-clamp-2 leading-tight">
                                  {card.institution}
                                </h4>
                              </div>

                              <div className="flex items-center gap-1.5 text-[11px] text-secondaryText mb-2">
                                <Calendar className="w-3 h-3 text-primaryRoyalBlue" />
                                <span>{card.duration}</span>
                              </div>

                              {card.details && (
                                <p className="text-[10px] text-secondaryText/90 leading-tight mb-3 line-clamp-2">
                                  {card.details}
                                </p>
                              )}
                            </div>

                            {/* Score Highlight Box (04. Animated Number Counter) */}
                            <div className={`pt-2.5 border-t border-cardBorder text-center rounded-xl p-2 ${isThird ? 'bg-lightBlueCard border border-primaryRoyalBlue/30' : 'bg-lightBlueCard'}`}>
                              <span className="text-[9px] font-bold text-mutedText uppercase tracking-wider block">
                                {card.scoreLabel}
                              </span>
                              <span className="text-base sm:text-lg font-black text-primaryRoyalBlue tracking-tight block">
                                <AnimatedCounter value={card.scoreValue} />
                              </span>
                            </div>
                          </div>

                        </motion.div>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* RIGHT: ACADEMIC OVERVIEW PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            {/* Overview Card (Secondary Card Background #F8FAFF) */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-secondaryCardBg border border-cardBorder rounded-3xl p-6 sm:p-7 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-cardBorder">
                <div className="w-8 h-8 rounded-xl bg-primaryRoyalBlue text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-headingNavy">Academic Overview</h3>
                  <p className="text-[11px] text-secondaryText">Anna University Affiliated</p>
                </div>
              </div>

              {/* Two Highlight Tiles (Clean White Background #FFFFFF) */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-3.5 rounded-2xl border border-cardBorder text-center shadow-xs cursor-default"
                >
                  <span className="text-[10px] uppercase font-bold text-mutedText tracking-wider block">CGPA</span>
                  <span className="text-2xl font-black text-primaryRoyalBlue">
                    <AnimatedCounter value={academicOverview.cgpa} />
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-3.5 rounded-2xl border border-cardBorder text-center shadow-xs cursor-default"
                >
                  <span className="text-[10px] uppercase font-bold text-mutedText tracking-wider block">Department</span>
                  <span className="text-sm font-extrabold text-headingNavy">AI & DS</span>
                </motion.div>
              </div>

              {/* Academic Metadata Rows */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-cardBorder shadow-xs">
                  <span className="text-secondaryText">Regulation:</span>
                  <span className="font-bold text-headingNavy">{academicOverview.regulation}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-cardBorder shadow-xs">
                  <span className="text-secondaryText">University:</span>
                  <span className="font-bold text-headingNavy">{academicOverview.university}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-cardBorder shadow-xs">
                  <span className="text-secondaryText">Expected Graduation:</span>
                  <span className="font-bold text-primaryRoyalBlue">{academicOverview.expectedGraduation}</span>
                </div>
              </div>
            </motion.div>

            {/* Relevant Coursework Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-cardBorder rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-primaryRoyalBlue" />
                <h4 className="text-xs font-bold text-headingNavy uppercase tracking-wider">
                  Relevant Coursework
                </h4>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {academicOverview.relevantCoursework.map((course) => (
                  <motion.span
                    key={course}
                    whileHover={{ scale: 1.05, y: -1 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-medium px-3 py-1.5 rounded-xl bg-secondaryCardBg border border-cardBorder text-headingNavy hover:border-primaryRoyalBlue hover:bg-lightBlueCard transition-colors cursor-default"
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
