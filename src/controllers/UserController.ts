import { ILoginDTO, Req, Res, UserBody, UserBodyToEdit } from "../types";
import { UsersRepository } from "../repositories";
import {
  CreateUser,
  DeleteUser,
  EditOne,
  FindOne,
  FindUsers,
  LoginUser,
  LogoutUser,
} from "../services";
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

  static async deleteUser(req: Req<{ userId: string }>, res: Res) {
    try {
      const deleteUserService = new DeleteUser(usersRepository);
      deleteUserService.execute(req.params.id, req.body.userId);
      res.status(200).json({ message: "User deleted sussceful" });
    } catch ({ message }) {
      res.status(400).json({ message });
    }
  }

  static async Login(req: Req<ILoginDTO>, res: Res) {
    try {
      const loginUserService = new LoginUser(usersRepository);
      const user = loginUserService.execute(req.body);
      return res.status(200).json(user);
    } catch ({ message }) {
      res.status(400).json({ message });
    }
  }

  static async Logout(req: Req<{ userId: string }>, res: Res) {
    try {
      const logoutUserService = new LogoutUser(usersRepository);
      logoutUserService.execute(req.body.userId);
      return res.status(200).json({
        message: "You have been logged out",
      });
    } catch ({ message }) {
      res.status(400).json({ message });
    }
  }
}

export default UserController;
