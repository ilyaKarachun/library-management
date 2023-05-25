import argon2 from 'argon2';
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import  UserDTO  from '../dtos/userDTO';


export class UserController {
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository;
    }

    getUsers = async (req: Request, res: Response) => {
        try {
            const users: UserDTO[] = await this.userRepository.getAll();
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

    getUserById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const user: UserDTO | null = await this.userRepository.getById(id);
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

    createUser = async (req: Request, res: Response) => {
        const { firstName, lastName, email, password } = req.body;

        if(parseInt(req.body.requestId) !== 1){
            return res.status(403).json({ error: "Forbidden - This request requires Admin permission." });
        }

        if(!firstName || !lastName || !email || !password) {
            return res.status(422).json({ error: "Missing or invalid user information." });
        }

        try {
            const hashedPass = await argon2.hash(password);
            const user = new UserDTO(null, firstName, lastName, email, hashedPass);
            const result: UserDTO | null = await this.userRepository.create(user);

            if(!result){
                return res.status(409).json( {error: "User already exists"} );
            }

            return res.status(201).json({data: result, message: 'User created successfully'});
        } catch (err) {
            res.status(500).json({ message: "error creating user" });
        }
    };
    
    updateUser = async (req: Request, res: Response) => {
        try {
            const { id, firstName, lastName, email } = req.body;

            if(parseInt(req.body.requestId) !== 1 && parseInt(req.body.requestId) !== parseInt(id) ){
                return res.status(403).json({ error: "Forbidden - This resource can only be accessed by its owner or the Admin." });
            }

            if(!id || !firstName || !lastName || !email) {
                return res.status(422).json({ error: "Missing or invalid user information." });
            }

            const user = new UserDTO(id, firstName, lastName, email);
            await this.userRepository.update(user);
            res.status(200).json({ message: 'User updated successfully' });
        }
        catch (err) {
            res.status(500).json({ message: "error updating user" });
        }
    };

    updateUserPassword = async (req: Request, res: Response) => {
        const {id, oldPassword, newPassword} = req.body;

        if(parseInt(req.body.requestId) !== 1 && parseInt(req.body.requestId) !== parseInt(id) ){
            return res.status(403).json({ error: "Forbidden - This resource can only be accessed by its owner or the Admin." });
        }
    
        if(!id || !oldPassword || !newPassword) {
            return res.status(422).json({ error: "Missing information." });
        }
        try{
            const hashedPass: string | null = await this.userRepository.getHashedPass(id);
            if(!hashedPass){
                return res.status(404).json({ error: "User not found" });
            }

            const isVerified = await argon2.verify(hashedPass, oldPassword);
            if(!isVerified){
                return res.status(401).json({ error: "Wrong password" });
            }

            const newHashedPass = await argon2.hash(newPassword);
            await this.userRepository.updatePassword(id, newHashedPass);
            return res.status(200).json({ message: 'Password updated successfully' });
        } catch (err) {
            return res.status(500).json({ message: "internal error updating user password" });
        }
    };
    
    deleteUser = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);

        if(parseInt(req.body.requestId) !== 1 && parseInt(req.body.requestId) !== id ){
            return res.status(403).json({ error: "Forbidden - This resource can only be accessed by its owner or the Admin." });
        }

        try {
            await this.userRepository.delete(id);
            res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (err) {
            res.status(500).json({ message: "error deleting user" });
        }
    };
}
