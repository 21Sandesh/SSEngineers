import "server-only";
import { db } from "./index";
import { sessions, events } from "./schema";
import { sql, desc, eq, and, gte, lt } from "drizzle-orm";

const DAY_MS = 24 * 60 * 60 * 1000;

export function rangeFromDays(days: number) {
  const to = new Date();
  const from = new Date(to.getTime() - days * DAY_MS);
  return { from, to };
}

export async function getKpis(days: number) {
  const { from } = rangeFromDays(days);
  const result = await db.execute<{
    visitors: string;
    sessions: string;
    pageviews: string;
    clicks: string;
    submits: string;
  }>(sql`
    SELECT
      COUNT(DISTINCT s.visitor_id) AS visitors,
      COUNT(DISTINCT s.id) AS sessions,
      COUNT(*) FILTER (WHERE e.type = 'pageview') AS pageviews,
      COUNT(*) FILTER (WHERE e.type = 'click') AS clicks,
      COUNT(*) FILTER (WHERE e.type = 'form_submit' AND e.payload->>'outcome' = 'success') AS submits
    FROM ${sessions} s
    LEFT JOIN ${events} e ON e.session_id = s.id
    WHERE s.started_at >= ${from}
  `);
  const row = result.rows[0];
  return {
    visitors: Number(row?.visitors ?? 0),
    sessions: Number(row?.sessions ?? 0),
    pageviews: Number(row?.pageviews ?? 0),
    clicks: Number(row?.clicks ?? 0),
    submits: Number(row?.submits ?? 0),
  };
}

export async function getDailySeries(days: number) {
  const { from } = rangeFromDays(days);
  const result = await db.execute<{ day: string; visitors: string; sessions: string; pageviews: string }>(sql`
    WITH days AS (
      SELECT generate_series(date_trunc('day', ${from}::timestamptz), date_trunc('day', now()), interval '1 day') AS day
    )
    SELECT
      to_char(d.day, 'YYYY-MM-DD') AS day,
      COUNT(DISTINCT s.visitor_id) AS visitors,
      COUNT(DISTINCT s.id) AS sessions,
      COUNT(e.id) FILTER (WHERE e.type = 'pageview') AS pageviews
    FROM days d
    LEFT JOIN ${sessions} s ON date_trunc('day', s.started_at) = d.day
    LEFT JOIN ${events} e ON e.session_id = s.id AND date_trunc('day', e.ts) = d.day
    GROUP BY d.day
    ORDER BY d.day ASC
  `);
  return result.rows.map((r) => ({
    day: r.day,
    visitors: Number(r.visitors),
    sessions: Number(r.sessions),
    pageviews: Number(r.pageviews),
  }));
}

export async function getTopPaths(days: number, limit = 10) {
  const { from } = rangeFromDays(days);
  return db
    .select({
      path: events.path,
      views: sql<number>`count(*)::int`,
    })
    .from(events)
    .where(and(eq(events.type, "pageview"), gte(events.ts, from)))
    .groupBy(events.path)
    .orderBy(desc(sql`count(*)`))
    .limit(limit);
}

export async function getTopReferrers(days: number, limit = 10) {
  const { from } = rangeFromDays(days);
  return db
    .select({
      referrer: sessions.referrer,
      visits: sql<number>`count(*)::int`,
    })
    .from(sessions)
    .where(gte(sessions.startedAt, from))
    .groupBy(sessions.referrer)
    .orderBy(desc(sql`count(*)`))
    .limit(limit);
}

export async function getTopCtas(days: number, limit = 10) {
  const { from } = rangeFromDays(days);
  const result = await db.execute<{ label: string; clicks: string }>(sql`
    SELECT payload->>'label' AS label, COUNT(*)::text AS clicks
    FROM ${events}
    WHERE type = 'click' AND ts >= ${from}
    GROUP BY 1
    ORDER BY COUNT(*) DESC
    LIMIT ${limit}
  `);
  return result.rows.map((r) => ({ label: r.label, clicks: Number(r.clicks) }));
}

export async function getTopCountries(days: number, limit = 10) {
  const { from } = rangeFromDays(days);
  return db
    .select({
      country: sessions.country,
      visitors: sql<number>`count(distinct ${sessions.visitorId})::int`,
    })
    .from(sessions)
    .where(gte(sessions.startedAt, from))
    .groupBy(sessions.country)
    .orderBy(desc(sql`count(distinct ${sessions.visitorId})`))
    .limit(limit);
}

export async function getDeviceBreakdown(days: number) {
  const { from } = rangeFromDays(days);
  return db
    .select({
      device: sessions.device,
      sessions: sql<number>`count(*)::int`,
    })
    .from(sessions)
    .where(gte(sessions.startedAt, from))
    .groupBy(sessions.device)
    .orderBy(desc(sql`count(*)`));
}

export async function getBrowserBreakdown(days: number) {
  const { from } = rangeFromDays(days);
  return db
    .select({
      browser: sessions.browser,
      sessions: sql<number>`count(*)::int`,
    })
    .from(sessions)
    .where(gte(sessions.startedAt, from))
    .groupBy(sessions.browser)
    .orderBy(desc(sql`count(*)`));
}

export async function getSessionsList(opts: {
  days: number;
  country?: string;
  device?: string;
  offset?: number;
  limit?: number;
}) {
  const { from } = rangeFromDays(opts.days);
  const limit = opts.limit ?? 50;
  const offset = opts.offset ?? 0;
  const countryFilter = opts.country ? sql`AND s.country = ${opts.country}` : sql``;
  const deviceFilter = opts.device ? sql`AND s.device = ${opts.device}` : sql``;
  const result = await db.execute<{
    id: string;
    started_at: string;
    last_seen_at: string;
    country: string | null;
    city: string | null;
    device: string | null;
    browser: string | null;
    landing_path: string | null;
    referrer: string | null;
    event_count: string;
  }>(sql`
    SELECT s.id, s.started_at, s.last_seen_at, s.country, s.city, s.device, s.browser,
           s.landing_path, s.referrer,
           COUNT(e.id)::text AS event_count
    FROM ${sessions} s
    LEFT JOIN ${events} e ON e.session_id = s.id
    WHERE s.started_at >= ${from}
      ${countryFilter}
      ${deviceFilter}
    GROUP BY s.id
    ORDER BY s.started_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `);
  return result.rows.map((r) => ({
    id: r.id,
    startedAt: r.started_at,
    lastSeenAt: r.last_seen_at,
    country: r.country,
    city: r.city,
    device: r.device,
    browser: r.browser,
    landingPath: r.landing_path,
    referrer: r.referrer,
    eventCount: Number(r.event_count),
  }));
}

export async function getSessionById(id: string) {
  const [s] = await db.select().from(sessions).where(eq(sessions.id, id)).limit(1);
  if (!s) return null;
  const ev = await db
    .select()
    .from(events)
    .where(eq(events.sessionId, id))
    .orderBy(events.ts);
  return { session: s, events: ev };
}

export async function getProductViews(days: number, limit = 20) {
  const { from } = rangeFromDays(days);
  const result = await db.execute<{ label: string; views: string }>(sql`
    SELECT payload->>'label' AS label, COUNT(*)::text AS views
    FROM ${events}
    WHERE type = 'product_view' AND ts >= ${from}
    GROUP BY 1
    ORDER BY COUNT(*) DESC
    LIMIT ${limit}
  `);
  return result.rows.map((r) => ({ label: r.label, views: Number(r.views) }));
}

export async function getContactFunnel(days: number) {
  const { from } = rangeFromDays(days);
  const result = await db.execute<{
    visited_contact: string;
    form_started: string;
    form_filled: string;
    submit_attempts: string;
    submit_success: string;
  }>(sql`
    WITH per_session AS (
      SELECT
        s.id,
        bool_or(e.type = 'pageview' AND e.path LIKE '/contact%') AS visited_contact,
        bool_or(e.type = 'form_step') AS form_started,
        (COUNT(DISTINCT e.payload->>'field') FILTER (WHERE e.type = 'form_step') >= 2) AS form_filled,
        bool_or(e.type = 'form_submit') AS submit_attempts,
        bool_or(e.type = 'form_submit' AND e.payload->>'outcome' = 'success') AS submit_success
      FROM ${sessions} s
      LEFT JOIN ${events} e ON e.session_id = s.id
      WHERE s.started_at >= ${from}
      GROUP BY s.id
    )
    SELECT
      COUNT(*) FILTER (WHERE visited_contact)::text AS visited_contact,
      COUNT(*) FILTER (WHERE form_started)::text AS form_started,
      COUNT(*) FILTER (WHERE form_filled)::text AS form_filled,
      COUNT(*) FILTER (WHERE submit_attempts)::text AS submit_attempts,
      COUNT(*) FILTER (WHERE submit_success)::text AS submit_success
    FROM per_session
  `);
  const r = result.rows[0];
  return {
    visitedContact: Number(r?.visited_contact ?? 0),
    formStarted: Number(r?.form_started ?? 0),
    formFilled: Number(r?.form_filled ?? 0),
    submitAttempts: Number(r?.submit_attempts ?? 0),
    submitSuccess: Number(r?.submit_success ?? 0),
  };
}

function csvCell(v: unknown): string {
  if (v == null) return "";
  const s = String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function exportSessionsCsv(days: number): Promise<string> {
  const { from } = rangeFromDays(days);
  const result = await db.execute<{
    id: string;
    visitor_id: string;
    started_at: string;
    last_seen_at: string;
    consented: boolean;
    ip: string | null;
    country: string | null;
    region: string | null;
    city: string | null;
    device: string | null;
    browser: string | null;
    os: string | null;
    referrer: string | null;
    landing_path: string | null;
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
  }>(sql`
    SELECT id, visitor_id, started_at, last_seen_at, consented, ip, country, region, city,
           device, browser, os, referrer, landing_path, utm_source, utm_medium, utm_campaign
    FROM ${sessions}
    WHERE started_at >= ${from}
    ORDER BY started_at DESC
  `);

  const header = [
    "session_id", "visitor_id", "started_at", "last_seen_at", "consented",
    "ip", "country", "region", "city", "device", "browser", "os",
    "referrer", "landing_path", "utm_source", "utm_medium", "utm_campaign",
  ];
  const csvRows: string[] = [header.join(",")];
  for (const r of result.rows) {
    csvRows.push([
      r.id, r.visitor_id, r.started_at, r.last_seen_at, String(r.consented),
      r.ip, r.country, r.region, r.city, r.device, r.browser, r.os,
      r.referrer, r.landing_path, r.utm_source, r.utm_medium, r.utm_campaign,
    ].map(csvCell).join(","));
  }
  return csvRows.join("\n");
}

export async function exportEventsCsv(days: number): Promise<string> {
  const { from } = rangeFromDays(days);
  const result = await db.execute<{
    id: string;
    session_id: string;
    ts: string;
    type: string;
    path: string | null;
    payload: unknown;
  }>(sql`
    SELECT id::text, session_id, ts, type, path, payload
    FROM ${events}
    WHERE ts >= ${from}
    ORDER BY ts DESC
  `);
  const header = ["event_id", "session_id", "ts", "type", "path", "payload"];
  const csvRows: string[] = [header.join(",")];
  for (const r of result.rows) {
    csvRows.push([
      r.id, r.session_id, r.ts, r.type, r.path, JSON.stringify(r.payload ?? {}),
    ].map(csvCell).join(","));
  }
  return csvRows.join("\n");
}

export async function pruneOldData(days: number) {
  const cutoff = new Date(Date.now() - days * DAY_MS);
  await db.delete(sessions).where(lt(sessions.lastSeenAt, cutoff));
}
