import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  host: process.env.PGHOST || "db",
  database: process.env.PG_DATABASE || "library_managment",
  password: process.env.PG_PASSWORD || "root",
  port: 5432,
});
