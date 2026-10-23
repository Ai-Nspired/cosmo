import { Reveal } from "@wron/kit";
import { SectionHeading, Panel, MonoLabel, ArrowLink } from "../ui";
import { NINE_ORDER, NINE_LABELS, NINE_WEIGHTS } from "../../lib/match9";

function Rule({ label, children }) {
  return (
    <div className="sweep border-b border-line py-4 md:grid md:grid-cols-[200px_1fr] md:gap-6">
      <MonoLabel className="mb-1 md:mb-0 md:pt-1">{label}</MonoLabel>
      <div className="text-[17px] leading-[1.6] text-ink/90">{children}</div>
    </div>
  );
}

export default function MethodPremium() {
  return (
    <section id="premium" className="scroll-mt-24">
      <Reveal>
        <SectionHeading eyebrow="06 · Premium" title="Moon, Rising and the nine factors" lead="Premium uses the same fixed-rule approach as the free profile. Same inputs, same result." />
        <div className="mt-6 border-t border-line">
          <Rule label="Moon sign">Computed in your browser from the Moon's position at your birth moment, using the tropical zodiac. Without a birth time, midday is used and the page warns you when the Moon changed signs that day. The method is accurate to a fraction of a degree, so a birth within about half an hour of a Moon sign change can land in the neighbouring sign.</Rule>
          <Rule label="Rising sign">The zodiac sign rising on the eastern horizon at your birth time and place. It needs both. It changes about every two hours, so a few minutes of error can change the answer. Places come from a list of large cities, or from coordinates you enter.</Rule>
          <Rule label="Element cycle">Wood feeds Fire, Fire feeds Earth, Earth feeds Metal, Metal feeds Water, Water feeds Wood. Feeding pairs score 92, matching elements 80, neutral pairs 66. Wood holds back Earth, Earth holds back Water, Water holds back Fire, Fire holds back Metal and Metal holds back Wood. Those pairs score 52.</Rule>
          <Rule label="Sign pairs">Every sign pairing, Sun, Moon and Rising, uses the free rules: 70% element and 30% modality.</Rule>
          <Rule label="Directions">Two factors are scored per direction: a person's Moon against the other's Sun, and a person's Soul Urge against the other's Personality. A to B and B to A each get a score. The headline is their average.</Rule>
          <Rule label="Missing data">When a factor cannot be computed, for example no rising sign for one person, it is left out and the remaining weights are scaled up. The result says how many of nine factors were used.</Rule>
        </div>
        <Panel className="mt-6 p-5">
          <MonoLabel>Nine-factor weights</MonoLabel>
          <dl className="mt-3 divide-y divide-line">
            {NINE_ORDER.map((k) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-[16px] text-ink/90">{NINE_LABELS[k]}</dt>
                <dd className="num font-mono text-[15px] text-primary">{Math.round(NINE_WEIGHTS[k] * 100)}%</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-[15px] leading-[1.6] text-muted">These weights are this tool's own choices, not a traditional standard. All of it is entertainment.</p>
        </Panel>
        <ArrowLink to="/premium" className="mt-2">See what Premium includes</ArrowLink>
      </Reveal>
    </section>
  );
}
