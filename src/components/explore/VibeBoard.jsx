import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles, Sun, PawPrint, Clover, Star, Gauge } from "lucide-react";
import { cn } from "@wron/kit";
import { MonoLabel, Panel, BigNumber, MasterBadge, ArrowLink, Glyph } from "../ui";
import { useProfile } from "../ProfileProvider";
import { dayVibe, msUntilMidnight } from "../../lib/explore";
import { localDateKey, parseDate, MONTHS } from "../../lib/engine";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function useCountUp(value, reduce) {
  const [v, setV] = useState(value);
  useEffect(() => {
    if (reduce || typeof value !== "number") { setV(value); return; }
    let raf; const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 700);
      setV(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduce]);
  return v;
}

function weekFrom(todayKey) {
  const t = parseDate(todayKey);
  if (!t) return [];
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(t.y, t.m - 1, t.d + i);
    return { key: localDateKey(d), dow: DAYS[d.getDay()], label: `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}`, long: `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` };
  });
}

function Orbit({ pulse, reduce }) {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className="mx-auto h-24 w-full max-w-[220px]">
      <ellipse cx="100" cy="60" rx="86" ry="44" fill="none" stroke="rgba(167,139,250,0.35)" strokeDasharray="2 5" />
      <path d="M22 60 L100 60 M100 60 L158 34 M100 60 L158 86" stroke="rgba(45,212,163,0.45)" strokeWidth="1" fill="none" />
      <circle cx="22" cy="60" r="5" fill="#A78BFA" />
      <circle cx="158" cy="34" r="4" fill="#2DD4A3" />
      <circle cx="158" cy="86" r="4" fill="#2DD4A3" />
      <circle cx="100" cy="60" r="7" fill="#0B0D10" stroke="#EEF2F6" />
      {!reduce && pulse > 0 && (
        <motion.circle key={pulse} cx="100" cy="60" r="7" fill="none" stroke="#A78BFA" initial={{ r: 7, opacity: 0.9 }} animate={{ r: 60, opacity: 0 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} />
      )}
    </svg>
  );
}

function Signal({ icon: Icon, label, children, tone }) {
  return (
    <div className="sweep rounded-theme border border-line bg-bg/40 p-4">
      <div className="flex items-center gap-3">
        <Icon className={cn("h-5 w-5", tone)} aria-hidden="true" />
        <h3 className="text-[17px] font-[550] text-ink">{label}</h3>
      </div>
      <p className="mt-3 text-[16px] leading-[1.6] text-muted">{children}</p>
    </div>
  );
}

function Stat({ icon: Icon, label, children }) {
  return (
    <div className="border-t border-line py-4 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-2"><Icon className="h-4 w-4 text-accent" aria-hidden="true" /><MonoLabel>{label}</MonoLabel></div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default function VibeBoard() {
  const { hydrated, computed } = useProfile();
  const reduce = useReducedMotion();
  const [today, setToday] = useState(null);
  const [pick, setPick] = useState(0);
  const [pulse, setPulse] = useState(0);

  useEffect(() => { setToday(localDateKey()); }, []);
  useEffect(() => {
    if (!today) return;
    const id = setTimeout(() => { setToday(localDateKey()); setPick(0); setPulse((p) => p + 1); }, msUntilMidnight());
    return () => clearTimeout(id);
  }, [today]);

  const week = useMemo(() => (today ? weekFrom(today) : []), [today]);
  const day = week[pick];
  const vibe = useMemo(() => (computed && day ? dayVibe(computed, day.key) : null), [computed, day]);
  const pdNum = useCountUp(vibe ? vibe.personalDay.value : null, reduce);
  const score = useCountUp(vibe ? vibe.score : null, reduce);
  const dash = <span className="text-muted">—</span>;

  return (
    <section aria-labelledby="vibe-h" className="mx-auto max-w-[1200px]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Sparkles className="h-7 w-7 text-accent" aria-hidden="true" />
          <h2 id="vibe-h" className="h-section text-ink">Day's Vibe</h2>
        </div>
        <MonoLabel as="p" aria-live="polite">{day ? `${day.long} · ` : ""}Refreshes at local midnight</MonoLabel>
      </div>

      <div role="group" aria-label="Choose a day" className="mt-6 grid grid-cols-7 border-b border-line">
        {week.map((w, i) => (
          <button key={w.key} type="button" onClick={() => setPick(i)} aria-pressed={pick === i}
            className={cn("relative min-h-[56px] px-1 py-2 text-center transition-colors", pick === i ? "text-primary" : "text-muted hover:text-ink")}>
            <span className="block font-mono text-[11px] tracking-[0.06em]">{i === 0 ? "TODAY" : w.dow}</span>
            <span className="block text-[13px] font-[550] sm:text-[15px]">{w.label}</span>
            <span className={cn("absolute inset-x-1 -bottom-px h-[2px] bg-primary transition-opacity", pick === i ? "opacity-100" : "opacity-0")} />
          </button>
        ))}
      </div>

      <motion.div
        key={`${computed?.name}-${computed?.birthdate}-${day?.key}`}
        initial={reduce ? false : { opacity: 0, clipPath: "inset(6% 3% 6% 3%)" }}
        animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6"
      >
        <Panel className="p-5 md:p-8">
          {hydrated && !computed && <p className="mb-6 text-[16px] text-muted">Your reading appears here once you create a profile.</p>}
          {computed && !vibe && <p className="mb-6 text-[16px] text-muted">Day's Vibe needs a Chinese animal, and this birthdate is out of range.</p>}

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
            {/* Personal Day */}
            <div className="lg:col-span-4">
              <h3 className="text-[22px] font-[550] text-ink">Personal Day</h3>
              <div className="mt-5 flex items-end gap-4">
                <BigNumber value={vibe ? pdNum : "—"} master={vibe?.personalDay.master} className="!text-[clamp(64px,6vw,72px)]" />
                {vibe?.personalDay.master && <MasterBadge base={vibe.personalDay.base} className="mb-2" />}
              </div>
              <p className="mt-4 font-mono text-[12px] leading-[1.6] tracking-[0.06em] text-muted">{vibe ? vibe.personalDayFormula : "Personal Year + month + day"}</p>
              <div className="mt-4 hidden lg:block"><Orbit pulse={pulse} reduce={reduce} /></div>
            </div>

            {/* Signals */}
            <div className="space-y-3 lg:col-span-4">
              <Signal icon={Sun} label="Sign influence" tone="text-primary">{vibe ? vibe.sign.text : dash}</Signal>
              <Signal icon={PawPrint} label="Animal influence" tone="text-accent">{vibe ? vibe.animal.text : dash}</Signal>
            </div>

            {/* Combined */}
            <div className="lg:col-span-4 lg:border-l lg:border-line lg:pl-6">
              <Stat icon={Star} label="Today's vibe">
                <p className="text-[26px] font-[550] leading-tight text-ink">{vibe ? vibe.mood : dash}</p>
                {vibe && <p className="mt-1 text-[16px] text-muted">{vibe.headline}</p>}
              </Stat>
              <Stat icon={Gauge} label="Vibe score">
                <p className="num text-[32px] font-semibold leading-none text-ink">{vibe ? score : dash}{vibe && <span className="text-[16px] font-normal text-muted"> / 100</span>}</p>
              </Stat>
              <Stat icon={Clover} label="Lucky number or colour">
                {vibe ? (
                  <p className="flex items-center gap-3 text-[17px] text-ink">
                    <span className="num text-[24px] font-semibold">{vibe.luckyNumber}</span>
                    <span className="h-3 w-3 rounded-full" style={{ background: vibe.luckyColor.hex }} aria-hidden="true" />
                    {vibe.luckyColor.name}
                  </p>
                ) : dash}
              </Stat>
              <Stat icon={Sparkles} label="Try today">
                <p className="text-[17px] leading-[1.6] text-ink">{vibe ? vibe.tip : dash}</p>
              </Stat>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14px] leading-relaxed text-muted">The same saved profile and local date always produce the same result.</p>
            <ArrowLink to="/method">See how this was calculated</ArrowLink>
          </div>
        </Panel>
      </motion.div>
      {!computed && hydrated && (
        <p className="mt-4 text-[14px] text-muted">Want to compare people instead? <Link className="text-primary underline" to="/explore?tab=compatibility">Open Compatibility</Link>.</p>
      )}
    </section>
  );
}
