import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number | string; // e.g. 8.33, 93.6, "8.33", "90%"
  from?: number;
  duration?: number; // seconds
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  from,
  duration = 1.4,
  decimals,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  // Parse numerical part from string if needed
  const stringVal = String(value);
  const numMatch = stringVal.match(/[\d.]+/);
  const numericTarget = numMatch ? parseFloat(numMatch[0]) : 0;
  
  // Auto-detect decimals if not explicitly passed
  const detectedDecimals = decimals ?? (stringVal.includes('.') ? (stringVal.split('.')[1] || '').length : 0);
  const startVal = from ?? (numericTarget > 10 ? 0 : Math.max(0, numericTarget - 3));

  const [displayValue, setDisplayValue] = useState<string>(
    shouldReduceMotion ? stringVal : `${prefix}${startVal.toFixed(detectedDecimals)}${suffix}`
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(stringVal);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);

      // Smooth easeOutExpo for professional number rolling
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = startVal + (numericTarget - startVal) * easeProgress;

      setDisplayValue(`${prefix}${current.toFixed(detectedDecimals)}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        // Ensure exact final string precision
        setDisplayValue(stringVal);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, numericTarget, startVal, duration, detectedDecimals, prefix, suffix, stringVal, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};