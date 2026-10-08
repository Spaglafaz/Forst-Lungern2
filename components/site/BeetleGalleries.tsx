/**
 * «404» als Borkenkäfer-Frassbild: Muttergänge bilden die Ziffern, links und rechts
 * zweigen die Larvengänge ab. Reines SVG mit CSS-Animation (zeichnet sich selbst).
 */

type Pt = [number, number];

// Ziffern als Linienzüge (viewBox 0 0 360 240)
const four = (dx: number): Pt[][] => [
  [[95 + dx, 30], [62 + dx, 92], [30 + dx, 150], [110 + dx, 150]],
  [[86 + dx, 72], [85 + dx, 140], [86 + dx, 210]],
];
const zero: Pt[] = Array.from({ length: 25 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
  return [180 + Math.cos(a) * 40, 120 + Math.sin(a) * 88];
});
const STROKES: Pt[][] = [...four(0), zero, ...four(232)];

// Kleiner Zufallsgenerator mit festem Startwert: das Frassbild sieht bei jedem Build gleich aus
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Branch = { d: string; end: Pt; delay: number };

function buildBranches(): Branch[] {
  const rand = rng(404);
  const out: Branch[] = [];
  STROKES.forEach((pts, s) => {
    let walked = 0;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const len = Math.hypot(x1 - x0, y1 - y0);
      const nx = -(y1 - y0) / len;
      const ny = (x1 - x0) / len;
      for (let t = 6; t < len; t += 9) {
        const bx = x0 + ((x1 - x0) * t) / len;
        const by = y0 + ((y1 - y0) * t) / len;
        for (const side of [1, -1]) {
          if (rand() < 0.2) continue;
          const l = 9 + rand() * 15;
          const bend = (rand() - 0.5) * 10;
          const ex = bx + nx * side * l + ((x1 - x0) / len) * bend;
          const ey = by + ny * side * l + ((y1 - y0) / len) * bend;
          const cx = bx + nx * side * l * 0.5 + (rand() - 0.5) * 6;
          const cy = by + ny * side * l * 0.5 + (rand() - 0.5) * 6;
          out.push({
            d: `M${bx.toFixed(1)} ${by.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
            end: [ex, ey],
            delay: 0.5 + s * 0.45 + (walked + t) / 260,
          });
        }
      }
      walked += len;
    }
  });
  return out;
}

const BRANCHES = buildBranches();
const toD = (pts: Pt[]) => 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L');

export function BeetleGalleries() {
  return (
    <svg className="beetle-art" viewBox="0 0 360 240" role="img" aria-label="Borkenkäfer-Frassgänge, die die Zahl 404 bilden">
      <g className="beetle-art__larvae">
        {BRANCHES.map((b, i) => (
          <g key={i} style={{ animationDelay: `${b.delay.toFixed(2)}s` }}>
            <path d={b.d} pathLength={1} style={{ animationDelay: `${b.delay.toFixed(2)}s` }} />
            <ellipse cx={b.end[0]} cy={b.end[1]} rx={2.2} ry={1.6} />
          </g>
        ))}
      </g>
      <g className="beetle-art__mother">
        {STROKES.map((pts, i) => (
          <path key={i} d={toD(pts)} pathLength={1} style={{ animationDelay: `${(i * 0.45).toFixed(2)}s` }} />
        ))}
      </g>
      {/* Der Täter: ein Buchdrucker am Ende des letzten Ganges */}
      <g className="beetle-art__bug" transform="translate(318 219) rotate(180)">
        <g className="beetle-art__bug-body">
          <g className="beetle-art__legs">
            <path d="M-3 -3l-5 -3M-3 0l-6 0M-3 3l-5 3M3 -3l5 -3M3 0l6 0M3 3l5 3" />
          </g>
          <ellipse cx="0" cy="1" rx="4.2" ry="6.5" />
          <circle cx="0" cy="-6.5" r="2.6" />
          <path className="beetle-art__antennae" d="M-1 -8.5l-2.5 -3M1 -8.5l2.5 -3" />
        </g>
      </g>
    </svg>
  );
}
