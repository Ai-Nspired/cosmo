import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Search, ArrowRight } from "lucide-react";
import { Page, cn } from "@wron/kit";
import { Container, MonoLabel } from "../components/ui";
import { GUIDE_GROUPS, searchGuides } from "../data/guides";

const group = (key) => GUIDE_GROUPS.find((g) => g.key === key);

function Heading({ children, count }) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4">
      <h2 className="h-section text-ink">{children}</h2>
      {count != null && <MonoLabel as="span">{count} guides</MonoLabel>}
    </div>
  );
}

function SignsIndex({ items }) {
  return (
    <ul className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map((i, n) => (
        <li key={i.to} className="border-b border-r border-line">
          <Link to={i.to} className="sweep sweep-violet group flex min-h-[64px] items-center gap-4 px-5 py-4 transition-colors hover:bg-accent/10">
            <span className="glyph w-9 text-center text-[30px] leading-none text-primary transition-colors group-hover:text-accent">{i.glyph}</span>
            <span className="flex-1">
              <span className="block text-[17px] font-[550] text-ink">{i.label}</span>
              <span className="block font-mono text-[11px] tracking-[0.06em] text-muted">{i.sub}</span>
            </span>
            <ArrowRight className="h-4 w-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AnimalsIndex({ items }) {
  const half = Math.ceil(items.length / 2);
  const cols = items.length === 12 ? [items.slice(0, 6), items.slice(6)] : [items.slice(0, half), items.slice(half)];
  return (
    <div className="grid border-l border-t border-line md:grid-cols-2">
      {cols.map((col, c) => (
        <ul key={c} className="md:[&:first-child]:border-r md:[&:first-child]:border-line">
          {col.map((i) => {
            const num = parseInt(String(i.sub).replace(/\D/g, ""), 10) || 0;
            return (
              <li key={i.to} className="border-b border-r border-line md:border-r-0">
                <Link to={i.to} className="sweep sweep-violet group flex min-h-[56px] items-center gap-4 px-5 py-3 transition-colors hover:bg-accent/10">
                  <span className="num w-8 font-mono text-[12px] tracking-[0.06em] text-muted">{String(num).padStart(2, "0")}</span>
                  <span className="flex-1 text-[17px] font-[550] text-ink group-hover:text-accent">{i.label}</span>
                  <span className="hidden font-mono text-[11px] tracking-[0.06em] text-muted sm:inline">5 elements</span>
                  <ArrowRight className="h-4 w-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}

function NumbersIndex({ items }) {
  return (
    <ul className="grid grid-cols-3 border-l border-t border-line sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
      {items.map((i) => (
        <li key={i.to} className={cn("border-b border-r border-line", i.master && "bg-accent/[0.04] ring-1 ring-inset ring-accent/70")}>
          <Link
            to={i.to}
            aria-label={i.master ? `${i.label}, master number` : `Number ${i.label}`}
            className={cn("sweep group flex h-28 flex-col items-center justify-center gap-1 px-1 transition-colors", i.master ? "sweep-violet hover:bg-accent/15" : "hover:bg-primary/10")}
          >
            <span className={cn("num text-[44px] font-semibold leading-none tracking-[-0.04em]", i.master ? "text-accent glow-violet" : "text-primary")}>{i.label}</span>
            {i.master && <span className="text-center font-mono text-[11px] leading-tight tracking-[0.06em] text-accent">Master number</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CoreIndex({ items }) {
  return (
    <ul className="border-t border-line">
      {items.map((i) => (
        <li key={i.to} className="border-b border-line">
          <Link to={i.to} className="sweep group grid min-h-[72px] items-center gap-1 px-2 py-4 transition-colors hover:bg-primary/5 md:grid-cols-[260px_1fr_auto] md:gap-8 md:px-5">
            <span className="text-[18px] font-[550] text-ink group-hover:text-primary">{i.label}</span>
            <span className="text-[16px] leading-[1.6] text-muted md:border-l md:border-line md:pl-8">{i.sub}</span>
            <ArrowRight className="hidden h-4 w-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-primary md:block" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

const RENDER = { signs: SignsIndex, animals: AnimalsIndex, numbers: NumbersIndex, core: CoreIndex };

export default function Guides() {
  const [q, setQ] = useState("");
  const groups = useMemo(() => searchGuides(q), [q]);
  const searching = q.trim().length > 0;

  return (
    <Page title="Guides" description="Guides to all 12 sun signs, 12 Chinese zodiac animals, numbers 1 to 9 and master numbers 11, 22 and 33, plus every Core Number type.">
      <section className="border-b border-line">
        <Container className="grid gap-8 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-5">
            <h1 className="display text-[48px] text-ink md:text-[64px]">Guides</h1>
            <p className="mt-4 max-w-sm text-[17px] leading-[1.6] text-muted">Explore the systems used in your profile and daily check-in.</p>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-3">
            <label htmlFor="guide-search" className="sr-only">Search a sign, animal or number</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                id="guide-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search a sign, animal or number"
                autoComplete="off"
                className="block min-h-[56px] w-full rounded-theme border border-line bg-surface/60 pl-12 pr-4 text-[18px] text-ink placeholder:text-muted/80 transition-colors hover:border-ink/25 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <p className="mt-2 font-mono text-[12px] tracking-[0.06em] text-muted" role="status" aria-live="polite">
              {searching ? `${groups.reduce((a, g) => a + g.items.length, 0)} matches` : "36 guides in 4 systems"}
            </p>
          </div>
        </Container>
      </section>

      <Container className="space-y-16 py-12 pb-24 md:py-16">
        {groups.length === 0 && (
          <div className="rounded-theme border border-line bg-surface px-6 py-12 text-center">
            <p className="text-[18px] text-ink">No guide matches that search.</p>
            <button type="button" onClick={() => setQ("")} className="mt-4 min-h-[44px] rounded-theme border border-line px-5 text-[14px] font-[550] text-ink hover:border-primary/60 hover:text-primary">Clear search</button>
          </div>
        )}
        {groups.map((g) => {
          const View = RENDER[g.key];
          return (
            <section key={g.key} aria-labelledby={`g-${g.key}`}>
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <h2 id={`g-${g.key}`} className="h-section text-ink">{g.label}</h2>
                {searching && <MonoLabel as="span">{g.items.length} of {group(g.key).items.length}</MonoLabel>}
              </div>
              <View items={g.items} />
            </section>
          );
        })}
      </Container>
    </Page>
  );
}
