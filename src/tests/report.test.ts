import supertest from "supertest"
import { baseUrl, adminCredentials } from "./"

let cookie: string

beforeAll(async () => {
	const response = await supertest(baseUrl)
		.post("/login")
		.send(adminCredentials)
	cookie = response.headers["set-cookie"]
})

describe("GET /reports/books", () => {
	const url = "/reports/books"

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).get(url).expect(401))

	it("should return 200", async () =>
	{
		supertest(baseUrl).post("/books").set("Cookie", cookie).send({ ISBN: 9999, title: "Test Book 1", author: "Me", year: 2023 })
		supertest(baseUrl).post("/books").set("Cookie", cookie).send({ ISBN: 9998, title: "Test Book 2", author: "Me", year: 2023 })

		supertest(baseUrl).get(url).set("Cookie", cookie).expect(200)

		supertest(baseUrl).delete("/books/9999").set("Cookie", cookie)
		supertest(baseUrl).delete("/books/9998").set("Cookie", cookie)
	})
})