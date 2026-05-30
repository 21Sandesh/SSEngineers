import Link from "next/link";
import RangePicker from "@/components/admin/RangePicker";
import SectionCard from "@/components/admin/SectionCard";
import DataTable from "@/components/admin/DataTable";
import { getSessionsList } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

function parseDays(value: string | string[] | undefined): number {
  const v = Array.isArray(value) ? value[0] : value;
  const n = Number(v);
  if ([1, 7, 30, 90].includes(n)) return n;
  return 7;
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

export default async function VisitorsPage({
  searchParams,
}: {
  searchParams: { days?: string; country?: string; device?: string };
}) {
  const days = parseDays(searchParams.days);
  const rows = await getSessionsList({
    days,
    country: searchParams.country,
    device: searchParams.device,
    limit: 100,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="display-tight text-3xl text-ink">Visitors</h1>
        <div className="flex items-center gap-3">
          <a
            href={`/api/admin/export/sessions?days=${days}`}
            className="rounded border border-line-strong px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-ink hover:bg-ink hover:text-white"
          >
            Export CSV
          </a>
          <RangePicker current={days} />
        </div>
      </div>

      <SectionCard title={`${rows.length} session${rows.length === 1 ? "" : "s"}`}>
        <DataTable
          rows={rows.map((r) => ({ ...r }))}
          empty="No visitor sessions in this range yet."
          columns={[
            {
              key: "startedAt",
              header: "When",
              render: (r) => <span className="whitespace-nowrap text-xs">{fmtDate(r.startedAt)}</span>,
            },
            {
              key: "country",
              header: "Location",
              render: (r) =>
                [r.city, r.country].filter(Boolean).join(", ") || <span className="text-ink-muted">Unknown</span>,
            },
            {
              key: "device",
              header: "Device",
              render: (r) => `${r.device ?? "?"} · ${r.browser ?? "?"}`,
            },
            {
              key: "landingPath",
              header: "Landed on",
              render: (r) => <span className="font-mono text-xs">{r.landingPath ?? "—"}</span>,
            },
            {
              key: "referrer",
              header: "Referrer",
              render: (r) => (
                <span className="block max-w-[180px] truncate text-xs" title={r.referrer ?? ""}>
                  {r.referrer || "Direct"}
                </span>
              ),
            },
            {
              key: "eventCount",
              header: "Events",
              className: "text-right",
            },
            {
              key: "id",
              header: "",
              render: (r) => (
                <Link href={`/admin/visitors/${r.id}`} className="text-xs font-semibold text-brand hover:underline">
                  View →
                </Link>
              ),
            },
          ]}
        />
      </SectionCard>
    </div>
  );
}
