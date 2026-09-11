"use client";

import { useRef } from 'react';
import Hero from './components/Hero/Hero';
import Header from './components/Header/Header';
import HeroProfile from './components/HeroProfile/HeroProfile';
import AboutProfileText from './components/AboutProfileText/AboutProfileText';
import SocialMediaCarousel from './components/SocialMediaCarousel/SocialMediaCarousel';
import TechStack from './components/TechStack/TechStack';
import ContactSection from './components/Contact/ContactSection';
import FooterText from './components/FooterText/FooterText';

import { useTheme } from './context/ThemeContext';

const Home = () => {
  const { activeTheme } = useTheme();

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const scoialMediaRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <>
      <div className="container">
        <div>
          <div className="hero-container" id="home" ref={homeRef}>
            <Hero />
            <div className="hero-header-container">
              <Header
                homeRef={homeRef}
                aboutRef={aboutRef}
                scoialMediaRef={scoialMediaRef}
                skillsRef={skillsRef}
                contactRef={contactRef}
              />
            </div>
            <div className="hero-bio-container">
              <HeroProfile />
            </div>
          </div>
          <main>
            <div ref={aboutRef} id="about">
              <section className="header-section">
                <a
                  href="/#about"
                  rel="noopener noreferrer"
                  className={
                    activeTheme === 'light'
                      ? 'header-title-light'
                      : 'header-title-dark'
                  }
                >
                  About
                </a>
              </section>
              <section className="about-cards-section">
                <AboutProfileText />
              </section>
            </div>
            <div ref={scoialMediaRef} id="socialmedia">
              <section className="header-section">
                <a
                  href="/#socialmedia"
                  rel="noopener noreferrer"
                  className={
                    activeTheme === 'light'
                      ? 'header-title-light'
                      : 'header-title-dark'
                  }
                >
                  Developer Network
                </a>
              </section>
              <section className="social-media-section">
                <SocialMediaCarousel />
              </section>
            </div>
            <div ref={skillsRef} id="skills">
              <section className="header-section">
                <a
                  href="/#skills"
                  rel="noopener noreferrer"
                  className={
                    activeTheme === 'light'
                      ? 'header-title-light'
                      : 'header-title-dark'
                  }
                >
                  Tech Stack
                </a>
              </section>
              <section className="tech-stack-section">
                <TechStack />
              </section>
            </div>
            <div ref={contactRef} id="contact">
              <section className="contact-section">
                <ContactSection />
              </section>
            </div>
          </main>
          <FooterText />
        </div>
      </div>
    </>
  );
};

export default Home;
