'use client';

import { type RefObject, useEffect } from 'react';

type UseHeroAmbientActiveArgs = {
  sceneRef: RefObject<HTMLElement | null>;
  /** When false, ambient motion stays paused (reduced motion). */
  motionEnabled: boolean;
  /** Dev override to force-pause ambient layers. */
  forcePause?: boolean;
};

/**
 * Mirrors transport visibility rules for CSS/JS ambient layers.
 * Sets data-ambient-motion="running" | "paused" on the scene root.
 */
export function useHeroAmbientActive({
  sceneRef,
  motionEnabled,
  forcePause = false,
}: UseHeroAmbientActiveArgs): void {
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) {
      return;
    }

    let heroVisible = true;
    let pageVisible = !document.hidden;

    const sync = () => {
      const active = motionEnabled && heroVisible && pageVisible && !forcePause;
      scene.dataset.ambientMotion = active ? 'running' : 'paused';

      // CSS layers use data-ambient-motion; SVG animateMotion needs the
      // corresponding SMIL timeline paused explicitly.
      scene.querySelectorAll<SVGSVGElement>('svg').forEach((svg) => {
        if (active) {
          svg.unpauseAnimations();
        } else {
          svg.pauseAnimations();
        }
      });
    };

    sync();

    const io = new IntersectionObserver(
      ([entry]) => {
        heroVisible = Boolean(
          entry?.isIntersecting && (entry.intersectionRatio ?? 0) > 0.12,
        );
        sync();
      },
      { threshold: [0, 0.12, 0.25, 0.5] },
    );
    io.observe(scene);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      sync();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      scene
        .querySelectorAll<SVGSVGElement>('svg')
        .forEach((svg) => svg.pauseAnimations());
    };
  }, [sceneRef, motionEnabled, forcePause]);
}

export default useHeroAmbientActive;
