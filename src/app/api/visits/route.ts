import { createHash } from "node:crypto";
import { NextRequest } from "next/server";
import { count, gte, sql } from "drizzle-orm";
import { db } from "@/db";
import { visits } from "@/db/schema";

function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function getVisitorId(ip: string, userAgent: string): string {
  return createHash("sha256")
    .update(`visitor:${ip}:${userAgent}`)
    .digest("hex");
}

function getUtcDateKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export const runtime = "nodejs";

const COUNT_CACHE_TTL_MS = 5_000;
let countCache: { value: number; at: number } | null = null;

function isCacheFresh(now: number) {
  return countCache !== null && now - countCache.at < COUNT_CACHE_TTL_MS;
}

export async function GET() {
  try {
    const now = Date.now();
    if (isCacheFresh(now) && countCache !== null) {
      return Response.json({
        uniqueVisitors: countCache.value,
        cached: true,
      });
    }

    const [total, today, pageViews] = await Promise.all([
      db.select({ value: count() }).from(visits),
      db
        .select({ value: count() })
        .from(visits)
        .where(gte(visits.visitDate, getUtcDateKey())),
      db
        .select({ value: sql<number>`coalesce(sum(${visits.pageViews}), 0)` })
        .from(visits),
    ]);

    const uniqueVisitors = Number(total[0]?.value ?? 0);
    countCache = { value: uniqueVisitors, at: now };

    return Response.json({
      uniqueVisitors,
      todayUniqueVisitors: Number(today[0]?.value ?? 0),
      pageViews: Number(pageViews[0]?.value ?? 0),
    });
  } catch {
    return Response.json(
      { error: "Failed to load visitor stats" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: { path?: unknown; referrer?: unknown } = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") ?? "";
    const visitorId = getVisitorId(ip, userAgent);
    const visitDate = getUtcDateKey();

    const [row] = await db
      .insert(visits)
      .values({
        visitorId,
        ipHash: createHash("sha256").update(`ip:${ip}`).digest("hex"),
        userAgent: userAgent.slice(0, 300),
        visitDate,
      })
      .onConflictDoUpdate({
        target: [visits.visitorId, visits.visitDate],
        set: {
          pageViews: sql`${visits.pageViews} + 1`,
          lastSeenAt: sql`now()`,
        },
      })
      .returning({
        isNewDailyVisitor: sql<boolean>`(xmax = 0)`,
      });

    const now = Date.now();
    const isNew = Boolean(row?.isNewDailyVisitor);
    let uniqueVisitors: number;

    if (isCacheFresh(now) && countCache !== null) {
      uniqueVisitors = countCache.value + (isNew ? 1 : 0);
      if (isNew) countCache.value += 1;
    } else {
      const [total] = await db.select({ value: count() }).from(visits);
      uniqueVisitors = Number(total?.value ?? 0);
      countCache = { value: uniqueVisitors, at: now };
    }

    return Response.json({
      uniqueVisitors,
      isNewDailyVisitor: isNew,
    });
  } catch {
    return Response.json(
      { error: "Failed to record visit" },
      { status: 500 },
    );
  }
}
