import { Router } from 'express';
import { BorrowingController } from '../controllers/borrowingController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const borrowingController = new BorrowingController();

router.post('/borrowings', authenticate, borrowingController.borrow);


export default router;