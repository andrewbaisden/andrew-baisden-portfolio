export type HeroSceneId = 'london' | 'mountain' | 'beach' | 'space';

export type HeroTheme = 'light' | 'dark';

/** Shared props every hero scene receives from the scene engine. */
export type HeroSceneProps = {
  motionEnabled: boolean;
  isActive: boolean;
  theme: HeroTheme;
};

export type HeroSceneDefinition = {
  id: HeroSceneId;
  label: string;
  /** Whether the scene is selectable in production UI. */
  enabled: boolean;
  /** Optional note for future scenes (e.g. night master pending). */
  notes?: string;
};

export const HERO_SCENE_STORAGE_KEY = 'portfolio-hero-scene';
export const HERO_MOTION_STORAGE_KEY = 'portfolio-hero-motion';

export const DEFAULT_HERO_SCENE: HeroSceneId = 'london';
