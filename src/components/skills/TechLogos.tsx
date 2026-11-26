import React from 'react';
import { TechIcon } from '../common/TechIcon';

export interface TechLogoProps {
  name: string;
  className?: string;
  size?: number | string;
}

/**
 * Re-exports TechIcon as TechLogo for backward compatibility across Skills section.
 * Renders Devicon font classes and Simple Icons CDN logos with zero local assets.
 */
export const TechLogo: React.FC<TechLogoProps> = ({ name, className = 'w-6 h-6', size }) => {
  return <TechIcon name={name} className={className} size={size} />;
};

export { TechIcon };
