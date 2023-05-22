class UserDTO {
    private _id: number | null;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _hashedPass?: string;

    constructor(id: number | null, firstName: string, lastName: string, email: string, hashedPass?: string){
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._hashedPass = hashedPass;
    }

    get id(): number | null {
        return this._id;
    }
    set id(id: number | null) {
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

    get hashedPass(): string | undefined {
        return this._hashedPass;
    }
    set hashedPass(hashedPass: string | undefined) {
        this._hashedPass = hashedPass;
    }

}
export default UserDTO;