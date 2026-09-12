import type { HeroSceneDefinition, HeroSceneId } from './hero-scene-types';
import { DEFAULT_HERO_SCENE } from './hero-scene-types';

/**
 * Central metadata for hero environments.
 * Component wiring lives in the scene viewport — keep labels/flags here only.
 */
export const heroSceneDefinitions: readonly HeroSceneDefinition[] = [
  {
    id: 'london',
    label: 'London',
    enabled: true,
  },
  {
    id: 'mountain',
    label: 'Mountain',
    enabled: true,
    notes: 'Day + night raster masters (6688×3764).',
  },
  {
    id: 'beach',
    label: 'Beach',
    enabled: true,
    notes: 'Day + night raster masters (6688×3764) + sailboat.',
  },
  {
    id: 'space',
    label: 'Space',
    enabled: true,
    notes: 'Day + night raster masters (6688×3764) + spacecraft.',
  },
] as const;

export const enabledHeroScenes: readonly HeroSceneDefinition[] =
  heroSceneDefinitions.filter((scene) => scene.enabled);

export const enabledHeroSceneIds = enabledHeroScenes.map(
  (scene) => scene.id,
) as HeroSceneId[];

export function isEnabledHeroSceneId(
  value: unknown,
): value is HeroSceneId {
  return (
    typeof value === 'string' &&
    enabledHeroSceneIds.includes(value as HeroSceneId)
  );
}

export function resolveHeroSceneId(value: unknown): HeroSceneId {
  return isEnabledHeroSceneId(value) ? value : DEFAULT_HERO_SCENE;
}

export function getHeroSceneDefinition(
  id: HeroSceneId,
): HeroSceneDefinition | undefined {
  return heroSceneDefinitions.find((scene) => scene.id === id);
}

/** Public CSS-fallback / idle-preload masters (2560px). */
export const heroScenePublicMasters: Record<
  Exclude<HeroSceneId, 'london'>,
  { light: string; dark: string; preloadKey: string }
> = {
  mountain: {
    light: '/hero/mountain/mountain-day-master.webp',
    dark: '/hero/mountain/mountain-night-master.webp',
    preloadKey: 'mountain',
  },
  beach: {
    light: '/hero/beach/beach-day-master.webp',
    dark: '/hero/beach/beach-night-master.webp',
    preloadKey: 'beach',
  },
  space: {
    light: '/hero/space/space-day-master.webp',
    dark: '/hero/space/space-night-master.webp',
    preloadKey: 'space',
  },
};
