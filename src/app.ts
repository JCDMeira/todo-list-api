import express from "express";
import routes from "./routes";
import "./config/dbConfig";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
routes(app);

export default app;
