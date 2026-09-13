'use client';

import { useEffect, useState } from 'react';
import { HeroDevPortal } from '../dev/hero-dev-portal';
import type { MountainYachtOverrides } from '../vehicles/mountain-yacht';
import {
  MOUNTAIN_SCENE,
  mountainLakeTrack,
  mountainYachtLayout,
} from './mountain-tracks';

const STORAGE_KEY = 'mountain-yacht-calibration-v5';

export type MountainCalibratorProps = {
  overrides: MountainYachtOverrides;
  onChange: (next: MountainYachtOverrides) => void;
  showGuides: boolean;
  onShowGuidesChange: (value: boolean) => void;
};

function defaults(): MountainYachtOverrides {
  return {
    scale: mountainYachtLayout.scale,
    y: mountainLakeTrack.y,
    startX: mountainLakeTrack.startX,
    endX: mountainLakeTrack.endX,
    durationSec: mountainYachtLayout.durationSec,
    wakeOpacity: mountainYachtLayout.wakeOpacity,
    staticX: mountainYachtLayout.staticX,
  };
}

function loadStored(): MountainYachtOverrides {
  const base = defaults();
  if (typeof window === 'undefined') {
    return base;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as MountainYachtOverrides;
    return { ...base, ...parsed };
  } catch {
    return base;
  }
}

/**
 * Dev-only Mountain yacht / lake path calibrator.
 */
export function MountainSceneCalibrator({
  overrides,
  onChange,
  showGuides,
  onShowGuidesChange,
}: MountainCalibratorProps) {
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

  const set = <K extends keyof MountainYachtOverrides>(
    key: K,
    value: number,
  ) => {
    onChange({ ...overrides, [key]: value });
  };

  const v = { ...defaults(), ...overrides };

  return (
    <HeroDevPortal>
      <aside
        className="mountain-calibrator"
        data-ready={ready ? 'true' : 'false'}
      >
        <header className="mountain-calibrator__header">
          <strong>Mountain yacht</strong>
          <label className="mountain-calibrator__check">
            <input
              type="checkbox"
              checked={showGuides}
              onChange={(e) => onShowGuidesChange(e.target.checked)}
            />
            Guides
          </label>
          <button
            type="button"
            className="mountain-calibrator__reset"
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
            max={2.2}
            step={0.02}
            value={v.scale}
            onChange={(e) => set('scale', Number(e.target.value))}
          />
        </label>
        <label>
          Yacht Y {Math.round(v.y ?? 0)}
          <input
            type="range"
            min={760}
            max={880}
            step={1}
            value={v.y}
            onChange={(e) => set('y', Number(e.target.value))}
          />
        </label>
        <label>
          Start X {Math.round(v.startX ?? 0)}
          <input
            type="range"
            min={400}
            max={900}
            step={4}
            value={v.startX}
            onChange={(e) => set('startX', Number(e.target.value))}
          />
        </label>
        <label>
          End X {Math.round(v.endX ?? 0)}
          <input
            type="range"
            min={1100}
            max={1800}
            step={4}
            value={v.endX}
            onChange={(e) => set('endX', Number(e.target.value))}
          />
        </label>
        <label>
          One-way s {v.durationSec?.toFixed(0)}
          <input
            type="range"
            min={18}
            max={48}
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
            max={0.7}
            step={0.02}
            value={v.wakeOpacity}
            onChange={(e) => set('wakeOpacity', Number(e.target.value))}
          />
        </label>

        <p className="mountain-calibrator__meta">
          Scene {MOUNTAIN_SCENE.width}×{MOUNTAIN_SCENE.height} · lake Y{' '}
          {mountainLakeTrack.y} · round-trip {(v.durationSec ?? 32) * 2}s
        </p>
      </aside>
    </HeroDevPortal>
  );
}

export function MountainTrackGuides({
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
      className="mountain-scene__guides"
      viewBox={`0 0 ${MOUNTAIN_SCENE.width} ${MOUNTAIN_SCENE.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect
        x={0}
        y={0}
        width={MOUNTAIN_SCENE.width}
        height={MOUNTAIN_SCENE.height}
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
      <circle cx={0} cy={y} r="6" fill="rgba(0, 220, 255, 0.9)" />
      <circle
        cx={MOUNTAIN_SCENE.width}
        cy={y}
        r="6"
        fill="rgba(0, 220, 255, 0.9)"
      />
      <text x={24} y={y - 12} fill="rgba(0, 220, 255, 0.95)" fontSize="22">
        lake path y={Math.round(y)}
      </text>
    </svg>
  );
}

export default MountainSceneCalibrator;
