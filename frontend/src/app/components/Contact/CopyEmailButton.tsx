'use client';

import { useEffect, useState } from 'react';

const EMAIL = 'info@andrewbaisden.com';

export const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      className="contact-copy-button"
      onClick={handleCopy}
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
    >
      {copied ? 'Copied ✓' : 'Copy email'}
    </button>
  );
};

export default CopyEmailButton;
