class UserDTO {
    private _user_id: number;
    private _first_name: string;
    private _last_name: string;
    private _email: string;
    private _hashed_pass: string;

    constructor(user_id: number, first_name: string, last_name: string, email: string, hashed_pass: string) {
        this._user_id = user_id;
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._hashed_pass = hashed_pass;
    }
    get user_id(): number {
        return this._user_id;
    }
    set user_id(user_id: number) {
        this._user_id = user_id;
    }
    get first_name(): string {
        return this._first_name;
    }
    set first_name(first_name: string) {
        this._first_name = first_name;
    }
    get last_name(): string {
        return this._last_name;
    }
    set last_name(last_name: string) {
        this._last_name = last_name;
    }
    get email(): string {
        return this._email;
    }
    set email(email: string) {
        this._email = email;
    }
    get hashed_pass(): string {
        return this._hashed_pass;
    }
    set hashed_pass(hashed_pass: string) {
        this._hashed_pass = hashed_pass;
    }

}
export default UserDTO;