import { useState } from "react";
import { cn } from "@wron/kit";
import { ELEMENTS, ELEMENT_INFO, elementVariant } from "../../data/animals";

const BAR = { Wood: "bg-primary", Fire: "bg-accent", Earth: "bg-muted", Metal: "bg-ink", Water: "bg-sky-400" };

export default function Elements({ guide }) {
  const [el, setEl] = useState("Wood");
  const v = elementVariant(guide.name, el);
  const info = ELEMENT_INFO[el];
  return (
    <section className="pt-14" aria-labelledby="el-h">
      <div className="flex items-center gap-4">
        <span className="h-px w-12 bg-primary/70" aria-hidden="true" />
        <h2 id="el-h" className="h-section text-ink">Five elements</h2>
      </div>
      <p className="mt-4 max-w-2xl text-[17px] leading-[1.6] text-muted md:pl-16">
        Each element shapes the {guide.name}'s energy in its own way. Choose an element to see its variant and supported years.
      </p>
      <div role="tablist" aria-label="Element" className="mt-8 grid grid-cols-5 divide-x divide-line rounded-theme border border-line bg-surface">
        {ELEMENTS.map((e) => {
          const on = e === el;
          return (
            <button key={e} role="tab" aria-selected={on} aria-controls="el-panel" type="button" onClick={() => setEl(e)}
              className={cn("relative min-h-[56px] px-1 text-[14px] font-[550] transition-colors sm:text-[16px]", on ? "text-ink" : "text-muted hover:text-ink")}>
              {e}
              <span className={cn("absolute inset-x-2 bottom-0 h-[2px] transition-opacity", BAR[e], on ? "opacity-100" : "opacity-30")} />
            </button>
          );
        })}
      </div>
      <div id="el-panel" role="tabpanel" className="mt-6 rounded-theme border border-line bg-surface p-5 md:p-6">
        <dl className="divide-y divide-line">
          <div className="grid gap-1 py-4 sm:grid-cols-[220px_1fr]">
            <dt className="font-mono text-[13px] tracking-[0.06em] text-muted">Element variant</dt>
            <dd className="text-[17px] leading-[1.6] text-ink"><strong className="font-[550]">{v.title}</strong> <span className="text-muted">({info.color})</span><p className="mt-2 text-muted">{v.text}</p></dd>
          </div>
          <div className="grid gap-1 py-4 sm:grid-cols-[220px_1fr]">
            <dt className="font-mono text-[13px] tracking-[0.06em] text-muted">Supported years</dt>
            <dd className="num text-[17px] leading-[1.6] text-ink">{v.years.length ? v.years.join(", ") : "None in the supported range"}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
