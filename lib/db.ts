import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing from .env.local");
}

const globalForDb = globalThis as unknown as {
  pool: Pool | undefined;
};

export const db =
  globalForDb.pool ??
  new Pool({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = db;
}