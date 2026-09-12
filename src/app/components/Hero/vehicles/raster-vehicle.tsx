import Image from 'next/image';
import { forwardRef, type CSSProperties } from 'react';
import {
  LONDON_SCENE,
  londonLaneScale,
  londonTracks,
  scenePercentX,
  scenePercentY,
  vehicleDisplayWidth,
  type LondonVehicleLayout,
} from '../scenes/london-tracks';
import { VehicleLightOverlay } from './vehicle-light-overlay';
import './vehicle-lights.css';

type RasterVehicleProps = {
  vehicle: LondonVehicleLayout;
  className?: string;
  /** When true, X is driven by WAAPI transform (left stays 0). */
  animated?: boolean;
  /** Optional live overrides from the dev calibrator */
  override?: {
    x?: number;
    scale?: number;
    baselineOffset?: number;
  };
  /** Dev: outline light anchors */
  showLightAnchors?: boolean;
};

export const RasterVehicle = forwardRef<HTMLDivElement, RasterVehicleProps>(
  function RasterVehicle(
    { vehicle, className, animated = false, override, showLightAnchors = false },
    ref,
  ) {
    const scale = override?.scale ?? vehicle.scale;
    const x = override?.x ?? vehicle.x;
    const baselineOffset =
      override?.baselineOffset ?? vehicle.baselineOffset ?? 0;
    const displayWidth = vehicleDisplayWidth(vehicle, scale);
    const baselineY = londonTracks[vehicle.track].y + baselineOffset;
    const widthPercent = (displayWidth / LONDON_SCENE.width) * 100;
    const laneScale = londonLaneScale[vehicle.track];

    const style = {
      left: animated ? '0%' : scenePercentX(x),
      top: scenePercentY(baselineY),
      width: `${widthPercent}%`,
      ['--vehicle-flip' as string]: vehicle.flipX ? -1 : 1,
    } as CSSProperties;

    return (
      <div
        ref={ref}
        className={[
          'london-scene__vehicle',
          `london-scene__vehicle--${vehicle.id}`,
          animated ? 'london-scene__vehicle--animated' : null,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
        aria-hidden="true"
        data-vehicle={vehicle.id}
        data-track={vehicle.track}
        data-baseline={baselineY}
        data-lane-scale={laneScale}
        data-display-width={Math.round(displayWidth)}
        data-animated={animated ? 'true' : 'false'}
      >
        <Image
          className="london-scene__vehicle-image"
          src={vehicle.src}
          alt=""
          width={vehicle.intrinsicWidth}
          height={vehicle.intrinsicHeight}
          sizes={`${Math.ceil(displayWidth * 1.25)}px`}
          quality={90}
          draggable={false}
          unoptimized
          loading="lazy"
          fetchPriority="low"
        />
        <VehicleLightOverlay
          vehicleId={vehicle.id}
          showAnchors={showLightAnchors}
        />
      </div>
    );
  },
);

export default RasterVehicle;
