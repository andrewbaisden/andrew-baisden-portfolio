import './london-scene.css';

const VIEWBOX_WIDTH = 2048;
const VIEWBOX_HEIGHT = 1152;

type WindowGridProps = {
  id?: string;
  x: number;
  y: number;
  cols: number;
  rows: number;
  unitWidth?: number;
  unitHeight?: number;
  gapX?: number;
  gapY?: number;
  fill?: string;
  frame?: string;
  rx?: number;
};

function WindowGrid({
  id,
  x,
  y,
  cols,
  rows,
  unitWidth = 18,
  unitHeight = 24,
  gapX = 16,
  gapY = 18,
  fill = '#4d5d6e',
  frame = '#f7f1e8',
  rx = 2,
}: WindowGridProps) {
  const windows = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const wx = x + col * (unitWidth + gapX);
      const wy = y + row * (unitHeight + gapY);
      windows.push(
        <g key={`${row}-${col}`}>
          <rect
            x={wx}
            y={wy}
            width={unitWidth}
            height={unitHeight}
            rx={rx}
            fill={frame}
          />
          <rect
            x={wx + 2.2}
            y={wy + 2.2}
            width={unitWidth - 4.4}
            height={unitHeight - 4.4}
            rx={Math.max(rx - 1, 0)}
            fill={fill}
          />
        </g>,
      );
    }
  }

  return (
    <g id={id} className="building-windows">
      {windows}
    </g>
  );
}

function CloudPuff({
  cx,
  cy,
  rx,
  ry,
  fill = 'var(--scene-cloud)',
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fill?: string;
}) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} />;
}

function StreetLamp({
  id,
  x,
  y,
  variant = 'tall',
}: {
  id: string;
  x: number;
  y: number;
  variant?: 'tall' | 'promenade';
}) {
  const isTall = variant === 'tall';
  const poleHeight = isTall ? 368 : 168;
  const lanternY = isTall ? -428 : -214;

  return (
    <g id={id} className="street-lamp" transform={`translate(${x} ${y})`}>
      {variant === 'promenade' ? (
        <rect
          className="lamp-plinth"
          x={-16}
          y={-18}
          width={32}
          height={22}
          rx={3}
          fill="#e8e2d6"
        />
      ) : (
        <rect
          className="lamp-plinth"
          x={-12}
          y={-14}
          width={24}
          height={16}
          rx={2}
          fill="#1a1a1e"
        />
      )}
      <rect
        className="lamp-pole"
        x={isTall ? -6 : -4.5}
        y={-poleHeight}
        width={isTall ? 12 : 9}
        height={poleHeight}
        fill="var(--scene-railing)"
      />
      <rect
        className="lamp-collar"
        x={isTall ? -10 : -7}
        y={-poleHeight - 8}
        width={isTall ? 20 : 14}
        height={isTall ? 12 : 9}
        rx={2}
        fill="var(--scene-railing)"
      />
      <path
        className="lamp-frame"
        d={
          isTall
            ? 'M-20 -428 H20 L16 -376 H-16 Z'
            : 'M-13 -214 H13 L11 -178 H-11 Z'
        }
        fill="var(--scene-railing)"
      />
      <rect
        className="lamp-light"
        x={isTall ? -13 : -8}
        y={lanternY + 12}
        width={isTall ? 26 : 16}
        height={isTall ? 32 : 20}
        fill="var(--scene-light)"
      />
      <path
        className="lamp-roof"
        d={
          isTall
            ? 'M-22 -428 L0 -452 L22 -428 Z'
            : 'M-14 -214 L0 -230 L14 -214 Z'
        }
        fill="var(--scene-railing)"
      />
      <line
        className="lamp-finial"
        x1={0}
        y1={isTall ? -452 : -230}
        x2={0}
        y2={isTall ? -466 : -240}
        stroke="var(--scene-railing)"
        strokeWidth={isTall ? 3 : 2}
      />
      <circle
        cx={0}
        cy={isTall ? -470 : -243}
        r={isTall ? 3.5 : 2.4}
        fill="var(--scene-railing)"
      />
      <ellipse
        className="lamp-glow"
        cx={0}
        cy={lanternY + 28}
        rx={isTall ? 28 : 16}
        ry={isTall ? 22 : 13}
        fill="var(--scene-light)"
        opacity={0}
      />
    </g>
  );
}

function Tree({
  id,
  x,
  y,
  scale = 1,
  flip = false,
}: {
  id: string;
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
}) {
  return (
    <g
      id={id}
      className="scene-tree"
      transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}
    >
      <rect
        className="tree-trunk"
        x={-7}
        y={-52}
        width={14}
        height={58}
        rx={3}
        fill="#6b4a30"
      />
      <ellipse
        cx={-34}
        cy={-70}
        rx={40}
        ry={24}
        fill="var(--scene-tree-shadow)"
      />
      <ellipse cx={32} cy={-68} rx={38} ry={22} fill="var(--scene-tree)" />
      <ellipse cx={-4} cy={-96} rx={42} ry={26} fill="var(--scene-tree)" />
      <ellipse cx={-10} cy={-54} rx={30} ry={18} fill="var(--scene-tree)" />
      <ellipse
        cx={22}
        cy={-86}
        rx={22}
        ry={14}
        fill="var(--scene-tree-highlight)"
        opacity={0.7}
      />
      <ellipse
        cx={-22}
        cy={-82}
        rx={16}
        ry={11}
        fill="var(--scene-tree-highlight)"
        opacity={0.4}
      />
    </g>
  );
}

function CanopyCluster({
  id,
  x,
  y,
  scale = 1,
}: {
  id: string;
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <g id={id} transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse
        cx={-36}
        cy={12}
        rx={48}
        ry={28}
        fill="var(--scene-tree-shadow)"
      />
      <ellipse cx={18} cy={8} rx={54} ry={32} fill="var(--scene-tree)" />
      <ellipse cx={-8} cy={-18} rx={46} ry={30} fill="var(--scene-tree)" />
      <ellipse
        cx={42}
        cy={-6}
        rx={36}
        ry={22}
        fill="var(--scene-tree-highlight)"
        opacity={0.65}
      />
      <ellipse
        cx={-24}
        cy={-2}
        rx={22}
        ry={14}
        fill="var(--scene-tree-highlight)"
        opacity={0.4}
      />
    </g>
  );
}

function PromenadeBench({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g id={id} className="promenade-bench" transform={`translate(${x} ${y})`}>
      <rect x={0} y={8} width={5} height={16} rx={1} fill="#4a3a2c" />
      <rect x={58} y={8} width={5} height={16} rx={1} fill="#4a3a2c" />
      <rect x={-2} y={2} width={68} height={8} rx={2} fill="#5b4634" />
      <rect x={2} y={-10} width={60} height={8} rx={2} fill="#6a5340" />
    </g>
  );
}

function PlatformColumn({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g id={id} className="platform-column" transform={`translate(${x} ${y})`}>
      <rect x={-10} y={0} width={20} height={148} fill="#2a3548" />
      <rect x={-13} y={0} width={26} height={12} fill="#243044" />
      <rect x={-13} y={64} width={26} height={9} fill="#b03a3a" />
      <rect x={-13} y={140} width={26} height={10} fill="#243044" />
    </g>
  );
}

function PlatformBench({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g id={id} className="platform-bench" transform={`translate(${x} ${y})`}>
      <rect x={4} y={18} width={5} height={14} fill="#6a5b48" />
      <rect x={52} y={18} width={5} height={14} fill="#6a5b48" />
      <rect x={0} y={12} width={62} height={8} rx={2} fill="#8a7358" />
      <rect x={4} y={2} width={54} height={8} rx={2} fill="#9a8366" />
    </g>
  );
}

function Planter({
  x,
  y,
  width = 36,
}: {
  x: number;
  y: number;
  width?: number;
}) {
  return (
    <g className="planter" transform={`translate(${x} ${y})`}>
      <rect x={0} y={10} width={width} height={8} rx={1.5} fill="#8a6a48" />
      <ellipse
        cx={width * 0.3}
        cy={8}
        rx={10}
        ry={7}
        fill="var(--scene-tree)"
      />
      <ellipse
        cx={width * 0.62}
        cy={6}
        rx={11}
        ry={8}
        fill="var(--scene-tree-highlight)"
      />
      <ellipse
        cx={width * 0.48}
        cy={4}
        rx={8}
        ry={6}
        fill="var(--scene-tree-shadow)"
      />
    </g>
  );
}

export function LondonScene() {
  return (
    <svg
      className="hero-artwork london-scene"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ls-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--scene-sky)" />
          <stop offset="55%" stopColor="var(--scene-sky-mid)" />
          <stop offset="100%" stopColor="var(--scene-sky-horizon)" />
        </linearGradient>
        <linearGradient id="ls-horizon-haze" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor="var(--scene-sky-horizon)"
            stopOpacity="0"
          />
          <stop
            offset="100%"
            stopColor="var(--scene-skyline-far)"
            stopOpacity="0.55"
          />
        </linearGradient>
        <linearGradient id="ls-river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7aafc6" />
          <stop offset="45%" stopColor="var(--scene-river)" />
          <stop offset="100%" stopColor="var(--scene-river-deep)" />
        </linearGradient>
        <linearGradient id="ls-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a4e58" />
          <stop offset="100%" stopColor="var(--scene-road)" />
        </linearGradient>
        <linearGradient id="ls-underground-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ddd6cb" />
          <stop offset="100%" stopColor="#cfc8bc" />
        </linearGradient>
        <radialGradient id="ls-tunnel" cx="50%" cy="42%" r="68%">
          <stop offset="0%" stopColor="#6a5a40" />
          <stop offset="45%" stopColor="#2a3340" />
          <stop offset="100%" stopColor="#151a22" />
        </radialGradient>
        <linearGradient id="ls-ceiling-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7f0d4" />
          <stop offset="100%" stopColor="#d8c48a" />
        </linearGradient>
        <pattern
          id="ls-railing-bars"
          width="12"
          height="44"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="5"
            y="0"
            width="2.8"
            height="44"
            fill="var(--scene-railing)"
          />
        </pattern>
        <pattern
          id="ls-sleepers"
          width="32"
          height="46"
          patternUnits="userSpaceOnUse"
        >
          <rect x="6" y="8" width="20" height="30" rx="2" fill="#4a453c" />
        </pattern>
      </defs>

      <g id="sky">
        <rect width={VIEWBOX_WIDTH} height="520" fill="url(#ls-sky)" />
        <g
          id="birds"
          fill="none"
          stroke="#5d7d92"
          strokeWidth="1.7"
          strokeLinecap="round"
        >
          <path d="M1688 208 q8 7 16 0" />
          <path d="M1722 196 q7 6 14 0" />
          <path d="M1754 214 q6 5 12 0" />
          <path d="M1788 190 q7 6 13 0" />
        </g>
      </g>

      <g id="clouds-back">
        <g id="cloud-group-left" transform="translate(220 118)">
          <CloudPuff
            cx={-30}
            cy={18}
            rx={70}
            ry={24}
            fill="var(--scene-cloud-shade)"
          />
          <CloudPuff cx={30} cy={8} rx={86} ry={30} />
          <CloudPuff cx={90} cy={16} rx={54} ry={20} />
          <CloudPuff cx={12} cy={-8} rx={48} ry={18} />
        </g>
        <g id="cloud-group-mid" transform="translate(430 188)">
          <CloudPuff
            cx={0}
            cy={10}
            rx={58}
            ry={16}
            fill="var(--scene-cloud-shade)"
          />
          <CloudPuff cx={44} cy={4} rx={42} ry={14} />
        </g>
      </g>

      <g id="clouds-front">
        <g id="cloud-group-right" transform="translate(1580 168)">
          <CloudPuff
            cx={0}
            cy={12}
            rx={42}
            ry={14}
            fill="var(--scene-cloud-shade)"
          />
          <CloudPuff cx={36} cy={6} rx={38} ry={13} />
        </g>
      </g>

      <g id="distant-skyline">
        <rect
          x="380"
          y="430"
          width="1280"
          height="58"
          fill="url(#ls-horizon-haze)"
        />
        <rect
          x="430"
          y="392"
          width="28"
          height="96"
          fill="var(--scene-skyline-far)"
        />
        <rect
          x="464"
          y="368"
          width="22"
          height="120"
          fill="var(--scene-skyline)"
        />
        <rect
          x="492"
          y="404"
          width="36"
          height="84"
          fill="var(--scene-skyline-far)"
        />
        <rect
          x="536"
          y="380"
          width="18"
          height="108"
          fill="var(--scene-skyline)"
        />
        <rect
          x="560"
          y="388"
          width="40"
          height="100"
          fill="var(--scene-skyline-far)"
        />
        <rect
          x="608"
          y="372"
          width="26"
          height="116"
          fill="var(--scene-skyline)"
        />
        <rect
          x="642"
          y="414"
          width="48"
          height="74"
          fill="var(--scene-skyline-far)"
        />
        <rect
          x="700"
          y="396"
          width="30"
          height="92"
          fill="var(--scene-skyline)"
        />
        <rect
          x="738"
          y="368"
          width="20"
          height="120"
          fill="var(--scene-skyline-far)"
        />
        <rect
          x="766"
          y="408"
          width="42"
          height="80"
          fill="var(--scene-skyline)"
        />
        <rect
          x="818"
          y="384"
          width="24"
          height="104"
          fill="var(--scene-skyline-far)"
        />

        <g id="st-pauls">
          <rect
            x="878"
            y="448"
            width="108"
            height="40"
            fill="var(--scene-skyline-accent)"
          />
          <rect x="898" y="422" width="68" height="30" rx="4" fill="#d5e0e6" />
          <ellipse cx="932" cy="412" rx="36" ry="22" fill="#e4eef2" />
          <rect x="924" y="384" width="16" height="18" fill="#d5e0e6" />
          <circle cx="932" cy="380" r="5.5" fill="#eef4f7" />
        </g>

        <rect
          x="990"
          y="400"
          width="34"
          height="88"
          fill="var(--scene-skyline)"
        />
        <rect
          x="1030"
          y="372"
          width="22"
          height="116"
          fill="var(--scene-skyline-far)"
        />
        <rect
          x="1060"
          y="408"
          width="50"
          height="80"
          fill="var(--scene-skyline)"
        />
        <rect
          x="1118"
          y="380"
          width="18"
          height="108"
          fill="var(--scene-skyline-far)"
        />
        <rect
          x="1144"
          y="388"
          width="38"
          height="100"
          fill="var(--scene-skyline)"
        />
        <rect
          x="1190"
          y="404"
          width="44"
          height="84"
          fill="var(--scene-skyline-far)"
        />
        <rect
          x="1242"
          y="368"
          width="26"
          height="120"
          fill="var(--scene-skyline)"
        />
        <rect
          x="1276"
          y="392"
          width="32"
          height="96"
          fill="var(--scene-skyline-far)"
        />
        <rect
          x="1316"
          y="372"
          width="20"
          height="116"
          fill="var(--scene-skyline)"
        />
        <rect
          x="1344"
          y="380"
          width="42"
          height="108"
          fill="var(--scene-skyline-far)"
        />

        <g id="gherkin">
          <path
            d="M1438 368 C1468 384 1478 438 1474 500 H1408 C1404 438 1414 384 1438 368 Z"
            fill="var(--scene-skyline-accent)"
          />
        </g>

        <g id="shard">
          <path
            d="M1522 500 L1552 318 L1582 500 Z"
            fill="var(--scene-skyline-accent)"
          />
          <path d="M1546 500 L1552 304 L1558 500 Z" fill="#dce6ec" />
        </g>

        <rect
          x="1596"
          y="400"
          width="36"
          height="88"
          fill="var(--scene-skyline)"
        />
        <rect
          x="1638"
          y="372"
          width="24"
          height="116"
          fill="var(--scene-skyline-far)"
        />
        <rect
          x="1668"
          y="414"
          width="46"
          height="74"
          fill="var(--scene-skyline)"
        />

        <g id="thames-bridge">
          <rect x="760" y="492" width="620" height="16" fill="#8aa6b8" />
          <path
            d="M790 508 A 42 16 0 0 1 874 508 M910 508 A 42 16 0 0 1 994 508 M1030 508 A 42 16 0 0 1 1114 508 M1150 508 A 42 16 0 0 1 1234 508 M1270 508 A 42 16 0 0 1 1354 508"
            fill="none"
            stroke="#7b97aa"
            strokeWidth="6"
          />
        </g>
      </g>

      <g id="river">
        <rect
          x="0"
          y="488"
          width={VIEWBOX_WIDTH}
          height="42"
          fill="url(#ls-river)"
        />
        <rect
          id="river-reflection"
          x="0"
          y="498"
          width={VIEWBOX_WIDTH}
          height="7"
          fill="#b7d5e4"
          opacity={0.38}
        />
        <rect
          x="0"
          y="516"
          width={VIEWBOX_WIDTH}
          height="4"
          fill="#9ec4d4"
          opacity={0.28}
        />
        <ellipse
          cx="1180"
          cy="508"
          rx="90"
          ry="6"
          fill="#c5dce6"
          opacity={0.22}
        />
        <g id="river-trees">
          <ellipse
            cx="720"
            cy="492"
            rx="28"
            ry="14"
            fill="var(--scene-tree-shadow)"
          />
          <ellipse cx="980" cy="490" rx="34" ry="16" fill="var(--scene-tree)" />
          <ellipse
            cx="1220"
            cy="491"
            rx="30"
            ry="14"
            fill="var(--scene-tree-shadow)"
          />
        </g>
      </g>

      <g id="left-buildings">
        <rect
          x="-24"
          y="56"
          width="228"
          height="472"
          fill="var(--scene-building-warm)"
        />
        <rect x="-24" y="56" width="228" height="22" fill="#e4d3bc" />
        <rect x="-24" y="78" width="228" height="8" fill="#d7c4ab" />
        <rect
          x="178"
          y="40"
          width="18"
          height="28"
          fill="var(--scene-building-slate)"
        />
        <rect x="182" y="32" width="10" height="10" fill="#5c6570" />
        <WindowGrid
          id="left-cream-windows"
          x={18}
          y={108}
          cols={3}
          rows={4}
          unitWidth={20}
          unitHeight={26}
          gapX={18}
          gapY={20}
          fill="#5b6c7c"
        />
        <rect x="58" y="478" width={44} height={50} fill="#f7f2ea" />
        <rect x="66" y="492" width={28} height={36} fill="#4d5d6e" />
        <Planter x={18} y={186} width={40} />
        <Planter x={78} y={186} width={40} />
        <Planter x={138} y={186} width={40} />
        <rect
          x="168"
          y="92"
          width="168"
          height="436"
          fill="var(--scene-building-brick)"
        />
        <rect
          x="168"
          y="92"
          width="168"
          height="16"
          fill="var(--scene-building-brick-dark)"
        />
        <rect
          x="300"
          y="74"
          width="16"
          height="26"
          fill="var(--scene-building-brick-dark)"
        />
        <WindowGrid
          id="left-brick-windows"
          x={188}
          y={124}
          cols={2}
          rows={4}
          unitWidth={20}
          unitHeight={26}
          gapX={24}
          gapY={20}
          fill="#5c2f2c"
          frame="#e8cfc4"
        />
        <Planter x={186} y={210} width={36} />
        <Planter x={242} y={210} width={36} />
      </g>

      <g id="right-buildings">
        <rect
          x="1768"
          y="84"
          width="90"
          height="444"
          fill="var(--scene-building)"
        />
        <rect x="1768" y="84" width="90" height="16" fill="#d9c8b0" />
        <WindowGrid
          id="right-cream-windows"
          x={1784}
          y={124}
          cols={1}
          rows={4}
          unitWidth={22}
          unitHeight={28}
          gapX={16}
          gapY={22}
          fill="#5b6c7c"
        />
        <rect
          x="1836"
          y="56"
          width="240"
          height="472"
          fill="var(--scene-building-brick)"
        />
        <rect
          x="1836"
          y="56"
          width="240"
          height="18"
          fill="var(--scene-building-brick-dark)"
        />
        <rect
          x="1996"
          y="38"
          width="18"
          height="28"
          fill="var(--scene-building-brick-dark)"
        />
        <WindowGrid
          id="right-brick-windows"
          x={1864}
          y={98}
          cols={2}
          rows={4}
          unitWidth={22}
          unitHeight={28}
          gapX={30}
          gapY={22}
          fill="#5c2f2c"
          frame="#e8cfc4"
        />
        <Planter x={1862} y={178} width={40} />
        <Planter x={1918} y={178} width={40} />
        <rect x="1888" y="478" width="48" height="50" fill="#f3e6d6" />
        <rect x="1896" y="492" width="32" height="36" fill="#4d5d6e" />
      </g>

      <g id="trees-back">
        <Tree id="tree-back-left-1" x={232} y={530} scale={1.02} />
        <Tree id="tree-back-left-2" x={508} y={538} scale={0.9} flip />
        <Tree id="tree-back-left-3" x={448} y={548} scale={0.7} />
        <Tree id="tree-back-right-1" x={1572} y={540} scale={0.88} />
        <Tree id="tree-back-right-2" x={1662} y={528} scale={1.1} flip />
        <Tree id="tree-back-right-3" x={1768} y={538} scale={0.84} />
      </g>

      <g id="pavement">
        <rect
          x="0"
          y="528"
          width={VIEWBOX_WIDTH}
          height="92"
          fill="var(--scene-pavement)"
        />
        <rect x="0" y="528" width={VIEWBOX_WIDTH} height="8" fill="#cfc9be" />
        <rect x="0" y="610" width={VIEWBOX_WIDTH} height="10" fill="#c3bdb2" />
      </g>

      <g id="railings">
        <rect
          x="210"
          y="508"
          width="1488"
          height="44"
          fill="url(#ls-railing-bars)"
        />
        <rect
          x="210"
          y="508"
          width="1488"
          height="4"
          fill="var(--scene-railing)"
        />
        <rect
          x="210"
          y="526"
          width="1488"
          height="3"
          fill="var(--scene-railing)"
        />
        <rect
          x="210"
          y="548"
          width="1488"
          height="4"
          fill="var(--scene-railing)"
        />
        {[620, 980, 1160, 1500, 1648].map((px) => (
          <rect
            key={px}
            x={px - 10}
            y={500}
            width={20}
            height={36}
            rx={2}
            fill="#e8e2d6"
          />
        ))}
      </g>

      <g id="street-furniture">
        <PromenadeBench id="promenade-bench-left" x={924} y={548} />
        <PromenadeBench id="promenade-bench-right" x={1408} y={548} />
      </g>

      <g id="bus-shelter">
        <rect x="278" y="548" width="214" height="8" fill="#cfc8bc" />
        <rect
          x="286"
          y="488"
          width="8"
          height="64"
          fill="var(--scene-railing)"
        />
        <rect
          x="476"
          y="488"
          width="8"
          height="64"
          fill="var(--scene-railing)"
        />
        <rect
          x="348"
          y="488"
          width="5"
          height="64"
          fill="var(--scene-railing)"
        />
        <rect
          x="416"
          y="488"
          width="5"
          height="64"
          fill="var(--scene-railing)"
        />
        <rect
          x="294"
          y="492"
          width="182"
          height="48"
          fill="#9ec4d6"
          fillOpacity={0.55}
        />
        <rect
          x="286"
          y="492"
          width="54"
          height="48"
          fill="#2f3640"
          fillOpacity={0.28}
        />
        <rect x="278" y="476" width="214" height="16" rx={2} fill="#d6453c" />
        <rect x="272" y="470" width="226" height="10" rx={2} fill="#c2473e" />
        <rect x="318" y="534" width="96" height="10" rx={2} fill="#d6453c" />
        <rect x="326" y="526" width="80" height="8" rx={2} fill="#e05a50" />
      </g>

      <g id="tube-entrance">
        <rect x="1696" y="500" width="22" height="40" rx={2} fill="#e8e2d6" />
        <rect x="1828" y="500" width="22" height="40" rx={2} fill="#e8e2d6" />
        <circle
          className="lamp-light"
          cx={1707}
          cy={492}
          r={10}
          fill="#f4f0e4"
        />
        <circle
          className="lamp-light"
          cx={1839}
          cy={492}
          r={10}
          fill="#f4f0e4"
        />
        <circle
          className="lamp-glow"
          cx={1707}
          cy={492}
          r={16}
          fill="var(--scene-light)"
          opacity={0}
        />
        <circle
          className="lamp-glow"
          cx={1839}
          cy={492}
          r={16}
          fill="var(--scene-light)"
          opacity={0}
        />
        <rect x="1716" y="512" width="116" height="36" fill="#2a2c32" />
        <path d="M1728 548 L1744 516 H1910 L1924 548 Z" fill="#1a1c22" />
        <path d="M1752 548 H1900 L1888 520 H1764 Z" fill="#3a3d46" />
        <rect x="1764" y="526" width="124" height="4" fill="#5a5e68" />
        <rect x="1772" y="534" width="108" height="4" fill="#5a5e68" />
        <rect x="1780" y="542" width="92" height="4" fill="#5a5e68" />
        <rect
          x="1716"
          y="508"
          width="4"
          height="40"
          fill="var(--scene-railing)"
        />
        <rect
          x="1828"
          y="508"
          width="4"
          height="40"
          fill="var(--scene-railing)"
        />
        <rect
          x="1716"
          y="508"
          width="116"
          height="4"
          fill="var(--scene-railing)"
        />
        <g id="tube-roundel" transform="translate(1718 456)">
          <circle r="34" fill="#d92b2b" />
          <circle r="20" fill="#f4f7fa" />
          <rect x="-38" y="-8" width="76" height="16" rx="2" fill="#1c3e8a" />
        </g>
      </g>

      <g id="trees-front">
        <CanopyCluster id="canopy-front-left" x={80} y={96} scale={1.45} />
        <CanopyCluster id="canopy-front-left-2" x={200} y={78} scale={1.12} />
        <line
          x1="40"
          y1="0"
          x2="108"
          y2="118"
          stroke="#5a3d28"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <line
          x1="168"
          y1="0"
          x2="228"
          y2="92"
          stroke="#5a3d28"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <CanopyCluster id="canopy-front-right" x={1960} y={88} scale={1.38} />
        <CanopyCluster id="canopy-front-right-2" x={2060} y={70} scale={0.95} />
        <line
          x1="2010"
          y1="0"
          x2="1948"
          y2="110"
          stroke="#5a3d28"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </g>

      <g id="street-lamps">
        <StreetLamp id="lamp-left" x={108} y={618} variant="tall" />
        <StreetLamp
          id="lamp-promenade-left"
          x={812}
          y={552}
          variant="promenade"
        />
        <StreetLamp
          id="lamp-promenade-right"
          x={1318}
          y={552}
          variant="promenade"
        />
        <StreetLamp id="lamp-right" x={1938} y={618} variant="tall" />
      </g>

      <g id="road">
        <rect
          x="0"
          y="618"
          width={VIEWBOX_WIDTH}
          height="180"
          fill="url(#ls-road)"
        />
        <rect
          x="0"
          y="618"
          width={VIEWBOX_WIDTH}
          height="8"
          fill="var(--scene-kerb)"
        />
        <rect
          x="0"
          y="790"
          width={VIEWBOX_WIDTH}
          height="8"
          fill="var(--scene-kerb)"
        />
        <rect
          x="0"
          y="626"
          width={VIEWBOX_WIDTH}
          height="3"
          fill="#d9dbe0"
          opacity={0.35}
        />
        <rect
          x="0"
          y="787"
          width={VIEWBOX_WIDTH}
          height="3"
          fill="#d9dbe0"
          opacity={0.28}
        />
        {/* Conceptual back lane (right → left), front lane (left → right). */}
        <g id="road-lane-back">
          <line
            x1="0"
            y1="668"
            x2={VIEWBOX_WIDTH}
            y2="668"
            stroke="var(--scene-road-line)"
            strokeWidth="4"
            strokeDasharray="36 28"
            opacity={0.18}
          />
        </g>
        <g id="road-lane-front">
          <line
            x1="0"
            y1="748"
            x2={VIEWBOX_WIDTH}
            y2="748"
            stroke="var(--scene-road-line)"
            strokeWidth="5"
            strokeDasharray="42 26"
            opacity={0.28}
          />
        </g>
      </g>

      <g id="underground-structure">
        <rect x="0" y="798" width={VIEWBOX_WIDTH} height="28" fill="#5b6570" />
        <rect x="0" y="826" width={VIEWBOX_WIDTH} height="10" fill="#4a535c" />
        <rect
          x="0"
          y="836"
          width={VIEWBOX_WIDTH}
          height="196"
          fill="url(#ls-underground-wall)"
        />
        <rect x="0" y="836" width={VIEWBOX_WIDTH} height="8" fill="#b7b1a6" />
        <g id="tunnel-left">
          <path
            d="M 16 1008 L 16 912 A 72 70 0 0 0 160 912 L 160 1008 Z"
            fill="url(#ls-tunnel)"
          />
          <ellipse
            cx="88"
            cy="948"
            rx="22"
            ry="16"
            fill="#4a5360"
            opacity={0.55}
          />
          <path
            d="M 16 912 A 72 70 0 0 0 160 912"
            fill="none"
            stroke="#3a4450"
            strokeWidth="8"
          />
        </g>
        <g id="tunnel-right">
          <path
            d="M 2032 1008 L 2032 912 A 72 70 0 0 1 1888 912 L 1888 1008 Z"
            fill="url(#ls-tunnel)"
          />
          <ellipse
            cx="1960"
            cy="948"
            rx="22"
            ry="16"
            fill="#4a5360"
            opacity={0.55}
          />
          <path
            d="M 2032 912 A 72 70 0 0 1 1888 912"
            fill="none"
            stroke="#3a4450"
            strokeWidth="8"
          />
        </g>
        <rect
          x="620"
          y="872"
          width="52"
          height="64"
          rx="4"
          fill="#c9c2b6"
          stroke="#b7b0a4"
          strokeWidth="2"
        />
        <rect x="632" y="884" width="28" height="18" fill="#d8d2c8" />
        <rect x="632" y="908" width="28" height="18" fill="#d8d2c8" />
        <rect
          x="1188"
          y="868"
          width="58"
          height="70"
          rx="4"
          fill="#c9c2b6"
          stroke="#b7b0a4"
          strokeWidth="2"
        />
        <circle cx="1217" cy="900" r="16" fill="#d8d2c8" />
        <path
          d="M1206 900 H1228 M1217 889 V911"
          stroke="#b7b0a4"
          strokeWidth="2"
        />
      </g>

      <g id="underground-platform">
        <rect x="0" y="1008" width={VIEWBOX_WIDTH} height="36" fill="#c4baaa" />
        <rect x="0" y="1034" width={VIEWBOX_WIDTH} height="10" fill="#e8c84a" />
        <PlatformColumn id="column-1" x={280} y={848} />
        <PlatformColumn id="column-2" x={560} y={848} />
        <PlatformColumn id="column-3" x={840} y={848} />
        <PlatformColumn id="column-4" x={1120} y={848} />
        <PlatformColumn id="column-5" x={1400} y={848} />
        <PlatformColumn id="column-6" x={1680} y={848} />
        <PlatformBench id="platform-bench-1" x={360} y={976} />
        <PlatformBench id="platform-bench-2" x={900} y={976} />
        <PlatformBench id="platform-bench-3" x={1460} y={976} />
        <g id="platform-stairs">
          <rect x="1748" y="868" width="86" height="140" fill="#b7b1a6" />
          <rect x="1756" y="980" width="70" height="12" fill="#cfc8bc" />
          <rect x="1760" y="960" width="62" height="10" fill="#cfc8bc" />
          <rect x="1764" y="940" width="54" height="10" fill="#cfc8bc" />
          <rect x="1768" y="920" width="46" height="10" fill="#cfc8bc" />
          <rect x="1772" y="900" width="38" height="10" fill="#cfc8bc" />
          <rect x="1776" y="882" width="30" height="10" fill="#cfc8bc" />
        </g>
      </g>

      <g id="underground-track">
        <rect
          x="0"
          y="1044"
          width={VIEWBOX_WIDTH}
          height="108"
          fill="#2f2d2a"
        />
        <rect
          x="0"
          y="1066"
          width={VIEWBOX_WIDTH}
          height="46"
          fill="url(#ls-sleepers)"
        />
        <rect x="0" y="1074" width={VIEWBOX_WIDTH} height="6" fill="#8d8d8d" />
        <rect x="0" y="1098" width={VIEWBOX_WIDTH} height="6" fill="#8d8d8d" />
        <path
          id="underground-train-motion-path"
          d="M 40 1088 H 2008"
          fill="none"
          stroke="none"
        />
      </g>

      <g id="lighting">
        <g id="platform-lights">
          {[240, 520, 800, 1080, 1360, 1640, 1880].map((lx) => (
            <g key={lx}>
              <rect
                x={lx - 28}
                y={812}
                width={56}
                height={12}
                rx={3}
                fill="url(#ls-ceiling-light)"
              />
              <ellipse
                cx={lx}
                cy={848}
                rx={40}
                ry={10}
                fill="#f3e6b0"
                opacity={0.18}
              />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

export default LondonScene;
