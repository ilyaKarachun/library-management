import express from "express";
import BookController from "../controllers/bookController";
import { authenticate } from '../middlewares/authMiddleware';

const booksController = new BookController();
const router = express.Router();

router.get("/books", authenticate, booksController.getBooks);
router.get("/books/:isbn", authenticate, booksController.getBookByISBN);
router.get("/books/title/:title", authenticate, booksController.getBookByISBN);
router.post("/books", authenticate, booksController.postBook);
router.put("/books", authenticate, booksController.putBook);
router.delete("/books/:isbn", authenticate, booksController.deleteBook);

export default router;
