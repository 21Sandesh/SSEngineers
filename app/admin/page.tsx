import KpiTile from "@/components/admin/KpiTile";
import DailyChart from "@/components/admin/DailyChart";
import DataTable from "@/components/admin/DataTable";
import SectionCard from "@/components/admin/SectionCard";
import RangePicker from "@/components/admin/RangePicker";
import {
  getKpis,
  getDailySeries,
  getTopPaths,
  getTopReferrers,
  getTopCtas,
  getTopCountries,
  getDeviceBreakdown,
  getBrowserBreakdown,
} from "@/lib/db/queries";

export const dynamic = "force-dynamic";

function parseDays(value: string | string[] | undefined): number {
  const v = Array.isArray(value) ? value[0] : value;
  const n = Number(v);
  if ([1, 7, 30, 90].includes(n)) return n;
  return 7;
}

export default async function AdminOverviewPage({
  searchParams,
}: {
  searchParams: { days?: string };
}) {
  const days = parseDays(searchParams.days);
  const [
    kpis,
    daily,
    topPaths,
    topReferrers,
    topCtas,
    topCountries,
    devices,
    browsers,
  ] = await Promise.all([
    getKpis(days),
    getDailySeries(days),
    getTopPaths(days, 8),
    getTopReferrers(days, 8),
    getTopCtas(days, 8),
    getTopCountries(days, 8),
    getDeviceBreakdown(days),
    getBrowserBreakdown(days),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="display-tight text-3xl text-ink">Overview</h1>
        <RangePicker current={days} />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <KpiTile label="Unique visitors" value={kpis.visitors} />
        <KpiTile label="Sessions" value={kpis.sessions} />
        <KpiTile label="Pageviews" value={kpis.pageviews} />
        <KpiTile label="Clicks" value={kpis.clicks} />
        <KpiTile label="Form submits" value={kpis.submits} />
      </div>

      <SectionCard title="Visitors over time">
        <DailyChart data={daily} />
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="Top pages">
          <DataTable
            rows={topPaths.map((r) => ({ ...r }))}
            columns={[
              { key: "path", header: "Path", render: (r) => <span className="font-mono text-xs">{r.path ?? "—"}</span> },
              { key: "views", header: "Views", className: "text-right" },
            ]}
          />
        </SectionCard>

        <SectionCard title="Top CTAs clicked">
          <DataTable
            rows={topCtas.map((r) => ({ ...r }))}
            columns={[
              { key: "label", header: "Label", render: (r) => <span className="font-mono text-xs">{r.label ?? "—"}</span> },
              { key: "clicks", header: "Clicks", className: "text-right" },
            ]}
          />
        </SectionCard>

        <SectionCard title="Top referrers">
          <DataTable
            rows={topReferrers.map((r) => ({ ...r }))}
            columns={[
              {
                key: "referrer",
                header: "Source",
                render: (r) => <span className="break-all text-xs">{r.referrer || "Direct / none"}</span>,
              },
              { key: "visits", header: "Visits", className: "text-right" },
            ]}
          />
        </SectionCard>

        <SectionCard title="Countries">
          <DataTable
            rows={topCountries.map((r) => ({ ...r }))}
            columns={[
              { key: "country", header: "Country", render: (r) => r.country || "Unknown" },
              { key: "visitors", header: "Visitors", className: "text-right" },
            ]}
          />
        </SectionCard>

        <SectionCard title="Devices">
          <DataTable
            rows={devices.map((r) => ({ ...r }))}
            columns={[
              { key: "device", header: "Device", render: (r) => r.device || "Unknown" },
              { key: "sessions", header: "Sessions", className: "text-right" },
            ]}
          />
        </SectionCard>

        <SectionCard title="Browsers">
          <DataTable
            rows={browsers.map((r) => ({ ...r }))}
            columns={[
              { key: "browser", header: "Browser", render: (r) => r.browser || "Unknown" },
              { key: "sessions", header: "Sessions", className: "text-right" },
            ]}
          />
        </SectionCard>
      </div>
    </div>
  );
}
