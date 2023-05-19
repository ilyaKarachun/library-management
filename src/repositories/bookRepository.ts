import { pool } from "../db/dbConnection";
import { BookDTO } from "../dtos/bookDTO";

export class BookRepository {
  async create(newBook: BookDTO): Promise<BookDTO | null> {
    try {
      const authorQuery = `
        INSERT INTO authors (first_name, last_name)
        VALUES ($1, $2)
        RETURNING author_id;
      `;
      const authorValues = [newBook.author.firstName, newBook.author.lastName];
      const authorResult = await pool.query(authorQuery, authorValues);
      const authorId = authorResult.rows[0].author_id;

      const bookQuery = `
        INSERT INTO books (ISBN, title, author_id, publication_year, is_available)
        VALUES ($1, $2, $3, $4, $5);
      `;
      const bookValues = [
        newBook.ISBN,
        newBook.title,
        authorId,
        newBook.year,
        newBook.isAvailable,
      ];
      await pool.query(bookQuery, bookValues);

      return newBook;
    } catch (error) {
      throw new Error("Error while trying to create a book");
    }
  }

  async getall() {
    const queryText = `
    SELECT b.ISBN, b.title, a.first_name, a.last_name, b.publication_year, b.is_available 
    FROM books b
    INNER JOIN authors a ON b.author_id = a.author_id
    ORDER BY b.ISBN;
  `;
    try {
      const result = await pool.query(queryText);
      return result.rows.map((row) => {
        const author = {
          firstName: row.first_name,
          lastName: row.last_name,
        };

        return new BookDTO(
          row.isbn,
          row.title,
          author,
          row.publication_year,
          row.is_available
        );
      });
    } catch (error) {
      throw new Error("Error while trying to get all books");
    }
  }

  async getById(id: number) {
    try {
      const queryText = `SELECT * FROM books WHERE id=${id}`;
      const result = await pool.query(queryText);
      const row = result.rows[0];
      return new BookDTO(
        row.isbn,
        row.title,
        { firstName: row.first_name, lastName: row.last_name },
        row.publication_year,
        row.is_available
      );
    } catch (error) {
      console.error(error);
      throw new Error(`error while trying to get book by id ${id}`);
    }
  }

  async getByISBN(ISBN: string) {
    const queryText = `
    SELECT b.ISBN, b.title, a.first_name, a.last_name, b.publication_year, b.is_available 
    FROM books b
    INNER JOIN authors a
    ON b.author_id = a.author_id
    WHERE b.ISBN = $1;
  `;
    const values = [ISBN];

    try {
      const result = await pool.query(queryText, values);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return new BookDTO(
        row.ISBN,
        row.title,
        { firstName: row.first_name, lastName: row.last_name },
        row.publication_year,
        row.is_available
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error while trying to get a book by ISBN");
    }
  }

  async getByTitle(title: string): Promise<BookDTO | null> {
    const queryText = `
          SELECT b.ISBN, b.title, a.first_name, a.last_name, b.publication_year, b.is_available 
          FROM books b
          INNER JOIN authors a
          ON b.author_id = a.author_id;
          WHERE b.title = $1;
        `;
    const values = [title];

    try {
      const result = await pool.query(queryText, values);
      if (result.rows.length === 0) {
        return null; // Book not found
      }

      const row = result.rows[0];
      return new BookDTO(
        row.isbn,
        row.title,
        { firstName: row.first_name, lastName: row.last_name },
        row.publication_year,
        row.is_available
      );
    } catch (error) {
      console.error(error);
      throw new Error(`Error while trying to get book by title: ${title}`);
    }
  }

  async update(newBook: BookDTO) {
    const queryText = `
          UPDATE authors
          SET first_name = '${newBook.author.firstName}', last_name = '${newBook.author.lastName}'
          WHERE author_id = (SELECT author_id FROM books WHERE ISBN = '${newBook.ISBN}');

          UPDATE books 
          SET ISBN = '${newBook.ISBN}', title = '${newBook.title}', publication_year = ${newBook.year}, is_available = ${newBook.isAvailable} 
          WHERE ISBN = '${newBook.ISBN}'
        `;
    const values = [
      newBook.ISBN,
      newBook.title,
      newBook.author.firstName,
      newBook.author.lastName,
      newBook.year,
      newBook.isAvailable,
    ];

    try {
      await pool.query(queryText);
      return newBook;
    } catch (err) {
      console.error(err);
      throw new Error("Error while trying to update book");
    }
  }

  async delete(ISBN: string) {
    const queryText = `DELETE FROM books WHERE ISBN = '${ISBN}';`;
    try {

      await pool.query(queryText);
      return `book with isbn ${ISBN} deleted`;
    } catch (err) {
      console.error(err);
      throw new Error(`Error while trying to delete book by ISBN: ${ISBN}`);
    }
  }
}
