import type { ReactNode } from 'react';
import './TechStack.css';

type TechItem = {
  name: string;
  icon: string;
};

type TechCategory = {
  title: string;
  description: string;
  technologies: TechItem[];
};

const coreStack: TechItem[] = [
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'PostgreSQL', icon: 'postgresql' },
];

const techCategories: TechCategory[] = [
  {
    title: 'Frontend',
    description:
      'Interfaces and application architecture for modern web products.',
    technologies: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'shadcn/ui', icon: 'shadcn' },
      { name: 'TanStack Query', icon: 'tanstack' },
    ],
  },
  {
    title: 'Backend & Data',
    description:
      'Type-safe APIs, relational data and scalable application backends.',
    technologies: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Prisma', icon: 'prisma' },
      { name: 'Drizzle ORM', icon: 'drizzle' },
      { name: 'Zod', icon: 'zod' },
      { name: 'REST APIs', icon: 'rest' },
    ],
  },
  {
    title: 'Production & Cloud',
    description: 'Testing, deployment, CI/CD and production infrastructure.',
    technologies: [
      { name: 'Docker', icon: 'docker' },
      { name: 'GitHub Actions', icon: 'github-actions' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'AWS', icon: 'aws' },
      { name: 'Vitest', icon: 'vitest' },
      { name: 'Playwright', icon: 'playwright' },
    ],
  },
  {
    title: 'AI & Automation',
    description:
      'AI-assisted development, agents, tool use and intelligent automation.',
    technologies: [
      { name: 'OpenAI', icon: 'openai' },
      { name: 'Anthropic', icon: 'anthropic' },
      { name: 'MCP', icon: 'mcp' },
      { name: 'AI Agents', icon: 'agents' },
      { name: 'Hermes AI', icon: 'hermes' },
      { name: 'OpenClaw', icon: 'openclaw' },
    ],
  },
];

const alsoWorkWith: TechItem[] = [
  { name: 'Python', icon: 'python' },
  { name: 'NestJS', icon: 'nestjs' },
  { name: 'Express', icon: 'express' },
  { name: 'Django', icon: 'django' },
  { name: 'Zustand', icon: 'zustand' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Neon', icon: 'neon' },
  { name: 'Redis', icon: 'redis' },
  { name: 'Sentry', icon: 'sentry' },
  { name: 'PostHog', icon: 'posthog' },
];

const TechIcon = ({ name }: { name: string }) => {
  const icons: Record<string, ReactNode> = {
    typescript: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="currentColor" />
        <path
          d="M8.2 12.1h3.2v-1.5H4.9v1.5h3.1V20h1.2v-7.9Zm4.7 7.7c.4.4.9.6 1.6.8.7.2 1.4.2 2.1.2 1.3 0 2.3-.3 3.1-.8.8-.5 1.2-1.3 1.2-2.3 0-.7-.2-1.3-.6-1.8-.4-.5-1.1-.9-2-1.3l-1.3-.5c-.5-.2-.8-.4-1-.6-.2-.2-.3-.5-.3-.8 0-.3.1-.6.4-.8.3-.2.7-.3 1.2-.3.5 0 1 .1 1.5.3.5.2.9.4 1.3.7v-1.6c-.4-.2-1-.4-1.6-.5-.6-.1-1.2-.2-1.8-.2-1.2 0-2.2.3-2.9.8-.7.5-1.1 1.2-1.1 2.2 0 1.5.9 2.5 2.7 3.2l1.3.5c.6.2 1 .4 1.2.7.2.2.3.5.3.9 0 .4-.2.7-.5.9-.3.2-.8.4-1.4.4-.7 0-1.4-.1-2-.4-.6-.3-1.1-.6-1.5-.9v1.8Z"
          fill="#fff"
        />
      </svg>
    ),
    react: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="2.1" fill="currentColor" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.8"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.8"
          transform="rotate(60 12 12)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.8"
          transform="rotate(120 12 12)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    nextjs: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.8 16.4-.9-1.4A8.1 8.1 0 0 1 5.6 8.2l4.6 12.2A8.1 8.1 0 0 1 7.6 20 8.2 8.2 0 0 1 16.8 18.4ZM9.3 7.2h1.5l4.9 7.7V7.2h1.4v10.1h-1.5L10.7 9.6v7.7H9.3V7.2Z" />
      </svg>
    ),
    nodejs: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.3 2.2 3.8 6.5c-.4.3-.7.8-.7 1.3v8.4c0 .5.3 1 .7 1.3l7.5 4.3c.4.2 1 .2 1.4 0l7.5-4.3c.4-.3.7-.8.7-1.3V7.8c0-.5-.3-1-.7-1.3l-7.5-4.3c-.4-.2-1-.2-1.4 0Zm.7 2.2 5.8 3.3v2.3l-4 2.2v4.3l-1.8 1V8.8L18 6.3 12 2.9 6 6.3v8.8l6 3.4v-2.2l-4.2-2.4V8.8L12 6.6v-2.2Z" />
      </svg>
    ),
    postgresql: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="6.5" rx="7" ry="2.8" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M5 6.5v8c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8v-8"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M5 10.5c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    ),
    tailwind: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 6.4c-2.5 0-4.1.8-4.8 2.5 1-.8 2.1-1.1 3.3-.9.7.1 1.2.5 1.8 1 .8.8 1.7 1.7 3.7 1.7 2.5 0 4.1-.8 4.8-2.5-1 .8-2.1 1.1-3.3.9-.7-.1-1.2-.5-1.8-1-.8-.8-1.7-1.7-3.7-1.7Zm-4.8 5.1C4.7 11.5 3.1 12.3 2.4 14c1-.8 2.1-1.1 3.3-.9.7.1 1.2.5 1.8 1 .8.8 1.7 1.7 3.7 1.7 2.5 0 4.1-.8 4.8-2.5-1 .8-2.1 1.1-3.3.9-.7-.1-1.2-.5-1.8-1-.8-.8-1.7-1.7-3.7-1.7Z" />
      </svg>
    ),
    shadcn: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 4h8l4 8-4 8H8L4 12l4-8Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path d="m9 12 3-5 3 5-3 5-3-5Z" fill="currentColor" />
      </svg>
    ),
    tanstack: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M8 14.5 12 7l4 7.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    prisma: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="m13.7 3.2 6.1 14.5c.3.8-.2 1.7-1.1 1.9L8.4 22c-.8.2-1.6-.5-1.5-1.4L8.8 4.2c.1-1.1 1.5-1.6 2.4-.8l2.5 2.4-2.2 11.2 5.5-12.1c.3-.6 1.1-.8 1.7-.3l.2.2-2.2-1.6Z" />
      </svg>
    ),
    drizzle: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8.4 4.2c.4-.6 1.3-.6 1.7 0L12 6.8l1.9-2.6c.4-.6 1.3-.6 1.7 0 2.6 3.6 4.2 6.6 4.2 9.3 0 3.6-2.6 6.3-5.8 6.3-1.2 0-2.3-.4-3.2-1.1-.9.7-2 1.1-3.2 1.1-3.2 0-5.8-2.7-5.8-6.3 0-2.7 1.6-5.7 4.2-9.3Z" />
      </svg>
    ),
    zod: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.5 6.5h11l-11 11h11"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    rest: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 8H6a3 3 0 0 0 0 6h2M16 8h2a3 3 0 0 1 0 6h-2M9 12h6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
    docker: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.4 10.4h2.1V8.4H4.4v2Zm2.6 0h2.1V8.4H7v2Zm2.6 0h2.1V8.4H9.6v2Zm0-2.5h2.1V5.9H9.6v2Zm2.6 2.5h2.1V8.4h-2.1v2Zm0-2.5h2.1V5.9h-2.1v2Zm2.6 2.5h2.1V8.4H14.8v2ZM3.2 10.4h1.2v2.1c0 3.3 2.7 5.2 6.6 5.2 4.7 0 8.4-2 8.4-6.2 1.2.1 2.6-.5 3.3-1.7-1.4.7-2.9.5-3.6.3C17.5 6.6 15.4 5 12.4 5c-.4 0-.7 0-1 .1V6h-2v1.9H7.3V6H5.2v1.9H3.2v2.5Z" />
      </svg>
    ),
    'github-actions': (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1.2 5.4 6 3.6-6 3.6V7.4Zm1.2 12.3A7.7 7.7 0 0 1 6.8 8.4a7.7 7.7 0 1 1 10.4 11.3Z" />
      </svg>
    ),
    vercel: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="m12 4 10 16H2L12 4Z" />
      </svg>
    ),
    aws: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7.2 14.2 12 8.8l4.8 5.4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 16.8c2.6 2.2 6 3.4 9.6 3.4 2.6 0 5.1-.6 7.4-1.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
    vitest: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2 4.5 6.2v5.5c0 4.6 3.2 8.8 7.5 10.1 4.3-1.3 7.5-5.5 7.5-10.1V6.2L12 2Zm-.2 13.7-3.5-3.5 1.4-1.4 2.1 2.1 4.4-4.4 1.4 1.4-5.8 5.8Z" />
      </svg>
    ),
    playwright: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="4"
          y="5"
          width="16"
          height="14"
          rx="2.2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M8 12.5c.6 1.4 1.9 2.3 4 2.3s3.4-.9 4-2.3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle cx="9.2" cy="10.2" r="1" fill="currentColor" />
        <circle cx="14.8" cy="10.2" r="1" fill="currentColor" />
      </svg>
    ),
    openai: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.4 3.4c.8-1.4 2.8-1.4 3.6 0l1.2 2.1c.2.3.5.5.8.6l2.3.3c1.6.2 2.2 2.2 1.1 3.3l-1.7 1.6c-.2.3-.4.6-.4.9l.3 2.3c.2 1.6-1.4 2.8-2.9 2.2l-2.2-.9c-.3-.1-.7-.1-1 0l-2.2.9c-1.5.6-3.1-.6-2.9-2.2l.3-2.3c0-.3-.2-.6-.4-.9L5.6 9.7c-1.1-1.1-.5-3.1 1.1-3.3l2.3-.3c.3-.1.6-.3.8-.6l1.6-2.1Zm.8 5.1a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
      </svg>
    ),
    anthropic: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.8 4h2.6L21 20h-2.7l-1.2-3.4H7.9L6.7 20H4L8.6 4h2.6l-.8 2.3h5.2L12.8 4Zm-3.4 9.3h5.2L12.1 7.8 9.4 13.3Z" />
      </svg>
    ),
    mcp: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="6.5" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.5" cy="7.5" r="2.4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.5" cy="16.5" r="2.4" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M8.8 11.2 15.2 8.4M8.8 12.8l6.4 2.8"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    ),
    agents: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="6.5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="6.5" cy="16.5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.5" cy="16.5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M10.3 8.2 7.8 14.3M13.7 8.2l2.5 6.1M8.8 16.5h6.4"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    ),
    hermes: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 19V5h2.2l3.8 6.6L17.8 5H20v14h-2.4V9.4L14.2 16h-1.4L8.8 9.4V19H8Z"
          fill="currentColor"
        />
      </svg>
    ),
    openclaw: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 16.5c1.2 1.7 3 2.7 5 2.7 3.4 0 6.2-2.6 6.2-6.2 0-2.2-1.1-3.9-2.4-5.1"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M12 4.5c.4 2.4 0 4.6-1.4 6.3M8.2 6.2c1.3 1.8 1.8 3.8 1.5 5.8M5.8 8.8c1.6 1.4 2.5 3.3 2.5 5.3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  };

  return icons[name] ?? null;
};

const CoreTechBadge = ({ item }: { item: TechItem }) => (
  <li>
    <span className="tech-core-badge">
      <span className={`tech-icon tech-icon-${item.icon}`} aria-hidden="true">
        <TechIcon name={item.icon} />
      </span>
      {item.name}
    </span>
  </li>
);

const TechBadge = ({ item }: { item: TechItem }) => (
  <li>
    <span className="tech-badge">
      <span className={`tech-icon tech-icon-${item.icon}`} aria-hidden="true">
        <TechIcon name={item.icon} />
      </span>
      {item.name}
    </span>
  </li>
);

const TechCategoryCard = ({ category }: { category: TechCategory }) => (
  <article className="tech-category-card">
    <h3>{category.title}</h3>
    <p className="tech-category-copy">{category.description}</p>
    <ul className="tech-badge-list">
      {category.technologies.map((item) => (
        <TechBadge item={item} key={item.name} />
      ))}
    </ul>
  </article>
);

export const TechStack = () => {
  return (
    <div className="tech-stack">
      <p className="tech-stack-lede">
        Technologies I use to build, ship and maintain modern production
        applications.
      </p>

      <section className="tech-core" aria-labelledby="core-stack-heading">
        <h3 id="core-stack-heading">Core Stack</h3>
        <ul className="tech-core-list">
          {coreStack.map((item) => (
            <CoreTechBadge item={item} key={item.name} />
          ))}
        </ul>
      </section>

      <div className="tech-category-grid">
        {techCategories.map((category) => (
          <TechCategoryCard category={category} key={category.title} />
        ))}
      </div>

      <section className="tech-secondary" aria-labelledby="also-work-heading">
        <h3 id="also-work-heading">Also work with</h3>
        <ul className="tech-secondary-list">
          {alsoWorkWith.map((item) => (
            <li key={item.name}>
              <span className="tech-secondary-pill">{item.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TechStack;
