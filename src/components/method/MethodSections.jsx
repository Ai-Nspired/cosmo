import { Link } from "react-router";
import { Reveal } from "@wron/kit";
import { SectionHeading, Panel, MonoLabel, ArrowLink } from "../ui";
import { SIGNS, signDates } from "../../lib/engine";
import { CNY_FIRST_YEAR, CNY_LAST_YEAR } from "../../data/cny";
import { CUSP_NOTE, ELEMENT_NOTES } from "../../data/signs";
import { SKIP_RULE, REDUCTION_RULE } from "../../data/coreNumbers";
import { MASTER_RULE_NOTE, MASTER_GUIDE_COPY } from "../../data/numbers";
import { ELEMENT_INFO, LUNAR_NOTE } from "../../data/animals";

function Rule({ label, children }) {
  return (
    <div className="sweep border-b border-line py-4 md:grid md:grid-cols-[200px_1fr] md:gap-6">
      <MonoLabel className="mb-1 md:mb-0 md:pt-1">{label}</MonoLabel>
      <div className="text-[17px] leading-[1.6] text-ink/90">{children}</div>
    </div>
  );
}

export function LunarSection() {
  return (
    <section id="lunar" className="scroll-mt-24">
      <Reveal>
        <SectionHeading eyebrow="01 · Chinese zodiac" title="Your animal follows Lunar New Year" lead={LUNAR_NOTE} />
        <div className="mt-6 border-t border-line">
          <Rule label="Rule">Look up the Lunar New Year date for your birth year. Born before it, you take the previous year's animal. Born on or after it, you take this year's.</Rule>
          <Rule label="Animal">The cycle has 12 animals, starting with the Rat. The year number picks the animal: (year − 4) mod 12.</Rule>
          <Rule label="Element">Taken from the last digit of the Chinese year: 0 and 1 Metal, 2 and 3 Water, 4 and 5 Wood, 6 and 7 Fire, 8 and 9 Earth. Polarity is Yang for even years and Yin for odd years.</Rule>
          <Rule label="Range">The table covers {CNY_FIRST_YEAR} to {CNY_LAST_YEAR}. Outside it the tool says so and never guesses.</Rule>
          <Rule label="Check">The dates were compiled from general reference knowledge and are due a check against an official list, such as the Hong Kong Observatory tables, before launch.</Rule>
        </div>
        <div className="mt-6 grid gap-px overflow-hidden rounded-theme border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {Object.entries(ELEMENT_INFO).map(([el, i]) => (
            <div key={el} className="bg-surface p-4">
              <MonoLabel>{el}</MonoLabel>
              <p className="mt-2 text-[15px] leading-[1.5] text-ink/85">{i.note}</p>
            </div>
          ))}
        </div>
        <ArrowLink to="/guides" className="mt-4">Browse the animal guides</ArrowLink>
      </Reveal>
    </section>
  );
}

export function SunSection() {
  return (
    <section id="sun" className="scroll-mt-24">
      <Reveal>
        <SectionHeading eyebrow="02 · Sun sign" title="Twelve signs, standard date ranges" lead={CUSP_NOTE} />
        <ul className="mt-6 grid border-t border-line sm:grid-cols-2">
          {SIGNS.map((s) => (
            <li key={s.slug} className="border-b border-line sm:odd:pr-4 sm:even:pl-4">
              <Link to={`/guides/sun-signs/${s.slug}`} className="sweep flex min-h-[52px] items-center gap-3 py-2 transition-colors hover:text-primary">
                <span className="glyph w-8 text-[24px] text-primary" aria-hidden="true">{s.glyph}</span>
                <span className="flex-1 text-[16px] font-[550]">{s.name}</span>
                <span className="font-mono text-[12px] tracking-[0.06em] text-muted">{signDates(s)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {Object.values(ELEMENT_NOTES).map((n) => (
            <p key={n} className="text-[15px] leading-[1.6] text-muted">{n}</p>
          ))}
        </div>
        <p className="mt-4 text-[15px] leading-[1.6] text-muted">A birthday within a day of a boundary shows a cusp note, so you can read the neighbouring sign too.</p>
      </Reveal>
    </section>
  );
}

export function NumberSection() {
  return (
    <section id="numbers" className="scroll-mt-24">
      <Reveal>
        <SectionHeading eyebrow="03 · Numerology" title="Reduce, and keep the master numbers" lead={REDUCTION_RULE} />
        <div className="mt-6 border-t border-line">
          <Rule label="Life Path">Reduce the month, the day and the year separately. Add the three results, then reduce the total. Example: 1990-07-15 gives 7 + 6 + 1 = 14, then 5.</Rule>
          <Rule label="Expression">Add every letter of the full name, then reduce.</Rule>
          <Rule label="Soul Urge">Add the vowels A, E, I, O, U only, then reduce.</Rule>
          <Rule label="Personality">Add the consonants only, Y included, then reduce.</Rule>
          <Rule label="Birthday">The day of the month, reduced. 11 and 22 are kept.</Rule>
          <Rule label="Destiny">Life Path plus Expression, reduced. Many numerologists use Destiny as another word for Expression. Here it is the meeting point of birthdate and name, so you never see the same number twice. Your Expression panel holds the traditional name number.</Rule>
          <Rule label="Karmic debt">If a total passes through 13, 14, 16 or 19 on its way down, the trail shows it.</Rule>
          <Rule label="Names">{SKIP_RULE}</Rule>
        </div>
        <Panel className="ring-violet mt-6 p-5">
          <MonoLabel className="text-accent">Master numbers 11 · 22 · 33</MonoLabel>
          <p className="mt-2 text-[17px] leading-[1.6] text-ink/90">{MASTER_GUIDE_COPY} A violet badge marks them, with the longer reading and the base number beside it.</p>
          <p className="mt-3 text-[15px] leading-[1.6] text-muted">{MASTER_RULE_NOTE}</p>
          <ArrowLink to="/guides/numbers/11" className="mt-2">Read the master number guides</ArrowLink>
        </Panel>
      </Reveal>
    </section>
  );
}
