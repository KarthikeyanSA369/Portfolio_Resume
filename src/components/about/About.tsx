import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { AnimatedCounter } from '../common/AnimatedCounter';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-transparent relative overflow-hidden scroll-mt-20">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#EFF6FF]/80 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#DBEAFE]/40 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lightBlueCard border border-cardBorder text-primaryRoyalBlue text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="typo-section-heading mb-4">
            Academic Background & <span className="text-primaryRoyalBlue">Technical Focus</span>
          </h2>
          <p className="typo-section-subtitle max-w-2xl mx-auto">
            Pursuing innovative problem-solving in Artificial Intelligence, Data Science, and Scalable Software Architecture.
          </p>
        </motion.div>

        {/* Editorial Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Biography Narrative Card (Clean White Surface) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white border border-cardBorder rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="typo-card-heading mb-4 flex items-center gap-3">
                <span>Engineering the Future with Data & Code</span>
              </h3>

              <p className="typo-body-paragraph mb-6">
                {personalInfo.editorialBio}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-cardBorder/70">
              <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primaryRoyalBlue shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-headingNavy">Applied Machine Learning</p>
                  <p className="text-xs text-secondaryText">Computer vision, NLP pipelines, and generative models.</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primaryRoyalBlue shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-headingNavy">Full Stack Systems</p>
                  <p className="text-xs text-secondaryText">Robust REST backends, PyWebView utilities, and modern React interfaces.</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primaryRoyalBlue shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-headingNavy">Automated Workflows</p>
                  <p className="text-xs text-secondaryText">Event-driven n8n automations, alert feeds, and scheduled synthesizers.</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primaryRoyalBlue shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-headingNavy">Data Analytics</p>
                  <p className="text-xs text-secondaryText">Statistical modeling, moving-average trends, and structured reporting.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Academic Highlights & Key Facts Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            {/* Primary CGPA Highlight Card (Royal Blue gradient: #3B82F6 → #2563EB) */}
            <motion.div
              whileHover={{ y: -4, scale: 1.012 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white rounded-3xl p-6 sm:p-8 shadow-card hover:shadow-card-hover relative overflow-hidden flex flex-col justify-between transition-all"
            >
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="p-3 bg-white/15 rounded-2xl backdrop-blur-md cursor-pointer"
                  >
                    <Award className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold tracking-wide">
                    Academic Standing
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-white/90 font-semibold mb-1">Current Cumulative GPA</p>
                <h4 className="text-4xl font-extrabold tracking-tight mb-2">
                  <AnimatedCounter value={personalInfo.currentCGPA} />
                </h4>
              </div>
              <p className="text-sm text-white/90 leading-relaxed mt-2">
                Consistent top academic performance across core mathematical, computational, and algorithmic coursework.
              </p>
            </motion.div>

            {/* University & Degree Meta Card (Clean White Surface) */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-cardBorder rounded-3xl p-6 sm:p-8 shadow-card hover:shadow-card-hover flex flex-col gap-4 transition-all"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: [-6, 6, 0], scale: 1.1 }}
                  transition={{ duration: 0.35 }}
                  className="w-11 h-11 rounded-xl bg-lightBlueCard text-primaryRoyalBlue flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
                >
                  <GraduationCap className="w-6 h-6" />
                </motion.div>
                <div>
                  <h5 className="text-sm sm:text-base font-bold text-headingNavy">{personalInfo.degree}</h5>
                  <p className="text-xs text-secondaryText">{personalInfo.college}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-cardBorder text-xs">
                <div>
                  <span className="text-mutedText block mb-0.5">Affiliation:</span>
                  <p className="font-semibold text-headingNavy">{personalInfo.university}</p>
                </div>
                <div>
                  <span className="text-mutedText block mb-0.5">Regulation:</span>
                  <p className="font-semibold text-headingNavy">{personalInfo.regulation} (Sec {personalInfo.section})</p>
                </div>
                <div className="flex items-center gap-1.5 text-secondaryText">
                  <Calendar className="w-3.5 h-3.5 text-primaryRoyalBlue shrink-0" />
                  <span className="font-medium">{personalInfo.collegeDuration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-secondaryText">
                  <MapPin className="w-3.5 h-3.5 text-primaryRoyalBlue shrink-0" />
                  <span className="font-medium">{personalInfo.publicLocation}</span>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
