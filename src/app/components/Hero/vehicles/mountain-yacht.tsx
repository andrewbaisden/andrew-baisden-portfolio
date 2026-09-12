'use client';

import Image from 'next/image';
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type CSSProperties,
} from 'react';
import { useMountainYachtAnimation } from '../animations/use-mountain-yacht-animation';
import { useReducedMotion } from '../animations/use-reduced-motion';
import {
  MOUNTAIN_SCENE,
  mountainLakeTrack,
  mountainPercentY,
  mountainYachtDisplayWidth,
  mountainYachtLayout,
  type MountainYachtLayout,
} from '../scenes/mountain-tracks';

export type MountainYachtOverrides = {
  scale?: number;
  y?: number;
  startX?: number;
  endX?: number;
  durationSec?: number;
  wakeOpacity?: number;
  staticX?: number;
};

type MountainYachtProps = {
  motionEnabled: boolean;
  layout?: MountainYachtLayout;
  overrides?: MountainYachtOverrides;
  className?: string;
};

/**
 * Lake yacht — primary Mountain motion object.
 * Continuous L→R / flip / R→L loop via WAAPI translate3d.
 */
export const MountainYacht = forwardRef<HTMLDivElement, MountainYachtProps>(
  function MountainYacht(
    {
      motionEnabled,
      layout = mountainYachtLayout,
      overrides,
      className,
    },
    ref,
  ) {
    const localRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => localRef.current as HTMLDivElement);
    const reducedMotion = useReducedMotion();

    const scale = overrides?.scale ?? layout.scale;
    const displayWidth = mountainYachtDisplayWidth(layout, scale);
    const widthPercent = (displayWidth / MOUNTAIN_SCENE.width) * 100;
    const baselineY =
      (overrides?.y ?? mountainLakeTrack.y) + (layout.baselineOffset ?? 0);
    const startX = overrides?.startX ?? mountainLakeTrack.startX;
    const endX = overrides?.endX ?? mountainLakeTrack.endX;
    const durationSec = overrides?.durationSec ?? layout.durationSec;
    const wakeOpacity = overrides?.wakeOpacity ?? layout.wakeOpacity;
    const staticX = overrides?.staticX ?? layout.staticX;
    const animate = motionEnabled && !reducedMotion;

    useMountainYachtAnimation({
      yachtRef: localRef,
      enabled: animate,
      startX,
      endX,
      scale,
      durationSec,
    });

    const style = {
      top: mountainPercentY(baselineY),
      width: `${widthPercent}%`,
      left: animate
        ? '0%'
        : `${(staticX / MOUNTAIN_SCENE.width) * 100}%`,
      ['--yacht-scale' as string]: String(scale),
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
          'mountain-yacht',
          animate ? 'mountain-yacht--animated' : 'mountain-yacht--static',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
        aria-hidden="true"
        data-vehicle="yacht"
        data-baseline={baselineY}
        data-display-width={Math.round(displayWidth)}
        data-motion={animate ? 'on' : 'off'}
      >
        {animate ? <div className="mountain-yacht__wake" /> : null}
        <Image
          className="mountain-yacht__reflection"
          src={layout.src}
          alt=""
          width={layout.intrinsicWidth}
          height={layout.intrinsicHeight}
          sizes={`${Math.ceil(displayWidth * 1.25)}px`}
          quality={80}
          draggable={false}
          unoptimized
          loading="lazy"
          fetchPriority="low"
        />
        <Image
          className="mountain-yacht__image"
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

export default MountainYacht;
