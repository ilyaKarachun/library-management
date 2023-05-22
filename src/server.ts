import express from "express";
import bookRouter from "../routers/bookRouter";
import userRouter from "../routers/userRouter";
import reportRouter from "../routers/reportRouter";
import borrowerRouter from "../routers/borrowerRouter";
import { pool } from "../db/dbConnection";
import { createTables } from "../db/migrations/createTables";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", bookRouter, userRouter, reportRouter, borrowerRouter);

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
