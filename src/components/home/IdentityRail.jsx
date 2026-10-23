import { Link } from "react-router";
import { Pencil, RotateCcw, Check, Smartphone, Share2 } from "lucide-react";
import { toast, scrollToSection, CountUp } from "@wron/kit";
import { Container, Panel, MonoLabel, Button, Glyph } from "../ui";
import { useProfile, STORAGE_BLOCKED_MESSAGE } from "../ProfileProvider";
import { formatDate } from "../../lib/engine";
import { profileShareUrl, shareOrCopy } from "../../lib/share";
import { signPath, animalPath, numberPath } from "../../data/guides";
import { Assemble } from "./Reading";

function RingDots({ level }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      {[10, 7, 4].map((r, i) => (
        <circle key={r} cx="12" cy="12" r={r} fill="none" stroke={i === level ? "#A78BFA" : "rgba(140,150,163,0.45)"} strokeWidth={i === level ? 2 : 1} />
      ))}
    </svg>
  );
}

function Anchor({ ring, level, label, value, to, visual }) {
  return (
    <Link to={to} className="sweep sweep-violet group flex items-center gap-4 border-t border-line py-4 transition-colors hover:text-ink sm:border-l sm:border-t-0 sm:px-5 sm:py-1 sm:first:border-l-0 sm:first:pl-0">
      <div className="flex w-14 shrink-0 justify-center text-[34px] font-semibold leading-none text-accent glow-violet">{visual}</div>
      <div className="min-w-0">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-muted"><RingDots level={level} />{ring}</p>
        <p className="mt-1 text-[17px] font-[550] text-ink group-hover:text-primary">{value}</p>
        <p className="text-[13px] text-muted">{label}</p>
      </div>
    </Link>
  );
}

export default function IdentityRail({ onEdit }) {
  const { computed: p, saved, saveProfile, resetProfile, storageOk } = useProfile();

  function reset() {
    if (!window.confirm("Remove your profile from this device and start again?")) return;
    resetProfile();
    toast("Profile removed from this device.");
    setTimeout(() => scrollToSection("profile-form"), 60);
  }
  function save() {
    if (saveProfile()) toast.success("Saved on this device.");
    else toast.error(STORAGE_BLOCKED_MESSAGE);
  }
  async function share() {
    const r = await shareOrCopy(profileShareUrl(p.name, p.birthdate), `${p.name}'s cosmic profile`);
    if (r === "copied") toast.success("Link copied. It contains the name and birthdate.");
    else if (r === "failed") toast.error("Could not copy the link in this browser.");
  }

  return (
    <section id="profile" aria-labelledby="rail-title" className="scroll-mt-20">
      <Container className="mt-6 md:mt-0">
        <Assemble>
          <Panel className="grid gap-6 p-5 md:p-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-3">
              <MonoLabel>Profile for</MonoLabel>
              <h2 id="rail-title" className="mt-2 break-words text-[22px] font-[550] leading-[1.15] tracking-[-0.02em] text-ink">{p.name}</h2>
              <p className="mt-1 font-mono text-[13px] tracking-[0.06em] text-muted">{formatDate(p.birthdate)}</p>
            </div>
            <div className="grid sm:grid-cols-3 lg:col-span-6">
              <Anchor ring="Middle ring" level={1} label={`${p.chinese.polarity} · Chinese zodiac`} value={`${p.chinese.element} ${p.chinese.animal}`} to={animalPath(p.chinese.slug)} visual={<span className="text-[15px] font-mono tracking-[0.06em]">No.{p.chinese.index + 1}</span>} />
              <Anchor ring="Outer ring" level={0} label={`${p.sun.element} · Sun sign`} value={p.sun.name} to={signPath(p.sun.slug)} visual={<Glyph>{p.sun.glyph}</Glyph>} />
              <Anchor ring="Inner ring" level={2} label={p.lifePath.master ? `Master · base ${p.lifePath.base}` : "Life Path"} value={`Life Path ${p.lifePath.value}`} to={numberPath(p.lifePath.value)} visual={<span className="num"><CountUp to={p.lifePath.value} /></span>} />
            </div>
            <div className="flex flex-wrap gap-2 lg:col-span-3 lg:justify-end">
              <Button variant="secondary" size="sm" icon={Pencil} onClick={onEdit}>Edit details</Button>
              <Button variant="secondary" size="sm" icon={RotateCcw} onClick={reset}>Reset</Button>
              <Button variant="secondary" size="sm" icon={saved ? Check : Smartphone} onClick={save} disabled={saved} aria-live="polite">
                {saved ? "Saved on this device" : "Save on this device"}
              </Button>
              <Button variant="secondary" size="sm" icon={Share2} onClick={share}>Share</Button>
            </div>
          </Panel>
        </Assemble>
        {!storageOk && <p role="status" className="mt-3 text-[14px] text-amber-200/90">{STORAGE_BLOCKED_MESSAGE}</p>}
      </Container>
    </section>
  );
}
