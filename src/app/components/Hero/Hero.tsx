'use client';

import './Hero.css';
import { HeroSceneViewport } from './scenes/hero-scene-viewport';

type HeroProps = {};

/**
 * Hero artwork shell — scene engine owns the active environment.
 * Copy, CTAs, and nav stay outside so scene switches never reset them.
 */
export const Hero = ({ ...props }: HeroProps) => {
  return (
    <div className="hero-artwork-wrap" {...props}>
      <HeroSceneViewport />
    </div>
  );
};

export default Hero;
