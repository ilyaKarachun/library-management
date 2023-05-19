import express from "express";
import dotenv from "dotenv";
import bookRouter from "./routes/bookRouter";
import { pool } from "./db/dbConnection";
import { createTables } from "./db/migrations/createTables";

dotenv.config();
const app = express();
const port = process.env.APP_PORT!;

app.use(express.json());
app.use("/", bookRouter);

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  await pool
    .connect()
    .then(() => console.log("connected to db"))
    .then(() => {
      createTables();
      console.log(`tables created`);
    });
});