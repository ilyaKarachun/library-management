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
    async setAvailability(ISBN: string, isAvailable: boolean){
        const queryText = 'UPDATE books SET is_available = $1 WHERE isbn = $2';
        const values = [isAvailable, ISBN];
        try{
            await query(queryText, values); 
        }
        catch(err){
            throw new Error(`Error while setting availability`);
        }
    };
}

