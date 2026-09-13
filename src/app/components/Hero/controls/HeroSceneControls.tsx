'use client';

import { useHeroScenePreferences } from '../hooks/use-hero-scene-preferences';
import type { HeroSceneId } from '../scenes/hero-scene-types';
import './hero-scene-controls.css';

/**
 * Compact scene selector + ambient motion toggle.
 * Visually secondary to hero copy and CTAs.
 */
export function HeroSceneControls() {
  const {
    scene,
    setScene,
    motionEnabled,
    setMotionEnabled,
    enabledScenes,
    prefsReady,
  } = useHeroScenePreferences();

  return (
    <div
      className="hero-scene-controls"
      role="group"
      aria-label="Hero scene"
      data-prefs-ready={prefsReady ? 'true' : 'false'}
    >
      <div
        className="hero-scene-controls__scenes"
        role="group"
        aria-label="Choose scene"
      >
        {enabledScenes.map((entry) => {
          const pressed = scene === entry.id;
          return (
            <button
              key={entry.id}
              type="button"
              className={[
                'hero-scene-controls__scene',
                pressed ? 'is-active' : null,
              ]
                .filter(Boolean)
                .join(' ')}
              aria-pressed={pressed}
              aria-label={`${entry.label} scene`}
              onClick={() => setScene(entry.id as HeroSceneId)}
            >
              <span className="hero-scene-controls__dot" aria-hidden="true" />
              <span className="hero-scene-controls__label">{entry.label}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={[
          'hero-scene-controls__motion',
          motionEnabled ? 'is-on' : 'is-off',
        ].join(' ')}
        aria-pressed={motionEnabled}
        aria-label={motionEnabled ? 'Ambient motion on' : 'Ambient motion off'}
        title={
          motionEnabled ? 'Turn ambient motion off' : 'Turn ambient motion on'
        }
        onClick={() => setMotionEnabled(!motionEnabled)}
      >
        <span className="hero-scene-controls__motion-label">Motion</span>
        <span className="hero-scene-controls__motion-pill" aria-hidden="true">
          <span className="hero-scene-controls__motion-knob" />
        </span>
      </button>
    </div>
  );
}

export default HeroSceneControls;
