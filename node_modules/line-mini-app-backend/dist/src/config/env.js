import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();
const EnvSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().default(3001),
    DATABASE_URL: z.string().min(1),
    REDIS_URL: z.string().min(1),
    LINE_CHANNEL_ID: z.string().min(1),
    LINE_CHANNEL_SECRET: z.string().min(1),
    FRONTEND_ORIGIN: z.string().url()
});
export const env = EnvSchema.parse(process.env);
