import express from "express";
import { BookController } from "../controllers/bookController";

const booksController = new BookController();
const router = express.Router();

router.get("/books", booksController.getBooks);
router.get("/books/:id", booksController.getBookById);
router.post("/books", booksController.postBook);
router.put("/books/:id", booksController.putBook);
router.delete("/books/:id", booksController.deleteBook);

export default router;
