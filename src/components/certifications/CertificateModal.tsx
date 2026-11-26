import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Award, Bookmark, Lightbulb } from 'lucide-react';
import type { CertificationItem } from '../../data/certifications';

interface CertificateModalProps {
  doc: CertificationItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ doc, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (doc) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [doc, onClose]);

  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          key="certificate-modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
        >
          {/* Backdrop with smooth blur and fade */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-[#172554]/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Card with subtle scale & opacity transition (13. Certificate Preview Animation) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative z-10 w-full max-w-xl bg-white border border-cardBorder rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-secondaryCardBg border border-cardBorder hover:bg-lightBlueCard text-secondaryText hover:text-headingNavy flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryRoyalBlue"
              aria-label="Close certificate preview"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with Issuer Logo & Type */}
            <div className="flex items-center gap-4 mb-5 pr-8">
              <div className={`w-14 h-14 rounded-2xl border border-cardBorder flex items-center justify-center shrink-0 shadow-xs overflow-hidden ${
                doc.issuer?.toLowerCase().includes('grapinz') ? 'bg-[#031718] p-0' : 'bg-white p-2'
              }`}>
                {doc.logoUrl ? (
                  <img
                    src={doc.logoUrl}
                    alt={`${doc.issuer} logo`}
                    className={`w-full h-full ${
                      doc.issuer?.toLowerCase().includes('grapinz') ? 'object-cover' : 'object-contain'
                    }`}
                  />
                ) : doc.docType === 'Patent Application' ? (
                  <Lightbulb className="w-6 h-6 text-amber-600" />
                ) : doc.docType === 'Research Publication' ? (
                  <Bookmark className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Award className="w-6 h-6 text-primaryRoyalBlue" />
                )}
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primaryRoyalBlue block mb-0.5">
                  {doc.typeBadge}
                </span>
                <p className="text-xs font-semibold text-headingNavy">{doc.issuer}</p>
                {doc.gradeBadge && (
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-lightBlueCard text-primaryRoyalBlue border border-cardBorder">
                    {doc.gradeBadge}
                  </span>
                )}
              </div>
            </div>

            {/* Document Title */}
            <h3 id="certificate-modal-title" className="text-lg sm:text-xl font-extrabold text-headingNavy mb-3 leading-snug">
              {doc.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-secondaryText leading-relaxed mb-5">
              {doc.description}
            </p>

            {/* Date and Tags */}
            <div className="space-y-3 mb-6 p-4 rounded-2xl bg-secondaryCardBg border border-cardBorder/80">
              {doc.date && (
                <div className="flex items-center gap-2 text-xs text-secondaryText">
                  <Calendar className="w-4 h-4 text-primaryRoyalBlue shrink-0" />
                  <span className="font-semibold text-headingNavy">Issued / Active Date:</span>
                  <span>{doc.date}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {doc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-white border border-cardBorder text-headingNavy shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions: View on Google Drive & Close */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-cardBorder">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-divider text-headingNavy hover:bg-secondaryCardBg text-xs font-semibold transition-colors"
              >
                Close Preview
              </button>

              <a
                href={doc.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primaryRoyalBlue text-white text-xs font-semibold hover:bg-btnBlueHover transition-all shadow-xs"
              >
                <span>Open in Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};