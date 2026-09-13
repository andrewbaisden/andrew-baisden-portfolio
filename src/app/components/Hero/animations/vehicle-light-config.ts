import type { LondonVehicleId } from '../scenes/london-tracks';

export type VehicleLightKind =
  | 'headlight'
  | 'taillight'
  | 'interior'
  | 'roof'
  | 'sensor'
  | 'window'
  | 'running'
  | 'road-front'
  | 'road-rear';

export type VehicleLightSpec = {
  kind: VehicleLightKind;
  /** Percentage of vehicle box */
  left: number;
  top: number;
  width: number;
  height: number;
  /** Soft ellipse vs rounded rect */
  shape?: 'ellipse' | 'rect' | 'strip';
  /** Extra opacity multiplier (0–1) */
  intensity?: number;
};

/**
 * Light anchors in unflipped asset space (% of vehicle box).
 * Overlays inherit vehicle transform (including flipX).
 */
export const vehicleLightSpecs: Record<LondonVehicleId, VehicleLightSpec[]> = {
  bus: [
    {
      kind: 'headlight',
      left: 93.5,
      top: 68,
      width: 4.2,
      height: 11,
      shape: 'ellipse',
      intensity: 0.85,
    },
    {
      kind: 'headlight',
      left: 94.2,
      top: 74,
      width: 3.2,
      height: 7,
      shape: 'ellipse',
      intensity: 0.55,
    },
    {
      kind: 'taillight',
      left: 0.8,
      top: 66,
      width: 2.8,
      height: 12,
      shape: 'rect',
      intensity: 0.75,
    },
    {
      kind: 'interior',
      left: 10,
      top: 16,
      width: 72,
      height: 22,
      shape: 'rect',
      intensity: 0.22,
    },
    {
      kind: 'interior',
      left: 10,
      top: 50,
      width: 62,
      height: 16,
      shape: 'rect',
      intensity: 0.16,
    },
    {
      kind: 'road-front',
      left: 88,
      top: 94,
      width: 14,
      height: 10,
      shape: 'ellipse',
      intensity: 0.28,
    },
    {
      kind: 'road-rear',
      left: -1,
      top: 95,
      width: 8,
      height: 7,
      shape: 'ellipse',
      intensity: 0.18,
    },
  ],
  cab: [
    {
      kind: 'headlight',
      left: 1.5,
      top: 50,
      width: 7,
      height: 14,
      shape: 'ellipse',
      intensity: 0.8,
    },
    {
      kind: 'taillight',
      left: 91.5,
      top: 46,
      width: 5,
      height: 16,
      shape: 'rect',
      intensity: 0.7,
    },
    {
      kind: 'roof',
      left: 30,
      top: 1.5,
      width: 11,
      height: 7,
      shape: 'rect',
      intensity: 0.45,
    },
    {
      kind: 'interior',
      left: 28,
      top: 22,
      width: 42,
      height: 22,
      shape: 'rect',
      intensity: 0.12,
    },
    {
      kind: 'road-front',
      left: -2,
      top: 94,
      width: 12,
      height: 9,
      shape: 'ellipse',
      intensity: 0.24,
    },
    {
      kind: 'road-rear',
      left: 88,
      top: 95,
      width: 10,
      height: 7,
      shape: 'ellipse',
      intensity: 0.16,
    },
  ],
  waymo: [
    {
      kind: 'headlight',
      left: 0.5,
      top: 54,
      width: 6.5,
      height: 9,
      shape: 'strip',
      intensity: 0.78,
    },
    {
      kind: 'taillight',
      left: 90,
      top: 40,
      width: 8,
      height: 5.5,
      shape: 'strip',
      intensity: 0.72,
    },
    {
      kind: 'sensor',
      left: 38,
      top: 10,
      width: 22,
      height: 8,
      shape: 'ellipse',
      intensity: 0.18,
    },
    {
      kind: 'sensor',
      left: 16,
      top: 56,
      width: 5,
      height: 7,
      shape: 'ellipse',
      intensity: 0.14,
    },
    {
      kind: 'road-front',
      left: -2,
      top: 94,
      width: 11,
      height: 8,
      shape: 'ellipse',
      intensity: 0.22,
    },
    {
      kind: 'road-rear',
      left: 88,
      top: 95,
      width: 9,
      height: 6,
      shape: 'ellipse',
      intensity: 0.14,
    },
  ],
  tube: [
    {
      kind: 'window',
      left: 4,
      top: 28,
      width: 28,
      height: 32,
      shape: 'rect',
      intensity: 0.38,
    },
    {
      kind: 'window',
      left: 36,
      top: 28,
      width: 28,
      height: 32,
      shape: 'rect',
      intensity: 0.36,
    },
    {
      kind: 'window',
      left: 68,
      top: 28,
      width: 26,
      height: 32,
      shape: 'rect',
      intensity: 0.4,
    },
    {
      kind: 'running',
      left: 96.5,
      top: 48,
      width: 2.2,
      height: 10,
      shape: 'rect',
      intensity: 0.7,
    },
    {
      kind: 'running',
      left: 0.6,
      top: 48,
      width: 1.8,
      height: 10,
      shape: 'rect',
      intensity: 0.55,
    },
    {
      kind: 'road-front',
      left: 4,
      top: 92,
      width: 90,
      height: 10,
      shape: 'ellipse',
      intensity: 0.12,
    },
  ],
};
