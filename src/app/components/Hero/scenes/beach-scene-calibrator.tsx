'use client';

import { useEffect, useState } from 'react';
import { HeroDevPortal } from '../dev/hero-dev-portal';
import type { BeachSailboatOverrides } from '../vehicles/beach-sailboat';
import { BEACH_SCENE, beachSailboatLayout, beachTracks } from './beach-tracks';

const STORAGE_KEY = 'beach-sailboat-calibration-v2';

export type BeachCalibratorProps = {
  overrides: BeachSailboatOverrides;
  onChange: (next: BeachSailboatOverrides) => void;
  showGuides: boolean;
  onShowGuidesChange: (value: boolean) => void;
};

function defaults(): BeachSailboatOverrides {
  return {
    scale: beachSailboatLayout.scale,
    y: beachTracks.sailboat.y,
    startX: beachTracks.sailboat.startX,
    endX: beachTracks.sailboat.endX,
    durationSec: beachSailboatLayout.durationSec,
    wakeOpacity: beachSailboatLayout.wakeOpacity,
    oceanOpacity: beachSailboatLayout.oceanOpacity,
    staticX: beachSailboatLayout.staticX,
  };
}

function loadStored(): BeachSailboatOverrides {
  const base = defaults();
  if (typeof window === 'undefined') {
    return base;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as BeachSailboatOverrides;
    return { ...base, ...parsed };
  } catch {
    return base;
  }
}

/**
 * Dev-only Beach sailboat / ocean path calibrator.
 */
export function BeachSceneCalibrator({
  overrides,
  onChange,
  showGuides,
  onShowGuidesChange,
}: BeachCalibratorProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = loadStored();
    onChange(stored);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hydrate once
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      /* ignore */
    }
  }, [overrides, ready]);

  const set = <K extends keyof BeachSailboatOverrides>(
    key: K,
    value: number,
  ) => {
    onChange({ ...overrides, [key]: value });
  };

  const v = { ...defaults(), ...overrides };

  return (
    <HeroDevPortal>
      <aside className="beach-calibrator" data-ready={ready ? 'true' : 'false'}>
        <header className="beach-calibrator__header">
          <strong>Beach sailboat</strong>
          <label className="beach-calibrator__check">
            <input
              type="checkbox"
              checked={showGuides}
              onChange={(e) => onShowGuidesChange(e.target.checked)}
            />
            Guides
          </label>
          <button
            type="button"
            className="beach-calibrator__reset"
            onClick={() => onChange(defaults())}
          >
            Reset
          </button>
        </header>

        <label>
          Scale {v.scale?.toFixed(2)}
          <input
            type="range"
            min={0.4}
            max={2}
            step={0.02}
            value={v.scale}
            onChange={(e) => set('scale', Number(e.target.value))}
          />
        </label>
        <label>
          Sailboat Y {Math.round(v.y ?? 0)}
          <input
            type="range"
            min={580}
            max={760}
            step={1}
            value={v.y}
            onChange={(e) => set('y', Number(e.target.value))}
          />
        </label>
        <label>
          Start X {Math.round(v.startX ?? 0)}
          <input
            type="range"
            min={280}
            max={800}
            step={4}
            value={v.startX}
            onChange={(e) => set('startX', Number(e.target.value))}
          />
        </label>
        <label>
          End X {Math.round(v.endX ?? 0)}
          <input
            type="range"
            min={1000}
            max={1600}
            step={4}
            value={v.endX}
            onChange={(e) => set('endX', Number(e.target.value))}
          />
        </label>
        <label>
          One-way s {v.durationSec?.toFixed(0)}
          <input
            type="range"
            min={24}
            max={55}
            step={1}
            value={v.durationSec}
            onChange={(e) => set('durationSec', Number(e.target.value))}
          />
        </label>
        <label>
          Wake opacity {v.wakeOpacity?.toFixed(2)}
          <input
            type="range"
            min={0}
            max={0.6}
            step={0.02}
            value={v.wakeOpacity}
            onChange={(e) => set('wakeOpacity', Number(e.target.value))}
          />
        </label>
        <label>
          Ocean opacity {v.oceanOpacity?.toFixed(2)}
          <input
            type="range"
            min={0}
            max={0.4}
            step={0.02}
            value={v.oceanOpacity}
            onChange={(e) => set('oceanOpacity', Number(e.target.value))}
          />
        </label>

        <p className="beach-calibrator__meta">
          Scene {BEACH_SCENE.width}×{BEACH_SCENE.height} · water Y{' '}
          {beachTracks.sailboat.y} · round-trip {(v.durationSec ?? 38) * 2}s
        </p>
      </aside>
    </HeroDevPortal>
  );
}

export function BeachTrackGuides({
  y,
  startX,
  endX,
}: {
  y: number;
  startX: number;
  endX: number;
}) {
  return (
    <svg
      className="beach-scene__guides"
      viewBox={`0 0 ${BEACH_SCENE.width} ${BEACH_SCENE.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect
        x={0}
        y={0}
        width={BEACH_SCENE.width}
        height={BEACH_SCENE.height}
        fill="none"
        stroke="rgba(255, 80, 80, 0.45)"
        strokeWidth="2"
        strokeDasharray="10 8"
      />
      <line
        x1={startX}
        y1={y}
        x2={endX}
        y2={y}
        stroke="rgba(0, 220, 255, 0.75)"
        strokeWidth="2"
      />
      <text x={24} y={y - 12} fill="rgba(0, 220, 255, 0.95)" fontSize="22">
        ocean path y={Math.round(y)}
      </text>
    </svg>
  );
}

export default BeachSceneCalibrator;
