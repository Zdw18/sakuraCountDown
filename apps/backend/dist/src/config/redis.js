import { Redis } from "ioredis";
import { env } from "./env.js";
// Redis 用于缓存用户会话，减少数据库压力。
export const redis = new Redis(env.REDIS_URL);
