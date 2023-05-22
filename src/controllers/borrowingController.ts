import { Request, Response } from "express";
import { BorrowingRepository } from '../repositories/borrowingRepository';
import { BorrowingDTO } from '../dtos/borrowingDTO';


export class BorrowingController{
    private borrowingRepository: BorrowingRepository;

    constructor(){
        this.borrowingRepository = new BorrowingRepository();
    }

    borrow = async (req: Request, res: Response): Promise<Response> => {    
        try {
            const { borrowerId, dueDate, ISBNs } = req.body;

            if(!borrowerId || !dueDate || !ISBNs || ISBNs.length === 0){
                return res.status(422).json({ error: "Missing required fields: borrower ID, due date or ISBNs"});
            }

            for(const ISBN of ISBNs){
                const isAvailable = await this.borrowingRepository.checkAvailability(ISBN);
                if(!isAvailable){
                    return res.status(404).json({ error: `Book ISBN: ${ISBN} not available for borrow`});
                }
            }

            await this.borrowingRepository.borrow(borrowerId, dueDate, ISBNs);
            return res.status(201).json({ messsage: "Borrowing/s created"});
        } catch(err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}