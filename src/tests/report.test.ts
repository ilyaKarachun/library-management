import supertest from "supertest"
import { baseUrl, adminCredentials } from "./"

let cookie: string

beforeAll(async () => {
	const response = await supertest(baseUrl)
		.post("/login")
		.send(adminCredentials)
	cookie = response.headers["set-cookie"]
})

// ISSUE: Cannot create books

// describe("GET /reports/books", () => {
// 	const url = "/reports/books"

// 	beforeAll(async () => {
// 		await supertest(baseUrl).post("/books").set("Cookie", cookie).send({
// 			ISBN: "9999",
// 			title: "Test Book 1",
// 			author: "Me",
// 			year: 2023,
// 		})
// 		await supertest(baseUrl).post("/books").set("Cookie", cookie).send({
// 			ISBN: "9998",
// 			title: "Test Book 2",
// 			author: "Me",
// 			year: 2023,
// 		})
// 	})

// 	it("should return 401 if user is not logged in", async () =>
// 		supertest(baseUrl).get(url).expect(401))

// 	it("should return 200", async () =>
// 		supertest(baseUrl)
// 			.get(url)
// 			.set("Cookie", cookie)
// 			.expect(200)
// 			.expect({ data: [] }))

// 	afterAll(async () => {
// 		await supertest(baseUrl).delete("/books/9999").set("Cookie", cookie)
// 		await supertest(baseUrl).delete("/books/9998").set("Cookie", cookie)
// 	})
// })

describe("GET /reports/borrowers", () => {
	const url = "/reports/borrowers"
	let ids: number[]

	beforeAll(async () => {
		const emails = [
			"mike.smith" + Math.random() * (9999 - 1000) + 1000 + "@gmail.com",
			"kate.smith" + Math.random() * (9999 - 1000) + 1000 + "@gmail.com",
		]

		await supertest(baseUrl).post("/borrowers").set("Cookie", cookie).send({
			firstName: "Mike",
			lastName: "Smith",
			email: emails[0],
		})

		await supertest(baseUrl).post("/borrowers").set("Cookie", cookie).send({
			firstName: "Kate",
			lastName: "Smith",
			email: emails[1],
		})

		const response = await supertest(baseUrl)
			.get("/borrowers")
			.set("Cookie", cookie)

		ids = [
			response.body.data.find(
				(borrower: {
					_id: number
					_firstName: string
					_lastName: string
					_email: string
				}) => borrower._email === emails[0]
			)._id,
			response.body.data.find(
				(borrower: {
					_id: number
					_firstName: string
					_lastName: string
					_email: string
				}) => borrower._email === emails[1]
			)._id,
		]
	})

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).get(url).expect(401))

	it("should return 200", async () =>
		supertest(baseUrl).get(url).set("Cookie", cookie).expect(200))

	afterAll(async () => {
		await supertest(baseUrl)
			.delete("/borrowers/" + ids[0])
			.set("Cookie", cookie)
		await supertest(baseUrl)
			.delete("/borrowers/" + ids[1])
			.set("Cookie", cookie)
	})
})
