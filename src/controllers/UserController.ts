import UserModel from "../models/UserModel";
import { Req, Res, UserBody, UserBodyToEdit } from "../types";
import encryptPassword from "../utils/encryptPassword";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsersRepository } from "../repositories";
import { CreateUser, EditOne, FindOne, FindUsers } from "../services";

const usersRepository = new UsersRepository();
class UserController {
  static async createUser(req: Req<UserBody>, res: Res) {
    try {
      const { body } = req;
      const { name, username, password } = body;
      const createUserService = new CreateUser(usersRepository);
      await createUserService.execute({ name, username, password });
      return res.status(201).json({ message: `User is sucefull create` });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async findUsers(req: Req<{}>, res: Res) {
    try {
      const findUsersService = new FindUsers(usersRepository);
      const users = await findUsersService.execute();
      return res.status(200).json({ users });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async findOneUser(req: Req<{}>, res: Res) {
    try {
      const { id } = req.params;
      const findOneService = new FindOne(usersRepository);
      const user = await findOneService.execute(id);
      return res.status(200).json(user);
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async editOneUser(req: Req<UserBodyToEdit>, res: Res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const EditOneService = new EditOne(usersRepository);
      await EditOneService.execute({ id, ...body });
      return res.status(200).json({ message: "User edited susscefull" });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  static async deleteUser(req: Req<{}>, res: Res) {
    try {
      const { id } = req.params;
      await usersRepository.deleteById({ id });

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
      const user = await usersRepository.findOne({
        key: "username",
        query: username,
      });

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
        id: user._id,
        name: user.name,
        username: user.username,
        password: undefined,
        token,
      });
    } catch ({ message }) {
      res.status(400).json({ message });
    }
  }
  static async Logout(req: Req<{ userId: string }>, res: Res) {
    try {
      const { userId } = req.body;
      const user = await usersRepository.findOne({
        key: "_id",
        query: userId,
      });

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
