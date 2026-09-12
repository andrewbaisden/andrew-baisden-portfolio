import type { CSSProperties } from 'react';
import { VehicleWheel, vehicleProps, vehicleStyle, type VehicleProps } from './vehicle-parts';
import './vehicles.css';

export function DeliveryVan({ className, theme }: VehicleProps) {
  return (
    <svg
      {...vehicleProps('delivery-van', className, theme)}
      style={{
        ...vehicleStyle,
        '--vehicle-body': '#e5e2da',
        '--vehicle-body-dark': '#b7bdc0',
      } as CSSProperties}
      viewBox="0 0 250 112"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse id="van-contact-shadow" className="vehicle-contact-shadow" cx="126" cy="106" rx="108" ry="4" />
      <g id="van-body">
        <path
          d="M12 24Q12 14 23 14H157Q166 14 171 22L193 51H222Q233 51 241 63L247 73V91Q247 98 239 98H11Q4 98 4 91V31Q4 24 12 24Z"
          fill="var(--vehicle-body)"
        />
        <path d="M4 82H247V91Q247 98 239 98H11Q4 98 4 91Z" fill="var(--vehicle-body-dark)" />
        <path d="M35 98A20 20 0 0 1 75 98M184 98A20 20 0 0 1 224 98" fill="none" stroke="#a9afb2" strokeWidth="7" />
        <path className="vehicle-outline" d="M12 24Q12 14 23 14H157Q166 14 171 22L193 51H222Q233 51 241 63L247 73V91Q247 98 239 98H11Q4 98 4 91V31Q4 24 12 24Z" />
      </g>
      <g id="van-windows">
        <path d="M169 27L188 52H161V25H163Q167 25 169 27Z" className="vehicle-glass" />
        <path d="M194 56H225Q233 56 239 68H194Z" className="vehicle-glass" />
        <path d="M166 29H169L184 49H178Z" className="vehicle-glass-highlight" />
        <rect id="van-interior-light" x="163" y="27" width="71" height="42" className="vehicle-interior-light" />
      </g>
      <g id="van-panel">
        <rect x="29" y="34" width="105" height="37" rx="5" fill="#8299a4" opacity="0.32" />
        <path d="M50 53H113" stroke="#708792" strokeWidth="4" strokeLinecap="round" opacity="0.38" />
      </g>
      <g id="van-trim">
        <rect x="151" y="17" width="5" height="73" className="vehicle-trim" opacity="0.42" />
        <rect x="4" y="85" width="243" height="6" className="vehicle-trim" opacity="0.45" />
      </g>
      <g id="van-wheels">
        <VehicleWheel id="van-wheel-rear" cx={55} cy={91} radius={18} />
        <VehicleWheel id="van-wheel-front" cx={204} cy={91} radius={18} />
      </g>
      <g id="van-headlights">
        <path d="M240 67H248V77H243Z" className="vehicle-headlight" />
        <ellipse cx="250" cy="72" rx="11" ry="7" className="vehicle-light-glow" />
      </g>
      <g id="van-tail-lights">
        <rect x="4" y="66" width="6" height="12" rx="2" className="vehicle-tail-light" />
      </g>
    </svg>
  );
}

export default DeliveryVan;
