import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let confirm = "";
  try {
    const body = (await req.json()) as { confirm?: string };
    confirm = body.confirm ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (confirm !== "DELETE") {
    return NextResponse.json(
      { error: "Type DELETE to confirm." },
      { status: 400 },
    );
  }

  await sql`TRUNCATE events, sessions RESTART IDENTITY`;
  return NextResponse.json({ ok: true });
}
