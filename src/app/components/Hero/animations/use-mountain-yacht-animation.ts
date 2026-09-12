'use client';

import { useEffect, type RefObject } from 'react';
import { MOUNTAIN_SCENE } from '../scenes/mountain-tracks';

type UseMountainYachtAnimationArgs = {
  yachtRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  startX: number;
  endX: number;
  scale: number;
  /** One-way crossing duration in seconds (round-trip = 2×). */
  durationSec: number;
};

function sceneXToPx(sceneX: number, canvasWidth: number): number {
  return (sceneX / MOUNTAIN_SCENE.width) * canvasWidth;
}

function buildTransform(xPx: number, scale: number, flipX: number): string {
  // Pixel X (scene→canvas). scaleX flips the artwork for the return leg.
  return `translate3d(${xPx}px, 0, 0) translate(-50%, -100%) scaleX(${flipX}) scale(${scale})`;
}

/**
 * Continuous mid-lake yacht loop: L→R, flip, R→L, flip, repeat.
 */
export function useMountainYachtAnimation({
  yachtRef,
  enabled,
  startX,
  endX,
  scale,
  durationSec,
}: UseMountainYachtAnimationArgs): void {
  useEffect(() => {
    const el = yachtRef.current;
    if (!el) {
      return;
    }

    const canvas = el.closest('.mountain-scene__canvas') as HTMLElement | null;
    if (!canvas) {
      return;
    }

    el.getAnimations().forEach((a) => a.cancel());

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!enabled || reduce) {
      el.style.opacity = '';
      return;
    }

    let animation: Animation | null = null;

    const syncPause = () => {
      if (!animation) return;
      const scene = el.closest('.mountain-scene');
      const ambientPaused =
        scene?.getAttribute('data-ambient-motion') === 'paused';
      const motionOff =
        el.closest('.mountain-env')?.getAttribute('data-motion') === 'off';
      if (ambientPaused || motionOff || document.hidden) {
        animation.pause();
      } else {
        animation.play();
      }
    };

    const build = () => {
      animation?.cancel();
      const canvasWidth = canvas.getBoundingClientRect().width;
      if (canvasWidth < 8) {
        return;
      }

      const oneWayMs = Math.max(durationSec, 8) * 1000;
      const roundTripMs = oneWayMs * 2;
      const startPx = sceneXToPx(startX, canvasWidth);
      const endPx = sceneXToPx(endX, canvasWidth);

      animation = el.animate(
        [
          {
            offset: 0,
            transform: buildTransform(startPx, scale, 1),
            opacity: 1,
            easing: 'linear',
          },
          {
            offset: 0.49,
            transform: buildTransform(endPx, scale, 1),
            opacity: 1,
            easing: 'linear',
          },
          {
            // Face left for the return leg
            offset: 0.5,
            transform: buildTransform(endPx, scale, -1),
            opacity: 1,
            easing: 'linear',
          },
          {
            offset: 0.99,
            transform: buildTransform(startPx, scale, -1),
            opacity: 1,
            easing: 'linear',
          },
          {
            // Face right again for the next outbound leg
            offset: 1,
            transform: buildTransform(startPx, scale, 1),
            opacity: 1,
          },
        ],
        {
          duration: roundTripMs,
          iterations: Infinity,
          fill: 'both',
        },
      );

      syncPause();
    };

    build();

    const mo = new MutationObserver(syncPause);
    const scene = el.closest('.mountain-scene');
    const env = el.closest('.mountain-env');
    if (scene) {
      mo.observe(scene, {
        attributes: true,
        attributeFilter: ['data-ambient-motion'],
      });
    }
    if (env) {
      mo.observe(env, { attributes: true, attributeFilter: ['data-motion'] });
    }

    const onVisibility = () => syncPause();
    document.addEventListener('visibilitychange', onVisibility);

    const ro = new ResizeObserver(() => build());
    ro.observe(canvas);

    return () => {
      mo.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      animation?.cancel();
    };
  }, [yachtRef, enabled, startX, endX, scale, durationSec]);
}
