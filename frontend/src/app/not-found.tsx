'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from './img/logo.svg';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import FooterText from './components/FooterText/FooterText';
import './not-found.css';

const REDIRECT_SECONDS = 60;

export default function NotFound() {
  const router = useRouter();
  const [secondsRemaining, setSecondsRemaining] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      router.push('/');
    }, REDIRECT_SECONDS * 1000);

    const countdownTimer = window.setInterval(() => {
      setSecondsRemaining((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => {
      window.clearTimeout(redirectTimer);
      window.clearInterval(countdownTimer);
    };
  }, [router]);

  return (
    <div className="not-found-page">
      <header className="not-found-header">
        <section className="not-found-header-inner">
          <a
            href="/"
            aria-label="Go to homepage"
            className="not-found-logo-link"
          >
            <Image
              src={Logo}
              alt="Andrew Baisden Logo"
              width={50}
              height={50}
            />
          </a>
          <div className="not-found-nav-wrap">
            <nav className="not-found-nav">
              <a href="/#home">Home</a>
              <a href="/#about">About</a>
              <a href="/#socialmedia">Developer Network</a>
              <a href="/#skills">Tech Stack</a>
              <a href="/#contact">Contact</a>
            </nav>
            <ThemeToggle />
          </div>
        </section>
      </header>

      <main className="not-found-main">
        <section className="not-found-card">
          <h1>404</h1>
          <p>Sorry, this page could not be found.</p>
          <p>
            <a href="/">Return to homepage</a>
          </p>
          <p className="not-found-redirect-text">
            Redirecting to homepage in {secondsRemaining}s...
          </p>
        </section>
      </main>

      <footer className="footer-light-theme">
        <FooterText />
      </footer>
    </div>
  );
}
