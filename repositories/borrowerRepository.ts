const {query} = require('../db/index');
const {BorrowerDTO} = require('../dtos/borrowerDTO');

export class BorrowerRepository{
    async getAll(){
        const queryText = 'SELECT id_borrower, first_name, last_name, email FROM borrower';

        try{
            const result = await query(queryText);
            return result.rows.map((row)=> new BorrowerDTO(row.id_borrower, row.first_name, row.last_name, row.email));
        }
        catch(err){
            throw new Error(`Error while getting borrowers: ${err.message}`);
        }
        
    };

    async getById(id: number){
        const queryText = 'SELECT first_name, last_name, email FROM borrower WHERE id_borrower = $1';
        const values = [id];
        try{
            const result = await query(queryText, values);
            if(result.rows.length > 0){
                const {first_name, last_name, email} = result.rows[0];
                return new BorrowerDTO(id, first_name, last_name, email);
            }
        }
        catch(err){
            throw new Error(`Error while getting borrower`);
        }
        return null;
    };
    create = async (newBorrower: BorrowerDTO) => {
        const queryText = 'INSERT INTO borrower (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING id_borrower';
        const values = [borrower.firstName, borrower.lastName, borrower.email];
        try{
            const result = await query(queryText, values);
            borrower.id = result.rows[0].id_borrower;
            return borrower;
        }
        catch(err){
            throw new Error(`Error while creating borrower`);
        }
    };
    update = async (newBorrower: BorrowerDTO) => {
        const queryText = 'UPDATE borrower SET first_name = $1, last_name = $2, email = $3 WHERE id_borrower = $4';
        const values = [borrower.firstName, borrower.lastName, borrower.email, borrower.id];
        try{
            await query(queryText, values);
            console.log("Borrower updated");
        }catch(err){
            throw new Error(`Error while updating borrower`);
        }
    };
    delete = async (id: number) => {
        const queryText = 'DELETE FROM borrower WHERE id_borrower = $1';
        const values = [id];
        try{
            await query(queryText, values);
            console.log("Borrower deleted");
        }catch(err){
            throw new Error(`Error while deleting borrower`);
        }
    }
    async getByEmail(email: string){
        const queryText = 'SELECT id_borrower, first_name, last_name, email FROM borrower WHERE email = $1';
        const values = [email];
        try{
            const result = await query(queryText, values);
            if(result.rows.length > 0){
                const {id_borrower, first_name, last_name, email} = result.rows[0];
                return new BorrowerDTO(id_borrower, first_name, last_name, email);
            }
        }catch(err){
            throw new Error(`Error while getting borrower by email`);
        }
        return null;
    }
}

