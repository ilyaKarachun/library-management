import query from "../../db/db";
import ReportAllBooksDTO from "../../dtos/reportAllBooksDTO";
import BookDTO from "../../dtos/bookDTO";

export class reportAllBooksRepository {
    getAll = async () => {
        const queryText = 'SELECT * FROM books';
        try {
            const result = await query(queryText);
           const reportAllBooks = new ReportAllBooksDTO();
           result.rows.forEach((row) => {
                const book = new BookDTO(row.isbn, row.title, row.author, row.year, row.isavailable);
                reportAllBooks.addBook(book);
           });
              return reportAllBooks;
        }
        catch (err) {
            throw new Error(`Error while getting books: ${err.message}`);
        }
    };   
}


