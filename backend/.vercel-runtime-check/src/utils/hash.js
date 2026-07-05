import { createHash } from "node:crypto";
import { getRuntimeEnv } from "../config/env.js";
export const createHashValue = (value) => createHash("sha256")
    .update(`${getRuntimeEnv().visitorHashSalt}:${value}`)
    .digest("hex");
