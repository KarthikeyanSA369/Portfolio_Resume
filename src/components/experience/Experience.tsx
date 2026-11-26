import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  ExternalLink,
  Code2,
  Monitor,
  Cpu,
  FileJson,
  Bug,
  Sparkles,
  Layers,
} from 'lucide-react';
import { experienceData, type PracticalWorkItem } from '../../data/experience';
import { TechIcon } from '../common/TechIcon';

const workIconMap: Record<
  PracticalWorkItem['iconName'],
  React.ComponentType<{ className?: string }>
> = {
  Code2,
  Monitor,
  Cpu,
  FileJson,
  Bug,
  Sparkles,
};

export const Experience: React.FC = () => {
  const exp = experienceData;

  return (
    <section
      id="experience"
      className="relative w-full min-w-0 overflow-x-clip bg-transparent py-12 scroll-mt-24 sm:py-14 lg:py-16"
    >
      {/* Decorative accents are isolated from the content layout. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-1/4 -z-0 h-72 w-72 rounded-full bg-[#EFF6FF]/70 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 left-1/4 -z-0 h-64 w-64 rounded-full bg-[#DBEAFE]/30 blur-2xl sm:h-80 sm:w-80"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 w-full max-w-3xl min-w-0 text-center sm:mb-10 lg:mb-12"
        >
          <div className="mb-3 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-cardBorder bg-lightBlueCard px-3.5 py-1.5 text-xs font-semibold text-primaryRoyalBlue shadow-xs">
            <Briefcase aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            <span>Industrial Experience</span>
          </div>
          <h2 className="typo-section-heading mb-3 break-words">
            Internship &amp; Practical{' '}
            <span className="text-primaryRoyalBlue">Experience</span>
          </h2>
          <p className="typo-section-subtitle mx-auto max-w-2xl break-words">
            Practical application development and software engineering training focused on Python,
            desktop system integration, and software workflows.
          </p>
        </motion.div>

        {/* Main experience card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full min-w-0 rounded-2xl border border-cardBorder bg-white p-4 shadow-card sm:rounded-3xl sm:p-6 md:p-8 lg:p-9 xl:p-10"
        >
          {/* 1. Experience header */}
          <div className="grid min-w-0 grid-cols-1 gap-5 border-b border-cardBorder pb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-6 lg:pb-7">
            <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-cardBorder bg-[#031718] shadow-xs sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]">
                <img
                  src={exp.logo}
                  alt={`${exp.organization} logo`}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
                    <span className="break-words">{exp.status}</span>
                  </span>
                  <span className="break-words text-xs font-semibold text-secondaryText">
                    {exp.schedule}
                  </span>
                </div>

                <h3 className="typo-card-heading min-w-0 break-words tracking-tight">
                  {exp.organization}
                </h3>
                <p className="mt-1 break-words text-sm font-semibold text-primaryRoyalBlue">
                  {exp.role}
                </p>
              </div>
            </div>

            {/* Date and location badges wrap instead of forcing the header wider. */}
            <div className="flex min-w-0 flex-wrap items-start gap-2 text-xs text-secondaryText sm:text-sm lg:max-w-[440px] lg:justify-end">
              <div className="flex min-w-0 max-w-full items-start gap-2 rounded-xl border border-cardBorder bg-secondaryCardBg px-3 py-2.5 sm:px-4">
                <Calendar aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primaryRoyalBlue" />
                <span className="min-w-0 break-words font-semibold text-headingNavy">
                  {exp.duration}
                </span>
              </div>
              <div
                className="flex min-w-0 max-w-full items-start gap-2 rounded-xl border border-cardBorder bg-secondaryCardBg px-3 py-2.5 sm:px-4"
                title={exp.fullLocation}
              >
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primaryRoyalBlue" />
                <span className="min-w-0 break-words">{exp.location}</span>
              </div>
            </div>
          </div>

          {/* 2. Internship overview */}
          <div className="my-6 min-w-0 rounded-2xl border border-cardBorder/90 bg-[#F8FAFC] p-4 sm:my-7 sm:p-5 lg:p-6">
            <div className="mb-2 flex min-w-0 flex-wrap items-center justify-between gap-2">
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primaryRoyalBlue">
                <Clock aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                <span>Internship Overview</span>
              </h4>
              <span className="max-w-full break-words rounded-md border border-cardBorder bg-white px-2.5 py-0.5 text-[11px] font-semibold text-secondaryText">
                {exp.programNature}
              </span>
            </div>
            <p className="break-words text-sm leading-relaxed text-secondaryText sm:text-base">
              {exp.overview}
            </p>
            <div className="mt-3.5 flex min-w-0 flex-wrap items-start gap-x-4 gap-y-2 border-t border-cardBorder/60 pt-3 text-xs text-secondaryText">
              <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-headingNavy">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-primaryRoyalBlue" />
                Training Location:
              </span>
              <span className="min-w-0 break-words">{exp.fullLocation}</span>
            </div>
          </div>

          {/* 3. Project experience */}
          <div className="mb-8 min-w-0 rounded-2xl border border-cardBorder bg-gradient-to-tr from-[#F8FAFD] via-white to-lightBlueCard/30 p-4 shadow-xs sm:mb-9 sm:p-6 lg:p-7">
            <div className="mb-3 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4">
              <div className="min-w-0">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-primaryRoyalBlue">
                  Project Experience
                </span>
                <h4 className="break-words text-lg font-extrabold text-headingNavy sm:text-xl">
                  {exp.project.title}
                </h4>
              </div>

              <Link
                to={`/projects/${exp.project.slug}`}
                className="group inline-flex w-fit max-w-full shrink-0 items-center gap-2 rounded-xl bg-primaryRoyalBlue px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-btnBlueHover hover:shadow-card-hover sm:text-sm"
              >
                <span>View Project</span>
                <ExternalLink
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            <p className="mb-5 break-words text-sm leading-relaxed text-secondaryText sm:text-base">
              {exp.project.description}
            </p>

            <div className="min-w-0">
              <span className="mb-2.5 block text-xs font-semibold text-headingNavy">
                Technologies Used:
              </span>
              <div className="flex min-w-0 flex-wrap gap-2">
                {exp.project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-lg border border-cardBorder bg-white px-3 py-1 text-xs font-semibold text-headingNavy shadow-2xs transition-colors hover:border-primaryRoyalBlue/40"
                  >
                    <TechIcon name={tech} className="h-3.5 w-3.5 shrink-0" />
                    <span className="break-words">{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Practical work and learning */}
          <div className="min-w-0 pt-1">
            <div className="mb-5 min-w-0 sm:mb-6">
              <h4 className="flex min-w-0 items-center gap-2 break-words text-sm font-bold uppercase tracking-wider text-headingNavy sm:text-base">
                <Layers aria-hidden="true" className="h-4 w-4 shrink-0 text-primaryRoyalBlue" />
                <span>Practical Work &amp; Learning</span>
              </h4>
              <p className="mt-1 break-words text-xs text-secondaryText sm:text-sm">
                Core technical domains and competencies practiced throughout the internship program.
              </p>
            </div>

            <div className="grid min-w-0 grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 xl:gap-5">
              {exp.practicalWork.map((item, idx) => {
                const IconComponent = workIconMap[item.iconName] || Code2;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.35, delay: Math.min(idx * 0.06, 0.24), ease: 'easeOut' }}
                    className="group flex h-full min-w-0 flex-col rounded-2xl border border-cardBorder bg-white p-4 transition-all duration-300 hover:border-primaryRoyalBlue/40 hover:bg-white hover:shadow-card-hover sm:bg-secondaryCardBg/50 sm:p-5"
                  >
                    <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cardBorder bg-lightBlueCard text-primaryRoyalBlue shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-primaryRoyalBlue group-hover:text-white sm:mb-4 sm:h-11 sm:w-11">
                      <IconComponent aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <h5 className="mb-2 min-w-0 break-words text-base font-bold text-headingNavy transition-colors group-hover:text-primaryRoyalBlue">
                      {item.title}
                    </h5>
                    <p className="min-w-0 break-words text-sm leading-relaxed text-secondaryText">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 5. Learning outcome */}
          <div className="mt-8 flex min-w-0 flex-col items-start gap-3 rounded-2xl border border-primaryRoyalBlue/20 bg-gradient-to-r from-lightBlueCard/70 via-white to-lightBlueCard/40 p-4 shadow-xs sm:mt-9 sm:flex-row sm:items-center sm:gap-4 sm:p-5 lg:p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primaryRoyalBlue/20 bg-primaryRoyalBlue/10 text-primaryRoyalBlue">
              <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="mb-0.5 block text-[11px] font-bold uppercase tracking-wider text-primaryRoyalBlue">
                Learning Outcome
              </span>
              <p className="break-words text-sm font-semibold leading-relaxed text-headingNavy sm:text-base">
                &ldquo;{exp.learningOutcome}&rdquo;
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
