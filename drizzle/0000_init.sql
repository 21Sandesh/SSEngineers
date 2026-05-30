CREATE TABLE IF NOT EXISTS "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"visitor_id" uuid NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	"consented" boolean DEFAULT false NOT NULL,
	"ip" text,
	"country" text,
	"region" text,
	"city" text,
	"latitude" double precision,
	"longitude" double precision,
	"user_agent" text,
	"device" text,
	"browser" text,
	"os" text,
	"referrer" text,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"landing_path" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"session_id" uuid NOT NULL,
	"ts" timestamp with time zone DEFAULT now() NOT NULL,
	"type" text NOT NULL,
	"path" text,
	"payload" jsonb,
	CONSTRAINT "events_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE cascade ON UPDATE no action
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_visitor_idx" ON "sessions" ("visitor_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_started_idx" ON "sessions" ("started_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_last_seen_idx" ON "sessions" ("last_seen_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "events_session_idx" ON "events" ("session_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "events_ts_idx" ON "events" ("ts");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "events_type_idx" ON "events" ("type");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "events_path_idx" ON "events" ("path");
