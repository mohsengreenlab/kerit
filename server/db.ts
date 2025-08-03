import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Auto-detect database type and use appropriate driver
const isNeonDatabase = process.env.DATABASE_URL.includes('neon.tech');
// Only use Neon for actual Neon databases, not based on REPL_ID
const useNeonDriver = isNeonDatabase;

let db: any;
let sql: any;
let pool: any;

if (useNeonDriver) {
  // Use Neon serverless driver only for actual Neon databases
  sql = neon(process.env.DATABASE_URL);
  db = drizzle({ client: sql, schema });
  console.log('Using Neon serverless driver for database connection');
} else {
  // Use regular PostgreSQL driver for local PostgreSQL (VPS and other environments)
  const { Pool } = pg;
  pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    ssl: false // Local PostgreSQL doesn't require SSL
  });
  db = drizzlePg({ client: pool, schema });
  console.log('Using PostgreSQL driver for database connection');
}

export { db, sql, pool };