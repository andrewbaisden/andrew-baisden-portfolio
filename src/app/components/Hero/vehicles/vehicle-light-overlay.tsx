import type { CSSProperties } from 'react';
import {
  type VehicleLightSpec,
  vehicleLightSpecs,
} from '../animations/vehicle-light-config';
import type { LondonVehicleId } from '../scenes/london-tracks';

type VehicleLightOverlayProps = {
  vehicleId: LondonVehicleId;
  /** Dev: force-visible outlines for anchoring */
  showAnchors?: boolean;
};

function lightStyle(spec: VehicleLightSpec): CSSProperties {
  return {
    left: `${spec.left}%`,
    top: `${spec.top}%`,
    width: `${spec.width}%`,
    height: `${spec.height}%`,
    ['--light-intensity' as string]: String(spec.intensity ?? 0.7),
  };
}

function LightNode({ spec, index }: { spec: VehicleLightSpec; index: number }) {
  const shape = spec.shape ?? 'ellipse';
  return (
    <span
      className={[
        'vehicle-light',
        `vehicle-light--${spec.kind}`,
        `vehicle-light--${shape}`,
      ].join(' ')}
      style={lightStyle(spec)}
      data-light={spec.kind}
      data-light-index={index}
      aria-hidden="true"
    />
  );
}

/**
 * Night-only CSS light layers that inherit the vehicle transform.
 * Raster artwork is left untouched.
 */
export function VehicleLightOverlay({
  vehicleId,
  showAnchors = false,
}: VehicleLightOverlayProps) {
  const specs = vehicleLightSpecs[vehicleId];
  if (!specs?.length) {
    return null;
  }

  return (
    <div
      className={[
        'vehicle-light-overlay',
        `vehicle-light-overlay--${vehicleId}`,
        showAnchors ? 'vehicle-light-overlay--debug' : null,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      {specs.map((spec, index) => (
        <LightNode key={`${spec.kind}-${index}`} spec={spec} index={index} />
      ))}
    </div>
  );
}

export default VehicleLightOverlay;
