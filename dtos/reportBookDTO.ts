import {BookDTO} from "./bookDTO";

class ReportBookDTO {
    books: Array<BookDTO>;
    constructor(){
        this.books = [];
    } 
    //getter to return a copy of array of books 
    getBooks(): Array<BookDTO> {
        return this.books.slice();
    }
    //setter to set the array of books
    setBooks(books: Array<BookDTO>): void {
        this.books = books;
    }
    //add a book to the array of books
    addBook(book: BookDTO): void {
        this.books.push(book);
    }
    //remove a book from the array of books
    removeBook(book: BookDTO): void {
        let index = this.books.indexOf(book);
        this.books.splice(index, 1);
    }
}
export default ReportBookDTO;