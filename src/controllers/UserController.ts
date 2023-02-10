import UserModel from "../models/UserModel";
import { Req, Res, UserBody, UserBodyToEdit } from "../types";
import encryptPassword from "../utils/encryptPassword";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      if (user.length === 0)
        return res.status(404).json({ message: "User not found" });

      return res.status(200).json(user[0]);
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async editOneUser(req: Req<UserBodyToEdit>, res: Res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const newBody = { ...body };

      if (newBody.username !== undefined) {
        if (/\s/g.test(newBody.username))
          return res.status(400).json({ message: "Invalid Format" });

        const isUnic = await UserModel.find({ username: newBody.username });
        if (isUnic.length !== 0)
          return res
            .status(400)
            .json({ message: "This username already exist" });
      }

      if (newBody.password !== undefined) {
        newBody.password = await encryptPassword(newBody.password);
      }

      const user: any = await UserModel.findByIdAndUpdate(id, {
        ...newBody,
        updated_at: new Date().getTime(),
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      user.password = undefined;
      user.__v = undefined;

      return res.status(200).json(user);
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async deleteUser(req: Req<{}>, res: Res) {
    try {
      const { id } = req.params;
      await UserModel.findByIdAndDelete(id);

      res.status(200).json({ message: "User deleted sussceful" });
    } catch ({ message }) {
      res.status(400).json({ message });
    }
  }

  static async Login(
    req: Req<{ username: string; password: string }>,
    res: Res
  ) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne(
        { username },
        { __v: 0, updated_at: 0, created_at: 0 }
      ).select("+paassword");

      if (!user)
        return res
          .status(400)
          .json({ message: "Invalid username and/or password" });

      if (!(await bcrypt.compare(password, user.password)))
        return res
          .status(400)
          .json({ message: "Invalid username and/or password" });

      const encryptKey = process.env.TOKEN_ENCRYPT as string;

      const token = jwt.sign({ id: user._id }, encryptKey, {
        expiresIn: "2h",
      });

      return res.status(200).json({
        name: user.name,
        username: user.username,
        password: undefined,
        token,
      });
    } catch ({ message }) {
      res.status(400).json({ message });
    }
  }
  static async Logout(req: Req<{ username: string }>, res: Res) {
    try {
      const { username } = req.body;
      const user = await UserModel.findOne(
        { username },
        { __v: 0, updated_at: 0, created_at: 0 }
      );

      if (!user) return res.status(400).json({ message: "Error" });

      const encryptKey = process.env.TOKEN_ENCRYPT as string;

      jwt.sign({ id: user._id }, encryptKey, {
        expiresIn: "120ms",
      });

      return res.status(200).json({
        message: "You have been logged out",
      });
    } catch ({ message }) {
      res.status(400).json({ message });
    }
  }
}

export default UserController;
