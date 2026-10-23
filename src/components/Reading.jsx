import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@wron/kit";
import { MonoLabel } from "./ui";

/*
  ReadingColumns: the four reading fields as columns (desktop) / stacked (phone).
  reading = { traits: string, strengths: string[], challenges: string[], tips: string[] }
  tipLabel defaults to "Try today".
*/
export function ReadingColumns({ reading, tipLabel = "Try today", columns = 4, className }) {
  if (!reading) return null;
  const cols = [
    { label: "Traits", body: reading.traits },
    { label: "Strengths", list: reading.strengths },
    { label: "Challenges", list: reading.challenges },
    { label: tipLabel, list: reading.tips },
  ];
  return (
    <div className={cn("grid gap-x-8 gap-y-6", columns === 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2", className)}>
      {cols.map((c) => (
        <div key={c.label} className="border-t border-line pt-4">
          <MonoLabel as="h4" className={c.label === tipLabel ? "text-primary" : undefined}>{c.label}</MonoLabel>
          {c.body && <p className="mt-3 text-[17px] leading-[1.6] text-ink/90">{c.body}</p>}
          {c.list && (
            <ul className="mt-3 space-y-2">
              {c.list.map((x) => (
                <li key={x} className="flex gap-3 text-[17px] leading-[1.6] text-ink/90">
                  <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

/** Expandable calculation trail ("Show calculation"). lines: array of strings in Geist Mono. */
export function CalcTrail({ lines, label = "Show calculation", className }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="group inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-[550] text-muted transition-colors hover:text-primary"
      >
        {open ? "Hide calculation" : label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      <div id={id} hidden={!open} className="mt-1 rounded-theme border border-line bg-bg/70 p-3">
        {lines.map((l, i) => (
          <p key={i} className="num font-mono text-[12.5px] leading-relaxed tracking-[0.02em] text-ink/80 [overflow-wrap:anywhere]">{l}</p>
        ))}
      </div>
    </div>
  );
}

/**
 * Segmented control that switches content in place.
 * options = [{ value, label }], value, onChange
 */
export function Segmented({ options, value, onChange, label, className }) {
  return (
    <div role="tablist" aria-label={label} className={cn("inline-flex rounded-theme border border-line bg-surface p-1", className)}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            type="button"
            aria-selected={on}
            onClick={() => onChange(o.value)}
            className={cn(
              "min-h-[44px] rounded-[4px] px-5 text-[15px] font-[550] transition-colors",
              on ? "bg-primary text-primary-ink" : "text-muted hover:text-ink"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Key/value row used on Method and guide "profile connection" sections. Stacks on phones. */
export function DataRow({ label, children, className }) {
  return (
    <div className={cn("sweep grid gap-2 border-t border-line py-5 md:grid-cols-12 md:gap-8", className)}>
      <MonoLabel as="dt" className="md:col-span-3 md:pt-1">{label}</MonoLabel>
      <dd className="text-[17px] leading-[1.6] text-ink/90 md:col-span-9">{children}</dd>
    </div>
  );
}
