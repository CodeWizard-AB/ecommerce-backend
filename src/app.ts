import express, { type Request, type Response } from "express";
import config from "./config/index.ts";
import connectDB from "./config/db.ts";

connectDB();

const app = express();

app.get("/", (_req: Request, res: Response) => {
	res.send("Hello World!");
});

app.listen(config.port, () => {
	console.log(`Server is running on port ${config.port}`);
});
