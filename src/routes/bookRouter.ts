import express from "express";
import BookController from "../controllers/bookController";
import { BookRepository } from "../repositories/bookRepository";

const booksController = new BookController();
const router = express.Router();
const bookRep = new BookRepository();
console.log(bookRep);

router.get("/books", booksController.getBooks);
router.get("/books/:id", booksController.getBookById);
router.post("/books", booksController.postBook);
router.put("/books/:id", booksController.putBook);
router.delete("/books/:id", booksController.deleteBook);

export default router;
