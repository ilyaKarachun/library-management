import { reportAllBooksRepository } from "../../repositories/reports/reportAllBooksRepository";
import { Request, Response } from 'express';
import  ReportAllBooksDTO  from "../../dtos/reportAllBooksDTO";

export class reportAllBooksController {
    private reportAllBooksRepo = new reportAllBooksRepository();

    getAllBooks = async (req: Request, res: Response) => {
        try {
            const books = await this.reportAllBooksRepo.getAll();
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



