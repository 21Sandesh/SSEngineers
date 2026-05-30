import RangePicker from "@/components/admin/RangePicker";
import SectionCard from "@/components/admin/SectionCard";
import { getContactFunnel } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

function parseDays(value: string | string[] | undefined): number {
  const v = Array.isArray(value) ? value[0] : value;
  const n = Number(v);
  if ([1, 7, 30, 90].includes(n)) return n;
  return 30;
}

function pct(numerator: number, denominator: number): string {
  if (denominator === 0) return "—";
  return `${Math.round((numerator / denominator) * 100)}%`;
}

export default async function FunnelPage({
  searchParams,
}: {
  searchParams: { days?: string };
}) {
  const days = parseDays(searchParams.days);
  const f = await getContactFunnel(days);

  const steps = [
    { label: "Visited /contact", value: f.visitedContact, base: f.visitedContact },
    { label: "Started filling form", value: f.formStarted, base: f.visitedContact },
    { label: "Filled 2+ fields", value: f.formFilled, base: f.formStarted },
    { label: "Attempted submit", value: f.submitAttempts, base: f.formFilled },
    { label: "Submit success", value: f.submitSuccess, base: f.submitAttempts },
  ];

  const max = Math.max(...steps.map((s) => s.value), 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="display-tight text-3xl text-ink">Contact funnel</h1>
        <RangePicker current={days} />
      </div>

      <SectionCard title="Step-by-step drop-off">
        <ol className="space-y-3">
          {steps.map((s, i) => {
            const widthPct = (s.value / max) * 100;
            const conv = i === 0 ? "100%" : pct(s.value, s.base);
            return (
              <li key={s.label}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-ink">{s.label}</span>
                  <span className="text-ink-muted">
                    <span className="font-mono">{s.value}</span> sessions ·{" "}
                    <span className="font-mono">{conv}</span> conv.
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded bg-paper">
                  <div
                    className="h-full bg-gradient-to-r from-brand to-amber"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 text-xs text-ink-muted">
          Conversion rates are step-over-previous. Filled 2+ fields = at least two distinct fields focused, used as a "real intent" signal.
        </p>
      </SectionCard>
    </div>
  );
}
