import { createHash } from "node:crypto";
import { env } from "../config/env";

export const createHashValue = (value: string) =>
  createHash("sha256").update(`${env.visitorHashSalt}:${value}`).digest("hex");
