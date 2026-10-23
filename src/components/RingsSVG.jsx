import { cn } from "@wron/kit";
import { SIGNS, ANIMALS, NUMBER_LIST } from "../lib/engine";

/*
  The three-ring instrument as SVG: outer western glyphs, middle Chinese animals, inner numbers.
  Used as the WebGL fallback on Home and as the CSS/SVG echo on Explore and guide pages.
  Props:
    sign      index 0-11 to highlight on the outer ring (violet)
    animal    index 0-11 to highlight on the middle ring
    number    a value from 1-9, 11, 22, 33 to highlight on the inner ring
    spin      slow CSS rotation (disabled automatically for reduced motion)
    rings     which rings to draw: ["signs","animals","numbers"] (default all)
    tilt      draw with a slight 3/4 perspective (CSS)
*/

const C = 300;
const RINGS = {
  signs: { r1: 290, r2: 228, items: SIGNS.map((s) => s.glyph), font: 30, glyph: true },
  animals: { r1: 222, r2: 168, items: ANIMALS, font: 15 },
  numbers: { r1: 162, r2: 112, items: NUMBER_LIST.map(String), font: 24 },
};

function polar(r, deg) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
}
function wedge(r1, r2, a0, a1) {
  const [x1, y1] = polar(r1, a0), [x2, y2] = polar(r1, a1), [x3, y3] = polar(r2, a1), [x4, y4] = polar(r2, a0);
  return `M${x1},${y1} A${r1},${r1} 0 0 1 ${x2},${y2} L${x3},${y3} A${r2},${r2} 0 0 0 ${x4},${y4} Z`;
}

function Ring({ cfg, active, spinClass, reverse }) {
  const step = 360 / 12;
  const mid = (cfg.r1 + cfg.r2) / 2;
  return (
    <g className={spinClass} style={reverse ? { animationDirection: "reverse", transformBox: "view-box", transformOrigin: "50% 50%" } : { transformBox: "view-box", transformOrigin: "50% 50%" }}>
      <circle cx={C} cy={C} r={cfg.r1} fill="rgba(18,22,27,0.85)" stroke="rgba(45,212,163,0.55)" strokeWidth="1.5" />
      <circle cx={C} cy={C} r={cfg.r2} fill="#0B0D10" stroke="rgba(45,212,163,0.35)" strokeWidth="1" />
      {cfg.items.map((label, i) => {
        const a0 = i * step - step / 2, a1 = a0 + step;
        const [lx1, ly1] = polar(cfg.r1, a0), [lx2, ly2] = polar(cfg.r2, a0);
        const [tx, ty] = polar(mid, i * step);
        const on = i === active;
        return (
          <g key={label}>
            {on && <path d={wedge(cfg.r1 - 2, cfg.r2 + 2, a0, a1)} fill="rgba(167,139,250,0.22)" stroke="#A78BFA" strokeWidth="2" filter="url(#rings-glow)" />}
            <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke="rgba(140,150,163,0.28)" strokeWidth="1" />
            <text
              x={tx} y={ty} textAnchor="middle" dominantBaseline="central"
              transform={`rotate(${i * step} ${tx} ${ty})`}
              fontSize={cfg.font} fontWeight={cfg.glyph ? 400 : 500}
              fill={on ? "#EEF2F6" : cfg.glyph ? "#2DD4A3" : "rgba(238,242,246,0.75)"}
              className={cfg.glyph ? "glyph" : "num"}
              style={{ fontFamily: cfg.glyph ? undefined : "Geist, sans-serif" }}
            >
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export default function RingsSVG({ sign, animal, number, spin = false, rings = ["signs", "animals", "numbers"], tilt = false, className, title = "Three rings: western signs, Chinese animals and numbers" }) {
  const numIndex = number != null ? NUMBER_LIST.indexOf(Number(number)) : -1;
  return (
    <div className={cn("relative", className)} style={tilt ? { perspective: "1400px" } : undefined}>
      <svg viewBox="0 0 600 600" role="img" aria-label={title} className="h-full w-full" style={tilt ? { transform: "rotateX(28deg) rotateZ(-8deg)" } : undefined}>
        <defs>
          <radialGradient id="rings-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="rgba(45,212,163,0.18)" />
            <stop offset="1" stopColor="rgba(11,13,16,0)" />
          </radialGradient>
          <radialGradient id="rings-core" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#3a4654" />
            <stop offset="1" stopColor="#0B0D10" />
          </radialGradient>
          <filter id="rings-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx={C} cy={C} r={300} fill="url(#rings-bg)" />
        {rings.includes("signs") && <Ring cfg={RINGS.signs} active={sign} spinClass={spin ? "spin-slow" : ""} />}
        {rings.includes("animals") && <Ring cfg={RINGS.animals} active={animal} spinClass={spin ? "spin-slow" : ""} reverse />}
        {rings.includes("numbers") && <Ring cfg={RINGS.numbers} active={numIndex} spinClass={spin ? "spin-slow" : ""} />}
        <circle cx={C} cy={C} r={rings.includes("numbers") ? 104 : 160} fill="#0B0D10" stroke="rgba(45,212,163,0.3)" />
        <circle cx={C} cy={C} r={44} fill="url(#rings-core)" stroke="rgba(167,139,250,0.4)" />
      </svg>
    </div>
  );
}

/** A thin orbit diagram (empty states, section dividers). */
export function OrbitMark({ className }) {
  return (
    <div className={cn("flex items-center justify-center gap-6", className)} aria-hidden="true">
      <span className="h-px w-24 bg-gradient-to-r from-transparent to-accent/60 sm:w-40" />
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <path d="M16 2 C17 11 21 15 30 16 C21 17 17 21 16 30 C15 21 11 17 2 16 C11 15 15 11 16 2 Z" fill="none" stroke="#A78BFA" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span className="h-px w-24 bg-gradient-to-l from-transparent to-accent/60 sm:w-40" />
    </div>
  );
}
