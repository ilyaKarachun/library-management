import express from "express";
import BookController from "../controllers/bookController";

const booksController = new BookController();
const router = express.Router();

router.get("/books", booksController.getBooks);
router.get("/books/:isbn", booksController.getBookByISBN);
router.post("/books", booksController.postBook);
router.put("/books/:isbn", booksController.putBook);
router.delete("/books/:isbn", booksController.deleteBook);

export default router;
