import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { Req, Res, UserBody } from "../types";
// import { httpMethod } from "../types";
// import userBody from "../types/UserBody";

class UserController {
  static async createUser(req: Req<UserBody>, res: Res) {
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

  static async findUsers(req: Req<{}>, res: Res) {
    try {
      const users = await UserModel.find({}, { username: 1, name: 1 });
      return res.status(200).json({ users });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async findOneUser(req: Req<{}>, res: Res) {
    try {
      const { id } = req.params;
      const user = await UserModel.find({ _id: id }, { username: 1, name: 1 });

      if (!user) return res.status(404).json({ message: "User not found" });

      return res.status(200).json(user[0]);
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }
}

export default UserController;
