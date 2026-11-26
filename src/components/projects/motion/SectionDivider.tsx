import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  shouldReduceMotion?: boolean;
  className?: string;
}

const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SectionDivider: React.FC<SectionDividerProps> = ({
  shouldReduceMotion = false,
  className = '',
}) => {
  return (
    <div className={`w-full overflow-hidden my-4 ${className}`}>
      {/* 07. Section Divider Draw: left-to-right reveal when entering viewport */}
      <motion.div
        initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.55, ease: easeCurve }
        }
        style={{ transformOrigin: '0% 50%' }}
        className="h-[1.5px] w-full bg-gradient-to-r from-primaryRoyalBlue/70 via-slate-300 to-transparent"
      />
    </div>
  );
};
