import express from "express";
import bookRouter from "./routes/bookRouter";
import { pool } from "./db/dbConntection";
import { createTables } from "./db/migrations/createTables";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", bookRouter);

const port = process.env.PORT || 3000;
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
