import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const authController = new AuthController();

router.get('/login', authController.login);

router.get('/logout', authenticate, authController.logout);

export default router;