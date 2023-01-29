import { Request, Response } from "express";
import UserModel from "../models/UserModel";
// import { httpMethod } from "../types";
// import userBody from "../types/UserBody";

class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { body } = req;
      const { username } = body;
      const date = new Date().getTime();

      if (/\s/g.test(username))
        return res.status(400).json({ message: "Invalid format" });

      const isUnic = await UserModel.find({ username });
      if (isUnic.length)
        return res.status(400).json({ message: "This username already exist" });

      const newUser = await UserModel.create({
        ...body,
        created_at: date,
        updated_at: date,
      });

      return res
        .status(201)
        .json({ message: `User ${newUser.username} is sucefull create` });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }
}

export default UserController;
