import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import  UserDTO  from '../dtos/userDTO';


export class UserController {
    private userRepo = new UserRepository();
    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userRepo.getAll();
            if (!users) {
                res.status(404).json({ message: 'No users found' });
            }
            res.status(200).json({
                data: users,
                message: 'Users retrieved successfully',
            });
        } catch (err) {
            res.status(500).json({ message: "error getting users" });
        }
    };
    getUserById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const user = await this.userRepo.getById(id);
            if (!user) {
                res.status(404).json({ message: 'No user found' });
            }
            res.status(200).json({
                data: user,
                message: 'User retrieved successfully',
            });
        }
        catch (err) {
            res.status(500).json({ message: "error getting user" });
        }
    };
    updateUser = async (req: Request, res: Response) => {
        try {
            const { id_user, first_name, last_name, email, hashed_pass } = req.body;
            const user = new UserDTO(id_user, first_name, last_name, email, hashed_pass);
            await this.userRepo.update(user);
            res.status(200).json({ message: 'User updated successfully' });
        }
        catch (err) {
            res.status(500).json({ message: "error updating user" });
        }

    };
    deleteUser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            await this.userRepo.delete(id);
            res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (err) {
            res.status(500).json({ message: "error deleting user" });
        }
    };

}
