import {Router} from 'express';
import {BorrowerController} from '../controllers/borrowerController';

const borrowerController = new BorrowerController();

const router = Router();

router.get('/borrowers', borrowerController.getBorrowers);
router.get('/borrowers/:id', borrowerController.getBorrowerById);
router.get('/borrowers/email/:email', borrowerController.getBorrowerByEmail);
router.post('/borrowers', borrowerController.createBorrower);
router.put('/borrowers', borrowerController.updateBorrower);
router.delete('/borrowers/:id', borrowerController.deleteBorrower);
