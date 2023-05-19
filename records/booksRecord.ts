import { BooksDto } from '../dto/booksDto';

type BooksGet = Omit<BooksDto, 'isAvailable' & 'publicationYear'>;

export class BooksRecord extends BooksDto {
    static async listAll(): Promise<BooksGet> {
        await pool.execute("SELECT `title`, `author`, `isbn` FROM `books`");
    }
    static async getOne(isbn: number): Promise<BooksGet | null> {
        await pool.execute("SELECT `title`, `author`, `isbn` FROM `books` WHERE `isbn` = :isbn", {
            isbn,
        });
    }
    async update(): Promise<void> {
        await pool.execute("UPDATE `books` SET `author` = :author, `title` = :title, `isAvailable` = :isAvailable, `publicationYear` = :publicationYear WHERE `isbn` = :isbn", {
            author: this.author,
            title: this.title,
            isAvailable: this.isAvailable,
            publicationYear: this.publicationYear,
            isbn: this.isbn,
        });
    }
    async insert(): Promise<void> {
        await pool.execute("INSERT INTO `books`(`author`, `title`, `isAvailable`, `publicationYear`, `isbn`) VALUES(:author, title, isAvailable, publicationYear, isbn)", {
            author: this.author,
            title: this.title,
            isAvailable: this.isAvailable,
            publicationYear: this.publicationYear,
            isbn: this.isbn,
        });
    }
    static async delete(isbn): Promise<void> {
        await pool.execute("DELETE FROM `books` WHERE `isbn` = :isbn", {
            isbn,
        });
    };
}
