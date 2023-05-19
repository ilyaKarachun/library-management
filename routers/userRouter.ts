import { Router } from "express";
import { UserController } from "../controllers/userController";

const userController = new UserController();

const router = Router();

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/users', userController.createUser);
router.post('/users/update', userController.updateUser);

