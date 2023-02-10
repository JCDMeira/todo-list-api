import express from "express";
import UserController from "../../controllers/UserController";
import Auth from "../../middleware/auth";

const UserRoutes = express.Router();

UserRoutes.get("/users", Auth, UserController.findUsers);
UserRoutes.get("/user/:id", Auth, UserController.findOneUser);
UserRoutes.put("/user/:id", Auth, UserController.editOneUser);
UserRoutes.delete("/user/:id", Auth, UserController.deleteUser);

export default UserRoutes;
