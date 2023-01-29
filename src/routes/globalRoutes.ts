import express from "express";
import UserController from "../controllers/UserController";

const globalRoutes = express.Router();

globalRoutes.post("/user/create", UserController.createUser);

export default globalRoutes;
