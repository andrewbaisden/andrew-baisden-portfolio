'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import spaceDayMaster from '../../../img/space-day-master.webp';
import spaceNightMaster from '../../../img/space-night-master.webp';
import { useHeroAmbientActive } from '../animations/use-hero-ambient-active';
import type { SpaceSpacecraftOverrides } from '../vehicles/space-spacecraft';
import type { HeroSceneProps } from './hero-scene-types';
import { SpaceEnvironment } from './space-environment';
import {
  SpaceSceneCalibrator,
  SpaceTrackGuides,
} from './space-scene-calibrator';
import {
  SPACE_SCENE,
  spaceSpacecraftLayout,
  spaceTracks,
} from './space-tracks';
import './space-raster-scene.css';
import './space-environment.css';

/**
 * Space hero — day/night raster masters + restrained celestial ambience.
 */
export function SpaceRasterScene({
  motionEnabled,
  isActive,
}: HeroSceneProps) {
  const isDev = process.env.NODE_ENV === 'development';
  const sceneRef = useRef<HTMLDivElement>(null);
  const [craftOverrides, setCraftOverrides] =
    useState<SpaceSpacecraftOverrides>({});
  const [showGuides, setShowGuides] = useState(false);

  const animate = motionEnabled && isActive;

  const handleOverrides = useCallback((next: SpaceSpacecraftOverrides) => {
    setCraftOverrides(next);
  }, []);

  useHeroAmbientActive({
    sceneRef,
    motionEnabled: animate,
  });

  const guideStartX =
    craftOverrides.startX ?? spaceTracks.spacecraft.startX;
  const guideStartY =
    craftOverrides.startY ?? spaceTracks.spacecraft.startY;
  const guideEndX = craftOverrides.endX ?? spaceTracks.spacecraft.endX;
  const guideEndY = craftOverrides.endY ?? spaceTracks.spacecraft.endY;

  return (
    <>
      <div
        ref={sceneRef}
        className="space-scene"
        data-scene="space"
        data-scene-width={SPACE_SCENE.width}
        data-scene-height={SPACE_SCENE.height}
        data-transport={animate ? 'animated' : 'static'}
        data-ambient-motion="paused"
        aria-hidden="true"
      >
        <div className="space-scene__canvas">
          <div className="space-scene__background">
            <Image
              className="space-scene__image space-scene__image--day"
              src={spaceDayMaster}
              alt=""
              fill
              quality={90}
              sizes="100vw"
              priority
            />
            <Image
              className="space-scene__image space-scene__image--night"
              src={spaceNightMaster}
              alt=""
              fill
              quality={90}
              sizes="100vw"
              loading="lazy"
              fetchPriority="low"
            />
          </div>

          <SpaceEnvironment
            motionEnabled={animate}
            craftOverrides={craftOverrides}
          />

          {isDev && showGuides ? (
            <SpaceTrackGuides
              startX={guideStartX}
              startY={guideStartY}
              endX={guideEndX}
              endY={guideEndY}
            />
          ) : null}
        </div>
      </div>

      {isDev && isActive ? (
        <SpaceSceneCalibrator
          overrides={craftOverrides}
          onChange={handleOverrides}
          showGuides={showGuides}
          onShowGuidesChange={setShowGuides}
        />
      ) : null}
    </>
  );
}

export default SpaceRasterScene;

export { spaceSpacecraftLayout };
