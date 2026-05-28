import { Pool } from "pg";
import { env } from "./env.js";
// PostgreSQL 连接池，供 repository 层复用。
export const pgPool = new Pool({
    connectionString: env.DATABASE_URL
});
