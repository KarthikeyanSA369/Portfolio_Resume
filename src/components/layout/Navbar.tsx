import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ExternalLink, Download } from 'lucide-react';
import { navigationItems } from '../../data/navigation';
import { socialLinks } from '../../data/socialLinks';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    // Only run scroll-spy on the home route
    if (location.pathname !== '/') {
      return;
    }

    const sectionIds = navigationItems.map(item => item.href.substring(1));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (isNavigatingRef.current) return;

      // 1. When near top of page, always highlight home
      if (scrollY < 120) {
        if (activeSection !== 'home') {
          setActiveSection('home');
          if (window.location.hash && window.location.hash !== '#home') {
            window.history.replaceState(null, '', '#home');
          }
        }
        return;
      }

      // 2. When scrolled to the bottom of page, highlight contact
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 80) {
        if (activeSection !== 'contact') {
          setActiveSection('contact');
          window.history.replaceState(null, '', '#contact');
        }
        return;
      }

      // 3. Find the currently active section by trigger line (navbar offset)
      const triggerOffset = 110;
      let matchedSection = 'home';

      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerOffset) {
            matchedSection = sectionIds[i];
          }
        }
      }

      if (matchedSection && matchedSection !== activeSection) {
        setActiveSection(matchedSection);
        if (window.location.hash !== `#${matchedSection}`) {
          window.history.replaceState(null, '', `#${matchedSection}`);
        }
      }
    };

    const handleHashSync = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (sectionIds.includes(hash)) {
        setActiveSection(hash);
        const el = document.getElementById(hash);
        if (el) {
          if (hash === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const navbarHeight = 75;
            const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: elementPosition - navbarHeight,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handleHashSync);
    window.addEventListener('hashchange', handleHashSync);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleHashSync);
      window.removeEventListener('hashchange', handleHashSync);
    };
  }, [location.pathname, activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      
      if (location.pathname === '/') {
        e.preventDefault();
        isNavigatingRef.current = true;
        setActiveSection(sectionId);
        window.history.pushState(null, '', href);

        const el = document.getElementById(sectionId);
        if (el) {
          if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const navbarHeight = 75;
            const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: elementPosition - navbarHeight,
              behavior: 'smooth'
            });
          }
        }
        setMobileMenuOpen(false);

        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 850);
      } else {
        // Navigate from project detail page to home anchor
        e.preventDefault();
        navigate(`/${href}`);
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-cardBorder shadow-soft-blue py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Name Logo with Geometric SA Monogram (17. Navigation Micro-Interactions) */}
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          href={location.pathname === '/' ? '#home' : '/#home'}
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 group text-headingNavy hover:text-primaryRoyalBlue transition-colors font-bold text-lg tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryRoyalBlue rounded-xl p-0.5"
        >
          <span className="w-8 h-8 rounded-lg bg-lightBlueCard border border-cardBorder flex items-center justify-center text-[#4A78E0] font-sans font-black text-xs tracking-wider group-hover:bg-[#4A78E0] group-hover:text-white transition-all shadow-xs">
            SA
          </span>
          <span>Karthikeyan S A</span>
        </motion.a>

        {/* Desktop Navigation Links (17. Gliding Active Pill Transition) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-cardBorder shadow-sm relative">
          {navigationItems.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            const fullHref = location.pathname === '/' ? item.href : `/${item.href}`;
            return (
              <a
                key={item.label}
                href={fullHref}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3.5 py-1.5 rounded-full typo-navigation transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryRoyalBlue ${
                  isActive
                    ? 'text-white'
                    : 'text-secondaryText hover:text-headingNavy hover:bg-lightBlueCard'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-primaryRoyalBlue rounded-full shadow-xs -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action: Resume Button with micro-interaction (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href={socialLinks.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primaryRoyalBlue text-white text-xs font-semibold shadow-xs hover:bg-btnBlueHover transition-all border border-primaryRoyalBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryRoyalBlue"
          >
            <span>Resume</span>
            <Download className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        {/* Mobile & Tablet Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={socialLinks.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-primaryRoyalBlue text-white text-xs font-semibold border border-primaryRoyalBlue"
          >
            Resume
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl bg-white border border-cardBorder text-headingNavy hover:text-primaryRoyalBlue hover:bg-lightBlueCard focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryRoyalBlue"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-cardBorder px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1.5">
            {navigationItems.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-lightBlueCard text-primaryRoyalBlue font-bold'
                      : 'text-secondaryText hover:bg-mainPageBg hover:text-headingNavy'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primaryRoyalBlue" />}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-cardBorder">
              <a
                href={socialLinks.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primaryRoyalBlue text-white font-semibold text-sm shadow-sm hover:bg-btnBlueHover border border-primaryRoyalBlue"
              >
                <span>View Full Resume (Drive)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
