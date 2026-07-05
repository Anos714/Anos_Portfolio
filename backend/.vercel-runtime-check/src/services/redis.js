import { Redis } from "@upstash/redis";
import { getRuntimeEnv } from "../config/env.js";
let redisInstance = null;
export const getRedis = () => {
    if (!redisInstance) {
        const env = getRuntimeEnv();
        redisInstance = new Redis({
            url: env.redisUrl,
            token: env.redisToken,
        });
    }
    return redisInstance;
};
