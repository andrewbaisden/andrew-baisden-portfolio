'use client';

import { useEffect, useRef, type RefObject } from 'react';
import {
  getActiveTransportIds,
  LONDON_TRANSPORT_CYCLE_SEC,
  londonTransportTrips,
  resolveTransportPath,
  type TransportPath,
} from './london-transport-config';
import {
  LONDON_SCENE,
  type LondonVehicleId,
  type LondonVehicleLayout,
} from '../scenes/london-tracks';

export type TransportLayoutMap = Record<LondonVehicleId, LondonVehicleLayout>;

type UseLondonTransportAnimationArgs = {
  canvasRef: RefObject<HTMLElement | null>;
  sceneRef: RefObject<HTMLElement | null>;
  vehicleRefs: Record<LondonVehicleId, RefObject<HTMLElement | null>>;
  layouts: TransportLayoutMap;
  enabled: boolean;
  pause: boolean;
  playbackRate: number;
};

function sceneXToPx(sceneX: number, canvasWidth: number): number {
  return (sceneX / LONDON_SCENE.width) * canvasWidth;
}

function buildTransform(xPx: number, flip: number, mobileScale: number): string {
  // xPx = centreline in canvas pixels; translate(-50%, -100%) anchors bottom-centre to the lane
  return `translate3d(${xPx}px, 0, 0) translate(-50%, -100%) scaleX(${flip}) scale(${mobileScale})`;
}

function readMobileScale(el: HTMLElement): number {
  const raw = getComputedStyle(el).getPropertyValue('--vehicle-mobile-scale').trim();
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function buildCycleKeyframes(
  path: TransportPath,
  canvasWidth: number,
  flip: number,
  mobileScale: number,
): Keyframe[] {
  const cycle = LONDON_TRANSPORT_CYCLE_SEC;
  const startPx = sceneXToPx(path.startX, canvasWidth);
  const endPx = sceneXToPx(path.endX, canvasWidth);
  const frames: { time: number; xPx: number }[] = [];

  const push = (time: number, xPx: number) => {
    const t = Math.min(Math.max(time, 0), cycle);
    const last = frames[frames.length - 1];
    if (last && Math.abs(last.time - t) < 0.001 && Math.abs(last.xPx - xPx) < 0.5) {
      return;
    }
    frames.push({ time: t, xPx });
  };

  push(0, startPx);

  for (const spawn of path.spawnTimesSec) {
    const tripEnd = spawn + path.durationSec;
    push(spawn, startPx);
    push(Math.min(tripEnd, cycle), endPx);
    if (tripEnd < cycle - 0.05) {
      push(tripEnd + 0.01, startPx);
    }
  }

  push(cycle, startPx);

  const cleaned: { time: number; xPx: number }[] = [];
  for (const frame of frames) {
    const prev = cleaned[cleaned.length - 1];
    if (prev && frame.time <= prev.time) {
      cleaned.push({ time: prev.time + 0.0005, xPx: frame.xPx });
    } else {
      cleaned.push(frame);
    }
  }

  return cleaned.map((frame) => ({
    offset: Math.min(frame.time / cycle, 1),
    transform: buildTransform(frame.xPx, flip, mobileScale),
    easing: 'linear',
  }));
}

/**
 * GPU-friendly London transport motion via Web Animations API.
 * No per-frame React state. Pauses on tab hide / hero offscreen.
 */
export function useLondonTransportAnimation({
  canvasRef,
  sceneRef,
  vehicleRefs,
  layouts,
  enabled,
  pause,
  playbackRate,
}: UseLondonTransportAnimationArgs): void {
  const animationsRef = useRef<Animation[]>([]);
  const pauseRef = useRef(pause);
  const rateRef = useRef(playbackRate);
  const layoutsRef = useRef(layouts);
  const enabledRef = useRef(enabled);

  pauseRef.current = pause;
  rateRef.current = playbackRate;
  layoutsRef.current = layouts;
  enabledRef.current = enabled;

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    if (!canvas || !scene) {
      return;
    }

    let disposed = false;
    let heroVisible = true;
    let pageVisible = !document.hidden;
    let resizeTimer = 0;

    const syncPlayState = () => {
      const shouldPlay =
        enabledRef.current && heroVisible && pageVisible && !pauseRef.current;
      for (const anim of animationsRef.current) {
        anim.playbackRate = rateRef.current;
        if (shouldPlay) {
          if (anim.playState !== 'running') {
            anim.play();
          }
        } else if (anim.playState === 'running') {
          anim.pause();
        }
      }
    };

    const teardown = () => {
      for (const anim of animationsRef.current) {
        anim.cancel();
      }
      animationsRef.current = [];
    };

    const setup = (preserveProgress = false) => {
      const prevProgress =
        preserveProgress && animationsRef.current[0]
          ? Number(animationsRef.current[0].currentTime ?? 0) /
            (LONDON_TRANSPORT_CYCLE_SEC * 1000)
          : 0;

      teardown();

      if (disposed || !enabledRef.current) {
        return;
      }

      const canvasWidth = canvas.clientWidth || 1;
      const active = new Set(getActiveTransportIds(window.innerWidth));
      const nextAnims: Animation[] = [];

      for (const trip of londonTransportTrips) {
        const el = vehicleRefs[trip.id]?.current;
        if (!el) {
          continue;
        }

        const layout = layoutsRef.current[trip.id];
        const flip = layout.flipX ? -1 : 1;
        const mobileScale = readMobileScale(el);

        if (!active.has(trip.id)) {
          el.dataset.transportActive = 'false';
          el.style.transform = buildTransform(
            sceneXToPx(-5000, canvasWidth),
            flip,
            mobileScale,
          );
          continue;
        }

        el.dataset.transportActive = 'true';
        const path = resolveTransportPath(trip, layout, layout.scale);
        const keyframes = buildCycleKeyframes(
          path,
          canvasWidth,
          flip,
          mobileScale,
        );

        const anim = el.animate(keyframes, {
          duration: LONDON_TRANSPORT_CYCLE_SEC * 1000,
          iterations: Infinity,
          easing: 'linear',
          fill: 'both',
        });
        anim.playbackRate = rateRef.current;
        if (preserveProgress) {
          anim.currentTime = prevProgress * LONDON_TRANSPORT_CYCLE_SEC * 1000;
        }
        nextAnims.push(anim);
      }

      animationsRef.current = nextAnims;
      syncPlayState();
    };

    setup(false);

    const io = new IntersectionObserver(
      ([entry]) => {
        heroVisible = Boolean(
          entry?.isIntersecting && (entry.intersectionRatio ?? 0) > 0.12,
        );
        syncPlayState();
      },
      { threshold: [0, 0.12, 0.25, 0.5] },
    );
    io.observe(scene);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      syncPlayState();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!disposed) {
          setup(true);
        }
      }, 120);
    };
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      teardown();
    };
  }, [canvasRef, sceneRef, vehicleRefs, enabled]);

  // Pause / rate without rebuilding paths
  useEffect(() => {
    for (const anim of animationsRef.current) {
      anim.playbackRate = playbackRate;
      if (pause || !enabled) {
        anim.pause();
      } else if (anim.playState === 'paused') {
        anim.play();
      }
    }
  }, [pause, playbackRate, enabled]);

  // Rebuild when calibrated layouts change (spawn margins depend on width)
  const layoutSignature = JSON.stringify(
    Object.values(layouts).map((v) => [v.id, v.x, v.scale, v.baselineOffset ?? 0]),
  );

  useEffect(() => {
    if (!enabled || !canvasRef.current) {
      return;
    }
    // Recreate with progress preserve via resize-like path
    const canvas = canvasRef.current;
    const prev = animationsRef.current[0];
    const progress = prev
      ? Number(prev.currentTime ?? 0) / (LONDON_TRANSPORT_CYCLE_SEC * 1000)
      : 0;

    for (const anim of animationsRef.current) {
      anim.cancel();
    }
    animationsRef.current = [];

    const canvasWidth = canvas.clientWidth || 1;
    const active = new Set(getActiveTransportIds(window.innerWidth));
    const nextAnims: Animation[] = [];

    for (const trip of londonTransportTrips) {
      const el = vehicleRefs[trip.id]?.current;
      if (!el || !active.has(trip.id)) {
        continue;
      }
      const layout = layouts[trip.id];
      const path = resolveTransportPath(trip, layout, layout.scale);
      const flip = layout.flipX ? -1 : 1;
      const mobileScale = readMobileScale(el);
      const anim = el.animate(
        buildCycleKeyframes(path, canvasWidth, flip, mobileScale),
        {
          duration: LONDON_TRANSPORT_CYCLE_SEC * 1000,
          iterations: Infinity,
          easing: 'linear',
          fill: 'both',
        },
      );
      anim.playbackRate = playbackRate;
      anim.currentTime = progress * LONDON_TRANSPORT_CYCLE_SEC * 1000;
      if (pause) {
        anim.pause();
      }
      nextAnims.push(anim);
    }
    animationsRef.current = nextAnims;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- signature captures layout fields
  }, [layoutSignature, enabled]);
}

export default useLondonTransportAnimation;
