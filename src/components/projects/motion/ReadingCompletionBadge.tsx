import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award } from 'lucide-react';

interface ReadingCompletionBadgeProps {
  isCompleted: boolean;
  shouldReduceMotion: boolean;
}

const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const ReadingCompletionBadge: React.FC<ReadingCompletionBadgeProps> = ({
  isCompleted,
  shouldReduceMotion,
}) => {
  if (!isCompleted) return null;

  return (
    // 25. Page Completion Animation: Restrained 100% completion verification effect, no confetti
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeCurve }}
      className="my-8 p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-blue-50/50 to-emerald-50 border border-emerald-200/90 text-headingNavy flex items-center justify-between gap-3 shadow-xs"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-300">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-headingNavy">
            Case Study Review Complete
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-600">
            You have reviewed all 11 technical sections of this engineering documentation.
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-emerald-200 text-emerald-700 text-xs font-semibold shrink-0">
        <Award className="w-3.5 h-3.5 text-emerald-600" />
        <span>100% Verified</span>
      </div>
    </motion.div>
  );
};
