import { Page } from "@wron/kit";
import { Link } from "react-router";
import RingsSVG from "../components/RingsSVG";
import { Button, Container, MonoLabel } from "../components/ui";

export default function NotFound() {
  return (
    <Page title="Page not found" description="This page is out of alignment. Head back to your cosmic profile, the daily vibe or the guides to every sign, animal and number." noindex>
      <Container className="grid items-center gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-6">
          <MonoLabel>Error 404</MonoLabel>
          <h1 className="display mt-4 text-[clamp(2.5rem,5vw,4.25rem)] text-ink">This page is out of alignment</h1>
          <p className="mt-5 max-w-lg text-[17px] leading-[1.6] text-muted">The address may have changed, or the link was mistyped. Your profile and the guides are one tap away.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/" arrow size="lg">Back to my profile</Button>
            <Button to="/guides" variant="secondary" size="lg">Browse the guides</Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 text-[15px]">
            {[["/explore", "Explore"], ["/method", "Method"], ["/faq", "FAQ"]].map(([to, label]) => (
              <li key={to}><Link to={to} className="inline-flex min-h-[44px] items-center text-muted hover:text-primary">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="mx-auto w-full max-w-md opacity-80 md:col-span-6">
          <RingsSVG spin title="Three rings turning slowly" />
        </div>
      </Container>
    </Page>
  );
}
