import { Request, Response } from "express";
import { BookRepository } from "../repositories/bookRepository";
import { BookDTO } from "../dtos/bookDTO";

class BookController {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }
  async getBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookRepository.getall();
      res.status(200).json(books);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something broke!");
    }
  }

  async getBookById(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);
    try {
      const book: BookDTO | null = await this.bookRepository.getById(id);
      if (!book) {
        res.status(404).send(`Book with ID ${id} not found`);
      } else {
        res.json(book);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Something broke!");
    }
  }

  async getBookByISBN(req: Request, res: Response): Promise<void> {
    const isbn: string = String(req.params.isbn);
    try {
      const book: BookDTO | null = await this.bookRepository.getByISBN(isbn);
      if (!book) {
        res.status(404).send(`Book with ID ${isbn} not found`);
      } else {
        res.json(book);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Something broke!");
    }
  }

  postBook = async (req: Request, res: Response): Promise<void> => {
    try {
    
      const { ISBN, title, author, year }: BookDTO = req.body;
      const newBook: BookDTO = new BookDTO(ISBN, title, author, year, false);
      const createdBook: BookDTO | null = await this.bookRepository.create(
        newBook
      );
      if (!createdBook) {
        res.status(500).send("Failed to create book");
      } else {
        res.status(201).json(createdBook);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Something broke!");
    }
  };

  async putBook(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);
    const { ISBN, title, author, year }: BookDTO = req.body;
    const newBook = new BookDTO(ISBN, title, author, year, false);
    try {
      const updatedBook: BookDTO | null = await this.bookRepository.update(
        newBook
      );
      if (!updatedBook) {
        res.status(404).send(`Book with ID ${id} not found`);
      } else {
        res.json(updatedBook);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Something broke!");
    }
  }

  async deleteBook(req: Request, res: Response): Promise<void> {
    const ISBN: string = String(req.params.isbn);
    try {
      const result: String = await this.bookRepository.delete(ISBN);
      if (!result) {
        res.status(404).send(`Book with ISBN ${ISBN} not found`);
      } else {
        res.json({ message: `${result}` });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Something broke!");
    }
  }
}

export default BookController;
