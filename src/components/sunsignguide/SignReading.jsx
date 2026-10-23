import { useEffect, useState } from "react";
import { cn } from "@wron/kit";

const ITEMS = [
  ["overview", "Overview"],
  ["traits", "Traits"],
  ["strengths", "Strengths"],
  ["challenges", "Challenges"],
  ["tips", "Practical tips"],
];

function List({ items }) {
  return (
    <ul className="mt-4 divide-y divide-line border-y border-line">
      {items.map((t) => (
        <li key={t} className="flex gap-3 py-3 text-[17px] leading-[1.6] text-ink/85">
          <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function SignReading({ g }) {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const els = ITEMS.map(([id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-20% 0px -65% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <aside className="hidden md:block">
        <nav aria-label="On this page" className="sticky top-24 border-l border-line">
          <ul>
            {ITEMS.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={cn(
                    "-ml-px flex min-h-[44px] items-center border-l-2 pl-6 text-[15px] transition-colors",
                    active === id ? "border-primary text-primary" : "border-transparent text-muted hover:text-ink"
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="max-w-2xl md:border-l md:border-line md:pl-12">
        <section id="overview" className="scroll-mt-24">
          <h2 className="h-section text-ink">Overview</h2>
          <p className="mt-4 text-[17px] leading-[1.6] text-ink/80">{g.overview}</p>
        </section>
        <section id="traits" className="mt-12 scroll-mt-24">
          <h2 className="h-section text-ink">Traits</h2>
          <p className="mt-4 text-[17px] leading-[1.6] text-ink/80">{g.traits}</p>
          <p className="mt-4 flex flex-wrap gap-2">
            {g.keywords.map((k) => (
              <span key={k} className="rounded-full border border-line px-3 py-1 font-mono text-[12px] uppercase tracking-[0.06em] text-muted">{k}</span>
            ))}
          </p>
        </section>
        <section id="strengths" className="mt-12 scroll-mt-24">
          <h2 className="h-section text-ink">Strengths</h2>
          <List items={g.strengths} />
        </section>
        <section id="challenges" className="mt-12 scroll-mt-24">
          <h2 className="h-section text-ink">Challenges</h2>
          <List items={g.challenges} />
        </section>
        <section id="tips" className="mt-12 scroll-mt-24">
          <h2 className="h-section text-ink">Practical tips</h2>
          <List items={g.tips} />
        </section>
      </div>
    </>
  );
}
