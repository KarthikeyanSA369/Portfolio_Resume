import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface BackToTopButtonProps {
  show: boolean;
  onClick: () => void;
  shouldReduceMotion: boolean;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  show,
  onClick,
  shouldReduceMotion,
}) => {
  return (
    // 22. Back-to-Top Animation: Appears smoothly after scrolling, smooth return, keyboard accessible
    <AnimatePresence>
      {show && (
        <motion.button
          initial={
            shouldReduceMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.8, y: 12 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.8, y: 12 }
          }
          whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
          onClick={onClick}
          aria-label="Scroll back to top of document"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primaryRoyalBlue text-white shadow-lg shadow-primaryRoyalBlue/30 hover:bg-royalBlue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primaryRoyalBlue focus:ring-offset-2 flex items-center justify-center cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
