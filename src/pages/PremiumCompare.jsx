import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Page } from "@wron/kit";
import { Container, Button } from "../components/ui";
import PremiumNav from "../components/premium/PremiumNav";
import PremiumGate from "../components/premium/PremiumGate";
import PersonBox from "../components/premium/PersonBox";
import NineResult from "../components/premium/FactorTable";
import { useProfile } from "../components/ProfileProvider";
import { useChartInput } from "../lib/chartStore";
import { computeProfile, validateInput } from "../lib/engine";
import { computeChart, resolvePlace } from "../lib/astro";
import { compat9, personaFromProfile } from "../lib/match9";

const blank = () => ({ name: "", birthdate: "", chart: { time: "", placeKey: "", lat: "", lng: "", offset: "" } });
const link = "group inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-[550] text-primary transition-colors hover:text-ink";

function Body() {
  const { profile } = useProfile();
  const [saved] = useChartInput();
  const [A, setA] = useState(blank);
  const [B, setB] = useState(blank);
  const [eA, setEA] = useState({});
  const [eB, setEB] = useState({});
  const [out, setOut] = useState(null);

  const persona = (x) => {
    const p = computeProfile(x.name, x.birthdate);
    return personaFromProfile(p, computeChart(x.birthdate, { time: x.chart.time, place: resolvePlace(x.chart) }));
  };
  const run = (e) => {
    e.preventDefault();
    const a = validateInput(A.name, A.birthdate), b = validateInput(B.name, B.birthdate);
    setEA(a); setEB(b);
    if (Object.keys(a).length || Object.keys(b).length) { setOut(null); return; }
    const pa = persona(A), pb = persona(B);
    setOut({ a: pa, b: pb, r: compat9(pa, pb) });
  };
  const useMine = () => profile && (setA({ name: profile.name, birthdate: profile.birthdate, chart: { ...saved } }), setEA({}));

  return (
    <form onSubmit={run} noValidate className="mt-8">
      <div className="grid gap-4 md:grid-cols-2">
        <PersonBox id="n9a" title="Person A" value={A} onChange={setA} errors={eA}
          extra={profile && <button type="button" onClick={useMine} className={`mt-3 ${link}`}>Use my profile <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></button>} />
        <PersonBox id="n9b" title="Person B" value={B} onChange={setB} errors={eB} />
      </div>
      <Button type="submit" size="lg" className="mt-5 min-h-[60px] w-full text-[17px]">Compare in nine factors</Button>
      <div className="mt-8">{out && <NineResult result={out.r} a={out.a.name} b={out.b.name} />}</div>
    </form>
  );
}

export default function PremiumCompare() {
  return (
    <Page title="Nine-factor compatibility" description="Premium: compare two people across nine factors, from Sun, Moon and Rising to Chinese element and name numbers, with a reading each way." noindex>
      <div className="midnight-glow">
        <Container className="pb-28 pt-8 md:pb-24">
          <h1 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-ink">Nine-factor compatibility</h1>
          <p className="mb-6 mt-3 max-w-xl text-[17px] leading-[1.6] text-muted">Add birth time and place for either person to include their rising sign.</p>
          <PremiumNav />
          <PremiumGate><Body /></PremiumGate>
        </Container>
      </div>
    </Page>
  );
}
