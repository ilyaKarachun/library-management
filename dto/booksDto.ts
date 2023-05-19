export class BooksDto {
    title: string;
    author: string;
    publicationYear: number;
    isbn: number;
    isAvailable: boolean;

    constructor(title: string, author: string, publicationYear: number, isbn: number, isAvailable: boolean) {
        this.author = author;
        this.title = title;
        this.publicationYear = publicationYear;
        this.isbn = isbn;
        this.isAvailable = isAvailable;
    }
}