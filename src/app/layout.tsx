import type { Metadata } from "next";
import "./globals.css";
import ThemeContextProvider from './context/ThemeContext';

export const metadata: Metadata = {
  metadataBase: new URL("https://andrewbaisden.com"),
  alternates: {
    canonical: "https://andrewbaisden.com/",
  },
  title: "Andrew Baisden - Portfolio",
  description: "Andrew Baisden, born and raised in London, England, is an accomplished Software Developer, Content Creator, and Technical Writer. Proficient in JavaScript and React, Andrew excels in developing user-friendly and captivating applications.",
  keywords: [
    "Software Developer", 
    "Software Engineer", 
    "Software", 
    "Full Stack Developer", 
    "Full Stack", 
    "Full-Stack Developer", 
    "Full-Stack", 
    "Front-End Developer", 
    "FrontEnd Developer", 
    "Front-End Web Developer", 
    "Web Developer", 
    "Website Development", 
    "Website Design", 
    "Freelancer", 
    "Freelancer London", 
    "Andrew Baisden", 
    "AndrewBaisden", 
    "Andrew", 
    "Baisden", 
    "Baisden Andrew", 
    "BaisdenAndrew", 
    "Developer", 
    "Designer", 
    "Front-End", 
    "Back-End", 
    "Frontend", 
    "Backend", 
    "Andrew Baisden Developer", 
    "Andrew Baisden Frontend Developer", 
    "Andrew Baisden Full Stack", 
    "Andrew Baisden Full-Stack", 
    "Developer London", 
    "Web Developer London", 
    "React Developer", 
    "React", 
    "ReactJS", 
    "React Developer London", 
    "JavaScript", 
    "JavaScript Developer", 
    "Developer JavaScript", 
    "MERN Stack", 
    "MERN", 
    "SQL Developer", 
    "Express Developer", 
    "Node Developer", 
    "Nodejs Developer", 
    "Blogging", 
    "Writing", 
    "Technical Writing", 
    "Python", 
    "TypeScript", 
    "React Native",
    "Django", 
    "Content Creator"
  ]
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
                document.documentElement.dataset.heroScene =
                  savedScene === 'mountain' ? 'mountain' : 'london';
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
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  );
}
