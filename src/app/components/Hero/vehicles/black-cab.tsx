import type { CSSProperties } from 'react';
import {
  type VehicleProps,
  VehicleWheel,
  vehicleProps,
  vehicleStyle,
} from './vehicle-parts';
import './vehicles.css';

export function BlackCab({ className, theme }: VehicleProps) {
  return (
    <svg
      {...vehicleProps('black-cab', className, theme)}
      style={
        {
          ...vehicleStyle,
          '--vehicle-body': '#2c3238',
          '--vehicle-body-highlight': '#424b53',
        } as CSSProperties
      }
      viewBox="0 0 240 110"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        id="cab-contact-shadow"
        className="vehicle-contact-shadow"
        cx="121"
        cy="104"
        rx="104"
        ry="4"
      />

      <g id="cab-body">
        <path
          d="M12 61L28 50H52L69 20Q75 10 88 10H145Q158 10 166 20L188 50H213Q224 50 231 61L236 72V88Q236 96 228 96H12Q5 96 5 89V70Q5 65 12 61Z"
          fill="var(--vehicle-body)"
        />
        <path
          d="M18 61H225Q232 66 236 75V88H5V70Q5 65 12 61Z"
          fill="var(--vehicle-body-highlight)"
          opacity="0.58"
        />
        <rect x="82" y="5" width="39" height="7" rx="3.5" fill="#d7c266" />
        <path
          d="M47 96A21 21 0 0 1 89 96M171 96A21 21 0 0 1 213 96"
          fill="none"
          stroke="#24292e"
          strokeWidth="7"
        />
        <path
          className="vehicle-outline"
          d="M12 61L28 50H52L69 20Q75 10 88 10H145Q158 10 166 20L188 50H213Q224 50 231 61L236 72V88Q236 96 228 96H12Q5 96 5 89V70Q5 65 12 61Z"
        />
      </g>

      <g id="cab-windows">
        <path d="M75 22Q78 17 88 17H109V48H60Z" className="vehicle-glass" />
        <path
          d="M115 17H144Q151 17 157 26L175 48H115Z"
          className="vehicle-glass"
        />
        <path d="M81 21H105L91 26H77Z" className="vehicle-glass-highlight" />
        <rect
          id="cab-interior-light"
          x="64"
          y="20"
          width="107"
          height="29"
          className="vehicle-interior-light"
        />
      </g>

      <g id="cab-trim">
        <rect
          x="104"
          y="52"
          width="5"
          height="35"
          rx="2"
          className="vehicle-trim"
          opacity="0.75"
        />
        <rect
          x="113"
          y="52"
          width="5"
          height="35"
          rx="2"
          className="vehicle-trim"
          opacity="0.75"
        />
        <rect x="128" y="58" width="18" height="3" rx="1.5" fill="#7d858a" />
        <rect
          x="5"
          y="82"
          width="231"
          height="8"
          className="vehicle-trim"
          opacity="0.8"
        />
      </g>

      <g id="cab-wheels">
        <VehicleWheel id="cab-wheel-rear" cx={68} cy={88} radius={18} />
        <VehicleWheel id="cab-wheel-front" cx={192} cy={88} radius={18} />
      </g>

      <g id="cab-headlights">
        <path d="M229 65H237V75H232Z" className="vehicle-headlight" />
        <ellipse
          cx="238"
          cy="70"
          rx="11"
          ry="7"
          className="vehicle-light-glow"
        />
      </g>
      <g id="cab-tail-lights">
        <rect
          x="5"
          y="67"
          width="6"
          height="10"
          rx="2"
          className="vehicle-tail-light"
        />
      </g>
    </svg>
  );
}

export default BlackCab;
