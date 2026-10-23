import { NavLink } from "react-router";
import { cn } from "@wron/kit";

const ITEMS = [
  { to: "/premium", label: "Overview", end: true },
  { to: "/premium/chart", label: "My chart" },
  { to: "/premium/compare", label: "Nine factors" },
  { to: "/premium/matches", label: "Cosmic Matches" },
];

export default function PremiumNav() {
  return (
    <nav aria-label="Premium" className="grid grid-cols-2 gap-px overflow-hidden rounded-theme border border-line bg-line sm:grid-cols-4">
      {ITEMS.map((i) => (
        <NavLink
          key={i.to}
          to={i.to}
          end={i.end}
          className={({ isActive }) => cn("flex min-h-[48px] items-center justify-center px-3 text-center text-[15px] font-[550] transition-colors", isActive ? "bg-primary text-primary-ink" : "bg-surface text-ink hover:text-primary")}
        >
          {i.label}
        </NavLink>
      ))}
    </nav>
  );
}
