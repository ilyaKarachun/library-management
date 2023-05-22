import { pool } from "../db/dbConnection";
import BookDTO from "../dtos/bookDTO";
import BorrowerDTO from "../dtos/borrowerDTO";
import ReportBookDTO from "../dtos/reportBookDTO";
import ReportBorrowersDTO from "../dtos/reportBorrowersDTO";


export class ReportRepository{

    getAllBooks = async () => {
        const queryText = `
            SELECT b.ISBN, b.title, a.first_name, a.last_name, b.publication_year, b.is_available 
            FROM books b
            INNER JOIN authors a 
            ON b.author_id = a.author_id
            ORDER BY b.ISBN;
        `;
        try {
            const result = await pool.query(queryText);
            const reportAllBooks = new ReportBookDTO();
            result.rows.forEach((row) => {
                const author = {firstName: row.first_name, lastName: row.last_name};
                const book = new BookDTO(row.isbn, row.title, author, row.year, row.is_available);
                reportAllBooks.addBook(book);
            });
            return reportAllBooks;
        }
        catch (err) {
            throw new Error('Error while getting books');
        }
    }; 

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
            const reportBorrowedBooks = new ReportBookDTO();
            result.rows.forEach((row) => {
                const author = {firstName: row.first_name, lastName: row.last_name};
                const book = new BookDTO(row.isbn, row.title, author, row.year, row.is_available);
                reportBorrowedBooks.addBook(book);
            });
            return reportBorrowedBooks;
        }
        catch (err) {
            throw new Error(`Error while getting books`);
        }
    };  

    getAllBorrowers = async () => {
        const queryText = 'SELECT * FROM borrowers';
        try {
            const result = await pool.query(queryText);
            const reportBorrower = new ReportBorrowersDTO();
            result.rows.forEach((row) => {
                const borrower = new BorrowerDTO(row.first_name, row.last_name, row.email, row.borrower_id);
                reportBorrower.addBorrower(borrower);
            });
            return reportBorrower;
        }
        catch (err) {
            throw new Error(`Error while getting borrowers`);
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
            const reportOverdueBooksDTO = new ReportBookDTO();
            result.rows.forEach((row) => {
                const author = {firstName: row.first_name, lastName: row.last_name};
                const book = new BookDTO(row.isbn, row.title, author, row.year, row.is_available);
                reportOverdueBooksDTO.addBook(book);
            });
            return reportOverdueBooksDTO;
        }
        catch (err) {
            throw new Error(`Error while getting overdue books`);
        }
    };

}

