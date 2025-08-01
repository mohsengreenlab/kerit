import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const { Pool } = pg;
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Use standard PostgreSQL for Replit environment
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: false // Replit's PostgreSQL doesn't require SSL
});

export const db = drizzle({ client: pool, schema });