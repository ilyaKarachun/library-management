import { Request, Response } from 'express';
import BookDTO from '../dtos/bookDTO';
import { ReportRepository } from '../repositories/reportRepository';

export class ReportController {
    private reportRepo = new ReportRepository();

    getAllBorrowedBooks = async (req: Request, res: Response) => {
        try {
            let reportBooks: Array<BookDTO> = new Array<BookDTO>();
            reportBooks = await this.reportRepo.getAllBorrowed();
            if (!reportBooks || reportBooks.length === 0) {
                return res.status(404).json({ message: 'No books found' });
            }

            return res.status(200).json({
                data: reportBooks,
                message: 'Books retrieved successfully',
            });
        } catch (err) {
            return res.status(500).json({ message: "error getting books" });
        }
    };
    
    getAllOverdueBooks = async (req: Request, res: Response) => {
        try {
            let reportBooks: Array<BookDTO> = new Array<BookDTO>();
            reportBooks = await this.reportRepo.getAllOverdue();
            if (!reportBooks || reportBooks.length === 0) {
                return res.status(404).json({ message: 'No books found' });
            }
            return res.status(200).json({
                data: reportBooks,
                message: 'Books retrieved successfully',
            });
        } catch (err) {
            return res.status(500).json({ message: "error getting books" });
        }
    }
}