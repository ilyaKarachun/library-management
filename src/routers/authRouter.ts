import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';

const authController = new AuthController();

const router = Router();

router.post('/login',authController.login);
router.get('/logout', authenticate, authController.logout);

export default router;