import { Link } from "react-router";
import { CountUp } from "@wron/kit";
import { Container, MonoLabel, ArrowLink, Glyph, MasterBadge, BigNumber } from "../ui";
import { useProfile } from "../ProfileProvider";
import { seeded, localDateKey, lunarYearSpan, formatDate, ANIMALS } from "../../lib/engine";
import { getSignGuide, CUSP_NOTE, ELEMENT_NOTES, MODALITY_NOTES } from "../../data/signs";
import { getAnimalGuide, elementVariant, LUNAR_NOTE } from "../../data/animals";
import { getNumberGuide } from "../../data/numbers";
import { signPath, animalPath, numberPath } from "../../data/guides";
import { Assemble, ReadingCols, Keywords } from "./Reading";

const tipFor = (list, p, k) => seeded(list, `${p.name}|${p.birthdate}|${localDateKey()}|${k}`);

function Links({ guide, guideLabel }) {
  return (
    <div className="mt-8 flex flex-wrap gap-x-8">
      <ArrowLink to={guide}>Open full guide{guideLabel ? `: ${guideLabel}` : ""}</ArrowLink>
      <ArrowLink to="/method">See calculation</ArrowLink>
    </div>
  );
}

function SunBand({ p }) {
  const s = p.sun;
  const g = getSignGuide(s.slug);
  return (
    <Assemble as="section" aria-labelledby="sun-title" className="border-t border-line py-14 md:py-20">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="flex items-start gap-5 lg:col-span-4 lg:block">
          <Glyph className="block text-[64px] leading-none text-primary glow-teal md:text-[112px]">{s.glyph}</Glyph>
          <div className="lg:mt-6">
            <MonoLabel>Sun sign · outer ring</MonoLabel>
            <h2 id="sun-title" className="h-section mt-2 text-ink">{s.name}</h2>
            <p className="mt-2 font-mono text-[13px] tracking-[0.06em] text-muted">{s.dates}</p>
            <p className="mt-1 text-[15px] text-muted">{s.element} · {s.modality}</p>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-[18px] leading-[1.6] text-ink">{g.overview}</p>
          <p className="mt-4 text-[17px] leading-[1.6] text-ink/85">{g.traits} {ELEMENT_NOTES[s.element]} {MODALITY_NOTES[s.modality]}</p>
          <Keywords items={g.keywords} className="mt-5" />
          {s.cusp && (
            <p className="mt-6 rounded-theme border border-accent/40 bg-accent/[0.06] p-4 text-[15px] leading-[1.6] text-ink/90">
              <span className="font-[550] text-accent">Cusp note: </span>
              Your birthday sits within a day of the {s.cusp.name} boundary. {CUSP_NOTE}{" "}
              <Link to={signPath(s.cusp.slug)} className="font-[550] text-primary underline-offset-4 hover:underline">Read {s.cusp.name} too</Link>.
            </p>
          )}
          <ReadingCols className="mt-8" strengths={g.strengths} challenges={g.challenges} tip={tipFor(g.tips, p, "sun")} />
          <Links guide={signPath(s.slug)} guideLabel={s.name} />
        </div>
      </div>
    </Assemble>
  );
}

function ChineseBand({ p }) {
  const c = p.chinese;
  const g = getAnimalGuide(c.slug);
  const v = elementVariant(c.animal, c.element);
  const span = lunarYearSpan(c.chineseYear);
  return (
    <Assemble as="section" aria-labelledby="cz-title" className="border-t border-line py-14 md:py-20">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:order-2 lg:col-span-3 lg:col-start-8">
          <MonoLabel>Chinese zodiac · middle ring</MonoLabel>
          <h2 id="cz-title" className="h-section mt-2 text-ink">{c.element} {c.animal}</h2>
          <p className="mt-3 font-mono text-[13px] tracking-[0.06em] text-muted">No. {c.index + 1} of 12 · {c.polarity}</p>
          <p className="mt-6 text-[clamp(52px,5vw,72px)] font-semibold leading-none tracking-[-0.04em] text-accent glow-violet">{c.animal}</p>
          <Keywords items={g.keywords} className="mt-6" />
        </div>
        <div className="lg:order-1 lg:col-span-6">
          <p className="text-[18px] leading-[1.6] text-ink">{g.overview}</p>
          <p className="mt-4 text-[17px] leading-[1.6] text-ink/85">{g.traits}</p>
          <p className="mt-4 text-[17px] leading-[1.6] text-ink/85">{v.text}</p>
          <ReadingCols className="mt-8" strengths={g.strengths} challenges={g.challenges} tip={tipFor(g.tips, p, "animal")} />
          <p className="mt-6 text-[15px] leading-[1.6] text-muted">
            Harmony group: {g.trine.join(", ")}. Secret friend: {g.secretFriend}. Opposite: {g.clash}.
          </p>
          <Links guide={animalPath(c.slug)} guideLabel={`Year of the ${c.animal}`} />
        </div>
        <aside aria-label="Lunar year note" className="border-t border-line pt-5 lg:order-3 lg:col-span-2 lg:col-start-11 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          <MonoLabel>Lunar year</MonoLabel>
          {span && <p className="mt-3 font-mono text-[13px] leading-[1.6] tracking-[0.04em] text-ink/90">{span.start}{span.end ? ` to ${span.end}` : ""}</p>}
          <p className="mt-3 text-[14px] leading-[1.6] text-muted">{LUNAR_NOTE}</p>
          {c.beforeNewYear && (
            <p className="mt-3 text-[14px] leading-[1.6] text-accent">
              Born before Lunar New Year {c.chineseYear + 1}, so you belong to {c.chineseYear}, not the {ANIMALS[(c.index + 1) % 12]} year.
            </p>
          )}
          {!c.beforeNewYear && <p className="mt-3 text-[14px] leading-[1.6] text-muted">Lunar New Year {c.chineseYear}: {formatDate(c.newYearDate)}.</p>}
        </aside>
      </div>
    </Assemble>
  );
}

function LifePathBand({ p }) {
  const lp = p.lifePath;
  const g = getNumberGuide(lp.value);
  const base = lp.master ? getNumberGuide(lp.base) : null;
  return (
    <Assemble as="section" aria-labelledby="lp-title" className="border-t border-line py-14 md:py-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="flex items-end gap-5 lg:col-span-4">
          <BigNumber value={<CountUp to={lp.value} />} master={lp.master} className="!text-[clamp(72px,9vw,128px)]" />
          <div className="pb-2">
            <MonoLabel>Life Path · inner ring</MonoLabel>
            <h2 id="lp-title" className="h-section mt-2 text-ink">{g.title}</h2>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {lp.master && <MasterBadge base={lp.base} />}
          <p className="mt-3 font-mono text-[13px] leading-[1.7] tracking-[0.04em] text-muted">
            {lp.formula} → {lp.trail.join(" → ")}
          </p>
          {lp.karmic && <p className="mt-2 text-[14px] text-muted">Your total passes through {lp.karmic}, which some traditions call a karmic debt number.</p>}
        </div>
      </div>
      <p className="mt-8 max-w-3xl text-[18px] leading-[1.6] text-ink">{g.overview}</p>
      {base && (
        <p className="mt-3 max-w-3xl text-[16px] leading-[1.6] text-muted">
          Secondary reading, base {lp.base} ({base.title}): {base.traits}
        </p>
      )}
      <ReadingCols className="mt-10" traits={g.traits} strengths={g.strengths} challenges={g.challenges} tip={tipFor(g.tips, p, "lp")} />
      <Links guide={numberPath(lp.value)} guideLabel={`Number ${lp.value}`} />
    </Assemble>
  );
}

export default function SystemReadings() {
  const { computed: p } = useProfile();
  return (
    <Container className="mt-14 md:mt-20">
      <SunBand p={p} />
      <ChineseBand p={p} />
      <LifePathBand p={p} />
    </Container>
  );
}
