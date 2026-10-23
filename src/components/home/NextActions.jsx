import { Link } from "react-router";
import { Sun, Users, Smartphone, Download, Link2, ArrowRight } from "lucide-react";
import { toast, scrollToSection, cn } from "@wron/kit";
import { Container } from "../ui";
import { useProfile, STORAGE_BLOCKED_MESSAGE } from "../ProfileProvider";
import { profileShareUrl, copyText, downloadProfileImage } from "../../lib/share";

function Orbit() {
  return (
    <svg viewBox="0 0 32 32" className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:rotate-90" aria-hidden="true">
      <path d="M16 2 C17 11 21 15 30 16 C21 17 17 21 16 30 C15 21 11 17 2 16 C11 15 15 11 16 2 Z" fill="#A78BFA" />
    </svg>
  );
}

function Inner({ icon: Icon, label, sub }) {
  return (
    <>
      <span className="flex items-center gap-3">
        <Orbit />
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      </span>
      <span className="mt-4 block text-[16px] font-[550] text-primary group-hover:text-ink">{label}</span>
      {sub && <span className="mt-1 block text-[14px] leading-snug text-muted">{sub}</span>}
      <ArrowRight className="mt-4 h-4 w-4 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </>
  );
}

const cell = "sweep group block min-h-[44px] w-full bg-surface p-5 text-left transition-colors hover:bg-[#151a20] md:p-6";

export default function NextActions() {
  const { computed, saved, saveProfile } = useProfile();
  const has = !!computed && !computed.chinese?.error;

  function needProfile() {
    toast("Enter your name and birthdate first.");
    scrollToSection("profile-form");
    setTimeout(() => document.getElementById("pf-name")?.focus(), 500);
  }
  function save() {
    if (!has) return needProfile();
    if (saved) return toast("Already saved on this device.");
    if (saveProfile()) toast.success("Saved on this device.");
    else toast.error(STORAGE_BLOCKED_MESSAGE);
  }
  function download() {
    if (!has) return needProfile();
    try { downloadProfileImage(computed); toast.success("Image downloaded."); }
    catch { toast.error("This browser could not create the image."); }
  }
  async function copy() {
    if (!has) return needProfile();
    const ok = await copyText(profileShareUrl(computed.name, computed.birthdate));
    if (ok) toast.success("Link copied. It contains the name and birthdate.");
    else toast.error("Could not copy the link in this browser.");
  }

  return (
    <section aria-labelledby="next-title" className="mb-16 mt-10 md:mb-24 md:mt-14">
      <Container>
        <h2 id="next-title" className="sr-only">What to do next</h2>
        <div className="grid gap-px overflow-hidden rounded-theme border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
          <Link to="/explore?tab=compatibility" className={cn(cell, "lg:col-span-2")}>
            <Inner icon={Users} label="Compare with someone" sub="Two-way score with a reading for each direction." />
          </Link>
          <Link to="/explore?tab=vibe" className={cell}>
            <Inner icon={Sun} label="Check today's vibe" sub="Refreshes at your local midnight." />
          </Link>
          <button type="button" onClick={save} className={cell}>
            <Inner icon={Smartphone} label={saved && has ? "Saved on this device" : "Save on this device"} sub="Stays in this browser only." />
          </button>
          <button type="button" onClick={download} className={cell}>
            <Inner icon={Download} label="Download image" sub="A 1200 by 630 profile card." />
          </button>
          <button type="button" onClick={copy} className={cn(cell, "sm:col-span-2 lg:col-span-1")}>
            <Inner icon={Link2} label="Copy share link" sub="Opens this profile for a friend." />
          </button>
        </div>
      </Container>
    </section>
  );
}
