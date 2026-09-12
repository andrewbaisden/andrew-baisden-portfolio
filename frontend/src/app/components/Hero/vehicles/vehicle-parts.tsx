import type { CSSProperties } from 'react';

export type VehicleTheme = 'light' | 'dark';

export type VehicleProps = {
  className?: string;
  theme?: VehicleTheme;
};

export function vehicleProps(
  name: string,
  className?: string,
  theme: VehicleTheme = 'light',
) {
  return {
    className: ['vehicle-asset', `vehicle-asset--${name}`, className]
      .filter(Boolean)
      .join(' '),
    'data-vehicle-theme': theme,
    'aria-hidden': true,
    focusable: false,
  } as const;
}

export function VehicleWheel({
  id,
  cx,
  cy,
  radius,
}: {
  id: string;
  cx: number;
  cy: number;
  radius: number;
}) {
  return (
    <g id={id} className="vehicle-wheel">
      <circle cx={cx} cy={cy} r={radius} className="vehicle-wheel__tyre" />
      <circle cx={cx} cy={cy} r={radius * 0.56} className="vehicle-wheel__rim" />
      <circle cx={cx} cy={cy} r={radius * 0.2} className="vehicle-wheel__hub" />
      <path
        d={`M ${cx - radius * 0.42} ${cy} H ${cx + radius * 0.42} M ${cx} ${
          cy - radius * 0.42
        } V ${cy + radius * 0.42}`}
        className="vehicle-wheel__spokes"
      />
    </g>
  );
}

export const vehicleStyle = {
  '--vehicle-glass': '#536b7b',
  '--vehicle-glass-highlight': '#91a9b6',
  '--vehicle-trim': '#252b31',
  '--vehicle-tyre': '#171b20',
  '--vehicle-rim': '#7f8991',
  '--vehicle-hub': '#c1c7ca',
  '--vehicle-headlight': '#f2e5b5',
  '--vehicle-tail-light': '#b9292c',
} as CSSProperties;
