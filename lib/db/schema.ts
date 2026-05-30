import {
  pgTable,
  uuid,
  text,
  timestamp,
  bigserial,
  jsonb,
  index,
  doublePrecision,
  boolean,
} from "drizzle-orm/pg-core";

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    visitorId: uuid("visitor_id").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).notNull().defaultNow(),
    consented: boolean("consented").notNull().default(false),
    ip: text("ip"),
    country: text("country"),
    region: text("region"),
    city: text("city"),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    userAgent: text("user_agent"),
    device: text("device"),
    browser: text("browser"),
    os: text("os"),
    referrer: text("referrer"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    landingPath: text("landing_path"),
  },
  (t) => ({
    visitorIdx: index("sessions_visitor_idx").on(t.visitorId),
    startedIdx: index("sessions_started_idx").on(t.startedAt),
    lastSeenIdx: index("sessions_last_seen_idx").on(t.lastSeenAt),
  }),
);

export const events = pgTable(
  "events",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => sessions.id, { onDelete: "cascade" }),
    ts: timestamp("ts", { withTimezone: true }).notNull().defaultNow(),
    type: text("type").notNull(),
    path: text("path"),
    payload: jsonb("payload").$type<Record<string, unknown>>(),
  },
  (t) => ({
    sessionIdx: index("events_session_idx").on(t.sessionId),
    tsIdx: index("events_ts_idx").on(t.ts),
    typeIdx: index("events_type_idx").on(t.type),
    pathIdx: index("events_path_idx").on(t.path),
  }),
);

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export type EventType =
  | "pageview"
  | "click"
  | "product_view"
  | "scroll"
  | "form_step"
  | "form_submit";
