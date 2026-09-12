'use client';

import Image from 'next/image';
import { useCallback, useMemo, useRef, useState } from 'react';
import londonDayMaster from '../../../img/london-day-master.webp';
import londonNightMaster from '../../../img/london-night-master.webp';
import { useHeroAmbientActive } from '../animations/use-hero-ambient-active';
import { useLondonTransportAnimation } from '../animations/use-london-transport-animation';
import { useReducedMotion } from '../animations/use-reduced-motion';
import { RasterVehicle } from '../vehicles/raster-vehicle';
import {
  LondonEnvironment,
  type AmbientDebugFlags,
} from './london-environment';
import {
  LondonSceneCalibrator,
  LondonTrackGuides,
  type CalibrationOverrides,
  type TrafficDebugControls,
} from './london-scene-calibrator';
import {
  LONDON_SCENE,
  londonVehicleLayout,
  type LondonVehicleId,
  type LondonVehicleLayout,
} from './london-tracks';
import './london-raster-scene.css';
import './london-environment.css';
import type { HeroSceneProps } from './hero-scene-types';

export { LONDON_SCENE as LONDON_SCENE_VIEWBOX } from './london-tracks';

const VEHICLE_IDS = Object.keys(londonVehicleLayout) as LondonVehicleId[];
const ROAD_VEHICLES: LondonVehicleId[] = ['cab', 'bus', 'waymo'];

const DEFAULT_AMBIENT_DEBUG: AmbientDebugFlags = {
  showNightLighting: false,
  showClouds: true,
  showWater: true,
  showBirds: true,
  showFoliage: true,
  showLampGlow: true,
  pauseAmbient: false,
  playbackRate: 1,
};

function mergeLayouts(overrides: CalibrationOverrides): Record<
  LondonVehicleId,
  LondonVehicleLayout
> {
  return Object.fromEntries(
    VEHICLE_IDS.map((id) => {
      const base = londonVehicleLayout[id];
      const o = overrides[id];
      if (!o) {
        return [id, base];
      }
      return [
        id,
        {
          ...base,
          x: o.x,
          scale: o.scale,
          baselineOffset: o.baselineOffset,
        },
      ];
    }),
  ) as Record<LondonVehicleId, LondonVehicleLayout>;
}


type LondonRasterSceneProps = Partial<HeroSceneProps>;

export function LondonRasterScene({
  motionEnabled: motionEnabledProp,
  isActive = true,
}: LondonRasterSceneProps = {}) {
  const isDev = process.env.NODE_ENV === 'development';
  const reducedMotion = useReducedMotion();
  const [overrides, setOverrides] = useState<CalibrationOverrides>({});
  const [showGuides, setShowGuides] = useState(false);
  const [showLightAnchors, setShowLightAnchors] = useState(false);
  const [ambientDebug, setAmbientDebug] =
    useState<AmbientDebugFlags>(DEFAULT_AMBIENT_DEBUG);
  const [traffic, setTraffic] = useState<TrafficDebugControls>({
    pause: false,
    playbackRate: 2,
    showPaths: false,
  });

  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const busRef = useRef<HTMLDivElement>(null);
  const cabRef = useRef<HTMLDivElement>(null);
  const waymoRef = useRef<HTMLDivElement>(null);
  const tubeRef = useRef<HTMLDivElement>(null);

  const vehicleRefs = useMemo(
    () => ({
      bus: busRef,
      cab: cabRef,
      waymo: waymoRef,
      tube: tubeRef,
    }),
    [],
  );

  const layouts = useMemo(() => mergeLayouts(overrides), [overrides]);
  // Scene engine supplies motionEnabled; fall back to reduced-motion when standalone.
  const transportEnabled =
    isActive &&
    (motionEnabledProp === undefined ? !reducedMotion : motionEnabledProp);

  const handleOverrides = useCallback((next: CalibrationOverrides) => {
    setOverrides(next);
  }, []);

  useLondonTransportAnimation({
    canvasRef,
    sceneRef,
    vehicleRefs,
    layouts,
    enabled: transportEnabled,
    pause: traffic.pause || !isActive,
    playbackRate: traffic.playbackRate,
  });

  useHeroAmbientActive({
    sceneRef,
    motionEnabled: transportEnabled,
    forcePause: ambientDebug.pauseAmbient || !isActive,
  });

  const refFor = (id: LondonVehicleId) => {
    if (id === 'bus') return busRef;
    if (id === 'cab') return cabRef;
    if (id === 'waymo') return waymoRef;
    return tubeRef;
  };

  return (
    <>
      <div
        ref={sceneRef}
        className="london-scene"
        data-scene="london"
        data-scene-width={LONDON_SCENE.width}
        data-scene-height={LONDON_SCENE.height}
        data-transport={transportEnabled ? 'animated' : 'static'}
        data-force-night={ambientDebug.showNightLighting ? 'true' : 'false'}
        data-ambient-motion="paused"
        aria-hidden="true"
      >
        <div ref={canvasRef} className="london-scene__canvas">
          <div className="london-scene__background">
            <Image
              className="london-scene__image london-scene__image--day"
              src={londonDayMaster}
              alt=""
              fill
              preload
              quality={90}
              sizes="100vw"
            />
            <Image
              className="london-scene__image london-scene__image--night"
              src={londonNightMaster}
              alt=""
              fill
              loading="lazy"
              fetchPriority="low"
              quality={90}
              sizes="100vw"
            />
          </div>

          <LondonEnvironment debug={isDev ? ambientDebug : undefined} />

          <div className="london-scene__layer london-scene__layer--road">
            {ROAD_VEHICLES.map((id) => (
              <RasterVehicle
                key={id}
                ref={refFor(id)}
                vehicle={layouts[id]}
                override={overrides[id]}
                animated={transportEnabled}
                showLightAnchors={isDev && showLightAnchors}
              />
            ))}
          </div>

          <div className="london-scene__layer london-scene__layer--underground">
            <RasterVehicle
              ref={tubeRef}
              vehicle={layouts.tube}
              override={overrides.tube}
              animated={transportEnabled}
              showLightAnchors={isDev && showLightAnchors}
            />
          </div>

          {isDev && (showGuides || traffic.showPaths) ? (
            <LondonTrackGuides
              showBaselines={showGuides}
              showPaths={traffic.showPaths}
              layouts={layouts}
            />
          ) : null}
        </div>
      </div>

      {isDev && isActive ? (
        <LondonSceneCalibrator
          onChange={handleOverrides}
          showGuides={showGuides}
          onShowGuidesChange={setShowGuides}
          traffic={traffic}
          onTrafficChange={setTraffic}
          reducedMotion={reducedMotion}
          ambient={ambientDebug}
          onAmbientChange={setAmbientDebug}
          showLightAnchors={showLightAnchors}
          onShowLightAnchorsChange={setShowLightAnchors}
        />
      ) : null}
    </>
  );
}

export default LondonRasterScene;
