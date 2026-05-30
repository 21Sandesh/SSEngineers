import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import { db, sessions, events } from "@/lib/db";
import { readGeo, isLikelyBot } from "@/lib/geo";
import { sql, eq } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_TYPES = new Set([
  "pageview",
  "click",
  "product_view",
  "scroll",
  "form_step",
  "form_submit",
]);

type Body = {
  visitorId?: string;
  sessionId?: string;
  consented?: boolean;
  type?: string;
  path?: string;
  payload?: Record<string, unknown>;
  referrer?: string | null;
  userAgent?: string;
  screen?: string;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function parseUtm(path: string | undefined) {
  if (!path) return { utmSource: null, utmMedium: null, utmCampaign: null };
  const qIdx = path.indexOf("?");
  if (qIdx === -1) return { utmSource: null, utmMedium: null, utmCampaign: null };
  const params = new URLSearchParams(path.slice(qIdx + 1));
  return {
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
  };
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { sessionId, visitorId, type } = body;
  if (!sessionId || !UUID_RE.test(sessionId)) return NextResponse.json({ ok: false }, { status: 400 });
  if (!type || !VALID_TYPES.has(type)) return NextResponse.json({ ok: false }, { status: 400 });

  const ua = body.userAgent ?? req.headers.get("user-agent");
  if (isLikelyBot(ua)) return NextResponse.json({ ok: true, bot: true });

  const consented = body.consented === true;
  const geo = readGeo(req, { consented });

  const parsed = ua ? new UAParser(ua).getResult() : null;
  const device = parsed?.device.type ?? (parsed?.device.model ? "mobile" : "desktop");
  const browser = parsed?.browser.name ?? null;
  const os = parsed?.os.name ?? null;

  const path = body.path ?? "/";
  const referrer = body.referrer ?? null;
  const utm = parseUtm(path);

  const safeVisitor = visitorId && UUID_RE.test(visitorId) ? visitorId : crypto.randomUUID();

  try {
    const existing = await db
      .select({ id: sessions.id })
      .from(sessions)
      .where(eq(sessions.id, sessionId))
      .limit(1);

    if (existing.length === 0) {
      await db
        .insert(sessions)
        .values({
          id: sessionId,
          visitorId: safeVisitor,
          consented,
          ip: geo.ip,
          country: geo.country,
          region: geo.region,
          city: geo.city,
          latitude: geo.latitude,
          longitude: geo.longitude,
          userAgent: ua,
          device,
          browser,
          os,
          referrer,
          utmSource: utm.utmSource,
          utmMedium: utm.utmMedium,
          utmCampaign: utm.utmCampaign,
          landingPath: path,
        })
        .onConflictDoNothing();
    } else {
      await db
        .update(sessions)
        .set({ lastSeenAt: sql`now()` })
        .where(eq(sessions.id, sessionId));
    }

    await db.insert(events).values({
      sessionId,
      type,
      path,
      payload: body.payload ?? {},
    });
  } catch (err) {
    console.error("track insert failed", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
