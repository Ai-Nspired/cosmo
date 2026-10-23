import { Reveal } from "@wron/kit";
import { Container, SectionHeading, MonoLabel, ArrowLink } from "../ui";

const RINGS = [
  { n: "01", title: "Western signs", body: "Your sun sign comes from the day and month you were born, using standard date ranges. Cusp dates can differ by a day, so we note them.", to: "/guides", link: "Browse sun signs" },
  { n: "02", title: "Chinese zodiac", body: "Your animal follows Lunar New Year, not 1 January. Birthdates before that year's date belong to the previous animal, with its element.", to: "/guides", link: "Browse animals" },
  { n: "03", title: "Numerology", body: "Life Path from your birthdate, and Expression, Soul Urge, Personality, Birthday and Destiny from your name. Master numbers 11, 22 and 33 are kept.", to: "/guides", link: "Browse numbers" },
];

export function AboutRings() {
  return (
    <section>
      <Container className="py-14 md:py-20">
        <SectionHeading title="What the three rings are" lead="Each ring is a separate system. The profile shows where they meet." />
        <ul className="mt-10 border-t border-line">
          {RINGS.map((r) => (
            <li key={r.n} className="border-b border-line">
              <Reveal>
                <div className="sweep grid gap-4 py-8 md:grid-cols-12 md:gap-8">
                  <MonoLabel className="md:col-span-1">{r.n}</MonoLabel>
                  <h3 className="text-[24px] font-[550] leading-[1.1] tracking-[-0.02em] text-ink md:col-span-3">{r.title}</h3>
                  <p className="text-[17px] leading-[1.6] text-muted md:col-span-6">{r.body}</p>
                  <div className="md:col-span-2 md:text-right"><ArrowLink to={r.to}>{r.link}</ArrowLink></div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const RULES = [
  { k: "Entertainment only", v: "Astrology and numerology are not science and cannot predict events. Readings are for fun and reflection." },
  { k: "Your details stay here", v: "The free profile is calculated in your browser. If you save, your profile and saved people live in this browser's storage on this device. Premium uses an account, and the Privacy page lists exactly what it stores." },
  { k: "Stated rules", v: "Every calculation is written out on the Method page, including how Destiny differs from Expression and how master numbers are kept." },
  { k: "Honest limits", v: "Birth years from 1924 to 2035 are supported. Outside that range the tool says so instead of guessing an animal." },
];

export function AboutRules() {
  return (
    <section className="border-t border-line bg-surface/40">
      <Container className="grid gap-10 py-14 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <SectionHeading title="How we treat you and your data" />
          <div className="mt-6 flex flex-wrap gap-x-6">
            <ArrowLink to="/privacy">Privacy</ArrowLink>
            <ArrowLink to="/terms">Terms</ArrowLink>
            <ArrowLink to="/faq">FAQ</ArrowLink>
          </div>
        </div>
        <dl className="md:col-span-8">
          {RULES.map((r) => (
            <div key={r.k} className="grid gap-2 border-t border-line py-6 last:border-b sm:grid-cols-[200px_1fr] sm:gap-8">
              <dt className="font-mono text-[12px] uppercase tracking-[0.06em] text-primary">{r.k}</dt>
              <dd className="text-[17px] leading-[1.6] text-ink/90">{r.v}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
