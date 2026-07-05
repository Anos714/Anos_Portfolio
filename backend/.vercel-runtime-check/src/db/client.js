import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { getRuntimeEnv } from "../config/env.js";
import * as schema from "./schema.js";
let dbInstance = null;
export const getDb = () => {
    if (!dbInstance) {
        const sql = neon(getRuntimeEnv().databaseUrl);
        dbInstance = drizzle(sql, { schema });
    }
    return dbInstance;
};
