import type { CSSProperties } from 'react';
import {
  type VehicleProps,
  VehicleWheel,
  vehicleProps,
  vehicleStyle,
} from './vehicle-parts';
import './vehicles.css';

export function CarTwo({ className, theme }: VehicleProps) {
  return (
    <svg
      {...vehicleProps('car-two', className, theme)}
      style={
        {
          ...vehicleStyle,
          '--vehicle-body': '#9d956e',
          '--vehicle-body-dark': '#797354',
        } as CSSProperties
      }
      viewBox="0 0 225 96"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        id="car-two-contact-shadow"
        className="vehicle-contact-shadow"
        cx="113"
        cy="91"
        rx="96"
        ry="3.5"
      />
      <g id="car-two-body">
        <path
          d="M10 55L26 47H47L67 22Q74 14 86 14H151Q163 14 171 23L190 47H207Q216 47 220 58L223 67V78Q223 83 216 83H10Q4 83 4 77V64Q4 59 10 55Z"
          fill="var(--vehicle-body)"
        />
        <path
          d="M4 68H223V78Q223 83 216 83H10Q4 83 4 77Z"
          fill="var(--vehicle-body-dark)"
        />
        <path
          d="M40 83A18 18 0 0 1 76 83M163 83A18 18 0 0 1 199 83"
          fill="none"
          stroke="var(--vehicle-body-dark)"
          strokeWidth="6"
        />
        <path
          className="vehicle-outline"
          d="M10 55L26 47H47L67 22Q74 14 86 14H151Q163 14 171 23L190 47H207Q216 47 220 58L223 67V78Q223 83 216 83H10Q4 83 4 77V64Q4 59 10 55Z"
        />
      </g>
      <g id="car-two-windows">
        <path d="M73 24Q78 19 87 19H111V45H53Z" className="vehicle-glass" />
        <path
          d="M117 19H149Q158 19 165 27L180 45H117Z"
          className="vehicle-glass"
        />
        <path d="M79 22H107L91 27H73Z" className="vehicle-glass-highlight" />
        <rect
          id="car-two-interior-light"
          x="57"
          y="21"
          width="120"
          height="25"
          className="vehicle-interior-light"
        />
      </g>
      <g id="car-two-trim">
        <rect
          x="111"
          y="48"
          width="4"
          height="29"
          rx="2"
          className="vehicle-trim"
          opacity="0.62"
        />
        <rect x="136" y="53" width="17" height="2.5" rx="1.25" fill="#c3b98a" />
        <rect
          x="4"
          y="74"
          width="219"
          height="5"
          className="vehicle-trim"
          opacity="0.5"
        />
      </g>
      <g id="car-two-wheels">
        <VehicleWheel id="car-two-wheel-rear" cx={58} cy={78} radius={16} />
        <VehicleWheel id="car-two-wheel-front" cx={181} cy={78} radius={16} />
      </g>
      <g id="car-two-headlights">
        <path d="M215 54H222L224 62H216Z" className="vehicle-headlight" />
        <ellipse
          cx="225"
          cy="59"
          rx="10"
          ry="6"
          className="vehicle-light-glow"
        />
      </g>
      <g id="car-two-tail-lights">
        <rect
          x="4"
          y="56"
          width="6"
          height="10"
          rx="2"
          className="vehicle-tail-light"
        />
      </g>
    </svg>
  );
}

export default CarTwo;
