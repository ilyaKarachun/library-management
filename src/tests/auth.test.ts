import supertest from "supertest"
import { baseUrl, adminCredentials } from "./"

describe("POST /login", () => {
	const url = "/login"

	it("should return 422 if email or password is missing", async () =>
		supertest(baseUrl).post(url).expect(422))

	it("should return 404 if user not found", async () =>
		supertest(baseUrl)
			.post(url)
			.send({ ...adminCredentials, email: "DOES_NOT_EXIST" })
			.expect(404))

	it("should return 401 if credentials don't match", async () =>
		supertest(baseUrl)
			.post(url)
			.send({ ...adminCredentials, password: "WRONG_PASSWORD" })
			.expect(401))

	it("should return 200 if credentials match", async () =>
		supertest(baseUrl).post(url).send(adminCredentials).expect(200))
})

describe("GET /logout", () => {
	const url = "/logout"
	let cookie: string
	
	beforeAll(async () => {
		const response = await supertest(baseUrl).post("/login").send(adminCredentials)
		cookie = response.headers["set-cookie"]
	})

	it("should return 200 if user is logged in", async () =>
		supertest(baseUrl).get(url).set("Cookie", cookie).expect(200))

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).get(url).expect(401))
})
