import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ReadingProgressIndicatorProps {
  progress: number; // 0 to 1
  scrollDirection: 'up' | 'down' | 'idle';
  shouldReduceMotion: boolean;
}

export const ReadingProgressIndicator: React.FC<ReadingProgressIndicatorProps> = ({
  progress,
  scrollDirection,
  shouldReduceMotion,
}) => {
  const percent = Math.round(progress * 100);
  const showDirectionIndicator = progress > 0.01 && progress < 0.99;

  return (
    <>
      {/* 08. Reading Progress Bar: Fixed, thin progress indicator at top */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-slate-200/70 z-50 overflow-hidden"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Documentation reading progress"
      >
        <motion.div
          className="h-full bg-primaryRoyalBlue origin-left"
          style={{
            transform: `scaleX(${progress})`,
            transformOrigin: '0% 50%',
          }}
          transition={shouldReduceMotion ? { duration: 0 } : { ease: 'linear', duration: 0.1 }}
        />
      </div>

      {/* 09. Scroll Direction Indicator: Minimal, restrained directional feedback */}
      <AnimatePresence>
        {showDirectionIndicator && !shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 right-4 sm:right-8 z-40 pointer-events-none flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-md text-[11px] font-medium text-slate-700"
          >
            <span className="w-2 h-2 rounded-full bg-primaryRoyalBlue animate-pulse shrink-0" />
            <span className="font-mono text-headingNavy font-bold">{percent}%</span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-slate-600 font-semibold">
              {scrollDirection === 'up' ? (
                <>
                  <span>Returning</span>
                  <ChevronUp className="w-3.5 h-3.5 text-primaryRoyalBlue shrink-0 stroke-[2.5]" />
                </>
              ) : (
                <>
                  <span>Reading</span>
                  <ChevronDown className="w-3.5 h-3.5 text-primaryRoyalBlue shrink-0 stroke-[2.5]" />
                </>
              )}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
