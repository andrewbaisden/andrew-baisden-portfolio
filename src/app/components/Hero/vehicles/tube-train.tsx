import type { CSSProperties } from 'react';
import {
  type VehicleProps,
  VehicleWheel,
  vehicleProps,
  vehicleStyle,
} from './vehicle-parts';
import './vehicles.css';

type CarriageProps = {
  index: number;
  x: number;
  front?: boolean;
};

function DoorPair({
  carriage,
  pair,
  x,
}: {
  carriage: number;
  pair: number;
  x: number;
}) {
  return (
    <g id={`carriage-${carriage}-door-pair-${pair}`} className="tube-door-pair">
      <g
        id={`carriage-${carriage}-door-${pair}-left`}
        className="tube-door tube-door--left"
      >
        <rect
          x={x}
          y="48"
          width="23"
          height="76"
          rx="2"
          className="tube-door__panel"
        />
        <rect
          x={x + 4}
          y="55"
          width="15"
          height="27"
          rx="1.5"
          className="vehicle-glass"
        />
        <line
          x1={x + 20}
          y1="89"
          x2={x + 20}
          y2="113"
          className="tube-door__seam"
        />
      </g>
      <g
        id={`carriage-${carriage}-door-${pair}-right`}
        className="tube-door tube-door--right"
      >
        <rect
          x={x + 24}
          y="48"
          width="23"
          height="76"
          rx="2"
          className="tube-door__panel"
        />
        <rect
          x={x + 28}
          y="55"
          width="15"
          height="27"
          rx="1.5"
          className="vehicle-glass"
        />
        <line
          x1={x + 27}
          y1="89"
          x2={x + 27}
          y2="113"
          className="tube-door__seam"
        />
      </g>
    </g>
  );
}

function TubeCarriage({ index, x, front = false }: CarriageProps) {
  const id = `carriage-${index}`;
  const wheelOffset = front ? 252 : 257;

  return (
    <g id={id} className="tube-carriage" transform={`translate(${x} 0)`}>
      <g id={`${id}-body`} className="tube-carriage__body">
        <path
          d={
            front
              ? 'M5 22Q5 14 14 14H265Q282 14 292 29L309 54V126Q309 136 299 136H5Z'
              : 'M5 22Q5 14 14 14H300Q309 14 309 23V136H5Z'
          }
          className="tube-body"
        />
        <rect
          x="5"
          y="109"
          width="304"
          height="27"
          className="tube-body__lower"
        />
        <rect
          x="5"
          y="99"
          width="304"
          height="8"
          className="tube-accent tube-accent--red"
        />
        <rect
          x="5"
          y="107"
          width="304"
          height="4"
          className="tube-accent tube-accent--blue"
        />
        <path
          d={
            front
              ? 'M5 22Q5 14 14 14H265Q282 14 292 29L309 54V126Q309 136 299 136H5Z'
              : 'M5 22Q5 14 14 14H300Q309 14 309 23V136H5Z'
          }
          className="vehicle-outline"
        />
      </g>

      <g id={`${id}-windows`} className="train-windows">
        <rect
          x="15"
          y="45"
          width="56"
          height="38"
          rx="3"
          className="vehicle-glass"
        />
        <rect
          x="82"
          y="45"
          width="24"
          height="38"
          rx="3"
          className="vehicle-glass"
        />
        <rect
          x="204"
          y="45"
          width="24"
          height="38"
          rx="3"
          className="vehicle-glass"
        />
        {front ? (
          <path
            d="M239 45H277Q286 45 296 59V83H239Z"
            className="vehicle-glass"
          />
        ) : (
          <rect
            x="239"
            y="45"
            width="57"
            height="38"
            rx="3"
            className="vehicle-glass"
          />
        )}
        <path d="M19 49H67L52 54H19Z" className="vehicle-glass-highlight" />
        <rect
          x="12"
          y="42"
          width="288"
          height="45"
          className="vehicle-interior-light"
        />
      </g>

      <g id={`${id}-doors`} className="train-doors">
        <DoorPair carriage={index} pair={1} x={110} />
        <DoorPair carriage={index} pair={2} x={157} />
      </g>

      <g id={`${id}-undercarriage`} className="train-undercarriage">
        <rect
          x="14"
          y="136"
          width="282"
          height="12"
          rx="3"
          className="vehicle-trim"
        />
        <rect x="104" y="140" width="106" height="13" rx="3" fill="#303b43" />
        <VehicleWheel id={`${id}-wheel-rear`} cx={54} cy={148} radius={10} />
        <VehicleWheel
          id={`${id}-wheel-front`}
          cx={wheelOffset}
          cy={148}
          radius={10}
        />
      </g>
    </g>
  );
}

export function TubeTrain({ className, theme }: VehicleProps) {
  return (
    <svg
      {...vehicleProps('tube-train', className, theme)}
      style={
        {
          ...vehicleStyle,
          '--vehicle-glass': '#405867',
          '--vehicle-glass-highlight': '#8fa6b0',
          '--tube-body': '#d8d7d2',
          '--tube-body-lower': '#aeb4b6',
        } as CSSProperties
      }
      viewBox="0 0 970 164"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        id="train-contact-shadow"
        className="vehicle-contact-shadow"
        cx="485"
        cy="160"
        rx="474"
        ry="4"
      />
      <g id="train">
        <TubeCarriage index={1} x={3} />
        <g id="carriage-connector-1" className="train-connector">
          <rect
            x="308"
            y="45"
            width="18"
            height="84"
            rx="4"
            className="vehicle-trim"
          />
          <path
            d="M311 52L323 64M311 76L323 88M311 100L323 112"
            stroke="#66747d"
            strokeWidth="2"
          />
        </g>
        <TubeCarriage index={2} x={320} />
        <g id="carriage-connector-2" className="train-connector">
          <rect
            x="625"
            y="45"
            width="18"
            height="84"
            rx="4"
            className="vehicle-trim"
          />
          <path
            d="M628 52L640 64M628 76L640 88M628 100L640 112"
            stroke="#66747d"
            strokeWidth="2"
          />
        </g>
        <TubeCarriage index={3} x={637} front />
      </g>

      <g id="train-headlights">
        <rect
          x="952"
          y="88"
          width="10"
          height="11"
          rx="3"
          className="vehicle-headlight"
        />
        <ellipse
          cx="966"
          cy="93.5"
          rx="18"
          ry="10"
          className="vehicle-light-glow"
        />
      </g>
      <g id="train-tail-lights">
        <rect
          x="5"
          y="88"
          width="8"
          height="11"
          rx="3"
          className="vehicle-tail-light"
        />
      </g>
    </svg>
  );
}

export default TubeTrain;
