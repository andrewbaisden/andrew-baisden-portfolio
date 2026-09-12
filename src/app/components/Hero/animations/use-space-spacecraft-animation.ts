'use client';

import { useEffect, type RefObject } from 'react';
import { SPACE_SCENE } from '../scenes/space-tracks';

type UseSpaceSpacecraftAnimationArgs = {
  craftRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  scale: number;
  durationSec: number;
  pauseSec: number;
};

function sceneToPx(
  sceneX: number,
  sceneY: number,
  canvasWidth: number,
  canvasHeight: number,
): { x: number; y: number } {
  return {
    x: (sceneX / SPACE_SCENE.width) * canvasWidth,
    y: (sceneY / SPACE_SCENE.height) * canvasHeight,
  };
}

function buildTransform(
  xPx: number,
  yPx: number,
  scale: number,
  pitchDeg: number,
): string {
  return `translate3d(${xPx}px, ${yPx}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${pitchDeg}deg)`;
}

/**
 * Shallow-arc sky transit with atmospheric pause between passes.
 * Theme switches must not restart motion — deps exclude theme.
 */
export function useSpaceSpacecraftAnimation({
  craftRef,
  enabled,
  startX,
  startY,
  endX,
  endY,
  scale,
  durationSec,
  pauseSec,
}: UseSpaceSpacecraftAnimationArgs): void {
  useEffect(() => {
    const el = craftRef.current;
    if (!el) {
      return;
    }

    const canvas = el.closest('.space-scene__canvas') as HTMLElement | null;
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
      const scene = el.closest('.space-scene');
      const ambientPaused =
        scene?.getAttribute('data-ambient-motion') === 'paused';
      const motionOff =
        el.closest('.space-env')?.getAttribute('data-motion') === 'off';
      if (ambientPaused || motionOff || document.hidden) {
        animation.pause();
      } else {
        animation.play();
      }
    };

    const build = () => {
      animation?.cancel();
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8) {
        return;
      }

      const travelMs = Math.max(durationSec, 10) * 1000;
      const pauseMs = Math.max(pauseSec, 8) * 1000;
      const totalMs = travelMs + pauseMs;
      const travelEnd = travelMs / totalMs;

      const start = sceneToPx(startX, startY, rect.width, rect.height);
      const end = sceneToPx(endX, endY, rect.width, rect.height);
      // Mid-path vertical drift for a shallow arc (slightly below linear lerp).
      const midX = start.x + (end.x - start.x) * 0.5;
      const midY =
        start.y + (end.y - start.y) * 0.5 - rect.height * 0.012;

      animation = el.animate(
        [
          {
            offset: 0,
            transform: buildTransform(start.x, start.y, scale, -0.6),
            opacity: 0,
            easing: 'linear',
          },
          {
            offset: 0.03 * travelEnd,
            transform: buildTransform(
              start.x + (end.x - start.x) * 0.03,
              start.y + (end.y - start.y) * 0.03,
              scale,
              -0.4,
            ),
            opacity: 1,
            easing: 'linear',
          },
          {
            offset: travelEnd * 0.5,
            transform: buildTransform(midX, midY, scale, 0.35),
            opacity: 1,
            easing: 'linear',
          },
          {
            offset: Math.min(travelEnd * 0.97, 0.97),
            transform: buildTransform(end.x, end.y, scale, 0.5),
            opacity: 1,
            easing: 'linear',
          },
          {
            offset: travelEnd,
            transform: buildTransform(end.x, end.y, scale, 0.55),
            opacity: 0,
            easing: 'linear',
          },
          {
            offset: 1,
            transform: buildTransform(start.x, start.y, scale, -0.6),
            opacity: 0,
          },
        ],
        {
          duration: totalMs,
          iterations: Infinity,
          fill: 'both',
        },
      );

      syncPause();
    };

    build();

    const mo = new MutationObserver(syncPause);
    const scene = el.closest('.space-scene');
    const env = el.closest('.space-env');
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
  }, [
    craftRef,
    enabled,
    startX,
    startY,
    endX,
    endY,
    scale,
    durationSec,
    pauseSec,
  ]);
}
