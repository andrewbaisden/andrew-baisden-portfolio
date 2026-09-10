'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import profilePicture from '../../img/profile-picture.png';
import './AboutProfileText.css';

type AboutCard = {
  id: string;
  label: string;
  accent: string;
  headline: string;
  description?: string;
  points: string[];
  icon: ReactNode;
  visual: ReactNode;
};

const CheckIcon = () => (
  <svg
    className="about-card-check"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.14" />
    <path
      d="M5.8 10.2 8.4 12.8 14.2 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M5.5 18.5c1.2-2.8 3.5-4.2 6.5-4.2s5.3 1.4 6.5 4.2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const ToolingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect
      x="4"
      y="5"
      width="16"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M8 10.5 10.5 13 8 15.5M13 15.5h3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ExperienceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8 9V7.5A2.5 2.5 0 0 1 10.5 5h3A2.5 2.5 0 0 1 16 7.5V9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <rect
      x="4.5"
      y="9"
      width="15"
      height="10"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path d="M4.5 13.5h15" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const CompassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="m14.8 9.2-1.4 4.2-4.2 1.4 1.4-4.2 4.2-1.4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const LoopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 8.5A5.5 5.5 0 0 1 17.5 10M17 15.5A5.5 5.5 0 0 1 6.5 14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M16 6.5 17.5 10 14 11M8 17.5 6.5 14 10 13"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProfileVisual = () => (
  <div className="about-visual about-visual-profile">
    <div className="about-visual-window">
      <div className="about-visual-chrome">
        <span />
        <span />
        <span />
      </div>
      <div className="about-visual-profile-body">
        <Image
          src={profilePicture}
          alt="Andrew Baisden"
          width={72}
          height={72}
        />
        <div>
          <p className="about-visual-name">Andrew Baisden</p>
          <p className="about-visual-role">Full Stack Engineer</p>
          <div className="about-visual-tags">
            <span>React</span>
            <span>Next.js</span>
            <span>TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ToolingVisual = () => (
  <div className="about-visual about-visual-tooling">
    <div className="about-visual-window">
      <div className="about-visual-chrome">
        <span />
        <span />
        <span />
        <p>ghostty</p>
      </div>
      <pre>
        <span className="about-visual-prompt">~/dev</span>
        <span className="about-visual-cmd"> cursor .</span>
        {'\n'}
        <span className="about-visual-comment"># pick the model for the job</span>
        {'\n'}
        <span className="about-visual-prompt">→</span>
        <span className="about-visual-cmd"> claude · gpt · gemini</span>
      </pre>
    </div>
    <div className="about-visual-pills">
      <span>Cursor</span>
      <span>VS Code</span>
      <span>Postman</span>
    </div>
  </div>
);

const ExperienceVisual = () => (
  <div className="about-visual about-visual-experience">
    <div className="about-visual-window about-visual-chart">
      <p>Shipped work</p>
      <div className="about-visual-bars" aria-hidden="true">
        <div>
          <span style={{ height: '42%' }} />
          <span style={{ height: '28%' }} />
          <span style={{ height: '18%' }} />
        </div>
        <div>
          <span style={{ height: '50%' }} />
          <span style={{ height: '22%' }} />
          <span style={{ height: '16%' }} />
        </div>
        <div>
          <span style={{ height: '58%' }} />
          <span style={{ height: '20%' }} />
          <span style={{ height: '12%' }} />
        </div>
        <div>
          <span style={{ height: '68%' }} />
          <span style={{ height: '18%' }} />
          <span style={{ height: '10%' }} />
        </div>
        <div>
          <span style={{ height: '78%' }} />
          <span style={{ height: '14%' }} />
          <span style={{ height: '8%' }} />
        </div>
      </div>
      <div className="about-visual-legend">
        <span>Platforms</span>
        <span>Brands</span>
        <span>Writing</span>
      </div>
    </div>
  </div>
);

const OpenToVisual = () => (
  <div className="about-visual about-visual-open">
    <div className="about-visual-job">
      <p>Senior / Lead Engineer</p>
      <span>London · Remote</span>
    </div>
    <div className="about-visual-job about-visual-job-offset">
      <p>AI-focused full stack</p>
      <span>Contract · Freelance · Advisory</span>
    </div>
  </div>
);

const ProcessVisual = () => (
  <div className="about-visual about-visual-process">
    <div className="about-visual-steps">
      <div>
        <span>01</span>
        <p>Design</p>
      </div>
      <div>
        <span>02</span>
        <p>Build</p>
      </div>
      <div>
        <span>03</span>
        <p>Ship</p>
      </div>
    </div>
    <p className="about-visual-process-note">Then iterate on what users need</p>
  </div>
);

const cards: AboutCard[] = [
  {
    id: 'profile',
    label: 'Profile',
    accent: '#7148FC',
    headline: 'I ship production software',
    description:
      'Full stack engineer working with React, Next.js, TypeScript, Node/NestJS, and Python.',
    points: [
      'From architecture to deploy, then iterate',
      'Production platforms, not throwaway demos',
      'AI in the workflow, never instead of judgement',
    ],
    icon: <ProfileIcon />,
    visual: <ProfileVisual />,
  },
  {
    id: 'tooling',
    label: 'Everyday stack',
    accent: '#0e8aa8',
    headline: 'The right tool for the job',
    description:
      'Cursor and VS Code to write. Ghostty and Postman to ship. LLMs chosen per task, not by habit.',
    points: [
      'Cursor and VS Code for writing and reviewing code',
      'Ghostty in the terminal, Postman for APIs',
      'Claude, ChatGPT, Grok, Kimi, Gemini, and so many more; every model has its use case',
    ],
    icon: <ToolingIcon />,
    visual: <ToolingVisual />,
  },
  {
    id: 'experience',
    label: 'Experience',
    accent: '#0c9b56',
    headline: '7+ years of products that shipped',
    points: [
      'Next.js platforms designed to convert',
      'React and Python that replaced government Excel workflows',
      'Digital campaigns for Sky and Ocado',
      'A 288-page React guide used by developers worldwide',
    ],
    icon: <ExperienceIcon />,
    visual: <ExperienceVisual />,
  },
  {
    id: 'open-to',
    label: 'Open to',
    accent: '#c99200',
    headline: 'Senior, lead, and AI-focused roles',
    description: 'London or remote. Contract, freelance, and advisory too.',
    points: [
      'Senior or lead full-stack engineering',
      'Contract and freelance builds',
      'Technical advisory and mentoring',
    ],
    icon: <CompassIcon />,
    visual: <OpenToVisual />,
  },
  {
    id: 'process',
    label: 'How I work',
    accent: '#ef2f4c',
    headline: 'Build. Ship. Learn. Repeat.',
    description:
      'I like teams that care about architecture, developer experience, and useful software.',
    points: [
      'Explore ideas, then implement with intent',
      'Iterate on what users and businesses actually need',
      'Treat AI as a tool, not a substitute for engineering',
    ],
    icon: <LoopIcon />,
    visual: <ProcessVisual />,
  },
];

export const AboutProfileText = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 8);
    setCanScrollRight(track.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      track.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>('.about-card');
    const styles = card ? window.getComputedStyle(track) : null;
    const gap = styles ? parseFloat(styles.columnGap || styles.gap) || 24 : 24;
    const amount = (card?.offsetWidth ?? 392) + gap;

    track.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="about-cards">
      <div className="about-cards-toolbar">
        <p className="about-cards-kicker">A few things worth knowing</p>
        <div className="about-cards-nav">
          <button
            type="button"
            className="about-cards-arrow"
            aria-label="Previous about cards"
            disabled={!canScrollLeft}
            onClick={() => scrollByCard('left')}
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 3 5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="about-cards-arrow"
            aria-label="Next about cards"
            disabled={!canScrollRight}
            onClick={() => scrollByCard('right')}
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="m6 3 5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="about-cards-track"
        ref={trackRef}
        role="region"
        aria-label="About Andrew"
      >
        {cards.map((card) => (
          <article className="about-card" key={card.id}>
            <div className="about-card-visual" data-visual={card.id}>
              {card.visual}
            </div>
            <div className="about-card-body">
              <div className="about-card-label">
                <span
                  className="about-card-icon"
                  style={{ background: card.accent }}
                >
                  {card.icon}
                </span>
                {card.label}
              </div>
              <h2>{card.headline}</h2>
              {card.description ? <p>{card.description}</p> : null}
              <ul>
                {card.points.map((point) => (
                  <li key={point}>
                    <CheckIcon />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AboutProfileText;
