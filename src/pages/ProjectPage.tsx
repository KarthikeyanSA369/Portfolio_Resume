import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Menu,
  X,
  ListOrdered
} from 'lucide-react';
import { AbstractGeometricBackground } from '../components/common/AbstractGeometricBackground';
import { projects } from '../data/projects';
import { TechIcon } from '../components/common/TechIcon';

// Centralized Project Motion Components & Hooks
import { useProjectMotion, type TocSection } from '../components/projects/motion/useProjectMotion';
import { ReadingProgressIndicator } from '../components/projects/motion/ReadingProgressIndicator';
import { SequentialHeader } from '../components/projects/motion/SequentialHeader';
import { SectionDivider } from '../components/projects/motion/SectionDivider';
import { ArchitecturePipeline } from '../components/projects/motion/ArchitecturePipeline';
import { InteractiveCodeBlock } from '../components/projects/motion/InteractiveCodeBlock';
import { ExpandableTechnicalDetails } from '../components/projects/motion/ExpandableTechnicalDetails';
import { BackToTopButton } from '../components/projects/motion/BackToTopButton';
import { ReadingCompletionBadge } from '../components/projects/motion/ReadingCompletionBadge';

const tocSections: TocSection[] = [
  { id: 'overview', title: '1. Project Overview' },
  { id: 'problem-statement', title: '2. Problem Statement' },
  { id: 'proposed-solution', title: '3. Proposed Solution' },
  { id: 'key-features', title: '4. Key Features & Capabilities' },
  { id: 'how-it-works', title: '5. How It Works' },
  { id: 'system-architecture', title: '6. System Architecture' },
  { id: 'technical-implementation', title: '7. Technical Implementation' },
  { id: 'technologies-used', title: '8. Technologies Used' },
  { id: 'engineering-challenges', title: '9. Engineering Challenges' },
  { id: 'project-outcomes', title: '10. Project Outcomes' },
  { id: 'conclusion', title: '11. Conclusion' },
];

export const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const articleRef = useRef<HTMLElement | null>(null);

  const currentIndex = projects.findIndex(
    (p) =>
      p.slug === slug ||
      p.id === slug ||
      (slug === 'smart-report-alert' && p.slug === 'smart-report-alert-system') ||
      (slug === 'smart-report-alert-system' && p.slug === 'smart-report-alert')
  );

  const project = currentIndex !== -1 ? projects[currentIndex] : null;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  // Motion Controller Hook (Reading progress, scroll direction, active TOC section, completion, reduced motion)
  const {
    shouldReduceMotion,
    activeSection,
    readingProgress,
    scrollDirection,
    showBackToTop,
    isCompleted,
    scrollToSection,
    scrollToTop,
  } = useProjectMotion(slug, tocSections, articleRef);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 text-center relative overflow-x-hidden">
        <AbstractGeometricBackground />
        <div className="relative z-10 max-w-md bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-headingNavy mb-2">Project Case Study Not Found</h2>
          <p className="text-slate-600 text-sm mb-6">
            The requested project documentation could not be found in the engineering registry.
          </p>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primaryRoyalBlue text-white text-xs font-semibold hover:bg-royalBlue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    // 21. Project-to-Project Transition: Animated exit and entrance coordinated by slug
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id || slug}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
        transition={{ duration: 0.5, ease: easeCurve }}
        className="min-h-screen bg-transparent pt-24 pb-20 relative overflow-x-clip"
      >
        {/* Background Ambience */}
        <AbstractGeometricBackground />

        {/* 08. Reading Progress & 09. Scroll Direction Indicator */}
        <ReadingProgressIndicator
          progress={readingProgress}
          scrollDirection={scrollDirection}
          shouldReduceMotion={shouldReduceMotion}
        />

        {/* 22. Back-to-Top Floating Control */}
        <BackToTopButton
          show={showBackToTop}
          onClick={scrollToTop}
          shouldReduceMotion={shouldReduceMotion}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Mobile / Tablet Collapsible Table of Contents Bar */}
          <div className="lg:hidden mb-6 bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="w-full flex items-center justify-between text-xs font-bold text-headingNavy"
              aria-expanded={mobileTocOpen}
            >
              <div className="flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-primaryRoyalBlue" />
                <span>Table of Contents: Jump to section</span>
              </div>
              {mobileTocOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {mobileTocOpen && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-1.5 text-xs">
                {tocSections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      scrollToSection(sec.id);
                      setMobileTocOpen(false);
                    }}
                    className={`text-left py-1.5 px-2 rounded transition-colors ${
                      activeSection === sec.id
                        ? 'bg-primaryRoyalBlue/10 text-primaryRoyalBlue font-bold'
                        : 'text-slate-600 hover:text-headingNavy hover:bg-slate-50'
                    }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Documentation Layout: Left Sticky Sidebar + Continuous Main Article */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Left Sticky Sidebar: Documentation Table of Contents */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 border-r border-slate-200/90 select-none">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-primaryRoyalBlue" />
                <span>Table of Contents</span>
              </div>

              <nav className="relative space-y-1 text-xs">
                {tocSections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`group relative block w-full text-left py-1.5 px-3 rounded-r transition-colors duration-150 ${
                        isActive
                          ? 'text-primaryRoyalBlue font-bold bg-primaryRoyalBlue/10 pl-4 shadow-[0_0_10px_rgba(74,120,224,0.12)]'
                          : 'text-slate-600 hover:text-headingNavy hover:bg-slate-100/70 font-medium'
                      }`}
                    >
                      {/* 11. Sliding Active Indicator: Smoothly moving Royal Blue active bar */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTocBar"
                          className="absolute left-0 top-1 bottom-1 w-1 bg-primaryRoyalBlue rounded-r shadow-[0_0_8px_rgba(74,120,224,0.4)]"
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : { type: 'spring', stiffness: 350, damping: 30 }
                          }
                        />
                      )}

                      {/* 14. Hover Underline Animation */}
                      <span className="relative inline-block">
                        {sec.title}
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-primaryRoyalBlue/40 scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100" />
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Links inside TOC */}
              <div className="mt-6 pt-6 border-t border-slate-200/80 text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  External Links
                </span>
                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 text-slate-600 hover:text-primaryRoyalBlue py-1 transition-colors"
                  >
                    {/* 24. Link Arrow Motion */}
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 text-slate-600 hover:text-emerald-600 py-1 transition-colors"
                  >
                    {/* 24. Link Arrow Motion */}
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    <span>Live Demonstration</span>
                  </a>
                )}
              </div>
            </aside>

            {/* Main Continuous Documentation Article */}
            <article
              ref={articleRef}
              className="w-full flex-1 min-w-0 max-w-full lg:max-w-4xl bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-8 lg:p-12 shadow-xs overflow-hidden"
            >
              
              {/* 01-05, 23-24: Sequential Header & Metadata Section */}
              <SequentialHeader
                project={project}
                shouldReduceMotion={shouldReduceMotion}
              />

              {/* 1. Project Overview */}
              <motion.section
                id="overview"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: easeCurve }}
                className="scroll-mt-28 mb-10"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-headingNavy pb-1 flex items-center gap-2 mb-2">
                  {/* 10. Section Focus Transition */}
                  <span className={`transition-all duration-300 ${activeSection === 'overview' ? 'text-primaryRoyalBlue font-bold scale-105 inline-block drop-shadow-[0_0_8px_rgba(74,120,224,0.35)]' : 'text-primaryRoyalBlue'}`}>
                    1.
                  </span>
                  <span>Project Overview</span>
                </h2>
                {/* 07. Section Divider Draw */}
                <SectionDivider shouldReduceMotion={shouldReduceMotion} />
                <p className="text-slate-700 leading-relaxed text-[15px] sm:text-base mt-3">
                  {project.overview}
                </p>
              </motion.section>

              {/* 2. Problem Statement */}
              <motion.section
                id="problem-statement"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: easeCurve }}
                className="scroll-mt-28 mb-10"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-headingNavy pb-1 flex items-center gap-2 mb-2">
                  <span className={`transition-all duration-300 ${activeSection === 'problem-statement' ? 'text-primaryRoyalBlue font-bold scale-105 inline-block drop-shadow-[0_0_8px_rgba(74,120,224,0.35)]' : 'text-primaryRoyalBlue'}`}>
                    2.
                  </span>
                  <span>Problem Statement</span>
                </h2>
                <SectionDivider shouldReduceMotion={shouldReduceMotion} />
                <p className="text-slate-700 leading-relaxed text-[15px] sm:text-base mt-3">
                  {project.problemStatement}
                </p>
              </motion.section>

              {/* 3. Proposed Solution */}
              <motion.section
                id="proposed-solution"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: easeCurve }}
                className="scroll-mt-28 mb-10"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-headingNavy pb-1 flex items-center gap-2 mb-2">
                  <span className={`transition-all duration-300 ${activeSection === 'proposed-solution' ? 'text-primaryRoyalBlue font-bold scale-105 inline-block drop-shadow-[0_0_8px_rgba(74,120,224,0.35)]' : 'text-primaryRoyalBlue'}`}>
                    3.
                  </span>
                  <span>Proposed Solution</span>
                </h2>
                <SectionDivider shouldReduceMotion={shouldReduceMotion} />
                <p className="text-slate-700 leading-relaxed text-[15px] sm:text-base mt-3">
                  {project.proposedSolution}
                </p>
              </motion.section>

              {/* 4. Key Features & Capabilities */}
              <motion.section
                id="key-features"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: easeCurve }}
                className="scroll-mt-28 mb-10"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-headingNavy pb-1 flex items-center gap-2 mb-2">
                  <span className={`transition-all duration-300 ${activeSection === 'key-features' ? 'text-primaryRoyalBlue font-bold scale-105 inline-block drop-shadow-[0_0_8px_rgba(74,120,224,0.35)]' : 'text-primaryRoyalBlue'}`}>
                    4.
                  </span>
                  <span>Key Features & Capabilities</span>
                </h2>
                <SectionDivider shouldReduceMotion={shouldReduceMotion} />
                <ul className="space-y-2.5 my-4">
                  {project.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-[15px] sm:text-base leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primaryRoyalBlue shrink-0 mt-2.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              {/* 5. How It Works */}
              <motion.section
                id="how-it-works"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: easeCurve }}
                className="scroll-mt-28 mb-10"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-headingNavy pb-1 flex items-center gap-2 mb-2">
                  <span className={`transition-all duration-300 ${activeSection === 'how-it-works' ? 'text-primaryRoyalBlue font-bold scale-105 inline-block drop-shadow-[0_0_8px_rgba(74,120,224,0.35)]' : 'text-primaryRoyalBlue'}`}>
                    5.
                  </span>
                  <span>How It Works</span>
                </h2>
                <SectionDivider shouldReduceMotion={shouldReduceMotion} />
                <p className="text-slate-700 leading-relaxed text-[15px] sm:text-base mb-4 mt-3">
                  The operational workflow executes through the following systematic stages:
                </p>
                <ol className="space-y-4 my-4">
                  {project.howItWorks.map((stepItem) => (
                    <li key={stepItem.step} className="flex items-start gap-3.5">
                      <span className="w-7 h-7 rounded-full bg-primaryRoyalBlue/10 text-primaryRoyalBlue font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-primaryRoyalBlue/20">
                        {stepItem.step}
                      </span>
                      <div>
                        <h3 className="font-bold text-headingNavy text-base">
                          {stepItem.title}
                        </h3>
                        <p className="text-slate-600 text-[15px] leading-relaxed mt-0.5">
                          {stepItem.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.section>

              {/* 6. System Architecture */}
              <motion.section
                id="system-architecture"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: easeCurve }}
                className="scroll-mt-28 mb-10"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-headingNavy pb-1 flex items-center gap-2 mb-2">
                  <span className={`transition-all duration-300 ${activeSection === 'system-architecture' ? 'text-primaryRoyalBlue font-bold scale-105 inline-block drop-shadow-[0_0_8px_rgba(74,120,224,0.35)]' : 'text-primaryRoyalBlue'}`}>
                    6.
                  </span>
                  <span>System Architecture</span>
                </h2>
                <SectionDivider shouldReduceMotion={shouldReduceMotion} />
                {project.architecture?.summary && (
                  <p className="text-slate-700 leading-relaxed text-[15px] sm:text-base mb-4 mt-3">
                    {project.architecture.summary}
                  </p>
                )}
                {/* 16. Architecture Flow & 17. Connection Line Drawing */}
                <ArchitecturePipeline
                  project={project}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </motion.section>

              {/* 7. Technical Implementation */}
              <motion.section
                id="technical-implementation"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: easeCurve }}
                className="scroll-mt-28 mb-10"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-headingNavy pb-1 flex items-center gap-2 mb-2">
                  <span className={`transition-all duration-300 ${activeSection === 'technical-implementation' ? 'text-primaryRoyalBlue font-bold scale-105 inline-block drop-shadow-[0_0_8px_rgba(74,120,224,0.35)]' : 'text-primaryRoyalBlue'}`}>
                    7.
                  </span>
                  <span>Technical Implementation</span>
                </h2>
                <SectionDivider shouldReduceMotion={shouldReduceMotion} />
                <p className="text-slate-700 leading-relaxed text-[15px] sm:text-base mb-4 mt-3">
                  {project.technicalImplementation.summary}
                </p>
                <ul className="space-y-2.5 my-4">
                  {project.technicalImplementation.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-[15px] sm:text-base leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primaryRoyalBlue shrink-0 mt-2.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* 18. Code Block Interaction: Interactive copy-to-clipboard commands */}
                <InteractiveCodeBlock
                  project={project}
                  shouldReduceMotion={shouldReduceMotion}
                />

                {/* 20. Expandable Technical Details: Accessible deep-dive blueprint */}
                <ExpandableTechnicalDetails
                  project={project}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </motion.section>

              {/* 8. Technologies Used */}
              <motion.section
                id="technologies-used"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: easeCurve }}
                className="scroll-mt-28 mb-10"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-headingNavy pb-1 flex items-center gap-2 mb-2">
                  <span className={`transition-all duration-300 ${activeSection === 'technologies-used' ? 'text-primaryRoyalBlue font-bold scale-105 inline-block drop-shadow-[0_0_8px_rgba(74,120,224,0.35)]' : 'text-primaryRoyalBlue'}`}>
                    8.
                  </span>
                  <span>Technologies Used</span>
                </h2>
                <SectionDivider shouldReduceMotion={shouldReduceMotion} />
                <div className="my-4 border border-slate-200 rounded-lg overflow-x-auto max-w-full shadow-2xs">
                  <table className="w-full min-w-[500px] sm:min-w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-600">
                      <tr>
                        <th className="py-2.5 px-4 w-12">#</th>
                        <th className="py-2.5 px-4">Technology</th>
                        <th className="py-2.5 px-4">Application Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {/* 19. Technology Name Reveal: Staggered animated rows */}
                      {project.technologies.map((tech, idx) => (
                        <motion.tr
                          key={tech}
                          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: shouldReduceMotion ? 0 : idx * 0.05,
                            ease: easeCurve,
                          }}
                          className="hover:bg-slate-50/60 transition-colors"
                        >
                          <td className="py-2.5 px-4 text-slate-400 font-mono text-xs">{idx + 1}</td>
                          <td className="py-2.5 px-4 font-semibold text-headingNavy flex items-center gap-2">
                            <TechIcon name={tech} className="w-4 h-4 shrink-0" />
                            <span>{tech}</span>
                          </td>
                          <td className="py-2.5 px-4 text-slate-600 text-xs sm:text-sm">
                            {tech.includes('Python') ? 'Core runtime, business logic & system automation' :
                             tech.includes('Flask') || tech.includes('FastAPI') ? 'Backend REST APIs & local service endpoints' :
                             tech.includes('React') ? 'User interface view layer & component state' :
                             tech.includes('TypeScript') ? 'Static typing, API interfaces & data modeling' :
                             tech.includes('n8n') ? 'Workflow automation & scheduled pipeline orchestration' :
                             tech.includes('OpenCV') ? 'Image processing, frequency transforms & watermarking' :
                             tech.includes('Vite') ? 'Modern frontend build toolchain & development server' :
                             tech.includes('3D') || tech.includes('WebGL') ? 'Three-dimensional viewport rendering & parcel projection' :
                             tech.includes('API') ? 'External service integration & data communication' :
                             tech.includes('PyWebView') ? 'Native desktop window wrapper & IPC bridge' :
                             tech.includes('Registry') ? 'Operating system configuration discovery' :
                             tech.includes('AES') || tech.includes('ML-') ? 'Cryptographic encryption & digital signature verification' :
                             tech.includes('CSV') ? 'Tabular dataset parsing, ingestion & validation' :
                             tech.includes('Packaging') || tech.includes('Setuptools') ? 'Package distribution & PyPI wheel compilation' :
                             'Architectural utility & subsystem component'}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.section>

              {/* 9. Engineering Challenges & Solutions */}
              <motion.section
                id="engineering-challenges"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: easeCurve }}
                className="scroll-mt-28 mb-10"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-headingNavy pb-1 flex items-center gap-2 mb-2">
                  <span className={`transition-all duration-300 ${activeSection === 'engineering-challenges' ? 'text-primaryRoyalBlue font-bold scale-105 inline-block drop-shadow-[0_0_8px_rgba(74,120,224,0.35)]' : 'text-primaryRoyalBlue'}`}>
                    9.
                  </span>
                  <span>Engineering Challenges & Solutions</span>
                </h2>
                <SectionDivider shouldReduceMotion={shouldReduceMotion} />
                <div className="space-y-5 my-4">
                  {project.engineeringChallenges.map((item, idx) => (
                    <div key={idx} className="border-l-2 border-primaryRoyalBlue/40 pl-4 py-1">
                      <h3 className="font-bold text-headingNavy text-base flex items-start gap-2">
                        <span className="text-primaryRoyalBlue font-mono text-sm">Challenge {idx + 1}:</span>
                        <span>{item.challenge}</span>
                      </h3>
                      <p className="text-slate-600 text-[15px] leading-relaxed mt-1.5 pl-6">
                        <span className="font-semibold text-slate-800">Engineering Solution: </span>
                        {item.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* 10. Project Outcomes */}
              <motion.section
                id="project-outcomes"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: easeCurve }}
                className="scroll-mt-28 mb-10"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-headingNavy pb-1 flex items-center gap-2 mb-2">
                  <span className={`transition-all duration-300 ${activeSection === 'project-outcomes' ? 'text-primaryRoyalBlue font-bold scale-105 inline-block drop-shadow-[0_0_8px_rgba(74,120,224,0.35)]' : 'text-primaryRoyalBlue'}`}>
                    10.
                  </span>
                  <span>Project Outcomes</span>
                </h2>
                <SectionDivider shouldReduceMotion={shouldReduceMotion} />
                <p className="text-slate-700 leading-relaxed text-[15px] sm:text-base mt-3">
                  {project.projectOutcome}
                </p>
              </motion.section>

              {/* 11. Conclusion */}
              <motion.section
                id="conclusion"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: easeCurve }}
                className="scroll-mt-28 mb-8"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-headingNavy pb-1 flex items-center gap-2 mb-2">
                  <span className={`transition-all duration-300 ${activeSection === 'conclusion' ? 'text-primaryRoyalBlue font-bold scale-105 inline-block drop-shadow-[0_0_8px_rgba(74,120,224,0.35)]' : 'text-primaryRoyalBlue'}`}>
                    11.
                  </span>
                  <span>Conclusion</span>
                </h2>
                <SectionDivider shouldReduceMotion={shouldReduceMotion} />
                <p className="text-slate-700 leading-relaxed text-[15px] sm:text-base mt-3">
                  {project.conclusion}
                </p>
              </motion.section>

              {/* 25. Page Completion Animation: Restrained 100% review verification banner */}
              <ReadingCompletionBadge
                isCompleted={isCompleted}
                shouldReduceMotion={shouldReduceMotion}
              />

              {/* Bottom Navigation */}
              <footer className="border-t border-slate-200 pt-8 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                {prevProject ? (
                  <Link
                    to={`/projects/${prevProject.slug}`}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primaryRoyalBlue transition-colors"
                  >
                    {/* 24. Link Arrow Motion */}
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-200" />
                    <span>{prevProject.title}</span>
                  </Link>
                ) : <div />}

                <Link
                  to="/#projects"
                  onClick={() => {
                    setTimeout(() => {
                      const el = document.getElementById('projects');
                      if (el) {
                        const navbarHeight = 80;
                        const top = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                    }, 150);
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-headingNavy transition-colors"
                >
                  View All Projects
                </Link>

                {nextProject ? (
                  <Link
                    to={`/projects/${nextProject.slug}`}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primaryRoyalBlue transition-colors"
                  >
                    <span>{nextProject.title}</span>
                    {/* 24. Link Arrow Motion */}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </Link>
                ) : <div />}
              </footer>

            </article>

          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
