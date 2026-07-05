import { and, count, eq, gte, sql } from "drizzle-orm";
import { getDb } from "../db/client.js";
import { visits } from "../db/schema.js";
import { getRedis } from "./redis.js";
import { createHashValue } from "../utils/hash.js";

type RecordVisitInput = {
  ip: string;
  userAgent: string;
  path?: string;
  referrer?: string | null;
};

const oneDayInSeconds = 60 * 60 * 24;

const getUtcDateKey = () => new Date().toISOString().slice(0, 10);

const getTodayStart = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
};

export const recordVisit = async ({ ip, userAgent, path, referrer }: RecordVisitInput) => {
  const db = getDb();
  const redis = getRedis();
  const visitorId = createHashValue(`visitor:${ip}:${userAgent}`);
  const ipHash = createHashValue(`ip:${ip}`);
  const dailyKey = `portfolio:visitor:${visitorId}:${getUtcDateKey()}`;
  const dailySetResult = await redis.set(dailyKey, "1", {
    nx: true,
    ex: oneDayInSeconds,
  });
  const isNewDailyVisitor = dailySetResult === "OK";

  await db.insert(visits).values({
    visitorId,
    ipHash,
    userAgent,
    path: path || "/",
    referrer: referrer || null,
    isUniqueDaily: isNewDailyVisitor,
  });

  const todayStart = getTodayStart();
  const [uniqueVisitorsResult, todayUniqueVisitorsResult, pageViewsResult] =
    await Promise.all([
      db
        .select({ value: sql<number>`count(distinct ${visits.visitorId})` })
        .from(visits),
      db
        .select({ value: count() })
        .from(visits)
        .where(and(eq(visits.isUniqueDaily, true), gte(visits.createdAt, todayStart))),
      db.select({ value: count() }).from(visits),
    ]);

  return {
    uniqueVisitors: Number(uniqueVisitorsResult[0]?.value ?? 0),
    todayUniqueVisitors: Number(todayUniqueVisitorsResult[0]?.value ?? 0),
    pageViews: Number(pageViewsResult[0]?.value ?? 0),
    isNewDailyVisitor,
  };
};
