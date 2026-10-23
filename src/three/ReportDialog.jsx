import { Dialog, useForm, SpamTrap } from "@wron/kit";
import { Button } from "../ui";

export default function ReportDialog({ row, onClose }) {
  const form = useForm("report");
  return (
    <Dialog open={!!row} onClose={onClose} title="Report this member" panelClassName="bg-surface border border-line p-6 max-w-md">
      {form.sent ? (
        <div>
          <p className="text-[17px] leading-[1.6] text-ink">Thank you. The site owner will look at this card.</p>
          <Button className="mt-5" onClick={onClose}>Close</Button>
        </div>
      ) : (
        <form onSubmit={form.onSubmit} className="space-y-4">
          <SpamTrap />
          <input type="hidden" name="profile_id" value={row?.id || ""} />
          <input type="hidden" name="profile_name" value={row?.display_name || ""} />
          <div>
            <label htmlFor="rp-reason" className="mb-2 block text-[14px] font-[550] text-ink/90">What is wrong?</label>
            <textarea id="rp-reason" name="reason" required rows={4} maxLength={600} className="block w-full rounded-theme border border-line bg-bg/60 px-4 py-3 text-[17px] text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          {form.error && <p role="alert" className="text-[14px] text-red-300">{String(form.error)}</p>}
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={form.sending}>{form.sending ? "Sending" : "Send report"}</Button>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
