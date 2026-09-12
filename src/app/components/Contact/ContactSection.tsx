'use client';

import ContactDetails from './ContactDetails';
import ContactForm from './ContactForm';
import './ContactSection.css';

export const ContactSection = () => {
  return (
    <div className="contact-section-layout">
      <div className="contact-intro">
        <p className="contact-intro-kicker">Contact</p>
        <h2 className="contact-intro-title">Let&apos;s build something.</h2>
        <p className="contact-intro-copy">
          I&apos;m open to software engineering opportunities, freelance projects
          and technical collaborations. If you&apos;re working on something
          interesting, I&apos;d love to hear about it.
        </p>
      </div>

      <div className="contact-panel-grid">
        <ContactDetails />
        <div className="contact-form-panel">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
