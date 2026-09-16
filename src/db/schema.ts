import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const visits = pgTable(
  "visits",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    visitorId: text("visitor_id").notNull(),
    ipHash: text("ip_hash").notNull(),
    userAgent: text("user_agent").notNull(),
    visitDate: text("visit_date").notNull(),
    pageViews: integer("page_views").notNull().default(1),
    firstSeenAt: timestamp("first_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    unique("visits_visitor_date_unique").on(
      table.visitorId,
      table.visitDate,
    ),
    index("visits_visit_date_idx").on(table.visitDate),
  ],
);
