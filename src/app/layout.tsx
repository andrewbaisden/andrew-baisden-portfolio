import type { Metadata } from 'next';
import './globals.css';
import SupportWidget from './components/SupportWidget/SupportWidget';
import ThemeContextProvider from './context/ThemeContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://andrewbaisden.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Andrew Baisden | Full-Stack Software Engineer',
    template: '%s | Andrew Baisden',
  },
  description:
    'Full-stack software engineer based in London, building modern web applications with TypeScript, React, Next.js, Node.js and PostgreSQL. Explore my projects and work.',
  keywords: [
    'Andrew Baisden',
    'Software Engineer',
    'Full-Stack Software Engineer',
    'Full-Stack Developer',
    'Software Engineer London',
    'TypeScript Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'Web Application Development',
  ],
  authors: [
    {
      name: 'Andrew Baisden',
      url: 'https://andrewbaisden.com',
    },
  ],
  creator: 'Andrew Baisden',
  publisher: 'Andrew Baisden',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://andrewbaisden.com',
    siteName: 'Andrew Baisden',
    title: 'Andrew Baisden | Full-Stack Software Engineer',
    description:
      'Full-stack software engineer based in London, building modern web applications with TypeScript, React, Next.js, Node.js and PostgreSQL.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrew Baisden | Full-Stack Software Engineer',
    description:
      'Full-stack software engineer based in London, building modern web applications with TypeScript, React, Next.js, Node.js and PostgreSQL.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedTheme = localStorage.getItem('theme');
                document.documentElement.dataset.theme =
                  savedTheme === 'dark' ? 'dark' : 'light';
              } catch (_) {
                document.documentElement.dataset.theme = 'light';
              }
              try {
                var savedScene = localStorage.getItem('portfolio-hero-scene');
                var allowedScenes = {
                  london: 1,
                  mountain: 1,
                  beach: 1,
                  space: 1,
                };
                document.documentElement.dataset.heroScene =
                  savedScene && allowedScenes[savedScene]
                    ? savedScene
                    : 'london';
              } catch (_) {
                document.documentElement.dataset.heroScene = 'london';
              }
              try {
                var savedMotion = localStorage.getItem('portfolio-hero-motion');
                var reduceMotion = window.matchMedia(
                  '(prefers-reduced-motion: reduce)'
                ).matches;
                if (savedMotion === 'on' || savedMotion === 'off') {
                  document.documentElement.dataset.heroMotion = savedMotion;
                } else {
                  document.documentElement.dataset.heroMotion = reduceMotion
                    ? 'off'
                    : 'on';
                }
              } catch (_) {
                document.documentElement.dataset.heroMotion = 'on';
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeContextProvider>
          {children}
          <SupportWidget />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
