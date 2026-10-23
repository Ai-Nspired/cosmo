import { Reveal } from "@wron/kit";
import { SectionHeading, Panel, MonoLabel, ArrowLink } from "../ui";
import { LETTER_TABLE } from "../../lib/engine";
import { COMPAT_WEIGHTS, SIGN_SPLIT, VIBE_WEIGHTS } from "../../lib/explore";

const pct = (n) => `${Math.round(n * 100)}%`;

export function LettersSection() {
  return (
    <section id="letters" className="scroll-mt-24">
      <Reveal>
        <SectionHeading eyebrow="04 · Pythagorean table" title="Every letter has a value from 1 to 9" lead="A is 1, B is 2, up to I at 9. Then J starts again at 1." />
        <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-theme border border-line bg-line sm:grid-cols-5 lg:grid-cols-9">
          {LETTER_TABLE.map((row) => (
            <div key={row.value} className="bg-surface p-4">
              <span className="num block text-[40px] font-semibold leading-none tracking-[-0.04em] text-ink">{row.value}</span>
              <p className="mt-3 font-mono text-[13px] tracking-[0.06em] text-primary">{row.letters.join(" ")}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[15px] leading-[1.6] text-muted">Vowels are A, E, I, O and U. Y counts as a consonant.</p>
      </Reveal>
    </section>
  );
}

function Weights({ title, rows, note }) {
  return (
    <Panel className="p-5">
      <MonoLabel>{title}</MonoLabel>
      <dl className="mt-3 divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-3">
            <dt className="text-[16px] text-ink/90">{k}</dt>
            <dd className="num font-mono text-[15px] text-primary">{v}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-2 text-[15px] leading-[1.6] text-muted">{note}</p>}
    </Panel>
  );
}

export function ScoringSection() {
  return (
    <section id="scoring" className="scroll-mt-24">
      <Reveal>
        <SectionHeading eyebrow="05 · Explore" title="How Day's Vibe and compatibility are scored" lead="Both are fixed rules with set weights. Same inputs, same result." />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Weights
            title="Day's Vibe weights"
            rows={[["Personal Day number", pct(VIBE_WEIGHTS.personalDay)], ["Sun sign element today", pct(VIBE_WEIGHTS.sign)], ["Chinese year animal", pct(VIBE_WEIGHTS.animal)]]}
            note="Personal Year is your birth month plus birth day plus this year, reduced. Personal Day adds today's month and day. It refreshes at your local midnight."
          />
          <Weights
            title="Compatibility weights, per direction"
            rows={[
              ["Life Path pairing", pct(COMPAT_WEIGHTS.lifePath)],
              ["Sun sign element and modality", pct(COMPAT_WEIGHTS.sign)],
              ["Chinese animal harmony", pct(COMPAT_WEIGHTS.animal)],
              ["Direction: Soul Urge meets Personality", pct(COMPAT_WEIGHTS.direction)],
            ]}
            note={`Sign score is ${pct(SIGN_SPLIT.element)} element and ${pct(SIGN_SPLIT.modality)} modality. A to B and B to A each get a score. The headline score is their average, so the two readings can differ.`}
          />
        </div>
        <div className="mt-6 border-t border-line">
          {[
            ["Animal harmony", "Same trine scores highest, then secret friends. Neutral pairs sit in the middle. Opposite animals score lowest."],
            ["Elements", "Fire with Air and Earth with Water complement. The same element is close behind. Other pairs are contrasting."],
            ["Numbers", "Life Path and name numbers are grouped as independent thinkers (1, 5, 7), builders (2, 4, 8) and creatives (3, 6, 9)."],
          ].map(([k, v]) => (
            <div key={k} className="sweep border-b border-line py-4 md:grid md:grid-cols-[200px_1fr] md:gap-6">
              <MonoLabel className="mb-1 md:mb-0 md:pt-1">{k}</MonoLabel>
              <p className="text-[17px] leading-[1.6] text-ink/90">{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[15px] leading-[1.6] text-muted">The weights are this tool's own choices, not a traditional standard. All of it is entertainment.</p>
        <ArrowLink to="/explore?tab=compatibility" className="mt-2">Try compatibility</ArrowLink>
      </Reveal>
    </section>
  );
}
