import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { Share2, Bookmark, Sparkles, Hash, Sun, PawPrint } from "lucide-react";
import { Button, Panel, MonoLabel, ArrowLink } from "../ui";

const polar = (deg, r = 100) => { const a = ((deg - 90) * Math.PI) / 180; return [120 + r * Math.cos(a), 120 + r * Math.sin(a)]; };
const arc = (from, to, sweep) => { const [x1, y1] = polar(from), [x2, y2] = polar(to); return `M${x1},${y1} A100,100 0 0 ${sweep} ${x2},${y2}`; };
const ICONS = { lifePath: Hash, sign: Sun, animal: PawPrint };

function Reading({ r, side, show, first, second }) {
  return (
    <motion.article
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-theme border border-line bg-bg/40 p-5"
      aria-label={r.title}
    >
      <div className="flex items-center gap-3">
        <Sparkles className={side === "ab" ? "h-5 w-5 text-accent" : "h-5 w-5 text-primary"} aria-hidden="true" />
        <h3 className="text-[19px] font-[550] text-ink">{r.title}</h3>
      </div>
      <MonoLabel className="mt-3">{first} to {second} · {r.score}/100</MonoLabel>
      <p className="mt-3 text-[17px] leading-[1.6] text-ink/90">{r.text}</p>
      <p className="mt-3 text-[14px] leading-snug text-muted">{r.direction.label}</p>
    </motion.article>
  );
}

export default function CompatResult({ data, onShare, onSaveBoth }) {
  const reduce = useReducedMotion();
  const { a, b, res } = data;
  const [show, setShow] = useState(!!reduce);
  const [n, setN] = useState(reduce ? res.score : 0);
  useEffect(() => {
    if (reduce) { setShow(true); setN(res.score); return; }
    setShow(false); setN(0);
    const t = setTimeout(() => setShow(true), 1000);
    let raf; const t0 = performance.now();
    const tick = (t1) => { const p = Math.min(1, (t1 - t0) / 1100); setN(Math.round(res.score * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [res, reduce]);

  const fa = a.name.split(" ")[0], fb = b.name.split(" ")[0];
  const dur = reduce ? 0 : 1.1;
  return (
    <Panel className="p-5 md:p-8" aria-live="polite">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_280px_1fr]">
        <div className="order-2 lg:order-1"><Reading r={res.ab} side="ab" show={show} first={fa} second={fb} /></div>
        <div className="order-1 mx-auto w-full max-w-[260px] lg:order-2">
          <div className="relative">
            <svg viewBox="0 0 240 240" className="h-full w-full" role="img" aria-label={`Compatibility score ${res.score} out of 100. ${fa} to ${fb}: ${res.ab.score}. ${fb} to ${fa}: ${res.ba.score}.`}>
              <circle cx="120" cy="120" r="70" fill="none" stroke="#28313B" />
              <circle cx="120" cy="120" r="100" fill="none" stroke="#28313B" strokeDasharray="1 6" />
              <motion.path key={`ab${res.score}${res.ab.score}`} d={arc(340, 200, 0)} fill="none" stroke="#A78BFA" strokeWidth="6" strokeLinecap="round" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }} style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.7))" }} />
              <motion.path key={`ba${res.score}${res.ba.score}`} d={arc(20, 160, 1)} fill="none" stroke="#2DD4A3" strokeWidth="6" strokeLinecap="round" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }} style={{ filter: "drop-shadow(0 0 6px rgba(45,212,163,0.7))" }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="num text-[clamp(52px,5vw,64px)] font-semibold leading-none tracking-[-0.04em] text-ink">{n}</span>
              <span className="mt-1 font-mono text-[12px] tracking-[0.06em] text-muted">/ 100</span>
            </div>
          </div>
          <p className="mt-2 flex justify-between font-mono text-[11px] tracking-[0.06em] text-muted"><span className="text-accent">{fa} → {fb}</span><span className="text-primary">{fb} → {fa}</span></p>
        </div>
        <div className="order-3"><Reading r={res.ba} side="ba" show={show} first={fb} second={fa} /></div>
      </div>

      <ul className="mt-8 border-t border-line">
        {res.factors.map((f) => {
          const Icon = ICONS[f.key];
          return (
            <li key={f.key} className="sweep grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line px-1 py-4">
              <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
              <div><p className="text-[16px] font-[550] text-ink">{f.label}</p><p className="text-[14px] leading-snug text-muted">{f.detail}</p></div>
              <p className="num font-mono text-[14px] text-ink">{f.score}</p>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-[14px] leading-relaxed text-muted">Compatibility is for entertainment and reflection. The approved scoring weights are published on the Method page.</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button variant="secondary" icon={Share2} onClick={onShare}>Share comparison</Button>
        <Button variant="secondary" icon={Bookmark} onClick={onSaveBoth}>Save both people</Button>
        <ArrowLink to="/method">Read the method</ArrowLink>
      </div>
    </Panel>
  );
}
