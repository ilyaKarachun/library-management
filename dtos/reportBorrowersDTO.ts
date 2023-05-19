import {BorrowerDTO} from './borrowerDTO';

class ReportBorrowersDTO{
    borrowers: Array<BorrowerDTO>;
    constructor(){
        this.borrowers = [];
    }
    //getter to return a copy of array of borrowers
    getBorrowers(): Array<BorrowerDTO> {
        return this.borrowers.slice();
    }
    //setter to set the array of borrowers
    setBorrowers(borrowers: Array<BorrowerDTO>): void {
        this.borrowers = borrowers;
    }
    //add a borrower to the array of borrowers
    addBorrower(borrower: BorrowerDTO): void {
        this.borrowers.push(borrower);
    }
    //remove a borrower from the array of borrowers
    removeBorrower(borrower: BorrowerDTO): void {
        let index = this.borrowers.indexOf(borrower);
        this.borrowers.splice(index, 1);
    }

}
export default ReportBorrowersDTO;