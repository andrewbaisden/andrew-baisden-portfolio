/**
 * Beach scene canvas — shared coordinate system for background + overlays.
 * Scene units stay 2048×1152; the raster master remains 6688×3764.
 */
export const BEACH_SCENE = {
  width: 2048,
  height: 1152,
} as const;

export function beachPercentX(x: number): string {
  return `${(x / BEACH_SCENE.width) * 100}%`;
}

export function beachPercentY(y: number): string {
  return `${(y / BEACH_SCENE.height) * 100}%`;
}

/** Open-ocean corridor for the sailboat (hull waterline). */
export const beachTracks = {
  sailboat: {
    /**
     * Hull baseline on deep open water — above shoreline foam / sand,
     * clear of left islands and right pier / land.
     * Kept low enough that the tall mast clears hero copy.
     */
    y: 668,
    /** Past left islands / palms into open turquoise water. */
    startX: 480,
    /** Before the right pier stilts and cliff landmass. */
    endX: 1360,
  },
} as const;

/** Subtle ocean highlight band (scene units). */
export const BEACH_OCEAN = {
  x: 180,
  y: 560,
  width: 1680,
  height: 200,
} as const;

/** Near-shore foam strip. */
export const BEACH_FOAM = {
  x: 220,
  y: 720,
  width: 1280,
  height: 56,
} as const;

export type BeachSailboatLayout = {
  src: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
  /** Display width in scene units before scale. */
  width: number;
  scale: number;
  baselineOffset: number;
  /** One-way ocean crossing duration (seconds). Round-trip = 2×. */
  durationSec: number;
  /** Static pose when motion is off / reduced motion. */
  staticX: number;
  wakeOpacity: number;
  oceanOpacity: number;
};

/**
 * Distant midground vessel — smaller than Mountain yacht footprint.
 * Intrinsic 1277×1103 (mast-tall); display ~128 scene units (~6% width)
 * so the mast stays below hero copy.
 */
export const beachSailboatLayout: BeachSailboatLayout = {
  src: '/hero/beach/sailboat.webp',
  intrinsicWidth: 1277,
  intrinsicHeight: 1103,
  width: 128,
  scale: 1,
  baselineOffset: 0,
  durationSec: 38,
  staticX: 920,
  wakeOpacity: 0.22,
  oceanOpacity: 0.14,
};

export function beachSailboatDisplayWidth(
  layout: BeachSailboatLayout = beachSailboatLayout,
  scaleOverride?: number,
): number {
  return layout.width * (scaleOverride ?? layout.scale);
}
