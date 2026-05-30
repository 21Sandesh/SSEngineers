"use client";

const VISITOR_KEY = "ss_visitor_id";
const SESSION_KEY = "ss_session_id";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode, ignore */
  }
}

function readSession(): { id: string; ts: number } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeSession(value: { id: string; ts: number }) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function getVisitorId(): string {
  let id = readStorage(VISITOR_KEY);
  if (!id) {
    id = uuid();
    writeStorage(VISITOR_KEY, id);
  }
  return id;
}

export function getSessionId(): string {
  const now = Date.now();
  const existing = readSession();
  if (existing && now - existing.ts < SESSION_TIMEOUT_MS) {
    writeSession({ id: existing.id, ts: now });
    return existing.id;
  }
  const id = uuid();
  writeSession({ id, ts: now });
  return id;
}

export function clearTracking() {
  try {
    localStorage.removeItem(VISITOR_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export type TrackEvent = {
  type: "pageview" | "click" | "product_view" | "scroll" | "form_step" | "form_submit";
  path?: string;
  payload?: Record<string, unknown>;
};

function readConsent(): "accepted" | "rejected" | null {
  try {
    const v = localStorage.getItem("ss_consent");
    if (v === "accepted" || v === "rejected") return v;
    return null;
  } catch {
    return null;
  }
}

export function track(event: TrackEvent) {
  if (typeof window === "undefined") return;
  const consent = readConsent();
  if (consent === null) return;

  const body = JSON.stringify({
    visitorId: consent === "accepted" ? getVisitorId() : "anon-" + getSessionId().slice(0, 8),
    sessionId: getSessionId(),
    consented: consent === "accepted",
    type: event.type,
    path: event.path ?? window.location.pathname + window.location.search,
    payload: event.payload ?? {},
    referrer: document.referrer || null,
    userAgent: navigator.userAgent,
    screen: `${window.innerWidth}x${window.innerHeight}`,
  });

  try {
    const blob = new Blob([body], { type: "application/json" });
    if ("sendBeacon" in navigator && navigator.sendBeacon("/api/track", blob)) return;
  } catch {
    /* fall through */
  }

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}
