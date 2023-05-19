import { pool } from "../db/dbConnection";
import BorrowerDTO from '../dtos/borrowerDTO';

export class BorrowerRepository{
    async getAll(){
        const queryText = 'SELECT borrower_id, first_name, last_name, email FROM borrowers';

        try{
            const result = await pool.query(queryText);
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
            const result = await pool.query(queryText, values);
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
        const queryText = 'SELECT first_name, last_name, email FROM borrowers WHERE email = $1';
        const values = [email];
        try{
            const result = await pool.query(queryText, values);
            if(result.rows.length > 0){
                const {first_name, last_name, email} = result.rows[0];
                return new BorrowerDTO(first_name, last_name, email);
            }
        }
        catch(err){
            throw new Error(`Error while getting borrower`);
        }
        return null;
    };
    create = async (newBorrower: BorrowerDTO) => {
        const queryText = 'INSERT INTO borrower (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING id_borrower';
        const values = [newBorrower.firstName, newBorrower.lastName, newBorrower.email];
        try{
            const result = await pool.query(queryText, values);
            newBorrower.id = result.rows[0].borrower_id;
            return newBorrower;
        }
        catch(err){
            throw new Error(`Error while creating borrower`);
        }
    };
    update = async (newBorrower: BorrowerDTO) => {
        const queryText = 'UPDATE borrower SET first_name = $1, last_name = $2, email = $3 WHERE id_borrower = $4';
        const values = [newBorrower.firstName, newBorrower.lastName, newBorrower.email, newBorrower.id];
        try{
            await pool.query(queryText, values);
            console.log("Borrower updated");
        }catch(err){
            throw new Error(`Error while updating borrower`);
        }
    };
    
    delete = async (id: number) => {
        const queryText = 'DELETE FROM borrowers WHERE borrower_id = $1';
        const values = [id];
        try{
            await pool.query(queryText, values);
            console.log("Borrower deleted");
        }catch(err){
            throw new Error(`Error while deleting borrower`);
        }
    }
}

