/**
 * Decorative "circuit traces" for the hero background.
 * Faint static lines + a bright light pulse traveling along each one —
 * an engineering/data-flow motif. Pure SVG + CSS keyframes (off main
 * thread); the global reduced-motion rule freezes the pulses.
 *
 * Denser layout with vertical runs through the centre so the network
 * still reads on narrow/portrait (mobile) viewports, where the SVG is
 * cropped to its central band.
 */

const traces = [
  // Three near-vertical rails, evenly spread across the centre so the
  // network stays balanced when the sides are cropped on mobile.
  "M460 -20 V220 H540 V740",
  "M620 740 V420 H700 V-20",
  "M780 -20 V300 H720 V560 H800 V740",
  // Horizontal rungs at even vertical intervals; they reach the edges on
  // desktop and cross the centre band on mobile.
  "M-20 110 H420 V150 H1220",
  "M1220 270 H820 V230 H360 V290 H-20",
  "M-20 470 H300 V430 H900 V500 H1220",
  "M-20 620 H520 V660 H1000 V600 H1220",
];

// Junction points to mark with a faint node dot.
const nodes: [number, number][] = [
  [540, 220],
  [700, 420],
  [720, 300],
  [800, 560],
  [420, 150],
  [820, 230],
  [360, 290],
  [900, 470],
  [300, 430],
  [520, 660],
  [1000, 600],
];

export default function HeroCircuit() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1200 700"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {traces.map((d, i) => (
        <g key={i}>
          {/* Faint static trace */}
          <path d={d} stroke="rgb(var(--accent) / 0.16)" strokeWidth="1.2" />
          {/* Traveling light pulse */}
          <path
            d={d}
            stroke="rgb(var(--accent-glow))"
            strokeWidth="1.7"
            strokeLinecap="round"
            className="trace-pulse"
            style={{
              strokeDasharray: "10 320",
              animationDuration: `${3.4 + i * 0.45}s`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        </g>
      ))}

      {nodes.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="2.6"
          fill="rgb(var(--accent) / 0.55)"
        />
      ))}
    </svg>
  );
}
