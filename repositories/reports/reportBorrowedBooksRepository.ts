import ReportBorrowedBooks from "../../dtos/reportBorrowedBooksDTO";
import query from "../../db/db";
import BookDTO from "../../dtos/bookDTO";

export class reportBorrowedBooksRepository {
    getAll = async () => {
        const queryText = 'SELECT * FROM books WHERE isavailable = false';
        try {
            const result = await query(queryText);
           const reportBorrowedBooks = new ReportBorrowedBooks();
           result.rows.forEach((row) => {
                const book = new BookDTO(row.isbn, row.title, row.author, row.year, row.isavailable);
                reportBorrowedBooks.addBook(book);
           });
              return reportBorrowedBooks;
        }
        catch (err) {
            throw new Error(`Error while getting books: ${err.message}`);
        }
    };
}