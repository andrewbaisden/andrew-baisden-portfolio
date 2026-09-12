import React from 'react';
import './ContactText.css';

interface ContactTextProps {}

export const ContactText = ({ ...props }: ContactTextProps) => {
  return (
    <>
      <div className="contact-text">
        <p>
          I am open to talking about other projects. You can reach me here at{' '}
          <a href="mailto:info@andrewbaisden.com">info@andrewbaisden.com</a>. I
          look forward to hearing from you!
        </p>
      </div>
    </>
  );
};

export default ContactText;
