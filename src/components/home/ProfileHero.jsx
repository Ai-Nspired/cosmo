import { useEffect, useMemo, useState } from "react";
import { UserRound, CalendarDays, ArrowRight, Pencil, X } from "lucide-react";
import { toast, scrollToSection, cn, RollText } from "@wron/kit";
import { Scene } from "@wron/kit/3d";
import { Container, Field, Button, MonoLabel } from "../ui";
import { useProfile, STORAGE_BLOCKED_MESSAGE } from "../ProfileProvider";
import { validateInput, mapName, localDateKey, formatDate, NUMBER_LIST } from "../../lib/engine";
import { RINGS_POSTER, PRIVACY_NOTE } from "../../data/media";

const NAME_HELP = "Letters that cannot be mapped by the selected numerology table are skipped and identified before calculation.";

function ProfileForm({ onDone, editing }) {
  const { profile, setProfile } = useProfile();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});
  const [max, setMax] = useState(undefined);

  useEffect(() => { setMax(localDateKey()); }, []);
  useEffect(() => {
    if (profile) { setName(profile.name); setDate(profile.birthdate); }
    else { setName(""); setDate(""); }
    setErrors({});
  }, [profile]);

  const skipped = useMemo(() => mapName(name).skipped, [name]);

  function submit(e) {
    e.preventDefault();
    const errs = validateInput(name, date);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const el = document.getElementById(errs.name ? "pf-name" : "pf-date");
      if (el) el.focus();
      return;
    }
    const ok = setProfile(name, date);
    onDone();
    if (!ok) toast(STORAGE_BLOCKED_MESSAGE);
  }

  return (
    <form id="profile-form" onSubmit={submit} noValidate className="scroll-mt-24">
      <h1 className="display text-[clamp(30px,7.4vw,48px)] !leading-[1.06] text-ink">
        {editing ? "Edit your details" : "Enter your name and birthdate to see your cosmic profile"}
      </h1>
      <div className="mt-7 space-y-4">
        <Field
          id="pf-name"
          name="name"
          label="Full name"
          hideLabel
          icon={UserRound}
          placeholder="Full name"
          autoComplete="name"
          value={name}
          onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: undefined }); }}
          error={errors.name}
          help={skipped.length ? `Skipped, not in the A to Z table: ${skipped.join(" ")}` : NAME_HELP}
        />
        <Field
          id="pf-date"
          name="birthdate"
          type="date"
          label="Birthdate"
          hideLabel
          icon={CalendarDays}
          max={max}
          min="1924-01-01"
          value={date}
          onChange={(e) => { setDate(e.target.value); if (errors.birthdate) setErrors({ ...errors, birthdate: undefined }); }}
          error={errors.birthdate}
        />
      </div>
      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="group inline-flex min-h-[54px] flex-1 items-center justify-center gap-2 rounded-theme bg-primary px-6 text-[16px] font-[550] text-primary-ink shadow-[0_0_0_1px_rgba(45,212,163,0.3),0_8px_30px_-12px_rgba(45,212,163,0.6)] transition-[background-color,transform] hover:bg-[#45E0B3] active:scale-[0.98]"
        >
          <RollText>{editing ? "Update my profile" : "Reveal my profile"}</RollText>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
        {editing && (
          <Button variant="secondary" size="lg" onClick={onDone} aria-label="Cancel editing" className="px-4">
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <p className="mt-4 text-[14px] text-muted">{PRIVACY_NOTE}</p>
    </form>
  );
}

function AlignedSummary({ onEdit }) {
  const { computed } = useProfile();
  const first = computed.name.split(/\s+/)[0];
  return (
    <div>
      <MonoLabel className="text-accent">Aligned · {formatDate(computed.birthdate)}</MonoLabel>
      <h1 className="display mt-4 text-[clamp(30px,7.4vw,48px)] !leading-[1.06] text-ink">
        {first}, your three rings have aligned
      </h1>
      <p className="mt-5 max-w-md text-[17px] leading-[1.6] text-muted">
        The outer ring stopped on {computed.sun.name}, the middle ring on the {computed.chinese.animal} and the inner ring on Life Path {computed.lifePath.value}.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button size="lg" arrow onClick={() => scrollToSection("profile")}>See your readings</Button>
        <Button variant="secondary" size="lg" icon={Pencil} onClick={onEdit}>Edit details</Button>
      </div>
      <p className="mt-4 text-[14px] text-muted">{PRIVACY_NOTE}</p>
    </div>
  );
}

export default function ProfileHero({ sectionRef, showForm, onEdit, onDone, editing }) {
  const { computed } = useProfile();
  const has = !!computed && !computed.chinese?.error;
  const sceneProps = useMemo(() => ({
    aligned: has,
    sign: has ? computed.sun.index : -1,
    animal: has ? computed.chinese.index : -1,
    number: has ? NUMBER_LIST.indexOf(computed.lifePath.value) : -1,
  }), [has, computed]);

  return (
    <section ref={sectionRef} aria-label="Profile input" className="relative overflow-hidden pb-6 md:pb-0">
      <div className="midnight-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative md:grid md:h-[760px] md:grid-cols-12 md:items-center">
        <div className="relative -mx-4 h-[260px] sm:-mx-6 md:absolute md:inset-y-0 md:left-[38%] md:right-[2%] md:mx-0 md:h-auto">
          <Scene
            load={() => import("../../three/ProfileRings.jsx")}
            poster={RINGS_POSTER}
            className="absolute inset-0"
            lighting="cool"
            accent="#2DD4A3"
            camera={{ position: [0, 0, 9], fov: 35 }}
            effects={{ bloom: 0.55 }}
            mobile="lite"
            sceneProps={sceneProps}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent md:hidden" aria-hidden="true" />
        </div>
        <div
          className={cn(
            "relative z-10 -mt-12 rounded-theme border border-line bg-surface p-5 sm:p-7",
            "md:col-span-5 md:mt-0 md:rounded-none md:border-0 md:bg-bg md:py-10 md:pl-0 md:pr-10 md:shadow-[40px_0_60px_-20px_#0B0D10]"
          )}
        >
          {showForm ? <ProfileForm onDone={onDone} editing={editing} /> : <AlignedSummary onEdit={onEdit} />}
        </div>
      </Container>
    </section>
  );
}
