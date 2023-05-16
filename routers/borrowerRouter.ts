import {Router} from 'express';
import {BorrowerController} from '../controllers/borrowerController';

const borrowerController = new BorrowerController();

const router = Router();

router.get('/', borrowerController.getBorrowers);
router.get('/:id', borrowerController.getBorrowerById);
router.get('/email/:email', borrowerController.getBorrowerByEmail);
router.post('/', borrowerController.createBorrower);
router.delete('/:id', borrowerController.deleteBorrower);
