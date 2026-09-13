/**
 * Shared London hero scene coordinate system.
 * All vehicle positions derive from this 2048×1152 canvas (16:9).
 * Background and overlays use the same origin, scale, and cover crop.
 */

export const LONDON_SCENE = {
  width: 2048,
  height: 1152,
} as const;

export type LondonTrackId = 'roadNear' | 'roadFar' | 'underground';

export type LondonTrack = {
  /** Wheel baseline Y in scene units (bottom of tires / bogies). */
  y: number;
  /** Future motion: enter X */
  startX: number;
  /** Future motion: exit X */
  endX: number;
};

/**
 * Subtle lane perspective. Applied on top of each vehicle's own scale.
 * near = reference · far = slightly smaller for depth.
 */
export const londonLaneScale = {
  roadNear: 1,
  roadFar: 0.91,
  underground: 1,
} as const;

/**
 * Lane baselines calibrated to the raster London artwork.
 * Values are scene units on the 2048×1152 canvas.
 */
export const londonTracks: Record<LondonTrackId, LondonTrack> = {
  roadNear: {
    y: 874,
    startX: -520,
    endX: 2560,
  },
  roadFar: {
    y: 826,
    startX: 2560,
    endX: -520,
  },
  underground: {
    y: 1096,
    /** Fully off-canvas left (−tube display width at default scale). */
    startX: -1840,
    /** Fully off-canvas right (scene width). */
    endX: LONDON_SCENE.width,
  },
};

/**
 * Full-width Tube movement corridor.
 * Horizontal clip is the scene canvas (0 → sceneWidth), NOT the decorative tunnel arches.
 * Vertical band keeps the train in the underground cutaway for debug visualization.
 */
export const londonTubeCorridor = {
  top: 900,
  left: 0,
  right: LONDON_SCENE.width,
  bottom: LONDON_SCENE.height,
} as const;

/** @deprecated Use londonTubeCorridor — tunnel arches are not train portals. */
export const londonTunnelClip = londonTubeCorridor;

export type LondonVehicleId = 'bus' | 'cab' | 'waymo' | 'tube';

export type LondonVehicleLayout = {
  id: LondonVehicleId;
  track: LondonTrackId;
  /** Production asset path under /public */
  src: string;
  /** Intrinsic production pixel size */
  intrinsicWidth: number;
  intrinsicHeight: number;
  /** Display width in scene units (before vehicle + lane scale) */
  width: number;
  /** Horizontal centre in scene units */
  x: number;
  /** Vehicle hierarchy scale (1 = class reference for that asset) */
  scale: number;
  /** Horizontal flip (use when asset faces the wrong way for its lane) */
  flipX: boolean;
  /** Optional baseline nudge in scene units (positive = lower) */
  baselineOffset?: number;
};

/**
 * Static calibration layout — approved visual defaults from Phase 4C tuning.
 * bus: near-left · cab: far-left · waymo: near-right · tube: entering from left
 *
 * Calibrator (dev-only) allows scale 0.25–5 and persists overrides in localStorage.
 */
export const londonVehicleLayout: Record<LondonVehicleId, LondonVehicleLayout> =
  {
    bus: {
      id: 'bus',
      track: 'roadNear',
      src: '/hero/london/vehicles/london-bus.webp',
      intrinsicWidth: 720,
      intrinsicHeight: 279,
      width: 360,
      x: 792,
      scale: 2.25,
      flipX: false,
    },
    cab: {
      id: 'cab',
      track: 'roadFar',
      src: '/hero/london/vehicles/black-cab.webp',
      intrinsicWidth: 400,
      intrinsicHeight: 169,
      width: 188,
      x: 262,
      scale: 1.5,
      flipX: false,
    },
    waymo: {
      id: 'waymo',
      track: 'roadNear',
      src: '/hero/london/vehicles/waymo.webp',
      intrinsicWidth: 420,
      intrinsicHeight: 194,
      width: 200,
      x: 1450,
      scale: 1.5,
      flipX: true,
    },
    tube: {
      id: 'tube',
      track: 'underground',
      src: '/hero/london/vehicles/tube-train.webp',
      intrinsicWidth: 2160,
      intrinsicHeight: 188,
      /** At scale 1.15 → display ≈ 1840; with x=-208 spans ≈ [-1128…712]. */
      width: 1600,
      x: -208,
      scale: 1.15,
      flipX: false,
      /** Keeps bogies on the rail band (1096+30=1126 < scene height 1152). */
      baselineOffset: 30,
    },
  };

export function scenePercentX(x: number): string {
  return `${(x / LONDON_SCENE.width) * 100}%`;
}

export function scenePercentY(y: number): string {
  return `${(y / LONDON_SCENE.height) * 100}%`;
}

export function vehicleBaselineY(vehicle: LondonVehicleLayout): number {
  const track = londonTracks[vehicle.track];
  return track.y + (vehicle.baselineOffset ?? 0);
}

/** Final display width in scene units (vehicle scale × lane perspective). */
export function vehicleDisplayWidth(
  vehicle: LondonVehicleLayout,
  scaleOverride?: number,
): number {
  const vehicleScale = scaleOverride ?? vehicle.scale;
  const laneScale = londonLaneScale[vehicle.track];
  return vehicle.width * vehicleScale * laneScale;
}
