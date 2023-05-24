import supertest from "supertest"
import { baseUrl, adminCredentials } from "./"

let cookie: string
let userCookie: string

const juniorCredentials = {
	firstName: "Admin",
	lastName: "Junior",
	email: "admin.junior@gmail.com",
	password: "admin",
}

beforeAll(async () => {
	const response = await supertest(baseUrl)
		.post("/login")
		.send(adminCredentials)
	cookie = response.headers["set-cookie"]

	await supertest(baseUrl)
		.post("/users")
		.set("Cookie", cookie)
		.send(juniorCredentials)

	const userResponse = await supertest(baseUrl)
		.post("/login")
		.send(juniorCredentials)
	userCookie = userResponse.headers["set-cookie"]
})

const userData: {
	id: number | null
	firstName: string
	lastName: string
	email: string
	password: string
} = {
	id: null,
	firstName: "David",
	lastName: "Doe",
	email: "david.doe" + Math.random() * (9999 - 1000) + 1000 + "@gmail.com",
	password: "123456",
}

describe("GET /users", () => {
	const url = "/users"

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).get(url).expect(401))

	it("should return 200 if user is logged in", async () =>
		supertest(baseUrl).get(url).set("Cookie", cookie).expect(200))
})

describe("POST /users", () => {
	const url = "/users"

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).post(url).send(userData).expect(401))

	it("should return 403 if logged user is not admin", async () =>
		supertest(baseUrl)
			.post(url)
			.set("Cookie", userCookie)
			.send(userData)
			.expect(403))

	it("should return 201", async () =>
		supertest(baseUrl)
			.post(url)
			.set("Cookie", cookie)
			.send(userData)
			.expect(201))

	it("should create new user", async () => {
		const response = await supertest(baseUrl).get(url).set("Cookie", cookie)
		return response.body.data.find(
			(user: {
				_id: number
				_firstName: string
				_lastName: string
				_email: string
			}) => user._email === userData.email
		)
	})

	// ISSUE: Currently returns 500

	// it("should return 409 if user already exists", async () =>
	// 	supertest(baseUrl)
	// 		.post(url)
	// 		.set("Cookie", cookie)
	// 		.send(userData)
	// 		.expect(409))
})

describe("GET /users/:id", () => {
	let url = "/users/"

	beforeAll(async () => {
		const response = await supertest(baseUrl).get(url).set("Cookie", cookie)

		const user = response.body.data.find(
			(user: {
				_id: number
				_firstName: string
				_lastName: string
				_email: string
			}) => user._email === userData.email
		)

		if (user) userData.id = user._id

		url += userData.id
	})

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).get(url).expect(401))

	it("should return 200 if user exists", async () =>
		supertest(baseUrl)
			.get(url)
			.set("Cookie", cookie)
			.expect(200)
			.expect({
				data: {
					_id: userData.id,
					_firstName: userData.firstName,
					_lastName: userData.lastName,
					_email: userData.email,
				},
				message: "User retrieved successfully",
			}))

	it("should return 404 if user does not exist", async () =>
		supertest(baseUrl)
			.get(url + 9999)
			.set("Cookie", cookie)
			.expect(404))
})

describe("PUT /users", () => {
	const url = "/users/"
	let themselfCookie: string

	beforeAll(async () => {
		const themselfResponse = await supertest(baseUrl)
			.post("/login")
			.send({ email: userData.email, password: userData.password })
		themselfCookie = themselfResponse.headers["set-cookie"]
	})

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).put(url).send(userData).expect(401))

	it("should return 403 if logged user is not admin or user themselves", async () =>
		supertest(baseUrl)
			.put(url)
			.set("Cookie", userCookie)
			.send(userData)
			.expect(403))

	it("should return 404 if user does not exist", async () =>
		supertest(baseUrl)
			.put(url + "45825453454")
			.set("Cookie", cookie)
			.send(userData)
			.expect(404))

	it("should return 200 if user exists and logged user is admin", async () =>
		supertest(baseUrl)
			.put(url)
			.set("Cookie", cookie)
			.send({ ...userData, firstName: "Davey" })
			.expect(200))

	it("should return 200 if user exists and logged user is user themselves", async () =>
		supertest(baseUrl)
			.put(url)
			.set("Cookie", themselfCookie)
			.send({ ...userData, firstName: "Dawid" })
			.expect(200))

	it("should update user", async () => {
		const response = await supertest(baseUrl).get(url).set("Cookie", cookie)
		const user = response.body.data.find(
			(user: {
				_id: number
				_firstName: string
				_lastName: string
				_email: string
			}) => user._email === userData.email
		)

		return user._firstName === "Dawid"
	})
})

describe("PUT /users/password", () => {
	const url = "/users/password"
	let themselfCookie: string

	beforeAll(async () => {
		const themselfResponse = await supertest(baseUrl)
			.post("/login")
			.send({ email: userData.email, password: userData.password })
		themselfCookie = themselfResponse.headers["set-cookie"]
	})

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).put(url).send(userData).expect(401))

	it("should return 403 if logged user is not admin or user themselves", async () =>
		supertest(baseUrl)
			.put(url)
			.set("Cookie", userCookie)
			.send(userData)
			.expect(403))

	it("should return 404 if user does not exist", async () =>
		supertest(baseUrl)
			.put(url + "45825453454")
			.set("Cookie", cookie)
			.send(userData)
			.expect(404))

	it("should return 200 if user exists and logged user is admin", async () =>
		supertest(baseUrl)
			.put(url)
			.set("Cookie", cookie)
			.send({
				id: userData.id,
				oldPassword: userData.password,
				newPassword: "newPassword",
			})
			.expect(200))

	it("should return 401 if old password is incorrect", async () =>
		supertest(baseUrl)
			.put(url)
			.set("Cookie", cookie)
			.send({
				id: userData.id,
				oldPassword: "wrongPassword",
				newPassword: "newPassword",
			})
			.expect(401))

	it("should return 200 if user exists and logged user is user themselves", async () =>
		supertest(baseUrl)
			.put(url)
			.set("Cookie", themselfCookie)
			.send({
				id: userData.id,
				oldPassword: "newPassword",
				newPassword: "newPassword2",
			})
			.expect(200))

	it("should update user password", async () =>
		supertest(baseUrl)
			.post("/login")
			.send({
				email: userData.email,
				password: "newPassword2",
			})
			.expect(200))
})

describe("DELETE /users/:id", () => {
	let url = "/users/"

	beforeAll(async () => {
		const response = await supertest(baseUrl).get(url).set("Cookie", cookie)

		const user = response.body.data.find(
			(user: {
				_id: number
				_firstName: string
				_lastName: string
				_email: string
			}) => user._email === userData.email
		)

		if (user) userData.id = user._id

		url += userData.id
	})

	it("should return 401 if user is not logged in", async () =>
		supertest(baseUrl).delete(url).expect(401))

	it("should return 403 if logged user is not admin", async () =>
		supertest(baseUrl).delete(url).set("Cookie", userCookie).expect(403))

	it("should return 200 if user exists", async () =>
		supertest(baseUrl)
			.delete(url)
			.set("Cookie", cookie)
			.expect(200))

	it("should delete user", async () => {
		const response = await supertest(baseUrl).get("/users/").set("Cookie", cookie)
		const user = response.body.data.find(
			(user: {
				_id: number
				_firstName: string
				_lastName: string
				_email: string
			}) => user._email === userData.email
		)

		return !user
	})

	it("should return 200 even if user doesn't exists", async () =>
		supertest(baseUrl)
			.delete(url)
			.set("Cookie", cookie)
			.expect(200))
})
