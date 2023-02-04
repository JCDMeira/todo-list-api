import express from "express";
import UserController from "../controllers/UserController";

const globalRoutes = express.Router();

globalRoutes.post("/user/create", UserController.createUser);
globalRoutes.get("/users", UserController.findUsers);

export default globalRoutes;
