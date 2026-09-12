import Image from 'next/image';
import firstFormationsLogo from '../../img/1stFormations_Member_Logo_Dark Background.png';
import './FooterText.css';

const footerLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Tech Stack', href: '/#skills' },
  { label: 'Developer Network', href: '/#socialmedia' },
  { label: 'Contact', href: '/#contact' },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/andrewbaisden',
    icon: GitHubIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/andrew-baisden/',
    icon: LinkedInIcon,
  },
  {
    label: 'X',
    href: 'https://twitter.com/andrewbaisden',
    icon: XIcon,
  },
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.9-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.1 10.3 21.2 2h-1.7l-6.2 7.2L8.4 2H3l7.5 10.9L3 22h1.7l6.5-7.6L15.6 22H21L14.1 10.3Zm-2.3 2.7-.8-1.1L5.3 3.3h2.6l4.9 7.1.8 1.1 6.4 9.2h-2.6l-5.6-8.1Z" />
    </svg>
  );
}

export const FooterText = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-main">
          <div className="site-footer-identity">
            <p className="site-footer-name">Andrew Baisden</p>
            <p className="site-footer-bio">
              Full-Stack Engineer building modern web applications, developer
              tools and AI-powered products.
            </p>
            <ul className="site-footer-social">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="site-footer-authorship">
              Designed and engineered by Andrew Baisden.
              <br />
              Built with Next.js + TypeScript.
            </p>
          </div>

          <nav
            className="site-footer-nav"
            aria-labelledby="footer-explore-heading"
          >
            <h2 id="footer-explore-heading" className="site-footer-nav-label">
              Explore
            </h2>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer-utility">
          <p className="site-footer-copyright">
            &copy; {year} Andrew Baisden
          </p>
          <p className="site-footer-location">London, UK</p>
          <a
            className="site-footer-badge-link"
            href="https://www.1stformations.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="1st Formations Company Secretarial Member"
          >
            <Image
              src={firstFormationsLogo}
              alt="1st Formations Company Secretarial Member"
              width={88}
              height={32}
              className="site-footer-badge"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterText;
