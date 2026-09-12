'use client';

import Image from 'next/image';
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type CSSProperties,
} from 'react';
import { useBeachSailboatAnimation } from '../animations/use-beach-sailboat-animation';
import { useReducedMotion } from '../animations/use-reduced-motion';
import {
  BEACH_SCENE,
  beachPercentY,
  beachSailboatDisplayWidth,
  beachSailboatLayout,
  beachTracks,
  type BeachSailboatLayout,
} from '../scenes/beach-tracks';

export type BeachSailboatOverrides = {
  scale?: number;
  y?: number;
  startX?: number;
  endX?: number;
  durationSec?: number;
  wakeOpacity?: number;
  oceanOpacity?: number;
  staticX?: number;
};

type BeachSailboatProps = {
  motionEnabled: boolean;
  layout?: BeachSailboatLayout;
  overrides?: BeachSailboatOverrides;
  className?: string;
};

/**
 * Distant sailboat — primary Beach motion object.
 * Continuous L→R / flip / R→L loop via WAAPI (same pattern as Mountain yacht).
 */
export const BeachSailboat = forwardRef<HTMLDivElement, BeachSailboatProps>(
  function BeachSailboat(
    {
      motionEnabled,
      layout = beachSailboatLayout,
      overrides,
      className,
    },
    ref,
  ) {
    const localRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => localRef.current as HTMLDivElement);
    const reducedMotion = useReducedMotion();

    const scale = overrides?.scale ?? layout.scale;
    const displayWidth = beachSailboatDisplayWidth(layout, scale);
    const widthPercent = (displayWidth / BEACH_SCENE.width) * 100;
    const baselineY =
      (overrides?.y ?? beachTracks.sailboat.y) + (layout.baselineOffset ?? 0);
    const startX = overrides?.startX ?? beachTracks.sailboat.startX;
    const endX = overrides?.endX ?? beachTracks.sailboat.endX;
    const durationSec = overrides?.durationSec ?? layout.durationSec;
    const wakeOpacity = overrides?.wakeOpacity ?? layout.wakeOpacity;
    const staticX = overrides?.staticX ?? layout.staticX;
    const animate = motionEnabled && !reducedMotion;

    useBeachSailboatAnimation({
      sailboatRef: localRef,
      enabled: animate,
      startX,
      endX,
      scale,
      durationSec,
    });

    const style = {
      top: beachPercentY(baselineY),
      width: `${widthPercent}%`,
      left: animate
        ? '0%'
        : `${(staticX / BEACH_SCENE.width) * 100}%`,
      ['--sailboat-scale' as string]: String(scale),
      ['--wake-opacity' as string]: String(wakeOpacity),
      ...(animate
        ? {}
        : {
            transform: `translate(-50%, -100%) scale(${scale})`,
          }),
    } as CSSProperties;

    return (
      <div
        ref={localRef}
        className={[
          'beach-sailboat',
          animate ? 'beach-sailboat--animated' : 'beach-sailboat--static',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
        aria-hidden="true"
        data-vehicle="sailboat"
        data-baseline={baselineY}
        data-display-width={Math.round(displayWidth)}
        data-motion={animate ? 'on' : 'off'}
      >
        {animate ? <div className="beach-sailboat__wake" /> : null}
        <div className="beach-sailboat__nav-light" />
        <Image
          className="beach-sailboat__image"
          src={layout.src}
          alt=""
          width={layout.intrinsicWidth}
          height={layout.intrinsicHeight}
          sizes={`${Math.ceil(displayWidth * 1.25)}px`}
          quality={90}
          draggable={false}
          unoptimized
          loading="lazy"
          fetchPriority="low"
        />
      </div>
    );
  },
);

export default BeachSailboat;
