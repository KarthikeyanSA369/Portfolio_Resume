import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Brain, Code2, Database } from 'lucide-react';
import gmailLogo from '../../assets/gmail-logo.png';
import { HeroScene } from './HeroScene';
import { ProfileHolographicCard } from './ProfileHolographicCard';
import { personalInfo } from '../../data/personal';
import { socialLinks, technicalProfiles } from '../../data/socialLinks';

const HeroSocialIcon: React.FC<{ profile: (typeof technicalProfiles)[0] }> = ({ profile }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError && profile.name.toLowerCase().includes('hackerrank')) {
    return (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#00EA64" />
        <path d="M7 6h2.5v4.5h5V6H17v12h-2.5v-5h-5v5H7V6z" fill="#FFFFFF" />
      </svg>
    );
  }

  return (
    <img
      src={profile.logoUrl}
      alt={profile.alt}
      className="w-6 h-6 object-contain"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 700, y: 350 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Normalized [-1, 1] for 3D parallax
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 2,
      y: (clientY / innerHeight - 0.5) * 2,
    });

    // Exact pixel coordinates relative to Hero section for subtle radial spotlight
    setSpotlightPos({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  // Animation variants for Staggered Text Reveal (01)
  const nameContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const wordRevealVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const ctaContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  };

  const ctaItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[calc(100vh-1.5rem)] pt-24 pb-0 flex flex-col justify-between overflow-hidden bg-transparent scroll-mt-20"
    >
      {/* 3D WebGL Digital Universe Background */}
      <HeroScene />

      {/* 03. Interactive Background Spotlight (Desktop pointer following radial light) */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 hidden md:block transition-opacity duration-300"
        style={{
          background: `radial-gradient(700px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(57, 120, 237, 0.075), transparent 75%)`,
        }}
      />

      {/* Subtle Fluid Decorative Gradients with gentle parallax */}
      <div
        className="absolute top-12 left-1/4 w-96 h-96 bg-[#DBEAFE]/60 rounded-full blur-3xl pointer-events-none -z-10 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -16}px, 0)`,
        }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] bg-[#EFF6FF]/80 rounded-full blur-3xl pointer-events-none -z-10 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 14}px, ${mousePos.y * 14}px, 0)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center py-4">
          
          {/* Left Column: Greeting, Identity, Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Pill Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-cardBorder shadow-sm w-fit mb-6"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-primaryRoyalBlue animate-pulse" />
              <span className="text-sm font-medium text-secondaryText">{personalInfo.greeting}</span>
            </motion.div>

            {/* 01. Staggered Text Reveal: Name */}
            <motion.h1
              variants={nameContainerVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-headingNavy mb-3 flex flex-wrap gap-x-3.5 gap-y-1"
            >
              <span className="inline-block overflow-hidden py-1">
                <motion.span variants={wordRevealVariants} className="inline-block">
                  Karthikeyan
                </motion.span>
              </span>
              <span className="inline-block overflow-hidden py-1">
                <motion.span variants={wordRevealVariants} className="inline-block text-primaryRoyalBlue">
                  S A
                </motion.span>
              </span>
            </motion.h1>

            {/* 01. Staggered Text Reveal: Professional Designation */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl font-semibold text-primaryRoyalBlue mb-5"
            >
              AI & Data Science Developer
            </motion.h2>

            {/* 01. Staggered Text Reveal: Concise Bio with subtle upward movement */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-secondaryText max-w-xl leading-relaxed mb-8"
            >
              {personalInfo.shortBio}
            </motion.p>

            {/* 01. Staggered Text Reveal: Primary & Secondary Actions (Sequentially animated) */}
            <motion.div
              variants={ctaContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-3.5 mb-8"
            >
              <motion.a
                variants={ctaItemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#projects"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-primaryRoyalBlue text-white font-semibold text-sm shadow-md shadow-royalBlue/20 hover:bg-btnBlueHover hover:shadow-lg transition-all duration-200 group border border-primaryRoyalBlue"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                variants={ctaItemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={socialLinks.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white border border-divider text-headingNavy font-semibold text-sm shadow-sm hover:bg-lightBlueCard hover:border-cardBorder transition-all duration-200"
              >
                <span>Download Resume</span>
                <Download className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Verified Profile Links Row - Direct Authentic Brand Logos (No surrounding boxes/cards) */}
            <div className="flex items-center gap-5 pt-1">
              {technicalProfiles.map((profile) => (
                <motion.a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.ariaLabel}
                  title={profile.name}
                  whileHover={{ scale: 1.25, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="focus:outline-none flex items-center justify-center"
                >
                  <HeroSocialIcon profile={profile} />
                </motion.a>
              ))}

              {/* Email / Gmail - Official Color Brand Logo */}
              <motion.a
                href={`mailto:${personalInfo.email}`}
                aria-label="Send Email"
                className="focus:outline-none flex items-center justify-center"
                title="Email (Gmail)"
                whileHover={{ scale: 1.25, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <img
                  src={gmailLogo}
                  alt="Gmail Logo"
                  className="w-6 h-6 object-contain"
                  loading="lazy"
                />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Blazer Portrait & Floating Concept Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Soft Ambient Light Halo */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-[#DCE8FF]/50 to-[#F3F6FF]/70 blur-2xl -z-10" />

            {/* Automatic 3D Flip Profile Card with Holographic Particle Typography */}
            <ProfileHolographicCard mousePos={mousePos} />

            {/* Floating Badge 1: AI / ML */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -top-6 -left-4 sm:-left-8 md:-left-10 lg:-left-20 glass-surface p-3.5 rounded-2xl shadow-card hidden sm:flex items-center gap-3 border border-cardBorder animate-float-slow transition-transform duration-300 ease-out z-30"
              style={{
                transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * 18}px, 0)`,
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-lightBlueCard flex items-center justify-center text-primaryRoyalBlue">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-headingNavy">AI / ML</p>
                <p className="text-[11px] text-secondaryText">Intelligent Solutions</p>
              </div>
            </motion.div>

            {/* Floating Badge 2: Full Stack */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute -bottom-6 -left-4 sm:-left-8 md:-left-10 lg:-left-20 glass-surface p-3.5 rounded-2xl shadow-card hidden sm:flex items-center gap-3 border border-cardBorder transition-transform duration-300 ease-out z-30"
              style={{
                transform: `translate3d(${mousePos.x * 14}px, ${mousePos.y * 14}px, 0)`,
                animationDelay: '1.5s',
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-lightBlueCard flex items-center justify-center text-primaryRoyalBlue">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-headingNavy">Full Stack</p>
                <p className="text-[11px] text-secondaryText">End-to-End Apps</p>
              </div>
            </motion.div>

            {/* Floating Badge 3: Data Science */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-4 md:-right-6 lg:-right-12 glass-surface p-3.5 rounded-2xl shadow-card hidden sm:flex items-center gap-3 border border-cardBorder transition-transform duration-300 ease-out z-30"
              style={{
                transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)`,
                animationDelay: '2.5s',
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-lightBlueCard flex items-center justify-center text-primaryRoyalBlue">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-headingNavy">Data Science</p>
                <p className="text-[11px] text-secondaryText">Data into Insights</p>
              </div>
            </motion.div>
          </motion.div>

        </div>


        {/* Scroll Indicator at bottom */}
        <div className="pt-4 pb-8 flex justify-center relative z-20">
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-surface text-xs font-semibold text-secondaryText hover:text-primaryRoyalBlue transition-colors shadow-soft-blue border border-cardBorder"
          >
            <span className="w-2 h-2 rounded-full bg-primaryRoyalBlue animate-bounce" />
            <span>Scroll to Explore</span>
          </a>
        </div>
      </div>
    </section>
  );
};
