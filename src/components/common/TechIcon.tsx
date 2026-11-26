import React, { useState } from 'react';
import { getTechDefinition } from '../../data/techLogosData';
import gmailLogo from '../../assets/gmail-logo.png';

export interface TechIconProps {
  name: string;
  className?: string;
  size?: number | string;
  colored?: boolean;
}

/**
 * Universal, responsive Technology Icon component.
 * Uses official Devicon font icons for programming languages & frameworks,
 * with Simple Icons CDN and resilient vector fallbacks for specialized tools.
 * Zero local downloaded SVG/PNG asset dependencies.
 */
export const TechIcon: React.FC<TechIconProps> = ({
  name,
  className = 'w-6 h-6',
  size,
  colored = true,
}) => {
  const [loadError, setLoadError] = useState(false);
  const def = getTechDefinition(name);

  const formattedSize = size
    ? (typeof size === 'number' ? `${size}px` : size)
    : undefined;

  const styleObj: React.CSSProperties = formattedSize
    ? { width: formattedSize, height: formattedSize, fontSize: formattedSize }
    : {};

  // Special exact SVG for Python as strictly required
  if (def?.name === 'Python' || name.toLowerCase().includes('python')) {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={styleObj}
        title="Python"
      >
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
          alt="Python logo"
          className="w-full h-full object-contain object-center"
          loading="lazy"
        />
      </span>
    );
  }

  // Official uploaded logo for Gmail / Gmail API
  if (name.toLowerCase().includes('gmail')) {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={styleObj}
        title={name}
      >
        <img
          src={gmailLogo}
          alt="Gmail logo"
          className="w-full h-full object-contain object-center"
          loading="lazy"
        />
      </span>
    );
  }

  // Special vector fallback for Pinecone (since Simple Icons endpoint returns 404)
  if (def?.name === 'Pinecone') {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={styleObj}
        title="Pinecone"
      >
        <svg className="w-full h-full object-contain" viewBox="0 0 128 128" fill="none">
          <rect width="128" height="128" rx="28" fill="#111827" />
          <path d="M64 24l20 20-20 20-20-20 20-20z" fill="#10B981" />
          <path d="M44 44l20 20-20 20-20-20 20-20z" fill="#34D399" opacity="0.8" />
          <path d="M84 44l20 20-20 20-20-20 20-20z" fill="#059669" />
          <path d="M64 64l20 20-20 20-20-20 20-20z" fill="#10B981" />
        </svg>
      </span>
    );
  }

  // 1. If tech has a Devicon font class, render Devicon font icon
  if (def?.deviconClass) {
    const iconClass = colored
      ? def.deviconClass
      : def.deviconClass.replace('colored', '').trim();

    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 leading-none ${className}`}
        style={styleObj}
        title={def.name}
      >
        <i
          className={`${iconClass} text-inherit leading-none`}
          style={{ fontSize: formattedSize || '1.35em' }}
          aria-hidden="true"
        />
      </span>
    );
  }

  // 2. Simple Icons CDN fallback (or primary for brands without Devicon glyph)
  if (def?.simpleIconUrl && !loadError) {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={styleObj}
        title={def.name}
      >
        <img
          src={def.simpleIconUrl}
          alt={`${def.name} logo`}
          className="w-full h-full object-contain object-center"
          loading="lazy"
          onError={() => setLoadError(true)}
        />
      </span>
    );
  }

  // Special fallback for n8n in case of connection drop
  if (def?.name === 'n8n' && loadError) {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={styleObj}
        title="n8n"
      >
        <svg className="w-full h-full object-contain" viewBox="0 0 128 128" fill="none">
          <circle cx="36" cy="64" r="18" fill="#EA4B71" />
          <circle cx="92" cy="40" r="18" fill="#EA4B71" />
          <circle cx="92" cy="88" r="18" fill="#EA4B71" />
          <path d="M36 64h24c8 0 12-8 16-16l8-8M60 64c4 0 8 8 16 16l8 8" stroke="#EA4B71" strokeWidth="8" strokeLinecap="round" />
          <circle cx="36" cy="64" r="8" fill="#FFFFFF" />
          <circle cx="92" cy="40" r="8" fill="#FFFFFF" />
          <circle cx="92" cy="88" r="8" fill="#FFFFFF" />
        </svg>
      </span>
    );
  }

  // 3. Skill Icons fallback
  if (def?.skillIconSlug) {
    return (
      <span
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={styleObj}
        title={def.name}
      >
        <img
          src={`https://skillicons.dev/icons?i=${def.skillIconSlug}`}
          alt={`${def.name} logo`}
          className="w-full h-full object-contain object-center"
          loading="lazy"
        />
      </span>
    );
  }

  // 4. Graceful text badge fallback with brand color
  return (
    <span
      className={`inline-flex items-center justify-center rounded px-1 text-[10px] font-bold text-white shrink-0 ${className}`}
      style={{
        backgroundColor: def?.brandColor || '#1763E8',
        ...styleObj,
      }}
      title={name}
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
};
