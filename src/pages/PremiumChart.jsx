import { useMemo } from "react";
import { Page } from "@wron/kit";
import { Container, MonoLabel, Panel, Button, ArrowLink, Disclaimer } from "../components/ui";
import PremiumNav from "../components/premium/PremiumNav";
import PremiumGate from "../components/premium/PremiumGate";
import ChartFields from "../components/premium/ChartFields";
import ChartView from "../components/premium/ChartView";
import { useProfile } from "../components/ProfileProvider";
import { useChartInput } from "../lib/chartStore";
import { computeChart, resolvePlace } from "../lib/astro";
import { formatDate } from "../lib/engine";

function Body() {
  const { hydrated, computed } = useProfile();
  const [input, setInput] = useChartInput();
  const place = useMemo(() => resolvePlace(input), [input]);
  const chart = useMemo(() => (computed ? computeChart(computed.birthdate, { time: input.time, place }) : null), [computed, input, place]);

  if (!hydrated) return <div className="mt-8 h-64 animate-pulse rounded-theme border border-line bg-surface" aria-busy="true" />;
  if (!computed || !chart) {
    return (
      <Panel className="mx-auto mt-10 max-w-xl p-6 text-center md:p-10">
        <h2 className="h-section text-ink">Start with your free profile</h2>
        <p className="mt-3 text-[17px] leading-[1.6] text-muted">Your full chart builds on the name and birthdate you enter on the Profile page.</p>
        <Button to="/" size="lg" arrow className="mt-6">Create my profile</Button>
      </Panel>
    );
  }
  return (
    <div className="mt-8 space-y-10">
      <Panel className="p-5 md:p-6">
        <MonoLabel>Chart for</MonoLabel>
        <p className="mt-2 text-[22px] font-[550] tracking-[-0.02em] text-ink">{computed.name}</p>
        <p className="font-mono text-[13px] tracking-[0.06em] text-muted">{formatDate(computed.birthdate)}</p>
        <div className="mt-6 border-t border-line pt-6">
          <ChartFields id="chart" value={input} onChange={setInput} />
          {input.placeKey === "custom" && !place && <p role="alert" className="mt-3 text-[14px] text-red-300">Check the coordinates: latitude between -66 and 66, longitude between -180 and 180, offset between -12 and 14.</p>}
          <p className="mt-4 text-[13px] leading-snug text-muted">Birth time and place stay in this browser. They are never sent anywhere.</p>
        </div>
      </Panel>
      <ChartView profile={computed} chart={chart} />
      <div className="flex flex-wrap gap-x-8 gap-y-1 border-t border-line pt-6">
        <ArrowLink to="/premium/compare">Compare in nine factors</ArrowLink>
        <ArrowLink to="/premium/matches">Find Cosmic Matches</ArrowLink>
        <ArrowLink to="/method#premium" className="text-muted">How Moon and Rising are calculated</ArrowLink>
      </div>
      <Disclaimer />
    </div>
  );
}

export default function PremiumChart() {
  return (
    <Page title="Your full chart" description="Premium: your Sun, Moon and Rising signs together, plus expanded Chinese zodiac traits for love, work and stress." noindex>
      <div className="midnight-glow">
        <Container className="pb-28 pt-8 md:pb-24">
          <h1 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-ink">Your full chart</h1>
          <p className="mb-6 mt-3 max-w-xl text-[17px] leading-[1.6] text-muted">Sun, Moon and Rising together, with the longer Chinese zodiac reading.</p>
          <PremiumNav />
          <PremiumGate><Body /></PremiumGate>
        </Container>
      </div>
    </Page>
  );
}
