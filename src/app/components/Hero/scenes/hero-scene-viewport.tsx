'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import {
  useHeroSceneIdlePreload,
  useHeroScenePreferences,
} from '../hooks/use-hero-scene-preferences';
import { resolveHeroSceneId } from './hero-scene-registry';
import type { HeroSceneId, HeroTheme } from './hero-scene-types';
import { LondonRasterScene } from './london-raster-scene';
import './hero-scene-viewport.css';

const MountainRasterScene = dynamic(
  () =>
    import('./mountain-raster-scene').then((mod) => mod.MountainRasterScene),
  { ssr: false },
);

const BeachRasterScene = dynamic(
  () => import('./beach-raster-scene').then((mod) => mod.BeachRasterScene),
  { ssr: false },
);

const SpaceRasterScene = dynamic(
  () => import('./space-raster-scene').then((mod) => mod.SpaceRasterScene),
  { ssr: false },
);

const LAZY_SCENES: readonly HeroSceneId[] = ['mountain', 'beach', 'space'];

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

  useHeroSceneIdlePreload(scene);

  // Eager-mount lazy scenes when the inline script already selected them.
  useEffect(() => {
    const eager = readEagerScene();
    if (LAZY_SCENES.includes(eager)) {
      setMountedScenes((prev) => new Set(prev).add(eager));
      setVisibleScene(eager);
      prevSceneRef.current = eager;
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
  const beachMounted = mountedScenes.has('beach');
  const spaceMounted = mountedScenes.has('space');
  const londonActive = visibleScene === 'london';
  const mountainActive = visibleScene === 'mountain';
  const beachActive = visibleScene === 'beach';
  const spaceActive = visibleScene === 'space';

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

      {beachMounted ? (
        <div
          className={[
            'hero-scene-layer',
            'hero-scene-layer--beach',
            beachActive ? 'is-active' : 'is-inactive',
          ].join(' ')}
          data-scene-layer="beach"
        >
          <BeachRasterScene
            motionEnabled={motionEnabled}
            isActive={beachActive}
            theme={theme}
          />
        </div>
      ) : null}

      {spaceMounted ? (
        <div
          className={[
            'hero-scene-layer',
            'hero-scene-layer--space',
            spaceActive ? 'is-active' : 'is-inactive',
          ].join(' ')}
          data-scene-layer="space"
        >
          <SpaceRasterScene
            motionEnabled={motionEnabled}
            isActive={spaceActive}
            theme={theme}
          />
        </div>
      ) : null}
    </div>
  );
}

export default HeroSceneViewport;
