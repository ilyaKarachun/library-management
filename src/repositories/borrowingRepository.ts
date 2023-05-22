import { pool } from "../db/dbConnection";
import { BorrowingDTO } from '../dtos/borrowingDTO';

export class BorrowingRepository{
    async borrow(borrowerId: number, dueDate: string, ISBNs: Array<string>): Promise<void>{
        const client = await pool.connect();

        try{
            const borrowingQueryText = 'INSERT INTO books_borrowers (ISBN, borrower_id, due_date) VALUES ($1, $2, $3);';
            const availabilityQueryText = 'UPDATE books SET is_available = false WHERE ISBN = $1';

            await client.query('BEGIN');

            for(const ISBN of ISBNs){
                await client.query(borrowingQueryText, [ISBN, borrowerId, dueDate]);
                await client.query(availabilityQueryText, [ISBN]);
            }

            await client.query('COMMIT');
        }
        catch(err){
            await client.query('ROLLBACK');
            throw new Error(`Error`);
        }
        finally{
            client.release();
        }
    };
    async checkAvailability(ISBN: string){
        const client = await pool.connect();
        const queryText = 'SELECT is_available FROM books WHERE isbn = $1';
        const values = [ISBN];
        try{
            const result = await client.query(queryText, values);
            if(result.rows.length > 0){
                const {is_available} = result.rows[0];
                return is_available;
            }
        }
        catch(err){
            throw new Error(`Error while checking availability`);
        }
        finally{
            client.release();
        }
    };
    async getBorrowingHistory(id: number){
        const client = await pool.connect();
        const queryText = 'SELECT isbn, borrowing_date, due_date, returned_date FROM books_borrowers WHERE borrower_id = $1';
        const values = [id];
        try{
            const result = await client.query(queryText, values);
            const history: BorrowingDTO[] = []
            result.rows.forEach((row) => {
                const borrowing = new BorrowingDTO(row.isbn, row.borrowing_date, row.due_date, row.returned_date);
                history.push(borrowing);
            });
            return history;
        }
        catch(err){
            throw new Error(`Error while getting borrower history: ${err.message}`);
        }
        finally{
            client.release();
        }
    };
    async getBorrowerDueDates(id: number){
        const client = await pool.connect();
        const queryText = 'SELECT isbn, borrowing_date, due_date FROM books_borrowers WERE borrower_id = $1 AND returned_date IS NULL';
        const values = [id];
        try{
            const result = await client.query(queryText, values);
            const dueDates: BorrowingDTO[] = []
            result.rows.forEach((row) => {
                const borrowing = new BorrowingDTO(row.isbn, row.borrowing_date, row.due_date, row.returned_date);
                dueDates.push(borrowing);
            });
            return dueDates;
        }
        catch(err){
            throw new Error(`Error while getting borrower due dates: ${err.message}`);
        }
        finally{
            client.release();
        }
    };
}