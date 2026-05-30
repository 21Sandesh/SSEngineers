import { notFound } from "next/navigation";
import Link from "next/link";
import SectionCard from "@/components/admin/SectionCard";
import { getSessionById } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function fmtDate(d: Date | string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "medium" });
}

function fmtPayload(p: unknown): string {
  if (!p || typeof p !== "object") return "";
  const entries = Object.entries(p as Record<string, unknown>);
  if (entries.length === 0) return "";
  return entries.map(([k, v]) => `${k}=${String(v)}`).join(" · ");
}

export default async function VisitorDetailPage({ params }: { params: { id: string } }) {
  if (!UUID_RE.test(params.id)) notFound();
  const data = await getSessionById(params.id);
  if (!data) notFound();
  const { session, events } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/visitors" className="text-xs text-ink-muted hover:text-ink">
            ← Back to visitors
          </Link>
          <h1 className="display-tight mt-2 text-3xl text-ink">Session detail</h1>
          <p className="mt-1 font-mono text-xs text-ink-muted">{session.id}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="Visitor">
          <dl className="grid grid-cols-[120px,1fr] gap-y-2 text-sm">
            <dt className="text-ink-muted">Visitor ID</dt>
            <dd className="font-mono text-xs">{session.visitorId}</dd>
            <dt className="text-ink-muted">First seen</dt>
            <dd>{fmtDate(session.startedAt)}</dd>
            <dt className="text-ink-muted">Last seen</dt>
            <dd>{fmtDate(session.lastSeenAt)}</dd>
            <dt className="text-ink-muted">Consent</dt>
            <dd>{session.consented ? "Accepted" : "Rejected (anonymous)"}</dd>
          </dl>
        </SectionCard>

        <SectionCard title="Location & device">
          <dl className="grid grid-cols-[120px,1fr] gap-y-2 text-sm">
            <dt className="text-ink-muted">IP</dt>
            <dd className="font-mono text-xs">{session.ip ?? "—"}</dd>
            <dt className="text-ink-muted">Country</dt>
            <dd>{session.country ?? "—"}</dd>
            <dt className="text-ink-muted">Region</dt>
            <dd>{session.region ?? "—"}</dd>
            <dt className="text-ink-muted">City</dt>
            <dd>{session.city ?? "—"}</dd>
            <dt className="text-ink-muted">Device</dt>
            <dd>{session.device ?? "—"}</dd>
            <dt className="text-ink-muted">Browser</dt>
            <dd>{session.browser ?? "—"}</dd>
            <dt className="text-ink-muted">OS</dt>
            <dd>{session.os ?? "—"}</dd>
            <dt className="text-ink-muted">User agent</dt>
            <dd className="break-all text-xs">{session.userAgent ?? "—"}</dd>
          </dl>
        </SectionCard>

        <SectionCard title="Source">
          <dl className="grid grid-cols-[120px,1fr] gap-y-2 text-sm">
            <dt className="text-ink-muted">Landing</dt>
            <dd className="font-mono text-xs">{session.landingPath ?? "—"}</dd>
            <dt className="text-ink-muted">Referrer</dt>
            <dd className="break-all text-xs">{session.referrer ?? "Direct"}</dd>
            <dt className="text-ink-muted">UTM source</dt>
            <dd>{session.utmSource ?? "—"}</dd>
            <dt className="text-ink-muted">UTM medium</dt>
            <dd>{session.utmMedium ?? "—"}</dd>
            <dt className="text-ink-muted">UTM campaign</dt>
            <dd>{session.utmCampaign ?? "—"}</dd>
          </dl>
        </SectionCard>

        <SectionCard title="Microsoft Clarity">
          <p className="text-sm text-ink-soft">
            Recordings (if Clarity is enabled) are tagged with the session ID below — search for it in the Clarity dashboard.
          </p>
          <p className="mt-3 break-all rounded bg-paper p-3 font-mono text-xs">{session.id}</p>
        </SectionCard>
      </div>

      <SectionCard title={`Timeline · ${events.length} events`}>
        <ol className="relative space-y-3 border-l border-line pl-5">
          {events.map((e) => (
            <li key={e.id} className="relative">
              <span className="absolute -left-[1.4rem] mt-1.5 grid h-2 w-2 place-items-center rounded-full bg-brand" />
              <div className="flex flex-wrap items-baseline gap-2 text-sm">
                <span className="font-mono text-[11px] text-ink-muted">{fmtDate(e.ts)}</span>
                <span className="rounded bg-paper px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  {e.type}
                </span>
                {e.path && <span className="font-mono text-xs">{e.path}</span>}
              </div>
              {e.payload != null && Object.keys(e.payload as object).length > 0 && (
                <p className="mt-1 text-xs text-ink-muted">{fmtPayload(e.payload)}</p>
              )}
            </li>
          ))}
          {events.length === 0 && (
            <li className="pl-2 text-sm text-ink-muted">No events recorded for this session.</li>
          )}
        </ol>
      </SectionCard>
    </div>
  );
}
