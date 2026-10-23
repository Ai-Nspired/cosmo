import { Link } from "react-router";
import { ArrowRight, Share2 } from "lucide-react";
import { toast, scrollToSection, cn } from "@wron/kit";
import { useProfile } from "../ProfileProvider";
import { profileShareUrl, shareOrCopy } from "../../lib/share";

/** Phones only: a sticky action above the bottom navigation that follows the page's state. */
export default function MobileAction({ visible, has }) {
  const { computed } = useProfile();

  function reveal() {
    const form = document.getElementById("profile-form");
    scrollToSection("profile-form");
    if (form && typeof form.requestSubmit === "function") form.requestSubmit();
  }
  async function share() {
    const r = await shareOrCopy(profileShareUrl(computed.name, computed.birthdate), `${computed.name}'s cosmic profile`);
    if (r === "copied") toast.success("Link copied. It contains the name and birthdate.");
    else if (r === "failed") toast.error("Could not copy the link in this browser.");
  }

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 border-t border-line bg-bg/95 px-4 py-2.5 backdrop-blur-md transition-[transform,opacity] duration-300 md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
      aria-hidden={!visible}
    >
      {has ? (
        <div className="flex gap-2">
          <Link to="/explore?tab=compatibility" tabIndex={visible ? 0 : -1} className="group flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-theme bg-primary text-[16px] font-[550] text-primary-ink active:scale-[0.98]">
            Compare with someone <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button type="button" onClick={share} tabIndex={visible ? 0 : -1} aria-label="Share profile" className="flex min-h-[52px] w-[52px] items-center justify-center rounded-theme border border-line bg-surface text-ink active:scale-[0.98]">
            <Share2 className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button type="button" onClick={reveal} tabIndex={visible ? 0 : -1} className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-theme bg-primary text-[16px] font-[550] text-primary-ink active:scale-[0.98]">
          Reveal my profile <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
