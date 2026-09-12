import type { ReactNode } from 'react';
import Image from 'next/image';
import profilePicture from '../../img/profile-picture.png';
import './SocialMediaCarousel.css';

type SocialProfile = {
  id: string;
  featured?: boolean;
  name: string;
  category: string;
  href: string;
  copy: string;
  accent: string;
  icon: ReactNode;
  visual?: ReactNode;
};

const ExternalIcon = () => (
  <svg className="social-card-external" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect
      x="6.5"
      y="6.5"
      width="11"
      height="11"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M14 7.5h2.5V10M16.5 7.5 10 14"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.9-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
  </svg>
);

const SubstackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3.2 2.8h17.6v2.4H3.2V2.8Zm0 5.1h17.6v2.5L12 16.2 3.2 10.4V7.9Zm0 13.3V14l8.8 5.7 8.8-5.7v7.2H3.2Z" />
  </svg>
);

const DevIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7.5 8.2c-.4 0-.7.1-1 .4L5 10.4v3.2l1.5 1.8c.3.3.6.4 1 .4h1.2V8.2H7.5Zm8.2 0c.9 0 1.6.3 2.1.9.5.6.8 1.4.8 2.5s-.3 1.9-.8 2.5c-.5.6-1.2.9-2.1.9H13V8.2h2.7Zm-9.2 1.4h.5v4.8H6.5l-1-1.2v-2.4l1-1.2Zm8.7 0H14.5v4.8h.7c.5 0 .8-.2 1.1-.5.3-.3.4-.8.4-1.5s-.1-1.2-.4-1.5c-.3-.3-.6-.5-1.1-.5Zm3.1-.1 1.8 5.3h-1.4l-.3-1h-1.9l-.3 1h-1.4l1.8-5.3h1.7Zm-.8 1.5-.6 2h1.2l-.6-2Z" />
  </svg>
);

const MediumIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.4 7.4A1.2 1.2 0 0 0 4 8.5v7.4c0 .5.2.9.5 1.1.2.1.4.2.6.2.3 0 .6-.1.9-.4l3.3-3.1 3.3 3.1c.3.3.6.4.9.4.2 0 .4-.1.6-.2.3-.2.5-.6.5-1.1V8.5c0-.5-.2-.9-.5-1.1A1.3 1.3 0 0 0 13 7c-.3 0-.6.1-.9.4L9.3 10 6.5 7.4C6.2 7.1 5.9 7 5.6 7c-.4 0-.8.1-1.2.4Zm10.2.4v8.4c0 .5.4.9.9.9h.4c.4 0 .7-.2.9-.5l3.8-5.6v5.2c0 .5.4.9.9.9s.9-.4.9-.9V7.8c0-.5-.4-.9-.9-.9h-.4c-.4 0-.7.2-.9.5L16.4 13V7.8c0-.5-.4-.9-.9-.9s-.9.4-.9.9Z" />
  </svg>
);

const FreeCodeCampIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8 16.5c.8 1.4 2.3 2.3 4 2.3s3.2-.9 4-2.3"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M12 18.8V21M9.5 5.5C8 7.2 7.2 9.4 7.2 11.4c0 2.7 2.1 4.8 4.8 4.8s4.8-2.1 4.8-4.8c0-2-.8-4.2-2.3-5.9"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M9.8 8.8c.7-.8 1.5-1.4 2.2-2.6.7 1.2 1.5 1.8 2.2 2.6"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14.1 10.3 21.2 2h-1.7l-6.2 7.2L8.4 2H3l7.5 10.9L3 22h1.7l6.5-7.6L15.6 22H21L14.1 10.3Zm-2.3 2.7-.8-1.1L5.3 3.3h2.6l4.9 7.1.8 1.1 6.4 9.2h-2.6l-5.6-8.1Z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.4 11.3c-.1-3.2-1.9-5.1-4.9-5.1h-.1c-1.8 0-3.3.8-4.2 2.2l1.7 1.1c.7-1 1.8-1.3 2.6-1.3h.1c1 0 1.8.3 2.3.9.4.4.6 1 .7 1.7-1-.1-1.9-.2-2.9-.1-2.9.2-4.7 1.8-4.6 4.1.1 1.2.7 2.2 1.7 2.9 1 .6 2.1.8 3.2.8 1.5-.1 2.7-.7 3.5-1.7.6-.8 1-1.8 1.2-3.1.7.4 1.3 1 1.6 1.7.5 1.1.5 3-.9 4.5-1.3 1.3-3 1.9-5.4 1.9-3.3 0-5.4-.9-6.7-2.6C3.9 17.3 3.3 15 3.3 12s.6-5.3 2.1-7.2C6.7 3.1 8.8 2 12 2h.1c3.3 0 5.4 1.1 6.8 3.3.7.8 1.2 1.9 1.6 3.1l1.9-.5c-.4-1.5-1.1-2.8-1.9-3.9C18.7 1.2 16 0 12.1 0h-.1C8.7 0 6.1 1.1 4.3 3.4 2.8 5.4 2 8.1 1.9 11.6v.8c.1 3.5.9 6.2 2.4 8.2 1.8 2.3 4.4 3.4 7.8 3.4h.1c3 0 5.2-.8 6.9-2.6 2.3-2.3 2.2-5.2 1.5-7 .6-1.3 1.6-2.3 3-3l-.9-1.5c-1.5.8-2.5 1.9-3.1 3.1Z" />
  </svg>
);

const GitHubVisual = () => (
  <div className="social-visual social-visual-github">
    <div className="social-visual-window">
      <div className="social-visual-chrome">
        <span />
        <span />
        <span />
        <p>github.com/andrewbaisden</p>
      </div>
      <div className="social-visual-repo">
        <p>andrew-baisden-portfolio-2022</p>
        <span>Next.js · TypeScript · Public</span>
      </div>
      <div className="social-visual-repo">
        <p>production apps & experiments</p>
        <span>React · Node · Python · Public</span>
      </div>
    </div>
  </div>
);

const LinkedInVisual = () => (
  <div className="social-visual social-visual-linkedin">
    <div className="social-visual-window">
      <div className="social-visual-profile">
        <Image src={profilePicture} alt="" width={56} height={56} />
        <div>
          <p>Andrew Baisden</p>
          <span>Full Stack Engineer · London</span>
        </div>
      </div>
      <div className="social-visual-pills">
        <span>Open to work</span>
        <span>Engineering</span>
        <span>AI</span>
      </div>
      <div className="social-visual-repo">
        <p>Projects, articles, and engineering lessons</p>
        <span>Web · AI · Career updates</span>
      </div>
    </div>
  </div>
);

const profiles: SocialProfile[] = [
  {
    id: 'github',
    featured: true,
    name: 'GitHub',
    category: 'Code & Projects',
    href: 'https://github.com/andrewbaisden',
    copy: 'Where I build in public and share the applications, experiments, and technical projects I\'m working on. Explore my latest repositories, production projects, open-source work, and the technologies I\'m currently using.',
    accent: '#2f2f3a',
    icon: <GitHubIcon />,
    visual: <GitHubVisual />,
  },
  {
    id: 'linkedin',
    featured: true,
    name: 'LinkedIn',
    category: 'Professional Network',
    href: 'https://www.linkedin.com/in/andrew-baisden/',
    copy: 'My professional network for software engineering, career updates, technical insights, and industry conversations. I share projects I\'m building, articles I\'ve written, engineering lessons, and developments across web and AI engineering.',
    accent: '#0a66c2',
    icon: <LinkedInIcon />,
    visual: <LinkedInVisual />,
  },
  {
    id: 'substack',
    name: 'Substack',
    category: 'Newsletter & Insights',
    href: 'https://thelevelupmindset.substack.com/?utm_campaign=profile_chips',
    copy: 'Home of The Level Up Mindset, where I publish longer-form thoughts on software development, technology, career growth, productivity, and continuous learning.',
    accent: '#ff6719',
    icon: <SubstackIcon />,
  },
  {
    id: 'dev',
    name: 'DEV Community',
    category: 'Technical Articles',
    href: 'https://dev.to/andrewbaisden',
    copy: 'One of the main places I publish practical developer content. My articles cover JavaScript, TypeScript, React, Next.js, full-stack development, developer tooling, AI, and lessons learned from building real projects.',
    accent: '#0a0a0a',
    icon: <DevIcon />,
  },
  {
    id: 'medium',
    name: 'Medium',
    category: 'Engineering & Technology',
    href: 'https://andrewbaisden.medium.com/',
    copy: 'A collection of my technical writing covering modern web development, software engineering, developer tools, AI, and emerging technologies. It\'s also home to tutorials and collaborations I\'ve produced over the years.',
    accent: '#2f2f3a',
    icon: <MediumIcon />,
  },
  {
    id: 'freecodecamp',
    name: 'freeCodeCamp',
    category: 'In-Depth Tutorials',
    href: 'https://www.freecodecamp.org/news/author/andrewbaisden/',
    copy: 'Long-form educational content written for the wider developer community. I use freeCodeCamp for comprehensive tutorials that turn projects and technical concepts into practical, step-by-step learning resources.',
    accent: '#0a0a23',
    icon: <FreeCodeCampIcon />,
  },
  {
    id: 'x',
    name: 'X',
    category: 'Developer Community',
    href: 'https://twitter.com/andrewbaisden',
    copy: 'Where I connect with the wider tech community, share what I\'m building, discuss software engineering and AI, and keep up with developers, tools, open-source projects, and emerging technology.',
    accent: '#2f2f3a',
    icon: <XIcon />,
  },
  {
    id: 'threads',
    name: 'Threads',
    category: 'Building & Conversations',
    href: 'https://www.threads.net/@andrew.codes',
    copy: 'A more conversational look at my developer journey. I share projects in progress, coding insights, technology discussions, and shorter updates from what I\'m learning and building.',
    accent: '#2f2f3a',
    icon: <ThreadsIcon />,
  },
];

export const SocialMediaCarousel = () => {
  return (
    <div className="social-grid">
      {profiles.map((profile) => (
        <a
          key={profile.id}
          className={
            profile.featured
              ? 'social-card social-card-featured'
              : 'social-card'
          }
          href={profile.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${profile.name}, ${profile.category}`}
        >
          <div className="social-card-top">
            <div className="social-card-identity">
              <span
                className="social-card-icon"
                style={{ background: profile.accent }}
              >
                {profile.icon}
              </span>
              <div>
                <h2>{profile.name}</h2>
                <p className="social-card-category">{profile.category}</p>
              </div>
            </div>
            <ExternalIcon />
          </div>
          <p className="social-card-copy">
            {profile.id === 'substack' ? (
              <>
                Home of <strong>The Level Up Mindset</strong>, where I publish
                longer-form thoughts on software development, technology, career
                growth, productivity, and continuous learning.
              </>
            ) : (
              profile.copy
            )}
          </p>
          {profile.visual}
        </a>
      ))}
    </div>
  );
};

export default SocialMediaCarousel;
