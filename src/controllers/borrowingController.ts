import { Request, Response } from "express";
import { BorrowingRepository } from '../repositories/borrowingRepository';
import { BorrowingDTO } from '../dtos/borrowingDTO';


export class BorrowingController {
	private borrowingRepository: BorrowingRepository

	constructor() {
		this.borrowingRepository = new BorrowingRepository()
	}

	borrow = async (req: Request, res: Response) => {
		try {
			const {
				ISBN,
				borrowerId,
				dueDate,
			}: { ISBN: string; borrowerId: number; dueDate: string } = req.body

			if (!ISBN || !borrowerId || !dueDate)
				return res
					.status(422)
					.json({
						error: "Missing required fields: ISBN, borrower ID or due date",
					})

			if (new Date(dueDate) < new Date())
				return res
					.status(422)
					.json({ error: "Due date must be in the future" })

			if (!(await this.borrowingRepository.checkAvailability(ISBN)))
				return res.status(404).json({ error: "Book is not available" })

			this.borrowingRepository.borrow(ISBN, borrowerId, new Date(dueDate))

			return res.json({ message: "Book borrowed successfully" })
		} catch (err) {
			console.log(err);
			res.status(500).json({ error: "Internal server error" })
		}
	}

	return = async (req: Request, res: Response) => {
		try {
			const ISBN = req.params.isbn

			if (!ISBN)
				return res
					.status(422)
					.json({ error: "Missing required fields: ISBN" })

			if (await this.borrowingRepository.checkAvailability(ISBN))
				return res.status(404).json({ error: "Book is not borrowed" })

			this.borrowingRepository.return(ISBN)

			return res.json({ message: "Book returned successfully" })
		} catch (err) {
			res.status(500).json({ error: "Internal server error" })
		}
	}

	checkAvailability = async (req: Request, res: Response) => {
		try {
			const ISBN: string = req.query.ISBN as string;
			console.log(ISBN)
			if (!ISBN) {
				return res.status(422).json({ error: "Missing required field: ISBN" });
			}

			if (!await this.borrowingRepository.checkAvailability(ISBN)) {
				return res.status(503).json({ error: "Book is not available" });
			}

			return res.status(200).json({ message: "Book is available" });
		} catch (err) {
			return res.status(500).json({ error: "Internal server error" });
		}
	}

	getBorrowingHistory = async (req: Request, res: Response) => {
		try {
			const borrowerId: number = parseInt(
				req.query.borrowerId as string,
				10
			)
			console.log(borrowerId)
			if (isNaN(borrowerId)) {
				return res
					.status(422)
					.json({
						error: "Invalid request. Invalid or missing borrowerId field.",
					})
			}
			const history: BorrowingDTO[] =
				await this.borrowingRepository.getBorrowingHistory(borrowerId)
			if (!history.length) {
				res.status(404).json({ message: "No history found" })
			}
			res.status(200).json({
				data: history,
				message: "History retrieved successfully",
			})
		} catch (err) {
			res.status(500).json({ error: "Internal server error" })
		}
	}

	borrowerDueDates = async (req: Request, res: Response) => {
		try {
			const borrowerId: number = parseInt(
				req.query.borrowerId as string,
				10
			)
			console.log(borrowerId)
			if (isNaN(borrowerId)) {
				return res
					.status(422)
					.json({
						error: "Invalid request. Invalid or missing borrowerId field.",
					})
			}
			const dueDates: BorrowingDTO[] =
				await this.borrowingRepository.getBorrowerDueDates(borrowerId)
			if (!dueDates.length) {
				return res.status(404).json({ message: "No due dates found" })
			}
			res.status(200).json({
				data: dueDates,
				message: "Due dates retrieved successfully",
			})
		} catch (err) {
			res.status(500).json({ error: `Error retrieving due dates` })
		}
	}
}