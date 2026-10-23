import { Link, useLocation } from "react-router";
import { Lock } from "lucide-react";
import { useUser } from "@wron/kit";
import { Panel, Button } from "../ui";

/** Premium pages need an account. Signed-out visitors get an upgrade prompt instead of the page. */
export default function PremiumGate({ children }) {
  const { user, loading } = useUser();
  const { pathname } = useLocation();
  if (loading) {
    return <div className="mt-8 h-64 animate-pulse rounded-theme border border-line bg-surface" aria-busy="true" aria-label="Checking your account" />;
  }
  if (!user) {
    const next = encodeURIComponent(pathname);
    return (
      <Panel className="mx-auto mt-10 max-w-xl p-6 text-center md:p-10">
        <Lock className="mx-auto h-7 w-7 text-primary" aria-hidden="true" />
        <h2 className="h-section mt-4 text-ink">This part is for Premium members</h2>
        <p className="mt-3 text-[17px] leading-[1.6] text-muted">Create an account to open your full chart, nine-factor compatibility and Cosmic Matches. Your free profile stays exactly as it is.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to={`/account?mode=signup&next=${next}`} size="lg" arrow>Create my account</Button>
          <Button to={`/account?mode=signin&next=${next}`} variant="secondary" size="lg">Sign in</Button>
        </div>
        <p className="mt-5 text-[14px] text-muted"><Link to="/premium" className="text-primary hover:text-ink">See what Premium includes</Link></p>
      </Panel>
    );
  }
  return children;
}
