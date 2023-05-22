import {Router} from 'express';
import {BorrowerController} from '../controllers/borrowerController';
import { authenticate } from '../middlewares/authMiddleware';

const borrowerController = new BorrowerController();

const router = Router();

router.get('/borrowers', authenticate, borrowerController.getBorrowers);
router.get('/borrowers/:id', authenticate, borrowerController.getBorrowerById);
router.get('/borrowers/email/:email', authenticate, borrowerController.getBorrowerByEmail);
router.post('/borrowers', authenticate, borrowerController.createBorrower);
router.put('/borrowers', authenticate, borrowerController.updateBorrower);
router.delete('/borrowers/:id', authenticate, borrowerController.deleteBorrower);

export default router;