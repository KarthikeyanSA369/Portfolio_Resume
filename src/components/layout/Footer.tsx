import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { navigationItems } from '../../data/navigation';
import { socialLinks } from '../../data/socialLinks';
import { personalInfo } from '../../data/personal';
import gmailLogo from '../../assets/gmail-logo.png';

const connectLinks = [
  {
    name: 'GitHub',
    url: socialLinks.github.url,
    logoUrl: socialLinks.github.logoUrl,
    alt: socialLinks.github.alt,
    ariaLabel: socialLinks.github.ariaLabel,
  },
  {
    name: 'Hugging Face',
    url: socialLinks.huggingFace.url,
    logoUrl: socialLinks.huggingFace.logoUrl,
    alt: socialLinks.huggingFace.alt,
    ariaLabel: socialLinks.huggingFace.ariaLabel,
  },
  {
    name: 'LeetCode',
    url: socialLinks.leetCode.url,
    logoUrl: socialLinks.leetCode.logoUrl,
    alt: socialLinks.leetCode.alt,
    ariaLabel: socialLinks.leetCode.ariaLabel,
  },
  {
    name: 'HackerRank',
    url: socialLinks.hackerRank.url,
    logoUrl: socialLinks.hackerRank.logoUrl,
    alt: socialLinks.hackerRank.alt,
    ariaLabel: socialLinks.hackerRank.ariaLabel,
  },
  {
    name: 'Gmail',
    url: socialLinks.gmail.url,
    logoUrl: gmailLogo,
    alt: socialLinks.gmail.alt,
    ariaLabel: socialLinks.gmail.ariaLabel,
  },
];

const ConnectItem: React.FC<{
  profile: (typeof connectLinks)[0];
}> = ({ profile }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <motion.a
      href={profile.url}
      target={profile.name === 'Gmail' ? '_self' : '_blank'}
      rel={profile.name === 'Gmail' ? undefined : 'noopener noreferrer'}
      aria-label={profile.ariaLabel}
      whileHover={{ x: 2, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between px-3 py-2 rounded-lg bg-lightBlueCard/50 border border-cardBorder hover:border-primaryRoyalBlue/40 hover:bg-white hover:shadow-xs transition-all group"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {profile.logoUrl && !imgError ? (
          <img
            src={profile.logoUrl}
            alt={profile.alt}
            className="w-4 h-4 object-contain shrink-0"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="w-4 h-4 rounded bg-lightBlueCard border border-cardBorder text-primaryRoyalBlue font-black text-[9px] flex items-center justify-center shrink-0">
            {profile.name.charAt(0)}
          </span>
        )}
        <span className="text-xs font-semibold text-headingNavy group-hover:text-primaryRoyalBlue transition-colors truncate">
          {profile.name}
        </span>
      </div>
      <ArrowUpRight className="w-3.5 h-3.5 text-secondaryText/60 group-hover:text-primaryRoyalBlue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1.5" />
    </motion.a>
  );
};

export const Footer: React.FC = () => {
  const currentYear = 2026;

  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-transparent pt-6 pb-8 sm:pt-10 sm:pb-10 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-cardBorder/70">
          
          {/* Column 1 – Brand Identity */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#home"
              className="inline-flex items-center gap-2.5 font-extrabold text-lg text-headingNavy hover:text-primaryRoyalBlue transition-colors tracking-tight group"
            >
              <span className="w-9 h-9 rounded-xl bg-lightBlueCard border border-cardBorder flex items-center justify-center text-primaryRoyalBlue font-sans font-black text-xs tracking-wider group-hover:bg-primaryRoyalBlue group-hover:text-white transition-all shadow-xs">
                SA
              </span>
              <span className="text-lg font-extrabold text-headingNavy group-hover:text-primaryRoyalBlue transition-colors">
                {personalInfo.fullName}
              </span>
            </motion.a>

            <p className="text-xs sm:text-sm font-semibold text-primaryRoyalBlue mt-2">
              {personalInfo.identity}
            </p>

            <p className="text-xs sm:text-sm text-secondaryText leading-relaxed mt-2.5 max-w-sm">
              {personalInfo.shortBio}
            </p>

            <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-lightBlueCard/70 border border-cardBorder text-xs text-secondaryText">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-headingNavy text-xs">
                Open to AI & Full Stack Opportunities
              </span>
            </div>
          </div>

          {/* Column 2 – Quick Navigation */}
          <div className="lg:col-span-4 flex flex-col">
            <h3 className="text-xs font-bold text-headingNavy uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primaryRoyalBlue" />
              Quick Navigation
            </h3>
            
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-secondaryText">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium hover:text-primaryRoyalBlue transition-colors py-0.5"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-primaryRoyalBlue group-hover:scale-125 transition-all" />
                  <span>{item.label}</span>
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Column 3 – Connect */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col">
            <h3 className="text-xs font-bold text-headingNavy uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primaryRoyalBlue" />
              Connect
            </h3>

            <div className="flex flex-col gap-2">
              {connectLinks.map((profile) => (
                <ConnectItem key={profile.name} profile={profile} />
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Credit Row */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-secondaryText">
          <p>© {currentYear} {personalInfo.fullName}. All rights reserved.</p>
          <p className="font-semibold text-headingNavy">
            Developed by Karthikeyan S A
          </p>
        </div>

      </div>
    </motion.footer>
  );
};
