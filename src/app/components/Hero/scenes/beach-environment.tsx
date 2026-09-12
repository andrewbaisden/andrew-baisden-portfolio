'use client';

import type { ReactNode } from 'react';
import {
  BeachSailboat,
  type BeachSailboatOverrides,
} from '../vehicles/beach-sailboat';
import {
  BEACH_FOAM,
  BEACH_OCEAN,
  BEACH_SCENE,
  beachPercentX,
  beachPercentY,
  beachSailboatLayout,
} from './beach-tracks';

type BeachEnvironmentProps = {
  motionEnabled: boolean;
  sailboatOverrides?: BeachSailboatOverrides;
};

function CloudGroup({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <g className={className} fill="currentColor">
      {children}
    </g>
  );
}

/**
 * Ambient overlays for the Beach raster hero.
 * Sailboat leads; ocean / foam / clouds / birds stay secondary.
 * Palm fronds stay in the raster — no invented foliage overlays.
 */
export function BeachEnvironment({
  motionEnabled,
  sailboatOverrides,
}: BeachEnvironmentProps) {
  const oceanOpacity =
    sailboatOverrides?.oceanOpacity ?? beachSailboatLayout.oceanOpacity;

  return (
    <div
      className="beach-env"
      data-motion={motionEnabled ? 'on' : 'off'}
      aria-hidden="true"
    >
      <svg
        className="beach-env__svg beach-env__svg--sky"
        viewBox={`0 0 ${BEACH_SCENE.width} ${BEACH_SCENE.height}`}
        preserveAspectRatio="none"
        focusable="false"
      >
        <g className="beach-env__clouds">
          <CloudGroup className="beach-env__cloud beach-env__cloud--far">
            <ellipse cx="480" cy="150" rx="90" ry="24" opacity="0.4" />
            <ellipse cx="560" cy="142" rx="70" ry="20" opacity="0.48" />
          </CloudGroup>
          <CloudGroup className="beach-env__cloud beach-env__cloud--mid">
            <ellipse cx="1280" cy="120" rx="64" ry="18" opacity="0.35" />
            <ellipse cx="1340" cy="114" rx="48" ry="14" opacity="0.42" />
          </CloudGroup>
          <CloudGroup className="beach-env__cloud beach-env__cloud--near">
            <ellipse cx="1680" cy="175" rx="52" ry="15" opacity="0.38" />
          </CloudGroup>
        </g>

        <g className="beach-env__birds">
          <g className="beach-env__bird-flock beach-env__bird-flock--a">
            <path
              d="M0 0 q7 6 14 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M26 -8 q6 5 12 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M50 4 q6 5 11 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>

      <div
        className="beach-env__ocean"
        style={{
          left: beachPercentX(BEACH_OCEAN.x),
          top: beachPercentY(BEACH_OCEAN.y),
          width: `${(BEACH_OCEAN.width / BEACH_SCENE.width) * 100}%`,
          height: `${(BEACH_OCEAN.height / BEACH_SCENE.height) * 100}%`,
          ['--ocean-opacity' as string]: String(oceanOpacity),
        }}
      >
        <div className="beach-env__ocean-wave beach-env__ocean-wave--a" />
        <div className="beach-env__ocean-wave beach-env__ocean-wave--b" />
        <div className="beach-env__ocean-wave beach-env__ocean-wave--c" />
      </div>

      <div
        className="beach-env__foam"
        style={{
          left: beachPercentX(BEACH_FOAM.x),
          top: beachPercentY(BEACH_FOAM.y),
          width: `${(BEACH_FOAM.width / BEACH_SCENE.width) * 100}%`,
          height: `${(BEACH_FOAM.height / BEACH_SCENE.height) * 100}%`,
        }}
      />

      <BeachSailboat
        motionEnabled={motionEnabled}
        overrides={sailboatOverrides}
      />

      <div className="beach-env__dark-veil" />
    </div>
  );
}

export default BeachEnvironment;
