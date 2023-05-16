import express from "express";
import { pool } from "../dbConntection";

const router = express.Router();

router.get("/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something broke!");
  }
});

router.get("/books/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.status(404).send(`Book with ID ${id} not found`);
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something broke!");
  }
});

router.post("/books", async (req, res) => {
  try {
    const { title, author, published_year } = req.body;

    const result = await pool.query(
      "INSERT INTO books (title, author, published_year) VALUES ($1, $2, $3) RETURNING *",
      [title, author, published_year]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something broke!");
  }
});

router.put("/books/:id", async (req, res) => {
  const id = req.params.id;
  const { title, author, published_year } = req.body;
  console.log();
  try {
    const result = await pool.query(
      "UPDATE books SET title = $1, author = $2, published_year = $3 WHERE id = $4 RETURNING *",
      [title, author, published_year, id]
    );
    if (result.rowCount === 0) {
      res.status(404).send(`Book with ID ${id} not found`);
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something broke!");
  }
});

router.delete("/books/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      res.status(404).send(`Book with ID ${id} not found`);
    } else {
      res.json({ message: `Book with id ${id} deleted` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something broke!");
  }
});

export default router;
