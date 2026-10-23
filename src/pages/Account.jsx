import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Mail, Lock, UserRound } from "lucide-react";
import { Page, auth, useUser, toast, cn } from "@wron/kit";
import { Container, Field, Panel, Button, MonoLabel } from "../components/ui";
import RingsSVG from "../components/RingsSVG";

export default function Account() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const mode = params.get("mode") === "signin" ? "signin" : "signup";
  const rawNext = params.get("next") || "";
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/premium/chart";
  const [f, setF] = useState({ name: "", email: "", password: "", age: false });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setF({ ...f, [k]: v });
  const go = (m) => setParams((p) => { const n = new URLSearchParams(p); n.set("mode", m); return n; }, { replace: true });

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!f.email.trim()) return setError("Enter your email address.");
    if (f.password.length < 8) return setError("That password is too short. Use at least 8 characters.");
    if (mode === "signup" && !f.age) return setError("Confirm that you are 18 or older.");
    setBusy(true);
    try {
      if (mode === "signup") await auth.signUp({ email: f.email.trim(), password: f.password, name: f.name.trim() || f.email.split("@")[0] });
      else await auth.signIn({ email: f.email.trim(), password: f.password });
      toast.success(mode === "signup" ? "Account created" : "Signed in");
      navigate(next);
    } catch (err) {
      setError(err?.message || (mode === "signup" ? "Could not create the account. Try again." : "Email or password is not right."));
    }
    setBusy(false);
  }

  return (
    <Page title="Account" description="Create a Premium account or sign in to open your full chart, nine-factor compatibility and Cosmic Matches." noindex>
      <div className="midnight-glow">
        <Container className="grid items-center gap-10 pb-28 pt-12 md:grid-cols-12 md:py-20">
          <div className="md:col-span-6 lg:col-span-5">
            <MonoLabel className="mb-4">Premium account</MonoLabel>
            <h1 className="display text-[clamp(2.25rem,5vw,3.5rem)] text-ink">{user ? "You are signed in" : mode === "signup" ? "Create your account" : "Welcome back"}</h1>
            {loading ? (
              <div className="mt-8 h-64 animate-pulse rounded-theme border border-line bg-surface" aria-busy="true" />
            ) : user ? (
              <Panel className="mt-8 p-6">
                <p className="text-[17px] leading-[1.6] text-ink">Signed in as <span className="font-[550]">{user.email}</span>.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button to="/premium/chart" arrow>Open my chart</Button>
                  <Button to="/premium/matches" variant="secondary">Cosmic Matches</Button>
                  <Button variant="secondary" onClick={async () => { await auth.signOut(); toast("Signed out"); }}>Sign out</Button>
                </div>
              </Panel>
            ) : (
              <>
                <div role="tablist" aria-label="Account" className="mt-6 grid max-w-sm grid-cols-2 overflow-hidden rounded-theme border border-line bg-surface">
                  {[["signup", "Create account"], ["signin", "Sign in"]].map(([k, l]) => (
                    <button key={k} type="button" role="tab" aria-selected={mode === k} onClick={() => go(k)} className={cn("min-h-[48px] px-4 text-[15px] font-[550] transition-colors", mode === k ? "bg-primary text-primary-ink" : "text-ink hover:text-primary")}>{l}</button>
                  ))}
                </div>
                <form onSubmit={submit} noValidate className="mt-6 space-y-4">
                  {mode === "signup" && <Field id="ac-name" label="Name" icon={UserRound} autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} />}
                  <Field id="ac-email" label="Email" icon={Mail} type="email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} />
                  <Field id="ac-pass" label="Password" icon={Lock} type="password" autoComplete={mode === "signup" ? "new-password" : "WRON_SECRET_REMOVED"} value={f.password} onChange={(e) => set("password", e.target.value)} help={mode === "signup" ? "At least 8 characters." : undefined} />
                  {mode === "signup" && (
                    <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[16px] text-ink/90">
                      <input type="checkbox" checked={f.age} onChange={(e) => set("age", e.target.checked)} className="mt-1 h-5 w-5 accent-[#2DD4A3]" />
                      <span>I am 18 or older and I agree to the Terms.</span>
                    </label>
                  )}
                  {error && <p role="alert" className="text-[15px] leading-snug text-red-300">{error}</p>}
                  <Button type="submit" size="lg" className="w-full" disabled={busy}>{busy ? "One moment" : mode === "signup" ? "Create my account" : "Sign in"}</Button>
                </form>
                <p className="mt-4 text-[14px] leading-[1.6] text-muted">Your free profile never needs an account. Premium uses an account so your member card can be matched with others.</p>
              </>
            )}
          </div>
          <div className="mx-auto hidden w-full max-w-[420px] md:col-span-6 md:block lg:col-span-7 lg:max-w-[460px] lg:justify-self-center">
            <RingsSVG spin className="aspect-square" />
          </div>
        </Container>
      </div>
    </Page>
  );
}
