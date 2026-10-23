import { Link } from "react-router";
import { Container, ArrowLink } from "../ui";
import { useProfile } from "../ProfileProvider";
import { CORE_LABELS } from "../../lib/engine";
import { getNumberGuide, MASTER_COPY, MASTER_RULE_NOTE } from "../../data/numbers";
import { numberPath } from "../../data/guides";

function Star({ className }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 2 C17 11 21 15 30 16 C21 17 17 21 16 30 C15 21 11 17 2 16 C11 15 15 11 16 2 Z" fill="none" stroke="#A78BFA" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export default function MasterLayer() {
  const { computed } = useProfile();
  const has = !!computed && !computed.chinese?.error;
  const masters = has ? computed.masters : [];
  // one entry per distinct value, listing where it appears
  const byValue = masters.reduce((acc, m) => {
    (acc[m.value] = acc[m.value] || { value: m.value, base: m.base, keys: [] }).keys.push(CORE_LABELS[m.key]);
    return acc;
  }, {});
  const list = Object.values(byValue);

  return (
    <section aria-labelledby="master-title" className="mt-10 md:mt-14">
      <Container>
        <div className="rounded-theme border border-accent/60 bg-[#14122A] p-5 shadow-[0_0_60px_-30px_rgba(167,139,250,0.7)] md:p-8">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="flex items-center gap-6 md:col-span-4">
              <Star className="h-12 w-12 shrink-0 md:h-14 md:w-14" />
              <span className="hidden h-20 w-px bg-accent/50 md:block" aria-hidden="true" />
              <h2 id="master-title" className="h-section text-accent">When a number stays whole</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-[17px] leading-[1.6] text-ink/90">{MASTER_COPY}</p>
              <p className="mt-2 text-[15px] leading-[1.6] text-muted">{MASTER_RULE_NOTE}</p>
            </div>
          </div>

          {list.length > 0 ? (
            <div className="mt-8 space-y-8 border-t border-accent/30 pt-8">
              {list.map((m) => {
                const g = getNumberGuide(m.value);
                const b = getNumberGuide(m.base);
                return (
                  <article key={m.value} className="grid gap-6 md:grid-cols-12">
                    <div className="flex items-end gap-4 md:col-span-3 md:block">
                      <p className="num text-[clamp(64px,7vw,96px)] font-semibold leading-none tracking-[-0.04em] text-accent glow-violet">{m.value}</p>
                      <p className="num mt-2 text-[22px] font-[550] text-ink/80">base {m.base}</p>
                    </div>
                    <div className="md:col-span-9">
                      <h3 className="text-[20px] font-[550] text-ink">{g.title}, in your {m.keys.join(" and ")}</h3>
                      <div className="mt-3 grid gap-6 md:grid-cols-2">
                        <p className="text-[16px] leading-[1.6] text-ink/85 max-md:text-[17px]">{g.overview} {g.traits}</p>
                        <p className="text-[16px] leading-[1.6] text-ink/85 max-md:text-[17px]">
                          As a second layer, read base {m.base}, {b.title}: {b.traits} Try this: {g.tips[0].toLowerCase()}.
                        </p>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-6">
                        <ArrowLink to={numberPath(m.value)}>Open the {m.value} guide</ArrowLink>
                        <ArrowLink to={numberPath(m.base)} className="text-muted">Base {m.base} guide</ArrowLink>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-accent/30 pt-5">
              <p className="text-[15px] text-muted">{has ? "None of your numbers stayed whole. Read about them anyway:" : "Read about the three master numbers:"}</p>
              {[11, 22, 33].map((n) => (
                <Link key={n} to={numberPath(n)} className="num inline-flex min-h-[44px] items-center text-[18px] font-[550] text-accent hover:text-ink">{n}</Link>
              ))}
            </div>
          )}
          <ArrowLink to="/method" className="mt-4">Read the master-number method</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
