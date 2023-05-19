import { Request, Response } from "express";
import { BookRepository } from "../repositories/bookRepository";
import { BookDTO } from "../dtos/bookDTO";

class BookController {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }
  getBooks = async (req: Request, res: Response): Promise<void> => {
    try {
      const books: BookDTO[] = await this.bookRepository.getall();
      if (!books) {
        res.status(404).send(`books table is empty`);
      } else {
        res.status(200).json(books);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Something broke!");
    }
  };

  getBookByISBN = async (req: Request, res: Response): Promise<void> => {
    const isbn: string = String(req.params.isbn);
    try {
      const book: BookDTO | null = await this.bookRepository.getByISBN(isbn);
      if (!book) {
        res.status(404).send(`Book with ID ${isbn} not found`);
      } else {
        res.status(200).json(book);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Something broke!");
    }
  };

  postBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { ISBN, title, author, year, isAvailable }: BookDTO = req.body;
      const newBook: BookDTO = new BookDTO(
        ISBN,
        title,
        author,
        year,
        isAvailable
      );

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

  putBook = async (req: Request, res: Response): Promise<void> => {
    const isbn: string = String(req.params.isbn);
    const { ISBN, title, author, year, isAvailable }: BookDTO = req.body;
    const newBook = new BookDTO(ISBN, title, author, year, isAvailable);
    try {
      const updatedBook: BookDTO | null = await this.bookRepository.update(
        newBook
      );
      if (!updatedBook) {
        res.status(404).send(`Book with ibsn ${isbn} not found`);
      } else {
        res.status(200).json(updatedBook);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Something broke!");
    }
  };

  deleteBook = async (req: Request, res: Response): Promise<void> => {
    const ISBN: string = String(req.params.isbn);
    try {
      const result: string = await this.bookRepository.delete(ISBN);
      if (!result) {
        res.status(404).send(`Book with ISBN ${ISBN} not found`);
      } else {
        res.status(204).json({ message: `${result}` });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Something broke!");
    }
  };
}

export default BookController;
