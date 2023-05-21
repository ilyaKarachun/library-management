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
}