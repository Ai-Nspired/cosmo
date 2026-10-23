import { Container, Button, MonoLabel } from "../ui";

/** The upgrade prompt shown under the free profile. The free tier above it is unchanged. */
export default function PremiumPrompt() {
  return (
    <section aria-labelledby="prem-title" className="mb-16 md:mb-12">
      <Container>
        <div className="grid gap-6 rounded-theme border border-accent/50 bg-[#14122A] p-5 shadow-[0_0_60px_-30px_rgba(167,139,250,0.7)] md:grid-cols-12 md:items-center md:p-8">
          <div className="md:col-span-8">
            <MonoLabel className="text-accent">Premium · Early access</MonoLabel>
            <h2 id="prem-title" className="h-section mt-2 text-ink">Add your Moon and Rising signs</h2>
            <p className="mt-3 max-w-2xl text-[17px] leading-[1.6] text-ink/85">See the full three-tier sky, a longer Chinese zodiac reading, nine-factor compatibility and Cosmic Matches, a ranked list of members near you.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Button to="/premium" size="lg" arrow>See Premium</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
