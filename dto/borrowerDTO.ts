export default class BorrowerDTO {
	constructor(
		private _borrowerId: number,
		private _hashedPassword: string,
		private _firstName: string,
		private _lastName: string,
		private _email: string,
		private _phone: number,
		private _booksBorrowed: number[],
		private _dateJoined: Date
	) {}

	get borrowerId() {
		return this._borrowerId
	}

	set borrowerId(borrowerId: number) {
		this._borrowerId = borrowerId
	}

	get hashedPassword() {
		return this._hashedPassword
	}

	set hashedPassword(password: string) {
		this._hashedPassword = password
	}

	get firstName() {
		return this._firstName
	}

	set firstName(firstName: string) {
		this._firstName = firstName
	}

	get lastName() {
		return this._lastName
	}

	set lastName(lastName: string) {
		this._lastName = lastName
	}

	get email() {
		return this._email
	}

	set email(email: string) {
		this._email = email
	}

	get phone() {
		return this._phone
	}

	set phone(phone: number) {
		this._phone = phone
	}

	get booksBorrowed() {
		return this._booksBorrowed
	}

	set booksBorrowed(booksBorrowed: number[]) {
		this._booksBorrowed = booksBorrowed
	}

	get dateJoined() {
		return this._dateJoined
	}

	set dateJoined(dateJoined: Date) {
		this._dateJoined = dateJoined
	}
}
