import "dotenv/config";

const requiredEnv = ["DATABASE_URL", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "VISITOR_HASH_SALT"] as const;

const getRequiredEnv = (key: (typeof requiredEnv)[number]) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const parseOrigins = (value: string | undefined) =>
  (value ?? "http://127.0.0.1:5173,http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  databaseUrl: getRequiredEnv("DATABASE_URL"),
  redisUrl: getRequiredEnv("UPSTASH_REDIS_REST_URL"),
  redisToken: getRequiredEnv("UPSTASH_REDIS_REST_TOKEN"),
  visitorHashSalt: getRequiredEnv("VISITOR_HASH_SALT"),
  frontendOrigins: parseOrigins(process.env.FRONTEND_ORIGIN),
};
