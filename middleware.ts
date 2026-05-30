import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";

async function isValid(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload?.role === "admin";
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";

  if (isLoginPage || isLoginApi) return NextResponse.next();

  const secret = process.env.ADMIN_COOKIE_SECRET;
  if (!secret) {
    return new NextResponse("Admin not configured (set ADMIN_COOKIE_SECRET)", { status: 503 });
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const ok = await isValid(token, secret);

  if (!ok) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = `?from=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
