import cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import AuthRouter from "./src/auth/auth.router";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request: Request, response: Response) => {
  response.send(`<h1>Hello world  from Express! </h1>`);
});

app.use("/auth", AuthRouter);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${process.env.PORT}`);
});
