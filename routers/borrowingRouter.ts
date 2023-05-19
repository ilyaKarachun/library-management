import { Router } from 'express';
import { BorrowingController } from '../controllers/borrowingController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const borrowingController = new BorrowingController();

router.post('/borrowings/checkout', authenticate, borrowingController.checkout);


export default router;