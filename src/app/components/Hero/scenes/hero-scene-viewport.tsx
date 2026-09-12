'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import {
  useHeroScenePreferences,
  useMountainIdlePreload,
} from '../hooks/use-hero-scene-preferences';
import { resolveHeroSceneId } from './hero-scene-registry';
import { LondonRasterScene } from './london-raster-scene';
import type { HeroSceneId, HeroTheme } from './hero-scene-types';
import './hero-scene-viewport.css';

const MountainRasterScene = dynamic(
  () =>
    import('./mountain-raster-scene').then((mod) => mod.MountainRasterScene),
  { ssr: false },
);

function readEagerScene(): HeroSceneId {
  if (typeof document === 'undefined') {
    return 'london';
  }
  return resolveHeroSceneId(document.documentElement.dataset.heroScene);
}

/**
 * Crossfades between enabled hero environments.
 * Only the active scene receives motion; outgoing scenes unmount after transition.
 */
export function HeroSceneViewport() {
  const { scene, motionEnabled, prefsReady } = useHeroScenePreferences();
  const { activeTheme } = useTheme();
  const theme: HeroTheme = activeTheme === 'dark' ? 'dark' : 'light';

  const [visibleScene, setVisibleScene] = useState<HeroSceneId>('london');
  const [mountedScenes, setMountedScenes] = useState<Set<HeroSceneId>>(
    () => new Set<HeroSceneId>(['london']),
  );
  const prevSceneRef = useRef<HeroSceneId>('london');
  const didInitRef = useRef(false);

  useMountainIdlePreload(scene);

  // Eager-mount Mountain when the inline script already selected it (avoids flash).
  useEffect(() => {
    const eager = readEagerScene();
    if (eager === 'mountain') {
      setMountedScenes((prev) => new Set(prev).add('mountain'));
      setVisibleScene('mountain');
      prevSceneRef.current = 'mountain';
    }
  }, []);

  useEffect(() => {
    if (!prefsReady) {
      return;
    }

    if (!didInitRef.current) {
      didInitRef.current = true;
      prevSceneRef.current = scene;
      setVisibleScene(scene);
      setMountedScenes(new Set([scene]));
      return;
    }

    if (scene === prevSceneRef.current) {
      return;
    }

    const from = prevSceneRef.current;
    prevSceneRef.current = scene;
    setMountedScenes(new Set([from, scene]));

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduce ? 0 : 650;

    const showTimer = window.setTimeout(
      () => setVisibleScene(scene),
      reduce ? 0 : 32,
    );
    const doneTimer = window.setTimeout(() => {
      setMountedScenes(new Set([scene]));
    }, duration + 40);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(doneTimer);
    };
  }, [scene, prefsReady]);

  const londonMounted = mountedScenes.has('london');
  const mountainMounted = mountedScenes.has('mountain');
  const londonActive = visibleScene === 'london';
  const mountainActive = visibleScene === 'mountain';

  return (
    <div
      className="hero-scene-viewport"
      data-active-scene={visibleScene}
      data-prefs-ready={prefsReady ? 'true' : 'false'}
      suppressHydrationWarning
    >
      {londonMounted ? (
        <div
          className={[
            'hero-scene-layer',
            'hero-scene-layer--london',
            londonActive ? 'is-active' : 'is-inactive',
          ].join(' ')}
          data-scene-layer="london"
        >
          <LondonRasterScene
            motionEnabled={motionEnabled}
            isActive={londonActive}
            theme={theme}
          />
        </div>
      ) : null}

      {mountainMounted ? (
        <div
          className={[
            'hero-scene-layer',
            'hero-scene-layer--mountain',
            mountainActive ? 'is-active' : 'is-inactive',
          ].join(' ')}
          data-scene-layer="mountain"
        >
          <MountainRasterScene
            motionEnabled={motionEnabled}
            isActive={mountainActive}
            theme={theme}
          />
        </div>
      ) : null}
    </div>
  );
}

export default HeroSceneViewport;
