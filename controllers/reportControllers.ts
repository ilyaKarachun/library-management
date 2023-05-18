import { ReportRepository } from '../repositories/reportRepository';
import { Request, Response } from 'express';

export class ReportController{
    private reportRepo = new ReportRepository();

    getAllBooks = async (req: Request, res: Response) => {
        try {
            const books = await this.reportRepo.getAllBooks();
            if (!books) {
                res.status(404).json({ message: 'No books found' });
            }
            res.status(200).json({
                data: books,
                message: 'Books retrieved successfully',
            });
        } catch (err) {
            res.status(500).json({ message: "error getting books" });
        }
    }
    getAllBorrowedBooks = async (req: Request, res: Response) => {
        try {
            const books = await this.reportRepo.getAllBorrowed();
            if (!books) {
                res.status(404).json({ message: 'No books found' });
            }
            res.status(200).json({
                data: books,
                message: 'Books retrieved successfully',
            });
        } catch (err) {
            res.status(500).json({ message: "error getting books" });
        }
    };
    getAllBorrowers = async (req: Request, res: Response) => {
        try {
            const borrowers = await this.reportRepo.getAllBorrowers();
            if (!borrowers) {
                res.status(404).json({ message: 'No borrowers found' });
            }
            res.status(200).json({
                data: borrowers,
                message: 'Borrowers retrieved successfully',
            });
        } catch (err) {
            res.status(500).json({ message: "error getting borrowers" });
        }
    };
    getAllOverdueBooks = async (req: Request, res: Response) => {
        try {
            const books = await this.reportRepo.getAllOverdue();
            if (!books) {
                res.status(404).json({ message: 'No books found' });
            }
            res.status(200).json({
                data: books,
                message: 'Books retrieved successfully',
            });
        } catch (err) {
            res.status(500).json({ message: "error getting books" });
        }
    }


}