import { Request, Response } from "express";
import { BorrowingRepository } from '../repositories/borrowingRepository';
import { BorrowingDTO } from '../dtos/borrowingDTO';


export class BorrowingController{
    private borrowingRepository: BorrowingRepository;

    constructor(){
        this.borrowingRepository = new BorrowingRepository();
    }

    public async borrow(req: Request, res: Response) { 
        try {
            
        } catch(err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    public async return(req: Request, res: Response) {
        try {
            
        } catch(err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    public async checkAvailability(req: Request, res: Response) {
        try {
            const ISBN: string = req.query.ISBN as string;
    
            if (!ISBN) {
                return res.status(422).json({ error: "Missing required field: ISBN" });
            }
    
            if (await this.borrowingRepository.checkAvailability(ISBN)) {
                res.status(200).json({ message: "Book is available" });
            }
    
        } catch (err) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
    
    public async getBorrowingHistory(req: Request, res: Response) {
        try {
            const borrowerId: number = parseInt(req.query.borrowerId as string, 10);
            if (isNaN(borrowerId)) {
                return res.status(422).json({ error: 'Invalid request. Invalid or missing borrowerId field.' });
            }
            const history: BorrowingDTO[] = await this.borrowingRepository.getBorrowingHistory(borrowerId);
            if (!history.length) {
                res.status(404).json({ message: 'No history found' });
            }
            res.status(200).json({
                data: history,
                message: 'History retrieved successfully',
            });
        } catch (err) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    public async borrowerDueDates(req: Request, res: Response) {
        try {
            const borrowerId: number = parseInt(req.query.borrowerId as string, 10);
            if (isNaN(borrowerId)) {
                return res.status(422).json({ error: 'Invalid request. Invalid or missing borrowerId field.' });
            }
            const dueDates: BorrowingDTO[] = await this.borrowingRepository.getBorrowerDueDates(borrowerId);
            if (!dueDates.length) {
                return res.status(404).json({ message: 'No due dates found' });
            }
            res.status(200).json({
                data: dueDates,
                message: 'Due dates retrieved successfully',
            });
        } catch (err) {
            res.status(500).json({ error: `Error retrieving due dates` });
        }
    }
}