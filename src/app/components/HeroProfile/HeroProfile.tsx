'use client';

import Typewriter from 'typewriter-effect';
import { HeroSceneControls } from '../Hero/controls/HeroSceneControls';
import './HeroProfile.css';

const typewriterPhrases = [
  'Full-Stack Engineer',
  'TypeScript Developer',
  'Product Engineer',
  'AI Engineer',
];

export const HeroProfile = () => {
  return (
    <div className="hero-profile-container">
      <div className="hero-profile">
        <p className="hero-profile-intro">Hey, I&apos;m Andrew.</p>
        <h1>Full-Stack Engineer</h1>
        <div className="hero-profile-typewriter" aria-hidden="true">
          <Typewriter
            options={{
              strings: typewriterPhrases,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <p className="hero-profile-tagline">
          I build modern web applications, developer tools and AI-powered
          products.
        </p>
        <div className="hero-profile-actions">
          <a
            className="hero-cta hero-cta-primary"
            href="https://github.com/andrewbaisden"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Projects →
          </a>
          <a className="hero-cta hero-cta-secondary" href="/#contact">
            Contact Me
          </a>
        </div>
        <HeroSceneControls />
      </div>
    </div>
  );
};

export default HeroProfile;
