import type { NextRequest } from "next/server";

export type GeoInfo = {
  ip: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
};

export function readGeo(req: NextRequest, opts: { consented: boolean }): GeoInfo {
  const ipRaw =
    req.ip ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    null;

  const ip = opts.consented ? ipRaw : truncateIp(ipRaw);

  // Vercel injects request.geo at the edge. In dev or non-Vercel envs it's undefined.
  const geo = (req as unknown as { geo?: Record<string, string | undefined> }).geo ?? {};

  return {
    ip,
    country: geo.country ?? null,
    region: geo.region ?? null,
    city: geo.city ?? null,
    latitude: geo.latitude ? Number(geo.latitude) : null,
    longitude: geo.longitude ? Number(geo.longitude) : null,
  };
}

function truncateIp(ip: string | null): string | null {
  if (!ip) return null;
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      parts[3] = "0";
      return parts.join(".");
    }
  }
  if (ip.includes(":")) {
    const parts = ip.split(":");
    return parts.slice(0, 4).concat(["0", "0", "0", "0"]).join(":");
  }
  return null;
}

const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|preview|monitor|lighthouse|headless|pingdom|uptime/i;

export function isLikelyBot(ua: string | null): boolean {
  if (!ua) return true;
  return BOT_RE.test(ua);
}
