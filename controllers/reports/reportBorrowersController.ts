import { ReportBorrowerRepository } from "../../repositories/reports/reportBorrowersRepository";
import ReportBorrowersDTO from "../../dtos/reportBorrowersDTO";
import { Request, Response } from 'express';

export class ReportBorrowersController {
    private reportBorrowersRepo = new ReportBorrowerRepository();

    getAllBorrowers = async (req: Request, res: Response) => {
        try {
            const borrowers = await this.reportBorrowersRepo.getAll();
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
    }
};