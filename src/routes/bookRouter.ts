import express from "express";
import BookController from "../controllers/bookController";
import { BookRepository } from "../repositories/bookRepository";

const booksController = new BookController();
const router = express.Router();
const bookRep = new BookRepository();
console.log(bookRep);

router.get("/books", booksController.getBooks);
router.get("/books/:isbn", booksController.getBookByISBN);
router.post("/books", booksController.postBook);
router.put("/books/:isbn", booksController.putBook);
router.delete("/books/:isbn", booksController.deleteBook);

export default router;
