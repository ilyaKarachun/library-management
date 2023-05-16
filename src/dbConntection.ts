import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config();
export const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: "db",
  database: process.env.PGDATABASE || "library_managment",
  password: process.env.PGPASSWORD || "root",
  port: 5432,
});
