import {Request, Response} from 'express';
import { BorrowerRepository } from '../repositories/borrowerRepository';
import { BorrowerDTO } from '../dtos/borrowerDTO';

const borrowerRepository = new BorrowerRepository();

export class BorrowerController{
    getBorrowers = async (req: Request, res: Response) => {
        try{
            const borrowers = await borrowerRepository.getAll();
            if (!borrowers) {
                res.status(404).json({message: 'No borrowers found'});
            }
            res.status(200).json({
                data: borrowers,
                message: 'Borrowers retrieved successfully',
            });
        }catch(err){
            res.status(500).json({message: "error getting controller"});
        }
    };
    getBorrowerById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try{
            const borrower = await borrowerRepository.getById(id);
            if(!borrower){
                res.status(404).json({message: 'No borrower found'});
            }
            res.status(200).json({
                data: borrower,
                message: 'Borrower retrieved successfully',
            });
        }
        catch(err){
            res.status(500).json({message: "error getting controller"});
        }
    };

    
    createBorrower = async (req: Request, res: Response) => {
        const borrower = new BorrowerDTO(req.body.id, req.body.firstName, req.body.lastName, req.body.email);
        try{
            const result = await borrowerRepository.create(borrower);
            res.status(201).json({
                data: result,
                message: 'Borrower created successfully',
            });
        }catch(err){
            res.status(500).json({message: "error creating controller"});
        }
    };
    deleteBorrower = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try{
            await borrowerRepository.delete(id);
            res.status(200).json({
                message: 'Borrower deleted successfully',
            });
        }catch(err){
            res.status(500).json({message: "error deleting controller"});
        }
    };
    getBorrowerByEmail = async (req: Request, res: Response) => {
        const email = req.params.email;
        try{
            await borrowerRepository.getByEmail(email);
            res.status(200).json({
                message: 'Borrower retrieved successfully',
            });
        }catch(err){
            res.status(500).json({message: "error getting controller"});
        }
    };
};