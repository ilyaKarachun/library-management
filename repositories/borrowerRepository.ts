import {query} from '../db/db';
import { BorrowerDTO } from '../dtos/borrowerDTO';


export class BorrowerRepository{
    async getAll(){
        const queryText = 'SELECT borrower_id, first_name, last_name, email FROM borrowers';

        try{
            const result = await query(queryText);
            return result.rows.map((row)=> new BorrowerDTO(row.first_name, row.last_name, row.email, row.borrower_id));
        }
        catch(err){
            throw new Error(`Error while getting borrowers: ${err.message}`);
        }
        
    };

    async getById(id: number){
        const queryText = 'SELECT first_name, last_name, email FROM borrowers WHERE borrower_id = $1';
        const values = [id];
        try{
            const result = await query(queryText, values);
            if(result.rows.length > 0){
                const {first_name, last_name, email} = result.rows[0];
                return new BorrowerDTO(first_name, last_name, email, id);
            }
        }
        catch(err){
            throw new Error(`Error while getting borrower`);
        }
        return null;
    };

    async getByEmail(email: string){
        const queryText = 'SELECT borrower_id, first_name, last_name, email FROM borrowers WHERE email = $1';
        const values = [email];
        try{
            const result = await query(queryText, values);
            if(result.rows.length > 0){
                const {borrower_id, first_name, last_name, email} = result.rows[0];
                return new BorrowerDTO(first_name, last_name, email, borrower_id);
            }
        }catch(err){
            throw new Error(`Error while getting borrower by email`);
        }
        return null;
    }

    create = async (borrower: BorrowerDTO) => {
        const queryText = 'INSERT INTO borrowers (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING borrower_id';
        const values = [borrower.firstName, borrower.lastName, borrower.email];
        try{
            const result = await query(queryText, values);
            borrower.id = result.rows[0].borrower_id;
            return borrower;
        }
        catch(err){
            throw new Error(`Error while creating borrower`);
        }
    };

    update = async (borrower: BorrowerDTO) => {
        const queryText = 'UPDATE borrowers SET first_name = $1, last_name = $2, email = $3 WHERE borrower_id = $4';
        const values = [borrower.firstName, borrower.lastName, borrower.email, borrower.id];
        try{
            await query(queryText, values);
            console.log("Borrower updated");
        }catch(err){
            throw new Error(`Error while updating borrower`);
        }
    };
    
    delete = async (id: number) => {
        const queryText = 'DELETE FROM borrowers WHERE borrower_id = $1';
        const values = [id];
        try{
            await query(queryText, values);
            console.log("Borrower deleted");
        }catch(err){
            throw new Error(`Error while deleting borrower`);
        }
    }
}

