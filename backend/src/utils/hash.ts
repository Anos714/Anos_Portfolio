import { createHash } from "node:crypto";
import { getRuntimeEnv } from "../config/env";

export const createHashValue = (value: string) =>
  createHash("sha256")
    .update(`${getRuntimeEnv().visitorHashSalt}:${value}`)
    .digest("hex");
