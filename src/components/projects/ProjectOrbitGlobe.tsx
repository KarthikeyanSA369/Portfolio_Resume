import React, { useState, useEffect, useRef, useMemo } from 'react';

interface OrbitNode {
  name: string;
  color: string;
  ring: 'inner' | 'outer';
  angleOffset: number; // degrees
  svg: React.ReactNode;
}

interface ProjectOrbitData {
  centerTitle: string;
  centerBadge: string;
  centerColor: string;
  centerIcon: React.ReactNode;
  nodes: OrbitNode[];
}

interface ProjectOrbitGlobeProps {
  projectId: string;
  projectTitle: string;
}

export const ProjectOrbitGlobe: React.FC<ProjectOrbitGlobeProps> = ({
  projectId,
  projectTitle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [angle, setAngle] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Check visibility with IntersectionObserver to save resources when card is offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Continuous smooth 60fps orbital rotation with hover speed-up
  useEffect(() => {
    if (!isVisible) return;

    const animate = (time: number) => {
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // Base speed: 20 deg/sec. On hover: 36 deg/sec
      const speed = isHovered ? 38 : 20;
      setAngle((prev) => (prev + speed * delta) % 360);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible, isHovered]);

  // Subtle interactive mouse parallax tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Map to subtle tilt (-12deg to +12deg)
    setTilt({
      x: -(y / (rect.height / 2)) * 14,
      y: (x / (rect.width / 2)) * 16,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Project-specific technology symbols and orbital configuration
  const orbitData: ProjectOrbitData = useMemo(() => {
    switch (projectId) {
      case 'quickbrowse':
        return {
          centerTitle: 'QuickBrowse',
          centerBadge: 'Browser Hub',
          centerColor: '#1763E8',
          centerIcon: (
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          ),
          nodes: [
            // Inner Orbit (Python & Flask)
            {
              name: 'Python',
              color: '#3776AB',
              ring: 'inner',
              angleOffset: 0,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 128 128">
                  <path fill="#3776AB" d="M63.5 8C43.8 8 44.5 16.5 44.5 16.5L44.6 25.3H64v3.8H26.3S11.6 27.5 11.6 47.3s12.8 19.3 12.8 19.3h7.7v-9.6s-.4-12.8 12.6-12.8h21.7s12 .2 12-11.7V20.1S79.6 8 63.5 8z" />
                  <path fill="#FFD438" d="M64.5 120c19.7 0 19-8.5 19-8.5l-.1-8.8H64v-3.8h37.7s14.7 1.6 14.7-18.2-12.8-19.3-12.8-19.3h-7.7v9.6s.4 12.8-12.6 12.8H41.6s-12-.2-12 11.7v12.4s-1.2 12.1 14.9 12.1z" />
                </svg>
              ),
            },
            {
              name: 'Flask',
              color: '#1F2937',
              ring: 'inner',
              angleOffset: 180,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 128 128">
                  <path d="M58 24h12v18l24 44c4 7-1 16-9 16H43c-8 0-13-9-9-16l24-44V24z" stroke="#1F2937" strokeWidth="10" strokeLinejoin="round" fill="none" />
                  <path d="M47 80h34" stroke="#4A78E0" strokeWidth="8" strokeLinecap="round" />
                </svg>
              ),
            },
            // Outer Orbit (PyWebView & Chromium)
            {
              name: 'PyWebView',
              color: '#0284C7',
              ring: 'outer',
              angleOffset: 60,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.5">
                  <rect x="2" y="3" width="20" height="15" rx="3" />
                  <line x1="2" y1="7" x2="22" y2="7" />
                  <circle cx="5" cy="5" r="0.8" fill="#0284C7" />
                  <circle cx="8" cy="5" r="0.8" fill="#0284C7" />
                </svg>
              ),
            },
            {
              name: 'Chromium',
              color: '#EA4335',
              ring: 'outer',
              angleOffset: 240,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#4285F4" strokeWidth="2.5" />
                  <circle cx="12" cy="12" r="4.5" fill="#4285F4" />
                </svg>
              ),
            },
          ],
        };

      case 'terminal-board':
        return {
          centerTitle: 'Terminal Board',
          centerBadge: 'Workstation Core',
          centerColor: '#0F172A',
          centerIcon: (
            <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          ),
          nodes: [
            {
              name: 'Python',
              color: '#3776AB',
              ring: 'inner',
              angleOffset: 30,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 128 128">
                  <path fill="#3776AB" d="M63.5 8C43.8 8 44.5 16.5 44.5 16.5L44.6 25.3H64v3.8H26.3S11.6 27.5 11.6 47.3s12.8 19.3 12.8 19.3h7.7v-9.6s-.4-12.8 12.6-12.8h21.7s12 .2 12-11.7V20.1S79.6 8 63.5 8z" />
                  <path fill="#FFD438" d="M64.5 120c19.7 0 19-8.5 19-8.5l-.1-8.8H64v-3.8h37.7s14.7 1.6 14.7-18.2-12.8-19.3-12.8-19.3h-7.7v9.6s.4 12.8-12.6 12.8H41.6s-12-.2-12 11.7v12.4s-1.2 12.1 14.9 12.1z" />
                </svg>
              ),
            },
            {
              name: 'CPU Telemetry',
              color: '#10B981',
              ring: 'inner',
              angleOffset: 210,
              svg: (
                <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
                </svg>
              ),
            },
            {
              name: 'Network Monitor',
              color: '#3B82F6',
              ring: 'outer',
              angleOffset: 90,
              svg: (
                <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              ),
            },
            {
              name: 'Diagnostics Exporter',
              color: '#8B5CF6',
              ring: 'outer',
              angleOffset: 270,
              svg: (
                <svg className="w-3.5 h-3.5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              ),
            },
          ],
        };

      case 'smart-report-alert':
        return {
          centerTitle: 'Smart Report',
          centerBadge: 'Stock Automation',
          centerColor: '#D97706',
          centerIcon: (
            <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
          ),
          nodes: [
            {
              name: 'n8n',
              color: '#EA4B71',
              ring: 'inner',
              angleOffset: 45,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="58" fill="#FFFFFF" stroke="#EA4B71" strokeWidth="6" />
                  <circle cx="38" cy="64" r="14" fill="#EA4B71" />
                  <circle cx="90" cy="42" r="14" fill="#EA4B71" />
                  <circle cx="90" cy="86" r="14" fill="#EA4B71" />
                  <path d="M38 64h26l26-22M64 64l26 22" stroke="#EA4B71" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              ),
            },
            {
              name: 'JavaScript',
              color: '#F7DF1E',
              ring: 'inner',
              angleOffset: 225,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 128 128">
                  <rect width="128" height="128" rx="16" fill="#F7DF1E" />
                  <path d="M36.8 108.6c4.2 2.6 9.5 4.3 14.9 4.3 13.9 0 22.8-6.9 22.8-23.9V44.2H58v44.7c0 7.8-3.4 11.7-9.5 11.7-3.4 0-6.7-1.1-8.8-2.6l-2.9 10.6zm50.3-2.6c5.8 3.4 13.7 5.7 21.2 5.7 18.2 0 28.5-9.1 28.5-23.7 0-13.3-7.8-19.7-20.9-25.5l-3.8-1.7c-7.6-3.4-11.7-6.9-11.7-12.5 0-5.3 4.4-9.3 11.9-9.3 6.3 0 11.3 2.1 14.9 4.2l3.4-10.8c-4.4-2.3-10.8-4.2-18.7-4.2-17.2 0-27.1 9.5-27.1 23.3 0 12.9 7.8 19.3 19.9 24.8l4 1.7c8.2 3.6 12.7 7.4 12.7 13.3 0 6.1-4.8 10.6-13.3 10.6-7.8 0-14.1-2.8-18.9-5.9l-2.2 10.2z" fill="#000" />
                </svg>
              ),
            },
            {
              name: 'CSV Pipeline',
              color: '#059669',
              ring: 'outer',
              angleOffset: 120,
              svg: (
                <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <text x="7" y="16" fontSize="6" fontWeight="bold" fill="#059669">CSV</text>
                </svg>
              ),
            },
            {
              name: 'Email Alert Digest',
              color: '#EA4335',
              ring: 'outer',
              angleOffset: 300,
              svg: (
                <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              ),
            },
          ],
        };

      case 'gmail-response-automation':
        return {
          centerTitle: 'Gmail AI Bridge',
          centerBadge: 'LLM Response Workflow',
          centerColor: '#EA4335',
          centerIcon: (
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="#EA4335" />
              <polyline points="22,6 12,13 2,6" stroke="#FFFFFF" strokeWidth="2" fill="none" />
            </svg>
          ),
          nodes: [
            {
              name: 'Gmail API',
              color: '#EA4335',
              ring: 'inner',
              angleOffset: 15,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 13.5L2 6.5V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6.5L12 13.5z" />
                  <path fill="#C5221F" d="M22 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v.5l10 7 10-7V6z" />
                </svg>
              ),
            },
            {
              name: 'n8n',
              color: '#EA4B71',
              ring: 'inner',
              angleOffset: 195,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="58" fill="#FFFFFF" stroke="#EA4B71" strokeWidth="6" />
                  <circle cx="38" cy="64" r="14" fill="#EA4B71" />
                  <circle cx="90" cy="42" r="14" fill="#EA4B71" />
                  <circle cx="90" cy="86" r="14" fill="#EA4B71" />
                  <path d="M38 64h26l26-22M64 64l26 22" stroke="#EA4B71" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              ),
            },
            {
              name: 'Groq API',
              color: '#F97316',
              ring: 'outer',
              angleOffset: 105,
              svg: (
                <svg className="w-3.5 h-3.5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              ),
            },
            {
              name: 'LLaMA 3.3',
              color: '#6366F1',
              ring: 'outer',
              angleOffset: 285,
              svg: (
                <svg className="w-3.5 h-3.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 5l2 2" />
                </svg>
              ),
            },
          ],
        };

      case 'sih-3d-ulpin':
        return {
          centerTitle: 'SIH 3D ULPIN',
          centerBadge: 'Cadastral Spatial Web',
          centerColor: '#2563EB',
          centerIcon: (
            <svg className="w-5 h-5 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          ),
          nodes: [
            {
              name: 'React',
              color: '#61DAFB',
              ring: 'inner',
              angleOffset: 0,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 128 128">
                  <ellipse cx="64" cy="64" rx="13" ry="13" fill="#61DAFB" />
                  <g stroke="#61DAFB" strokeWidth="8" fill="none">
                    <ellipse cx="64" cy="64" rx="54" ry="21" />
                    <ellipse cx="64" cy="64" rx="54" ry="21" transform="rotate(60 64 64)" />
                    <ellipse cx="64" cy="64" rx="54" ry="21" transform="rotate(120 64 64)" />
                  </g>
                </svg>
              ),
            },
            {
              name: 'TypeScript',
              color: '#3178C6',
              ring: 'inner',
              angleOffset: 180,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 128 128">
                  <rect width="128" height="128" rx="16" fill="#3178C6" />
                  <path d="M23.8 54.4h37.5v-12H10.4v12h13.4v48.8h13.4V54.4h-.01.01zm48.8 39.5c5.8 3.4 13.7 5.7 21.2 5.7 18.2 0 28.5-9.1 28.5-23.7 0-13.3-7.8-19.7-20.9-25.5l-3.8-1.7c-7.6-3.4-11.7-6.9-11.7-12.5 0-5.3 4.4-9.3 11.9-9.3 6.3 0 11.3 2.1 14.9 4.2l3.4-10.8c-4.4-2.3-10.8-4.2-18.7-4.2-17.2 0-27.1 9.5-27.1 23.3 0 12.9 7.8 19.3 19.9 24.8l4 1.7c8.2 3.6 12.7 7.4 12.7 13.3 0 6.1-4.8 10.6-13.3 10.6-7.8 0-14.1-2.8-18.9-5.9l-2.2 10.2z" fill="#FFF" />
                </svg>
              ),
            },
            {
              name: '3D WebGL',
              color: '#06B6D4',
              ring: 'outer',
              angleOffset: 75,
              svg: (
                <svg className="w-3.5 h-3.5 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
                  <path d="M12 12l9-5M12 12v10M12 12L3 7" />
                </svg>
              ),
            },
            {
              name: 'Cadastral ULPIN',
              color: '#10B981',
              ring: 'outer',
              angleOffset: 255,
              svg: (
                <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              ),
            },
          ],
        };

      case 'secureshare':
        return {
          centerTitle: 'SecureShare',
          centerBadge: 'Post-Quantum Vault',
          centerColor: '#0E7490',
          centerIcon: (
            <svg className="w-5 h-5 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          ),
          nodes: [
            {
              name: 'Python',
              color: '#3776AB',
              ring: 'inner',
              angleOffset: 30,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 128 128">
                  <path fill="#3776AB" d="M63.5 8C43.8 8 44.5 16.5 44.5 16.5L44.6 25.3H64v3.8H26.3S11.6 27.5 11.6 47.3s12.8 19.3 12.8 19.3h7.7v-9.6s-.4-12.8 12.6-12.8h21.7s12 .2 12-11.7V20.1S79.6 8 63.5 8z" />
                  <path fill="#FFD438" d="M64.5 120c19.7 0 19-8.5 19-8.5l-.1-8.8H64v-3.8h37.7s14.7 1.6 14.7-18.2-12.8-19.3-12.8-19.3h-7.7v9.6s.4 12.8-12.6 12.8H41.6s-12-.2-12 11.7v12.4s-1.2 12.1 14.9 12.1z" />
                </svg>
              ),
            },
            {
              name: 'FastAPI',
              color: '#009688',
              ring: 'inner',
              angleOffset: 210,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="58" fill="#009688" />
                  <path d="M70.5 18L32 70.8h25.4L49.8 110 96 55.4H70.5L70.5 18z" fill="#FFF" />
                </svg>
              ),
            },
            {
              name: 'AES-256-GCM',
              color: '#0284C7',
              ring: 'outer',
              angleOffset: 110,
              svg: (
                <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              ),
            },
            {
              name: 'ML-KEM-768',
              color: '#6366F1',
              ring: 'outer',
              angleOffset: 290,
              svg: (
                <svg className="w-3.5 h-3.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="7.5" cy="15.5" r="5.5" />
                  <path d="M21 2l-9.6 9.6M15.5 7.5l3 3M18.5 4.5l3 3" />
                </svg>
              ),
            },
          ],
        };

      case 'tamil-news-daily':
        return {
          centerTitle: 'Tamil News Daily',
          centerBadge: 'Automated Media',
          centerColor: '#7C3AED',
          centerIcon: (
            <svg className="w-5 h-5 text-purple-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8M18 18h-8M18 10h-8" />
            </svg>
          ),
          nodes: [
            {
              name: 'n8n',
              color: '#EA4B71',
              ring: 'inner',
              angleOffset: 0,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="58" fill="#FFFFFF" stroke="#EA4B71" strokeWidth="6" />
                  <circle cx="38" cy="64" r="14" fill="#EA4B71" />
                  <circle cx="90" cy="42" r="14" fill="#EA4B71" />
                  <circle cx="90" cy="86" r="14" fill="#EA4B71" />
                  <path d="M38 64h26l26-22M64 64l26 22" stroke="#EA4B71" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              ),
            },
            {
              name: 'OpenAI GPT-4o',
              color: '#10A37F',
              ring: 'inner',
              angleOffset: 180,
              svg: (
                <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                  <circle cx="12" cy="12" r="4" fill="#10A37F" />
                </svg>
              ),
            },
            {
              name: 'Supabase',
              color: '#3ECF8E',
              ring: 'outer',
              angleOffset: 60,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 128 128">
                  <path d="M72.8 123.6c-4.4 5.3-13.1 2.2-13.1-4.7V75H13.6c-9.1 0-14.1-10.6-8.2-17.6L60.5 4.4C64.9-.9 73.6 2.2 73.6 9.1V53h40.8c9.1 0 14.1 10.6 8.2 17.6L72.8 123.6z" fill="#3ECF8E" />
                </svg>
              ),
            },
            {
              name: 'Slack Alerts',
              color: '#E01E5A',
              ring: 'outer',
              angleOffset: 240,
              svg: (
                <svg className="w-3.5 h-3.5 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="3" width="7" height="7" rx="2" fill="#E01E5A" stroke="none" />
                  <rect x="14" y="3" width="7" height="7" rx="2" fill="#36C5F0" stroke="none" />
                  <rect x="14" y="14" width="7" height="7" rx="2" fill="#2EB67D" stroke="none" />
                  <rect x="3" y="14" width="7" height="7" rx="2" fill="#ECB22E" stroke="none" />
                </svg>
              ),
            },
          ],
        };

      case 'cleanify':
      default:
        return {
          centerTitle: 'Cleanify',
          centerBadge: 'Python Package Core',
          centerColor: '#2563EB',
          centerIcon: (
            <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          ),
          nodes: [
            {
              name: 'Python',
              color: '#3776AB',
              ring: 'inner',
              angleOffset: 15,
              svg: (
                <svg className="w-3.5 h-3.5" viewBox="0 0 128 128">
                  <path fill="#3776AB" d="M63.5 8C43.8 8 44.5 16.5 44.5 16.5L44.6 25.3H64v3.8H26.3S11.6 27.5 11.6 47.3s12.8 19.3 12.8 19.3h7.7v-9.6s-.4-12.8 12.6-12.8h21.7s12 .2 12-11.7V20.1S79.6 8 63.5 8z" />
                  <path fill="#FFD438" d="M64.5 120c19.7 0 19-8.5 19-8.5l-.1-8.8H64v-3.8h37.7s14.7 1.6 14.7-18.2-12.8-19.3-12.8-19.3h-7.7v9.6s.4 12.8-12.6 12.8H41.6s-12-.2-12 11.7v12.4s-1.2 12.1 14.9 12.1z" />
                </svg>
              ),
            },
            {
              name: 'PyPI Package',
              color: '#F59E0B',
              ring: 'inner',
              angleOffset: 195,
              svg: (
                <svg className="w-3.5 h-3.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-1.8 0l-.87.5 7.74 4.47 3.88-2.23z" />
                  <path d="M12 13.12 4.14 8.58A1.78 1.78 0 0 0 3 10.12v7.76a1.78 1.78 0 0 0 .88 1.54l7.24 4.18V13.12z" />
                  <path d="M13 13.12v10.48l7.24-4.18a1.78 1.78 0 0 0 .88-1.54v-7.76a1.78 1.78 0 0 0-1.14-1.54L13 13.12z" />
                </svg>
              ),
            },
            {
              name: 'Setuptools',
              color: '#6366F1',
              ring: 'outer',
              angleOffset: 100,
              svg: (
                <svg className="w-3.5 h-3.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              ),
            },
            {
              name: 'Data Sanitation',
              color: '#10B981',
              ring: 'outer',
              angleOffset: 280,
              svg: (
                <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              ),
            },
          ],
        };
    }
  }, [projectId]);

  // Radii for inner and outer rings (in pixels)
  // Inner ring: radius 38px, diameter 76px
  // Outer ring: radius 56px, diameter 112px
  const innerRadius = 38;
  const outerRadius = 56;

  // Inclination angle for orbital planes
  // Inner ring: tilted 65° along X, 15° along Y
  // Outer ring: tilted 60° along X, -20° along Y

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center select-none overflow-hidden cursor-pointer"
      style={{
        perspective: '600px',
      }}
      title={`Explore 3D Orbit: ${projectTitle}`}
    >
      {/* 3D Root Scene with Interactive Parallax Tilt */}
      <div
        className="relative flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Soft Ambient Radial Glow Behind Central Globe */}
        <div
          className="absolute w-28 h-28 rounded-full pointer-events-none transition-all duration-300"
          style={{
            background: isHovered
              ? 'radial-gradient(circle, rgba(23,99,232,0.22) 0%, rgba(57,120,237,0.10) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(23,99,232,0.12) 0%, rgba(57,120,237,0.05) 45%, transparent 70%)',
            transform: 'translateZ(-10px)',
          }}
        />

        {/* 1. OUTER ORBIT TRACK RING (Radius: 56px, Diameter: 112px) */}
        <div
          className="absolute w-[112px] h-[112px] rounded-full border border-dashed border-primaryRoyalBlue/30 pointer-events-none transition-colors duration-300"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(62deg) rotateY(-18deg)',
            boxShadow: isHovered ? '0 0 12px rgba(23,99,232,0.25)' : 'none',
          }}
        />

        {/* 2. INNER ORBIT TRACK RING (Radius: 38px, Diameter: 76px) */}
        <div
          className="absolute w-[76px] h-[76px] rounded-full border border-dashed border-primaryRoyalBlue/40 pointer-events-none transition-colors duration-300"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(68deg) rotateY(16deg)',
            boxShadow: isHovered ? '0 0 8px rgba(23,99,232,0.30)' : 'none',
          }}
        />

        {/* 3. CENTRAL 3D SPHERICAL GLOBE (Diameter: 42px) */}
        <div
          className="relative w-[42px] h-[42px] rounded-full flex items-center justify-center shadow-lg transition-transform duration-300"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(0px) scale(${isHovered ? 1.08 : 1})`,
            background: `radial-gradient(circle at 32% 28%, #FFFFFF 0%, #DCE8FF 25%, #3978ED 65%, #101B46 100%)`,
            boxShadow: isHovered
              ? '0 6px 18px rgba(23,99,232,0.45), inset -2px -2px 6px rgba(16,27,70,0.6), inset 2px 2px 6px rgba(255,255,255,0.8)'
              : '0 4px 14px rgba(23,99,232,0.30), inset -2px -2px 5px rgba(16,27,70,0.5), inset 2px 2px 5px rgba(255,255,255,0.7)',
          }}
        >
          {/* Internal 3D Wireframe Meridian Contour Lines (Rotating slowly) */}
          <div
            className="absolute inset-0 rounded-full border border-white/30 pointer-events-none overflow-hidden"
            style={{
              maskImage: 'radial-gradient(circle, white 70%, transparent 100%)',
            }}
          >
            {/* Spinning Latitude & Longitude grid lines */}
            <div
              className="w-full h-full rounded-full border border-white/25 pointer-events-none"
              style={{
                transform: `rotateY(${(angle * 1.2) % 360}deg)`,
              }}
            />
            <div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/30 pointer-events-none"
            />
          </div>

          {/* Central Project Emblem */}
          <div className="relative z-10 filter drop-shadow-md">
            {orbitData.centerIcon}
          </div>

          {/* Specular Highlight Sheen */}
          <div
            className="absolute top-1 left-2 w-3.5 h-2 rounded-full bg-white/70 blur-[0.6px] pointer-events-none -rotate-12"
          />
        </div>

        {/* 4. ORBITING TECHNOLOGY NODES (Rendered with 3D Orbital Trajectory Math) */}
        {orbitData.nodes.map((node) => {
          const isInner = node.ring === 'inner';
          const radius = isInner ? innerRadius : outerRadius;
          
          // Inner orbit moves Clockwise; Outer orbit moves Counter-Clockwise
          const currentAngleDeg = isInner
            ? (angle + node.angleOffset) % 360
            : (360 - ((angle * 0.75 + node.angleOffset) % 360)) % 360;

          const angleRad = (currentAngleDeg * Math.PI) / 180;

          // Elliptical perspective projection:
          // X is horizontal breadth; Y is compressed vertical breadth due to 65° tilt
          // cos(65°) ≈ 0.42
          const tiltFactor = isInner ? 0.38 : 0.44;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius * tiltFactor;

          // Z-depth: sin(angleRad) determines whether node is in front (+Z) or behind (-Z) the central globe
          // Positive sin -> bottom half (closer to camera, in front)
          // Negative sin -> top half (farther from camera, behind globe)
          const isFront = Math.sin(angleRad) >= -0.15;
          const zDepth = Math.round(Math.sin(angleRad) * 25);
          const scale = isFront ? 1.05 : 0.88;
          const opacity = isFront ? 1 : 0.75;

          return (
            <div
              key={node.name}
              className="absolute left-1/2 top-1/2 -ml-3 -mt-3 transition-opacity duration-150 pointer-events-none"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translate3d(${x}px, ${y}px, ${zDepth}px) scale(${scale})`,
                zIndex: isFront ? 20 : 5,
                opacity,
              }}
            >
              {/* White circular disc badge for crystal-clear vector logo display */}
              <div
                className="w-6 h-6 rounded-full bg-white border border-cardBorder/90 shadow-sm flex items-center justify-center p-0.5 filter drop-shadow-xs transition-transform duration-200"
                style={{
                  boxShadow: isFront
                    ? '0 2px 6px rgba(16,27,70,0.18)'
                    : '0 1px 3px rgba(16,27,70,0.10)',
                }}
                title={node.name}
              >
                {node.svg}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating subtle project indicator pill in bottom corner */}
      <div className="absolute bottom-1.5 right-2 px-2 py-0.5 rounded-full bg-white/85 backdrop-blur-xs border border-cardBorder/80 text-[9px] font-bold text-primaryRoyalBlue shadow-xs tracking-wider uppercase pointer-events-none">
        {orbitData.centerBadge}
      </div>
    </div>
  );
};
