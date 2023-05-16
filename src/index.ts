import express from "express";
import bookRouter from "./routes/bookRouter";
import { pool } from "./dbConntection";
import { createTables } from "./migrations/createTables";

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
