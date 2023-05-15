export class BooksRecord {
    title: string;
    author: string;
    publicationYear: number;
    isbn: number;
    isAvailable: boolean;
    constructor(obj: BooksRecord) {
        this.author = obj.author;
        this.title = obj.title;
        this.publicationYear = obj.publicationYear;
        this.isbn = obj.isbn;
        this.isAvailable = obj.isAvailable;
    }
    static async listAll(): Promise<BooksRecord[]> {
        const [ results ] = await @TODO settingsofdb("SELECT `title`, `author`, `isbn` FROM 'books');
        return results.map(obj => new BooksRecord(obj));
    }
}
