import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CountUp, cn } from "@wron/kit";
import { Container, MonoLabel, ArrowLink, MasterBadge, SectionHeading } from "../ui";
import { useProfile } from "../ProfileProvider";
import { seeded, localDateKey } from "../../lib/engine";
import { CORE_GUIDES, SKIP_RULE } from "../../data/coreNumbers";
import { getNumberGuide } from "../../data/numbers";
import { numberPath, corePath } from "../../data/guides";
import { Assemble } from "./Reading";

const CODES = { expression: "EXP · all letters", soulUrge: "SOUL · vowels", personality: "PER · consonants", birthday: "BD · day of month", destiny: "DST · synthesis" };
const EMPTY = { expression: "No mappable letters in this name.", soulUrge: "No vowels (A, E, I, O, U) in this name, so there is no Soul Urge.", personality: "No consonants in this name, so there is no Personality number." };

function Calc({ k, r, p }) {
  return (
    <div className="mt-3 space-y-2 rounded-theme border border-line bg-bg/60 p-3 font-mono text-[12px] leading-[1.7] tracking-[0.04em] text-muted">
      {r.letters && (
        <p className="flex flex-wrap gap-1.5">
          {r.letters.map((l, i) => (
            <span key={i} className="rounded border border-line px-1.5 text-ink/85">{l.letter}<span className="text-primary">{l.value}</span></span>
          ))}
        </p>
      )}
      {k === "birthday" && <p>Day {p.d}</p>}
      {k === "destiny" && <p>{r.formula}</p>}
      <p className="text-ink/90">Total {r.total} → {r.trail.join(" → ")}{r.master ? " (kept whole)" : ""}</p>
      {r.letters && p.skipped.length > 0 && <p>Skipped: {p.skipped.join(" ")}. {SKIP_RULE}</p>}
    </div>
  );
}

function Cell({ k, r, p }) {
  const [open, setOpen] = useState(false);
  const meta = CORE_GUIDES.find((c) => c.key === k);
  const g = r ? getNumberGuide(r.value) : null;
  const id = `calc-${k}`;
  return (
    <article className="sweep flex flex-col border-t border-line py-6 lg:border-l lg:border-t-0 lg:px-6 lg:py-2 lg:first:border-l-0 lg:first:pl-0">
      <div className="flex items-start justify-between gap-4 lg:block">
        <div>
          <h3 className="text-[20px] font-[550] tracking-[-0.02em] text-ink">{meta.name}</h3>
          <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.06em] text-muted">{CODES[k]}</p>
        </div>
        <p className={cn("num text-[clamp(52px,5vw,72px)] font-semibold leading-none tracking-[-0.04em] lg:mt-5", r?.master ? "text-accent glow-violet" : "text-ink")}>
          {r ? <CountUp to={r.value} /> : "–"}
        </p>
      </div>
      <div className="mt-3 min-h-[28px]">{r?.master && <MasterBadge base={r.base} />}</div>
      {r ? (
        <>
          <p className="mt-3 text-[15px] font-[550] text-primary">{g.title}</p>
          <p className="mt-2 text-[16px] leading-[1.6] text-ink/85 max-md:text-[17px]">{meta.describes}</p>
          <dl className="mt-4 space-y-3 text-[15px] leading-[1.6]">
            <div><dt className="mono-label">Traits</dt><dd className="mt-1 text-ink/85">{g.traits}</dd></div>
            <div><dt className="mono-label">Strengths</dt><dd className="mt-1 text-ink/85">{g.strengths.join(". ")}.</dd></div>
            <div><dt className="mono-label">Challenges</dt><dd className="mt-1 text-ink/85">{g.challenges.join(". ")}.</dd></div>
            <div><dt className="mono-label">Tip</dt><dd className="mt-1 text-ink/85">{seeded(g.tips, `${p.name}|${k}|${localDateKey()}`)}</dd></div>
          </dl>
          <div className="mt-auto pt-4">
            <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-[550] text-ink/85 hover:text-primary">
              {open ? "Hide calculation" : "Show calculation"}
              <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
            </button>
            {open && <div id={id}><Calc k={k} r={r} p={p} /></div>}
            <div className="flex flex-wrap gap-x-5">
              <ArrowLink to={numberPath(r.value)}>Open guide</ArrowLink>
              <ArrowLink to={corePath(meta.slug)} className="text-muted">About {meta.name}</ArrowLink>
            </div>
          </div>
        </>
      ) : (
        <p className="mt-3 text-[15px] leading-[1.6] text-muted">{EMPTY[k]}</p>
      )}
    </article>
  );
}

function Node({ label, value, master }) {
  return (
    <div className="flex flex-col items-center">
      <span className={cn("num flex h-16 w-16 items-center justify-center rounded-full border text-[24px] font-semibold", master ? "border-accent/70 text-accent ring-violet" : "border-primary/50 text-ink")}>{value}</span>
      <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">{label}</span>
    </div>
  );
}

function Destiny({ p }) {
  const r = p.destiny;
  const [open, setOpen] = useState(false);
  if (!r) return null;
  const g = getNumberGuide(r.value);
  const meta = CORE_GUIDES.find((c) => c.key === "destiny");
  return (
    <Assemble as="article" className="mt-8 grid gap-8 rounded-theme border border-line bg-bg/50 p-5 md:p-8 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h3 className="text-[24px] font-[550] tracking-[-0.02em] text-ink">Destiny</h3>
        <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.06em] text-muted">{CODES.destiny}</p>
        <div className="mt-8 flex items-start justify-between gap-2" aria-label={`Life Path ${p.lifePath.value} plus Expression ${p.expression.value} gives Destiny ${r.value}`}>
          <Node label="Life Path" value={p.lifePath.value} master={p.lifePath.master} />
          <span className="mt-8 h-px flex-1 bg-gradient-to-r from-primary/60 to-accent/60" aria-hidden="true" />
          <Node label="Expression" value={p.expression.value} master={p.expression.master} />
          <span className="mt-8 h-px flex-1 bg-gradient-to-r from-accent/60 to-accent" aria-hidden="true" />
          <div className="flex flex-col items-center">
            <span className={cn("num text-[clamp(52px,5vw,72px)] font-semibold leading-none tracking-[-0.04em]", r.master ? "text-accent glow-violet" : "text-ink")}><CountUp to={r.value} /></span>
            <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">Destiny</span>
          </div>
        </div>
        {r.master && <MasterBadge base={r.base} className="mt-6" />}
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-[550] text-ink/85 hover:text-primary">
          {open ? "Hide calculation" : "Show calculation"}
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
        </button>
        {open && <Calc k="destiny" r={r} p={p} />}
      </div>
      <div className="lg:col-span-7">
        <p className="text-[15px] font-[550] text-primary">{g.title}</p>
        <p className="mt-2 text-[17px] leading-[1.6] text-ink">{meta.describes}</p>
        <p className="mt-4 text-[16px] leading-[1.6] text-ink/85">{g.overview} {g.traits}</p>
        <dl className="mt-6 grid gap-5 text-[15px] leading-[1.6] sm:grid-cols-3">
          <div className="border-t border-line pt-3"><dt className="mono-label">Strengths</dt><dd className="mt-2 text-ink/85">{g.strengths.join(". ")}.</dd></div>
          <div className="border-t border-line pt-3"><dt className="mono-label">Challenges</dt><dd className="mt-2 text-ink/85">{g.challenges.join(". ")}.</dd></div>
          <div className="border-t border-line pt-3"><dt className="mono-label">Tip</dt><dd className="mt-2 text-ink/85">{seeded(g.tips, `${p.name}|destiny|${localDateKey()}`)}</dd></div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-x-6">
          <ArrowLink to={numberPath(r.value)}>Open guide</ArrowLink>
          <ArrowLink to={corePath("destiny")} className="text-muted">How Destiny is calculated here</ArrowLink>
        </div>
      </div>
    </Assemble>
  );
}

export default function CoreConstellation() {
  const { computed: p } = useProfile();
  return (
    <section aria-labelledby="core-title" className="mt-6 md:mt-10">
      <Container>
        <Assemble className="rounded-theme border border-line bg-surface p-5 md:p-10">
          <div className="flex items-start gap-5">
            <svg viewBox="0 0 48 48" className="hidden h-12 w-12 shrink-0 sm:block" aria-hidden="true">
              <path d="M24 6 L40 24 L24 42 L8 24 Z" fill="none" stroke="#A78BFA" strokeWidth="1.4" />
              {[[24, 6], [40, 24], [24, 42], [8, 24]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="#12161B" stroke="#A78BFA" strokeWidth="1.4" />)}
            </svg>
            <SectionHeading as="h2" title={<span id="core-title">Core number constellation</span>} lead="Your key numbers and what they reveal about you. Each one comes from a different part of your name or birthdate." />
          </div>
          <MonoLabel className="mt-6">{p.masters.length ? `${p.masters.length} master ${p.masters.length === 1 ? "number" : "numbers"} found` : "No master numbers in this profile"}</MonoLabel>
          <div className="mt-6 grid border-t border-line pt-2 lg:mt-8 lg:grid-cols-4 lg:pt-8">
            {["expression", "soulUrge", "personality", "birthday"].map((k) => <Cell key={k} k={k} r={p[k]} p={p} />)}
          </div>
          <Destiny p={p} />
        </Assemble>
      </Container>
    </section>
  );
}
