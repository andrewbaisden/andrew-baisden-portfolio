'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import beachDayMaster from '../../../img/beach-day-master.webp';
import beachNightMaster from '../../../img/beach-night-master.webp';
import { useHeroAmbientActive } from '../animations/use-hero-ambient-active';
import type { BeachSailboatOverrides } from '../vehicles/beach-sailboat';
import type { HeroSceneProps } from './hero-scene-types';
import { BeachEnvironment } from './beach-environment';
import {
  BeachSceneCalibrator,
  BeachTrackGuides,
} from './beach-scene-calibrator';
import {
  BEACH_SCENE,
  beachSailboatLayout,
  beachTracks,
} from './beach-tracks';
import './beach-raster-scene.css';
import './beach-environment.css';

/**
 * Beach hero — day/night raster masters + restrained tropical ambience.
 */
export function BeachRasterScene({
  motionEnabled,
  isActive,
}: HeroSceneProps) {
  const isDev = process.env.NODE_ENV === 'development';
  const sceneRef = useRef<HTMLDivElement>(null);
  const [sailboatOverrides, setSailboatOverrides] =
    useState<BeachSailboatOverrides>({});
  const [showGuides, setShowGuides] = useState(false);

  const animate = motionEnabled && isActive;

  const handleOverrides = useCallback((next: BeachSailboatOverrides) => {
    setSailboatOverrides(next);
  }, []);

  useHeroAmbientActive({
    sceneRef,
    motionEnabled: animate,
  });

  const guideY = sailboatOverrides.y ?? beachTracks.sailboat.y;
  const guideStart = sailboatOverrides.startX ?? beachTracks.sailboat.startX;
  const guideEnd = sailboatOverrides.endX ?? beachTracks.sailboat.endX;

  return (
    <>
      <div
        ref={sceneRef}
        className="beach-scene"
        data-scene="beach"
        data-scene-width={BEACH_SCENE.width}
        data-scene-height={BEACH_SCENE.height}
        data-transport={animate ? 'animated' : 'static'}
        data-ambient-motion="paused"
        aria-hidden="true"
      >
        <div className="beach-scene__canvas">
          <div className="beach-scene__background">
            <Image
              className="beach-scene__image beach-scene__image--day"
              src={beachDayMaster}
              alt=""
              fill
              quality={90}
              sizes="100vw"
              priority
            />
            <Image
              className="beach-scene__image beach-scene__image--night"
              src={beachNightMaster}
              alt=""
              fill
              quality={90}
              sizes="100vw"
              loading="lazy"
              fetchPriority="low"
            />
          </div>

          <BeachEnvironment
            motionEnabled={animate}
            sailboatOverrides={sailboatOverrides}
          />

          {isDev && showGuides ? (
            <BeachTrackGuides
              y={guideY}
              startX={guideStart}
              endX={guideEnd}
            />
          ) : null}
        </div>
      </div>

      {isDev && isActive ? (
        <BeachSceneCalibrator
          overrides={sailboatOverrides}
          onChange={handleOverrides}
          showGuides={showGuides}
          onShowGuidesChange={setShowGuides}
        />
      ) : null}
    </>
  );
}

export default BeachRasterScene;

export { beachSailboatLayout };
