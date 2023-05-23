import { Router } from 'express';
import { BorrowingController } from '../controllers/borrowingController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const borrowingController = new BorrowingController();

router.get('/borrowings/history', authenticate, borrowingController.getBorrowingHistory);
router.get('/borrowings/overdue', authenticate, borrowingController.borrowerDueDates);
router.get('/borrowings/availability', authenticate, borrowingController.checkAvailability);
router.post('/borrowings', authenticate, borrowingController.borrow);
router.put('/borrowings/:isbn', authenticate, borrowingController.return);

export default router;