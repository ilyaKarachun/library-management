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

            //this.borrowingRepository.checkout()

        } catch(err) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}