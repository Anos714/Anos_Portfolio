import { boolean, index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const visits = pgTable(
  "visits",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    visitorId: text("visitor_id").notNull(),
    ipHash: text("ip_hash").notNull(),
    userAgent: text("user_agent").notNull(),
    path: text("path").notNull().default("/"),
    referrer: text("referrer"),
    isUniqueDaily: boolean("is_unique_daily").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("visits_visitor_id_idx").on(table.visitorId),
    index("visits_created_at_idx").on(table.createdAt),
    index("visits_unique_daily_idx").on(table.isUniqueDaily),
  ],
);
