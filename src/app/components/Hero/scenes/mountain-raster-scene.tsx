'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import mountainDayMaster from '../../../img/mountain-day-master.webp';
import mountainNightMaster from '../../../img/mountain-night-master.webp';
import { useHeroAmbientActive } from '../animations/use-hero-ambient-active';
import type { MountainYachtOverrides } from '../vehicles/mountain-yacht';
import type { HeroSceneProps } from './hero-scene-types';
import { MountainEnvironment } from './mountain-environment';
import {
  MountainSceneCalibrator,
  MountainTrackGuides,
} from './mountain-scene-calibrator';
import {
  MOUNTAIN_SCENE,
  mountainLakeTrack,
  mountainYachtLayout,
} from './mountain-tracks';
import './mountain-raster-scene.css';
import './mountain-environment.css';

/**
 * Mountain hero — day/night raster masters + restrained ambient overlays.
 */
export function MountainRasterScene({
  motionEnabled,
  isActive,
}: HeroSceneProps) {
  const isDev = process.env.NODE_ENV === 'development';
  const sceneRef = useRef<HTMLDivElement>(null);
  const [yachtOverrides, setYachtOverrides] = useState<MountainYachtOverrides>(
    {},
  );
  const [showGuides, setShowGuides] = useState(false);

  const animate = motionEnabled && isActive;

  const handleOverrides = useCallback((next: MountainYachtOverrides) => {
    setYachtOverrides(next);
  }, []);

  useHeroAmbientActive({
    sceneRef,
    motionEnabled: animate,
  });

  const guideY = yachtOverrides.y ?? mountainLakeTrack.y;
  const guideStart = yachtOverrides.startX ?? mountainLakeTrack.startX;
  const guideEnd = yachtOverrides.endX ?? mountainLakeTrack.endX;

  return (
    <>
      <div
        ref={sceneRef}
        className="mountain-scene"
        data-scene="mountain"
        data-scene-width={MOUNTAIN_SCENE.width}
        data-scene-height={MOUNTAIN_SCENE.height}
        data-transport={animate ? 'animated' : 'static'}
        data-ambient-motion="paused"
        aria-hidden="true"
      >
        <div className="mountain-scene__canvas">
          <div className="mountain-scene__background">
            <Image
              className="mountain-scene__image mountain-scene__image--day"
              src={mountainDayMaster}
              alt=""
              fill
              quality={90}
              sizes="100vw"
              // Stable props — avoid remount flicker (Brave).
              priority
            />
            <Image
              className="mountain-scene__image mountain-scene__image--night"
              src={mountainNightMaster}
              alt=""
              fill
              quality={90}
              sizes="100vw"
              loading="lazy"
              fetchPriority="low"
            />
          </div>

          <MountainEnvironment
            motionEnabled={animate}
            yachtOverrides={yachtOverrides}
          />

          {isDev && showGuides ? (
            <MountainTrackGuides
              y={guideY}
              startX={guideStart}
              endX={guideEnd}
            />
          ) : null}
        </div>
      </div>

      {isDev && isActive ? (
        <MountainSceneCalibrator
          overrides={yachtOverrides}
          onChange={handleOverrides}
          showGuides={showGuides}
          onShowGuidesChange={setShowGuides}
        />
      ) : null}
    </>
  );
}

export default MountainRasterScene;

export { mountainYachtLayout };
