import {
  LONDON_SCENE,
  londonVehicleLayout,
  vehicleDisplayWidth,
  type LondonVehicleId,
  type LondonVehicleLayout,
} from '../scenes/london-tracks';

export type TransportDirection = 'ltr' | 'rtl';

export type TransportTripConfig = {
  id: LondonVehicleId;
  direction: TransportDirection;
  /** Crossing duration in seconds (spawn → fully offscreen exit). */
  durationSec: number;
  /** Deterministic spawn times within the master cycle (seconds). */
  spawnTimesSec: number[];
};

/** Master ambient cycle length before the pattern repeats. */
export const LONDON_TRANSPORT_CYCLE_SEC = 120;

/**
 * Deterministic traffic schedule — irregular-feeling, collision-safe for near lane.
 *
 * Near lane (bus + waymo): trips never overlap.
 * Far lane: cab only.
 * Tube: less frequent than road traffic.
 */
export const londonTransportTrips: TransportTripConfig[] = [
  {
    id: 'bus',
    direction: 'ltr',
    durationSec: 15,
    // Near lane: 0–15, 47–62, 98–113
    spawnTimesSec: [0, 47, 98],
  },
  {
    id: 'cab',
    direction: 'rtl',
    durationSec: 10,
    // Far lane only
    spawnTimesSec: [7, 31, 66, 108],
  },
  {
    id: 'waymo',
    direction: 'ltr',
    durationSec: 11,
    // Near lane gaps vs bus: 23–34, 76–87
    spawnTimesSec: [23, 76],
  },
  {
    id: 'tube',
    direction: 'ltr',
    durationSec: 20,
    // Less frequent; platform empty between trains
    spawnTimesSec: [14, 72],
  },
];

const SAFETY_MARGIN = 48;

export type TransportPath = {
  id: LondonVehicleId;
  startX: number;
  endX: number;
  durationSec: number;
  spawnTimesSec: number[];
  direction: TransportDirection;
};

/** Resolve offscreen spawn/despawn centres for a vehicle at its current display width. */
export function resolveTransportPath(
  trip: TransportTripConfig,
  layout: LondonVehicleLayout,
  scale?: number,
): TransportPath {
  const displayWidth = vehicleDisplayWidth(layout, scale);
  const half = displayWidth / 2;
  const leftOff = -half - SAFETY_MARGIN;
  const rightOff = LONDON_SCENE.width + half + SAFETY_MARGIN;

  if (trip.direction === 'ltr') {
    return {
      id: trip.id,
      startX: leftOff,
      endX: rightOff,
      durationSec: trip.durationSec,
      spawnTimesSec: trip.spawnTimesSec,
      direction: trip.direction,
    };
  }

  return {
    id: trip.id,
    startX: rightOff,
    endX: leftOff,
    durationSec: trip.durationSec,
    spawnTimesSec: trip.spawnTimesSec,
    direction: trip.direction,
  };
}

export function resolveAllTransportPaths(
  layouts: Record<LondonVehicleId, LondonVehicleLayout> = londonVehicleLayout,
  scales?: Partial<Record<LondonVehicleId, number>>,
): TransportPath[] {
  return londonTransportTrips.map((trip) =>
    resolveTransportPath(trip, layouts[trip.id], scales?.[trip.id]),
  );
}

/** Desktop: all four. Narrow mobile: bus + tube (+ cab when room). */
export function getActiveTransportIds(viewportWidth: number): LondonVehicleId[] {
  if (viewportWidth <= 480) {
    return ['bus', 'tube'];
  }
  if (viewportWidth <= 767) {
    return ['bus', 'cab', 'tube'];
  }
  return ['bus', 'cab', 'waymo', 'tube'];
}
