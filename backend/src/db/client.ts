import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { getRuntimeEnv } from "../config/env";
import * as schema from "./schema";

let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

export const getDb = () => {
  if (!dbInstance) {
    const sql = neon(getRuntimeEnv().databaseUrl);
    dbInstance = drizzle(sql, { schema });
  }

  return dbInstance;
};
