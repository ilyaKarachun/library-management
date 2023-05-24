import { pool } from "../db/dbConnection";
import BookDTO from "../dtos/bookDTO";

export class BookRepository {
  async getall(): Promise<BookDTO[]> {
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

  async getByISBN(ISBN: string): Promise<BookDTO | null> {
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
      throw new Error(`Error while trying to get book by title: ${title}`);
    }
  }

  async create(newBook: BookDTO): Promise<BookDTO | null> {
    const client = await pool.connect();

    try {
      const book: BookDTO | null = await this.getByISBN(newBook.ISBN);
      if(book){
        return null;
      }

      await client.query('BEGIN');
      let authorId;

      const authorIdQuery = 'SELECT author_id FROM authors WHERE first_name = $1 AND last_name = $2';
      const authorValues = [newBook.author.firstName, newBook.author.lastName];
      let authorResult = await client.query(authorIdQuery, authorValues);

      if(!authorResult.rows || !authorResult.rows.length){
        const authorCreateQuery = 'INSERT INTO authors (first_name, last_name) VALUES ($1, $2) RETURNING author_id;';
        authorResult = await client.query(authorCreateQuery, authorValues);
      }
      authorId = authorResult.rows[0].author_id;

      const bookQuery = 'INSERT INTO books (ISBN, title, author_id, publication_year) VALUES ($1, $2, $3, $4);';
      const bookValues = [newBook.ISBN, newBook.title, authorId, newBook.year];
      await client.query(bookQuery, bookValues);

      await client.query('COMMIT');

      newBook.isAvailable = true;
      return newBook;
    } catch (error) {
      client.query('ROLLBACK');
      throw new Error("Error while trying to create a book");
    } finally {
      client.release();
    }
  }

  async update(newBook: BookDTO): Promise<BookDTO> {
    const client = await pool.connect();

    const authorQuery = 'UPDATE authors SET first_name = $2, last_name = $3 WHERE author_id = (SELECT author_id FROM books WHERE ISBN = $1);';
    const bookQuery = 'UPDATE books SET ISBN = $1, title = $2, publication_year = $3 WHERE ISBN = $1;';

    try {
      await client.query('BEGIN');
      await client.query(authorQuery, [newBook.ISBN, newBook.author.firstName, newBook.author.lastName]);
      await client.query(bookQuery, [newBook.ISBN, newBook.title, newBook.year]);
      await client.query('COMMIT');
      return newBook;
    } catch (err) {
      await client.query('ROLLBACK');
      throw new Error("Error while trying to update book");
    } finally {
      client.release();
    }
  }

  async delete(ISBN: string): Promise<void> {
    const queryText = 'DELETE FROM books WHERE ISBN = $1';

    try {
      await pool.query(queryText, [ISBN]);
    } catch (err) {
      throw new Error(`Error while trying to delete book by ISBN: ${ISBN}`);
    }
  }
}
