import {BorrowersDTO} from './borrowersDTO';
class ReportBorrowersDTO{
    borrowers: Array<BorrowersDTO>;
    constructor(){
        this.borrowers = [];
    }
    //getter to return a copy of array of borrowers
    getBorrowers(): Array<BorrowersDTO> {
        return this.borrowers.slice();
    }
    //setter to set the array of borrowers
    setBorrowers(borrowers: Array<BorrowersDTO>): void {
        this.borrowers = borrowers;
    }
    //add a borrower to the array of borrowers
    addBorrower(borrower: BorrowersDTO): void {
        this.borrowers.push(borrower);
    }
    //remove a borrower from the array of borrowers
    removeBorrower(borrower: BorrowersDTO): void {
        let index = this.borrowers.indexOf(borrower);
        this.borrowers.splice(index, 1);
    }

}
export default ReportBorrowersDTO;