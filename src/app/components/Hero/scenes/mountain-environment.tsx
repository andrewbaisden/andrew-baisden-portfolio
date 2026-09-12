'use client';

import type { ReactNode } from 'react';
import { MountainYacht, type MountainYachtOverrides } from '../vehicles/mountain-yacht';
import {
  MOUNTAIN_LAKE,
  MOUNTAIN_SCENE,
  MOUNTAIN_WATERFALL,
  mountainPercentX,
  mountainPercentY,
} from './mountain-tracks';

type MountainEnvironmentProps = {
  motionEnabled: boolean;
  yachtOverrides?: MountainYachtOverrides;
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
 * Ambient overlays for the Mountain raster hero.
 * Yacht leads motion; waterfall / lake / clouds stay secondary.
 * Static gondolas remain in the raster artwork only.
 */
export function MountainEnvironment({
  motionEnabled,
  yachtOverrides,
}: MountainEnvironmentProps) {
  return (
    <div
      className="mountain-env"
      data-motion={motionEnabled ? 'on' : 'off'}
      aria-hidden="true"
    >
      <svg
        className="mountain-env__svg mountain-env__svg--sky"
        viewBox={`0 0 ${MOUNTAIN_SCENE.width} ${MOUNTAIN_SCENE.height}`}
        preserveAspectRatio="none"
        focusable="false"
      >
        <g className="mountain-env__clouds">
          <CloudGroup className="mountain-env__cloud mountain-env__cloud--far">
            <ellipse cx="520" cy="140" rx="78" ry="22" opacity="0.45" />
            <ellipse cx="590" cy="132" rx="96" ry="28" opacity="0.55" />
            <ellipse cx="660" cy="142" rx="58" ry="18" opacity="0.4" />
          </CloudGroup>
          <CloudGroup className="mountain-env__cloud mountain-env__cloud--mid">
            <ellipse cx="1100" cy="110" rx="70" ry="18" opacity="0.35" />
            <ellipse cx="1160" cy="102" rx="54" ry="15" opacity="0.42" />
          </CloudGroup>
          <CloudGroup className="mountain-env__cloud mountain-env__cloud--near">
            <ellipse cx="1560" cy="168" rx="48" ry="14" opacity="0.4" />
            <ellipse cx="1605" cy="162" rx="40" ry="12" opacity="0.5" />
          </CloudGroup>
        </g>

        <g className="mountain-env__birds">
          <g className="mountain-env__bird-flock mountain-env__bird-flock--a">
            <path
              d="M0 0 q8 7 16 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M30 -10 q7 6 14 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M58 5 q6 5 12 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M88 -14 q7 6 13 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>
        </g>

        <g className="mountain-env__foliage">
          <g className="mountain-env__foliage-sway mountain-env__foliage-sway--left">
            <ellipse
              cx="70"
              cy="90"
              rx="42"
              ry="26"
              fill="currentColor"
              opacity="0.14"
            />
          </g>
          <g className="mountain-env__foliage-sway mountain-env__foliage-sway--right">
            <ellipse
              cx="1980"
              cy="100"
              rx="40"
              ry="24"
              fill="currentColor"
              opacity="0.12"
            />
          </g>
        </g>
      </svg>

      {/* Waterfall flow overlay */}
      <div
        className="mountain-env__waterfall"
        style={{
          left: mountainPercentX(MOUNTAIN_WATERFALL.x),
          top: mountainPercentY(MOUNTAIN_WATERFALL.y),
          width: `${(MOUNTAIN_WATERFALL.width / MOUNTAIN_SCENE.width) * 100}%`,
          height: `${(MOUNTAIN_WATERFALL.height / MOUNTAIN_SCENE.height) * 100}%`,
        }}
      >
        <div className="mountain-env__waterfall-flow" />
      </div>

      {/* Lake shimmer */}
      <div
        className="mountain-env__lake"
        style={{
          left: mountainPercentX(MOUNTAIN_LAKE.x),
          top: mountainPercentY(MOUNTAIN_LAKE.y),
          width: `${(MOUNTAIN_LAKE.width / MOUNTAIN_SCENE.width) * 100}%`,
          height: `${(MOUNTAIN_LAKE.height / MOUNTAIN_SCENE.height) * 100}%`,
        }}
      >
        <div className="mountain-env__lake-shimmer mountain-env__lake-shimmer--a" />
        <div className="mountain-env__lake-shimmer mountain-env__lake-shimmer--b" />
      </div>

      <MountainYacht
        motionEnabled={motionEnabled}
        overrides={yachtOverrides}
      />

      {/* Reserved — night look comes from mountain-night-master.webp */}
      <div className="mountain-env__dark-veil" />
    </div>
  );
}

export default MountainEnvironment;
