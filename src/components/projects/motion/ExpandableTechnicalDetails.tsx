import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sliders, ShieldCheck, Cpu } from 'lucide-react';
import type { ProjectItem } from '../../../data/projects';

interface ExpandableTechnicalDetailsProps {
  project: ProjectItem;
  shouldReduceMotion: boolean;
}

const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const ExpandableTechnicalDetails: React.FC<ExpandableTechnicalDetailsProps> = ({
  project,
  shouldReduceMotion,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand();
    }
  };

  return (
    <div className="my-6 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
      {/* 20. Expandable Technical Details: Accessible Button & ARIA */}
      <button
        onClick={toggleExpand}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls="technical-deep-dive-panel"
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100/80 text-left transition-colors focus:outline-none focus:ring-1 focus:ring-primaryRoyalBlue"
      >
        <div className="flex items-center gap-2.5">
          <Sliders className="w-4 h-4 text-primaryRoyalBlue shrink-0" />
          <span className="font-bold text-headingNavy text-xs sm:text-sm">
            Deep-Dive Technical Specifications & Concurrency Blueprint
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
            {isExpanded ? 'Collapse Blueprint' : 'Expand Specifications'}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
          >
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </motion.div>
        </div>
      </button>

      {/* Smooth height and opacity animation */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id="technical-deep-dive-panel"
            initial={shouldReduceMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.35, ease: easeCurve }
            }
            className="overflow-hidden border-t border-slate-200"
          >
            <div className="p-4 sm:p-5 text-xs sm:text-sm text-slate-600 space-y-3 bg-slate-50/40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-white border border-slate-200 rounded">
                  <div className="flex items-center gap-2 font-bold text-headingNavy mb-1">
                    <Cpu className="w-3.5 h-3.5 text-primaryRoyalBlue" />
                    <span>Runtime & Memory Profile</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    Optimized for asynchronous event dispatching with lightweight memory bounds. Zero lingering background workers during idle execution.
                  </p>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded">
                  <div className="flex items-center gap-2 font-bold text-headingNavy mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Fault Isolation & Validation</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    Rigorous boundary validation on all external inputs, structured error handlers with automated fallback fallbacks, and defensive logging.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded text-xs leading-relaxed">
                <span className="font-semibold text-headingNavy">Implementation Note: </span>
                <span>{project.technicalImplementation.summary}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
