import { pool } from "../dbConnection";

export const createTables = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS books (
      ISBN CHAR(13) PRIMARY KEY NULL,
      title VARCHAR(100) NOT NULL,
      author_id INTEGER NOT NULL,
      publication_year SMALLINT NOT NULL,
      is_available BOOLEAN NOT NULL
    );
    CREATE TABLE IF NOT EXISTS authors (
    author_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
    );`);
  } catch (e) {}
};
