const { query } = require('./db/db');
import UserDTO from '../dtos/userDTO';

export class UserRepository {
    async getAll() {
        const queryText = 'SELECT id_user, first_name, last_name, email FROM user';
        try {
            const result = await query(queryText);
            return result.rows.map((row) => new UserDTO(row.id_user, row.first_name, row.last_name, row.email, row.hashed_pass));
        }
        catch (err) {
            throw new Error(`Error while getting users: ${err.message}`);
        }
    };
    async getById(id) {
        const queryText = 'SELECT first_name, last_name, email FROM user WHERE id_user = $1';
        const values = [id];
        try {
            const result = await query(queryText, values);
            if (result.rows.length > 0) {
                const { first_name, last_name, email, hashed_pass } = result.rows[0];
                return new UserDTO(id, first_name, last_name, email, hashed_pass);
            }
        }
        catch (err) {
            throw new Error(`Error while getting user`);
        }
        return null;
    };
    create = async (user) => {
        const queryText = 'INSERT INTO user (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING id_user';
        const values = [user.firstName, user.lastName, user.email];
        try {
            const result = await query(queryText, values);
            user.id = result.rows[0].id_user;
            return user;
        }
        catch (err) {
            throw new Error(`Error while creating user`);
        }
    };
    update = async (user) => {
        const queryText = 'UPDATE user SET first_name = $1, last_name = $2, email = $3 WHERE id_user = $4';
        const values = [user.firstName, user.lastName, user.email, user.id];
        try {
            await query(queryText, values);
            console.log("User updated");
        }
        catch (err) {
            throw new Error(`Error while updating user`);
        }
    };
    delete = async (id) => {
        const queryText = 'DELETE FROM user WHERE id_user = $1';
        const values = [id];
        try {
            await query(queryText, values);
            console.log("User deleted");
        }
        catch (err) {
            throw new Error(`Error while deleting user`);
        }
    };
};


