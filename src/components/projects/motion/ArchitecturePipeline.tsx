import React from 'react';
import { motion } from 'framer-motion';
import { Workflow } from 'lucide-react';
import type { ProjectItem } from '../../../data/projects';

interface ArchitecturePipelineProps {
  project: ProjectItem;
  shouldReduceMotion: boolean;
}

const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const ArchitecturePipeline: React.FC<ArchitecturePipelineProps> = ({
  project,
  shouldReduceMotion,
}) => {
  const workflow = project.architecture?.workflow || [];

  if (workflow.length === 0) return null;

  return (
    <div className="my-6 border border-slate-200 rounded-lg p-5 sm:p-6 bg-slate-50/80 shadow-2xs">
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-primaryRoyalBlue" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Progressive Architecture Data Pipeline
          </h4>
        </div>
        <span className="text-[11px] font-mono text-primaryRoyalBlue bg-primaryRoyalBlue/10 px-2 py-0.5 rounded font-semibold border border-primaryRoyalBlue/20">
          Sequential Execution
        </span>
      </div>

      {/* 16. Architecture Flow Animation: components animate in actual execution order */}
      <div className="relative space-y-4">
        {workflow.map((phase, idx) => {
          const isLast = idx === workflow.length - 1;
          const nodeDelay = shouldReduceMotion ? 0 : idx * 0.15;

          return (
            <div key={phase.step} className="relative">
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: nodeDelay, ease: easeCurve }}
                className="group relative flex flex-col sm:flex-row sm:items-start gap-3 p-3.5 rounded-lg bg-white border border-slate-200 hover:border-primaryRoyalBlue/50 transition-all duration-200 shadow-2xs"
              >
                {/* Node Step Badge & Icon */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-7 h-7 rounded-full bg-primaryRoyalBlue/10 text-primaryRoyalBlue font-mono font-bold text-xs flex items-center justify-center border border-primaryRoyalBlue/20">
                    {phase.step}
                  </span>
                  <span className="sm:hidden text-xs font-bold text-headingNavy">
                    Phase {phase.step}
                  </span>
                </div>

                {/* Node Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="font-bold text-headingNavy text-sm group-hover:text-primaryRoyalBlue transition-colors">
                      {phase.title}
                    </h5>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider hidden sm:inline">
                      Pipeline Stage {phase.step} of {workflow.length}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-1">
                    {phase.description}
                  </p>
                </div>
              </motion.div>

              {/* 17. Connection Line Drawing: SVG path animation connecting workflow nodes */}
              {!isLast && (
                <div className="relative w-full flex items-center justify-center my-1.5 h-6">
                  <svg
                    className="w-6 h-6 text-primaryRoyalBlue"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* Animated vertical SVG line */}
                    <motion.line
                      x1="12"
                      y1="0"
                      x2="12"
                      y2="18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="20"
                      initial={shouldReduceMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: 20 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: nodeDelay + 0.1, ease: 'easeOut' }}
                    />
                    {/* Arrow head */}
                    <motion.polyline
                      points="8,14 12,18 16,14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: nodeDelay + 0.25 }}
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
