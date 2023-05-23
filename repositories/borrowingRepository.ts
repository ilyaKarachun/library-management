import { isBindingName } from 'typescript';
import  query  from '../db/db'
import { BorrowingDTO } from '../dtos/borrowingDTO';

export class BorrowingRepository {
	async borrow(ISBN: string, borrowerId: string, dueDate: Date) {
		const client = await query.connect()

        try {
            await client.query("BEGIN")
            await client.query("INSERT INTO books_borrowers (isbn, borrower_id, borrowing_date, due_date) VALUES ($1, $2, $3, $4)", [ISBN, borrowerId, new Date(), dueDate])
            await client.query("UPDATE books SET is_available = false WHERE isbn = $1", [ISBN])
            await client.query("COMMIT")

        } catch (err) {
            await client.query("ROLLBACK")
			throw new Error("Error while borrowing")
		} finally {
			client.release()
		}
    }
    
	async return(ISBN: string) {
		const client = await query.connect()

        try {
            await client.query("BEGIN")
            await client.query("UPDATE books_borrowers SET returned_date = $1 WHERE isbn = $2", [new Date(), ISBN])
            await client.query("UPDATE books SET is_available = true WHERE isbn = $1", [ISBN])
            await client.query("COMMIT")

        } catch (err) {
            await client.query("ROLLBACK")
            throw new Error("Error while returning")
        } finally {
			client.release()
		}
    }

	async checkAvailability(ISBN: string) {
		const queryText = "SELECT is_available FROM books WHERE isbn = $1"
		const values = [ISBN]
		try {
			const result = await query(queryText, values)
			if (result.rows.length > 0) {
				const { is_available } = result.rows[0]
				return is_available
			}
		} catch (err) {
			throw new Error(`Error while checking availability`)
		}
	}
	async setAvailability(ISBN: string, isAvailable: boolean) {
		const queryText = "UPDATE books SET is_available = $1 WHERE isbn = $2"
		const values = [isAvailable, ISBN]
		try {
			await query(queryText, values)
		} catch (err) {
			throw new Error(`Error while setting availability: ${err.message}`)
		}
	}
	async getBorrowingHistory(id: number) {
		const queryText =
			"SELECT bb.isbn, bb.borrowing_date, bb.due_date, returned_date FROM books_borrowers bb INNER JOIN borrowers b ON bb.borrower_id = b.borrower_id WHERE b.borrower_id = $1"
		const values = [id]
		try {
			const result = await query(queryText, values)
			const history: BorrowingDTO[] = []
			result.rows.forEach((row) => {
				const borrowing = new BorrowingDTO(
					row.isbn,
					row.borrowing_date,
					row.due_date,
					row.returned_date
				)
				history.push(borrowing)
			})
			return history
		} catch (err) {
			throw new Error(
				`Error while getting borrower history: ${err.message}`
			)
		}
	}
	async getBorrowerDueDates(id: number) {
		const queryText =
			"SELECT bb.isbn, bb.borrowing_date, bb.due_date FROM books_borrowers bb INNER JOIN borrowers b ON bb.borrower_id = b.borrower_id WERE b.borrower_id = $1 AND bb.returned_date IS NULL"
		const values = [id]
		try {
			const result = await query(queryText, values)
			const dueDates: BorrowingDTO[] = []
			result.rows.forEach((row) => {
				const borrowing = new BorrowingDTO(
					row.isbn,
					row.borrowing_date,
					row.due_date,
					row.returned_date
				)
				dueDates.push(borrowing)
			})
			return dueDates
		} catch (err) {
			throw new Error(
				`Error while getting borrower due dates: ${err.message}`
			)
		}
	}
}

