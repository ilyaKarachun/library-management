import { pool } from "../dbConntection";

export const createTables = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      ISBN VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      author_firstName VARCHAR(255) NOT NULL,
      author_lastName VARCHAR(255) NOT NULL,
      year INT NOT NULL,
      isAvailable BOOLEAN NOT NULL
    );
    CREATE TABLE IF NOT EXISTS authors (
      author_id SERIAL PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL
    );
    `);
  } catch (e) {}
};
