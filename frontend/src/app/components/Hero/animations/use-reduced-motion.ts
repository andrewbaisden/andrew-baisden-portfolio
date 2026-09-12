'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe prefers-reduced-motion subscription.
 * Defaults to false on the server to avoid hydration mismatch;
 * updates after mount if the user prefers reduced motion.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

export default useReducedMotion;
