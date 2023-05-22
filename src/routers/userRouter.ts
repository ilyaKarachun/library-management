import { Router } from "express";
import { UserController } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const userController = new UserController();

const router = Router();

router.get('/users', authenticate, userController.getUsers);
router.get('/users/:id', authenticate, userController.getUserById);
router.post('/users', authenticate, userController.createUser);
router.put('/users', authenticate, userController.updateUser);
router.put('/users/password', authenticate, userController.updateUserPassword);
router.delete('/users/:id', authenticate, userController.deleteUser);

export default router;