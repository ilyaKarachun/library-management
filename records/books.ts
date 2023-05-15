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
        const [ results ] = await pool.execute("SELECT `title`, `author`, `isbn` FROM `books`")
        return results.map(obj => new BooksRecord(obj));
    }
    static async getOne(isbn: number): Promise<BooksRecord | null> {
        const [ results ] = await pool.execute("SELECT `title`, `author`, `isbn` FROM `books` WHERE `isbn` = :isbn", {
            isbn,
        });
        return results.length === 0 ? null : new BooksRecord(results[0]);
    }
    async update(): Promise<void> {
        await pool.execute("UPDATE `books` SET `author` = :author, `title` = :title, `isAvailable` = :isAvailable, `publicationYear` = :publicationYear WHERE `isbn` = :isbn", {
            author: this.author,
            title: this.title,
            isAvailable: this.isAvailable,
            publicationYear: this.publicationYear,
            isbn: this.isbn,
        });
    };
}
