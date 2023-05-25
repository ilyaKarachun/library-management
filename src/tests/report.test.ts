import supertest from "supertest"
import { baseUrl, adminCredentials } from "./"

let cookie: string

const borrowerData: {
	id: null | number
	firstName: string
	lastName: string
	email: string
} = {
	id: null,
	firstName: "Test",
	lastName: "Boi",
	email: "testboi@gmail.com",
}

const bookData = {
	ISBN: "KMS1234567890",
	title: "Test Boi Book",
	author: { firstName: "Joe", lastName: "Mama" },
	year: 2022,
	isAvailable: true,
}

beforeAll(async () => {
	const response = await supertest(baseUrl)
		.post("/login")
		.send(adminCredentials)
	cookie = response.headers["set-cookie"]

	await supertest(baseUrl)
		.post("/borrowers")
		.set("Cookie", cookie)
		.send(borrowerData)

	const allBorrowersResponse = await supertest(baseUrl)
		.get("/borrowers")
		.set("Cookie", cookie)

	const borrower = allBorrowersResponse.body.data.find(
		(borrower: {
			_id: number
			_firstName: string
			_lastName: string
			_email: string
		}) => borrower._email === borrowerData.email
	)

	if (borrower) borrowerData.id = borrower._id

	await supertest(baseUrl).post("/books").set("Cookie", cookie).send(bookData)
})

describe("GET /reports/borrowed", () => {
	beforeAll(async () => {
		await supertest(baseUrl)
			.post("/borrowings")
			.set("Cookie", cookie)
			.send({
				ISBN: bookData.ISBN,
				borrowerId: borrowerData.id,
				dueDate: new Date(Date.now() + 1000000000)
					.toISOString()
					.split("T")[0],
			})
	})

	it("should return 401 if not authenticated", async () => {
		await supertest(baseUrl).get("/reports/borrowed").expect(401)
	})

	it("should return 200 if authenticated", async () => {
		await supertest(baseUrl)
			.get("/reports/borrowed")
			.set("Cookie", cookie)
			.expect(200)
	})
})

describe("GET /reports/overdue", () => {
	beforeAll(async () => {
		await supertest(baseUrl)
			.post("/borrowings")
			.set("Cookie", cookie)
			.send({
				ISBN: bookData.ISBN,
				borrowerId: borrowerData.id,
				dueDate: new Date(Date.now() - 1000000000)
					.toISOString()
					.split("T")[0],
			})
	})

	it("should return 401 if not authenticated", async () => {
		await supertest(baseUrl).get("/reports/overdue").expect(401)
	})

	it("should return 200 if authenticated", async () => {
		await supertest(baseUrl)
			.get("/reports/overdue")
			.set("Cookie", cookie)
			.expect(200)
	})
})

afterAll(async () => {
	await supertest(baseUrl)
		.delete("/books")
		.set("Cookie", cookie)
		.send({ ISBN: bookData.ISBN })
	await supertest(baseUrl)
		.delete("/borrowers")
		.set("Cookie", cookie)
		.send({ id: borrowerData.id })
})
