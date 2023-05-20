export class BorrowerDTO {
    private _id?: number;
    private _firstName: string;
    private _lastName: string;
    private _email: string;

    constructor(firstName: string, lastName: string, email: string, id?: number){
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
    }

    get id(): number | undefined {
        return this._id;
    }

    set id(id: number | undefined) {
        this._id = id;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(firstName: string) {
        this._firstName = firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(lastName: string) {
        this._lastName = lastName;
    }

    get email(): string {
        return this._email;
    }

    set email(email: string) {
        this._email = email;
    }
}
export default BorrowerDTO;