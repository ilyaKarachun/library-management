import { isBindingName } from 'typescript';
import  query  from '../db/db'
import { BorrowingDTO } from '../dtos/borrowingDTO';

export class BorrowingRepository{
    async borrow(){
        const queryText = '';

        try{
            
        }
        catch(err){
            throw new Error(`Error`);
        }
        
    };
    async checkAvailability(ISBN: string){
        const queryText = 'SELECT is_available FROM books WHERE isbn = $1';
        const values = [ISBN];
        try{
            const result = await query(queryText, values);
            if(result.rows.length > 0){
                const {is_available} = result.rows[0];
                return is_available;
            }
        }
        catch(err){
            throw new Error(`Error while checking availability`);
        }
    };
    async getBorrowingHistory(id: number){
        const queryText = 'SELECT bb.isbn, bb.borrowing_date, bb.due_date, returned_date FROM books_borrowers WERE borrower_id = $1';
        const values = [id];
        try{
            const result = await query(queryText, values);
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
    };
    async getBorrowerDueDates(id: number){
        const queryText = 'SELECT isbn, borrowing_date, due_date FROM books_borrowers WERE borrower_id = $1 AND returned_date IS NULL';
        const values = [id];
        try{
            const result = await query(queryText, values);
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
    };
}

