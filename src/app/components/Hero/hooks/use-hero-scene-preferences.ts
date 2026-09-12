'use client';

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useReducedMotion } from '../animations/use-reduced-motion';
import {
  enabledHeroScenes,
  resolveHeroSceneId,
} from '../scenes/hero-scene-registry';
import {
  DEFAULT_HERO_SCENE,
  HERO_MOTION_STORAGE_KEY,
  HERO_SCENE_STORAGE_KEY,
  type HeroSceneId,
} from '../scenes/hero-scene-types';

export type HeroMotionPreference = 'on' | 'off';

type HeroScenePreferencesValue = {
  scene: HeroSceneId;
  setScene: (scene: HeroSceneId) => void;
  motionEnabled: boolean;
  setMotionEnabled: (enabled: boolean) => void;
  /** True after client has applied persisted preferences. */
  prefsReady: boolean;
  enabledScenes: typeof enabledHeroScenes;
};

const HeroScenePreferencesContext =
  createContext<HeroScenePreferencesValue | null>(null);

function readStoredScene(): HeroSceneId {
  try {
    return resolveHeroSceneId(
      window.localStorage.getItem(HERO_SCENE_STORAGE_KEY),
    );
  } catch {
    return DEFAULT_HERO_SCENE;
  }
}

function readDomMotion(reducedMotion: boolean): boolean {
  if (typeof document === 'undefined') {
    return !reducedMotion;
  }
  const raw = document.documentElement.dataset.heroMotion;
  if (raw === 'on') return true;
  if (raw === 'off') return false;
  return !reducedMotion;
}

function writeDomPrefs(scene: HeroSceneId, motionEnabled: boolean) {
  document.documentElement.dataset.heroScene = scene;
  document.documentElement.dataset.heroMotion = motionEnabled ? 'on' : 'off';
}

type ProviderProps = {
  children: ReactNode;
};

/**
 * Persists scene + ambient-motion preferences independently from theme.
 * Hydration-safe: reads the inline-script DOM hints before paint when possible.
 */
export function HeroScenePreferencesProvider({ children }: ProviderProps) {
  const reducedMotion = useReducedMotion();
  const [scene, setSceneState] = useState<HeroSceneId>(DEFAULT_HERO_SCENE);
  const [motionEnabled, setMotionState] = useState(true);
  const [prefsReady, setPrefsReady] = useState(false);

  useLayoutEffect(() => {
    const nextScene = readStoredScene();
    const nextMotion = (() => {
      try {
        const raw = window.localStorage.getItem(HERO_MOTION_STORAGE_KEY);
        if (raw === 'on' || raw === 'off') {
          return raw === 'on';
        }
      } catch {
        /* ignore */
      }
      return readDomMotion(reducedMotion);
    })();

    setSceneState(nextScene);
    setMotionState(nextMotion);
    writeDomPrefs(nextScene, nextMotion);
    setPrefsReady(true);
  }, [reducedMotion]);

  // If reduced-motion flips on and the user never set an explicit preference,
  // keep motion off. Do not silently override an explicit "on".
  useEffect(() => {
    if (!prefsReady || !reducedMotion) {
      return;
    }
    try {
      const raw = window.localStorage.getItem(HERO_MOTION_STORAGE_KEY);
      if (raw !== 'on' && raw !== 'off' && motionEnabled) {
        setMotionState(false);
        document.documentElement.dataset.heroMotion = 'off';
      }
    } catch {
      /* ignore */
    }
  }, [reducedMotion, prefsReady, motionEnabled]);

  const setScene = useCallback((next: HeroSceneId) => {
    const resolved = resolveHeroSceneId(next);
    setSceneState(resolved);
    document.documentElement.dataset.heroScene = resolved;
    try {
      window.localStorage.setItem(HERO_SCENE_STORAGE_KEY, resolved);
    } catch {
      /* ignore quota / private mode */
    }
  }, []);

  const setMotionEnabled = useCallback((enabled: boolean) => {
    setMotionState(enabled);
    const value: HeroMotionPreference = enabled ? 'on' : 'off';
    document.documentElement.dataset.heroMotion = value;
    try {
      window.localStorage.setItem(HERO_MOTION_STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<HeroScenePreferencesValue>(
    () => ({
      scene,
      setScene,
      motionEnabled,
      setMotionEnabled,
      prefsReady,
      enabledScenes: enabledHeroScenes,
    }),
    [scene, setScene, motionEnabled, setMotionEnabled, prefsReady],
  );

  return createElement(
    HeroScenePreferencesContext.Provider,
    { value },
    children,
  );
}

export function useHeroScenePreferences(): HeroScenePreferencesValue {
  const ctx = useContext(HeroScenePreferencesContext);
  if (!ctx) {
    throw new Error(
      'useHeroScenePreferences must be used within HeroScenePreferencesProvider',
    );
  }
  return ctx;
}

/** Idle-time preload for Mountain day/night masters (skips if already selected). */
export function useMountainIdlePreload(activeScene: HeroSceneId) {
  useEffect(() => {
    if (activeScene === 'mountain') {
      return;
    }

    const theme =
      document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const href =
      theme === 'dark'
        ? '/hero/mountain/mountain-night-master.webp'
        : '/hero/mountain/mountain-day-master.webp';
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const preload = () => {
      if (cancelled) return;
      const key = theme === 'dark' ? 'mountain-night' : 'mountain-day';
      const existing = document.querySelector(
        `link[data-hero-preload="${key}"]`,
      );
      if (existing) return;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = href;
      link.dataset.heroPreload = key;
      document.head.appendChild(link);
    };

    const ric = (
      window as Window & {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout: number },
        ) => number;
        cancelIdleCallback?: (id: number) => void;
      }
    ).requestIdleCallback;

    if (typeof ric === 'function') {
      idleId = ric(preload, { timeout: 4000 });
    } else {
      timeoutId = window.setTimeout(preload, 2500);
    }

    return () => {
      cancelled = true;
      if (idleId != null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [activeScene]);
}
