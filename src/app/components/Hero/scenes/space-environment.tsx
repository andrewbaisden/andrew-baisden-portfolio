'use client';

import {
  SpaceSpacecraft,
  type SpaceSpacecraftOverrides,
} from '../vehicles/space-spacecraft';
import { SPACE_SCENE } from './space-tracks';

type SpaceEnvironmentProps = {
  motionEnabled: boolean;
  craftOverrides?: SpaceSpacecraftOverrides;
};

/**
 * Ambient overlays for the Space raster hero.
 * Spacecraft leads; stars / shooting star stay secondary.
 * Large planets stay baked in the raster — never duplicated.
 * Alien foliage stays in the artwork (no invented overlays).
 */
export function SpaceEnvironment({
  motionEnabled,
  craftOverrides,
}: SpaceEnvironmentProps) {
  return (
    <div
      className="space-env"
      data-motion={motionEnabled ? 'on' : 'off'}
      aria-hidden="true"
    >
      <svg
        className="space-env__svg space-env__svg--sky"
        viewBox={`0 0 ${SPACE_SCENE.width} ${SPACE_SCENE.height}`}
        preserveAspectRatio="none"
        focusable="false"
      >
        <g className="space-env__stars">
          {STAR_POINTS.map((star) => (
            <circle
              key={star.id}
              className={`space-env__star space-env__star--${star.tier}`}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="currentColor"
              opacity={star.opacity}
            />
          ))}
        </g>

        <g className="space-env__shooting-star">
          <line
            x1="0"
            y1="0"
            x2="48"
            y2="14"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>
      </svg>

      <SpaceSpacecraft
        motionEnabled={motionEnabled}
        overrides={craftOverrides}
      />

      <div className="space-env__dark-veil" />
    </div>
  );
}

type StarPoint = {
  id: string;
  x: number;
  y: number;
  r: number;
  opacity: number;
  tier: 'a' | 'b' | 'c';
};

/** Sparse overlay only — raster starfield carries the look. */
const STAR_POINTS: StarPoint[] = [
  { id: 's1', x: 220, y: 90, r: 1.1, opacity: 0.55, tier: 'a' },
  { id: 's2', x: 410, y: 160, r: 0.9, opacity: 0.4, tier: 'b' },
  { id: 's3', x: 580, y: 70, r: 1.2, opacity: 0.5, tier: 'c' },
  { id: 's4', x: 760, y: 130, r: 0.8, opacity: 0.35, tier: 'a' },
  { id: 's5', x: 920, y: 55, r: 1.0, opacity: 0.45, tier: 'b' },
  { id: 's6', x: 1080, y: 180, r: 0.9, opacity: 0.38, tier: 'c' },
  { id: 's7', x: 1240, y: 95, r: 1.1, opacity: 0.5, tier: 'a' },
  { id: 's8', x: 1420, y: 150, r: 0.8, opacity: 0.32, tier: 'b' },
  { id: 's9', x: 1580, y: 60, r: 1.0, opacity: 0.42, tier: 'c' },
  { id: 's10', x: 1740, y: 210, r: 0.9, opacity: 0.36, tier: 'a' },
  { id: 's11', x: 310, y: 240, r: 0.7, opacity: 0.3, tier: 'b' },
  { id: 's12', x: 670, y: 220, r: 0.8, opacity: 0.34, tier: 'c' },
  { id: 's13', x: 990, y: 250, r: 0.7, opacity: 0.28, tier: 'a' },
  { id: 's14', x: 1330, y: 240, r: 0.9, opacity: 0.4, tier: 'b' },
  { id: 's15', x: 1880, y: 120, r: 0.8, opacity: 0.33, tier: 'c' },
  { id: 's16', x: 150, y: 200, r: 0.7, opacity: 0.3, tier: 'a' },
  { id: 's17', x: 850, y: 40, r: 1.0, opacity: 0.48, tier: 'b' },
  { id: 's18', x: 1160, y: 40, r: 0.8, opacity: 0.35, tier: 'c' },
];

export default SpaceEnvironment;
