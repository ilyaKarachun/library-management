import { Request, Response } from 'express';
import { BookDTO } from '../dtos/bookDTO';
import ReportBookDTO from '../dtos/reportBookDTO';
import ReportBorrowersDTO from '../dtos/reportBorrowersDTO';
import { ReportRepository } from '../repositories/reportRepository';

export class ReportController {
    private reportRepo = new ReportRepository();

    getAllBooks = async (req: Request, res: Response) => {
        try {
            const reportBook: ReportBookDTO = await this.reportRepo.getAllBooks();

            if (!reportBook || reportBook.getBooks.length === 0) {
                res.status(404).json({ message: 'No books found' });
            } else {
                res.status(200).json({
                    data: reportBook.getBooks,
                    message: 'Books retrieved successfully',
                });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error getting books' });
        }
    };

    getAllBorrowedBooks = async (req: Request, res: Response) => {
        try {
            const reportBook: ReportBookDTO = await this.reportRepo.getAllBorrowed();
            if (!reportBook || reportBook.books.length === 0) {
                res.status(404).json({ message: 'No books found' });
            }
            res.status(200).json({
                data: reportBook.books,
                message: 'Books retrieved successfully',
            });
        } catch (err) {
            res.status(500).json({ message: "error getting books" });
        }
    };
    getAllBorrowers = async (req: Request, res: Response) => {
        try {
            const borrowersReport: ReportBorrowersDTO = await this.reportRepo.getAllBorrowers();
            if (!borrowersReport || borrowersReport.borrowers.length === 0) {
                res.status(404).json({ message: 'No borrowers found' });
            }
            res.status(200).json({
                data: borrowersReport.borrowers,
                message: 'Borrowers retrieved successfully',
            });
        } catch (err) {
            res.status(500).json({ message: "error getting borrowers" });
        }
    };
    getAllOverdueBooks = async (req: Request, res: Response) => {
        try {
            const Reportbooks: ReportBookDTO = await this.reportRepo.getAllOverdue();
            if (!Reportbooks || Reportbooks.books.length === 0) {
                res.status(404).json({ message: 'No books found' });
            }
            res.status(200).json({
                data: Reportbooks.books,
                message: 'Books retrieved successfully',
            });
        } catch (err) {
            res.status(500).json({ message: "error getting books" });
        }
    }


}