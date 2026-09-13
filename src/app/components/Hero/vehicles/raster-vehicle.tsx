import Image from 'next/image';
import { type CSSProperties, forwardRef } from 'react';
import {
  type ArticulationDebugControls,
  isArticulatedVehicle,
  vehicleArticulation,
} from '../animations/vehicle-articulation-config';
import {
  LONDON_SCENE,
  type LondonVehicleLayout,
  londonLaneScale,
  londonTracks,
  scenePercentX,
  scenePercentY,
  vehicleDisplayWidth,
} from '../scenes/london-tracks';
import { VehicleLightOverlay } from './vehicle-light-overlay';
import './vehicle-lights.css';
import './articulated-vehicle.css';

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
  /** Articulation / comparison controls (road vehicles) */
  articulation?: ArticulationDebugControls;
};

function WheelLayer({
  src,
  x,
  y,
  size,
  intrinsic,
}: {
  src: string;
  x: number;
  y: number;
  size: number;
  intrinsic: number;
}) {
  return (
    <span
      className="london-scene__wheel-anchor"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
      }}
    >
      <span className="london-scene__wheel-spin">
        {/* Decorative layer; sized by square parent */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="london-scene__wheel"
          src={src}
          alt=""
          width={intrinsic}
          height={intrinsic}
          draggable={false}
          decoding="async"
        />
      </span>
    </span>
  );
}

export const RasterVehicle = forwardRef<HTMLDivElement, RasterVehicleProps>(
  function RasterVehicle(
    {
      vehicle,
      className,
      animated = false,
      override,
      showLightAnchors = false,
      articulation,
    },
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

    const art =
      articulation?.articulated && isArticulatedVehicle(vehicle.id)
        ? vehicleArticulation[vehicle.id]
        : undefined;
    const showLights = articulation?.vehicleLighting !== false;
    const wheelsOn = Boolean(art && articulation?.wheelRotation !== false);

    const style = {
      left: animated ? '0%' : scenePercentX(x),
      top: scenePercentY(baselineY),
      width: `${widthPercent}%`,
      ['--vehicle-flip' as string]: vehicle.flipX ? -1 : 1,
      ...(art
        ? {
            ['--wheel-duration' as string]: `${art.wheelDurationSec}s`,
            ['--wheel-spin-dir' as string]: String(art.spinDir),
            ['--wheel-speed' as string]: String(articulation?.wheelSpeed ?? 1),
          }
        : null),
    } as CSSProperties;

    const imageSrc = art?.bodySrc ?? vehicle.src;
    const imageWidth = vehicle.intrinsicWidth;
    const imageHeight = vehicle.intrinsicHeight;

    return (
      <div
        ref={ref}
        className={[
          'london-scene__vehicle',
          `london-scene__vehicle--${vehicle.id}`,
          animated ? 'london-scene__vehicle--animated' : null,
          art ? 'london-scene__vehicle--articulated' : null,
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
        data-articulated={art ? 'true' : 'false'}
        data-wheels={wheelsOn ? 'on' : 'off'}
      >
        {art ? (
          <div className="london-scene__vehicle-stack">
            <WheelLayer
              src={art.rearWheel.src}
              x={art.rearWheel.x}
              y={art.rearWheel.y}
              size={art.rearWheel.size}
              intrinsic={Math.round(
                (art.rearWheel.size / 100) * vehicle.intrinsicWidth,
              )}
            />
            <WheelLayer
              src={art.frontWheel.src}
              x={art.frontWheel.x}
              y={art.frontWheel.y}
              size={art.frontWheel.size}
              intrinsic={Math.round(
                (art.frontWheel.size / 100) * vehicle.intrinsicWidth,
              )}
            />
            <Image
              className="london-scene__vehicle-image london-scene__vehicle-image--body"
              src={imageSrc}
              alt=""
              width={imageWidth}
              height={imageHeight}
              sizes={`${Math.ceil(displayWidth * 1.25)}px`}
              quality={90}
              draggable={false}
              unoptimized
              loading="lazy"
              fetchPriority="low"
            />
          </div>
        ) : (
          <Image
            className="london-scene__vehicle-image"
            src={vehicle.src}
            alt=""
            width={imageWidth}
            height={imageHeight}
            sizes={`${Math.ceil(displayWidth * 1.25)}px`}
            quality={90}
            draggable={false}
            unoptimized
            loading="lazy"
            fetchPriority="low"
          />
        )}
        {showLights ? (
          <VehicleLightOverlay
            vehicleId={vehicle.id}
            showAnchors={showLightAnchors}
          />
        ) : null}
      </div>
    );
  },
);

export default RasterVehicle;
