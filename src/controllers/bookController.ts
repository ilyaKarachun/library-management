import { Request, Response } from "express";
import { pool } from "../dbConntection";
import { QueryResult } from "../types/QueryResult";

interface Book {
  id: number;
  title: string;
  author: string;
  published_year: number;
}

export class BookController {
  async getBooks(req: Request, res: Response): Promise<void> {
    try {
      const result: QueryResult<Book> = await pool.query("SELECT * FROM books");
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something broke!");
    }
  }

  async getBookById(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);
    try {
      const result: QueryResult<Book> = await pool.query(
        "SELECT * FROM books WHERE id = $1",
        [id]
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
  }

  async postBook(req: Request, res: Response): Promise<void> {
    try {
      const { title, author, published_year }: Book = req.body;

      const result: QueryResult<Book> = await pool.query(
        "INSERT INTO books (title, author, published_year) VALUES ($1, $2, $3) RETURNING *",
        [title, author, published_year]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something broke!");
    }
  }

  async putBook(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);
    const { title, author, published_year }: Book = req.body;
    console.log();
    try {
      const result: QueryResult<Book> = await pool.query(
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
  }

  async deleteBook(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);
    try {
      const result: QueryResult<Book> = await pool.query(
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
  }
}
