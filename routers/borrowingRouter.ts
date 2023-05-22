import { Router } from 'express';
import { BorrowingController } from '../controllers/borrowingController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const borrowingController = new BorrowingController();

router.post('/borrowings', authenticate, borrowingController.borrow);
router.get('/borrowings/history', authenticate, borrowingController.getBorrowingHistory);
router.get('/borrowings/overdue', authenticate, borrowingController.borrowerDueDates);
router.put('/borrowings/availability', authenticate, borrowingController.checkAvailability);
export default router;