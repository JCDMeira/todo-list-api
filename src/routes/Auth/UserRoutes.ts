import express from "express";
import UserController from "../../controllers/UserController";

const UserRoutes = express.Router();

UserRoutes.get("/users", UserController.findUsers);
UserRoutes.get("/user/:id", UserController.findOneUser);
UserRoutes.put("/user/:id", UserController.editOneUser);
UserRoutes.delete("/user/:id", UserController.deleteUser);
UserRoutes.post("/user/logout", UserController.Logout);

export default UserRoutes;
