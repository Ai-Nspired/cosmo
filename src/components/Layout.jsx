import { NavLink, Link, Outlet, useLocation } from "react-router";
import { Suspense, useEffect } from "react";
import { Menu, X, UserRound, Compass, Sparkles } from "lucide-react";
import { Sheet, useDisclosure, cn, CookieSettingsLink } from "@wron/kit";
import { SmoothScroll } from "@wron/kit/scroll";
import Logo, { StarMark } from "./Logo";
import { ProfileProvider } from "./ProfileProvider";

const APP_NAV = [
  { to: "/", label: "Profile", end: true },
  { to: "/explore", label: "Explore" },
  { to: "/premium", label: "Premium" },
];
const LEARN_NAV = [
  { to: "/guides", label: "Guides" },
  { to: "/method", label: "Method" },
  { to: "/faq", label: "FAQ" },
];

function TopLink({ to, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "relative flex h-16 items-center px-3 text-[15px] font-[550] transition-colors",
          isActive ? "text-primary" : "text-muted hover:text-ink"
        )
      }
    >
      {({ isActive }) => (
        <>
          {label}
          <span className={cn("absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-primary transition-opacity", isActive ? "opacity-100" : "opacity-0")} />
        </>
      )}
    </NavLink>
  );
}

function Header() {
  const menu = useDisclosure();
  const { pathname } = useLocation();
  useEffect(() => { menu.onClose(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto grid h-14 max-w-[1440px] grid-cols-[1fr_auto] items-center px-4 sm:px-6 md:h-16 md:grid-cols-12 md:px-8">
        <Logo className="md:col-span-4" />
        <nav aria-label="App" className="hidden items-center justify-center gap-4 md:col-span-4 md:flex">
          {APP_NAV.map((l) => <TopLink key={l.to} {...l} />)}
        </nav>
        <nav aria-label="Learn" className="hidden items-center justify-end gap-2 md:col-span-4 md:flex">
          {LEARN_NAV.map((l) => <TopLink key={l.to} {...l} />)}
        </nav>
        <button
          type="button"
          onClick={menu.onOpen}
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center rounded-theme border border-line text-ink transition-colors hover:border-primary/60 hover:text-primary active:scale-[0.98] md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <Sheet open={menu.open} onClose={menu.onClose} side="right" panelClassName="bg-surface border-l border-line w-[86%] max-w-sm">
        <div className="flex h-full flex-col p-5">
          <div className="flex items-center justify-between">
            <StarMark className="h-8 w-8" />
            <button type="button" onClick={menu.onClose} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-theme border border-line text-ink hover:text-primary">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mono-label mt-8">App</p>
          <ul className="mt-2 border-t border-line">
            {APP_NAV.map((l) => (
              <li key={l.to} className="border-b border-line">
                <NavLink to={l.to} end={l.end} className={({ isActive }) => cn("flex min-h-[52px] items-center text-lg font-[550]", isActive ? "text-primary" : "text-ink")}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
          <p className="mono-label mt-8">Learn</p>
          <ul className="mt-2 border-t border-line">
            {[...LEARN_NAV, { to: "/about", label: "About" }, { to: "/account", label: "Account" }].map((l) => (
              <li key={l.to} className="border-b border-line">
                <NavLink to={l.to} className={({ isActive }) => cn("flex min-h-[52px] items-center text-lg font-[550]", isActive ? "text-primary" : "text-ink")}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-8 text-sm leading-relaxed text-muted">For entertainment and personal reflection, not prediction or scientific assessment.</p>
        </div>
      </Sheet>
    </header>
  );
}

/** Phones: Profile and Explore stay one tap away. Pages that add their own sticky action should sit at bottom-16. */
function BottomNav() {
  const items = [
    { to: "/", label: "Profile", icon: UserRound, end: true },
    { to: "/explore", label: "Explore", icon: Compass },
    { to: "/premium", label: "Premium", icon: Sparkles },
  ];
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <ul className="grid h-16 grid-cols-3">
        {items.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) => cn("flex h-16 flex-col items-center justify-center gap-1 text-[14px] font-[550] transition-colors", isActive ? "text-primary" : "text-muted hover:text-ink")}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterCol({ title, links }) {
  return (
    <div className="border-t border-line pt-5">
      <p className="mono-label">{title}</p>
      <ul className="mt-4 space-y-1">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="inline-flex min-h-[44px] items-center text-[15px] text-ink/85 transition-colors hover:text-primary md:min-h-[36px]">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 sm:px-6 md:grid-cols-4 md:px-8">
        <div className="border-t border-line pt-5">
          <Logo />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">For entertainment and personal reflection, not prediction or scientific assessment.</p>
        </div>
        <FooterCol title="Explore" links={[{ to: "/", label: "Profile" }, { to: "/explore?tab=vibe", label: "Day's Vibe" }, { to: "/explore?tab=compatibility", label: "Compatibility" }, { to: "/premium", label: "Premium" }, { to: "/premium/matches", label: "Cosmic Matches" }]} />
        <FooterCol title="Learn" links={[{ to: "/guides", label: "Guides" }, { to: "/method", label: "Method" }, { to: "/faq", label: "FAQ" }]} />
        <FooterCol title="Information" links={[{ to: "/about", label: "About" }, { to: "/account", label: "Account" }, { to: "/privacy", label: "Privacy" }, { to: "/terms", label: "Terms" }]} />
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-line px-4 py-6 pb-24 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8 md:pb-6">
        <p className="font-mono text-[12px] tracking-[0.06em] text-muted">Free profile: calculated in your browser, kept on this device. Premium: see Privacy.</p>
        <CookieSettingsLink className="min-h-[44px] text-left text-[14px] text-muted hover:text-ink md:min-h-0">Cookie settings</CookieSettingsLink>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <ProfileProvider>
      <SmoothScroll />
      <div className="flex min-h-screen flex-col bg-bg font-body text-ink">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-theme focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-ink">Skip to content</a>
        <Header />
        <div id="main" className="flex-1">
          <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
        <BottomNav />
      </div>
    </ProfileProvider>
  );
}
