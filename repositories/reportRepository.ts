import query from "../db/db";
import BookDTO from "../dtos/bookDTO";
import { BorrowerDTO } from "../dto/borrowerDTO";
import ReportBookDTO from "../dtos/reportBookDTO";



export class ReportRepository{

    getAllBooks = async () => {
        const queryText = 'SELECT * FROM books';
        try {
            const result = await query(queryText);
           const reportAllBooks = new ReportBookDTO();
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

    getAllBorrowed = async () => {
        const queryText = 'SELECT * FROM books WHERE isavailable = false';
        try {
            const result = await query(queryText);
           const reportBorrowedBooks = new ReportBookDTO();
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

    getAllBorrowers = async () => {
        const queryText = 'SELECT * FROM borrower';
        try {
            const result = await query(queryText);
            const reportBorrower = new ReportBorrowersDTO();
            result.rows.forEach((row) => {
                const borrower = new BorrowerDTO(row.id_borrower, row.first_name, row.last_name, row.email);
                reportBorrower.addBorrower(borrower);
            });
            return reportBorrower;
        }
        catch (err) {
            throw new Error(`Error while getting borrowers: ${err.message}`);
        }
    };
    
    getAllOverdue = async () => {
        const queryText = 'SELECT bb.ISBN, b.title, b.author_id, b.publication_year, b.is_available FROM books_borrowers bb INNER JOIN books b ON bb.ISBN = b.ISBN WHERE bb.borrowing_date < bb.due_date';
        try {
            const result = await query(queryText);
            const reportOverdueBooksDTO = new ReportBookDTO();
            result.rows.forEach((row) => {
                const book = new BookDTO(row.isbn, row.title, row.author_id, row.publication_year, row.is_available);
                reportOverdueBooksDTO.addBook(book);
            });
            return reportOverdueBooksDTO;
        }
        catch (err) {
            throw new Error(`Error while getting overdue books: ${err.message}`);
        }
    };

}

