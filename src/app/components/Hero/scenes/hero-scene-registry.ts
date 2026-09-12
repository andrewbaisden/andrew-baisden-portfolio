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
    enabled: false,
    notes: 'Placeholder — not implemented in Phase 5.',
  },
  {
    id: 'space',
    label: 'Space',
    enabled: false,
    notes: 'Placeholder — not implemented in Phase 5.',
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
