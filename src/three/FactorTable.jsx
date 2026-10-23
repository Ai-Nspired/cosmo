import { MonoLabel, Panel } from "../ui";
import { NINE_MISSING_HINT, NINE_LABELS } from "../../lib/match9";

export function FactorTable({ factors, missing = [], a, b }) {
  return (
    <div>
      <ul className="border-t border-line">
        {factors.map((f) => (
          <li key={f.key} className="sweep grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-line px-1 py-3">
            <div>
              <p className="text-[16px] font-[550] text-ink">{f.label}</p>
              {f.directional ? (
                <>
                  <p className="text-[14px] leading-snug text-muted">{f.detailAB}</p>
                  <p className="text-[14px] leading-snug text-muted">{f.detailBA}</p>
                </>
              ) : (
                <p className="text-[14px] leading-snug text-muted">{f.detail}</p>
              )}
            </div>
            <div className="num text-right font-mono text-[13px] tracking-[0.04em]">
              {f.directional ? (
                <>
                  <p className="text-accent">{a} to {b}: {f.ab}</p>
                  <p className="text-primary">{b} to {a}: {f.ba}</p>
                </>
              ) : (
                <p className="text-[18px] font-semibold text-ink">{f.ab}</p>
              )}
              <p className="text-[11px] text-muted">weight {Math.round(f.weight * 100)}%</p>
            </div>
          </li>
        ))}
      </ul>
      {missing.length > 0 && (
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          Not used this time: {missing.map((k) => `${NINE_LABELS[k]} (${NINE_MISSING_HINT[k] || "missing data"})`).join("; ")}. The other weights are scaled up to fill the gap.
        </p>
      )}
    </div>
  );
}

export function ReadingPair({ result }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[result.ab, result.ba].map((r, i) => (
        <article key={r.title} className="rounded-theme border border-line bg-bg/40 p-5">
          <h3 className="text-[18px] font-[550] text-ink">{r.title}</h3>
          <MonoLabel className={`mt-2 ${i === 0 ? "text-accent" : "text-primary"}`}>{r.score} / 100</MonoLabel>
          <p className="mt-3 text-[16px] leading-[1.6] text-ink/90">{r.text}</p>
        </article>
      ))}
    </div>
  );
}

export default function NineResult({ result, a, b }) {
  return (
    <Panel className="p-5 md:p-8" aria-live="polite">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
        <span className="num text-[clamp(52px,6vw,72px)] font-semibold leading-none tracking-[-0.04em] text-ink">{result.score}</span>
        <span className="pb-1 font-mono text-[12px] tracking-[0.06em] text-muted">/ 100 · {result.used} of 9 factors</span>
      </div>
      <p className="mt-2 text-[15px] text-muted">The headline score is the average of both directions: {a} to {b} is {result.ab.score}, {b} to {a} is {result.ba.score}.</p>
      <div className="mt-6"><ReadingPair result={result} /></div>
      <div className="mt-8"><FactorTable factors={result.factors} missing={result.missing} a={a} b={b} /></div>
      <p className="mt-5 text-[14px] leading-relaxed text-muted">For entertainment and reflection. Every weight is published on the Method page.</p>
    </Panel>
  );
}
