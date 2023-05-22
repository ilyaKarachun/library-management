export class BorrowingDTO {
    private _ISBN: string;
    private _borrowerId: number;
    private _borrowingDate: string | null;
    private _dueDate: string;
    private _returnedDate?: string;

    constructor(ISBN: string, borrowerId: number, borrowingDate: string | null, dueDate: string, returnedDate?: string){
        this._ISBN = ISBN;
        this._borrowerId = borrowerId;
        this._borrowingDate = borrowingDate;
        this._dueDate = dueDate;
        this._returnedDate = returnedDate;
    }

    get ISBN(): string {
        return this._ISBN;
    }
    set ISBN(ISBN: string) {
        this._ISBN = ISBN;
    }

    get borrowerId(): number {
        return this._borrowerId;
    }
    set borrowerId(borrowerId: number) {
        this._borrowerId = borrowerId;
    }

    get borrowingDate(): string | null {
        return this._borrowingDate;
    }
    set borrowingDate(borrowingDate: string | null) {
        this._borrowingDate = borrowingDate;
    }

    get dueDate(): string {
        return this._dueDate;
    }
    set dueDate(dueDate: string) {
        this._dueDate = dueDate;
    }

    get returnedDate(): string | undefined {
        return this._returnedDate;
    }
    set returnedDate(returnedDate: string | undefined) {
        this._returnedDate = returnedDate;
    }
}