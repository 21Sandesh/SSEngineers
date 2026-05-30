import { NextRequest } from "next/server";
import { exportSessionsCsv } from "@/lib/db/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseDays(value: string | null): number {
  const n = Number(value);
  if ([1, 7, 30, 90, 365].includes(n)) return n;
  return 30;
}

export async function GET(req: NextRequest) {
  const days = parseDays(req.nextUrl.searchParams.get("days"));
  const csv = await exportSessionsCsv(days);
  const filename = `sessions-${days}d-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
