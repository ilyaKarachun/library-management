import { pool } from "../db/dbConnection"
import { BorrowingDTO } from "../dtos/borrowingDTO"

export class BorrowingRepository {
	async borrow(ISBN: string, borrowerId: string, dueDate: Date) {
		const client = await pool.connect()

		try {
			await client.query("BEGIN")
			await client.query(
				"INSERT INTO books_borrowers (isbn, borrower_id, borrowing_date, due_date) VALUES ($1, $2, $3, $4)",
				[ISBN, borrowerId, new Date(), dueDate]
			)
			await client.query(
				"UPDATE books SET is_available = false WHERE isbn = $1",
				[ISBN]
			)
			await client.query("COMMIT")
		} catch (err) {
			await client.query("ROLLBACK")
			throw new Error("Error while borrowing")
		} finally {
			client.release()
		}
	}

	async return(ISBN: string) {
		const client = await pool.connect()

		try {
			await client.query("BEGIN")
			await client.query(
				"UPDATE books_borrowers SET returned_date = $1 WHERE borrowing_id = (SELECT bb.borrowing_idFROM books_borrowers bbWHERE bb.isbn = $2ORDER BY bb.borrowing_date DESC LIMIT 1);",
				[new Date(), ISBN]
			)
			await client.query(
				"UPDATE books SET is_available = true WHERE isbn = $1",
				[ISBN]
			)
			await client.query("COMMIT")
		} catch (err) {
			await client.query("ROLLBACK")
			throw new Error("Error while returning")
		} finally {
			client.release()
		}
	}

	async checkAvailability(ISBN: string) {
		const client = await pool.connect()
		const queryText = "SELECT is_available FROM books WHERE isbn = $1"
		const values = [ISBN]
		try {
			const result = await client.query(queryText, values)
			if (result.rows.length > 0) {
				const { is_available } = result.rows[0]
				return is_available
			}
		} catch (err) {
			throw new Error(`Error while checking availability`)
		} finally {
			client.release()
		}
	}

	async getBorrowingHistory(id: number) {
		const client = await pool.connect()
		const queryText =
			"SELECT borrowing_id, isbn, borrowing_date, due_date, returned_date FROM books_borrowers WHERE borrower_id = $1"
		const values = [id]
		try {
			const result = await client.query(queryText, values)
			const history: BorrowingDTO[] = []
			result.rows.forEach((row) => {
				const borrowing = new BorrowingDTO(
					row.borrowing_id,
					row.isbn,
					id,
					row.borrowing_date,
					row.due_date,
					row.returned_date
				)
				history.push(borrowing)
			})
			return history
		} catch (err) {
			throw new Error(`Error while getting borrower history`)
		} finally {
			client.release()
		}
	}

	async getBorrowerDueDates(id: number) {
		const client = await pool.connect()
		const queryText =
			"SELECT borrowing_id, isbn, borrowing_date, due_date FROM books_borrowers WHERE borrower_id = $1 AND returned_date IS NULL"
		const values = [id]
		try {
			const result = await client.query(queryText, values)
			const dueDates: BorrowingDTO[] = []
			result.rows.forEach((row) => {
				const borrowing = new BorrowingDTO(
					row.borrowing_id,
					row.isbn,
					id,
					row.borrowing_date,
					row.due_date
				)
				dueDates.push(borrowing)
			})
			return dueDates
		} catch (err) {
			throw new Error(`Error while getting borrower due dates`)
		} finally {
			client.release()
		}
	}
}
