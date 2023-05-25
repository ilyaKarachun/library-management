import supertest from "supertest"
import { baseUrl, adminCredentials } from "./"

let cookie: string

beforeAll(async () => {
	const response = await supertest(baseUrl)
		.post("/login")
		.send(adminCredentials)
	cookie = response.headers["set-cookie"]
	console.log(cookie, adminCredentials)
})

const borrowerData = {
	firstName: "John",
	lastName: "Doe",
	email: "john.doe" + Math.random() * (9999 - 1000) + 1000 + "@gmail.com",
}



describe("POST /borrowers", () => {
	const url = "/borrowers"

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
	
	
})

describe("GET /borrowers", () => {
	const url = "/borrowers"

	it("should return 401 if user is not logged in", async () => supertest(baseUrl).get(url).expect(401))

	it("should return 200 if user is logged in", async () => supertest(baseUrl).get(url).set("Cookie", cookie).expect(200))
})