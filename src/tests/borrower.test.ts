import supertest from "supertest"
import { baseUrl, adminCredentials } from "./"

let cookie: string

beforeAll(async () => {
	const response = await supertest(baseUrl)
		.post("/login")
		.send(adminCredentials)
	cookie = response.headers["set-cookie"]
})

const borrowerData: {
	id: null | number
	firstName: string
	lastName: string
	email: string
} = {
	id: null,
	firstName: "John",
	lastName: "Doe",
	email: "john.doe" + Math.random() * (9999 - 1000) + 1000 + "@gmail.com",
}

describe("GET /borrowers", () => {
	const url = "/borrowers"

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).get(url).expect(401))

	it("should return 200 if user is logged in", async () =>
		supertest(baseUrl).get(url).set("Cookie", cookie).expect(200))
})

describe("POST /borrowers", () => {
	const url = "/borrowers"

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).post(url).send(borrowerData).expect(401))

	it("should return 201", async () =>
		supertest(baseUrl)
			.post(url)
			.set("Cookie", cookie)
			.send(borrowerData)
			.expect(201))

	it("should create new borrower", async () =>
		supertest(baseUrl)
			.get(url + "/email/" + borrowerData.email)
			.set("Cookie", cookie)
			.expect(200))

	// ISSUE: Currently returns 500

	// it("should return 409 if borrower already exists", async () =>
	// 	supertest(baseUrl)
	// 		.post(url)
	// 		.set("Cookie", cookie)
	// 		.send(borrowerData)
	// 		.expect(409))
})

describe("GET /borrowers/email/:email", () => {
	const url = "/borrowers/email/" + borrowerData.email

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).get(url).expect(401))

	it("should return 200 if borrower exists", async () =>
		supertest(baseUrl).get(url).set("Cookie", cookie).expect(200))

	it("should return 404 if borrower does not exist", async () =>
		supertest(baseUrl)
			.get(url + "123" + borrowerData.email)
			.set("Cookie", cookie)
			.expect(404))
})

describe("GET /borrowers/:id", () => {
	let url = "/borrowers/"

	beforeAll(async () => {
		const response = await supertest(baseUrl)
			.get("/borrowers")
			.set("Cookie", cookie)

		const borrower = response.body.data.find(
			(borrower: {
				_id: number
				_firstName: string
				_lastName: string
				_email: string
			}) => borrower._email === borrowerData.email
		)

		if (borrower) borrowerData.id = borrower._id

		url += borrowerData.id
	})

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).get(url).expect(401))

	it("should return 200 if borrower exists", async () =>
		supertest(baseUrl)
			.get(url)
			.set("Cookie", cookie)
			.expect(200)
			.expect({
				data: {
					_id: borrowerData.id,
					_firstName: borrowerData.firstName,
					_lastName: borrowerData.lastName,
					_email: borrowerData.email,
				},
				message: "Borrower retrieved successfully",
			}))

	it("should return 404 if borrower does not exist", async () =>
		supertest(baseUrl)
			.get(url + "123")
			.set("Cookie", cookie)
			.expect(404))
})

describe("PUT /borrowers/:id", () => {
	const url = "/borrowers/"

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).put(url).send(borrowerData).expect(401))

	it("should return 404 if borrower does not exist", async () =>
		supertest(baseUrl)
			.put(url + "0932893")
			.set("Cookie", cookie)
			.send(borrowerData)
			.expect(404))

	it("should return 200 if borrower exists", async () =>
		supertest(baseUrl)
			.put(url)
			.set("Cookie", cookie)
			.send({ ...borrowerData, firstName: "Jane" })
			.expect(200))

	it("should update borrower", async () =>
		supertest(baseUrl)
			.get(url + borrowerData.id)
			.set("Cookie", cookie)
			.expect(200)
			.expect({
				data: {
					_id: borrowerData.id,
					_firstName: "Jane",
					_lastName: borrowerData.lastName,
					_email: borrowerData.email,
				},
				message: "Borrower retrieved successfully",
			}))

	it("should return 404 if borrower does not exist", async () =>
		supertest(baseUrl)
			.put(url + "123")
			.set("Cookie", cookie)
			.send(borrowerData)
			.expect(404))
})

describe("DELETE /borrowers/:id", () => {
	let url = "/borrowers/"

	beforeAll(async () => {
		url += borrowerData.id
	})

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).delete(url).expect(401))

	it("should return 200", async () =>
		supertest(baseUrl).delete(url).set("Cookie", cookie).expect(200))

	it("should delete borrower", async () =>
		supertest(baseUrl).get(url).set("Cookie", cookie).expect(404))

	it("should return 200 even if borrower doesn't exist", async () =>
		supertest(baseUrl).delete(url).set("Cookie", cookie).expect(200))
})
