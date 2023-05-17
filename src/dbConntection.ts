import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.PGHOST || "db",
  database: process.env.PGDATABASE || "library_managment",
  password: process.env.PGPASSWORD || "root",
  port: 5432,
});
