'use client';

import Image from 'next/image';
import {
  type CSSProperties,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { useReducedMotion } from '../animations/use-reduced-motion';
import { useSpaceSpacecraftAnimation } from '../animations/use-space-spacecraft-animation';
import {
  SPACE_SCENE,
  type SpaceSpacecraftLayout,
  spacePercentX,
  spacePercentY,
  spaceSpacecraftDisplayWidth,
  spaceSpacecraftLayout,
  spaceTracks,
} from '../scenes/space-tracks';

export type SpaceSpacecraftOverrides = {
  scale?: number;
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  durationSec?: number;
  pauseSec?: number;
  engineGlowOpacity?: number;
  staticX?: number;
  staticY?: number;
};

type SpaceSpacecraftProps = {
  motionEnabled: boolean;
  layout?: SpaceSpacecraftLayout;
  overrides?: SpaceSpacecraftOverrides;
  className?: string;
};

/**
 * Spacecraft — primary Space motion object.
 * Shallow-arc transit with restrained engine glow (no baked PNG glow).
 */
export const SpaceSpacecraft = forwardRef<HTMLDivElement, SpaceSpacecraftProps>(
  function SpaceSpacecraft(
    { motionEnabled, layout = spaceSpacecraftLayout, overrides, className },
    ref,
  ) {
    const localRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => localRef.current as HTMLDivElement);
    const reducedMotion = useReducedMotion();

    const scale = overrides?.scale ?? layout.scale;
    const displayWidth = spaceSpacecraftDisplayWidth(layout, scale);
    const widthPercent = (displayWidth / SPACE_SCENE.width) * 100;
    const startX = overrides?.startX ?? spaceTracks.spacecraft.startX;
    const startY = overrides?.startY ?? spaceTracks.spacecraft.startY;
    const endX = overrides?.endX ?? spaceTracks.spacecraft.endX;
    const endY = overrides?.endY ?? spaceTracks.spacecraft.endY;
    const durationSec = overrides?.durationSec ?? layout.durationSec;
    const pauseSec = overrides?.pauseSec ?? layout.pauseSec;
    const engineGlowOpacity =
      overrides?.engineGlowOpacity ?? layout.engineGlowOpacity;
    const staticX = overrides?.staticX ?? layout.staticX;
    const staticY = overrides?.staticY ?? layout.staticY;
    const animate = motionEnabled && !reducedMotion;

    useSpaceSpacecraftAnimation({
      craftRef: localRef,
      enabled: animate,
      startX,
      startY,
      endX,
      endY,
      scale,
      durationSec,
      pauseSec,
    });

    const style = {
      width: `${widthPercent}%`,
      left: animate ? '0%' : spacePercentX(staticX),
      top: animate ? '0%' : spacePercentY(staticY),
      ['--craft-scale' as string]: String(scale),
      ['--engine-glow' as string]: String(engineGlowOpacity),
      ...(animate
        ? {}
        : {
            transform: `translate(-50%, -50%) scale(${scale})`,
          }),
    } as CSSProperties;

    return (
      <div
        ref={localRef}
        className={[
          'space-spacecraft',
          animate ? 'space-spacecraft--animated' : 'space-spacecraft--static',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
        aria-hidden="true"
        data-vehicle="spacecraft"
        data-display-width={Math.round(displayWidth)}
        data-motion={animate ? 'on' : 'off'}
      >
        <div className="space-spacecraft__engine-glow" />
        <div className="space-spacecraft__nav space-spacecraft__nav--cyan" />
        <div className="space-spacecraft__nav space-spacecraft__nav--amber" />
        <Image
          className="space-spacecraft__image"
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

export default SpaceSpacecraft;
