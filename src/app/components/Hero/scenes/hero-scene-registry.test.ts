import { describe, expect, it } from 'vitest';
import { resolveHeroSceneId } from './hero-scene-registry';
import { DEFAULT_HERO_SCENE } from './hero-scene-types';

describe('resolveHeroSceneId', () => {
  it('returns an enabled scene id unchanged', () => {
    expect(resolveHeroSceneId('beach')).toBe('beach');
    expect(resolveHeroSceneId('london')).toBe('london');
  });

  it('falls back to the default scene for unknown values', () => {
    expect(resolveHeroSceneId(null)).toBe(DEFAULT_HERO_SCENE);
    expect(resolveHeroSceneId('paris')).toBe(DEFAULT_HERO_SCENE);
    expect(resolveHeroSceneId(12)).toBe(DEFAULT_HERO_SCENE);
  });
});
