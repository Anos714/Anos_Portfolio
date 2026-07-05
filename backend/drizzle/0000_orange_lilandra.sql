CREATE TABLE "visits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"visitor_id" text NOT NULL,
	"ip_hash" text NOT NULL,
	"user_agent" text NOT NULL,
	"path" text DEFAULT '/' NOT NULL,
	"referrer" text,
	"is_unique_daily" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "visits_visitor_id_idx" ON "visits" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "visits_created_at_idx" ON "visits" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "visits_unique_daily_idx" ON "visits" USING btree ("is_unique_daily");