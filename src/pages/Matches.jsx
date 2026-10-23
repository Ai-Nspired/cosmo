import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Page, toast, useTable } from "@wron/kit";
import { Container, MonoLabel, Panel, Button, ArrowLink } from "../components/ui";
import PremiumNav from "../components/premium/PremiumNav";
import PremiumGate from "../components/premium/PremiumGate";
import MemberForm from "../components/premium/MemberForm";
import MatchList from "../components/premium/MatchList";
import { useProfile } from "../components/ProfileProvider";
import { useChartInput } from "../lib/chartStore";
import { computeChart, resolvePlace } from "../lib/astro";
import { SIGNS } from "../lib/engine";
import { personaFromProfile, personaFromRow, personaToRow } from "../lib/match9";

function MyCard({ row, onEdit, onRemove }) {
  const p = personaFromRow(row);
  return (
    <Panel className="p-5 md:p-6">
      <MonoLabel>Your member card</MonoLabel>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="break-words text-[22px] font-[550] tracking-[-0.02em] text-ink">{row.display_name}</p>
          <p className="text-[14px] text-muted">{row.area} · Looking for {String(row.looking_for || "either").toLowerCase()}</p>
          <p className="mt-3 font-mono text-[12px] leading-[1.7] tracking-[0.04em] text-muted">
            Sun {SIGNS[p.sun]?.name}{p.moon >= 0 && ` · Moon ${SIGNS[p.moon]?.name}`}{p.rising >= 0 && ` · Rising ${SIGNS[p.rising]?.name}`} · {p.element} {p.animal}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" icon={Pencil} onClick={onEdit}>Edit card</Button>
          <Button variant="secondary" size="sm" icon={Trash2} onClick={onRemove}>Remove card</Button>
        </div>
      </div>
    </Panel>
  );
}

function Body() {
  const { hydrated, computed } = useProfile();
  const [input] = useChartInput();
  const { rows, loading, error, add, update, remove, reload } = useTable("member_profiles", { limit: 300 });
  const [editing, setEditing] = useState(false);
  const list = rows || [];
  const mine = list.find((r) => r.mine);
  const others = list.filter((r) => !r.mine);

  const me = useMemo(() => {
    if (computed) return personaFromProfile(computed, computeChart(computed.birthdate, { time: input.time, place: resolvePlace(input) }));
    return mine ? personaFromRow(mine) : null;
  }, [computed, input, mine]);

  async function save(f) {
    const values = { display_name: f.name.trim(), bio: f.bio.trim(), area: f.area.trim(), looking_for: f.lookingFor, reach_me: f.reach.trim(), age_confirmed: true, ...personaToRow(me) };
    try {
      if (mine) await update(mine.id, values); else await add(values);
      toast.success(mine ? "Card updated" : "You are in. Matches are ranked below.");
      setEditing(false);
    } catch (e) {
      toast.error(e?.message || "Could not save your card. Try again.");
    }
  }
  async function drop() {
    if (!window.confirm("Remove your member card? You will disappear from everyone's matches.")) return;
    try { await remove(mine.id); toast("Your card was removed."); } catch (e) { toast.error(e?.message || "Could not remove your card."); }
  }

  if (loading || !hydrated) return <div className="mt-8 h-64 animate-pulse rounded-theme border border-line bg-surface" aria-busy="true" aria-label="Loading members" />;
  if (error) {
    return (
      <Panel className="mt-8 p-6 text-center">
        <p className="text-[17px] text-ink">Couldn't load members right now.</p>
        <Button variant="secondary" className="mt-4" onClick={reload}>Try again</Button>
      </Panel>
    );
  }
  if (!me) {
    return (
      <Panel className="mx-auto mt-10 max-w-xl p-6 text-center md:p-10">
        <h2 className="h-section text-ink">Start with your free profile</h2>
        <p className="mt-3 text-[17px] leading-[1.6] text-muted">Matches use your signs and numbers. Enter your name and birthdate on the Profile page first. Add your birth time on My chart to include your rising sign.</p>
        <Button to="/" size="lg" arrow className="mt-6">Create my profile</Button>
      </Panel>
    );
  }
  return (
    <div className="mt-8">
      {!mine || editing ? (
        <MemberForm persona={me} row={mine} onSave={save} onCancel={mine ? () => setEditing(false) : undefined} />
      ) : (
        <MyCard row={mine} onEdit={() => setEditing(true)} onRemove={drop} />
      )}
      {!mine && <p className="mt-4 text-[15px] leading-[1.6] text-muted">Join to see members ranked by nine-factor compatibility with you. {me.moon < 0 || me.rising < 0 ? "A card with a rising sign scores more factors." : ""}</p>}
      {mine && <MatchList rows={others} me={me} myArea={mine.area} />}
      <div className="mt-12 border-t border-line pt-6">
        <p className="max-w-2xl text-[15px] leading-[1.6] text-muted">Private messages are not part of this release. If you want to be reachable, add a contact line to your card. Scores are for entertainment, so meet people the way you would anywhere else: in public first, and tell a friend.</p>
        <div className="mt-2 flex flex-wrap gap-x-6"><ArrowLink to="/method#premium">How nine-factor scores work</ArrowLink><ArrowLink to="/privacy">Privacy</ArrowLink></div>
      </div>
    </div>
  );
}

export default function Matches() {
  return (
    <Page title="Cosmic Matches" description="Premium: see members near you ranked by nine-factor compatibility, built from Sun, Moon and Rising signs, Chinese zodiac and numerology." noindex>
      <div className="midnight-glow">
        <Container className="pb-28 pt-8 md:pb-24">
          <h1 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-ink">Cosmic Matches</h1>
          <p className="mb-6 mt-3 max-w-xl text-[17px] leading-[1.6] text-muted">Members ranked by how well your skies, animals and numbers fit.</p>
          <PremiumNav />
          <PremiumGate><Body /></PremiumGate>
        </Container>
      </div>
    </Page>
  );
}
