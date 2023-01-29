import express from "express";
import routes from "./routes";
import "./config/dbConfig";

const app = express();

app.use(express.json());
routes(app);

export default app;
