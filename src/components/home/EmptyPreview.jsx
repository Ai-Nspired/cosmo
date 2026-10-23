import { Link } from "react-router";
import { Sun, Orbit, Triangle, Star, Heart, UserRound, CalendarDays, Infinity as InfinityIcon, ArrowRight, ChevronRight } from "lucide-react";
import { scrollToSection } from "@wron/kit";
import { Container, MonoLabel } from "../ui";
import { OrbitMark } from "../RingsSVG";
import { corePath } from "../../data/guides";

const SYSTEMS = [
  { icon: Sun, title: "Sun sign", text: "Your core identity and life energy, from the day and month you were born.", to: "/guides", ring: "Outer ring" },
  { icon: Orbit, title: "Chinese zodiac", text: "Your animal sign, element and natural tendencies, set by the Lunar New Year date.", to: "/guides", ring: "Middle ring" },
  { icon: Triangle, title: "Life Path", text: "Your direction and life purpose, from every digit of your birthdate.", to: "/guides", ring: "Inner ring" },
];
const CORE = [
  { icon: Star, title: "Expression", code: "EXP · all letters", text: "Your natural talents and how you express yourself.", to: corePath("expression") },
  { icon: Heart, title: "Soul Urge", code: "SOUL · vowels", text: "Your inner desires and what truly fulfils you.", to: corePath("soul-urge") },
  { icon: UserRound, title: "Personality", code: "PER · consonants", text: "How others see you and your outer self.", to: corePath("personality") },
  { icon: CalendarDays, title: "Birthday", code: "BD · day of month", text: "The gift and energy of your birth day.", to: corePath("birthday") },
  { icon: InfinityIcon, title: "Destiny", code: "DST · synthesis", text: "Your Life Path and Expression read together.", to: corePath("destiny") },
];

export default function EmptyPreview() {
  const toForm = () => {
    scrollToSection("profile-form");
    setTimeout(() => document.getElementById("pf-name")?.focus(), 500);
  };

  return (
    <section aria-labelledby="preview-title" className="mt-6 md:mt-0">
      <Container>
        <div className="border-t border-line pt-8 md:rounded-theme md:border md:bg-bg md:px-6 md:py-12">
          <OrbitMark />
          <h2 id="preview-title" className="mx-auto mt-5 max-w-md text-center text-[17px] font-normal leading-[1.6] text-muted md:text-[18px]">
            Your profile will appear here after you enter a name and birthdate.
          </h2>
          <div className="mt-3 flex justify-center">
            <button type="button" onClick={toForm} className="group inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-[550] text-primary hover:text-ink">
              Go to the form <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Phones: one compact list of everything the profile will show */}
        <ul className="mt-6 overflow-hidden rounded-theme border border-line md:hidden">
          {[...SYSTEMS, ...CORE].map(({ icon: Icon, title, to }) => (
            <li key={title} className="border-b border-line last:border-b-0">
              <Link to={to} className="flex min-h-[56px] items-center gap-4 px-4 text-[17px] text-ink/85 hover:text-primary">
                <Icon className="h-5 w-5 text-muted" aria-hidden="true" />
                <span className="flex-1">{title}</span>
                <ChevronRight className="h-5 w-5 text-muted" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop: the shape of the readings to come */}
        <div className="hidden md:block">
          <div className="mt-8 space-y-6">
            {SYSTEMS.map(({ icon: Icon, title, text, to, ring }) => (
              <Link key={title} to={to} className="sweep group flex items-center gap-8 rounded-theme border border-line px-8 py-9 transition-colors hover:border-primary/40">
                <Icon className="h-10 w-10 shrink-0 text-ink/85" strokeWidth={1.3} aria-hidden="true" />
                <div className="flex-1">
                  <h3 className="text-[26px] font-[550] tracking-[-0.02em] text-ink">{title}</h3>
                  <p className="mt-1 text-[16px] text-muted">{text}</p>
                </div>
                <MonoLabel as="span" className="hidden lg:inline">{ring}</MonoLabel>
                <ArrowRight className="h-5 w-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-theme border border-line bg-surface/60 p-8">
            <div className="flex items-start gap-6">
              <svg viewBox="0 0 48 48" className="h-12 w-12 shrink-0" aria-hidden="true">
                <path d="M24 6 L40 24 L24 42 L8 24 Z" fill="none" stroke="#A78BFA" strokeWidth="1.4" />
                {[[24, 6], [40, 24], [24, 42], [8, 24]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="#12161B" stroke="#A78BFA" strokeWidth="1.4" />)}
              </svg>
              <div>
                <h3 className="h-section text-ink">Core number constellation</h3>
                <p className="mt-2 text-[16px] text-muted">Your key numbers and what they reveal about you.</p>
              </div>
            </div>
            <ul className="mt-8 border-t border-line">
              {CORE.map((c) => (
                <li key={c.title} className="border-b border-line last:border-b-0">
                  <Link to={c.to} className="sweep group grid grid-cols-12 items-center gap-6 py-7">
                    <div className="col-span-4">
                      <p className="text-[20px] font-[550] text-ink group-hover:text-primary">{c.title}</p>
                      <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.06em] text-muted">{c.code}</p>
                    </div>
                    <span className="col-span-1 text-[28px] text-muted" aria-label="No result yet">–</span>
                    <p className="col-span-7 text-[16px] text-muted">{c.text}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
