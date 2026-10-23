import { UserRound, CalendarDays } from "lucide-react";
import { Field, Panel } from "../ui";
import { localDateKey } from "../../lib/engine";
import ChartFields from "./ChartFields";

export default function PersonBox({ id, title, value, onChange, errors = {}, extra }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  return (
    <Panel className="p-5 md:p-6">
      <h3 className="text-[22px] font-[550] text-ink">{title}</h3>
      <div className="mt-5 space-y-4">
        <Field id={`${id}-name`} label="Full name" icon={UserRound} placeholder="Full name" autoComplete="off" value={value.name} error={errors.name} onChange={(e) => set("name", e.target.value)} />
        <Field id={`${id}-date`} label="Birthdate" icon={CalendarDays} type="date" max={localDateKey()} min="1924-01-01" value={value.birthdate} error={errors.birthdate} onChange={(e) => set("birthdate", e.target.value)} />
        <ChartFields id={id} value={value.chart} onChange={(c) => set("chart", c)} />
      </div>
      {extra}
    </Panel>
  );
}
