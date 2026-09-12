'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/**
 * Escape the hero viewport stacking context so fixed dev panels
 * sit above About cards and other page content.
 */
export function HeroDevPortal({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready || typeof document === 'undefined') {
    return null;
  }

  return createPortal(children, document.body);
}

export default HeroDevPortal;
