import { ReportBorrowersDTO } from "../dtos/reportBorrowersDTO";
import { BorrowerDTO } from "../dto/borrowerDTO";
import { query } from "../db";


export class ReportBorrowerRepository {
    getAll = async () => {
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
    }
}
