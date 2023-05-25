import { Request, Response } from 'express';
import { BorrowerRepository } from '../repositories/borrowerRepository';
import BorrowerDTO from '../dtos/borrowerDTO';


export class BorrowerController {
    private borrowerRepository: BorrowerRepository;

    constructor() {
        this.borrowerRepository = new BorrowerRepository();
    }

    getBorrowers = async (req: Request, res: Response) => {
        try {
            const borrowers: BorrowerDTO[] = await this.borrowerRepository.getAll();
            if (!borrowers.length) {
                return res.status(404).json({ message: 'No borrowers found' });
            }

            return res.status(200).json({
                data: borrowers,
                message: 'Borrowers retrieved successfully'
            });
        } catch (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    };

    getBorrowerById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const borrower: BorrowerDTO | null = await this.borrowerRepository.getById(id);
            if (!borrower) {
                return res.status(404).json({ message: 'No borrower found' });
            }

            return res.status(200).json({
                data: borrower,
                message: 'Borrower retrieved successfully'
            });
        }
        catch (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    };

    getBorrowerByEmail = async (req: Request, res: Response) => {
        const email = req.params.email;
        try {
            const borrower: BorrowerDTO | null = await this.borrowerRepository.getByEmail(email);
            if (!borrower) {
                return res.status(404).json({ message: 'No borrower found' });
            }

            return res.status(200).json({
                data: borrower,
                message: 'Borrower retrieved successfully'
            });
        } catch (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    };

    createBorrower = async (req: Request, res: Response) => {
        const borrower: BorrowerDTO = new BorrowerDTO(req.body.firstName, req.body.lastName, req.body.email);
        try {
            const existingBorrower: BorrowerDTO | null = await this.borrowerRepository.getByEmail(borrower.email);
            if (existingBorrower) {
                return res.status(409).json({ message: 'Borrower already exists' });
            }
            const result = await this.borrowerRepository.create(borrower);
            return res.status(201).json({
                data: result,
                message: 'Borrower created successfully'
            });
        } catch (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    };

    updateBorrower = async (req: Request, res: Response) => {
        const borrower = new BorrowerDTO(req.body.firstName, req.body.lastName, req.body.email, req.body.id);
        try {
            await this.borrowerRepository.update(borrower);
            return res.status(200).json({ message: 'Borrower updated successfully' });
        } catch (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    };

    deleteBorrower = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        try {
            await this.borrowerRepository.delete(id);
            return res.status(200).json({ message: 'Borrower deleted successfully' });
        } catch (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    };
};