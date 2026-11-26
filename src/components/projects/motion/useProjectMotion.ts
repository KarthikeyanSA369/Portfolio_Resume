import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface TocSection {
  id: string;
  title: string;
}

export function useProjectMotion(
  slug: string | undefined,
  tocSections: TocSection[],
  articleRef: React.RefObject<HTMLElement | null>
) {
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'idle'>('idle');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  
  const lastScrollYRef = useRef<number>(0);
  const isClickScrollingRef = useRef<boolean>(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset state when project slug changes
  useEffect(() => {
    setActiveSection('overview');
    setReadingProgress(0);
    setIsCompleted(false);
    setShowBackToTop(false);
    lastScrollYRef.current = 0;
  }, [slug]);

  // Unified scroll & progress tracking with requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const prevScrollY = lastScrollYRef.current;
        const delta = currentScrollY - prevScrollY;

        // Detect scroll direction (with 4px threshold to ignore micro-jitters)
        if (Math.abs(delta) > 4) {
          setScrollDirection(delta > 0 ? 'down' : 'up');
        }
        lastScrollYRef.current = currentScrollY;

        // Back-to-top visibility
        setShowBackToTop(currentScrollY > 350);

        // Calculate reading progress against article
        const article = articleRef.current;
        if (article) {
          const rect = article.getBoundingClientRect();
          const navbarHeight = 80;
          const articleTop = rect.top + currentScrollY;
          const articleHeight = rect.height;
          const viewportHeight = window.innerHeight;

          const scrollableDistance = articleHeight - (viewportHeight - navbarHeight);
          if (scrollableDistance > 0) {
            const scrolledIntoArticle = currentScrollY + navbarHeight - articleTop;
            const rawProgress = scrolledIntoArticle / scrollableDistance;
            const clamped = Math.min(Math.max(rawProgress, 0), 1);
            setReadingProgress(clamped);

            if (clamped >= 0.98) {
              setIsCompleted(true);
            }
          }
        }

        // Active TOC Section Detection (if not currently handling smooth click scroll)
        if (!isClickScrollingRef.current) {
          const offset = 180;
          for (let i = tocSections.length - 1; i >= 0; i--) {
            const el = document.getElementById(tocSections[i].id);
            if (el && el.offsetTop - offset <= currentScrollY) {
              setActiveSection(tocSections[i].id);
              break;
            }
          }
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [slug, tocSections, articleRef]);

  // Smooth scroll to section
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      isClickScrollingRef.current = true;
      setActiveSection(id);

      const offset = 100;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 800);
    }
  }, []);

  // Smooth scroll back to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    shouldReduceMotion: !!shouldReduceMotion,
    activeSection,
    readingProgress,
    scrollDirection,
    showBackToTop,
    isCompleted,
    scrollToSection,
    scrollToTop,
  };
}
