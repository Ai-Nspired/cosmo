import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { Page } from "@wron/kit";
import { cn } from "@wron/kit";
import { Container, Button, Panel } from "../components/ui";
import { OrbitMark } from "../components/RingsSVG";
import { useProfile } from "../components/ProfileProvider";
import VibeBoard from "../components/explore/VibeBoard";
import Compat from "../components/explore/Compat";

const TABS = [
  { key: "vibe", label: "Day's Vibe" },
  { key: "compatibility", label: "Compatibility" },
];

export default function Explore() {
  const [params, setParams] = useSearchParams();
  const { hydrated, profile } = useProfile();
  const tab = params.get("tab") === "compatibility" ? "compatibility" : "vibe";
  const refs = useRef({});

  const go = (key) => setParams((p) => { const n = new URLSearchParams(p); n.set("tab", key); return n; }, { replace: true });

  const onKey = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tab === "vibe" ? "compatibility" : "vibe";
    go(next);
    refs.current[next]?.focus();
  };

  useEffect(() => { /* keep refs fresh */ }, [tab]);

  return (
    <Page title="Explore: Day's Vibe and Compatibility" description="Check today's vibe from your Personal Day, sun sign and Chinese animal, or compare two people with a two-way compatibility score.">
      <div className="midnight-glow">
        <Container className="pb-28 pt-8 md:pb-24 md:pt-10">
          <h1 className="sr-only">Explore</h1>

          {hydrated && !profile && (
            <Panel className="mx-auto mb-8 max-w-2xl px-6 py-8 text-center">
              <OrbitMark className="mb-5" />
              <p className="text-[18px] leading-[1.6] text-ink">Create your profile before exploring today's vibe or comparing two people.</p>
              <Button to="/" arrow size="lg" className="mt-6">Create my profile</Button>
            </Panel>
          )}

          <div className="flex justify-center">
            <div role="tablist" aria-label="Explore" onKeyDown={onKey} className="inline-grid w-full max-w-md grid-cols-2 overflow-hidden rounded-theme border border-line bg-surface md:w-auto md:min-w-[400px]">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => go(t.key)}
                  ref={(el) => { refs.current[t.key] = el; }}
                  role="tab"
                  id={`tab-${t.key}`}
                  aria-selected={tab === t.key}
                  aria-controls={`panel-${t.key}`}
                  tabIndex={tab === t.key ? 0 : -1}
                  className={cn("min-h-[48px] px-5 text-[15px] font-[550] transition-colors", tab === t.key ? "bg-primary text-primary-ink" : "text-ink hover:text-primary")}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            {tab === "vibe" ? (
              <div role="tabpanel" id="panel-vibe" aria-labelledby="tab-vibe"><VibeBoard /></div>
            ) : (
              <div role="tabpanel" id="panel-compatibility" aria-labelledby="tab-compatibility"><Compat params={params} /></div>
            )}
          </div>
        </Container>
      </div>
    </Page>
  );
}
