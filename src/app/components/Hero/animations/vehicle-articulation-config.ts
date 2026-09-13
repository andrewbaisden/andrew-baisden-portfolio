import {
  LONDON_SCENE,
  type LondonVehicleId,
  londonVehicleLayout,
  vehicleDisplayWidth,
} from '../scenes/london-tracks';
import { londonTransportTrips } from './london-transport-config';

export type WheelArticulation = {
  /** Centre X as % of actor box width */
  x: number;
  /** Centre Y as % of actor box height */
  y: number;
  /** Diameter as % of actor box width */
  size: number;
  src: string;
};

export type VehicleArticulation = {
  bodySrc: string;
  /** Original approved single-raster (dev comparison / fallback) */
  originalSrc: string;
  frontWheel: WheelArticulation;
  rearWheel: WheelArticulation;
  /**
   * Seconds for one full wheel rotation at 1× traffic rate.
   * Derived from travel speed ≈ circumference relationship, then eased
   * slightly slower for visual believability.
   */
  wheelDurationSec: number;
  /** Local CSS spin sign; accounts for facing + travel direction under flipX */
  spinDir: 1 | -1;
};

const SAFETY_MARGIN = 48;
/** Keep spin slightly slower than pure geometry — avoids a toy-like look. */
const VISUAL_SPIN_EASE = 1.22;

function tripFor(id: LondonVehicleId) {
  return londonTransportTrips.find((t) => t.id === id)!;
}

function wheelDurationSec(
  id: Exclude<LondonVehicleId, 'tube'>,
  radiusPx: number,
): number {
  const layout = londonVehicleLayout[id];
  const trip = tripFor(id);
  const displayWidth = vehicleDisplayWidth(layout);
  const travel = LONDON_SCENE.width + displayWidth + 2 * SAFETY_MARGIN;
  const speed = travel / trip.durationSec;
  const rScene = (radiusPx / layout.intrinsicWidth) * displayWidth;
  const circumference = 2 * Math.PI * rScene;
  return (circumference / speed) * VISUAL_SPIN_EASE;
}

/**
 * Centralised wheel geometry for articulated London road vehicles.
 * Coordinates are % of the actor container (scale with display width).
 */
export const vehicleArticulation: Partial<
  Record<LondonVehicleId, VehicleArticulation>
> = {
  bus: {
    originalSrc: '/hero/london/vehicles/london-bus.webp',
    bodySrc: '/hero/london/vehicles/bus/production/bus-body-v2.webp',
    frontWheel: {
      x: 76.944,
      y: 86.022,
      size: 10.0,
      src: '/hero/london/vehicles/bus/production/bus-wheel-front-v2.webp',
    },
    rearWheel: {
      x: 19.861,
      y: 86.022,
      size: 10.0,
      src: '/hero/london/vehicles/bus/production/bus-wheel-rear-v2.webp',
    },
    wheelDurationSec: wheelDurationSec('bus', 36),
    spinDir: 1, // LTR, unflipped, faces right
  },
  cab: {
    originalSrc: '/hero/london/vehicles/black-cab.webp',
    bodySrc: '/hero/london/vehicles/cab/production/cab-body-v2.webp',
    frontWheel: {
      x: 17.5,
      y: 78.698,
      size: 17.5,
      src: '/hero/london/vehicles/cab/production/cab-wheel-front-v2.webp',
    },
    rearWheel: {
      x: 81.5,
      y: 78.698,
      size: 17.5,
      src: '/hero/london/vehicles/cab/production/cab-wheel-rear-v2.webp',
    },
    wheelDurationSec: wheelDurationSec('cab', 35),
    spinDir: -1, // RTL, faces left
  },
  waymo: {
    originalSrc: '/hero/london/vehicles/waymo.webp',
    bodySrc: '/hero/london/vehicles/waymo/production/waymo-body-v2.webp',
    frontWheel: {
      x: 15.0,
      y: 78.351,
      size: 11.429,
      src: '/hero/london/vehicles/waymo/production/waymo-wheel-front-v2.webp',
    },
    rearWheel: {
      x: 81.19,
      y: 78.351,
      size: 11.429,
      src: '/hero/london/vehicles/waymo/production/waymo-wheel-rear-v2.webp',
    },
    wheelDurationSec: wheelDurationSec('waymo', 24),
    // LTR with flipX(-1): local negative → clockwise on screen
    spinDir: -1,
  },
};

export type ArticulationDebugControls = {
  /** Use split body/wheels instead of original single raster */
  articulated: boolean;
  /** Allow CSS wheel spin when transport is playing */
  wheelRotation: boolean;
  /** Reserved — lidar extract did not meet fidelity bar */
  waymoLidar: boolean;
  /** Night light overlays (production default on) */
  vehicleLighting: boolean;
  /** Multiplier on wheel spin duration inverse (0.5 = slower) */
  wheelSpeed: 0.5 | 1 | 2;
};

export const DEFAULT_ARTICULATION_DEBUG: ArticulationDebugControls = {
  articulated: true,
  wheelRotation: true,
  waymoLidar: false,
  vehicleLighting: true,
  wheelSpeed: 1,
};

export function isArticulatedVehicle(
  id: LondonVehicleId,
): id is 'bus' | 'cab' | 'waymo' {
  return id === 'bus' || id === 'cab' || id === 'waymo';
}
