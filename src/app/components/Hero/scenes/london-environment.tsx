'use client';

import type { ReactNode } from 'react';
import { LONDON_ENV } from '../animations/london-environment-config';
import { LONDON_SCENE, scenePercentX, scenePercentY } from './london-tracks';

export type AmbientDebugFlags = {
  showNightLighting: boolean;
  showClouds: boolean;
  showWater: boolean;
  showBirds: boolean;
  showFoliage: boolean;
  showLampGlow: boolean;
  pauseAmbient: boolean;
  playbackRate: number;
};

type LondonEnvironmentProps = {
  debug?: AmbientDebugFlags;
};

function pct(x: number, axis: 'x' | 'y'): string {
  return axis === 'x' ? scenePercentX(x) : scenePercentY(x);
}

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
 * Secondary ambient layer for the London raster hero.
 * Transport remains the primary motion; this stays calm and performance-safe.
 */
export function LondonEnvironment({ debug }: LondonEnvironmentProps) {
  const rate = debug?.playbackRate ?? 1;
  const forceNight = debug?.showNightLighting ?? false;

  return (
    <div
      className={[
        'london-env',
        forceNight ? 'london-env--force-night' : null,
        debug?.showClouds === false ? 'london-env--hide-clouds' : null,
        debug?.showWater === false ? 'london-env--hide-water' : null,
        debug?.showBirds === false ? 'london-env--hide-birds' : null,
        debug?.showFoliage === false ? 'london-env--hide-foliage' : null,
        debug?.showLampGlow === false ? 'london-env--hide-lamps' : null,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ['--ambient-rate' as string]: String(rate) }}
      aria-hidden="true"
    >
      {/* Day-leaning ambient */}
      <svg
        className="london-env__svg london-env__svg--sky"
        viewBox={`0 0 ${LONDON_SCENE.width} ${LONDON_SCENE.height}`}
        preserveAspectRatio="none"
        focusable="false"
      >
        <g className="london-env__clouds">
          <CloudGroup className="london-env__cloud london-env__cloud--far">
            <ellipse cx="220" cy="118" rx="70" ry="24" opacity="0.55" />
            <ellipse cx="280" cy="108" rx="86" ry="30" opacity="0.7" />
            <ellipse cx="340" cy="116" rx="54" ry="20" opacity="0.5" />
            <ellipse cx="430" cy="188" rx="58" ry="16" opacity="0.45" />
            <ellipse cx="474" cy="182" rx="42" ry="14" opacity="0.55" />
          </CloudGroup>
          <CloudGroup className="london-env__cloud london-env__cloud--near">
            <ellipse cx="1580" cy="168" rx="42" ry="14" opacity="0.5" />
            <ellipse cx="1616" cy="162" rx="38" ry="13" opacity="0.6" />
            <ellipse cx="720" cy="96" rx="64" ry="18" opacity="0.35" />
            <ellipse cx="780" cy="90" rx="48" ry="14" opacity="0.45" />
          </CloudGroup>
        </g>

        <g className="london-env__birds">
          <g className="london-env__bird-flock london-env__bird-flock--a">
            <path d="M0 0 q8 7 16 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M34 -12 q7 6 14 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M66 6 q6 5 12 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M100 -18 q7 6 13 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <g className="london-env__bird-flock london-env__bird-flock--b">
            <path d="M0 0 q7 6 14 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M28 -8 q6 5 12 0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M54 4 q6 5 11 0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </g>
        </g>

        <g className="london-env__foliage">
          <g className="london-env__foliage-sway london-env__foliage-sway--left">
            <ellipse cx="80" cy="70" rx="48" ry="28" fill="currentColor" opacity="0.18" />
            <ellipse cx="120" cy="48" rx="36" ry="22" fill="currentColor" opacity="0.14" />
          </g>
          <g className="london-env__foliage-sway london-env__foliage-sway--right">
            <ellipse cx="1960" cy="72" rx="46" ry="26" fill="currentColor" opacity="0.16" />
            <ellipse cx="2010" cy="52" rx="34" ry="20" fill="currentColor" opacity="0.12" />
          </g>
        </g>
      </svg>

      {/* River shimmer + night reflections */}
      <div
        className="london-env__river"
        style={{
          top: pct(LONDON_ENV.river.y, 'y'),
          height: `${(LONDON_ENV.river.height / LONDON_SCENE.height) * 100}%`,
        }}
      >
        <div className="london-env__river-shimmer london-env__river-shimmer--a" />
        <div className="london-env__river-shimmer london-env__river-shimmer--b" />
        <div className="london-env__river-shimmer london-env__river-shimmer--c" />
        <div className="london-env__river-night">
          <span className="london-env__river-reflection london-env__river-reflection--1" />
          <span className="london-env__river-reflection london-env__river-reflection--2" />
          <span className="london-env__river-reflection london-env__river-reflection--3" />
          <span className="london-env__river-reflection london-env__river-reflection--4" />
          <span className="london-env__river-reflection london-env__river-reflection--city" />
        </div>
      </div>

      {/* Night-only: street lamps, windows, shelter, platform pools */}
      <div className="london-env__night">
        <div className="london-env__lamps">
          {LONDON_ENV.lamps.map((lamp) => (
            <span
              key={lamp.id}
              className="london-env__lamp-glow"
              style={{
                left: pct(lamp.x, 'x'),
                top: pct(lamp.y, 'y'),
                width: `${((lamp.radius * 2) / LONDON_SCENE.width) * 100}%`,
                paddingBottom: `${((lamp.radius * 2) / LONDON_SCENE.height) * 100}%`,
              }}
              data-lamp={lamp.id}
            />
          ))}
        </div>

        <div className="london-env__windows">
          {LONDON_ENV.windows.map((win, i) => (
            <span
              key={`win-${i}`}
              className={`london-env__window${i % 5 === 0 ? ' london-env__window--soft' : ''}`}
              style={{
                left: pct(win.x, 'x'),
                top: pct(win.y, 'y'),
                width: `${(win.w / LONDON_SCENE.width) * 100}%`,
                height: `${(win.h / LONDON_SCENE.height) * 100}%`,
                animationDelay: `${(i * 7) % 40}s`,
              }}
            />
          ))}
        </div>

        <div
          className="london-env__shelter-glow"
          style={{
            left: pct(LONDON_ENV.shelterGlow.x, 'x'),
            top: pct(LONDON_ENV.shelterGlow.y, 'y'),
            width: `${(LONDON_ENV.shelterGlow.w / LONDON_SCENE.width) * 100}%`,
            height: `${(LONDON_ENV.shelterGlow.h / LONDON_SCENE.height) * 100}%`,
          }}
        />

        <div className="london-env__platform">
          {LONDON_ENV.platformPools.map((pool, i) => (
            <span
              key={`pool-${i}`}
              className="london-env__platform-pool"
              style={{
                left: pct(pool.x, 'x'),
                top: pct(pool.y, 'y'),
              }}
            />
          ))}
          <span className="london-env__tunnel-shade london-env__tunnel-shade--left" />
          <span className="london-env__tunnel-shade london-env__tunnel-shade--right" />
        </div>
      </div>
    </div>
  );
}

export default LondonEnvironment;
