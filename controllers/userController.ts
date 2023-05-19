import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import  UserDTO  from '../dtos/userDTO';


export class UserController {

    private userRepo = new UserRepository();

    getUsers = async (req: Request, res: Response) => {
        try {
            const users: UserDTO[] = await this.userRepo.getAll();
            if (!users.length) {
                res.status(404).json({ message: 'No users found' });
            } else {
                res.status(200).json({
                    data: users,
                    message: 'Users retrieved successfully',
                });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error getting users' });
        }
    };
    

    createUser = async (req: Request, res: Response) => {
        const user = new UserDTO(req.body.id, req.body.firstName, req.body.lastName, req.body.email, req.body.hashed_pass);
        try {
            const result: UserDTO = await this.userRepo.create(user);
            res.status(201).json({
                data: result,
                message: 'User created successfully',
            });
        } catch (err) {
            res.status(500).json({ message: "error creating user" });
        }
    };

    getUserById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const user: UserDTO | null = await this.userRepo.getById(id);
            if (!user) {
                res.status(404).json({ message: 'No user found' });
            } else {
                res.status(200).json({
                    data: user,
                    message: 'User retrieved successfully',
                });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error getting user' });
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
        const id: number = parseInt(req.params.id);
        try {
            await this.userRepo.delete(id);
            res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (err) {
            res.status(500).json({ message: "error deleting user" });
        }
    };

}
