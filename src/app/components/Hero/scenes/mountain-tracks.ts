/**
 * Mountain scene canvas — shared coordinate system for background + overlays.
 * Scene units stay 2048×1152; the raster master remains 6688×3764.
 */
export const MOUNTAIN_SCENE = {
  width: 2048,
  height: 1152,
} as const;

export function mountainPercentX(x: number): string {
  return `${(x / MOUNTAIN_SCENE.width) * 100}%`;
}

export function mountainPercentY(y: number): string {
  return `${(y / MOUNTAIN_SCENE.height) * 100}%`;
}

/** Lake shimmer / ambient region (scene units). */
export const MOUNTAIN_LAKE = {
  x: 460,
  y: 770,
  width: 1200,
  height: 260,
} as const;

export const MOUNTAIN_WATERFALL = {
  x: 344,
  y: 548,
  width: 34,
  height: 220,
} as const;

/**
 * Yacht lake corridor — hull baseline on the waterline.
 * Short mid-lake traverse only: clear of the left foreground tree/fence,
 * waterfall splash, cabin peninsula, and right shore pines.
 */
export const mountainLakeTrack = {
  /** Waterline Y (bottom of hull) — open central lake. */
  y: 800,
  /** Past the left foreground pine / fence into open water. */
  startX: 720,
  /** Before the right shore pines / cable-car cliff. */
  endX: 1480,
} as const;

export type MountainYachtLayout = {
  src: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
  /** Display width in scene units before scale. */
  width: number;
  scale: number;
  baselineOffset: number;
  /** One-way lake crossing duration (seconds). Round-trip = 2×. */
  durationSec: number;
  /** Static pose when motion is off / reduced motion. */
  staticX: number;
  wakeOpacity: number;
};

/**
 * Yacht is secondary to hero copy — ~12% of scene width on desktop
 * (London bus display ≈ 810 scene units; yacht ≈ 240).
 */
export const mountainYachtLayout: MountainYachtLayout = {
  src: '/hero/mountain/yacht.webp',
  intrinsicWidth: 948,
  intrinsicHeight: 285,
  width: 240,
  scale: 1,
  baselineOffset: 0,
  durationSec: 32,
  staticX: 1100,
  wakeOpacity: 0.28,
};

export function mountainYachtDisplayWidth(
  layout: MountainYachtLayout = mountainYachtLayout,
  scaleOverride?: number,
): number {
  return layout.width * (scaleOverride ?? layout.scale);
}
