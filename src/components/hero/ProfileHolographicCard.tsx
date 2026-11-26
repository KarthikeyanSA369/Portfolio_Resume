import React, { useEffect, useRef, useState } from 'react';
import { Code, Flame, Trophy, ShieldCheck } from 'lucide-react';
import portraitPhoto from '../../assets/hero/karthikeyan-portrait.jpg';

interface ProfileHolographicCardProps {
  className?: string;
  mousePos?: { x: number; y: number };
  onFlipToggleRef?: React.MutableRefObject<(() => void) | null>;
}

// Configurable Developer Statistics
export interface DeveloperStatisticsConfig {
  stat1: {
    target: number;
    suffix: string;
    label: string;
  };
  stat2: {
    target: number;
    suffix: string;
    label: string;
  };
  stat3: {
    value: string;
    label: string;
  };
}

export const DEFAULT_DEVELOPER_STATISTICS: DeveloperStatisticsConfig = {
  stat1: {
    target: 100,
    suffix: '+',
    label: 'LeetCode Problems Solved',
  },
  stat2: {
    target: 50,
    suffix: '+',
    label: 'Days Continuous LeetCode Streak',
  },
  stat3: {
    value: 'Active',
    label: 'Competitive Programmer',
  },
};

export const ProfileHolographicCard: React.FC<ProfileHolographicCardProps> = ({
  className = '',
  mousePos = { x: 0, y: 0 },
  onFlipToggleRef,
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(true);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Animated statistics count-up state
  const [stat1Count, setStat1Count] = useState<number>(0);
  const [stat2Count, setStat2Count] = useState<number>(0);
  const [showActiveBadge, setShowActiveBadge] = useState<boolean>(false);

  // Manual flip trigger ref
  useEffect(() => {
    if (onFlipToggleRef) {
      onFlipToggleRef.current = () => {
        setIsFlipped((prev) => !prev);
      };
    }
  }, [onFlipToggleRef]);

  // Handle visibility & tab focus to pause when tab is inactive
  useEffect(() => {
    const handleVisibility = () => {
      setIsInViewport(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibility);

    const el = cardContainerRef.current;
    let observer: IntersectionObserver | null = null;
    if (el && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry) {
            setIsInViewport(entry.isIntersecting);
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(el);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (observer) observer.disconnect();
    };
  }, []);

  // --- 4. EXACT ANIMATION TIMING ---
  // Front profile display: 4.0 seconds (4000ms)
  // Front-to-back flip: 0.8 seconds (800ms)
  // Back statistics display: 4.0 seconds (4000ms)
  // Back-to-front flip: 0.8 seconds (800ms)
  // Total cycle: 9.6 seconds (~10s)
  useEffect(() => {
    let frontTimer: ReturnType<typeof setTimeout>;
    let backTimer: ReturnType<typeof setTimeout>;
    let repeatTimer: ReturnType<typeof setTimeout>;
    let isCancelled = false;

    const startCycle = () => {
      if (isCancelled) return;

      // Stage 1: Front profile displays for 4.0s (4000ms)
      frontTimer = setTimeout(() => {
        if (isCancelled) return;

        // Stage 2: Flip to back (0.8s / 800ms transition)
        setIsFlipped(true);

        // Stage 3: Back statistics displays for 4.0s (4000ms) after flip starts
        // (800ms transition + 4000ms display = 4800ms total)
        backTimer = setTimeout(() => {
          if (isCancelled) return;

          // Stage 4: Flip back to front (0.8s / 800ms transition)
          setIsFlipped(false);

          // Wait 800ms for reverse flip to complete, then repeat next cycle
          repeatTimer = setTimeout(() => {
            if (isCancelled) return;
            startCycle();
          }, 800);
        }, 4800);
      }, 4000);
    };

    startCycle();

    return () => {
      isCancelled = true;
      clearTimeout(frontTimer);
      clearTimeout(backTimer);
      clearTimeout(repeatTimer);
    };
  }, [isInViewport]);

  // --- 6. STATISTICS COUNT-UP ANIMATION ---
  // Triggers count-up when the back face rotates into view
  useEffect(() => {
    if (!isFlipped) {
      // Reset after flip back to front completes
      const resetTimer = window.setTimeout(() => {
        setStat1Count(0);
        setStat2Count(0);
        setShowActiveBadge(false);
      }, 600);
      return () => window.clearTimeout(resetTimer);
    }

    // Start count-up halfway through the 800ms flip (at 400ms)
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 1400; // 1.4s smooth counting

    const startTimer = window.setTimeout(() => {
      setShowActiveBadge(true);

      const step = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic: 1 - (1 - progress)^3
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setStat1Count(Math.floor(easeOut * DEFAULT_DEVELOPER_STATISTICS.stat1.target));
        setStat2Count(Math.floor(easeOut * DEFAULT_DEVELOPER_STATISTICS.stat2.target));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setStat1Count(DEFAULT_DEVELOPER_STATISTICS.stat1.target);
          setStat2Count(DEFAULT_DEVELOPER_STATISTICS.stat2.target);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, 400);

    return () => {
      window.clearTimeout(startTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isFlipped]);

  return (
    <div
      ref={cardContainerRef}
      className={`relative w-72 sm:w-80 md:w-[350px] aspect-[4/5] [perspective:1200px] select-none ${className}`}
      style={{
        transform: `translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0)`,
      }}
    >
      {/* 5. 3D FLIP CONTAINER: Continuous 3D rotation with 800ms transition & interactive click */}
      <div
        onClick={() => setIsFlipped((prev) => !prev)}
        className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0.0,0.2,1)] will-change-transform cursor-pointer"
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        title="Click to flip card"
      >
        {/* ========================================================= */}
        {/* 2. FRONT SIDE — PROFILE CARD                              */}
        {/* ========================================================= */}
        <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-2 border-primaryRoyalBlue/30 shadow-2xl bg-white [backface-visibility:hidden] z-20 flex flex-col justify-end">
          {/* Exact Uploaded Profile Photograph (Maximum sharpness without CSS rasterization filters) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src={portraitPhoto}
              alt="Karthikeyan S A - Professional Portrait"
              className="w-full h-full object-cover object-top"
              style={{
                imageRendering: 'auto',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
              loading="eager"
              decoding="sync"
            />
            {/* Subtle Gradient Shadow at bottom for crystal-clear text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/95 via-[#071426]/30 to-transparent pointer-events-none" />
          </div>

          {/* Bottom Identity Badge (Name & Designation) */}
          <div className="relative z-10 p-5 sm:p-6 text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide uppercase drop-shadow-sm font-sans">
              KARTHIKEYAN S A
            </h3>

            <p className="text-xs sm:text-sm font-bold text-sky-300 tracking-wider uppercase mt-1 drop-shadow-xs">
              AI & DATA SCIENCE DEVELOPER
            </p>

            <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>B.Tech AI & DS (2024–2028)</span>
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. BACK SIDE — STATISTICS CARD                            */}
        {/* ========================================================= */}
        <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-2 border-primaryRoyalBlue/50 shadow-2xl bg-gradient-to-b from-[#0B132B] via-[#071426] to-[#050D1A] [backface-visibility:hidden] [transform:rotateY(180deg)] z-20 flex flex-col justify-between p-5 sm:p-6 text-white">
          {/* Radial Spotlight Ambient Light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(74,120,224,0.18),transparent_70%)] pointer-events-none" />

          {/* Back Header */}
          <div className="relative z-10 border-b border-slate-700/60 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primaryRoyalBlue bg-primaryRoyalBlue/10 px-2 py-0.5 rounded border border-primaryRoyalBlue/25">
                Developer Activity
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                Live Performance Metrics
              </h4>
            </div>
          </div>

          {/* Three Vertical Statistics with Thin Separators */}
          <div className="relative z-10 flex-1 flex flex-col justify-center space-y-4 my-2">
            
            {/* STATISTIC 01: LeetCode Problems Solved */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-primaryRoyalBlue/15 border border-primaryRoyalBlue/30 flex items-center justify-center text-primaryRoyalBlue shrink-0 shadow-[0_0_12px_rgba(74,120,224,0.25)]">
                <Code className="w-5 h-5 text-primaryRoyalBlue" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono [text-shadow:0_0_16px_rgba(74,120,224,0.6)]">
                  {stat1Count}
                  {DEFAULT_DEVELOPER_STATISTICS.stat1.suffix}
                </div>
                <div className="text-xs font-semibold text-slate-300 tracking-wide mt-0.5 truncate">
                  {DEFAULT_DEVELOPER_STATISTICS.stat1.label}
                </div>
              </div>
            </div>

            {/* Thin Separator */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-700/80 to-transparent" />

            {/* STATISTIC 02: Days Continuous LeetCode Streak */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono [text-shadow:0_0_16px_rgba(245,158,11,0.55)]">
                  {stat2Count}
                  {DEFAULT_DEVELOPER_STATISTICS.stat2.suffix}
                </div>
                <div className="text-xs font-semibold text-slate-300 tracking-wide mt-0.5 truncate">
                  {DEFAULT_DEVELOPER_STATISTICS.stat2.label}
                </div>
              </div>
            </div>

            {/* Thin Separator */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-700/80 to-transparent" />

            {/* STATISTIC 03: Competitive Programmer */}
            <div className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                <Trophy className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight font-mono flex items-center gap-2 [text-shadow:0_0_16px_rgba(16,185,129,0.55)]">
                  <span>{DEFAULT_DEVELOPER_STATISTICS.stat3.value}</span>
                  {showActiveBadge && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  )}
                </div>
                <div className="text-xs font-semibold text-slate-300 tracking-wide mt-0.5 truncate">
                  {DEFAULT_DEVELOPER_STATISTICS.stat3.label}
                </div>
              </div>
            </div>

          </div>

          {/* Back Footer */}
          <div className="relative z-10 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>KARTHIKEYAN S A</span>
          </div>

        </div>
      </div>
    </div>
  );
};
