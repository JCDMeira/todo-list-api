import { IUsersRepository } from "../repositories";
import { ILoginDTO } from "../types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class LoginUser {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({ username, password }: ILoginDTO) {
    const user = await this.usersRepository.findOne({
      key: "username",
      query: username,
    });

    if (!user) throw new Error("Invalid username and/or password");
    if (!(await bcrypt.compare(password, user.password)))
      throw new Error("Invalid username and/or password");

    const encryptKey = process.env.TOKEN_ENCRYPT as string;
    const token = jwt.sign({ id: user._id }, encryptKey, {
      expiresIn: "2h",
    });

    return {
      id: user._id,
      name: user.name,
      username: user.username,
      password: undefined,
      token,
    };
  }
}
