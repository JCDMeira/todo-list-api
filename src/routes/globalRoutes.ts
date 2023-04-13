import express from "express";
import UserController from "../controllers/UserController";

const globalRoutes = express.Router();

globalRoutes.get("/teste", (req, res) =>
  res.json([{ title: "todo 1", isCompleted: false }])
);
globalRoutes.post("/user/create", UserController.createUser);
globalRoutes.post("/user/login", UserController.Login);

export default globalRoutes;
