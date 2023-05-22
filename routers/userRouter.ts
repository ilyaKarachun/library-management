import { UserController } from "../controllers/userController";
import { Router } from "express";

const userController = new UserController();

const router = Router();

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.post("/users", userController.createUser);
router.post("/users/update", userController.updateUser);

export default router;
