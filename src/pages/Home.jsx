import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { Page, toast, scrollToSection } from "@wron/kit";
import { useProfile } from "../components/ProfileProvider";
import { validateInput } from "../lib/engine";
import ProfileHero from "../components/home/ProfileHero";
import EmptyPreview from "../components/home/EmptyPreview";
import MobileAction from "../components/home/MobileAction";
import PremiumPrompt from "../components/home/PremiumPrompt";

// Heavy, profile-only sections (they pull in all the guide text) load after the first paint.
const IdentityRail = lazy(() => import("../components/home/IdentityRail"));
const SystemReadings = lazy(() => import("../components/home/SystemReadings"));
const CoreConstellation = lazy(() => import("../components/home/CoreConstellation"));
const MasterLayer = lazy(() => import("../components/home/MasterLayer"));
const NextActions = lazy(() => import("../components/home/NextActions"));

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cosmic Profile & Synergy",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  description:
    "A free browser tool that turns a name and birthdate into a Chinese zodiac animal, western sun sign, Life Path and Core Numbers, for entertainment.",
};

export default function Home() {
  const { hydrated, computed, setProfile } = useProfile();
  const [params, setParams] = useSearchParams();
  const [editing, setEditing] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const heroRef = useRef(null);
  const has = !!computed && !computed.chinese?.error;
  const showForm = !has || editing;
  const startEdit = () => {
    setEditing(true);
    setTimeout(() => { scrollToSection("profile-form"); document.getElementById("pf-name")?.focus({ preventScroll: true }); }, 60);
  };

  // Open a shared profile link: /?name=...&date=YYYY-MM-DD
  useEffect(() => {
    if (!hydrated) return;
    const n = params.get("name");
    const d = params.get("date");
    if (!n && !d) return;
    if (n && d && !Object.keys(validateInput(n, d)).length) {
      setProfile(n, d, { save: false });
      setEditing(false);
      toast("Showing a shared profile. It is not saved on this device.");
    } else {
      toast.error("That share link is incomplete, so no profile was opened.");
    }
    const next = new URLSearchParams(params);
    next.delete("name");
    next.delete("date");
    setParams(next, { replace: true });
  }, [hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Page
      title="Your cosmic profile"
      description="Enter your name and birthdate to see your Chinese zodiac animal, sun sign, Life Path and five Core Numbers, calculated in your browser."
      jsonLd={JSON_LD}
    >
      <div className="pb-24 md:pb-0">
        <ProfileHero sectionRef={heroRef} showForm={showForm} onEdit={startEdit} onDone={() => setEditing(false)} editing={editing && has} />
        {has ? (
          <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
            <IdentityRail onEdit={startEdit} />
            <SystemReadings />
            <CoreConstellation />
            <MasterLayer />
            <NextActions />
            <PremiumPrompt />
          </Suspense>
        ) : (
          <>
            <EmptyPreview />
            <Suspense fallback={<div className="min-h-[40vh]" aria-busy="true" />}>
              <MasterLayer />
              <NextActions />
            </Suspense>
            <PremiumPrompt />
          </>
        )}
      </div>
      <MobileAction visible={!heroVisible} has={has} />
    </Page>
  );
}
