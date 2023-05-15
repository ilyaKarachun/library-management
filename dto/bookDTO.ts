class BookDTO {
    private _bookId: number;
    private _ISBN: string;
    private _title: string;
    private _author: string;
    private _year: number;
    private _isAvailable: boolean;

    constructor(bookId: number, ISBN: string, title: string, author: string, year: number, isAvailable: boolean){
        this._bookId = bookId;
        this._ISBN = ISBN;
        this._title = title;
        this._author = author;
        this._year = year;
        this._isAvailable = isAvailable;
    }

    get ISBN(): string {
        return this._ISBN;
    }

    set ISBN(ISBN: string) {
        this._ISBN = ISBN;
    }

    get title(): string {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
    }

    get author(): string {
        return this._author;
    }

    set author(author: string) {
        this._author = author;
    }

    get year(): number {
        return this._year;
    }

    set year(year: number) {
        this._year = year;
    }

    get isAvailable(): boolean {
        return this._isAvailable;
    }

    set isAvailable(isAvailable: boolean) {
        this._isAvailable = isAvailable;
    }
}

export default BookDTO;