import { useState } from "react";
import { toast } from "@wron/kit";
import { Panel, MonoLabel, Button } from "../ui";
import { useProfile } from "../ProfileProvider";

export default function PrivacyControls() {
  const { profile, people, resetProfile, removePerson, storageOk } = useProfile();
  const [busy, setBusy] = useState(false);

  const clearAll = () => {
    setBusy(true);
    people.forEach((p) => removePerson(p.id));
    resetProfile();
    toast.success("Saved profile and people removed from this device");
    setBusy(false);
  };
  const empty = !profile && people.length === 0;

  return (
    <Panel className="p-5">
      <MonoLabel className="mb-3">On this device now</MonoLabel>
      <dl className="divide-y divide-line text-[15px]">
        <div className="flex items-center justify-between py-3">
          <dt className="text-muted">Saved profile</dt>
          <dd className="num font-[550]">{profile ? "Yes" : "None"}</dd>
        </div>
        <div className="flex items-center justify-between py-3">
          <dt className="text-muted">Saved people</dt>
          <dd className="num font-[550]">{people.length}</dd>
        </div>
        <div className="flex items-center justify-between py-3">
          <dt className="text-muted">Saving</dt>
          <dd className="font-[550]">{storageOk ? "Available" : "Blocked"}</dd>
        </div>
      </dl>
      {!storageOk && <p className="mt-3 text-[14px] leading-snug text-muted">Saving is blocked in this browser, so data lasts for this session only.</p>}
      <Button variant="secondary" className="mt-4 w-full" onClick={clearAll} disabled={empty || busy}>
        Delete my saved data
      </Button>
      {empty && <p className="mt-3 text-[13px] text-muted">Nothing is saved on this device.</p>}
    </Panel>
  );
}
