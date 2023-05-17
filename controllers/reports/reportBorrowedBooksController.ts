import ReportBorrowedBooks from "../../dtos/reportBorrowedBooksDTO";
import { reportBorrowedBooksRepository } from "../../repositories/reports/reportBorrowedBooksRepository";
import { Request, Response } from 'express';

export class reportBorrowedBooksController {
    private reportBorrowedBooksRepo = new reportBorrowedBooksRepository();

    getAllBorrowedBooks = async (req: Request, res: Response) => {
        try {
            const books = await this.reportBorrowedBooksRepo.getAll();
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