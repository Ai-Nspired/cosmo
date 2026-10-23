import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import { toast } from "@wron/kit";
import { Button } from "../ui";
import { useProfile } from "../ProfileProvider";
import { computeProfile, validateInput } from "../../lib/engine";
import { compatibility } from "../../lib/explore";
import { compareShareUrl, shareOrCopy } from "../../lib/share";
import PersonPanel from "./PersonPanel";
import CompatResult from "./CompatResult";
import SavedPeople from "./SavedPeople";

const EMPTY = { name: "", birthdate: "", id: undefined };

export default function Compat({ params }) {
  const { hydrated, profile, people, savePerson, removePerson, storageOk } = useProfile();
  const [A, setA] = useState(EMPTY);
  const [B, setB] = useState(EMPTY);
  const [errA, setErrA] = useState({});
  const [errB, setErrB] = useState({});
  const [data, setData] = useState(null);
  const filled = useRef(false);
  const formRef = useRef(null);

  const run = (a, b) => {
    const ea = validateInput(a.name, a.birthdate), eb = validateInput(b.name, b.birthdate);
    setErrA(ea); setErrB(eb);
    if (Object.keys(ea).length || Object.keys(eb).length) { setData(null); return; }
    const pa = computeProfile(a.name, a.birthdate), pb = computeProfile(b.name, b.birthdate);
    const res = compatibility(pa, pb);
    if (!res) { toast.error("These two profiles could not be compared."); return; }
    setData({ a: pa, b: pb, res });
  };

  useEffect(() => {
    if (!hydrated || filled.current) return;
    filled.current = true;
    const a = params.get("a"), ad = params.get("ad"), b = params.get("b"), bd = params.get("bd");
    if (a && ad && b && bd) {
      const pa = { name: a, birthdate: ad }, pb = { name: b, birthdate: bd };
      setA(pa); setB(pb); run(pa, pb);
    } else if (profile) setA({ name: profile.name, birthdate: profile.birthdate });
  }, [hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  const swap = () => { setA(B); setB(A); setErrA(errB); setErrB(errA); setData(null); };
  const useMine = () => profile && (setA({ name: profile.name, birthdate: profile.birthdate }), setErrA({}));

  const save = (p, setErr) => {
    const e = validateInput(p.name, p.birthdate);
    setErr(e);
    if (Object.keys(e).length) return false;
    const { ok } = savePerson(p.name, p.birthdate);
    if (ok) toast.success(`${p.name.trim()} saved on this device`);
    else toast("Saving is blocked. Kept for this session only.");
    return true;
  };
  const saveBoth = () => { if (data) { savePerson(data.a.name, data.a.birthdate); const r = savePerson(data.b.name, data.b.birthdate); toast(r.ok ? "Both people saved on this device" : "Saving is blocked. Kept for this session only."); } };
  const share = async () => {
    const r = await shareOrCopy(compareShareUrl({ name: data.a.name, birthdate: data.a.birthdate }, { name: data.b.name, birthdate: data.b.birthdate }), "Our compatibility");
    if (r === "copied") toast.success("Link copied"); else if (r === "failed") toast.error("Could not share. Copy the address from your browser.");
  };

  const compareWith = (p) => { const nb = { name: p.name, birthdate: p.birthdate, id: p.id }; setB(nb); const a = A.name && A.birthdate ? A : profile ? { name: profile.name, birthdate: profile.birthdate } : A; setA(a); run(a, nb); };
  const editPerson = (p) => { setB({ name: p.name, birthdate: p.birthdate, id: p.id }); setData(null); document.getElementById("B-name")?.focus(); };

  return (
    <section aria-labelledby="compat-h" className="mx-auto max-w-[1200px]">
      <h2 id="compat-h" className="h-section text-ink">Compatibility</h2>
      <p className="mt-3 max-w-2xl text-[17px] leading-[1.6] text-muted">Enter two people. You get a score and a reading in each direction.</p>

      <form ref={formRef} noValidate onSubmit={(e) => { e.preventDefault(); run(A, B); }} className="mt-6">
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <PersonPanel id="A" title="Person A" value={A} onChange={setA} errors={errA} canUseProfile={!!profile} onUseProfile={useMine} people={people} onSave={() => save(A, setErrA)} />
          <button type="button" onClick={swap} aria-label="Swap people" className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-ink transition-[color,border-color,transform] hover:border-primary/60 hover:text-primary active:scale-[0.96]">
            <ArrowLeftRight className="h-5 w-5 rotate-90 md:rotate-0" aria-hidden="true" />
          </button>
          <PersonPanel id="B" title="Person B" value={B} onChange={setB} errors={errB} canUseProfile={!!profile} onUseProfile={() => profile && (setB({ name: profile.name, birthdate: profile.birthdate }), setErrB({}))} people={people} onSave={() => save(B, setErrB)} tone="text-primary" />
        </div>
        <Button type="submit" size="lg" className="mt-5 w-full min-h-[60px] text-[17px]">
          Compare these profiles <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>

      <div className="mt-8">
        {data && <CompatResult data={data} onShare={share} onSaveBoth={saveBoth} />}
      </div>

      <SavedPeople people={people} storageOk={storageOk} onEdit={editPerson} onCompare={compareWith} onRemove={removePerson} />
    </section>
  );
}
