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
            const { ISBN, borrowerId, dueDate } = req.body;

            if(!ISBN || !borrowerId || !dueDate){
                return res.status(422).json({ error: "Missing required fields: ISBN, borrower ID or due date"})
            }

            //this.borrowingRepository.borrow()

        } catch(err) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
    public async checkAvailability(req: Request, res: Response) {
        try {
            const { ISBN } = req.body;

            if(!ISBN){
                return res.status(422).json({ error: "Missing required field: ISBN"})
            }

            this.borrowingRepository.checkAvailability(ISBN);

        } catch(err) {
            res.status(500).json({ error: "Internal server error" });
        }
    };
    public async setAvailability(req: Request, res: Response) {
        try {
            const { ISBN, isAvailable } = req.body;

            if(!ISBN || !isAvailable){
                return res.status(422).json({ error: "Missing required fields: ISBN or isAvailable"})
            }

            this.borrowingRepository.setAvailability(ISBN, isAvailable);

        } catch(err) {
            res.status(500).json({ error: "Internal server error" });
        }
    };
}