import { NextRequest, NextResponse } from "next/server";
import { checkPassword, setAdminCookie } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 1000;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.ip ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
  }

  let password = "";
  try {
    const body = (await req.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
