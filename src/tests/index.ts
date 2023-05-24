import dotenv from "dotenv"
dotenv.config()

export const baseUrl = "http://localhost:" + (process.env.PORT || 3000)
export const adminCredentials = { email: "admin@gmail.com", password: "admin" }
