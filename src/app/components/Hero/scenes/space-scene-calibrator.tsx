'use client';

import { useEffect, useState } from 'react';
import { HeroDevPortal } from '../dev/hero-dev-portal';
import type { SpaceSpacecraftOverrides } from '../vehicles/space-spacecraft';
import {
  SPACE_SCENE,
  spaceSpacecraftLayout,
  spaceTracks,
} from './space-tracks';

const STORAGE_KEY = 'space-spacecraft-calibration-v1';

export type SpaceCalibratorProps = {
  overrides: SpaceSpacecraftOverrides;
  onChange: (next: SpaceSpacecraftOverrides) => void;
  showGuides: boolean;
  onShowGuidesChange: (value: boolean) => void;
};

function defaults(): SpaceSpacecraftOverrides {
  return {
    scale: spaceSpacecraftLayout.scale,
    startX: spaceTracks.spacecraft.startX,
    startY: spaceTracks.spacecraft.startY,
    endX: spaceTracks.spacecraft.endX,
    endY: spaceTracks.spacecraft.endY,
    durationSec: spaceSpacecraftLayout.durationSec,
    engineGlowOpacity: spaceSpacecraftLayout.engineGlowOpacity,
    staticX: spaceSpacecraftLayout.staticX,
    staticY: spaceSpacecraftLayout.staticY,
  };
}

function loadStored(): SpaceSpacecraftOverrides {
  const base = defaults();
  if (typeof window === 'undefined') {
    return base;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as SpaceSpacecraftOverrides;
    return { ...base, ...parsed };
  } catch {
    return base;
  }
}

/**
 * Dev-only Space spacecraft flight-path calibrator.
 */
export function SpaceSceneCalibrator({
  overrides,
  onChange,
  showGuides,
  onShowGuidesChange,
}: SpaceCalibratorProps) {
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

  const set = <K extends keyof SpaceSpacecraftOverrides>(
    key: K,
    value: number,
  ) => {
    onChange({ ...overrides, [key]: value });
  };

  const v = { ...defaults(), ...overrides };

  return (
    <HeroDevPortal>
      <aside className="space-calibrator" data-ready={ready ? 'true' : 'false'}>
        <header className="space-calibrator__header">
          <strong>Space craft</strong>
          <label className="space-calibrator__check">
            <input
              type="checkbox"
              checked={showGuides}
              onChange={(e) => onShowGuidesChange(e.target.checked)}
            />
            Guides
          </label>
          <button
            type="button"
            className="space-calibrator__reset"
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
          Start Y {Math.round(v.startY ?? 0)}
          <input
            type="range"
            min={180}
            max={480}
            step={2}
            value={v.startY}
            onChange={(e) => set('startY', Number(e.target.value))}
          />
        </label>
        <label>
          End Y {Math.round(v.endY ?? 0)}
          <input
            type="range"
            min={140}
            max={440}
            step={2}
            value={v.endY}
            onChange={(e) => set('endY', Number(e.target.value))}
          />
        </label>
        <label>
          Start X {Math.round(v.startX ?? 0)}
          <input
            type="range"
            min={-220}
            max={200}
            step={4}
            value={v.startX}
            onChange={(e) => set('startX', Number(e.target.value))}
          />
        </label>
        <label>
          End X {Math.round(v.endX ?? 0)}
          <input
            type="range"
            min={1900}
            max={2300}
            step={4}
            value={v.endX}
            onChange={(e) => set('endX', Number(e.target.value))}
          />
        </label>
        <label>
          Duration s {v.durationSec?.toFixed(0)}
          <input
            type="range"
            min={16}
            max={36}
            step={1}
            value={v.durationSec}
            onChange={(e) => set('durationSec', Number(e.target.value))}
          />
        </label>
        <label>
          Engine glow {v.engineGlowOpacity?.toFixed(2)}
          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={v.engineGlowOpacity}
            onChange={(e) => set('engineGlowOpacity', Number(e.target.value))}
          />
        </label>

        <p className="space-calibrator__meta">
          Scene {SPACE_SCENE.width}×{SPACE_SCENE.height} · flight{' '}
          {v.durationSec ?? 24}s · endY {Math.round(v.endY ?? 0)}
        </p>
      </aside>
    </HeroDevPortal>
  );
}

export function SpaceTrackGuides({
  startX,
  startY,
  endX,
  endY,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}) {
  const midX = startX + (endX - startX) * 0.5;
  const midY = startY + (endY - startY) * 0.5 - 14;

  return (
    <svg
      className="space-scene__guides"
      viewBox={`0 0 ${SPACE_SCENE.width} ${SPACE_SCENE.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect
        x={0}
        y={0}
        width={SPACE_SCENE.width}
        height={SPACE_SCENE.height}
        fill="none"
        stroke="rgba(255, 80, 80, 0.45)"
        strokeWidth="2"
        strokeDasharray="10 8"
      />
      <path
        d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
        fill="none"
        stroke="rgba(80, 220, 255, 0.8)"
        strokeWidth="2"
      />
      <circle cx={startX} cy={startY} r="6" fill="rgba(80, 220, 255, 0.9)" />
      <circle cx={endX} cy={endY} r="6" fill="rgba(80, 220, 255, 0.9)" />
      <text
        x={24}
        y={startY - 12}
        fill="rgba(80, 220, 255, 0.95)"
        fontSize="22"
      >
        flight y={Math.round(startY)}→{Math.round(endY)}
      </text>
    </svg>
  );
}

export default SpaceSceneCalibrator;
