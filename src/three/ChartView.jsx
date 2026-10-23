import { SIGNS } from "../../lib/engine";
import { MOON_READINGS, RISING_READINGS, ANIMAL_DEEP, ELEMENT_FEEDS, ELEMENT_HOLDS } from "../../data/premium";
import { getAnimalGuide, elementVariant } from "../../data/animals";
import { Panel, MonoLabel, ArrowLink, Glyph } from "../ui";
import { Assemble } from "../home/Reading";
import { animalPath, signPath } from "../../data/guides";

function Tier({ tier, sign, degree, text }) {
  if (!sign) {
    return (
      <div className="flex h-full flex-col rounded-theme border border-dashed border-line p-5">
        <MonoLabel>{tier}</MonoLabel>
        <p className="mt-3 text-[22px] font-[550] text-muted">Not calculated yet</p>
        <p className="mt-2 text-[15px] leading-[1.6] text-muted">{text}</p>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col rounded-theme border border-accent/50 bg-[#14122A] p-5 shadow-[0_0_50px_-28px_rgba(167,139,250,0.8)]">
      <MonoLabel className="text-accent">{tier}</MonoLabel>
      <div className="mt-3 flex items-center gap-4">
        <Glyph className="text-[44px] leading-none text-accent glow-violet">{sign.glyph}</Glyph>
        <div>
          <p className="text-[24px] font-[550] leading-tight tracking-[-0.02em] text-ink">{sign.name}</p>
          <p className="font-mono text-[12px] tracking-[0.06em] text-muted">{degree != null ? `${degree} deg · ` : ""}{sign.element} · {sign.modality}</p>
        </div>
      </div>
      <p className="mt-4 text-[16px] leading-[1.6] text-ink/90">{text}</p>
      <ArrowLink to={signPath(sign.slug)} className="mt-auto pt-2">Read about {sign.name}</ArrowLink>
    </div>
  );
}

function Balance({ signs }) {
  const order = ["Fire", "Earth", "Air", "Water"];
  const counts = order.map((e) => signs.filter((s) => s.element === e).length);
  const top = Math.max(...counts);
  const lead = order.filter((_, i) => counts[i] === top);
  return (
    <div>
      <MonoLabel>Element balance across your sky</MonoLabel>
      <ul className="mt-3 space-y-2">
        {order.map((e, i) => (
          <li key={e} className="grid grid-cols-[64px_1fr_auto] items-center gap-3">
            <span className="text-[15px] text-ink/90">{e}</span>
            <span className="h-2 rounded-full bg-line">
              <span className="block h-2 rounded-full bg-accent" style={{ width: `${(counts[i] / signs.length) * 100}%` }} />
            </span>
            <span className="num font-mono text-[12px] text-muted">{counts[i]}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[15px] leading-[1.6] text-muted">
        {top === 1 && signs.length === 3 ? "Your Sun, Moon and Rising each sit in a different element, so you can switch gears easily." : `${lead.join(" and ")} leads your sky, so expect that element's style to show up often.`}
      </p>
    </div>
  );
}

export default function ChartView({ profile, chart }) {
  const sun = profile.sun;
  const c = profile.chinese;
  const g = getAnimalGuide(c.slug);
  const deep = ANIMAL_DEEP[c.animal];
  const v = elementVariant(c.animal, c.element);
  const fedBy = Object.keys(ELEMENT_FEEDS).find((k) => ELEMENT_FEEDS[k] === c.element);
  const heldBy = Object.keys(ELEMENT_HOLDS).find((k) => ELEMENT_HOLDS[k] === c.element);
  const signs = [sun, chart.moon, chart.rising].filter(Boolean);
  const rows = [
    ["Love", deep.love], ["Work", deep.work], ["Under stress", deep.stress],
    ["Harmony", `${g.trine.join(", ")} share your pace. Secret friend: ${g.secretFriend}.`],
    ["Friction", `${g.clash} sits opposite you in the cycle.`],
    ["Your element", `${c.element} feeds ${ELEMENT_FEEDS[c.element]} and is fed by ${fedBy}. It holds back ${ELEMENT_HOLDS[c.element]} and is held back by ${heldBy}.`],
  ];
  return (
    <div className="space-y-12">
      <Assemble>
        <MonoLabel className="mb-3 text-accent">Your three tiers · {profile.name}</MonoLabel>
        <div className="grid gap-4 md:grid-cols-3">
          <Tier tier="Sun · who you are" sign={sun} degree={null} text={`${sun.name} is your core style. It comes from your birthdate and is the same in the free profile.`} />
          <Tier tier="Moon · what you need" sign={chart.moon} degree={chart.moon.degree} text={MOON_READINGS[chart.moon.slug]} />
          <Tier tier="Rising · how you arrive" sign={chart.rising} degree={chart.rising?.degree} text={chart.rising ? RISING_READINGS[chart.rising.slug] : "Add your birth time and a birth place above to see your rising sign. It changes about every two hours, so the minutes matter."} />
        </div>
        {chart.moonUncertain && (
          <p className="mt-4 rounded-theme border border-line bg-surface p-4 text-[15px] leading-[1.6] text-muted">
            The Moon changed signs during your birth day, so midday may not match your birth. Add your birth time and place for the exact sign.
          </p>
        )}
        <div className="mt-6 max-w-xl"><Balance signs={signs} /></div>
      </Assemble>

      <Assemble>
        <Panel className="p-5 md:p-8">
          <MonoLabel>Expanded Chinese zodiac</MonoLabel>
          <h2 className="h-section mt-2 text-ink">{v.title}</h2>
          <p className="mt-3 max-w-2xl text-[17px] leading-[1.6] text-muted">{v.text}</p>
          <dl className="mt-6 border-t border-line">
            {rows.map(([k, t]) => (
              <div key={k} className="sweep grid gap-1 border-b border-line py-4 sm:grid-cols-[180px_1fr] sm:gap-8">
                <dt className="font-mono text-[12px] uppercase tracking-[0.06em] text-primary">{k}</dt>
                <dd className="text-[17px] leading-[1.6] text-ink/90">{t}</dd>
              </div>
            ))}
          </dl>
          <ArrowLink to={animalPath(c.slug)} className="mt-3">Full guide: Year of the {c.animal}</ArrowLink>
        </Panel>
      </Assemble>
    </div>
  );
}
