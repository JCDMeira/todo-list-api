import express from "express";
import UserController from "../controllers/UserController";

const globalRoutes = express.Router();

globalRoutes.post("/user/create", UserController.createUser);
globalRoutes.post("/user/login", UserController.Login);

export default globalRoutes;
