import SectionCard from "@/components/admin/SectionCard";
import DangerZone from "@/components/admin/DangerZone";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  return (
    <div className="space-y-6">
      <h1 className="display-tight text-3xl text-ink">Settings</h1>

      <SectionCard title="Data export">
        <p className="text-sm text-ink-soft">Download analytics data as CSV for offline analysis.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="/api/admin/export/sessions?days=30"
            className="btn-ghost"
          >
            Sessions · last 30 days
          </a>
          <a
            href="/api/admin/export/sessions?days=90"
            className="btn-ghost"
          >
            Sessions · last 90 days
          </a>
          <a
            href="/api/admin/export/events?days=30"
            className="btn-ghost"
          >
            Events · last 30 days
          </a>
        </div>
      </SectionCard>

      <SectionCard title="External dashboards">
        <ul className="space-y-3 text-sm">
          <li>
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              Vercel Analytics →
            </a>
            <p className="mt-1 text-xs text-ink-muted">Pageviews, devices, top pages (Vercel-native).</p>
          </li>
          <li>
            <a
              href={
                clarityId
                  ? `https://clarity.microsoft.com/projects/view/${clarityId}/dashboard`
                  : "https://clarity.microsoft.com"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              Microsoft Clarity →
            </a>
            <p className="mt-1 text-xs text-ink-muted">
              {clarityId
                ? "Heatmaps, session recordings, scroll maps. Search by session ID to find a specific recording."
                : "Not configured. Set NEXT_PUBLIC_CLARITY_ID env var to enable."}
            </p>
          </li>
        </ul>
      </SectionCard>

      <SectionCard title="Account">
        <p className="text-sm text-ink-soft">
          Admin password is set via the <code className="rounded bg-paper px-1.5 py-0.5 text-xs">ADMIN_PASSWORD</code> environment variable in Vercel. To change it, update the env var in the Vercel project and redeploy.
        </p>
      </SectionCard>

      <SectionCard title="Data retention">
        <p className="text-sm text-ink-soft">
          By default, all analytics data is retained indefinitely. To purge old data, call <code className="rounded bg-paper px-1.5 py-0.5 text-xs">pruneOldData(days)</code> from a scheduled job (recommended: keep 365 days).
        </p>
      </SectionCard>

      <DangerZone />
    </div>
  );
}
