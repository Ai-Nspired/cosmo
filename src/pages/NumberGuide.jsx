import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { Page } from "@wron/kit";
import { ArrowRight } from "lucide-react";
import { Container, MonoLabel, ArrowLink, Disclaimer } from "../components/ui";
import RingsSVG, { OrbitMark } from "../components/RingsSVG";
import { getNumberGuide, NUMBER_GUIDES, MASTER_GUIDE_COPY } from "../data/numbers";
import { CORE_GUIDES } from "../data/coreNumbers";
import { numberPath, corePath } from "../data/guides";
import { useProfile } from "../components/ProfileProvider";
import { CORE_LABELS } from "../lib/engine";
import GuideReading from "../components/numberguide/GuideReading";
import NotFound from "./NotFound";

function Masthead({ g }) {
  return (
    <section className="border-b border-line midnight-glow">
      <Container className="pb-10 pt-6">
        <nav aria-label="Breadcrumb" className="font-mono text-[13px] tracking-[0.06em] text-muted">
          <Link to="/guides" className="hover:text-ink">Guides</Link> <span className="mx-1">/</span>
          <Link to="/guides" className="hover:text-ink">Numbers</Link> <span className="mx-1">/</span>
          <span aria-current="page" className={g.master ? "text-accent" : "text-ink"}>{g.value}</span>
        </nav>
        <div className="mt-8 grid items-center gap-8 md:grid-cols-12">
          <div className="num text-[clamp(120px,16vw,230px)] font-semibold leading-[0.85] tracking-[-0.04em] md:col-span-4"
            style={g.master ? { color: "transparent", WebkitTextStroke: "3px #A78BFA", filter: "drop-shadow(0 0 22px rgba(167,139,250,0.45))" } : { color: "#EEF2F6" }}
            aria-hidden="true">{g.value}</div>
          <div className="md:col-span-5">
            <MonoLabel>{g.title}</MonoLabel>
            <h1 className="display mt-3 text-[clamp(2.25rem,5vw,4rem)]">{g.master ? `Master number ${g.value}` : `Number ${g.value}: ${g.title}`}</h1>
            <p className="mt-4 text-[17px] leading-[1.6] text-muted">{g.keywords.join(" · ")}</p>
            {g.master && (
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="inline-flex min-h-[44px] items-center rounded-full border-2 border-accent/70 px-5 text-[15px] font-[550] text-accent">Master number retained</span>
                <ArrowLink to={numberPath(g.base)}>Base {g.base}</ArrowLink>
              </div>
            )}
          </div>
          <div className="mx-auto hidden w-full max-w-[320px] md:col-span-3 md:block">
            <RingsSVG number={g.value} spin className="aspect-square" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Related({ g }) {
  if (g.master) {
    return (
      <section className="rounded-theme border border-accent/50 bg-accent/10 p-6 md:p-10">
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
          <svg viewBox="0 0 32 32" className="h-14 w-14" aria-hidden="true"><path d="M16 2 C17 11 21 15 30 16 C21 17 17 21 16 30 C15 21 11 17 2 16 C11 15 15 11 16 2 Z" fill="none" stroke="#A78BFA" strokeWidth="1.4" /></svg>
          <div>
            <p className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-[550] leading-[1.25]">{MASTER_GUIDE_COPY}</p>
            <ArrowLink to="/method" className="mt-3">See the reduction rules</ArrowLink>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="border-t border-line pt-8">
      <h2 className="h-section">Related Core Number guides</h2>
      <ul className="mt-4 border-t border-line">
        {CORE_GUIDES.map((c) => (
          <li key={c.slug} className="border-b border-line">
            <Link to={corePath(c.slug)} className="sweep group flex min-h-[56px] items-center justify-between gap-4 px-2 py-3">
              <span><span className="font-[550]">{c.name}</span> <span className="text-muted">· {c.short}</span></span>
              <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function NumberGuide() {
  const { number } = useParams();
  const g = getNumberGuide(number);
  const { computed } = useProfile();
  const [ctx, setCtx] = useState(null);
  useEffect(() => {
    if (!g || !computed) { setCtx(null); return; }
    const keys = ["lifePath", "expression", "soulUrge", "personality", "birthday", "destiny"];
    setCtx(keys.filter((k) => computed[k] && computed[k].value === g.value).map((k) => CORE_LABELS[k]));
  }, [g, computed]);
  if (!g) return <NotFound />;

  return (
    <Page title={g.master ? `Master number ${g.value}` : `Number ${g.value}, ${g.title}`} description={`${g.overview} Traits, strengths, challenges and tips for numerology number ${g.value}.`.slice(0, 154)}>
      <Masthead g={g} />
      <Container className="py-10">
        <GuideReading g={g} ctx={ctx} />
        <div className="mt-14"><Related g={g} /></div>
        <section className="mt-14" aria-labelledby="idx">
          <h2 id="idx" className="h-section">Number index</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {NUMBER_GUIDES.map((n) => (
              <li key={n.value}>
                <Link to={numberPath(n.value)} aria-current={n.value === g.value ? "page" : undefined}
                  className={n.value === g.value
                    ? "num flex h-12 min-w-[56px] items-center justify-center rounded-theme bg-primary px-3 text-lg font-[550] text-primary-ink"
                    : "num flex h-12 min-w-[56px] items-center justify-center rounded-theme border border-line px-3 text-lg font-[550] hover:border-primary/60 hover:text-primary"}>{n.value}</Link>
              </li>
            ))}
          </ul>
        </section>
        <OrbitMark className="mt-16" />
        <p className="mt-4 text-center text-[15px] text-muted">{computed ? <>Your profile is ready. <Link to="/" className="text-primary">Open it</Link>.</> : <>Your profile will appear after you enter a name and birthdate. <Link to="/" className="text-primary">Enter them</Link>.</>}</p>
        <Disclaimer className="mt-6 text-center" />
      </Container>
    </Page>
  );
}
