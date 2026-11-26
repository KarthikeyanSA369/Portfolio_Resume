import React from 'react';

interface LayeredWaveProps {
  /**
   * Position orientation:
   * 'bottom': Sits at the bottom of a section, cresting up and filling down into the next section with fill target.
   * 'top': Sits at top of section, cresting down.
   */
  position?: 'bottom' | 'top';
  /**
   * Target fill color of the front-most wave that merges into the adjacent section.
   * Defaults to '#FFFFFF'.
   */
  fillColor?: string;
  /**
   * Additional custom Tailwind classes
   */
  className?: string;
  /**
   * Height in tailwind classes or style
   */
  heightClass?: string;
}

export const LayeredWave: React.FC<LayeredWaveProps> = ({
  position = 'bottom',
  fillColor = '#FFFFFF',
  className = '',
  heightClass = 'h-24 sm:h-36 md:h-48 lg:h-56',
}) => {
  const isTop = position === 'top';

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none z-10 ${
        isTop ? 'transform rotate-180' : ''
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        className={`w-full ${heightClass} block`}
        viewBox="0 0 1440 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle Royal Blue to Soft Blue Ambient Gradient */}
          <linearGradient id="waveGradientBack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#EFF6FF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.65" />
          </linearGradient>

          {/* Middle Wave Gradient: Light Blue with soft translucency */}
          <linearGradient id="waveGradientMid" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#DBEAFE" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.90" />
          </linearGradient>

          {/* Royal Blue Accent Line Glow Filter */}
          <filter id="royalBlueGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563EB" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. LAYER 1 (Deepest Back Wave): Organic undulating curves in Soft Blue */}
        <path
          d="M0,96 C180,160 360,40 540,80 C720,120 900,200 1080,150 C1260,100 1380,160 1440,140 L1440,240 L0,240 Z"
          fill="url(#waveGradientBack)"
        />

        {/* 2. LAYER 2 (Middle Wave): Overlapping crests in Ice Blue/Soft Blue */}
        <path
          d="M0,140 C220,70 420,170 640,110 C860,50 1060,160 1280,120 C1360,105 1410,125 1440,135 L1440,240 L0,240 Z"
          fill="url(#waveGradientMid)"
        />

        {/* 3. LAYER 3 (Subtle Royal Blue Thin Accent Curve): Delicate flowing vector ribbon */}
        <path
          d="M0,140 C220,70 420,170 640,110 C860,50 1060,160 1280,120 C1360,105 1410,125 1440,135"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeOpacity="0.40"
          strokeLinecap="round"
          filter="url(#royalBlueGlow)"
        />

        {/* 4. LAYER 4 (Front-most Wave): Clean organic curve merging seamlessly into adjacent section */}
        <path
          d="M0,180 C260,120 500,220 780,160 C1020,110 1260,200 1440,170 L1440,240 L0,240 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};