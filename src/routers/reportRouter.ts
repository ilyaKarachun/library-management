import { Router } from "express";
import { ReportController } from "../controllers/reportControllers";

const reportController = new ReportController();

const router = Router();

router.get('/reports/books', reportController.getAllBooks);
router.get('/reports/borrowed', reportController.getAllBorrowedBooks);
router.get('/reports/borrowers', reportController.getAllBorrowers);
router.get('/reports/overdue', reportController.getAllOverdueBooks);
