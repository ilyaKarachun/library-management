import BookDTO from '../dto/BookDTO';
import querry from '../db/db'; 

export class BookRepository{

    async getall(){
        const queryText = "SELECT id_book, isbn, title, author, year, isavailable FROM book ORDER BY id_book";
        try{
            const result = await querry(queryText);
            return result.rows.map(
                (row)=> new BookDTO(row.id_book,row.isbn, row.title, row.author, row.year, row.isavailable)
            );

        }catch(error){
            throw new Error("Error while trying to get all books");
        }
    }

    async create(newBook: BookDTO): Promise<void>{
        const queryText = "INSERT INTO book (isbn, title, author, year, isavailable) VALUES ($1, $2, $3, $4, $5) RETURNING id_book";
        const values = [newBook.ISBN, newBook.title, newBook.author, newBook.year, newBook.isAvailable];

        try{
            await querry(queryText, values);
        }catch(error){
            throw new Error("Error while trying to create a book");
        }
    }
    
    async getByTitle(title: string): Promise<BookDTO | null> {
        const queryText = 'SELECT id_book, isbn, title, author, year, isavailable FROM book WHERE title = $1';
        const values = [title];
      
        try {
          const result = await querry.query(queryText, values);
          if (result.rows.length === 0) {
            return null; // Book not found
          }
      
          const row = result.rows[0];
          return new BookDTO(row.id_book, row.isbn, row.title, row.author, row.year, row.isavailable);
        } catch (error) {
          throw new Error(`Error while trying to get book by title: ${title}`);
        }
      }
    
    
    
}