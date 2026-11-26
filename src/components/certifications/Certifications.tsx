import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, FileText, CheckCircle2, Trophy, Bookmark, Lightbulb, ChevronDown, Eye } from 'lucide-react';
import { certificationsData, achievementsData } from '../../data/certifications';
import type { CertificationItem } from '../../data/certifications';
import { CertificateModal } from './CertificateModal';

export const Certifications: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<CertificationItem | null>(null);
  const [expandedAchievement, setExpandedAchievement] = useState<string | null>(null);

  const toggleAchievement = (title: string) => {
    setExpandedAchievement((prev) => (prev === title ? null : title));
  };
  return (
    <section id="certifications" className="py-16 sm:py-20 bg-transparent relative overflow-hidden scroll-mt-20">
      
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#DBEAFE]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lightBlueCard border border-cardBorder text-primaryRoyalBlue text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Publications</span>
          </div>
          <h2 className="typo-section-heading mb-4">
            Certifications & <span className="text-primaryRoyalBlue">Achievements</span>
          </h2>
          <p className="typo-section-subtitle max-w-2xl mx-auto">
            My certified learnings, industrial training, published research, patent applications, and key accomplishments.
          </p>
        </div>

        {/* 1. DOCUMENT GALLERY: 2-COLUMN GRID (Clean White Cards #FFFFFF) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-cardBorder">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primaryRoyalBlue" />
              <h3 className="typo-card-heading">Verified Documents & Certifications</h3>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-lightBlueCard text-primaryRoyalBlue border border-cardBorder">
              Total: {certificationsData.length} Documents
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1240px] mx-auto items-stretch">
            {certificationsData.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="certificate-card w-full h-full min-h-[300px] p-6 sm:p-7 rounded-3xl bg-white border border-cardBorder shadow-card hover:shadow-card-hover hover:border-[#BACFFE] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex flex-col flex-1">
                  {/* Top Meta Row */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {/* Standardized Organization Logo Container (56x56 px) */}
                      <div className={`w-14 h-14 min-w-[56px] min-h-[56px] rounded-xl border border-cardBorder flex items-center justify-center shrink-0 shadow-xs overflow-hidden ${
                        doc.issuer?.toLowerCase().includes('grapinz') ? 'bg-[#031718] p-0' : 'bg-white p-1.5'
                      }`}>
                        {doc.logoUrl ? (
                          <img
                            src={doc.logoUrl}
                            alt={`${doc.issuer} logo`}
                            className={`w-full h-full ${
                              doc.issuer?.toLowerCase().includes('grapinz')
                                ? 'object-cover object-center'
                                : 'object-contain object-center'
                            }`}
                          />
                        ) : doc.docType === 'Patent Application' ? (
                          <div className="w-full h-full rounded-lg bg-amber-50 flex items-center justify-center">
                            <Lightbulb className="w-6 h-6 text-amber-600" />
                          </div>
                        ) : doc.docType === 'Research Publication' ? (
                          <div className="w-full h-full rounded-lg bg-emerald-50 flex items-center justify-center">
                            <Bookmark className="w-6 h-6 text-emerald-600" />
                          </div>
                        ) : (
                          <div className="w-full h-full rounded-lg bg-lightBlueCard flex items-center justify-center">
                            <Award className="w-6 h-6 text-primaryRoyalBlue" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primaryRoyalBlue">
                          {doc.typeBadge}
                        </span>
                        <p className="text-xs text-secondaryText font-medium">
                          {doc.issuer}
                        </p>
                      </div>
                    </div>

                    {/* Grade or Status Badge */}
                    {doc.gradeBadge && (
                      <span className="px-2.5 py-1 rounded-lg bg-lightBlueCard text-primaryRoyalBlue text-xs font-bold border border-cardBorder shrink-0">
                        {doc.gradeBadge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="typo-card-title text-headingNavy mb-2 group-hover:text-primaryRoyalBlue transition-colors line-clamp-2">
                    {doc.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-secondaryText leading-relaxed mb-4 line-clamp-2">
                    {doc.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                    {doc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondaryCardBg border border-cardBorder text-headingNavy"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Row (Primary Button: #1763E8, hover #1254CE) */}
                <div className="pt-4 border-t border-cardBorder/70 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-xs text-secondaryText">
                    {doc.date && (
                      <>
                        <Calendar className="w-3.5 h-3.5 text-primaryRoyalBlue" />
                        <span>{doc.date}</span>
                      </>
                    )}
                  </div>

                  {/* 13. Certificate Preview Animation: Preview & Drive Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="p-1.5 rounded-lg text-secondaryText hover:text-primaryRoyalBlue hover:bg-lightBlueCard transition-colors"
                      title="Quick Preview Certificate"
                      aria-label={`Quick Preview ${doc.title}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a
                      href={doc.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primaryRoyalBlue text-white text-xs font-semibold hover:bg-btnBlueHover transition-colors shadow-xs border border-primaryRoyalBlue"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Document</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. ACHIEVEMENTS SECTION (Clean White Cards #FFFFFF) */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-cardBorder/80">
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-cardBorder">
            <Trophy className="w-5 h-5 text-primaryRoyalBlue" />
            <h3 className="typo-card-heading">Key Milestones & Achievements</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-start">
            {achievementsData.map((item, idx) => {
              const isExpanded = expandedAchievement === item.title;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`bg-white border rounded-2xl p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between cursor-pointer ${
                    isExpanded ? 'border-primaryRoyalBlue ring-2 ring-primaryRoyalBlue/15' : 'border-cardBorder hover:border-[#BACFFE]'
                  }`}
                  onClick={() => toggleAchievement(item.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleAchievement(item.title);
                    }
                  }}
                  aria-expanded={isExpanded}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-lightBlueCard text-primaryRoyalBlue flex items-center justify-center font-bold">
                        <CheckCircle2 className="w-4.5 h-4.5" />
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-mutedText transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-primaryRoyalBlue' : ''
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-primaryRoyalBlue uppercase tracking-wider block mb-1">
                      {item.badge}
                    </span>
                    <h4 className="text-sm font-bold text-headingNavy mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-secondaryText leading-relaxed">
                      {item.description}
                    </p>

                    {/* 12. Achievement Expand Animation: Smooth height & opacity accordion */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="overflow-hidden pt-3 mt-3 border-t border-cardBorder/60"
                        >
                          <div className="p-2.5 rounded-xl bg-lightBlueCard/60 border border-cardBorder/80 text-[11px] text-headingNavy font-medium">
                            <span className="text-primaryRoyalBlue font-bold block mb-1">Key Takeaway</span>
                            Demonstrates verified hands-on proficiency, peer-reviewed rigor, and sustained engineering excellence.
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 13. Certificate Preview Modal */}
        <CertificateModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />

      </div>
    </section>
  );
};
