import { Router } from "express";
import { ReportController } from "../controllers/reportControllers";
import { authenticate } from '../middlewares/authMiddleware';

const reportController = new ReportController();

const router = Router();

router.get('/reports/borrowed', authenticate, reportController.getAllBorrowedBooks);
router.get('/reports/overdue', authenticate, reportController.getAllOverdueBooks);

export default router;