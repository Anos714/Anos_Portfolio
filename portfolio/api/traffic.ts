import crypto from "node:crypto";

type HeaderValue = string | string[] | undefined;

type ApiRequest = {
  method?: string;
  headers: Record<string, HeaderValue>;
  socket?: {
    remoteAddress?: string;
  };
};

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => {
    json: (body: unknown) => void;
  };
};

type RedisResponse<T> = {
  result?: T;
};

const redisUrl =
  process.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_ENDPOINT;
const redisToken =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.UPSTASH_REDIS_TOKEN;
const hashSalt = process.env.VISITOR_HASH_SALT ?? "portfolio-visitor";

const redisCommand = async <T>(
  command: Array<string | number>,
): Promise<RedisResponse<T> | null> => {
  if (!redisUrl || !redisToken) {
    return null;
  }

  const redisResponse = await fetch(redisUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!redisResponse.ok) {
    throw new Error(`Redis command failed: ${redisResponse.status}`);
  }

  return redisResponse.json() as Promise<RedisResponse<T>>;
};

const getFirstHeaderValue = (value: HeaderValue) =>
  Array.isArray(value) ? value[0] : value;

const getClientIp = (request: ApiRequest) => {
  const forwardedFor = getFirstHeaderValue(request.headers["x-forwarded-for"]);
  const realIp = getFirstHeaderValue(request.headers["x-real-ip"]);
  const vercelForwardedFor = getFirstHeaderValue(
    request.headers["x-vercel-forwarded-for"],
  );

  return (
    forwardedFor?.split(",")[0]?.trim() ||
    vercelForwardedFor?.split(",")[0]?.trim() ||
    realIp ||
    request.socket?.remoteAddress ||
    "unknown"
  );
};

export default async function handler(
  request: ApiRequest,
  response: ApiResponse,
) {
  if (request.method !== "GET" && request.method !== "POST") {
    response.setHeader("Allow", "GET, POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  response.setHeader("Cache-Control", "no-store");

  if (!redisUrl || !redisToken) {
    return response.status(200).json({
      configured: false,
      uniqueVisitors: null,
      isNewVisitor: false,
    });
  }

  try {
    const ip = getClientIp(request);
    const visitorHash = crypto
      .createHash("sha256")
      .update(`${hashSalt}:${ip}`)
      .digest("hex");

    const addResult = await redisCommand<number>([
      "SADD",
      "portfolio:visitors:unique_ips",
      visitorHash,
    ]);
    const countResult = await redisCommand<number>([
      "SCARD",
      "portfolio:visitors:unique_ips",
    ]);

    return response.status(200).json({
      configured: true,
      uniqueVisitors: Number(countResult?.result ?? 0),
      isNewVisitor: Number(addResult?.result ?? 0) === 1,
    });
  } catch {
    return response.status(500).json({
      configured: true,
      uniqueVisitors: null,
      error: "Unable to update visitor count",
    });
  }
}
