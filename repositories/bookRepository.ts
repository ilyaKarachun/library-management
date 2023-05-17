import BookDTO from '../dtos/bookDTO';
import query from '../db/db'; 

export class BookRepository{
    private table: string = "books";

    async create(newBook: BookDTO): Promise<void>{
        const queryText = `INSERT INTO ${this.table} (ISBN, title, author, year, isavailable) VALUES ($1, $2, $3, $4, $5);`;
        const values = [newBook.ISBN, newBook.title, newBook.author, newBook.year, newBook.isAvailable];

        try{
            await query(queryText, values);
        }catch(error){
            throw new Error("Error while trying to create a book");
        }
    }

    async getall(){
        const queryText = `SELECT ISBN, title, author, year, isavailable FROM ${this.table} ORDER BY ISBN;`;
        try{
            const result = await query(queryText);

            return result.rows.map(
                (row) => new BookDTO(row.isbn, row.title, row.author, row.year, row.isavailable)
            );

        }catch(error){
            throw new Error("Error while trying to get all books");
        }
    }

    async getByISBN(ISBN: string) {
        const queryText = `SELECT ISBN, title, author, year, isavailable FROM ${this.table} WHERE ISBN = $1;`;
        const values = [ISBN];

        try {
          const result = await query(queryText, values);
          if (result.rows.length === 0) {
            return null; // Book not found
          }
      
          const row = result.rows[0];
          return new BookDTO(row.isbn, row.title, row.author, row.year, row.isavailable);
        } catch (error) {
          throw new Error(`Error while trying to get book by ISBN: ${ISBN}`);
        }
    }
    
    async getByTitle(title: string): Promise<BookDTO | null> {
        const queryText = `SELECT ISBN, title, author, year, isavailable FROM ${this.table} WHERE title = $1;`;
        const values = [title];
      
        try {
          const result = await query(queryText, values);
          if (result.rows.length === 0) {
            return null; // Book not found
          }
      
          const row = result.rows[0];
          return new BookDTO(row.isbn, row.title, row.author, row.year, row.isavailable);
        } catch (error) {
          throw new Error(`Error while trying to get book by title: ${title}`);
        }
    }
    
    async update(newBook: BookDTO) {
        const queryText = `UPDATE ${this.table} SET ISBN = $1, title = $2, author = $3, year = $4, isAvailable = $5 WHERE ISBN = $1`;
        const values = [newBook.ISBN, newBook.title, newBook.author, newBook.year, newBook.isAvailable];

        try {
          await query(queryText, values);
        } catch (err) {
          throw new Error("Error while trying to update book");
        }
    }
    
    async delete(ISBN: string) {
        const queryText = `DELETE FROM ${this.table} WHERE ISBN = $1;`;
        const values = [ISBN];

        try {
          await query(queryText, values);
        } catch (err) {
          throw new Error(`Error while trying to delete book by ISBN: ${ISBN}`);
        }
    }

}