import express from "express";
import UserController from "../controllers/UserController";

const globalRoutes = express.Router();

globalRoutes.get("user/create", UserController.createUser);

export default globalRoutes;
