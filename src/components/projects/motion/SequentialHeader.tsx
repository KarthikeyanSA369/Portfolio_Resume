import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, ExternalLink } from 'lucide-react';
import type { ProjectItem } from '../../../data/projects';

interface SequentialHeaderProps {
  project: ProjectItem;
  shouldReduceMotion: boolean;
}

export const SequentialHeader: React.FC<SequentialHeaderProps> = ({
  project,
  shouldReduceMotion,
}) => {
  const navigate = useNavigate();

  // Words for word-by-word reveal (03)
  const titleWords = project.title.split(' ');

  // Easing curve 4-tuple
  const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

  // Sequence delays (02)
  const dBreadcrumb = shouldReduceMotion ? 0 : 0.05;
  const dCategory = shouldReduceMotion ? 0 : 0.12;
  const dTitle = shouldReduceMotion ? 0 : 0.18;
  const dSubtitle = shouldReduceMotion ? 0 : 0.28;
  const dMetadata = shouldReduceMotion ? 0 : 0.38;

  // Metadata rows array for individual stagger (04)
  const metadataRows = [
    {
      label: 'Project Type:',
      content: <span className="text-headingNavy font-medium">{project.projectType}</span>,
    },
    ...(project.duration
      ? [
          {
            label: 'Timeline / Status:',
            content: <span className="text-headingNavy font-medium">{project.duration}</span>,
          },
        ]
      : []),
    {
      label: 'Developed By:',
      content: <span className="text-headingNavy font-medium">Karthikeyan S A</span>,
    },
    {
      label: 'Core Technologies:',
      content: (
        <span className="text-headingNavy font-medium">
          {project.technologies.join(', ')}
        </span>
      ),
    },
    ...(project.repositoryUrl
      ? [
          {
            label: 'Source Repository:',
            content: (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-primaryRoyalBlue hover:underline inline-flex items-center gap-1.5 font-medium transition-colors"
              >
                <span className="break-all">{project.repositoryUrl}</span>
                {/* 24. Link Arrow Motion */}
                <ExternalLink className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            ),
          },
        ]
      : []),
    ...(project.liveUrl
      ? [
          {
            label: 'Live Demonstration:',
            content: (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-emerald-600 hover:underline inline-flex items-center gap-1.5 font-medium transition-colors"
              >
                <span className="break-all">{project.liveUrl}</span>
                {/* 24. Link Arrow Motion */}
                <ExternalLink className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      {/* 02. Sequential Item 1: Top Breadcrumb & Navigation Bar */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: dBreadcrumb, ease: easeCurve }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/90 text-xs"
      >
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-slate-500 flex-wrap">
          {/* 23. Breadcrumb Hover Motion */}
          <Link
            to="/"
            className="hover:text-primaryRoyalBlue hover:-translate-y-0.5 transition-all duration-150 font-medium inline-block"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link
            to="/#projects"
            className="hover:text-primaryRoyalBlue hover:-translate-y-0.5 transition-all duration-150 font-medium inline-block"
          >
            Projects
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-headingNavy truncate max-w-[200px] sm:max-w-none">
            {project.title}
          </span>
        </nav>

        <button
          onClick={() => navigate('/#projects')}
          className="group inline-flex items-center gap-1.5 text-primaryRoyalBlue hover:text-royalBlue-700 font-semibold transition-colors self-start sm:self-auto"
        >
          {/* 24. Link Arrow Motion */}
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Projects</span>
        </button>
      </motion.div>

      {/* Article Header Container with 05. Soft Focus Reveal */}
      <motion.header
        initial={
          shouldReduceMotion
            ? { opacity: 1, filter: 'blur(0px)' }
            : { opacity: 0, filter: 'blur(4px)' }
        }
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.45, ease: easeCurve }}
        className="mb-8 pb-6 border-b border-slate-200/90"
      >
        {/* 02. Sequential Item 2: Project Category Label */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: dCategory, ease: easeCurve }}
        >
          <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-600 mb-3 border border-slate-200/80 shadow-2xs">
            Software Engineering Case Study
          </span>
        </motion.div>

        {/* 02. Sequential Item 3 & 03. Word-by-Word Title Reveal */}
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-headingNavy tracking-tight flex flex-wrap"
          aria-label={project.title}
        >
          {titleWords.map((word, idx) => (
            <motion.span
              key={`${word}-${idx}`}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: dTitle + idx * (shouldReduceMotion ? 0 : 0.05),
                ease: easeCurve,
              }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* 02. Sequential Item 4: Project Subtitle & Tagline */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: dSubtitle, ease: easeCurve }}
        >
          <p className="text-base sm:text-lg font-semibold text-primaryRoyalBlue mt-1.5">
            {project.subtitle}
          </p>
          {project.tagline && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-mono">
              {project.tagline}
            </p>
          )}
        </motion.div>
      </motion.header>

      {/* 02. Sequential Item 5 & 04. Metadata Stagger: Technical Specification Table */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: dMetadata, ease: easeCurve }}
        className="my-6 border border-slate-200 rounded-lg overflow-hidden text-xs sm:text-sm shadow-xs"
      >
        <div className="bg-slate-50 px-4 py-2.5 font-bold text-headingNavy border-b border-slate-200 flex items-center justify-between">
          <span>Project Specifications & Metadata</span>
          <span className="text-[11px] font-normal text-slate-500">Karthikeyan S A · Engineering Registry</span>
        </div>
        <div className="divide-y divide-slate-200 bg-white">
          {metadataRows.map((row, idx) => (
            <motion.div
              key={row.label}
              initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: dMetadata + idx * (shouldReduceMotion ? 0 : 0.07),
                ease: easeCurve,
              }}
              className="grid grid-cols-1 sm:grid-cols-3 px-4 py-2.5 hover:bg-slate-50/50 transition-colors"
            >
              <span className="font-semibold text-slate-600">{row.label}</span>
              <span className="sm:col-span-2">{row.content}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};
