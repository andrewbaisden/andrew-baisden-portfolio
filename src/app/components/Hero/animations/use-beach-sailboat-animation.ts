'use client';

import { useEffect, type RefObject } from 'react';
import { BEACH_SCENE } from '../scenes/beach-tracks';

type UseBeachSailboatAnimationArgs = {
  sailboatRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  startX: number;
  endX: number;
  scale: number;
  /** One-way ocean crossing duration in seconds (round-trip = 2×). */
  durationSec: number;
};

function sceneXToPx(sceneX: number, canvasWidth: number): number {
  return (sceneX / BEACH_SCENE.width) * canvasWidth;
}

function buildTransform(
  xPx: number,
  scale: number,
  flipX: number,
  yPx: number,
  rotateDeg: number,
): string {
  return `translate3d(${xPx}px, ${yPx}px, 0) translate(-50%, -100%) scaleX(${flipX}) scale(${scale}) rotate(${rotateDeg}deg)`;
}

/**
 * Continuous mid-ocean sailboat loop: L→R, flip, R→L, flip, repeat.
 * Subtle wind-powered bob; theme changes do not remount.
 */
export function useBeachSailboatAnimation({
  sailboatRef,
  enabled,
  startX,
  endX,
  scale,
  durationSec,
}: UseBeachSailboatAnimationArgs): void {
  useEffect(() => {
    const el = sailboatRef.current;
    if (!el) {
      return;
    }

    const canvas = el.closest('.beach-scene__canvas') as HTMLElement | null;
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
      const scene = el.closest('.beach-scene');
      const ambientPaused =
        scene?.getAttribute('data-ambient-motion') === 'paused';
      const motionOff =
        el.closest('.beach-env')?.getAttribute('data-motion') === 'off';
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

      const oneWayMs = Math.max(durationSec, 12) * 1000;
      const roundTripMs = oneWayMs * 2;
      const startPx = sceneXToPx(startX, canvasWidth);
      const endPx = sceneXToPx(endX, canvasWidth);
      // ~1–2px bob — wind-powered feel, not a bounce.
      const bob = Math.max(1, canvasWidth * 0.0009);

      animation = el.animate(
        [
          {
            offset: 0,
            transform: buildTransform(startPx, scale, 1, 0, 0),
            opacity: 1,
            easing: 'linear',
          },
          {
            offset: 0.24,
            transform: buildTransform(
              startPx + (endPx - startPx) * 0.48,
              scale,
              1,
              -bob,
              0.45,
            ),
            opacity: 1,
            easing: 'linear',
          },
          {
            offset: 0.49,
            transform: buildTransform(endPx, scale, 1, bob * 0.4, -0.3),
            opacity: 1,
            easing: 'linear',
          },
          {
            // Face left for the return leg
            offset: 0.5,
            transform: buildTransform(endPx, scale, -1, bob * 0.4, 0.3),
            opacity: 1,
            easing: 'linear',
          },
          {
            offset: 0.74,
            transform: buildTransform(
              startPx + (endPx - startPx) * 0.52,
              scale,
              -1,
              -bob,
              -0.4,
            ),
            opacity: 1,
            easing: 'linear',
          },
          {
            offset: 0.99,
            transform: buildTransform(startPx, scale, -1, 0, 0.2),
            opacity: 1,
            easing: 'linear',
          },
          {
            // Face right again for the next outbound leg
            offset: 1,
            transform: buildTransform(startPx, scale, 1, 0, 0),
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
    const scene = el.closest('.beach-scene');
    const env = el.closest('.beach-env');
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
  }, [sailboatRef, enabled, startX, endX, scale, durationSec]);
}
