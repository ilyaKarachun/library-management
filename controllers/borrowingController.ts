import { Request, Response } from "express";
import { BorrowingRepository } from '../repositories/borrowingRepository';
import { BorrowingDTO } from '../dtos/borrowingDTO';


export class BorrowingController {
    private borrowingRepository: BorrowingRepository;

    constructor() {
        this.borrowingRepository = new BorrowingRepository();
    }

    public async borrow(req: Request, res: Response) {
        try {
            const {
                ISBN,
                borrowerId,
                dueDate,
            }: { ISBN: string; borrowerId: string; dueDate: string } = req.body;

            if (!ISBN || !borrowerId || !dueDate)
                return res.status(422).json({ error: "Missing required fields: ISBN, borrower ID or due date" });

            if (new Date(dueDate) < new Date())
                return res.status(422).json({ error: "Due date must be in the future" });

            if (!(await this.borrowingRepository.checkAvailability(ISBN)))
                return res.status(404).json({ error: "Book is not available" });

            this.borrowingRepository.borrow(ISBN, borrowerId, new Date(dueDate))

            return res.json({ message: "Book borrowed successfully" });

        } catch (err) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    public async return(req: Request, res: Response) {
        try {
            const { ISBN } = req.body;

            if (!ISBN)
                return res.status(422).json({ error: "Missing required fields: ISBN" });

            if (await this.borrowingRepository.checkAvailability(ISBN))
                return res.status(404).json({ error: "Book is not borrowed" });

            this.borrowingRepository.return(ISBN);

            return res.json({ message: "Book returned successfully" });

        } catch (err) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    public async checkAvailability(req: Request, res: Response) {
        try {
            const { ISBN } = req.body;

            if (!ISBN) {
                return res.status(422).json({ error: "Missing required field: ISBN" })
            }
            if (await this.borrowingRepository.checkAvailability(ISBN)) {
                res.status(200).json({ message: "Book is available" });
            }

        } catch (err) {
            res.status(500).json({ error: "Internal server error" });
        }
    };
    public async setAvailability(req: Request, res: Response) {
        try {
            const { ISBN, isAvailable } = req.body;

            if (!ISBN || !isAvailable) {
                return res.status(422).json({ error: "Missing required fields: ISBN or isAvailable" })
            }

            this.borrowingRepository.setAvailability(ISBN, isAvailable);

        } catch (err) {
            res.status(500).json({ error: "Internal server error" });
        }
    };
    public async getBorrowingHistory(req: Request, res: Response) {
        try {
            const { borrowerId } = req.body;
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
    };
    public async borrowerDueDates(req: Request, res: Response) {
        try {
            const { borrowerId } = req.body;
            if (!borrowerId) {
                return res.status(400).json({ error: 'Invalid request. Missing borrowerId field.' });
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
            res.status(500).json({ error: `Error retrieving due dates: ${err.message}` });
        }
    };
    

}