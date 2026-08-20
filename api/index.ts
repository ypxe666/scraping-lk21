import dotenv from "dotenv";
dotenv.config();

import express, { type Application, type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "../src/routes/routes.js";

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Berhasil Terhubung!" });
});

app.use(routes);

export default app;
