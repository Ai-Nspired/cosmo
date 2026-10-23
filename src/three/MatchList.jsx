import { useMemo, useState } from "react";
import { ChevronDown, Flag, Share2 } from "lucide-react";
import { toast, cn } from "@wron/kit";
import { Panel, MonoLabel, Button } from "../ui";
import { SIGNS } from "../../lib/engine";
import { compat9, personaFromRow } from "../../lib/match9";
import { shareOrCopy } from "../../lib/share";
import { FactorTable, ReadingPair } from "./FactorTable";
import ReportDialog from "./ReportDialog";

const norm = (s) => String(s || "").trim().toLowerCase();

function Card({ item, rank, me, onReport }) {
  const [open, setOpen] = useState(false);
  const { row, them, r, near } = item;
  const top = rank === 0;
  const line = [
    `Sun ${SIGNS[them.sun]?.name}`, them.moon >= 0 && `Moon ${SIGNS[them.moon]?.name}`, them.rising >= 0 && `Rising ${SIGNS[them.rising]?.name}`,
    `${them.element} ${them.animal}`, them.lifePath > 0 && `Life Path ${them.lifePath}`,
  ].filter(Boolean).join(" · ");
  return (
    <li className={cn("rounded-theme border bg-surface p-5", top ? "border-accent/60 shadow-[0_0_50px_-28px_rgba(167,139,250,0.8)]" : "border-line")}>
      <div className="flex items-start gap-4">
        <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-[20px] font-semibold", top ? "border-accent/70 text-accent" : "border-line text-ink")} aria-hidden="true">{String(row.display_name || "?").slice(0, 1).toUpperCase()}</span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">No. {String(rank + 1).padStart(2, "0")}{near ? " · Near you" : ""}</p>
          <h3 className="break-words text-[20px] font-[550] leading-tight tracking-[-0.02em] text-ink">{row.display_name}</h3>
          <p className="mt-1 text-[14px] text-muted">{row.area} · Looking for {String(row.looking_for || "either").toLowerCase()}</p>
        </div>
        <div className="text-right">
          <p className={cn("num text-[44px] font-semibold leading-none tracking-[-0.04em]", top ? "text-accent glow-violet" : "text-ink")}>{r.score}</p>
          <p className="mt-1 font-mono text-[11px] tracking-[0.06em] text-muted">{r.used} of 9</p>
        </div>
      </div>
      <p className="mt-4 font-mono text-[12px] leading-[1.7] tracking-[0.04em] text-muted">{line}</p>
      {row.bio && <p className="mt-3 text-[16px] leading-[1.6] text-ink/90">{row.bio}</p>}
      {row.reach_me && <p className="mt-3 text-[15px] text-ink/90"><span className="font-mono text-[12px] uppercase tracking-[0.06em] text-primary">Reach them: </span>{row.reach_me}</p>}
      <div className="mt-3 flex flex-wrap items-center gap-x-5">
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-[550] text-primary hover:text-ink">
          {open ? "Hide nine factors" : "Show nine factors"}
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => onReport(row)} className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] text-muted hover:text-ink"><Flag className="h-4 w-4" aria-hidden="true" />Report</button>
      </div>
      {open && (
        <div className="mt-3 space-y-5">
          <ReadingPair result={r} />
          <FactorTable factors={r.factors} missing={r.missing} a={me.name} b={them.name} />
        </div>
      )}
    </li>
  );
}

export default function MatchList({ rows, me, myArea }) {
  const [scope, setScope] = useState("all");
  const [report, setReport] = useState(null);
  const items = useMemo(() => {
    const m = norm(myArea);
    return rows
      .map((row) => {
        const them = personaFromRow(row);
        const a = norm(row.area);
        return { row, them, r: compat9(me, them), near: !!m && !!a && (a === m || a.includes(m) || m.includes(a)) };
      })
      .sort((x, y) => y.r.score - x.r.score);
  }, [rows, me, myArea]);
  const shown = scope === "area" ? items.filter((i) => i.near) : items;

  async function invite() {
    const res = await shareOrCopy(`${window.location.origin}/premium`, "Cosmic Profile & Synergy");
    if (res === "copied") toast.success("Link copied");
  }

  return (
    <section aria-labelledby="cm-h" className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="cm-h" className="h-section text-ink">Cosmic Matches</h2>
          <MonoLabel className="mt-2">{items.length} {items.length === 1 ? "member" : "members"} ranked by nine-factor score</MonoLabel>
        </div>
        <div role="group" aria-label="Show" className="inline-flex overflow-hidden rounded-theme border border-line bg-surface">
          {[["all", "Everywhere"], ["area", "Near me"]].map(([k, l]) => (
            <button key={k} type="button" aria-pressed={scope === k} onClick={() => setScope(k)} className={cn("min-h-[44px] px-5 text-[15px] font-[550] transition-colors", scope === k ? "bg-primary text-primary-ink" : "text-ink hover:text-primary")}>{l}</button>
          ))}
        </div>
      </div>
      {shown.length === 0 ? (
        <Panel className="mt-6 px-6 py-10 text-center">
          <p className="text-[18px] text-ink">{items.length === 0 ? "You are one of the first members." : "No members near you yet."}</p>
          <p className="mx-auto mt-2 max-w-md text-[16px] leading-[1.6] text-muted">{items.length === 0 ? "Matches appear here as people join. Invite someone you think would fit." : "Switch to Everywhere to see every member, or invite someone from your area."}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button variant="secondary" icon={Share2} onClick={invite}>Copy invite link</Button>
            {scope === "area" && <Button variant="secondary" onClick={() => setScope("all")}>Show everywhere</Button>}
          </div>
        </Panel>
      ) : (
        <ul className="mt-6 grid gap-4 lg:grid-cols-2">
          {shown.map((it, i) => <Card key={it.row.id} item={it} rank={i} me={me} onReport={setReport} />)}
        </ul>
      )}
      <ReportDialog key={report?.id || "none"} row={report} onClose={() => setReport(null)} />
    </section>
  );
}
