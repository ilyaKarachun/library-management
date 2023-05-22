import { pool } from "../db/dbConnection";
import UserDTO from "../dtos/userDTO";

export class UserRepository {
  async getAll() {
    const queryText = "SELECT user_id, first_name, last_name, email FROM users";
    try {
      const result = await pool.query(queryText);
      return result.rows.map(
        (row) =>
          new UserDTO(
            row.id_user,
            row.first_name,
            row.last_name,
            row.email,
            row.hashed_pass
          )
      );
    } catch (error) {
      console.error(error);
      throw new Error(`Error while getting users: ${error}`);
    }
  }

  async getById(id: number) {
    const queryText =
      "SELECT first_name, last_name, email FROM users WHERE user_id = $1";
    const values = [id];
    try {
      const result = await pool.query(queryText, values);
      if (result.rows.length > 0) {
        const { first_name, last_name, email, hashed_pass } = result.rows[0];
        return new UserDTO(id, first_name, last_name, email, hashed_pass);
      }
    } catch (err) {
      console.log(err);
      throw new Error(`Error while getting user`);
    }
    return null;
  }

  create = async (user: UserDTO) => {
    console.log(user);
    const queryText =
      "INSERT INTO users (first_name, last_name, email, hashed_pass) VALUES ($1, $2, $3, $4) RETURNING user_id";
    const values = [
      user.first_name,
      user.last_name,
      user.email,
      user.hashed_pass,
    ];
    try {
      const result = await pool.query(queryText, values);
      user.user_id = result.rows[0].id_user;
      return user;
    } catch (err) {
      console.log(err);
      throw new Error(`Error while creating user`);
    }
  };
  update = async (user: UserDTO) => {
    const queryText =
      "UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE user_id = $4";
    const values = [user.first_name, user.last_name, user.email, user.user_id];
    try {
      await pool.query(queryText, values);
      console.log("User updated");
    } catch (err) {
      console.log(err);
      throw new Error(`Error while updating user`);
    }
  };
  delete = async (id: number) => {
    const queryText = "DELETE FROM user WHERE user_id = $1";
    const values = [id];
    try {
      await pool.query(queryText, values);
      console.log("User deleted");
    } catch (err) {
      console.log(err);
      throw new Error(`Error while deleting user`);
    }
  };
}
