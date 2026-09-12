'use client';

import { useEffect, useMemo, useState } from 'react';
import { HeroDevPortal } from '../dev/hero-dev-portal';
import {
  LONDON_TRANSPORT_CYCLE_SEC,
  resolveAllTransportPaths,
} from '../animations/london-transport-config';
import type { AmbientDebugFlags } from './london-environment';
import {
  LONDON_SCENE,
  londonTracks,
  londonTubeCorridor,
  londonVehicleLayout,
  vehicleDisplayWidth,
  type LondonVehicleId,
  type LondonVehicleLayout,
} from './london-tracks';

export type CalibrationVehicleValues = {
  x: number;
  scale: number;
  baselineOffset: number;
};

export type CalibrationOverrides = Partial<
  Record<LondonVehicleId, CalibrationVehicleValues>
>;

export type TrafficDebugControls = {
  pause: boolean;
  playbackRate: number;
  showPaths: boolean;
};

type LondonSceneCalibratorProps = {
  onChange: (overrides: CalibrationOverrides) => void;
  showGuides: boolean;
  onShowGuidesChange: (value: boolean) => void;
  traffic: TrafficDebugControls;
  onTrafficChange: (next: TrafficDebugControls) => void;
  reducedMotion: boolean;
  ambient: AmbientDebugFlags;
  onAmbientChange: (next: AmbientDebugFlags) => void;
  showLightAnchors: boolean;
  onShowLightAnchorsChange: (value: boolean) => void;
};

const VEHICLE_IDS = Object.keys(londonVehicleLayout) as LondonVehicleId[];
const STORAGE_KEY = 'london-vehicle-calibration-v5';
const SCALE_MIN = 0.25;
const SCALE_MAX = 5;
const SPEED_OPTIONS = [0.25, 0.5, 1, 2] as const;

function defaults(): Record<LondonVehicleId, CalibrationVehicleValues> {
  return Object.fromEntries(
    VEHICLE_IDS.map((id) => {
      const v = londonVehicleLayout[id];
      return [
        id,
        {
          x: v.x,
          scale: v.scale,
          baselineOffset: v.baselineOffset ?? 0,
        },
      ];
    }),
  ) as Record<LondonVehicleId, CalibrationVehicleValues>;
}

function loadStored(): Record<LondonVehicleId, CalibrationVehicleValues> {
  const base = defaults();
  if (typeof window === 'undefined') {
    return base;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return base;
    }
    const parsed = JSON.parse(raw) as CalibrationOverrides;
    for (const id of VEHICLE_IDS) {
      const stored = parsed[id];
      if (!stored) {
        continue;
      }
      base[id] = {
        x: Number.isFinite(stored.x) ? stored.x : base[id].x,
        scale: Number.isFinite(stored.scale)
          ? Math.min(SCALE_MAX, Math.max(SCALE_MIN, stored.scale))
          : base[id].scale,
        baselineOffset: Number.isFinite(stored.baselineOffset)
          ? stored.baselineOffset
          : base[id].baselineOffset,
      };
    }
  } catch {
    // Ignore corrupt storage
  }

  return base;
}

/**
 * Permanent development-only calibration + traffic debug panel.
 * Never rendered in production builds.
 */
export function LondonSceneCalibrator({
  onChange,
  showGuides,
  onShowGuidesChange,
  traffic,
  onTrafficChange,
  reducedMotion,
  ambient,
  onAmbientChange,
  showLightAnchors,
  onShowLightAnchorsChange,
}: LondonSceneCalibratorProps) {
  const [values, setValues] =
    useState<Record<LondonVehicleId, CalibrationVehicleValues>>(defaults);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValues(loadStored());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    onChange(values);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      // ignore
    }
  }, [values, onChange, hydrated]);

  const summary = useMemo(
    () =>
      VEHICLE_IDS.map((id) => {
        const v = values[id];
        const layout = londonVehicleLayout[id];
        const track = layout.track;
        const display = vehicleDisplayWidth(layout, v.scale);
        return `${id}: scale=${v.scale.toFixed(2)} w≈${Math.round(display)} y=${londonTracks[track].y + v.baselineOffset}`;
      }).join(' · '),
    [values],
  );

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <HeroDevPortal>
      <aside className="london-scene-calibrator">
        <button
          type="button"
          className="london-scene-calibrator__toggle"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Hide' : 'Show'} London vehicle calibration
        </button>

        {open ? (
          <div className="london-scene-calibrator__panel">
            <p className="london-scene-calibrator__hint">
              Dev-only · cycle {LONDON_TRANSPORT_CYCLE_SEC}s · scale {SCALE_MIN}–
              {SCALE_MAX}.
              {reducedMotion ? ' Reduced motion: static composition.' : ''}
            </p>

          <fieldset className="london-scene-calibrator__group">
            <legend>Traffic debug</legend>
            <label className="london-scene-calibrator__row">
              <input
                type="checkbox"
                checked={traffic.pause}
                onChange={(e) =>
                  onTrafficChange({ ...traffic, pause: e.target.checked })
                }
              />
              Pause traffic
            </label>
            <label className="london-scene-calibrator__row">
              <input
                type="checkbox"
                checked={traffic.showPaths}
                onChange={(e) =>
                  onTrafficChange({ ...traffic, showPaths: e.target.checked })
                }
              />
              Show paths / spawn bounds
            </label>
            <label className="london-scene-calibrator__row">
              <input
                type="checkbox"
                checked={showGuides}
                onChange={(e) => onShowGuidesChange(e.target.checked)}
              />
              Show lane baselines
            </label>
            <div className="london-scene-calibrator__speeds">
              <span>Speed</span>
              {SPEED_OPTIONS.map((rate) => (
                <button
                  key={rate}
                  type="button"
                  className={
                    traffic.playbackRate === rate
                      ? 'london-scene-calibrator__speed london-scene-calibrator__speed--active'
                      : 'london-scene-calibrator__speed'
                  }
                  onClick={() =>
                    onTrafficChange({ ...traffic, playbackRate: rate })
                  }
                >
                  {rate}×
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="london-scene-calibrator__group">
            <legend>Ambient / night polish</legend>
            <label className="london-scene-calibrator__row">
              <input
                type="checkbox"
                checked={ambient.showNightLighting}
                onChange={(e) =>
                  onAmbientChange({
                    ...ambient,
                    showNightLighting: e.target.checked,
                  })
                }
              />
              Force night lighting
            </label>
            <label className="london-scene-calibrator__row">
              <input
                type="checkbox"
                checked={showLightAnchors}
                onChange={(e) => onShowLightAnchorsChange(e.target.checked)}
              />
              Show vehicle light anchors
            </label>
            <label className="london-scene-calibrator__row">
              <input
                type="checkbox"
                checked={ambient.showLampGlow}
                onChange={(e) =>
                  onAmbientChange({
                    ...ambient,
                    showLampGlow: e.target.checked,
                  })
                }
              />
              Show lamp glow
            </label>
            <label className="london-scene-calibrator__row">
              <input
                type="checkbox"
                checked={ambient.showClouds}
                onChange={(e) =>
                  onAmbientChange({ ...ambient, showClouds: e.target.checked })
                }
              />
              Show cloud layers
            </label>
            <label className="london-scene-calibrator__row">
              <input
                type="checkbox"
                checked={ambient.showWater}
                onChange={(e) =>
                  onAmbientChange({ ...ambient, showWater: e.target.checked })
                }
              />
              Show water overlays
            </label>
            <label className="london-scene-calibrator__row">
              <input
                type="checkbox"
                checked={ambient.showBirds}
                onChange={(e) =>
                  onAmbientChange({ ...ambient, showBirds: e.target.checked })
                }
              />
              Show bird path
            </label>
            <label className="london-scene-calibrator__row">
              <input
                type="checkbox"
                checked={ambient.showFoliage}
                onChange={(e) =>
                  onAmbientChange({ ...ambient, showFoliage: e.target.checked })
                }
              />
              Show foliage overlay
            </label>
            <label className="london-scene-calibrator__row">
              <input
                type="checkbox"
                checked={ambient.pauseAmbient}
                onChange={(e) =>
                  onAmbientChange({
                    ...ambient,
                    pauseAmbient: e.target.checked,
                  })
                }
              />
              Pause all ambient motion
            </label>
            <div className="london-scene-calibrator__speeds">
              <span>Ambient</span>
              {SPEED_OPTIONS.map((rate) => (
                <button
                  key={`ambient-${rate}`}
                  type="button"
                  className={
                    ambient.playbackRate === rate
                      ? 'london-scene-calibrator__speed london-scene-calibrator__speed--active'
                      : 'london-scene-calibrator__speed'
                  }
                  onClick={() =>
                    onAmbientChange({ ...ambient, playbackRate: rate })
                  }
                >
                  {rate}×
                </button>
              ))}
            </div>
          </fieldset>

          {VEHICLE_IDS.map((id) => {
            const v = values[id];
            const layout = londonVehicleLayout[id];
            const track = layout.track;
            const display = vehicleDisplayWidth(layout, v.scale);
            return (
              <fieldset key={id} className="london-scene-calibrator__group">
                <legend>
                  {id} · {track} · w≈{Math.round(display)}
                </legend>
                <label>
                  X
                  <input
                    type="range"
                    min={-Math.round(LONDON_SCENE.width)}
                    max={LONDON_SCENE.width * 2}
                    step={2}
                    value={v.x}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [id]: { ...prev[id], x: Number(e.target.value) },
                      }))
                    }
                  />
                  <span>{v.x}</span>
                </label>
                <label>
                  Scale
                  <input
                    type="range"
                    min={SCALE_MIN}
                    max={SCALE_MAX}
                    step={0.05}
                    value={v.scale}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [id]: { ...prev[id], scale: Number(e.target.value) },
                      }))
                    }
                  />
                  <span>{v.scale.toFixed(2)}</span>
                </label>
                <label>
                  Y offset
                  <input
                    type="range"
                    min={-80}
                    max={80}
                    step={1}
                    value={v.baselineOffset}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [id]: {
                          ...prev[id],
                          baselineOffset: Number(e.target.value),
                        },
                      }))
                    }
                  />
                  <span>{v.baselineOffset}</span>
                </label>
              </fieldset>
            );
          })}

          <button
            type="button"
            className="london-scene-calibrator__reset"
            onClick={() => {
              const next = defaults();
              setValues(next);
              try {
                window.localStorage.removeItem(STORAGE_KEY);
              } catch {
                // ignore
              }
            }}
          >
            Reset to code defaults
          </button>

          <p className="london-scene-calibrator__summary">{summary}</p>
        </div>
      ) : null}
      </aside>
    </HeroDevPortal>
  );
}

type LondonTrackGuidesProps = {
  showBaselines?: boolean;
  showPaths?: boolean;
  layouts?: Record<LondonVehicleId, LondonVehicleLayout>;
};

export function LondonTrackGuides({
  showBaselines = true,
  showPaths = false,
  layouts = londonVehicleLayout,
}: LondonTrackGuidesProps) {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const paths = showPaths ? resolveAllTransportPaths(layouts) : [];

  return (
    <div className="london-scene__guides" aria-hidden="true">
      {showBaselines
        ? (
            Object.entries(londonTracks) as [
              keyof typeof londonTracks,
              (typeof londonTracks)[keyof typeof londonTracks],
            ][]
          ).map(([id, track]) => (
            <div
              key={id}
              className={`london-scene__guide london-scene__guide--${id}`}
              style={{ top: `${(track.y / LONDON_SCENE.height) * 100}%` }}
              data-label={id}
            />
          ))
        : null}

      {showPaths
        ? paths.map((path) => {
            const track = layouts[path.id].track;
            const y =
              londonTracks[track].y + (layouts[path.id].baselineOffset ?? 0);
            const left = Math.min(path.startX, path.endX);
            const right = Math.max(path.startX, path.endX);
            return (
              <div
                key={`path-${path.id}`}
                className={`london-scene__path london-scene__path--${path.id}`}
                style={{
                  top: `${(y / LONDON_SCENE.height) * 100}%`,
                  left: `${(left / LONDON_SCENE.width) * 100}%`,
                  width: `${((right - left) / LONDON_SCENE.width) * 100}%`,
                }}
                data-label={`${path.id} ${path.direction.toUpperCase()} · ${path.durationSec}s`}
              >
                <span className="london-scene__path-spawn">SPAWN</span>
                <span className="london-scene__path-despawn">DESPAWN</span>
              </div>
            );
          })
        : null}

      {showBaselines || showPaths ? (
        <div
          className="london-scene__guide london-scene__guide--tube-corridor"
          style={{
            top: `${(londonTubeCorridor.top / LONDON_SCENE.height) * 100}%`,
            left: `${(londonTubeCorridor.left / LONDON_SCENE.width) * 100}%`,
            width: `${((londonTubeCorridor.right - londonTubeCorridor.left) / LONDON_SCENE.width) * 100}%`,
            height: `${((londonTubeCorridor.bottom - londonTubeCorridor.top) / LONDON_SCENE.height) * 100}%`,
          }}
          data-label="Tube corridor (full scene width)"
        />
      ) : null}

      {showBaselines || showPaths ? (
        <div
          className="london-scene__guide london-scene__guide--scene-bounds"
          data-label="scene bounds"
        />
      ) : null}
    </div>
  );
}

export default LondonSceneCalibrator;
