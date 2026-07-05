import type { Request } from "express";

const getHeaderValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const getClientIp = (request: Request) => {
  const forwardedFor = getHeaderValue(request.headers["x-forwarded-for"]);
  const realIp = getHeaderValue(request.headers["x-real-ip"]);

  return forwardedFor?.split(",")[0]?.trim() || realIp || request.ip || "unknown";
};

export const getUserAgent = (request: Request) =>
  request.get("user-agent")?.slice(0, 500) || "unknown";
