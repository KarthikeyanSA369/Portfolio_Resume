import React from 'react';

/**
 * Global Abstract Geometric Blue Background System
 * Faithfully recreating the supplied reference image:
 * - Soft pastel sky-blue base canvas (#B9E6F7 -> #D6F0FA -> #EAF7FC)
 * - Oversized circular geometric shapes (concentric top-right circles & bottom-left circle)
 * - Large sweeping translucent curved organic ribbon flowing diagonally
 * - Layered translucent shapes with subtle depth and smooth tone transitions
 * - Non-repetitive flowing geometric accents down the page
 * - Strictly pointer-events-none, z-indexed behind all content
 * - Respects prefers-reduced-motion
 */
export const AbstractGeometricBackground: React.FC = () => {
  return (
    <>
      {/* 1. Global Fixed Viewport Canvas (Direct Reference Recreation) */}
      <div
        className="fixed inset-0 pointer-events-none -z-30 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Soft Multi-stop Diagonal Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#B9E6F7] via-[#C8EBF9] via-30% via-[#D6F0FA] via-65% to-[#EAF7FC]" />

        {/* Ambient Subtle Radial Light Spots */}
        <div className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-white/45 blur-3xl" />
        <div className="absolute top-[35%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-[#A9DFF3]/35 blur-3xl" />
        <div className="absolute -bottom-[10%] left-[25%] w-[55vw] h-[55vw] rounded-full bg-[#D6F0FA]/40 blur-3xl" />

        {/* Signature Viewport Vector Geometry Matching Reference Image */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Top-Right Outer Circle Gradient */}
            <radialGradient
              id="geoCircleOuter"
              cx="50%"
              cy="50%"
              r="50%"
              fx="40%"
              fy="40%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.50" />
              <stop offset="65%" stopColor="#EAF7FC" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#D6F0FA" stopOpacity="0.18" />
            </radialGradient>

            {/* Top-Right Inner Concentric Circle Gradient */}
            <radialGradient
              id="geoCircleInner"
              cx="45%"
              cy="45%"
              r="50%"
              fx="35%"
              fy="35%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.58" />
              <stop offset="100%" stopColor="#EAF7FC" stopOpacity="0.38" />
            </radialGradient>

            {/* Bottom-Left Circle Gradient */}
            <radialGradient
              id="geoCircleBottomLeft"
              cx="50%"
              cy="50%"
              r="50%"
              fx="45%"
              fy="45%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#EAF7FC" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#D6F0FA" stopOpacity="0.18" />
            </radialGradient>

            {/* Flowing Curved Ribbon Primary Gradient (Diagonal from top-left) */}
            <linearGradient
              id="geoRibbonPrimary"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#D6F0FA" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#B9E6F7" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#A9DFF3" stopOpacity="0.25" />
            </linearGradient>

            {/* Flowing Curved Ribbon Secondary (Soft boundary contour layer) */}
            <linearGradient
              id="geoRibbonSecondary"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.38" />
              <stop offset="50%" stopColor="#EAF7FC" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#D6F0FA" stopOpacity="0.20" />
            </linearGradient>
          </defs>

          {/* 1. Large sweeping curved ribbon (Secondary contour layer) */}
          <path
            d="M -120 -60 L 480 -60 C 660 180 840 480 960 980 L -120 980 Z"
            fill="url(#geoRibbonSecondary)"
            className="animate-gentle-wave origin-top-left"
          />

          {/* 2. Main flowing curved organic ribbon (Exact match to reference image diagonal arc) */}
          <path
            d="M -120 -60 L 330 -60 C 490 160 670 440 820 980 L -120 980 Z"
            fill="url(#geoRibbonPrimary)"
            className="animate-gentle-wave origin-top-left"
          />

          {/* 3. Top-Right Oversized Outer Circle */}
          <circle
            cx="1360"
            cy="110"
            r="490"
            fill="url(#geoCircleOuter)"
            className="animate-gentle-float-1"
          />

          {/* 4. Top-Right Concentric Inner Circle (Brighter core) */}
          <circle
            cx="1390"
            cy="70"
            r="235"
            fill="url(#geoCircleInner)"
            className="animate-gentle-float-2"
          />

          {/* 5. Bottom-Left Oversized Circle */}
          <circle
            cx="70"
            cy="890"
            r="330"
            fill="url(#geoCircleBottomLeft)"
            className="animate-gentle-float-1"
          />
        </svg>
      </div>

      {/* 2. Flowing Page-Height Abstract Geometry (Connecting All Sections Naturally) */}
      <div
        className="absolute inset-0 pointer-events-none -z-20 overflow-hidden select-none w-full"
        aria-hidden="true"
      >
        {/* About Section Flowing Geometry: Soft Right Arc & Left Circle */}
        <div className="absolute top-[12%] right-[-10vw] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-bl from-white/45 via-[#EAF7FC]/30 to-transparent pointer-events-none" />
        <div className="absolute top-[18%] left-[-8vw] w-[38vw] h-[38vw] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-tr from-white/50 via-[#D6F0FA]/35 to-transparent pointer-events-none" />

        {/* Skills Section Flowing Geometry: Concentric Orbital Arcs */}
        <div className="absolute top-[27%] left-[50%] -translate-x-1/2 w-[85vw] max-w-[1200px] h-[450px] pointer-events-none opacity-40">
          <svg viewBox="0 0 1200 450" className="w-full h-full" fill="none">
            <path
              d="M 50 400 C 350 150 850 150 1150 400"
              stroke="#FFFFFF"
              strokeWidth="60"
              strokeOpacity="0.35"
              strokeLinecap="round"
            />
            <path
              d="M 150 420 C 400 220 800 220 1050 420"
              stroke="#D6F0FA"
              strokeWidth="35"
              strokeOpacity="0.45"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Projects Section Flowing Geometry: Sweeping Diagonal Wave & Circle */}
        <div className="absolute top-[39%] left-[-15vw] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-br from-white/45 via-[#B9E6F7]/25 to-transparent pointer-events-none" />
        <div className="absolute top-[45%] right-[-10vw] w-[42vw] h-[42vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-bl from-white/50 via-[#EAF7FC]/35 to-transparent pointer-events-none" />

        {/* Experience Section Flowing Geometry: Gentle Wave down the timeline */}
        <div className="absolute top-[55%] right-[-8vw] w-[50vw] h-[50vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-tl from-white/45 via-[#D6F0FA]/30 to-transparent pointer-events-none" />
        <div className="absolute top-[61%] left-[-10vw] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-white/50 via-[#EAF7FC]/35 to-transparent pointer-events-none" />

        {/* Education Section Flowing Geometry: Smooth sweeping arc & soft circle */}
        <div className="absolute top-[71%] left-[10vw] w-[45vw] h-[45vw] max-w-[680px] max-h-[680px] rounded-full bg-gradient-to-br from-white/50 via-[#B9E6F7]/25 to-transparent pointer-events-none" />
        <div className="absolute top-[75%] right-[-12vw] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-bl from-white/45 via-[#D6F0FA]/30 to-transparent pointer-events-none" />

        {/* Certifications, Contact & Footer Flowing Geometry: Sweeping organic curved base */}
        <div className="absolute bottom-[4%] left-[-15vw] w-[65vw] h-[65vw] max-w-[950px] max-h-[950px] rounded-full bg-gradient-to-tr from-white/55 via-[#EAF7FC]/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-[0%] right-[-10vw] w-[50vw] h-[50vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-tl from-white/50 via-[#D6F0FA]/30 to-transparent pointer-events-none" />
      </div>
    </>
  );
};
