import { Request, Response } from "express";
import { BookRepository } from "../repositories/bookRepository";
import BookDTO from "../dtos/bookDTO";

class BookController {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }
  
  getBooks = async (req: Request, res: Response): Promise<Response> => {
    try {
      const books: BookDTO[] = await this.bookRepository.getall();
      if (!books.length) {
        return res.status(404).json({ error: `books table is empty`});
      }

      return res.status(200).json(books);
    } catch (err) {
      return res.status(500).json({ error: "Something broke!"});
    }
  };

  getBookByISBN = async (req: Request, res: Response): Promise<Response> => {
    const isbn: string = String(req.params.isbn);
    try {
      const book: BookDTO | null = await this.bookRepository.getByISBN(isbn);
      if (!book) {
        return res.status(404).json({ error: `Book with ID ${isbn} not found`});
      } else {
        return res.status(200).json(book);
      }
    } catch (err) {
      return res.status(500).json({ error: "Something broke!"});
    }
  };

  getBookByTitle = async (req: Request, res: Response): Promise<Response> => {
    const title: string = String(req.params.title);
    try {
      const book: BookDTO | null = await this.bookRepository.getByTitle(title);
      if (!book) {
        return res.status(404).json({ error: `Book with title '${title}' not found`});
      } else {
        return res.status(200).json(book);
      }
    } catch (err) {
      return res.status(500).json({ error: "Something broke!"});
    }
  };

  postBook = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { ISBN, title, author, year }: BookDTO = req.body;
      const newBook: BookDTO = new BookDTO(ISBN, title, author, year);

      const createdBook: BookDTO | null = await this.bookRepository.create(newBook);
      if (!createdBook) {
        return res.status(500).json({ error: "Failed to create book"});
      } else {
        return res.status(201).json(createdBook);
      }
    } catch (err) {
      return res.status(500).json({ error: "Something broke!"});
    }
  };

  putBook = async (req: Request, res: Response): Promise<Response> => {
    const { ISBN, title, author, year }: BookDTO = req.body;
    const newBook = new BookDTO(ISBN, title, author, year);
    try {
      await this.bookRepository.update(newBook);
      return res.status(200).json(newBook);
    } catch (err) {
      return res.status(500).json({ error: "Something broke!"});
    }
  };

  deleteBook = async (req: Request, res: Response): Promise<Response> => {
    const ISBN: string = String(req.params.isbn);
    try {
      await this.bookRepository.delete(ISBN);
      return res.status(204).json({message:'204 book deleted'})
    } catch (err) {
      return res.status(500).json({ error: "Something broke!"});
    }
  };
}

export default BookController;
