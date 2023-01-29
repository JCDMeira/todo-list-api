import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", true);

const mongoUrl = process.env.CONNECTION_STRING as string;

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on("error", console.log.bind(console, "Connetion error"));
db.once("open", () => console.log("sucessful connection"));

export default db;
