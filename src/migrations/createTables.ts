import { pool } from "../dbConntection";

export const createTables = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(50),
        author VARCHAR(50),
        published_year INTEGER
    )`);
  } catch (e) {}
};
