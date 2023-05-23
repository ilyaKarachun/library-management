import { pool } from "../db/dbConnection";
import BookDTO from "../dtos/bookDTO";

export class ReportRepository{

    getAllBorrowed = async () => {
        const queryText = `
            SELECT b.ISBN, b.title, a.first_name, a.last_name, b.publication_year, b.is_available 
            FROM books b
            INNER JOIN authors a 
            ON b.author_id = a.author_id
            WHERE is_available = false
            ORDER BY b.ISBN;
        `;
        try {
            const result = await pool.query(queryText);
            const reportBorrowedBooks = new Array<BookDTO>();
            result.rows.forEach((row) => {
                const author = {firstName: row.first_name, lastName: row.last_name};
                const book = new BookDTO(row.isbn, row.title, author, row.year, row.is_available);
                reportBorrowedBooks.push(book);
            });
            return reportBorrowedBooks;
        }
        catch (err) {
            throw new Error(`Error while getting books`);
        }
    };  
  
    getAllOverdue = async () => {
        const queryText = `
            SELECT bb.ISBN, b.title, a.first_name, a.last_name, b.publication_year, b.is_available 
            FROM books_borrowers bb 
            INNER JOIN books b 
            ON bb.ISBN = b.ISBN
            INNER JOIN authors a
            ON b.author_id = a.author_id
            WHERE bb.due_date < NOW()
        `;
        try {
            const result = await pool.query(queryText);
            const reportOverdueBooksDTO = new Array<BookDTO>();
            result.rows.forEach((row) => {
                const author = {firstName: row.first_name, lastName: row.last_name};
                const book = new BookDTO(row.isbn, row.title, author, row.year, row.is_available);
                reportOverdueBooksDTO.push(book);
            });
            return reportOverdueBooksDTO;
        }
        catch (err) {
            throw new Error(`Error while getting overdue books`);
        }
    };

}

