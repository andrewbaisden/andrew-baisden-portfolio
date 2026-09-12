import type { CSSProperties } from 'react';
import { VehicleWheel, vehicleProps, vehicleStyle, type VehicleProps } from './vehicle-parts';
import './vehicles.css';

export function CarOne({ className, theme }: VehicleProps) {
  return (
    <svg
      {...vehicleProps('car-one', className, theme)}
      style={{
        ...vehicleStyle,
        '--vehicle-body': '#397f8a',
        '--vehicle-body-dark': '#2f6570',
      } as CSSProperties}
      viewBox="0 0 210 90"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse id="car-one-contact-shadow" className="vehicle-contact-shadow" cx="106" cy="85" rx="88" ry="3.5" />
      <g id="car-one-body">
        <path
          d="M9 51L31 43H48L69 18Q75 11 87 11H133Q145 11 153 19L176 43H190Q200 43 205 53L208 62V72Q208 78 201 78H9Q3 78 3 72V60Q3 55 9 51Z"
          fill="var(--vehicle-body)"
        />
        <path d="M3 62H208V72Q208 78 201 78H9Q3 78 3 72Z" fill="var(--vehicle-body-dark)" />
        <path d="M38 78A17 17 0 0 1 72 78M154 78A17 17 0 0 1 188 78" fill="none" stroke="var(--vehicle-body-dark)" strokeWidth="6" />
        <path className="vehicle-outline" d="M9 51L31 43H48L69 18Q75 11 87 11H133Q145 11 153 19L176 43H190Q200 43 205 53L208 62V72Q208 78 201 78H9Q3 78 3 72V60Q3 55 9 51Z" />
      </g>
      <g id="car-one-windows">
        <path d="M74 20Q78 16 88 16H104V41H53Z" className="vehicle-glass" />
        <path d="M110 16H132Q141 16 147 23L165 41H110Z" className="vehicle-glass" />
        <path d="M79 19H101L87 23H74Z" className="vehicle-glass-highlight" />
        <rect id="car-one-interior-light" x="57" y="18" width="105" height="24" className="vehicle-interior-light" />
      </g>
      <g id="car-one-trim">
        <rect x="104" y="44" width="4" height="27" rx="2" className="vehicle-trim" opacity="0.65" />
        <rect x="124" y="49" width="16" height="2.5" rx="1.25" fill="#7ca1a7" />
      </g>
      <g id="car-one-wheels">
        <VehicleWheel id="car-one-wheel-rear" cx={55} cy={72} radius={15} />
        <VehicleWheel id="car-one-wheel-front" cx={171} cy={72} radius={15} />
      </g>
      <g id="car-one-headlights">
        <path d="M200 50H207L209 58H201Z" className="vehicle-headlight" />
        <ellipse cx="209" cy="55" rx="10" ry="6" className="vehicle-light-glow" />
      </g>
      <g id="car-one-tail-lights">
        <rect x="3" y="53" width="6" height="9" rx="2" className="vehicle-tail-light" />
      </g>
    </svg>
  );
}

export default CarOne;
