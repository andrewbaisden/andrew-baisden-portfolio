'use client';

import CopyEmailButton from './CopyEmailButton';

export const ContactDetails = () => {
  return (
    <aside
      className="contact-details"
      aria-labelledby="contact-details-heading"
    >
      <p className="contact-details-kicker">Get in touch</p>
      <h3 id="contact-details-heading">
        Have a role, project or collaboration in mind?
      </h3>
      <p className="contact-details-copy">
        Feel free to send me a message. I read every enquiry and usually reply
        as soon as I can.
      </p>

      <div className="contact-details-block">
        <p className="contact-details-label">Email</p>
        <div className="contact-details-email-row">
          <a href="mailto:info@andrewbaisden.com">info@andrewbaisden.com</a>
          <CopyEmailButton />
        </div>
      </div>

      <div className="contact-details-block">
        <p className="contact-details-label">Location</p>
        <p className="contact-details-value">London, UK</p>
      </div>

      <p className="contact-availability">
        <span className="contact-availability-dot" aria-hidden="true" />
        Open to opportunities
      </p>

      <div className="contact-details-links">
        <a
          href="https://github.com/andrewbaisden"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/andrew-baisden/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </aside>
  );
};

export default ContactDetails;
