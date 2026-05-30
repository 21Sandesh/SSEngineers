import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  const s = process.env.ADMIN_COOKIE_SECRET;
  if (!s || s.length < 16) {
    throw new Error("ADMIN_COOKIE_SECRET is missing or too short (set 32+ chars in env)");
  }
  return new TextEncoder().encode(s);
}

export async function createAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_MAX_AGE}s`)
    .sign(secret());
}

export async function verifyAdminToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload?.role === "admin";
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function setAdminCookie() {
  const token = await createAdminToken();
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export function clearAdminCookie() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function isAdminFromCookies(): Promise<boolean> {
  const token = cookies().get(COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
