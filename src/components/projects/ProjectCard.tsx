import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Layers } from 'lucide-react';
import type { ProjectItem } from '../../data/projects';
import { TechIcon } from '../common/TechIcon';
import quickBrowseLogo from '../../assets/projects/quickbrowse-square.png';
import terminalBoardLogo from '../../assets/projects/terminalboard-logo.png';
import sihUlpinImg from '../../assets/projects/sih-3d-ulpin-preview.jpg';
import cleanifyImg from '../../assets/projects/cleanify-preview.webp';
import secureshareImg from '../../assets/projects/secureshare-preview.jpg';
import gmailAutomationImg from '../../assets/projects/gmail-automation-preview.png';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });

  // 08. 3D Project Card Tilt (Subtle desktop mouse responsive perspective tilt)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches)) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Restrained, elegant bounds (max ±6°)
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const renderVisual = () => {
    // Standardized square container styling for all project cards
    const baseContainer = "w-32 h-32 rounded-2xl border border-cardBorder overflow-hidden flex items-center justify-center shadow-xs mx-auto mb-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-card-hover group-hover:border-[#BACFFE]";

    // 1. QuickBrowse: Uploaded logo
    if (project.id === 'quickbrowse') {
      return (
        <motion.div
          layoutId={`project-image-${project.id}`}
          className={`${baseContainer} bg-gradient-to-tr from-[#EDF3FF] to-white p-2.5`}
        >
          <img
            src={quickBrowseLogo}
            alt={`${project.title} Logo`}
            className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
      );
    }

    // 2. Terminal Board: Uploaded logo (dark theme container)
    if (project.id === 'terminal-board') {
      return (
        <motion.div
          layoutId={`project-image-${project.id}`}
          className={`${baseContainer} bg-[#0F172A] p-2.5`}
        >
          <img
            src={terminalBoardLogo}
            alt={`${project.title} Logo`}
            className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
      );
    }

    // 3. SIH 3D ULPIN: 3D Cadastral Visualization Preview
    if (project.id === 'sih-3d-ulpin') {
      return (
        <motion.div
          layoutId={`project-image-${project.id}`}
          className={`${baseContainer} bg-white p-2`}
        >
          <img
            src={sihUlpinImg}
            alt={`${project.title} Preview`}
            className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
      );
    }

    // 4. Cleanify: Pip package preview
    if (project.id === 'cleanify') {
      return (
        <motion.div
          layoutId={`project-image-${project.id}`}
          className={`${baseContainer} bg-white p-2`}
        >
          <img
            src={cleanifyImg}
            alt={`${project.title} Preview`}
            className="w-full h-full object-contain object-center rounded-xl transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
      );
    }

    // 5. SecureShare: Post-quantum security architecture preview
    if (project.id === 'secureshare') {
      return (
        <motion.div
          layoutId={`project-image-${project.id}`}
          className={`${baseContainer} bg-white p-2`}
        >
          <img
            src={secureshareImg}
            alt={`${project.title} Preview`}
            className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
      );
    }

    // 6. Gmail Response Automation: n8n workflow preview
    if (project.id === 'gmail-response-automation') {
      return (
        <motion.div
          layoutId={`project-image-${project.id}`}
          className={`${baseContainer} bg-white p-2`}
        >
          <img
            src={gmailAutomationImg}
            alt={`${project.title} Preview`}
            className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
      );
    }

    // 7. Smart Report Alert System: Structured placeholder
    if (project.id === 'smart-report-alert') {
      return (
        <motion.div
          layoutId={`project-image-${project.id}`}
          className={`${baseContainer} bg-gradient-to-tr from-amber-500/10 via-orange-500/5 to-white flex flex-col items-center justify-center p-3 text-center`}
        >
          <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-cardBorder flex items-center justify-center text-amber-500 mb-1.5 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-headingNavy leading-tight line-clamp-1">Smart Report</span>
          <span className="text-[9px] text-mutedText font-medium mt-0.5">Inventory System</span>
        </motion.div>
      );
    }

    // 8. Tamil News Daily (and any other unlisted): Structured placeholder
    return (
      <motion.div
        layoutId={`project-image-${project.id}`}
        className={`${baseContainer} bg-gradient-to-tr from-purple-500/10 via-violet-500/5 to-white flex flex-col items-center justify-center p-3 text-center`}
      >
        <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-cardBorder flex items-center justify-center text-purple-600 mb-1.5 shrink-0">
          <Layers className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-bold text-headingNavy leading-tight line-clamp-1">{project.title}</span>
        <span className="text-[9px] text-mutedText font-medium mt-0.5">{project.subtitle}</span>
      </motion.div>
    );
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      whileHover={{ y: -6 }}
      layoutId={`project-card-${project.id}`}
      className="project-card w-full h-full min-h-[300px] p-6 sm:p-7 rounded-3xl bg-white border border-cardBorder shadow-card hover:shadow-card-hover hover:border-[#BACFFE] transition-all duration-300 flex flex-col justify-between group"
    >
      <div className="flex flex-col flex-1">
        {/* Clickable Image Preview navigating to project detail page */}
        <Link
          to={`/projects/${project.slug}`}
          className="block cursor-pointer focus:outline-none transition-transform group-hover:opacity-95"
          title={`View ${project.title} detail page`}
        >
          {renderVisual()}
        </Link>

        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            {/* Clickable Project Title */}
            <h3 className="typo-card-title text-headingNavy group-hover:text-primaryRoyalBlue transition-colors line-clamp-1">
              <Link to={`/projects/${project.slug}`} className="hover:underline">
                {project.title}
              </Link>
            </h3>
            <span className="text-[10px] font-semibold text-primaryRoyalBlue bg-lightBlueCard px-2 py-0.5 rounded-full shrink-0 border border-cardBorder">
              {project.category[0]}
            </span>
          </div>

          <p className="text-xs text-primaryRoyalBlue font-semibold mb-2 line-clamp-1">
            {project.subtitle}
          </p>

          <p className="typo-secondary-text leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondaryCardBg border border-cardBorder text-headingNavy inline-flex items-center gap-1.5 shadow-2xs hover:border-primaryRoyalBlue/40 hover:bg-white hover:scale-105 transition-all duration-200 cursor-default"
            >
              <TechIcon name={tech} className="w-3 h-3" />
              <span>{tech}</span>
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-lightBlueCard text-primaryRoyalBlue border border-cardBorder">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      <div className="pt-3.5 border-t border-cardBorder/70 flex items-center justify-between gap-2 mt-auto">
        {/* Primary Action Button */}
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primaryRoyalBlue text-white text-xs font-semibold hover:bg-btnBlueHover transition-all shadow-xs border border-primaryRoyalBlue group/btn"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>

        {/* Secondary Action: External Live / Code Link */}
        {project.repositoryUrl ? (
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-secondaryText hover:text-primaryRoyalBlue hover:bg-lightBlueCard border border-transparent hover:border-cardBorder transition-colors"
            title="View Source Repository"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <span className="text-[10px] font-medium text-mutedText px-2 py-0.5 bg-secondaryCardBg rounded border border-cardBorder/60">
            Internal
          </span>
        )}
      </div>
    </motion.div>
  );
};
