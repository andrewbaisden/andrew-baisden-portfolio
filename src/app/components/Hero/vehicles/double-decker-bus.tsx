import type { CSSProperties } from 'react';
import {
  type VehicleProps,
  VehicleWheel,
  vehicleProps,
  vehicleStyle,
} from './vehicle-parts';
import './vehicles.css';

export function DoubleDeckerBus({ className, theme }: VehicleProps) {
  return (
    <svg
      {...vehicleProps('double-decker-bus', className, theme)}
      style={
        {
          ...vehicleStyle,
          '--vehicle-body': '#c93d3d',
          '--vehicle-body-dark': '#a72f32',
        } as CSSProperties
      }
      viewBox="0 0 420 160"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        id="bus-contact-shadow"
        className="vehicle-contact-shadow"
        cx="211"
        cy="151"
        rx="186"
        ry="5"
      />

      <g id="bus-body">
        <path
          d="M18 27Q18 10 35 10H349Q377 10 393 31L410 55V128Q410 139 398 139H22Q10 139 10 127V38Q10 27 18 27Z"
          fill="var(--vehicle-body)"
        />
        <path
          d="M10 96H410V128Q410 139 398 139H22Q10 139 10 127Z"
          fill="var(--vehicle-body-dark)"
        />
        <rect
          x="10"
          y="79"
          width="400"
          height="6"
          fill="#eee7d9"
          opacity="0.9"
        />
        <rect
          x="21"
          y="23"
          width="337"
          height="3"
          rx="1.5"
          fill="#e46b64"
          opacity="0.68"
        />
        <path d="M359 10Q381 15 393 31L410 55H374Z" fill="#b53537" />
        <path
          d="M10 119H410V128Q410 139 398 139H22Q10 139 10 127Z"
          className="vehicle-trim"
          opacity="0.8"
        />
        <path
          d="M63 139A24 24 0 0 1 111 139M315 139A24 24 0 0 1 363 139"
          fill="none"
          stroke="#8f292d"
          strokeWidth="7"
        />
        <path
          className="vehicle-outline"
          d="M18 27Q18 10 35 10H349Q377 10 393 31L410 55V128Q410 139 398 139H22Q10 139 10 127V38Q10 27 18 27Z"
        />
      </g>

      <g id="bus-windows">
        <g id="bus-upper-windows">
          {[35, 82, 129, 176, 223, 270, 317].map((x) => (
            <g key={x}>
              <rect
                x={x}
                y="31"
                width="39"
                height="36"
                rx="3"
                className="vehicle-glass"
              />
              <path
                d={`M${x + 4} 34H${x + 35}L${x + 24} 39H${x + 4}Z`}
                className="vehicle-glass-highlight"
              />
            </g>
          ))}
          <path
            d="M364 31H383Q395 40 402 54V67H364Z"
            className="vehicle-glass"
          />
        </g>
        <g id="bus-lower-windows">
          {[35, 82, 129, 176, 223, 270].map((x) => (
            <rect
              key={x}
              x={x}
              y="89"
              width="39"
              height="26"
              rx="2.5"
              className="vehicle-glass"
            />
          ))}
          <path d="M317 89H351V115H317Z" className="vehicle-glass" />
          <path d="M356 89H397V115H356Z" className="vehicle-glass" />
        </g>
        <rect
          id="bus-interior-light"
          x="29"
          y="29"
          width="370"
          height="88"
          className="vehicle-interior-light"
        />
      </g>

      <g id="bus-doors">
        <rect
          x="274"
          y="87"
          width="37"
          height="49"
          rx="2"
          fill="#a82e31"
          stroke="#e07069"
          strokeWidth="1.5"
        />
        <line
          x1="292.5"
          y1="88"
          x2="292.5"
          y2="135"
          stroke="#e07069"
          strokeWidth="1.5"
        />
        <rect
          x="278"
          y="92"
          width="11"
          height="21"
          rx="1"
          className="vehicle-glass"
        />
        <rect
          x="296"
          y="92"
          width="11"
          height="21"
          rx="1"
          className="vehicle-glass"
        />
      </g>

      <g id="bus-destination-panel">
        <rect x="367" y="18" width="30" height="11" rx="2" fill="#282d32" />
        <rect
          x="371"
          y="21"
          width="20"
          height="2"
          rx="1"
          fill="#c9d0d2"
          opacity="0.55"
        />
      </g>

      <g id="bus-wheels">
        <VehicleWheel id="bus-wheel-rear" cx={87} cy={134} radius={20} />
        <VehicleWheel id="bus-wheel-front" cx={339} cy={134} radius={20} />
      </g>

      <g id="bus-headlights">
        <rect
          x="405"
          y="102"
          width="7"
          height="11"
          rx="2"
          className="vehicle-headlight"
        />
        <ellipse
          cx="412"
          cy="107.5"
          rx="13"
          ry="8"
          className="vehicle-light-glow"
        />
      </g>
      <g id="bus-tail-lights">
        <rect
          x="7"
          y="103"
          width="6"
          height="11"
          rx="2"
          className="vehicle-tail-light"
        />
      </g>
    </svg>
  );
}

export default DoubleDeckerBus;
