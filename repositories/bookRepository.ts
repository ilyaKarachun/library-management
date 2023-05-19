import query from '../db/db'; 
import { BookDTO } from '../dtos/bookDTO';


export class BookRepository{
    async create(newBook: BookDTO): Promise<void>{
        const queryText = `
          DECLARE v_author_id integer;
          INSERT INTO authors (first_name, last_name) VALUES ($3, $4) RETURNING author_id INTO v_author_id;      
          INSERT INTO books (ISBN, title, author_id, publication_year, is_available) VALUES ($1, $2, $3, v_author_id, $6);
        `;
        const values = [newBook.ISBN, newBook.title, newBook.author.firstName, newBook.author.lastName, newBook.year, newBook.isAvailable];

        try{
            await query(queryText, values);
        }catch(error){
            throw new Error("Error while trying to create a book");
        }
    }

    async getall(){
        const queryText = `
          SELECT b.ISBN, b.title, a.first_name, a.last_name, b.publication_year, b.is_available 
          FROM books b
          INNER JOIN authors a
          ON b.author_id = a.author_id;
          ORDER BY ISBN;
        `;
        try{
            const result = await query(queryText);

            return result.rows.map(
                (row) => {
                  new BookDTO(row.isbn, row.title, {firstName: row.first_name, lastName: row.last_name}, row.publication_year, row.is_available)
                });

        }catch(error){
            throw new Error("Error while trying to get all books");
        }
    }

    async getByISBN(ISBN: string) {
        const queryText = `
          SELECT b.ISBN, b.title, a.first_name, a.last_name, b.publication_year, b.is_available 
          FROM books b
          INNER JOIN authors a
          ON b.author_id = a.author_id;
          WHERE b.ISBN = $1;
        `;
        const values = [ISBN];

        try {
          const result = await query(queryText, values);
          if (result.rows.length === 0) {
            return null; // Book not found
          }
      
          const row = result.rows[0];
          return new BookDTO(row.isbn, row.title, {firstName: row.first_name, lastName: row.last_name}, row.publication_year, row.is_available);
        } catch (error) {
          throw new Error(`Error while trying to get book by ISBN: ${ISBN}`);
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
          const result = await query(queryText, values);
          if (result.rows.length === 0) {
            return null; // Book not found
          }
      
          const row = result.rows[0];
          return new BookDTO(row.isbn, row.title, {firstName: row.first_name, lastName: row.last_name}, row.publication_year, row.is_available);
        } catch (error) {
          throw new Error(`Error while trying to get book by title: ${title}`);
        }
    }
    
    async update(newBook: BookDTO) {
        const queryText = `
          UPDATE authors
          SET first_name = $3, last_name = $4
          WHERE author_id = (SELECT author_id FROM books WHERE ISBN = $1);

          UPDATE books 
          SET ISBN = $1, title = $2, publication_year = $5, isAvailable = $6 
          WHERE ISBN = $1
        `;
        const values = [newBook.ISBN, newBook.title, newBook.author.firstName, newBook.author.lastName, newBook.year, newBook.isAvailable];

        try {
          await query(queryText, values);
        } catch (err) {
          throw new Error("Error while trying to update book");
        }
    }
    
    async delete(ISBN: string) {
        const queryText = `DELETE FROM books WHERE ISBN = $1;`;
        const values = [ISBN];

        try {
          await query(queryText, values);
        } catch (err) {
          throw new Error(`Error while trying to delete book by ISBN: ${ISBN}`);
        }
    }

}