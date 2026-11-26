import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Search, Filter } from 'lucide-react';
import { projects } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterOptions = [
    'All',
    'Python',
    'Flask',
    'FastAPI',
    'React',
    'JavaScript',
    'Machine Learning',
    'Automation'
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      activeFilter === 'All' ||
      project.category.some(c => c.toLowerCase() === activeFilter.toLowerCase()) ||
      project.technologies.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="pt-10 pb-16 sm:pt-12 sm:pb-20 bg-transparent relative overflow-hidden scroll-mt-20">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#EFF6FF]/80 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#DBEAFE]/40 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lightBlueCard border border-cardBorder text-primaryRoyalBlue text-xs font-semibold mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Technical Portfolio</span>
          </div>
          <h2 className="typo-section-heading mb-4">
            My <span className="text-primaryRoyalBlue">Projects</span>
          </h2>
          <p className="typo-section-subtitle max-w-2xl mx-auto">
            A collection of real-world projects built using modern technologies.
          </p>
        </motion.div>

        {/* Filter and Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-cardBorder"
        >
          
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-secondaryText flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5 text-primaryRoyalBlue" />
              <span>Filter:</span>
            </span>
            {filterOptions.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-primaryRoyalBlue text-white shadow-xs scale-105 border border-primaryRoyalBlue'
                    : 'bg-white text-secondaryText hover:text-headingNavy hover:bg-lightBlueCard border border-divider'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-mutedText absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-cardBorder text-xs text-primaryText placeholder:text-mutedText focus:outline-none focus:border-primaryRoyalBlue focus:ring-4 focus:ring-primaryRoyalBlue/10 transition-all shadow-xs"
            />
          </div>

        </motion.div>

        {/* 3-Column Desktop Grid (approx. 380px / card) / 2-Column Tablet / 1-Column Mobile with 24px gaps */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1240px] mx-auto items-stretch"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-cardBorder shadow-card">
            <p className="text-base font-semibold text-headingNavy mb-2">No projects match the selected criteria</p>
            <p className="text-xs text-secondaryText mb-4">Try clearing the search query or selecting "All" to view all 8 projects.</p>
            <button
              onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-primaryRoyalBlue text-white text-xs font-semibold shadow-xs hover:bg-btnBlueHover transition-colors border border-primaryRoyalBlue"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
