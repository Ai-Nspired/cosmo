import { Link } from "react-router";
import { Container, MonoLabel } from "../ui";
import { ANIMALS } from "../../lib/engine";

function YearIndex({ active, name }) {
  const C = 200;
  const pt = (r, i) => {
    const a = ((i * 30 - 90) * Math.PI) / 180;
    return [C + r * Math.cos(a), C + r * Math.sin(a)];
  };
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={`Twelve-animal year index, ${name} highlighted`} className="h-full w-full">
      <defs>
        <radialGradient id="zg-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="rgba(45,212,163,0.16)" />
          <stop offset="1" stopColor="rgba(11,13,16,0)" />
        </radialGradient>
        <filter id="zg-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx={C} cy={C} r={198} fill="url(#zg-bg)" />
      <circle cx={C} cy={C} r={186} fill="#0B0D10" stroke="rgba(45,212,163,0.55)" strokeWidth="1.5" />
      <circle cx={C} cy={C} r={126} fill="#12161B" stroke="rgba(45,212,163,0.3)" />
      <circle cx={C} cy={C} r={70} fill="#0B0D10" stroke="rgba(167,139,250,0.35)" />
      {ANIMALS.map((a, i) => {
        const [x, y] = pt(156, i);
        const [x1, y1] = pt(186, i + 0.5);
        const [x2, y2] = pt(126, i + 0.5);
        const on = i === active;
        return (
          <g key={a}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(140,150,163,0.3)" />
            {on && <circle cx={x} cy={y} r={26} fill="rgba(167,139,250,0.25)" stroke="#A78BFA" strokeWidth="2" filter="url(#zg-glow)" />}
            <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={on ? 13 : 12} fontWeight={on ? 600 : 400} fill={on ? "#EEF2F6" : "rgba(238,242,246,0.7)"} style={{ fontFamily: "Geist, sans-serif" }}>
              {a}
            </text>
          </g>
        );
      })}
      <text x={C} y={C - 4} textAnchor="middle" fontSize="34" fontWeight="600" fill="#EEF2F6" style={{ fontFamily: "Geist, sans-serif" }}>{active + 1}</text>
      <text x={C} y={C + 22} textAnchor="middle" fontSize="11" fill="#8C96A3" style={{ fontFamily: "Geist Mono, monospace", letterSpacing: "0.06em" }}>OF 12</text>
    </svg>
  );
}

export default function Masthead({ guide, note }) {
  return (
    <section className="midnight-glow border-b border-line">
      <Container className="pb-12 pt-6 md:pb-16">
        <nav aria-label="Breadcrumb" className="font-mono text-[12px] tracking-[0.06em] text-muted">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <li><Link to="/guides" className="inline-flex min-h-[32px] items-center hover:text-ink">Guides</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/guides" className="inline-flex min-h-[32px] items-center hover:text-ink">Chinese zodiac</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-primary">{guide.name}</li>
          </ol>
        </nav>
        <div className="mt-8 grid items-center gap-8 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            <MonoLabel className="mb-4">Chinese zodiac · No. {guide.index + 1} of 12</MonoLabel>
            <h1 className="display text-[clamp(3.5rem,8vw,7.5rem)] text-ink">{guide.name}</h1>
            <p className="mt-3 text-[15px] text-primary">{guide.keywords.join(" · ")}</p>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-muted">{note}</p>
          </div>
          <div className="mx-auto aspect-square w-full max-w-[420px] md:col-span-5 md:max-w-none">
            <YearIndex active={guide.index} name={guide.name} />
          </div>
        </div>
      </Container>
    </section>
  );
}
