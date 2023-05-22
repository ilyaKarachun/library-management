import { pool } from "../db/dbConnection";
import UserDTO from '../dtos/userDTO';

export class UserRepository {
    async getAll(): Promise<UserDTO[]> {
        const queryText = 'SELECT user_id, first_name, last_name, email FROM users';
        try {
            const result = await pool.query(queryText);
            return result.rows.map((row) => new UserDTO(row.user_id, row.first_name, row.last_name, row.email));
        }
        catch (err) {
            throw new Error(`Error while getting users`);
        }
    };

    async getById(id: number): Promise<UserDTO | null> {
        const queryText = 'SELECT first_name, last_name, email FROM users WHERE user_id = $1';
        const values = [id];
        try {
            const result = await pool.query(queryText, values);
            if (result.rows.length > 0) {
                const { first_name, last_name, email } = result.rows[0];
                return new UserDTO(id, first_name, last_name, email);
            } else {
                return null;
            }
        }
        catch (err) {
            throw new Error(`Error while getting user`);
        }
    };

    async getCredentials(email: string): Promise<{id: number, email: string, hashedPass: string} | null> {
        const queryText = 'SELECT user_id, email, hashed_pass FROM users WHERE email = $1';
        const values = [email];

        try {
            const result = await pool.query(queryText, values);
            if (result.rows.length > 0) {
                const { user_id, email, hashed_pass } = result.rows[0];
                const credentials: {id: number, email: string, hashedPass: string} = { id: user_id, email: email, hashedPass: hashed_pass};
                return credentials;
            } else {
                return null;
            }
        }
        catch (err) {
            throw new Error(`Error while getting user credentials`);
        }
    }

    async getHashedPass(id: number): Promise<string | null> {
        const queryText = 'SELECT hashed_pass FROM users WHERE user_id = $1';
        const values = [id];
        try {
            const result = await pool.query(queryText, values);
            if (result.rows.length > 0) {
                return result.rows[0].hashed_pass;
            } else {
                return null;
            }
        }
        catch (err) {
            throw new Error(`Error while getting user password`);
        }
    };

    create = async (user: UserDTO): Promise<UserDTO> => {
        const queryText = 'INSERT INTO users (first_name, last_name, email, hashed_pass) VALUES ($1, $2, $3, $4) RETURNING user_id';
        const values = [user.firstName, user.lastName, user.email, user.hashedPass];
        try {
            const result = await pool.query(queryText, values);
            user.id = result.rows[0].user_id;
            user.hashedPass = undefined;
            return user;
        }
        catch (err) {
            throw new Error(`Error while creating user`);
        }
    };

    update = async (user: UserDTO): Promise<void> => {
        const queryText = 'UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE user_id = $4';
        const values = [user.firstName, user.lastName, user.email, user.id];
        try {
            await pool.query(queryText, values);
        }
        catch (err) {
            throw new Error(`Error while updating user`);
        }
    };

    async updatePassword(id: number, newHashedPass: string): Promise<void> {
        const queryText = 'UPDATE users SET hashed_pass = $2 WHERE user_id = $1';
        const values = [id, newHashedPass];
        try {
            await pool.query(queryText, values);
        }
        catch (err) {
            throw new Error(`Error while updating user password`);
        }
    };

    delete = async (id: number): Promise<void> => {
        const queryText = 'DELETE FROM users WHERE user_id = $1';
        const values = [id];
        try {
            await pool.query(queryText, values);
        }
        catch (err) {
            throw new Error(`Error while deleting user`);
        }
    };
};


