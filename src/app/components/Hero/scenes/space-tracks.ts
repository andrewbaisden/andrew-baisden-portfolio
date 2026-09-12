/**
 * Space scene canvas — shared coordinate system for background + overlays.
 * Scene units stay 2048×1152; the raster master remains 6688×3764.
 */
export const SPACE_SCENE = {
  width: 2048,
  height: 1152,
} as const;

export function spacePercentX(x: number): string {
  return `${(x / SPACE_SCENE.width) * 100}%`;
}

export function spacePercentY(y: number): string {
  return `${(y / SPACE_SCENE.height) * 100}%`;
}

/**
 * Spacecraft flight corridor — open sky between left alien trees
 * and the large ringed planet (top-right). Shallow ascending arc.
 */
export const spaceTracks = {
  spacecraft: {
    startX: -140,
    /**
     * Mid-sky corridor below hero copy and above the mountain ridge,
     * clear of the large ringed planet (top-right).
     */
    startY: 380,
    endX: 2180,
    /** Gentle rise — a few dozen scene units only. */
    endY: 320,
  },
} as const;

export type SpaceSpacecraftLayout = {
  src: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
  /** Display width in scene units before scale. */
  width: number;
  scale: number;
  /** One-way sky crossing duration (seconds). */
  durationSec: number;
  /** Atmospheric pause after exit (seconds). */
  pauseSec: number;
  /** Static pose when motion is off / reduced motion. */
  staticX: number;
  staticY: number;
  engineGlowOpacity: number;
};

/**
 * Atmospheric storytelling craft — calm, not arcade-fast.
 * Intrinsic 1646×531; display ~190 scene units (~9% width).
 */
export const spaceSpacecraftLayout: SpaceSpacecraftLayout = {
  src: '/hero/space/spacecraft.webp',
  intrinsicWidth: 1646,
  intrinsicHeight: 531,
  width: 168,
  scale: 1,
  durationSec: 24,
  pauseSec: 42,
  staticX: 720,
  staticY: 350,
  engineGlowOpacity: 0.55,
};

export function spaceSpacecraftDisplayWidth(
  layout: SpaceSpacecraftLayout = spaceSpacecraftLayout,
  scaleOverride?: number,
): number {
  return layout.width * (scaleOverride ?? layout.scale);
}
